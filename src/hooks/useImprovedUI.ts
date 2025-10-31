import { useState, useCallback } from 'react';

export interface UIState {
  isWizardOpen: boolean;
  notifications: Array<{ id: string; type: string; message: string }>;
  isNotificationCenterOpen: boolean;
  currentEscrowFlow: string | null;
  unreadCount: number;
  isMobileMenuOpen: boolean;
  activeTab: string;
}

const initialState: UIState = {
  isWizardOpen: false,
  notifications: [],
  isNotificationCenterOpen: false,
  currentEscrowFlow: null,
  unreadCount: 0,
  isMobileMenuOpen: false,
  activeTab: 'dashboard'
};

export function useImprovedUI() {
  const [state, setState] = useState<UIState>(initialState);

  // Open Order Creation Wizard
  const openOrderWizard = useCallback(() => {
    setState(prev => ({ ...prev, isWizardOpen: true }));
  }, []);

  // Close Order Creation Wizard
  const closeOrderWizard = useCallback(() => {
    setState(prev => ({ ...prev, isWizardOpen: false }));
  }, []);

  // Add notification
  const addNotification = useCallback((type: string, message: string) => {
    const id = Date.now().toString();
    setState(prev => ({
      ...prev,
      notifications: [...prev.notifications, { id, type, message }],
      unreadCount: prev.unreadCount + 1
    }));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }, [removeNotification]);

  // Remove notification
  const removeNotification = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id)
    }));
  }, []);

  // Toggle notification center
  const toggleNotificationCenter = useCallback(() => {
    setState(prev => ({
      ...prev,
      isNotificationCenterOpen: !prev.isNotificationCenterOpen,
      unreadCount: prev.isNotificationCenterOpen ? 0 : prev.unreadCount
    }));
  }, []);

  // Open Escrow Payment Flow
  const startEscrowPayment = useCallback((orderId: string) => {
    setState(prev => ({ ...prev, currentEscrowFlow: orderId }));
  }, []);

  // Close Escrow Payment Flow
  const closeEscrowPayment = useCallback(() => {
    setState(prev => ({ ...prev, currentEscrowFlow: null }));
  }, []);

  // Toggle Mobile Menu
  const toggleMobileMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }));
  }, []);

  // Set active tab
  const setActiveTab = useCallback((tab: string) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  }, []);

  // Simulate incoming notification
  const simulateIncomingNotification = useCallback((type: string, message: string) => {
    addNotification(type, message);
  }, [addNotification]);

  return {
    state,
    openOrderWizard,
    closeOrderWizard,
    addNotification,
    removeNotification,
    toggleNotificationCenter,
    startEscrowPayment,
    closeEscrowPayment,
    toggleMobileMenu,
    setActiveTab,
    simulateIncomingNotification
  };
}
