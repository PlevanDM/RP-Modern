// src/services/authService.ts

import { User } from '../types';

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async signInWithGoogle(): Promise<User> {
    console.log('Simulating Google sign-in...');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    const mockUser: User = {
      id: `google-${Date.now()}`,
      name: 'Google User',
      email: 'google.user@example.com',
      role: 'client',
      city: 'Київ',
      avatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`,
    };

    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    return mockUser;
  }

  public async signInWithTelegram(): Promise<User> {
    console.log('Simulating Telegram sign-in...');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    const mockUser: User = {
      id: `telegram-${Date.now()}`,
      name: 'Telegram User',
      email: 'telegram.user@example.com',
      role: 'client',
      city: 'Київ',
      avatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`,
    };

    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    return mockUser;
  }
}

export const authService = AuthService.getInstance();
