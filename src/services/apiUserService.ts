// src/services/apiUserService.ts
import axios from 'axios';
import { User } from '../types';
import { getApiUrl, getAuthHeaders } from './apiUrlHelper';

class ApiUserService {
  private static instance: ApiUserService;

  private constructor() {}

  public static getInstance(): ApiUserService {
    if (!ApiUserService.instance) {
      ApiUserService.instance = new ApiUserService();
    }
    return ApiUserService.instance;
  }

  private async restoreToken(): Promise<boolean> {
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (!authStorage) return false;
      
      const parsed = JSON.parse(authStorage);
      const user = parsed.state?.currentUser;
      
      if (user?.email) {
        // Спочатку спробуємо /auth/me якщо є старий токен
        const oldToken = localStorage.getItem('jwt-token');
        if (oldToken) {
          try {
            const response = await axios.get(`${getApiUrl()}/auth/me`, {
              headers: { 'Authorization': `Bearer ${oldToken}`, ...getAuthHeaders() },
              withCredentials: true
            });
            
            if (response.data?.token) {
              localStorage.setItem('jwt-token', response.data.token);
              return true;
            }
          } catch {
            // Старий токен не працює, спробуємо login
          }
        }
        
        // Якщо /auth/me не працює, спробуємо login (але потрібен пароль)
        // Для тестових користувачів спробуємо загальний пароль
        const testPasswords: Record<string, string> = {
          'admin@test.com': 'admin123',
          'superadmin@test.com': 'admin123',
          'master1@test.com': 'master123',
          'master2@test.com': 'master123',
          'master3@test.com': 'master123',
          'client1@test.com': 'client123',
          'client2@test.com': 'client123',
          'client3@test.com': 'client123',
          'client4@test.com': 'client123',
        };
        
        const password = testPasswords[user.email];
        if (password) {
          const response = await axios.post(`${getApiUrl()}/auth/login`, { email: user.email, password }, {
            headers: { 'Content-Type': 'application/json' }
          });
          
          if (response.data?.token) {
            localStorage.setItem('jwt-token', response.data.token);
            return true;
          }
        }
      }
    } catch (error) {
      console.warn('Failed to restore token:', error);
    }
    return false;
  }

  public async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${getApiUrl()}/users`, { headers: getAuthHeaders(), withCredentials: true });
      return response.data;
    } catch (error: unknown) {
      // Якщо помилка авторизації, спробуємо відновити токен
      const errorWithResponse = error as { response?: { status?: number } };
      if (errorWithResponse?.response?.status === 401) {
        const restored = await this.restoreToken();
        if (restored) {
          // Повторюємо запит з новим токеном
          try {
            const response = await axios.get(`${getApiUrl()}/users`, { headers: getAuthHeaders(), withCredentials: true });
            return response.data;
          } catch (retryError) {
            console.error('Failed to get users after token restore:', retryError);
            return [];
          }
        }
        // Якщо не вдалося відновити, повертаємо пустий масив
        console.warn('Could not restore token, returning empty array');
        return [];
      }
      throw error;
    }
  }
  
  private getAuthToken(): string | null {
    // Спробуємо різні способи отримання токену
    try {
      const authData = JSON.parse(localStorage.getItem('auth-storage') || '{}');
      return authData.state?.token || authData.state?.currentUser?.token || null;
    } catch {
      // Ігноруємо помилку парсингу
    }
    
    return localStorage.getItem('token') || localStorage.getItem('authToken');
  }

  public async getUserById(userId: string): Promise<User | undefined> {
    try {
      const token = this.getAuthToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await axios.get(`${getApiUrl()}/users/${userId}`, { 
        headers: { ...headers, ...getAuthHeaders() },
        withCredentials: true 
      });
      return response.data;
    } catch (error: unknown) {
      const errorWithResponse = error as { response?: { status?: number } };
      if (errorWithResponse?.response?.status === 401) {
        console.warn('Auth error getting user, trying without token');
        try {
          const response = await axios.get(`${getApiUrl()}/users/${userId}`);
          return response.data;
        } catch (e) {
          console.error('Failed to get user:', e);
          return undefined;
        }
      }
      throw error;
    }
  }

  public async createUser(user: User): Promise<User> {
    const response = await axios.post(`${getApiUrl()}/users`, user, { headers: getAuthHeaders(), withCredentials: true });
    return response.data;
  }

  public async blockUser(userId: string): Promise<User> {
    const response = await axios.post(`${getApiUrl()}/users/${userId}/block`, undefined, { headers: getAuthHeaders(), withCredentials: true });
    return response.data;
  }

  public async unblockUser(userId: string): Promise<User> {
    const response = await axios.post(`${getApiUrl()}/users/${userId}/unblock`, undefined, { headers: getAuthHeaders(), withCredentials: true });
    return response.data;
  }

  public async updateUserRole(userId: string, role: string): Promise<User> {
    const token = localStorage.getItem('authToken');
    const response = await axios.patch(
      `${getApiUrl()}/superadmin/users/${userId}/role`,
      { role },
      { headers: { Authorization: `Bearer ${token}`, ...getAuthHeaders() } }
    );
    return response.data;
  }

  public async updateUserProfile(userId: string, profileData: Partial<User>): Promise<User> {
    // Спробуємо різні способи отримання токену
    let token: string | null = null;
    
    // Спосіб 1: з auth-storage (Zustand persist)
    try {
      const authData = JSON.parse(localStorage.getItem('auth-storage') || '{}');
      token = authData.state?.token || authData.state?.currentUser?.token;
    } catch {
      // Ігноруємо помилку парсингу
    }
    
    // Спосіб 2: з token напряму
    if (!token) {
      token = localStorage.getItem('token') || localStorage.getItem('authToken');
    }
    
    // Спосіб 3: з apiAuthService (якщо є)
    if (!token && typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        try {
          const parsed = JSON.parse(authStorage);
          token = parsed?.state?.token || parsed?.token;
        } catch {
          console.warn('Failed to parse auth storage');
        }
      }
    }

    if (!token) {
      console.warn('No authentication token found. Attempting to update without auth.');
      // Спробуємо без токену (для локального тестування)
    }

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      // Спробуємо через правильний endpoint
      const response = await axios.patch(
        `${getApiUrl()}/users/${userId}`,
        profileData,
        { 
          headers: { ...headers, ...getAuthHeaders() },
          withCredentials: true 
        }
      );
      return response.data;
    } catch (error: unknown) {
      // Якщо endpoint не працює, спробуємо інший
      const errorWithResponse = error as { response?: { status?: number } };
      if (errorWithResponse?.response?.status === 404 || errorWithResponse?.response?.status === 405) {
        const response = await axios.put(
          `${getApiUrl()}/users/${userId}`,
          profileData,
          { headers: { ...headers, ...getAuthHeaders() } }
        );
        return response.data;
      }
      throw error;
    }
  }
}

export const apiUserService = ApiUserService.getInstance();
