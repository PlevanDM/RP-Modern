import { User, Review, UserAction } from '../types';
import { getApiUrl, getAuthHeaders } from './apiUrlHelper';
import { apiUserService } from './apiUserService';

// Mock data for reviews
const mockReviews: Review[] = [
  { id: '1', orderId: 'order1', authorId: 'client1', authorName: 'Анна Коваленко', text: 'Great service!', rating: 5, status: 'pending', createdAt: new Date() },
  { id: '2', orderId: 'order2', authorId: 'client2', authorName: 'Михайло Петренко', text: 'Very professional and quick.', rating: 5, status: 'approved', createdAt: new Date() },
  { id: '3', orderId: 'order3', authorId: 'client3', authorName: 'Олена Сидоренко', text: 'Could be better.', rating: 3, status: 'pending', createdAt: new Date() },
  { id: '4', orderId: 'order4', authorId: 'client1', authorName: 'Анна Коваленко', text: 'Scam!', rating: 1, status: 'rejected', createdAt: new Date() },
];

const mockUserActions: UserAction[] = [
  { id: '1', userId: 'client1', action: 'Created order #order1', timestamp: new Date() },
  { id: '2', userId: 'master2', action: 'Accepted order #order2', timestamp: new Date() },
  { id: '3', userId: 'admin1', action: 'Blocked user #client3', timestamp: new Date() },
];


class AdminService {
  async getUsers(): Promise<User[]> {
    console.log('AdminService: Fetching users...');
    try {
      const API_URL = getApiUrl();
      const response = await fetch(`${API_URL}/users`, {
        credentials: 'include',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const users = await response.json();
        return Array.isArray(users) ? users : [];
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch users from API:', error);
      return [];
    }
  }

  async blockUser(userId: string): Promise<User> {
    console.log(`AdminService: Blocking user ${userId}...`);
    // Delegate to central user API service
    const updated = await apiUserService.blockUser(userId);
    return updated;
  }

  async unblockUser(userId: string): Promise<User> {
    console.log(`AdminService: Unblocking user ${userId}...`);
    // Delegate to central user API service
    const updated = await apiUserService.unblockUser(userId);
    return updated;
  }

  async getReviews(): Promise<Review[]> {
    console.log('AdminService: Fetching reviews...');
    // In a real app, this would be an API call
    // await fetch('/api/reviews');
    return Promise.resolve(mockReviews);
  }

  async updateReviewStatus(reviewId: string, status: 'approved' | 'rejected'): Promise<Review> {
    console.log(`AdminService: Updating review ${reviewId} to ${status}...`);
    // In a real app, this would be a POST/PUT request
    // await fetch(`/api/reviews/${reviewId}`, { method: 'PUT', body: JSON.stringify({ status }) });
    const review = mockReviews.find(r => r.id === reviewId);
    if (!review) throw new Error('Review not found');
    review.status = status;
    return Promise.resolve(review);
  }

  async getUserActions(): Promise<UserAction[]> {
    console.log('AdminService: Fetching user actions...');
    try {
      const API_URL = getApiUrl();
      // Use error logs as user actions if available
      const response = await fetch(`${API_URL}/admin/errors`, {
        credentials: 'include',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const errorLogs = await response.json();
        if (Array.isArray(errorLogs) && errorLogs.length > 0) {
          return errorLogs.map((log: any, index: number) => ({
            id: `action-${index}`,
            userId: log.userId || 'unknown',
            action: log.userMessage || log.message || 'User action',
            timestamp: new Date(log.timestamp || log.serverTimestamp || Date.now()),
          }));
        }
      }
      return mockUserActions;
    } catch (error) {
      console.error('Failed to fetch user actions from API, using mock data:', error);
      return mockUserActions;
    }
  }

  async getOrders(): Promise<any[]> {
    try {
      const API_URL = getApiUrl();
      const response = await fetch(`${API_URL}/orders`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const orders = await response.json();
        return Array.isArray(orders) ? orders : [];
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      return [];
    }
  }

  async getTransactions(): Promise<any[]> {
    try {
      const API_URL = getApiUrl();
      const response = await fetch(`${API_URL}/payments`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const payments = await response.json();
        return Array.isArray(payments) ? payments : [];
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return [];
    }
  }
}

export const adminService = new AdminService();
