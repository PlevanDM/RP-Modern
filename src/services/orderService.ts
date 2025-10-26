// src/services/orderService.ts

import { Order } from '../types';
import { mockOrders } from '../utils/mockData';

class OrderService {
  private static instance: OrderService;

  private constructor() {}

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  public async getOrders(): Promise<Order[]> {
    console.log('Fetching all orders...');
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return mockOrders;
  }
}

export const orderService = OrderService.getInstance();
