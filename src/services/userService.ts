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
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = this.getUsersFromStorage();
    if (users.length === 0) {
      this.saveUsers(mockUsers);
      return mockUsers;
    }
    return users;
  }

  public async getUserById(userId: string): Promise<User | undefined> {
    console.log(`Fetching user with id: ${userId}...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = this.getUsersFromStorage();
    return users.find(user => user.id === userId);
  }

  public saveUsers(users: User[]): void {
    localStorage.setItem('app_users', JSON.stringify(users));
  }

  private getUsersFromStorage(): User[] {
    const users = localStorage.getItem('app_users');
    return users ? JSON.parse(users) : mockUsers;
  }
}

export const userService = UserService.getInstance();
