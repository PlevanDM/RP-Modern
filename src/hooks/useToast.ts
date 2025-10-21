import { useState, useCallback } from 'react';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration: number = 3000
  ) => {
    const id = Date.now().toString();
    const toast: ToastMessage = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  const success = useCallback((message: string, duration?: number) => {
    return showToast(message, 'success', duration);
  }, [showToast]);

  const error = useCallback((message: string, duration?: number) => {
    return showToast(message, 'error', duration);
  }, [showToast]);

  const info = useCallback((message: string, duration?: number) => {
    return showToast(message, 'info', duration);
  }, [showToast]);

  const warning = useCallback((message: string, duration?: number) => {
    return showToast(message, 'warning', duration);
  }, [showToast]);

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    info,
    warning
  };
};
