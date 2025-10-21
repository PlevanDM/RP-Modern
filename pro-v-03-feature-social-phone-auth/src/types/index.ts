// Re-export all model types from models directory
export * from './models';

// Common type definitions
export type UserRole = 'client' | 'master';
export type Language = 'en' | 'uk';
export type Urgency = 'low' | 'medium' | 'high';
export type OrderStatus = 'pending' | 'accepted' | 'in_progress' | 'ready' | 'completed' | 'cancelled';
export type PaymentType = 'card' | 'bank_transfer' | 'wallet';
export type TransactionType = 'payment' | 'refund';
export type TransactionStatus = 'pending' | 'completed' | 'failed';
export type NotificationType = 'order' | 'message' | 'status' | 'rating' | 'completion' | 'urgent';
export type BookingStatus = 'booked' | 'completed' | 'cancelled';

// Additional interfaces for backward compatibility
export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  priority?: Urgency;
}

import { PaymentMethod } from './models';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'income' | 'expense' | 'refund';
  category?: 'labor_income' | 'parts_markup' | 'platform_commission' | 'client_commission' | 'refund';
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

// ESCROW PAYMENT TYPES
export enum EscrowStatus {
  AWAITING_CLIENT = 'awaiting_client', // Ожидается платеж от клиента
  AWAITING_MASTER = 'awaiting_master', // Платеж получен, ожидается подтверждение мастера
  CONFIRMED_BY_MASTER = 'confirmed_by_master', // Мастер подтвердил, ожидается подтверждение клиента
  RELEASED_TO_MASTER = 'released_to_master', // Платеж выплачен мастеру
  REFUNDED_TO_CLIENT = 'refunded_to_client', // Платеж возвращен клиенту
  DISPUTED = 'disputed', // Спор между сторонами
  CANCELLED = 'cancelled' // Отменено
}

export interface EscrowPayment {
  id: string;
  orderId: string;
  amount: number;
  currency: 'UAH' | 'USD' | 'EUR';
  clientId: string;
  masterId: string;
  status: EscrowStatus;
  
  // Подтверждения
  clientConfirmed: boolean;
  clientConfirmedAt?: string;
  masterConfirmed: boolean;
  masterConfirmedAt?: string;
  
  // Платеж
  paymentMethod: 'card' | 'bank_transfer' | 'crypto' | 'mono' | 'privat24';
  transactionHash?: string;
  
  // Комиссия платформы (%)
  platformFeePercent: number;
  platformFeeAmount: number;
  masterReceiveAmount: number;
  
  // Сроки
  createdAt: string;
  expiresAt: string; // Автоматический возврат через N дней
  releasedAt?: string;
  refundedAt?: string;
  
  // Доп информация
  description: string;
  disputeReason?: string;
  notes?: string;
}

// Интерфейс для провайдера данных Escrow
export interface IEscrowDataProvider {
  getById(id: string): EscrowPayment | null;
  getByOrderId(orderId: string): EscrowPayment[];
  getAll(): EscrowPayment[];
  save(payment: EscrowPayment): void;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'card' | 'bank_transfer' | 'crypto' | 'mono' | 'privat24';
  name: string;
  isDefault: boolean;
  isVerified: boolean;
  
  // Card details
  cardLast4?: string;
  cardBrand?: string;
  
  // Bank details
  bankAccount?: string;
  
  // Crypto
  walletAddress?: string;
  chainId?: string;
  
  createdAt: string;
}

export interface BookedDate {
  id: string;
  userId: string;
  date: Date;
  orderId: string;
  status: BookingStatus;
  notes?: string;
  logisticsType?: 'self' | 'pickup' | 'novaposhta';
  shippingAddress?: string;
  novaPnestaAddress?: string;
}

export interface OrderHistory {
  orderId: string;
  device: string;
  status: string;
  completedAt: Date;
  cost: number;
  rating?: number;
  review?: string;
  masterName: string;
}
