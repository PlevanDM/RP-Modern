import { create } from 'zustand';
import { Notification } from '../types';

// Функция для создания уведомлений с переводами
const createNotification = (key: string, type: Notification['type']): Omit<Notification, 'id' | 'createdAt' | 'read'> => {
  const messages: Record<string, string> = {
    'newProposal': 'Нова пропозиція по вашому замовленню!',
    'orderInProgress': 'Ваше замовлення в роботі.',
  };

  return {
    userId: 'client1',
    message: messages[key] || key,
    type,
    time: new Date().toLocaleTimeString('uk-UA')
  };
};

interface NotificationsState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  readNotification: (id: string) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [
    { id: '1', ...createNotification('newProposal', 'order'), read: false, createdAt: new Date() },
    { id: '2', ...createNotification('orderInProgress', 'status'), read: false, createdAt: new Date() },
  ],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Date.now().toString(), createdAt: new Date(), read: false, time: new Date().toLocaleTimeString('uk-UA') },
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
