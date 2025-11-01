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
  // Merge auth headers from settings
  config.headers = { ...(config.headers || {}), ...getAuthHeaders() };
  const authStorage = localStorage.getItem('auth-storage');
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      const user = parsed.state?.currentUser;
      if (user) {
        // Get token from localStorage - required for API requests
        const token = localStorage.getItem('jwt-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error('Failed to parse auth storage:', e);
      }
    }
  }
  return config;
});

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
}

export const apiOrderService = ApiOrderService.getInstance();
