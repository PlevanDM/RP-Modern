// src/services/apiOrderService.ts
import axios from 'axios';
import { Order } from '../types';

import { getApiUrl, getAuthHeaders } from './apiUrlHelper';

// Create axios instance with auth interceptor
const apiClient = axios.create({
  // baseURL will be assigned dynamically in the interceptor to reflect latest settings
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable credentials for CORS
});

// Add auth token to all requests
apiClient.interceptors.request.use((config) => {
  // Always set current baseURL from settings/env on each request
  config.baseURL = getApiUrl();
  // Merge auth headers from settings (getAuthHeaders already includes token)
  config.headers = { ...(config.headers || {}), ...getAuthHeaders() } as Record<string, string>;
  return config;
});

// Handle 401 errors - try to restore token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        try {
          const parsed = JSON.parse(authStorage);
          const user = parsed.state?.currentUser;
          
          if (user?.email) {
            // Try to restore token using /auth/me first
            const oldToken = localStorage.getItem('jwt-token');
            if (oldToken) {
              try {
                const meResponse = await axios.get(`${getApiUrl()}/auth/me`, {
                  headers: { 'Authorization': `Bearer ${oldToken}`, ...getAuthHeaders() },
                  withCredentials: true
                });
                
                if (meResponse.data?.token) {
                  localStorage.setItem('jwt-token', meResponse.data.token);
                  originalRequest.headers.Authorization = `Bearer ${meResponse.data.token}`;
                  return apiClient(originalRequest);
                }
              } catch {
                // Старий токен не працює, спробуємо login
              }
            }
            
            // Якщо /auth/me не працює, спробуємо login з паролем
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
              try {
                const response = await axios.post(`${getApiUrl()}/auth/login`, { email: user.email, password }, {
                  headers: { 'Content-Type': 'application/json' }
                });
                
                if (response.data?.token) {
                  localStorage.setItem('jwt-token', response.data.token);
                  originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
                  return apiClient(originalRequest);
                }
              } catch (restoreError) {
                console.warn('Failed to restore token:', restoreError);
              }
            }
          }
        } catch (e) {
          console.error('Failed to parse auth storage:', e);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

class ApiOrderService {
  private static instance: ApiOrderService;

  private constructor() {}

  public static getInstance(): ApiOrderService {
    if (!ApiOrderService.instance) {
      ApiOrderService.instance = new ApiOrderService();
    }
    return ApiOrderService.instance;
  }

  public async getOrders(page = 1, limit = 10, searchTerm = '', status = 'all', sortBy = 'date'): Promise<{ orders: Order[]; totalPages: number; currentPage: number; totalOrders: number }> {
    const response = await apiClient.get('/orders', {
      params: { page, limit, searchTerm, status, sortBy },
    });
    return response.data;
  }

  public async createOrder(order: Omit<Order, 'id'>): Promise<Order> {
    const response = await apiClient.post('/orders', order);
    return response.data;
  }

  public async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    const response = await apiClient.patch(`/orders/${orderId}/status`, { status });
    return response.data;
  }

  public async deleteOrder(orderId: string): Promise<void> {
    await apiClient.delete(`/orders/${orderId}`);
  }

  public async getOrderById(orderId: string): Promise<Order> {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  }

  public async updateOrder(orderId: string, updates: Partial<Order>): Promise<Order> {
    const response = await apiClient.patch(`/orders/${orderId}`, updates);
    return response.data;
  }
}

export const apiOrderService = ApiOrderService.getInstance();
