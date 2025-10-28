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
          const response = await fetch('/api/notifications', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            set({ notifications: data });
          }
        } catch (error) {
          console.error('Failed to fetch notifications:', error);
        }
      },
      readNotification: async (notificationId: string) => {
        try {
          await fetch(`/api/notifications/${notificationId}/read`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === notificationId ? { ...n, read: true } : n
            ),
          }));
        } catch (error) {
          console.error('Failed to mark notification as read:', error);
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
