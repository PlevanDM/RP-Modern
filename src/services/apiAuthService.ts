// src/services/apiAuthService.ts
import axios from 'axios';
import { User } from '../types';
import { getApiUrl, getAuthHeaders } from './apiUrlHelper';

// Debug: log API URL on initialization
if (import.meta.env.DEV) {
  console.log('🔗 API URL:', getApiUrl());
}

class ApiAuthService {
  private static instance: ApiAuthService;

  private constructor() {}

  public static getInstance(): ApiAuthService {
    if (!ApiAuthService.instance) {
      ApiAuthService.instance = new ApiAuthService();
    }
    return ApiAuthService.instance;
  }

  public async login(email: string, password?: string): Promise<User | null> {
    try {
      const requestData = password ? { email, password } : { email };
      const response = await axios.post(`${getApiUrl()}/auth/login`, requestData, {
        withCredentials: true,
        headers: getAuthHeaders(),
      });
      
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('jwt-token', token);
      }
      
      return user;
    } catch (apiError) {
      // Якщо API недоступний, повертаємо помилку
      throw new Error(apiError instanceof Error ? apiError.message : 'Невірний email або пароль');
    }
  }

  public async register(user: User): Promise<User> {
    const response = await axios.post(`${getApiUrl()}/auth/register`, user, {
      withCredentials: true,
      headers: getAuthHeaders(),
    });
    return response.data;
  }

  public async me(): Promise<User | null> {
    try {
      const response = await axios.get(`${getApiUrl()}/auth/me`, {
        withCredentials: true,
        headers: getAuthHeaders(),
      });
      return response.data?.user || null;
    } catch (error) {
      // Логируем только в dev режиме
      if (import.meta.env.DEV) {
        console.warn('Failed to fetch current user:', error);
      }
      return null;
    }
  }

  public async logout(): Promise<void> {
    try {
      await axios.post(`${getApiUrl()}/auth/logout`, undefined, {
        withCredentials: true,
        headers: getAuthHeaders(),
      });
    } catch (error) {
      // Логируем ошибку logout только в dev
      if (import.meta.env.DEV) {
        console.warn('Logout API call failed (non-critical):', error);
      }
    } finally {
      // Всегда удаляем токен локально
      localStorage.removeItem('jwt-token');
    }
  }
}

export const apiAuthService = ApiAuthService.getInstance();
