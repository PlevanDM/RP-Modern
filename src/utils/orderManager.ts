import { Order } from '../types';

// ============================================================
// 📋 ORDER MANAGER - Управління замовленнями
// ============================================================

const STORAGE_KEY = 'repair_master_orders';
const AUDIT_LOG_KEY = 'repair_master_audit_log';

// Допустимі переходи статусів
const VALID_STATUS_TRANSITIONS: Record<string, string[]> = {
  'pending': ['accepted', 'cancelled'],
  'accepted': ['processing', 'cancelled'],
  'processing': ['completed', 'cancelled'],
  'completed': ['paid', 'dispute'],
  'paid': ['closed'],
  'cancelled': [],
  'dispute': ['completed', 'cancelled'],
  'closed': []
};

// ============================================================
// 1️⃣ ФУНКЦІЇ ДЛЯ РОБОТИ З ЗАМОВЛЕННЯМИ
// ============================================================

export function loadOrdersFromStorage(): Order[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Помилка при завантаженні замовлень:', error);
    return [];
  }
}

export function saveOrdersToStorage(orders: Order[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Помилка при збереженні замовлень:', error);
  }
}

// ============================================================
// 2️⃣ СТВОРЕННЯ НОВОГО ЗАМОВЛЕННЯ
// ============================================================

export function createOrder(
  clientId: string,
  device: string,
  issue: string,
  urgency: 'low' | 'medium' | 'high',
  estimatedCost: number
): Order {
  const orders = loadOrdersFromStorage();
  
  const newOrder: Order = {
    id: `order_${Date.now()}`,
    clientId,
    title: `${device}: ${issue}`,
    deviceType: 'Other',
    device,
    city: '',
    budget: estimatedCost,
    proposalCount: 0,
    issue,
    status: 'open', // ← СТАТУС 1: Очікує розподілення
    urgency,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: issue,
    clientName: clientId,
    paymentAmount: estimatedCost,
    paymentStatus: 'pending',
    paymentMethod: 'card',
    escrowId: `escrow_${Date.now()}`,
    paymentDate: new Date(),
    disputeStatus: 'none',
  };

  orders.push(newOrder);
  saveOrdersToStorage(orders);
  
  // Логуємо дію
  logAuditAction({
    orderId: newOrder.id,
    userId: clientId,
    action: 'created',
    details: { device, issue }
  });

  return newOrder;
}

// ============================================================
// 3️⃣ ЗМІНА СТАТУСУ ЗАМОВЛЕННЯ
// ============================================================

export function updateOrderStatus(
  orderId: string,
  newStatus: string,
  userId: string
): { success: boolean; message: string; order?: Order } {
  const orders = loadOrdersFromStorage();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return { success: false, message: 'Замовлення не знайдено' };
  }

  // Перевіримо, чи допустимий цей перехід
  const currentStatus = order.status as string;
  const allowedTransitions = VALID_STATUS_TRANSITIONS[currentStatus] || [];

  if (!allowedTransitions.includes(newStatus)) {
    return {
      success: false,
      message: `Неможливо змінити статус з "${currentStatus}" на "${newStatus}". Допустимі переходи: ${allowedTransitions.join(
        ', '
      )}`,
    };
  }

  // Оновлюємо замовлення
  order.status = newStatus as Order['status'];
  order.updatedAt = new Date();

  saveOrdersToStorage(orders);

  // Логуємо дію
  logAuditAction({
    orderId,
    userId,
    action: 'status_changed',
    details: { from: currentStatus, to: newStatus }
  });

  return { success: true, message: 'Статус оновлено успішно', order };
}

// ============================================================
// 4️⃣ РОЗПОДІЛ ЗАМОВЛЕННЯ МАЙСТРУ
// ============================================================

export function assignMasterToOrder(
  orderId: string,
  masterId: string,
  masterName: string,
  serviceId: string
): { success: boolean; message: string; order?: Order } {
  const orders = loadOrdersFromStorage();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return { success: false, message: 'Замовлення не знайдено' };
  }

  if (order.status !== 'open') {
    return { success: false, message: 'Можна розподіляти тільки замовлення зі статусом "open"' };
  }

  // Призначуємо майстра
  order.masterId = masterId;
  order.serviceId = serviceId;
  order.status = 'accepted'; // ← СТАТУС 2: Прийнято
  order.updatedAt = new Date();

  saveOrdersToStorage(orders);

  // Логуємо дію
  logAuditAction({
    orderId,
    userId: serviceId,
    action: 'assigned_to_master',
    details: { masterId, masterName }
  });

  return { success: true, message: 'Майстра успішно призначено', order };
}

// ============================================================
// 5️⃣ AUDIT LOG - Історія дій
// ============================================================

interface Details {
  device?: string;
  issue?: string;
  from?: string;
  to?: string;
  masterId?: string;
  masterName?: string;
  message?: string;
}

interface AuditLogEntry {
  id: string;
  orderId: string;
  userId: string;
  action: string;
  details: Details;
  timestamp: Date;
}

export function logAuditAction(
  data: Omit<AuditLogEntry, 'id' | 'timestamp'>
): void {
  try {
    const logs: AuditLogEntry[] = JSON.parse(
      localStorage.getItem(AUDIT_LOG_KEY) || '[]'
    );
    
    const entry: AuditLogEntry = {
      id: `audit_${Date.now()}`,
      ...data,
      timestamp: new Date()
    };
    
    logs.push(entry);
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Помилка при логуванні дії:', error);
  }
}

export function getOrderAuditLog(orderId: string): AuditLogEntry[] {
  try {
    const logs: AuditLogEntry[] = JSON.parse(localStorage.getItem(AUDIT_LOG_KEY) || '[]');
    return logs.filter(log => log.orderId === orderId);
  } catch (error) {
    console.error('Помилка при завантаженні audit log:', error);
    return [];
  }
}

// ============================================================
// 6️⃣ СИНХРОНІЗАЦІЯ СООБЩЕНЬ
// ============================================================

export function addMessageToOrder(
  orderId: string,
  userId: string,
  message: string
): void {
  const orders = loadOrdersFromStorage();
  const order = orders.find(o => o.id === orderId);

  if (!order) return;

  if (!order.messages) {
    order.messages = [];
  }

  order.messages.push({
    id: `msg_${Date.now()}`,
    senderId: userId,
    text: message,
    timestamp: new Date(),
    orderId,
    recipientId: order.masterId || order.clientId
  });

  saveOrdersToStorage(orders);

  // Синхронізуємо з audit log
  logAuditAction({
    orderId,
    userId,
    action: 'message_sent',
    details: { message: message.substring(0, 50) }
  });
}

// ============================================================
// 7️⃣ ОТРИМАННЯ ІНФОРМАЦІЇ
// ============================================================

export function getOrderById(orderId: string): Order | undefined {
  const orders = loadOrdersFromStorage();
  return orders.find(o => o.id === orderId);
}

export function getClientOrders(clientId: string): Order[] {
  const orders = loadOrdersFromStorage();
  return orders.filter(o => o.clientId === clientId);
}

export function getMasterOrders(masterId: string): Order[] {
  const orders = loadOrdersFromStorage();
  return orders.filter(o => o.masterId === masterId);
}

export function getUnassignedOrders(): Order[] {
  const orders = loadOrdersFromStorage();
  return orders.filter(o => o.status === 'open' && !o.masterId);
}

export function getOrdersByStatus(status: string): Order[] {
  const orders = loadOrdersFromStorage();
  return orders.filter(o => o.status === status);
}
