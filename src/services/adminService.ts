import { User, Review } from '../types';
import { mockUsers } from '../utils/mockData';

// Mock data for reviews
const mockReviews: Review[] = [
  { id: '1', orderId: 'order1', authorId: 'client1', authorName: 'Анна Коваленко', text: 'Great service!', rating: 5, status: 'pending', createdAt: new Date() },
  { id: '2', orderId: 'order2', authorId: 'client2', authorName: 'Михайло Петренко', text: 'Very professional and quick.', rating: 5, status: 'approved', createdAt: new Date() },
  { id: '3', orderId: 'order3', authorId: 'client3', authorName: 'Олена Сидоренко', text: 'Could be better.', rating: 3, status: 'pending', createdAt: new Date() },
  { id: '4', orderId: 'order4', authorId: 'client1', authorName: 'Анна Коваленко', text: 'Scam!', rating: 1, status: 'rejected', createdAt: new Date() },
];


class AdminService {
  async getUsers(): Promise<User[]> {
    console.log('AdminService: Fetching users...');
    // In a real app, this would be an API call
    // await fetch('/api/users');
    return Promise.resolve(mockUsers);
  }

  async blockUser(userId: string): Promise<User> {
    console.log(`AdminService: Blocking user ${userId}...`);
    // In a real app, this would be a POST/PUT request
    // await fetch(`/api/users/${userId}/block`, { method: 'POST' });
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    user.blocked = true;
    return Promise.resolve(user);
  }

  async unblockUser(userId: string): Promise<User> {
    console.log(`AdminService: Unblocking user ${userId}...`);
    // In a real app, this would be a POST/PUT request
    // await fetch(`/api/users/${userId}/unblock`, { method: 'POST' });
    const user = mockUsers.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    user.blocked = false;
    return Promise.resolve(user);
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
}

export const adminService = new AdminService();
