// src/services/apiUserService.ts
import axios from 'axios';
import { User } from '../types';

const API_URL = 'http://localhost:3001/api';

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
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  }

  public async getUserById(userId: string): Promise<User | undefined> {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
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
}

export const apiUserService = ApiUserService.getInstance();
