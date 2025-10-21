import { create } from 'zustand';

export interface Order {
  id: string;
  title: string;
  description: string;
  deviceType: string;
  issue: string;
  budget: number;
  city: string;
  status: 'open' | 'proposed' | 'in_progress' | 'completed' | 'deleted' | 'active_search' | 'accepted' | 'awaiting_confirmation' | 'awaiting_payment';
  urgency: 'low' | 'medium' | 'high';
  proposedPrice?: number;
  agreedPrice?: number;
  createdAt: string;
  updatedAt: string;
  clientId: string;
  assignedMasterId?: string;
  isActiveSearch?: boolean;
  deletedAt?: string;
}

interface OrdersStore {
  orders: Order[];
  
  // Actions
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  restoreOrder: (id: string) => void;
  getOrderById: (id: string) => Order | undefined;
  getClientOrders: (clientId: string) => Order[];
  
  // Mock initialization
  initializeOrders: (clientId: string) => void;
}

const generateMockOrders = (clientId: string): Order[] => {
  return [
    {
      id: 'order1',
      title: 'Ремонт екрану iPhone 15 Pro',
      description: 'Розбитий екран потребує заміни. Прошу якомога швидшого виконання.',
      deviceType: 'iPhone',
      issue: 'Пошкодження екрану',
      budget: 8500,
      city: 'Київ',
      status: 'open',
      urgency: 'high',
      createdAt: '2025-01-19T00:00:00Z',
      updatedAt: '2025-01-19T00:00:00Z',
      clientId,
    },
    {
      id: 'order2',
      title: 'Заміна дисплею iPad Air',
      description: 'Екран не світить, потребує заміни дисплея.',
      deviceType: 'iPad',
      issue: 'Пошкодження екрану',
      budget: 6500,
      city: 'Київ',
      status: 'completed',
      urgency: 'medium',
      agreedPrice: 6500,
      createdAt: '2025-01-15T00:00:00Z',
      updatedAt: '2025-01-18T00:00:00Z',
      clientId,
    },
    {
      id: 'order3',
      title: 'Чистка від вологи iPhone 13',
      description: 'Телефон впав у воду, потребує діагностики та чистки.',
      deviceType: 'iPhone',
      issue: 'Пошкодження від рідини',
      budget: 5000,
      city: 'Київ',
      status: 'proposed',
      urgency: 'high',
      createdAt: '2025-01-19T00:00:00Z',
      updatedAt: '2025-01-19T00:00:00Z',
      clientId,
      proposalCount: 2,
    },
  ];
};

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: [],

  addOrder: (order: Order) => {
    set((state) => ({
      orders: [order, ...state.orders],
    }));
  },

  updateOrder: (id: string, updates: Partial<Order>) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id
          ? {
              ...order,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : order
      ),
    }));
  },

  deleteOrder: (id: string) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: 'deleted',
              deletedAt: new Date().toISOString(),
            }
          : order
      ),
    }));
  },

  restoreOrder: (id: string) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: 'open',
              deletedAt: undefined,
            }
          : order
      ),
    }));
  },

  getOrderById: (id: string) => {
    return get().orders.find((order) => order.id === id);
  },

  getClientOrders: (clientId: string) => {
    return get().orders.filter((order) => order.clientId === clientId);
  },

  initializeOrders: (clientId: string) => {
    set({
      orders: generateMockOrders(clientId),
    });
  },
}));

