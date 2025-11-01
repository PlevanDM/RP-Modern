import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiAuthService } from '../services/apiAuthService';
import { User } from '../types';

interface AuthState {
  currentUser: User | null;
  token: string | null;
  isOnboardingCompleted: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
  updateCurrentUser: (user: User) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      token: null,
      isOnboardingCompleted: false,
      login: async (email: string, password?: string) => {
        const user = await apiAuthService.login(email, password);
        if (user) {
          // Перевіряємо чи користувач має всі необхідні дані для автоматичного завершення онбордингу
          const hasCompleteProfile = user.name && user.city && user.phone;
          if (import.meta.env.DEV) {
            console.log('🔐 Login user:', { email, name: user.name, city: user.city, phone: user.phone, hasCompleteProfile });
          }
          const token = localStorage.getItem('jwt-token');
          set({
            currentUser: user,
            token,
            isOnboardingCompleted: hasCompleteProfile,
          });
        }
      },
      register: async (user: User) => {
        const newUser = await apiAuthService.register(user);
        const hasCompleteProfile =
          newUser.name &&
          newUser.city &&
          newUser.phone &&
          (newUser.role !== 'master' || (
            newUser.workLocation &&
            newUser.repairBrands && newUser.repairBrands.length > 0 &&
            newUser.repairTypes && newUser.repairTypes.length > 0 &&
            newUser.workExperience !== undefined
          ));
        const token = localStorage.getItem('jwt-token');
        set({ currentUser: newUser, token, isOnboardingCompleted: hasCompleteProfile });
      },
      logout: () => {
        localStorage.removeItem('jwt-token');
        set({ currentUser: null, token: null, isOnboardingCompleted: false });
      },
      completeOnboarding: () => set({ isOnboardingCompleted: true }),
      updateCurrentUser: (user: User) => set({ currentUser: user }),
      setToken: (token: string | null) => set({ token }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
