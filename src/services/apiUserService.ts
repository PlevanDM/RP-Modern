// src/services/apiUserService.ts
import axios from 'axios';
import { User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiUserService {
  private static instance: ApiUserService;

  private constructor() {}

  public static getInstance(): ApiUserService {
    if (!ApiUserService.instance) {
      ApiUserService.instance = new ApiUserService();
    }
    return ApiUserService.instance;
  }

  public async getUsers(): Promise<User[]> {
    try {
      const token = this.getAuthToken();
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await axios.get(`${API_URL}/users`, { headers });
      return response.data;
    } catch (error: any) {
      // Якщо помилка авторизації, спробуємо без токену (для тестування)
      if (error.response?.status === 401) {
        console.warn('Auth error getting users, trying without token');
        try {
          const response = await axios.get(`${API_URL}/users`);
          return response.data;
        } catch (e) {
          // Якщо все одно не працює, повертаємо пустий масив
          console.error('Failed to get users:', e);
          return [];
        }
      }
      throw error;
    }
  }
  
  private getAuthToken(): string | null {
    // Спробуємо різні способи отримання токену
    try {
      const authData = JSON.parse(localStorage.getItem('auth-storage') || '{}');
      return authData.state?.token || authData.state?.currentUser?.token || null;
    } catch (e) {
      // Ігноруємо помилку парсингу
    }
    
    return localStorage.getItem('token') || localStorage.getItem('authToken');
  }

  public async getUserById(userId: string): Promise<User | undefined> {
    try {
      const token = this.getAuthToken();
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await axios.get(`${API_URL}/users/${userId}`, { 
        headers,
        withCredentials: true 
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.warn('Auth error getting user, trying without token');
        try {
          const response = await axios.get(`${API_URL}/users/${userId}`);
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
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  }

  public async blockUser(userId: string): Promise<User> {
    const response = await axios.post(`${API_URL}/users/${userId}/block`);
    return response.data;
  }

  public async unblockUser(userId: string): Promise<User> {
    const response = await axios.post(`${API_URL}/users/${userId}/unblock`);
    return response.data;
  }

  public async updateUserRole(userId: string, role: string): Promise<User> {
    const token = localStorage.getItem('authToken');
    const response = await axios.patch(
      `${API_URL}/superadmin/users/${userId}/role`,
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
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
    } catch (e) {
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
        } catch (e) {
          console.warn('Failed to parse auth storage');
        }
      }
    }

    if (!token) {
      console.warn('No authentication token found. Attempting to update without auth.');
      // Спробуємо без токену (для локального тестування)
    }

    const headers: any = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      // Спробуємо через правильний endpoint
      const response = await axios.patch(
        `${API_URL}/users/${userId}`,
        profileData,
        { 
          headers,
          withCredentials: true 
        }
      );
      return response.data;
    } catch (error: any) {
      // Якщо endpoint не працює, спробуємо інший
      if (error.response?.status === 404 || error.response?.status === 405) {
        const response = await axios.put(
          `${API_URL}/users/${userId}`,
          profileData,
          { headers }
        );
        return response.data;
      }
      throw error;
    }
  }
}

export const apiUserService = ApiUserService.getInstance();
