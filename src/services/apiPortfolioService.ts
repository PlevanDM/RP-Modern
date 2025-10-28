import { portfolioItems } from '../utils/mock';
import { PortfolioItem } from '../types';

class ApiPortfolioService {
  async getPortfolioItems(masterId: string): Promise<PortfolioItem[]> {
    // In a real application, you would make an API call here
    // For now, we'll just return the mock data
    console.log('Fetching portfolio items for master:', masterId);
    return Promise.resolve(portfolioItems);
  }

  async addPortfolioItem(masterId: string, item: Omit<PortfolioItem, 'id'>): Promise<PortfolioItem> {
    // In a real application, you would make an API call here
    const newItem: PortfolioItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
    };
    portfolioItems.push(newItem);
    console.log('Adding portfolio item for master:', masterId, newItem);
    return Promise.resolve(newItem);
  }

  async updatePortfolioItem(masterId: string, itemId: string, item: Partial<PortfolioItem>): Promise<PortfolioItem> {
    // In a real application, you would make an API call here
    const itemIndex = portfolioItems.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) {
      throw new Error('Item not found');
    }
    const updatedItem = { ...portfolioItems[itemIndex], ...item };
    portfolioItems[itemIndex] = updatedItem;
    console.log('Updating portfolio item for master:', masterId, updatedItem);
    return Promise.resolve(updatedItem);
  }

  async deletePortfolioItem(masterId: string, itemId: string): Promise<void> {
    // In a real application, you would make an API call here
    const itemIndex = portfolioItems.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) {
      throw new Error('Item not found');
    }
    portfolioItems.splice(itemIndex, 1);
    console.log('Deleting portfolio item for master:', masterId, itemId);
    return Promise.resolve();
  }
}

export const apiPortfolioService = new ApiPortfolioService();
