import React from 'react';
import RepairHubLanding from '../ui/RepairHubLanding';
import { useAuthStore } from '../../store/authStore';

interface LandingPageProps {
  onLogin?: (userId: string) => void;
}

const ModernLandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const login = useAuthStore((state) => state.login);
  
  const handleRoleSelect = (role: 'client' | 'master') => {
    // Map role to user ID
    const userId = role === 'client' ? 'client1' : 'master1';
    
    if (onLogin) {
      onLogin(userId);
    } else if (login) {
      // Use Zustand store if no onLogin callback
      login(userId);
    }
  };

  return <RepairHubLanding onLogin={handleRoleSelect} />;
};

export default ModernLandingPage;