import { Order, User } from '../types/models';

export interface ClientAction {
  id: string;
  label: string;
  icon: string;
  type: 'status' | 'action';
  allowed: boolean;
  reason?: string;
}

/**
 * Determines what actions a client can perform on an order based on business logic
 */
export function getClientAvailableActions(
  order: Order, 
  currentUser: User
): ClientAction[] {
  const actions: ClientAction[] = [];

  // Client must own the order
  if (order.clientId !== currentUser.id) {
    return actions;
  }

  // Based on current status, determine available actions
  switch (order.status) {
    case 'open':
      actions.push(
        {
          id: 'cancel',
          label: 'Скасувати замовлення',
          icon: '🚫',
          type: 'action',
          allowed: true
        },
        {
          id: 'edit',
          label: 'Редагувати замовлення',
          icon: '✏️',
          type: 'action',
          allowed: true
        }
      );
      break;

    case 'accepted':
      actions.push(
        {
          id: 'cancel',
          label: 'Скасувати замовлення',
          icon: '🚫',
          type: 'action',
          allowed: true
        },
        {
          id: 'create_payment',
          label: 'Оплатити (escrow)',
          icon: '💳',
          type: 'action',
          allowed: order.paymentStatus === 'pending'
        }
      );
      break;

    case 'in_progress':
      actions.push(
        {
          id: 'release_payment',
          label: 'Підтвердити виконання',
          icon: '✅',
          type: 'action',
          allowed: true
        },
        {
          id: 'create_dispute',
          label: 'Відкрити спор',
          icon: '⚠️',
          type: 'action',
          allowed: order.disputeStatus === 'none'
        }
      );
      break;

    case 'completed':
      // Check if within 7 days for dispute
      const completedAt = order.completedAt || order.updatedAt;
      const daysSince = completedAt 
        ? Math.floor((Date.now() - new Date(completedAt).getTime()) / (24 * 60 * 60 * 1000))
        : 999;
      
      actions.push(
        {
          id: 'create_review',
          label: 'Залишити відгук',
          icon: '⭐',
          type: 'action',
          allowed: true // TODO: Check if review already exists
        },
        {
          id: 'create_dispute',
          label: 'Відкрити спор',
          icon: '⚠️',
          type: 'action',
          allowed: daysSince <= 7 && order.disputeStatus === 'none',
          reason: daysSince > 7 ? 'Термін для скарги минув' : undefined
        }
      );
      break;

    default:
      break;
  }

  return actions;
}

/**
 * Returns allowed status changes for client based on current order status
 */
export function getAllowedStatusChanges(
  order: Order,
  currentUser: User
): string[] {
  // Client cannot manually change status through dropdown
  // Status changes happen through specific actions
  const allowedStatuses: string[] = [];

  if (order.clientId !== currentUser.id) {
    return allowedStatuses;
  }

  // Based on current status and business logic
  switch (order.status) {
    case 'open':
      // Can't change to any status directly as client
      // Only through accepting offers, payments, etc.
      break;
    
    case 'accepted':
      // No manual status change
      break;
    
    case 'in_progress':
      // No manual status change
      break;
    
    case 'completed':
      // Final status
      allowedStatuses.push('completed');
      break;
  }

  return allowedStatuses;
}

