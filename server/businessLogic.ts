import { User, Order, Offer, Dispute } from '../src/types/models';
import { Low } from 'lowdb';

interface DbData {
  users: User[];
  orders: Order[];
  offers: Offer[];
  disputes: Dispute[];
  reviews: unknown[];
}

/**
 * BUSINESS LOGIC FUNCTIONS
 * Server-side validation functions to protect against invalid actions
 */

// --- ORDER PERMISSIONS ---

export async function canCreateOrder(user: User, db: Low<DbData>): Promise<boolean> {
  await db.read();
  if (user.role !== 'client') {
    return false;
  }
  
  const activeOrders = db.data.orders.filter(
    o => o.clientId === user.id && 
    o.status !== 'completed' && 
    o.status !== 'cancelled'
  );
  
  return activeOrders.length < 10;
}

export function canEditOrder(user: User, order: Order): boolean {
  return order.clientId === user.id && order.status === 'open';
}

export async function canCreateOffer(user: User, order: Order, db: Low<DbData>): Promise<boolean> {
  await db.read();
  
  if (user.role !== 'master') {
    return false;
  }
  
  if (order.status !== 'open') {
    return false;
  }
  
  const activeOffers = db.data.offers.filter(
    o => o.masterId === user.id && o.status === 'pending'
  );
  
  if (activeOffers.length >= 5) {
    return false;
  }
  
  // Check if master already made an offer for this order
  const existingOffer = db.data.offers.find(
    o => o.orderId === order.id && o.masterId === user.id
  );
  
  return !existingOffer;
}

export function canAcceptOffer(user: User, order: Order): boolean {
  return user.role === 'client' && 
         order.clientId === user.id && 
         order.status === 'open';
}

export function canCreatePayment(user: User, order: Order): boolean {
  return user.role === 'client' &&
         order.clientId === user.id &&
         order.status === 'accepted' &&
         order.paymentStatus === 'pending'; // No payment yet
}

export function canReleasePayment(user: User, order: Order): boolean {
  return user.role === 'client' &&
         order.clientId === user.id &&
         order.status === 'in_progress';
}

export function canCreateDispute(user: User, order: Order): boolean {
  const isParticipant = user.id === order.clientId || user.id === order.masterId;
  return isParticipant && (
    order.status === 'in_progress' || 
    order.status === 'completed'
  );
}

export async function canCreateReview(user: User, order: Order, db: Low<DbData>): Promise<boolean> {
  if (user.role !== 'client' || order.clientId !== user.id || order.status !== 'completed') {
    return false;
  }
  
  await db.read();
  const existingReview = db.data.reviews.find(
    (r: unknown) => {
      const review = r as { orderId?: string; authorId?: string };
      return review.orderId === order.id && review.authorId === user.id;
    }
  );
  
  return !existingReview;
}

export function canEditReview(user: User, review: { authorId?: string; createdAt?: string }): boolean {
  if (review.authorId !== user.id) {
    return false;
  }
  
  const reviewAge = Date.now() - new Date(review.createdAt).getTime();
  const hours24 = 24 * 60 * 60 * 1000;
  
  return reviewAge < hours24;
}

// --- ORDER CANCELLATION LOGIC ---

export async function canCancelOrder(
  user: User, 
  order: Order, 
  isAdmin: boolean = false
): Promise<{ canCancel: boolean; reason?: string }> {
  // Admin can always cancel
  if (isAdmin) {
    return { canCancel: true };
  }
  
  // Client can cancel in these cases
  if (user.role === 'client' && order.clientId === user.id) {
    if (order.status === 'open') {
      return { canCancel: true };
    }
    
    if (order.status === 'accepted') {
      return { canCancel: true };
    }
    
    if (order.status === 'in_progress') {
      return { 
        canCancel: false, 
        reason: 'Cannot cancel order in progress. Please open a dispute instead.' 
      };
    }
  }
  
  return { 
    canCancel: false, 
    reason: 'You do not have permission to cancel this order.' 
  };
}

// --- AUTO RELEASE CHECK ---

export async function checkAutoRelease(
  order: Order,
  _db: Low<DbData>
): Promise<boolean> {
  if (order.status !== 'in_progress') {
    return false;
  }
  
  // Check if there's a workFinishedAt field and it's > 7 days old
  const completedAt = order.completedAt || order.updatedAt;
  if (!completedAt) {
    return false;
  }
  
  const daysSinceCompletion = 
    (Date.now() - new Date(completedAt).getTime()) / (24 * 60 * 60 * 1000);
  
  return daysSinceCompletion >= 7;
}

// --- DISPUTE DEADLINE ---

export function canOpenDisputeAfterCompletion(order: Order): boolean {
  if (order.status !== 'completed') {
    return false;
  }
  
  const completedAt = order.completedAt || order.updatedAt;
  if (!completedAt) {
    return false;
  }
  
  const daysSinceCompletion = 
    (Date.now() - new Date(completedAt).getTime()) / (24 * 60 * 60 * 1000);
  
  return daysSinceCompletion <= 7;
}

// --- WITHDRAWAL CHECKS ---

export function canWithdraw(user: User, amount: number): boolean {
  return user.role === 'master' && 
         user.balance >= amount && 
         amount >= 500;
}

// --- AUTO-TIMEOUT DISPUTE LOGIC ---

export async function shouldAutoResolveDispute(
  dispute: Dispute,
  db: Low<DbData>
): Promise<'client_wins' | null> {
  const hours24 = 24 * 60 * 60 * 1000;
  const disputeAge = Date.now() - new Date(dispute.createdAt).getTime();
  
  if (disputeAge < hours24) {
    return null; // Not yet 24 hours
  }
  
  // Check if master has responded
  await db.read();
  const _order = db.data.orders.find(o => o.id === dispute.orderId);
  
  // For now, if no master response in 24h, client wins (simple logic)
  // In production, you'd check response timestamp
  return 'client_wins';
}

