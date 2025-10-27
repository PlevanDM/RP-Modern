import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiAuthService } from '../services/apiAuthService';
import { User } from '../types';

interface AuthState {
  currentUser: User | null;
  isOnboardingCompleted: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
}

import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      isOnboardingCompleted: false,
      login: async (email: string, password?: string) => {
        const user = await apiAuthService.login(email, password);
        if (user) {
          // Перевіряємо чи користувач має всі необхідні дані для автоматичного завершення онбордингу
          const hasCompleteProfile = user.name && user.city && user.phone;
          set({
            currentUser: user,
            isOnboardingCompleted: hasCompleteProfile,
          });
        }
      },
      register: async (user: User) => {
        const newUser = await apiAuthService.register(user);
        set({ currentUser: newUser, isOnboardingCompleted: false });
      },
      logout: () => set({ currentUser: null, isOnboardingCompleted: false }),
      completeOnboarding: () => set({ isOnboardingCompleted: true }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
