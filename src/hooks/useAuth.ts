import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { currentUser, login, logout, register, completeOnboarding, isOnboardingCompleted } = useAuthStore();

  return {
    user: currentUser,
    isAuthenticated: !!currentUser,
    isOnboardingCompleted,
    login,
    logout,
    register,
    completeOnboarding,
  };
};
