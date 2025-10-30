// src/services/apiOrderService.ts
import axios from 'axios';
import { Order } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance with auth interceptor
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable credentials for CORS
});

// Add auth token to all requests
apiClient.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem('auth-storage');
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      const user = parsed.state?.currentUser;
      if (user) {
        // Get token from localStorage or use a mock token for testing
        const token = localStorage.getItem('jwt-token') || 'test-token';
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('Failed to parse auth storage:', e);
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

  public async getOrders(): Promise<Order[]> {
    const response = await apiClient.get('/orders');
    return response.data;
  }

  public async createOrder(order: Omit<Order, 'id'>): Promise<Order> {
    const response = await apiClient.post('/orders', order);
    return response.data;
  }
}

export const apiOrderService = ApiOrderService.getInstance();
