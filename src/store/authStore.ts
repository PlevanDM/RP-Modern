import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers } from '../utils/mockData';
import { User } from '../types';

interface AuthState {
  currentUser: User | null;
  isOnboardingCompleted: boolean;
  login: (id: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      isOnboardingCompleted: false,
      login: (id: string) => {
        const user = mockUsers.find((u) => u.id === id);
        if (user) {
          set({ currentUser: user, isOnboardingCompleted: false }); // Сбрасываем при новом логине
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
