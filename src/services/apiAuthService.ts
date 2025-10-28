// src/services/apiAuthService.ts
import axios from 'axios';
import { User } from '../types';

const API_URL = 'http://localhost:3001/api';

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
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    
    // Backend returns { token, user: {...} }
    const { token, user } = response.data;
    
    // Store token in localStorage
    if (token) {
      localStorage.setItem('jwt-token', token);
    }
    
    return user;
  }

  public async register(user: User): Promise<User> {
    const response = await axios.post(`${API_URL}/auth/register`, user);
    return response.data;
  }
}

export const apiAuthService = ApiAuthService.getInstance();
