import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userService } from '../services/userService';
import { User } from '../types';

interface AuthState {
  currentUser: User | null;
  isOnboardingCompleted: boolean;
  login: (id: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      isOnboardingCompleted: false,
      login: async (id: string) => {
        const user = await userService.getUserById(id);
        if (user) {
          // Для тестовых аккаунтов сразу считаем онбординг завершенным
          set({ currentUser: user, isOnboardingCompleted: true });
        }
      },
      logout: () => set({ currentUser: null, isOnboardingCompleted: false }),
      completeOnboarding: () => set({ isOnboardingCompleted: true }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
