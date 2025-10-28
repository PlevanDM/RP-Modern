import { Order, Proposal } from '../types';

export interface RoleNotification {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  role: 'client' | 'master' | 'admin';
  orderId?: string;
  proposalId?: string;
}

/**
 * Generate notifications for order events based on roles
 */
export const generateOrderNotifications = (
  order: Order,
  event: 'created' | 'proposed' | 'accepted' | 'rejected' | 'completed' | 'cancelled' | 'disputed',
  proposal?: Proposal
): RoleNotification[] => {
  const notifications: RoleNotification[] = [];

  switch (event) {
    case 'created':
      notifications.push({
        type: 'info',
        message: `New order created: ${order.title}`,
        role: 'client',
        orderId: order.id,
      });
      // Notify masters about new open order
      notifications.push({
        type: 'info',
        message: `New order available: ${order.title}`,
        role: 'master',
        orderId: order.id,
      });
      break;

    case 'proposed':
      if (proposal) {
        notifications.push({
          type: 'success',
          message: `New proposal received from ${proposal.masterName}`,
          role: 'client',
          orderId: order.id,
          proposalId: proposal.id,
        });
      }
      break;

    case 'accepted':
      notifications.push({
        type: 'success',
        message: `Your proposal has been accepted!`,
        role: 'master',
        orderId: order.id,
        proposalId: proposal?.id,
      });
      notifications.push({
        type: 'success',
        message: `Order "${order.title}" is now in progress`,
        role: 'client',
        orderId: order.id,
      });
      break;

    case 'completed':
      notifications.push({
        type: 'success',
        message: `Order "${order.title}" has been completed`,
        role: 'client',
        orderId: order.id,
      });
      notifications.push({
        type: 'success',
        message: `Order "${order.title}" completed successfully`,
        role: 'master',
        orderId: order.id,
      });
      break;

    case 'cancelled':
      notifications.push({
        type: 'warning',
        message: `Order "${order.title}" has been cancelled`,
        role: order.assignedMasterId ? 'master' : 'client',
        orderId: order.id,
      });
      break;

    case 'disputed':
      notifications.push({
        type: 'error',
        message: `Dispute opened for order "${order.title}"`,
        role: 'client',
        orderId: order.id,
      });
      notifications.push({
        type: 'error',
        message: `Dispute opened for order "${order.title}"`,
        role: 'master',
        orderId: order.id,
      });
      notifications.push({
        type: 'error',
        message: `Dispute requires attention: "${order.title}"`,
        role: 'admin',
        orderId: order.id,
      });
      break;
  }

  return notifications;
};

/**
 * Get role-specific notification messages
 */
export const getRoleNotificationMessage = (
  userRole: 'client' | 'master' | 'admin',
  action: string,
  _context: Record<string, unknown>
): string => {
  const messages: Record<string, Record<string, string>> = {
    client: {
      proposalAccepted: 'Your order has received a proposal',
      orderCompleted: 'Your order has been completed',
      paymentRequired: 'Payment is required to release funds',
      disputeOpened: 'A dispute has been opened on your order',
    },
    master: {
      proposalAccepted: 'Your proposal has been accepted',
      orderAssigned: 'You have been assigned to an order',
      orderCompleted: 'Order marked as completed',
      paymentReleased: 'Payment has been released',
    },
    admin: {
      disputeEscalated: 'A dispute requires admin attention',
      systemAlert: 'System alert',
    },
  };

  return messages[userRole]?.[action] || `Action: ${action}`;
};
