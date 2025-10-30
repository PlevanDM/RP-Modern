import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, Proposal } from '../types';
import { apiOrderService } from '../services/apiOrderService';
import { mockProposals } from '../utils/mockData';
import { useAuthStore } from './authStore';
import { useUIStore } from './uiStore';
import { findMatchingMasters } from '../services/masterMatchingService';

// Role-based permission helpers
export const canClientPerformAction = (order: Order, userId: string, action: string): boolean => {
  if (order.clientId !== userId) return false;
  
  const clientActions: Record<string, Order['status'][]> = {
    cancel: ['open', 'proposed', 'accepted'],
    startDispute: ['accepted', 'in_progress'],
    acceptProposal: ['proposed'],
    rejectProposal: ['proposed'],
  };
  
  return clientActions[action]?.includes(order.status) || false;
};

export const canMasterPerformAction = (order: Order, userId: string, action: string): boolean => {
  const isAssignedMaster = order.assignedMasterId === userId;
  
  if (!isAssignedMaster && !['open', 'searching', 'active_search'].includes(order.status)) {
    return false;
  }
  
  const masterActions: Record<string, Order['status'][]> = {
    createProposal: ['open', 'searching', 'active_search'],
    complete: ['in_progress'],
    dispute: ['accepted', 'in_progress'],
    viewOrder: ['open', 'searching', 'active_search', 'proposed', 'accepted', 'in_progress', 'completed'],
  };
  
  return masterActions[action]?.includes(order.status) || false;
};

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
  createDispute: (orderId: string, reason: string,-aut> string) => void;
  resolveDispute: (disputeId: string, decision: 'client_wins' | 'master_wins' | 'compromise', explanation: string) => void;
  escalateDispute: (orderId: string) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      proposals: mockProposals,
      fetchOrders: async () => {
        try {
          // Пробуємо завантажити з API
          const apiOrders = await apiOrderService.getOrders();
          set({ orders: apiOrders });
          
          // Синхронізуємо з localStorage
          try {
            localStorage.setItem('repair_master_orders', JSON.stringify(apiOrders));
          } catch (e) {
            console.warn('Не вдалося синхронізувати з localStorage');
          }
        } catch (error) {
          // Якщо API не працює, завантажуємо з localStorage
          console.warn('API недоступний, завантажуємо з localStorage:', error);
          try {
            const localOrders = JSON.parse(localStorage.getItem('repair_master_orders') || '[]');
            set({ orders: localOrders });
          } catch (e) {
            console.error('Помилка завантаження з localStorage:', e);
            set({ orders: [] });
          }
        }
      },
      createOrder: async (order) => {
        try {
          // Генерируем ID если его нет
          const orderWithId = {
            ...order,
            id: order.id || `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: order.createdAt || new Date().toISOString(),
            updatedAt: order.updatedAt || new Date().toISOString(),
          };
          
          let newOrder: Order;
          try {
            // Пробуємо створити через API
            newOrder = await apiOrderService.createOrder(orderWithId as Order);
          } catch (apiError) {
            // Якщо API не працює, створюємо локально
            console.warn('API недоступний, створюємо локально:', apiError);
            newOrder = orderWithId as Order;
          }
          
          // Оновлюємо store
          set((state) => {
            const updatedOrders = [...state.orders, newOrder];
            return { orders: updatedOrders };
          });
          
          // Синхронізуємо з localStorage
          try {
            const existingOrders = JSON.parse(localStorage.getItem('repair_master_orders') || '[]');
            const updatedOrders = [newOrder, ...existingOrders.filter((o: Order) => o.id !== newOrder.id)];
            localStorage.setItem('repair_master_orders', JSON.stringify(updatedOrders));
            window.dispatchEvent(new CustomEvent('ordersUpdated'));
          } catch (storageError) {
            console.warn('Не вдалося синхронізувати з localStorage:', storageError);
          }
          
          // Create notifications for masters using master matching (as per ARCHITECTURE.md)
          try {
            const users = JSON.parse(localStorage.getItem('repair_master_users') || '[]');
            const allMasters = users.filter((u: any) => u.role === 'master' && !u.blocked && (u.verified !== false));
            
            // Use master matching service to find best matches
            let matchingMasters: any[] = [];
            try {
              const currentUser = useAuthStore.getState().currentUser;
              
              const clientPreferences = {
                preferredBrands: newOrder.brand ? [newOrder.brand.toLowerCase()] : undefined,
                preferredRepairTypes: newOrder.issue ? [newOrder.issue.toLowerCase()] : undefined,
                city: newOrder.city,
                preferredWorkLocation: currentUser?.preferredPriority?.includes('speed') ? 'mobile' : undefined,
                clientMobileOS: currentUser?.clientMobileOS,
                clientComputerOS: currentUser?.clientComputerOS,
                skillLevel: currentUser?.skillLevel,
                budgetRange: currentUser?.budgetRange,
              };
              
              const masterProfiles = allMasters.map((u: any) => ({
                id: u.id,
                repairBrands: u.repairBrands,
                repairTypes: u.repairTypes,
                workLocation: u.workLocation,
                isMobile: u.isMobile,
                city: u.city,
                rating: u.rating,
                completedOrders: u.completedOrders,
                workExperience: u.workExperience,
                workingRadius: u.workingRadius,
              }));
              
              const matched = findMatchingMasters(clientPreferences, masterProfiles, 20);
              matchingMasters = matched.map(m => allMasters.find((u: any) => u.id === m.master.id)).filter(Boolean);
            } catch (error) {
              console.warn('Помилка master matching, використовуємо простий фільтр:', error);
              // Fallback to simple filtering
              matchingMasters = allMasters.filter((u: any) => 
                (!newOrder.brand || !u.repairBrands || u.repairBrands.length === 0 || 
                 u.repairBrands.some((brand: string) => 
                   brand.toLowerCase().includes(newOrder.brand?.toLowerCase() || '')))
              );
            }
            
            const notifications = JSON.parse(localStorage.getItem('repairhub_notifications') || '[]');
            matchingMasters.forEach((master: any) => {
              notifications.push({
                id: `notif-${Date.now()}-${master.id}`,
                userId: master.id,
                message: `Нове замовлення доступне: "${newOrder.title}" (${newOrder.device})`,
                type: 'order',
                read: false,
                createdAt: new Date(),
              });
            });
            if (matchingMasters.length > 0) {
              localStorage.setItem('repairhub_notifications', JSON.stringify(notifications));
            }
          } catch (error) {
            console.warn('Не вдалося створити уведомлення для майстрів:', error);
          }
          
          useUIStore.getState().showNotification('Замовлення успішно створено!');
          console.log('✅ Замовлення створено:', newOrder);
        } catch (error) {
          console.error('❌ Помилка створення замовлення:', error);
          useUIStore.getState().showNotification('Помилка створення замовлення');
        }
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
        
        const order = get().orders.find((o) => o.id === orderId);
        if (!order) {
          useUIStore.getState().showNotification('Order not found.', 'error');
          return;
        }

        if (order.status !== 'open' && order.status !== 'searching' && order.status !== 'active_search') {
          useUIStore.getState().showNotification('Cannot submit proposal for this order status.', 'error');
          return;
        }

        // Check if master already has a pending proposal for this order
        const existingProposal = get().proposals.find(
          (p) => p.orderId === orderId && p.masterId === currentUser.id && p.status === 'pending'
        );
        if (existingProposal) {
          useUIStore.getState().showNotification('You have already submitted a proposal for this order.', 'error');
          return;
        }

        const newProposal: Proposal = {
          id: `proposal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
        
        // Update order status and proposal count
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status: 'proposed', proposalCount: (o.proposalCount || 0) + 1 } : o
          ),
        }));
        
        // Create notification for client (as per ARCHITECTURE.md: "Отримання пропозиції → Client")
        try {
          const order = get().orders.find(o => o.id === orderId);
          if (order && order.clientId) {
            const notifications = JSON.parse(localStorage.getItem('repairhub_notifications') || '[]');
            notifications.push({
              id: `notif-${Date.now()}`,
              userId: order.clientId,
              message: `Ви отримали нову пропозицію від ${currentUser.name} на замовлення "${order.title}"`,
              type: 'order' as const,
              read: false,
              createdAt: new Date(),
            });
            localStorage.setItem('repairhub_notifications', JSON.stringify(notifications));
          }
        } catch (error) {
          console.warn('Не вдалося створити уведомлення:', error);
        }
        
        useUIStore.getState().showNotification('Пропозицію відправлено успішно!');
      },
      updateProposal: (proposalId, updates) => {
        const currentUser = useAuthStore.getState().currentUser;
        const proposal = get().proposals.find((p) => p.id === proposalId);
        
        if (!proposal || !currentUser) {
          useUIStore.getState().showNotification('Proposal or user not found.', 'error');
          return;
        }
        
        // Only the master who created the proposal can update it
        if (currentUser.role !== 'master' || proposal.masterId !== currentUser.id) {
          useUIStore.getState().showNotification('You can only update your own proposals.', 'error');
          return;
        }
        
        // Check if proposal is still pending or in a state that can be updated
        if (!['pending', 'accepted'].includes(proposal.status)) {
          useUIStore.getState().showNotification('Cannot update this proposal.', 'error');
          return;
        }
        
        set((state) => ({
          processos: state.proposals.map((p) =>
            p.id === proposalId ? { ...p, ...updates, updatedAt: new Date() } : p
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

        // Check if proposal is still pending
        if (proposal.status !== 'pending') {
          useUIStore.getState().showNotification('This proposal has already been processed.', 'error');
          return;
        }

        // Reject all other proposals for this order
        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.orderId === proposal.orderId && p.id !== proposalId
              ? { ...p, status: 'rejected' }
              : p.id === proposalId
              ? { ...p, status: 'accepted' }
              : p
          ),
        }));

        // Update order with master assignment
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === proposal.orderId
              ? { ...o, status: 'accepted', assignedMasterId: proposal.masterId, agreedPrice: proposal.price }
              : o
          ),
        }));
        
        // Automatically create conversation between client and master (as per ARCHITECTURE.md)
        try {
          const { getOrCreateConversation } = require('../services/chatService');
          if (order.clientId && proposal.masterId) {
            getOrCreateConversation(order.clientId, proposal.masterId, proposal.orderId);
          }
        } catch (error) {
          console.warn('Не вдалося автоматично створити розмову:', error);
        }
        
        // Update order status to in_progress after a short delay
        setTimeout(() => {
          get().updateOrderStatus(proposal.orderId, 'in_progress');
        }, 500);

        useUIStore.getState().showNotification('Пропозицію прийнято! Замовлення розпочато. Розмова з майстром створена.');
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

        if (!order || !currentUser) {
          useUIStore.getState().showNotification('Order or user not found.', 'error');
          return;
        }

        const allowedTransitions: Record<Order['status'], Order['status'][]> = {
          open: ['proposed', 'cancelled', 'deleted'],
          proposed: ['accepted', 'cancelled', 'deleted'],
          accepted: ['in_progress', 'cancelled'],
          in_progress: ['completed', 'cancelled', 'dispute'],
          completed: [],
          cancelled: [],
          deleted: ['open'],
          searching: ['proposed', 'cancelled'],
          active_search: ['proposed', 'cancelled'],
          dispute: ['cancelled', 'in_progress', 'completed'],
        };

        // Enhanced permission checks based on role and order status
        let hasPermission = false;
        
        if (currentUser.role === 'admin') {
          hasPermission = true;
        } else if (currentUser.role === 'client') {
          // Client can only update their own orders
          if (order.clientId !== currentUser.id) {
            hasPermission = false;
          } else {
            // Client permissions for different transitions
            if (status === 'cancelled') {
              hasPermission = ['open', 'proposed', 'accepted'].includes(order.status);
            } else if (status === 'in_progress') {
              hasPermission = order.status === 'accepted';
            } else if (status === 'completed') {
              hasPermission = false; // Only master can complete
            } else if (status === 'dispute') {
              hasPermission = ['accepted', 'in_progress'].includes(order.status);
            } else {
              hasPermission = allowedTransitions[order.status]?.includes(status) || false;
            }
          }
        } else if (currentUser.role === 'master') {
          // Master permissions
          if (order.status === 'open' || order.status === 'searching' || order.status === 'active_search') {
            // Masters can view but not directly change status of open orders
            hasPermission = false;
          } else if (status === 'completed') {
            // Master can only complete orders they are assigned to
            hasPermission = order.assignedMasterId === currentUser.id && order.status === 'in_progress';
          } else if (status === 'dispute') {
            hasPermission = ['accepted', 'in_progress'].includes(order.status) && order.assignedMasterId === currentUser.id;
          } else {
            hasPermission = order.assignedMasterId === currentUser.id && allowedTransitions[order.status]?.includes(status) || false;
          }
        }

        if (!hasPermission) {
          useUIStore
            .getState()
            .showNotification(
              'You do not have permission to perform this action.',
              'error'
            );
          return;
        }

        if (!allowedTransitions[order.status]?.includes(status)) {
          useUIStore
            .getState()
            .showNotification(
              `Cannot change status from ${order.status} to ${status}.`,
              'error'
            );
          return;
        }

        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status, updatedAt: new Date(), completedAt: status === 'completed' ? new Date().toISOString() : o.completedAt } : o
          ),
        }));
        
        // Create notifications based on status change (as per ARCHITECTURE.md)
        if (status === 'completed') {
          try {
            const notifications = JSON.parse(localStorage.getItem('repairhub_notifications') || '[]');
            
            // Notify client (as per ARCHITECTURE.md: "Завершення роботи → Client")
            if (order.clientId) {
              notifications.push({
                id: `notif-${Date.now()}-client-complete`,
                userId: order.clientId,
                message: `Майстер завершив роботу над замовленням "${order.title}". Можете перевірити та підтвердити.`,
                type: 'status',
                read: false,
                createdAt: new Date(),
              });
            }
            
            // Notify master (as per ARCHITECTURE.md: "Завершення роботи → Master")
            if (order.assignedMasterId) {
              notifications.push({
                id: `notif-${Date.now()}-master-complete`,
                userId: order.assignedMasterId,
                message: `Замовлення "${order.title}" позначено як завершене. Очікуємо підтвердження від клієнта.`,
                type: 'status',
                read: false,
                createdAt: new Date(),
              });
            }
            
            localStorage.setItem('repairhub_notifications', JSON.stringify(notifications));
          } catch (error) {
            console.warn('Не вдалося створити уведомлення при завершенні:', error);
          }
        }
        
        useUIStore
          .getState()
          .showNotification(`Статус замовлення оновлено: ${status === 'completed' ? 'завершено' : status}!`);
      },
      updatePayment: (orderId, amount) => {
        const currentUser = useAuthStore.getState().currentUser;
        const order = get().orders.find((o) => o.id === orderId);
        
        if (!order || !currentUser) {
          useUIStore.getState().showNotification('Order not found', 'error');
          return;
        }

        // Only client can initiate payment
        if (currentUser.role !== 'client' && currentUser.role !== 'admin') {
          useUIStore.getState().showNotification('Only client can initiate payment', 'error');
          return;
        }

        if (order.clientId !== currentUser.id && currentUser.role !== 'admin') {
          useUIStore.getState().showNotification('This is not your order', 'error');
          return;
        }

        //жный if order is in correct status
        if (order.status !== 'accepted') {
          useUIStore.getState().showNotification('Order must be accepted before payment', 'error');
          return;
        }

        // Update order with payment info and set to in_progress
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  amount,
                  status: 'in_progress',
                  updatedAt: new Date().toISOString(),
                }
              : o
          ),
        }));

        useUIStore.getState().showNotification(`Payment of ₴${amount} successful! Master can now start work.`);
      },
      releasePayment: (orderId) => {
        const currentUser = useAuthStore.getState().currentUser;
        const order = get().orders.find((o) => o.id === orderId);

        if (!order || !currentUser) {
          useUIStore.getState().showNotification('Order not found', 'error');
          return;
        }

        // Only client or admin can release payment
        if (order.clientId !== currentUser.id && currentUser.role !== 'admin') {
          useUIStore.getState().showNotification('Only order owner can release payment', 'error');
          return;
        }

        // Only in_progress orders can have payment released
        if (order.status !== 'in_progress') {
          useUIStore.getState().showNotification('Order must be in progress to release payment', 'error');
          return;
        }

        // Calculate commission (5% according to architecture)
        const paymentAmount = order.paymentAmount || order.agreedPrice || order.amount || 0;
        const commission = paymentAmount * 0.05;
        const masterAmount = paymentAmount - commission;

        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: 'completed',
                  paymentStatus: 'released',
                  completedAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }
              : o
          ),
        }));

        // Update master balance
        const masterId = order.assignedMasterId;
        if (masterId) {
          try {
            const users = JSON.parse(localStorage.getItem('repair_master_users') || '[]');
            const updatedUsers = users.map((u: any) =>
              u.id === masterId
                ? { ...u, balance: (u.balance || 0) + masterAmount }
                : u
            );
            localStorage.setItem('repair_master_users', JSON.stringify(updatedUsers));
          } catch (e) {
            console.warn('Не вдалося оновити баланс майстра:', e);
          }
        }

        // Create notification for master (as per ARCHITECTURE.md: "Звільнення оплати → Master")
        try {
          const notifications = JSON.parse(localStorage.getItem('repairhub_notifications') || '[]');
          if (masterId) {
            notifications.push({
              id: `notif-${Date.now()}-payment`,
              userId: masterId,
              message: `Оплату за замовлення "${order.title}" виплачено! Ви отримали ₴${masterAmount.toFixed(2)}`,
              type: 'payment',
              read: false,
              createdAt: new Date(),
            });
            localStorage.setItem('repairhub_notifications', JSON.stringify(notifications));
          }
        } catch (error) {
          console.warn('Не вдалося створити уведомлення майстру:', error);
        }
        
        // Request review from client (as per ARCHITECTURE.md: "Запит на відгук → Client")
        try {
          if (order.clientId) {
            const notifications = JSON.parse(localStorage.getItem('repairhub_notifications') || '[]');
            notifications.push({
              id: `notif-${Date.now()}-review`,
              userId: order.clientId,
              message: `Замовлення "${order.title}" завершено! Будь ласка, залиште відгук про роботу майстра.`,
              type: 'rating',
              read: false,
              createdAt: new Date(),
            });
            localStorage.setItem('repairhub_notifications', JSON.stringify(notifications));
          }
        } catch (error) {
          console.warn('Не вдалося створити запит на відгук:', error);
        }
        
        useUIStore.getState().showNotification(
          `Оплату виплачено! Майстер отримає ₴${masterAmount.toFixed(2)} (комісія платформи: ₴${commission.toFixed(2)})`
        );
      },
      refundPayment: (orderId) => {
        const currentUser = useAuthStore.getState().currentUser;
        const order = get().orders.find((o) => o.id === orderId);

        if (!order || !currentUser) {
          useUIStore.getState().showNotification('Order not found', 'error');
          return;
        }

        // Only admin can refund payments
        if (currentUser.role !== 'admin') {
          useUIStore.getState().showNotification('Only admins can process refunds', 'error');
          return;
        }

        // Only in_progress orders can be refunded
        if (order.status !== 'in_progress') {
          useUIStore.getState().showNotification('Order must be in progress to refund', 'error');
          return;
        }

        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: 'cancelled',
                  updatedAt: new Date().toISOString(),
                }
              : o
          ),
        }));

        useUIStore.getState().showNotification(`Payment of ₴${order.amount} refunded to client!`);
      },
      createDispute: (orderId, reason, description?) => {
        const currentUser = useAuthStore.getState().currentUser;
        const order = get().orders.find((o) => o.id === orderId);

        if (!order || !currentUser) {
          useUIStore.getState().showNotification('Order not found', 'error');
          return;
        }

        // Check if user is participant
        const isParticipant = 
          (currentUser.role === 'client' && order.clientId === currentUser.id) ||
          (currentUser.role === 'master' && order.assignedMasterId === currentUser.id);

        if (!isParticipant && currentUser.role !== 'admin') {
          useUIStore.getState().showNotification('You are not a participant in this order', 'error');
          return;
        }

        // Can only create dispute if order is in_progress or completed
        if (!['in_progress', 'completed', 'accepted'].includes(order.status)) {
          useUIStore.getState().showNotification('Dispute can only be created for in-progress or completed orders', 'error');
          return;
        }

        // Check if dispute already exists
        const existingDispute = order.status === 'dispute' || order.disputeStatus === 'open';
        if (existingDispute) {
          useUIStore.getState().showNotification('Dispute already exists for this order', 'error');
          return;
        }

        // Change status to dispute and freeze payment
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: 'dispute' as Order['status'],
                  disputeStatus: 'open' as Order['disputeStatus'],
                  disputeReason: reason,
                  disputeDescription: description || '',
                  disputeCreatedAt: new Date().toISOString(),
                  paymentStatus: o.paymentStatus === 'escrowed' ? 'frozen' as Order['paymentStatus'] : o.paymentStatus,
                  updatedAt: new Date().toISOString(),
                }
              : o
          ),
        }));

        // Save dispute to localStorage
        try {
          const disputes = JSON.parse(localStorage.getItem('disputes') || '[]');
          const newDispute = {
            id: `dispute-${Date.now()}`,
            orderId,
            clientId: order.clientId,
            masterId: order.assignedMasterId || '',
            reason,
            description: description || '',
            status: 'open',
            createdAt: new Date().toISOString(),
          };
          disputes.push(newDispute);
          localStorage.setItem('disputes', JSON.stringify(disputes));
        } catch (e) {
          console.warn('Не вдалося зберегти спір:', e);
        }

        // Create notifications for dispute (as per ARCHITECTURE.md: "Створення спору → Client, Master, Admin")
        try {
          const notifications = JSON.parse(localStorage.getItem('repairhub_notifications') || '[]');
          
          // Notify client
          if (order.clientId) {
            notifications.push({
              id: `notif-${Date.now()}-dispute-client`,
              userId: order.clientId,
              message: `Відкрито спір по замовленню "${order.title}". Адміністратор розгляне протягом 24 годин.`,
              type: 'status',
              read: false,
              createdAt: new Date(),
            });
          }
          
          // Notify master
          if (order.assignedMasterId) {
            notifications.push({
              id: `notif-${Date.now()}-dispute-master`,
              userId: order.assignedMasterId,
              message: `Відкрито спір по замовленню "${order.title}". Адміністратор розгляне протягом 24 годин.`,
              type: 'status',
              read: false,
              createdAt: new Date(),
            });
          }
          
          // Notify admins
          const users = JSON.parse(localStorage.getItem('repair_master_users') || '[]');
          const admins = users.filter((u: any) => u.role === 'admin' || u.role === 'superadmin');
          admins.forEach((admin: any) => {
            notifications.push({
              id: `notif-${Date.now()}-dispute-admin-${admin.id}`,
              userId: admin.id,
              message: `Відкрито новий спір по замовленню "${order.title}". Потрібно розглянути.`,
              type: 'status',
              read: false,
              createdAt: new Date(),
            });
          });
          
          localStorage.setItem('repairhub_notifications', JSON.stringify(notifications));
        } catch (error) {
          console.warn('Не вдалося створити уведомлення про спір:', error);
        }

        useUIStore.getState().showNotification(`Спір відкрито: ${reason}. Адміністратор розгляне протягом 24 годин.`);
      },
      resolveDispute: (disputeId, decision, explanation) => {
        const currentUser = useAuthStore.getState().currentUser;
        
        if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'superadmin')) {
          useUIStore.getState().showNotification('Тільки адміністратори можуть вирішувати спори', 'error');
          return;
        }
        
        // Find dispute
        const disputes = JSON.parse(localStorage.getItem('disputes') || '[]');
        const dispute = disputes.find((d: any) => d.id === disputeId);
        if (!dispute) {
          useUIStore.getState().showNotification('Спір не знайдено', 'error');
          return;
        }
        
        // Find order
        const order = get().orders.find((o) => o.id === dispute.orderId);
        if (!order) {
          useUIStore.getState().showNotification('Замовлення не знайдено', 'error');
          return;
        }
        
        const paymentAmount = order.paymentAmount || order.agreedPrice || order.amount || 0;
        const commission = paymentAmount * 0.05; // Unchanged: 5% commission
        
        // Resolve based on decision
        if (decision === 'client_wins') {
          // Full refund to client
          set((state) => ({
            orders: state.orders.map((o) =>
              o.id === dispute.orderId
                ? {
                    ...o,
                    status: 'cancelled',
                    paymentStatus: 'refunded',
                    disputeStatus: 'resolved',
                    updatedAt: new Date().toISOString(),
                  }
                : o
            ),
          }));
          
          // Update dispute
          const updatedDisputes = disputes.map((d: any) =>
            d.id === disputeId
              ? {
                  ...d,
                  status: 'resolved',
                  decision: 'client_wins',
                  resolution: explanation || 'Повний повернено клієнту',
                  resolvedAt: new Date().toISOString(),
                  resolutionBy: currentUser.id,
                }
              : d
          );
          localStorage.setItem('disputes', JSON.stringify(updatedDisputes));
          
        } else if (decision === 'master_wins') {
          // Release payment to master (with 5% commission)
          const masterAmount = paymentAmount - commission;
          
          set((state) => ({
            orders: state.orders.map((o) =>
              o.id === dispute.orderId
                ? {
                    ...o,
                    status: 'completed',
                    paymentStatus: 'released',
                    disputeStatus: 'resolved',
                    completedAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  }
                : o
            ),
          }));
          
          // Update master balance
          if (order.assignedMasterId) {
            try {
              const users = JSON.parse(localStorage.getItem('repair_master_users') || '[]');
              const updatedUsers = users.map((u: any) =>
                u.id === order.assignedMasterId
                  ? { ...u, balance: (u.balance || 0) + masterAmount }
                  : u
              );
              localStorage.setItem('repair_master_users', JSON.stringify(updatedUsers));
            } catch (e) {
              console.warn('Не вдалося оновити баланс майстра:', e);
            }
          }
          
          // Update dispute
          const updatedDisputes = disputes.map((d: any) =>
            d.id === disputeId
              ? {
                  ...d,
                  status: 'resolved',
                  decision: 'master_wins',
                  resolution: explanation || `Оплату виплачено майстру (₴${masterAmount.toFixed(2)})`,
                  resolvedAt: new Date().toISOString(),
                  resolutionBy: currentUser.id,
                }
              : d
          );
          localStorage.setItem('disputes', JSON.stringify(updatedDisputes));
          
        } else if (decision === 'compromise') {
          // Compromise - payment stays frozen, manual distribution needed
          set((state) => ({
            orders: state.orders.map((o) =>
              o.id === dispute.orderId
                ? {
                    ...o,
                    disputeStatus: 'resolved',
                    paymentStatus: 'frozen',
                    updatedAt: new Date().toISOString(),
                  }
                : o
            ),
          }));
          
          // Update dispute
          const updatedDisputes = disputes.map((d: any) =>
            d.id === disputeId
              ? {
                  ...d,
                  status: 'resolved',
                  decision: 'compromise',
                  resolution: explanation || 'Компромісне рішення. Потрібне ручне розподілення коштів',
                  resolvedAt: new Date().toISOString(),
                  resolutionBy: currentUser.id,
                }
              : d
          );
          localStorage.setItem('disputes', JSON.stringify(updatedDisputes));
        }
        
        useUIStore.getState().showNotification(`Спір вирішено: ${decision === 'client_wins' ? 'на користь клієнта' : decision === 'master_wins' ? 'на користь майстра' : 'компроміс'}`);
      },
      escalateDispute: (orderId) => {
        const currentUser = useAuthStore.getState().currentUser;
        const order = get().orders.find((o) => o.id === orderId);

        if (!order || !currentUser) {
          useUIStore.getState().showNotification('Order not found', 'error');
          return;
        }

        // Only admin can escalate disputes
        if (currentUser.role !== 'admin') {
          useUIStore.getState().showNotification('Only admins can escalate disputes', 'error');
          return;
        }

        // Check if order is in dispute status
        if (order.status !== 'dispute' && order.status !== 'disputed') {
          useUIStore.getState().showNotification('Order must be in dispute status', 'error');
          return;
        }

        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: 'escalated_dispute',
                  updatedAt: new Date().toISOString(),
                }
              : o
          ),
        }));

        useUIStore.getState().showNotification('Dispute escalated! Requires additional investigation.');
      },
    }),
    {
      name: 'orders-storage',
      onRehydrateStorage: (state) => {
        if (state) {
          if (!state.orders) {
            state.orders = [];
          }
          state.fetchOrders();
        }
      },
    }
  )
);
