import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notification } from '../types/models';

interface NotificationsState {
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
  readNotification: (notificationId: string) => Promise<void>;
  removeNotification: (notificationId: string) => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, _get) => ({
      notifications: [],
      fetchNotifications: async () => {
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
          const token = localStorage.getItem('token');
          
          if (!token) {
            // Немає токену - залишаємо порожній масив
            return;
          }

          const response = await fetch(`${API_URL}/notifications`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          // Перевіряємо чи response є JSON
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            // Не JSON відповідь - ігноруємо, щоб не ламати рендеринг
            return;
          }

          if (response.ok) {
            const data = await response.json();
            set({ notifications: Array.isArray(data) ? data : [] });
          }
        } catch (error) {
          // Тиха обробка помилок - не ламаємо рендеринг
          // Помилки логуються в ErrorHandler
          if (import.meta.env.DEV) {
            console.debug('Notifications fetch failed (non-critical):', error);
          }
        }
      },
      readNotification: async (notificationId: string) => {
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
          const token = localStorage.getItem('token');
          
          if (!token) return;

          await fetch(`${API_URL}/notifications/${notificationId}/read`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          
          // Оновлюємо локально незалежно від відповіді сервера
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === notificationId ? { ...n, read: true } : n
            ),
          }));
        } catch {
          // Тиха обробка - оновлюємо локально навіть якщо сервер не відповів
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === notificationId ? { ...n, read: true } : n
            ),
          }));
          
          if (import.meta.env.DEV) {
            console.debug('Mark notification as read failed (non-critical)');
          }
        }
      },
      removeNotification: (notificationId: string) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== notificationId),
        }));
      },
    }),
    {
      name: 'notifications-storage',
    }
  )
);
