// src/services/apiOrderService.ts
import axios from 'axios';
import { Order } from '../types';

const API_URL = 'http://localhost:3001/api';

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
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  }

  public async createOrder(order: Omit<Order, 'id'>): Promise<Order> {
    const response = await axios.post(`${API_URL}/orders`, order);
    return response.data;
  }
}

export const apiOrderService = ApiOrderService.getInstance();
