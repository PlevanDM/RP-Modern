import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, Proposal } from '../types';
import { apiOrderService } from '../services/apiOrderService';
import { mockProposals } from '../utils/mockData';
import { useAuthStore } from './authStore';
import { useUIStore } from './uiStore';

interface OrdersState {
  orders: Order[];
  proposals: Proposal[];
  fetchOrders: () => Promise<void>;
  createOrder: (order: Omit<Order, 'id'>) => void;
  deleteOrder: (orderId: string) => void;
  restoreOrder: (orderId: string) => void;
  editOrder: (order: Order) => void;
  toggleActiveSearch: (orderId: string) => void;
  sendToMaster: (orderId: string, masterId: string) => void;
  submitProposal: (
    orderId: string,
    price: number,
    description: string
  ) => void;
  updateProposal: (proposalId: string, updates: Partial<Proposal>) => void;
  acceptProposal: (proposalId: string) => void;
  rejectProposal: (proposalId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updatePayment: (orderId: string, amount: number) => void;
  releasePayment: (orderId: string) => void;
  refundPayment: (orderId: string) => void;
  createDispute: (orderId: string, reason: string) => void;
  escalateDispute: (orderId: string) => void;
}

import { persist } from 'zustand/middleware';

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      proposals: mockProposals,
      fetchOrders: async () => {
        const orders = await apiOrderService.getOrders();
        set({ orders });
      },
      createOrder: async (order) => {
        const newOrder = await apiOrderService.createOrder(order);
        set((state) => ({ orders: [...state.orders, newOrder] }));
        useUIStore.getState().showNotification('Order created successfully!');
      },
      deleteOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status: 'deleted' } : o
          ),
        }));
        useUIStore.getState().showNotification('Order deleted successfully!');
      },
      restoreOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status: 'new' } : o
          ),
        }));
        useUIStore.getState().showNotification('Order restored successfully!');
      },
      editOrder: (order) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === order.id ? order : o)),
        }));
        useUIStore.getState().showNotification('Order updated successfully!');
      },
      toggleActiveSearch: (orderId) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, active_search: !o.active_search } : o
          ),
        }));
      },
      sendToMaster: (orderId, masterId) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? { ...o, assignedMasterId: masterId, status: 'proposed' }
              : o
          ),
        }));
        useUIStore.getState().showNotification('Order sent to master successfully!');
      },
      submitProposal: (orderId, price, description) => {
        const currentUser = useAuthStore.getState().currentUser;
        if (!currentUser || currentUser.role !== 'master') {
          useUIStore
            .getState()
            .showNotification('Only masters can submit proposals.', 'error');
          return;
        }
        const newProposal: Proposal = {
          id: Date.now().toString(),
          orderId,
          masterId: currentUser.id,
          masterName: currentUser.name,
          masterRating: currentUser.rating,
          price,
          description,
          status: 'pending',
          createdAt: new Date(),
        };
        set((state) => ({ proposals: [...state.proposals, newProposal] }));
        get().updateOrderStatus(orderId, 'proposed');
        useUIStore.getState().showNotification('Proposal submitted successfully!');
      },
      updateProposal: (proposalId, updates) => {
        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.id === proposalId ? { ...p, ...updates } : p
          ),
        }));
        useUIStore.getState().showNotification('Proposal updated successfully!');
      },
      acceptProposal: (proposalId) => {
        const currentUser = useAuthStore.getState().currentUser;
        const proposal = get().proposals.find((p) => p.id === proposalId);
        if (!proposal) return;
        const order = get().orders.find((o) => o.id === proposal.orderId);

        if (!currentUser || !order || currentUser.id !== order.clientId) {
          useUIStore
            .getState()
            .showNotification(
              'Only the client can accept a proposal.',
              'error'
            );
          return;
        }

        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.id === proposalId ? { ...p, status: 'accepted' } : p
          ),
        }));

        if (proposal) {
          get().updateOrderStatus(proposal.orderId, 'in_progress');
        }
        useUIStore.getState().showNotification('Proposal accepted!');
      },
      rejectProposal: (proposalId) => {
        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.id === proposalId ? { ...p, status: 'rejected' } : p
          ),
        }));
        useUIStore.getState().showNotification('Proposal rejected!');
      },
      updateOrderStatus: (orderId, status) => {
        const currentUser = useAuthStore.getState().currentUser;
        const order = get().orders.find((o) => o.id === orderId);

        if (!order || !currentUser) return;

        const allowedTransitions: Record<Order['status'], Order['status'][]> = {
          open: ['proposed', 'cancelled', 'deleted'],
          proposed: ['accepted', 'cancelled', 'deleted'],
          accepted: ['in_progress', 'cancelled'],
          in_progress: ['completed', 'cancelled'],
          completed: [],
          cancelled: [],
          deleted: ['open'],
          searching: ['proposed', 'cancelled'],
          active_search: ['proposed', 'cancelled'],
        };

        const hasPermission =
          currentUser.role === 'admin' ||
          (currentUser.role === 'client' && order.clientId === currentUser.id) ||
          (currentUser.role === 'master' &&
            order.assignedMasterId === currentUser.id);

        if (!hasPermission) {
          useUIStore
            .getState()
            .showNotification(
              'You do not have permission to update this order.',
              'error'
            );
          return;
        }

        if (allowedTransitions[order.status].includes(status)) {
          set((state) => ({
            orders: state.orders.map((o) =>
              o.id === orderId ? { ...o, status } : o
            ),
          }));
          useUIStore
            .getState()
            .showNotification('Order status updated successfully!');
        } else {
          useUIStore
            .getState()
            .showNotification(
              `Cannot change status from ${order.status} to ${status}.`,
              'error'
            );
        }
      },
      updatePayment: (orderId, _amount) => {
        get().updateOrderStatus(orderId, 'paid');
        useUIStore.getState().showNotification('Payment successful!');
      },
      releasePayment: (orderId) => {
        get().updateOrderStatus(orderId, 'completed');
        useUIStore.getState().showNotification('Payment released to master!');
      },
      refundPayment: (orderId) => {
        get().updateOrderStatus(orderId, 'refunded');
        useUIStore.getState().showNotification('Payment refunded to client!');
      },
      createDispute: (orderId, _reason) => {
        get().updateOrderStatus(orderId, 'dispute');
        useUIStore.getState().showNotification('Dispute created!');
      },
      escalateDispute: (orderId) => {
        get().updateOrderStatus(orderid, 'escalated_dispute');
        useUIStore.getState().showNotification('Dispute escalated!');
      },
    }),
    {
      name: 'orders-storage',
    }
  )
);
