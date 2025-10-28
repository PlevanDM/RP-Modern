import api from './api';
import { PortfolioItem } from '../types';

class ApiPortfolioService {
  async getPortfolioItems(masterId: string): Promise<PortfolioItem[]> {
    const response = await api.get(`/masters/${masterId}/portfolio`);
    return response.data;
  }

  async addPortfolioItem(masterId: string, item: Omit<PortfolioItem, 'id'>): Promise<PortfolioItem> {
    const response = await api.post(`/masters/${masterId}/portfolio`, item);
    return response.data;
  }

  async updatePortfolioItem(masterId: string, itemId: string, item: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const response = await api.put(`/masters/${masterId}/portfolio/${itemId}`, item);
    return response.data;
  }

  async deletePortfolioItem(masterId: string, itemId: string): Promise<void> {
    await api.delete(`/masters/${masterId}/portfolio/${itemId}`);
  }
}

export const apiPortfolioService = new ApiPortfolioService();
