import { Order, User } from '../types';

/**
 * Check if user can perform a specific action on an order
 */
export const checkOrderPermission = (
  user: User | null,
  order: Order,
  action: string
): boolean => {
  if (!user || !order) return false;

  switch (action) {
    case 'view':
      // Anyone can view orders
      return true;

    case 'createProposal':
      // Only masters can create proposals
      if (user.role !== 'master') return false;
      // Only for open orders
      return ['open', 'searching', 'active_search'].includes(order.status);

    case 'acceptProposal':
      // Only clients can accept proposals
      if (user.role !== 'client') return false;
      // Only their own orders
      if (order.clientId !== user.id) return false;
      return order.status === 'proposed';

    case 'complete':
      // Only masters can complete orders
      if (user.role !== 'master') return false;
      // Only their assigned orders
      if (order.assignedMasterId !== user.id) return false;
      return order.status === 'in_progress';

    case 'cancel':
      if (user.role === 'client') {
        return order.clientId === user.id && ['open', 'proposed', 'accepted'].includes(order.status);
      }
      if (user.role === 'master') {
        return order.assignedMasterId === user.id && ['accepted', 'in_progress'].includes(order.status);
      }
      return false;

    case 'dispute':
      return order.clientId === user.id || order.assignedMasterId === user.id;

    case 'delete':
      return user.role === 'client' && order.clientId === user.id;

    case 'edit':
      return user.role === 'client' && order.clientId === user.id && order.status === 'open';

    default:
      return false;
  }
};

/**
 * Get available actions for a user on an order
 */
export const getAvailableActions = (user: User | null, order: Order): string[] => {
  if (!user) return [];

  const actions: string[] = [];

  if (user.role === 'client' && order.clientId === user.id) {
    if (['open', 'proposed', 'accepted'].includes(order.status)) {
      actions.push('cancel');
    }
    if (order.status === 'proposed') {
      actions.push('acceptProposal', 'rejectProposal');
    }
    if (['accepted', 'in_progress'].includes(order.status)) {
      actions.push('dispute');
    }
    if (order.status === 'open') {
      actions.push('edit', 'delete');
    }
  }

  if (user.role === 'master') {
    if (['open', 'searching', 'active_search'].includes(order.status)) {
      actions.push('createProposal');
    }
    if (order.assignedMasterId === user.id) {
      if (order.status === 'in_progress') {
        actions.push('complete', 'dispute');
      }
      if (['accepted', 'in_progress'].includes(order.status)) {
        actions.push('cancel');
      }
    }
  }

  return actions;
};

/**
 * Check if user can view order details
 */
export const canViewOrder = (user: User | null, order: Order): boolean => {
  if (!user) return false;

  if (user.role === 'admin') return true;
  if (user.role === 'client' && order.clientId === user.id) return true;
  if (user.role === 'master') {
    // Masters can view their assigned orders or open orders
    return order.assignedMasterId === user.id || 
           ['open', 'searching', 'active_search', 'proposed'].includes(order.status);
  }

  return false;
};

/**
 * Check proposal permissions
 */
export const checkProposalPermission = (
  user: User | null,
  proposal: any,
  action: string
): boolean => {
  if (!user || !proposal) return false;

  switch (action) {
    case 'accept':
      return user.role === 'client';
    
    case 'reject':
      return user.role === 'client';
    
    case 'view':
      return true;
    
    case 'update':
      return user.role === 'master' && proposal.masterId === user.id;
    
    default:
      return false;
  }
};
