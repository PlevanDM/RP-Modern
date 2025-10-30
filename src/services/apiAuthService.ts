// src/services/apiAuthService.ts
import axios from 'axios';
import { User } from '../types';
import { initializeTestUsers } from '../utils/testLoginUsers';
import { getApiUrl } from './apiUrlHelper';

const API_URL = getApiUrl();

// Debug: log API URL on initialization
if (import.meta.env.DEV) {
  console.log('🔗 API URL:', API_URL);
}

class ApiAuthService {
  private static instance: ApiAuthService;

  private constructor() {
    // Ініціалізуємо тестових користувачів при створенні сервісу
    if (typeof window !== 'undefined') {
      initializeTestUsers();
    }
  }

  public static getInstance(): ApiAuthService {
    if (!ApiAuthService.instance) {
      ApiAuthService.instance = new ApiAuthService();
    }
    return ApiAuthService.instance;
  }

  public async login(email: string, password?: string): Promise<User | null> {
    // Спочатку перевіряємо тестових користувачів в localStorage
    try {
      const storedUsers = JSON.parse(localStorage.getItem('repair_master_users') || '[]');
      const testUser = storedUsers.find((u: User) => u.email === email);
      
      if (testUser) {
        // Перевіряємо пароль для тестових користувачів
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
          'test@test.com': 'test123',
        };
        
        const expectedPassword = testPasswords[email];
        if (expectedPassword && password === expectedPassword) {
          // Знайдено тестового користувача з правильним паролем
          if (!password) {
            throw new Error('Пароль required для тестового користувача');
          }
          return testUser as User;
        } else if (!password && !expectedPassword) {
          // Якщо пароль не потрібен і це не тестовий користувач, дозволяємо вхід
          return testUser as User;
        } else if (password && expectedPassword && password !== expectedPassword) {
          throw new Error('Невірний пароль');
        }
      }
    } catch (localError) {
      console.warn('Local login failed, trying API:', localError);
    }

    // Якщо не знайдено в localStorage, пробуємо API
    try {
      const requestData = password ? { email, password } : { email };
      const response = await axios.post(`${API_URL}/auth/login`, requestData, {
        withCredentials: true,
      });
      
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem('jwt-token', token);
      }
      
      return user;
    } catch (apiError: any) {
      // Якщо API недоступний, повертаємо помилку
      throw new Error(apiError?.response?.data?.message || 'Невірний email або пароль');
    }
  }

  public async register(user: User): Promise<User> {
    const response = await axios.post(`${API_URL}/auth/register`, user, {
      withCredentials: true, // Enable credentials for CORS
    });
    return response.data;
  }
}

export const apiAuthService = ApiAuthService.getInstance();
