// src/services/userService.ts

import { User } from '../types';
import { mockUsers } from '../utils/mockData';

class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async getUsers(): Promise<User[]> {
    console.log('Fetching all users...');
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return mockUsers;
  }

  public async getUserById(userId: string): Promise<User | undefined> {
    console.log(`Fetching user with id: ${userId}...`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return mockUsers.find(user => user.id === userId);
  }
}

export const userService = UserService.getInstance();
