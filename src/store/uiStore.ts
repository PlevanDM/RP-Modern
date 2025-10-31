import { create } from 'zustand';

interface UIState {
  notification: {
    message: string;
    type: 'success' | 'error' | 'info';
  } | null;
  showNotification: (message: string, type?: UIState['notification']['type']) => void;
  hideNotification: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  notification: null,
  showNotification: (message, type = 'success') =>
    set({ notification: { message, type } }),
  hideNotification: () => set({ notification: null }),
}));
