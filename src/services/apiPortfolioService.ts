import api from './api/client';
import { PortfolioItem } from '../types';

class ApiPortfolioService {
  async getPortfolioItems(masterId: string): Promise<PortfolioItem[]> {
    try {
      const response = await api.get(`/portfolio/${masterId}`);
      return response.data || [];
    } catch (error: unknown) {
      console.error('Error fetching portfolio:', error);
      // Fallback: якщо portfolio не знайдено, повертаємо пустий масив
      const errorWithResponse = error as { response?: { status?: number } };
      if (errorWithResponse?.response?.status === 404) {
        return [];
      }
      throw error;
    }
  }

  async addPortfolioItem(masterId: string, item: Omit<PortfolioItem, 'id'>): Promise<PortfolioItem> {
    const response = await api.post(`/portfolio`, item);
    return response.data;
  }

  async updatePortfolioItem(masterId: string, itemId: string, item: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const response = await api.put(`/portfolio/${itemId}`, item);
    return response.data;
  }

  async deletePortfolioItem(masterId: string, itemId: string): Promise<void> {
    await api.delete(`/portfolio/${itemId}`);
  }
}

export const apiPortfolioService = new ApiPortfolioService();
