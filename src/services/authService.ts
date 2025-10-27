// src/services/authService.ts

import { User } from '../types';
import { mockUsers } from '../utils/mockData';

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private getUsersFromStorage(): User[] {
    const users = localStorage.getItem('app_users');
    return users ? JSON.parse(users) : [];
  }

  private saveUsersToStorage(users: User[]): void {
    localStorage.setItem('app_users', JSON.stringify(users));
  }

  public async login(email: string, password?: string): Promise<User | null> {
    const users = this.getUsersFromStorage();
    const allUsers = users.length > 0 ? users : mockUsers;
    const user = allUsers.find((u) => u.email === email && u.password === password);
    if (user) {
      return user;
    }
    return null;
  }

  public async signInWithGoogle(): Promise<User> {
    console.log('Simulating Google sign-in...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Повертаємо тимчасового користувача для реєстрації
    const tempUser: User = {
      id: `google-${Date.now()}`,
      name: '',
      email: 'google.user@example.com',
      role: 'client',
      city: '',
      avatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`,
      balance: 0,
      skills: [],
      specialization: 'Client',
      verified: false,
      blocked: false,
    };
    
    return tempUser;
  }

  public async signInWithTelegram(): Promise<User> {
    console.log('Simulating Telegram sign-in...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Повертаємо тимчасового користувача для реєстрації
    const tempUser: User = {
      id: `telegram-${Date.now()}`,
      name: '',
      email: 'telegram.user@example.com',
      role: 'client',
      city: '',
      avatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`,
      balance: 0,
      skills: [],
      specialization: 'Client',
      verified: false,
      blocked: false,
    };
    
    return tempUser;
  }

  public register(userData: Partial<User>): User {
    console.log('Registering new user...', userData);
    
    const existingUsers = this.getUsersFromStorage();
    
    const newUser: User = {
      id: userData.id || `user-${Date.now()}`,
      name: userData.name || 'User',
      fullName: userData.name,
      email: userData.email || '',
      phone: userData.phone || '',
      city: userData.city || '',
      role: userData.role || 'client',
      avatar: userData.avatar || `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`,
      balance: 0,
      skills: [],
      specialization: userData.role === 'master' ? 'Master' : 'Client',
      rating: 0,
      verified: false,
      blocked: false,
      completedOrders: 0,
      
      // Клієнтські поля
      clientMobileOS: userData.clientMobileOS,
      clientComputerOS: userData.clientComputerOS,
      skillLevel: userData.skillLevel,
      preferredPriority: userData.preferredPriority,
      budgetRange: userData.budgetRange,
      
      // Майстерські поля
      workLocation: userData.workLocation,
      equipment: userData.equipment,
      workExperience: userData.workExperience,
      workingRadius: userData.workingRadius,
      languages: userData.languages,
      certifications: userData.certifications,
      
      // Додаткові поля
      bio: userData.bio,
      tools: userData.tools,
      devices: userData.devices,
      paymentMethods: userData.paymentMethods,
      experience: userData.experience,
    };
    
    // Збереження в localStorage
    existingUsers.push(newUser);
    this.saveUsersToStorage(existingUsers);
    
    console.log('User registered successfully:', newUser);
    return newUser;
  }

  public async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const users = this.getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) return null;
    
    users[userIndex] = { ...users[userIndex], ...updates };
    this.saveUsersToStorage(users);
    
    return users[userIndex];
  }
}

export const authService = AuthService.getInstance();
