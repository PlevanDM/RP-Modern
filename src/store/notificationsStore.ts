import { create } from 'zustand';
import { Notification } from '../types';

interface NotificationsState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  readNotification: (id: string) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [
    { id: '1', userId: 'client1', message: 'New proposal on your order!', type: 'order', read: false, createdAt: new Date() },
    { id: '2', userId: 'client1', message: 'Your order is in progress.', type: 'status', read: false, createdAt: new Date() },
  ],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Date.now().toString(), createdAt: new Date(), read: false },
      ],
    })),
  readNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
