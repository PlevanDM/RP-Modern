// Re-export all model types from models directory
export * from './models';

// ==================== LEGAL & COMPLIANCE TYPES ====================
export type AgreementType = 'terms_of_service' | 'privacy_policy' | 'service_agreement' | 'commission_agreement' | 'dispute_resolution';
export type AgreementStatus = 'not_agreed' | 'agreed' | 'expired' | 'revoked';
export type VerificationStatus = 'not_verified' | 'pending' | 'verified' | 'rejected' | 'suspended';
export type DisputeStatus = 'open' | 'investigating' | 'mediation' | 'resolved' | 'escalated' | 'appealed';
export type FraudRiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface LegalAgreement {
  id: string;
  userId: string;
  type: AgreementType;
  version: string;
  status: AgreementStatus;
  agreedAt?: Date;
  expiresAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  documentHash?: string;
  signature?: string;
}

export interface UserVerification {
  id: string;
  userId: string;
  status: VerificationStatus;
  verificationType: 'email' | 'phone' | 'id_document' | 'bank_account' | 'payment_method';
  documentType?: 'passport' | 'id_card' | 'driver_license' | 'business_license';
  documentNumber?: string;
  documentExpiryDate?: Date;
  verifiedAt?: Date;
  expiresAt?: Date;
  verifiedBy?: string;
  rejectionReason?: string;
  attemptsCount: number;
}

export interface DisputeCase {
  id: string;
  orderId: string;
  clientId: string;
  masterId: string;
  initiatedBy: string; // 'client' | 'master' | 'platform'
  title: string;
  description: string;
  evidence: DisputeEvidence[];
  status: DisputeStatus;
  reason: 'quality_issue' | 'non_payment' | 'non_completion' | 'fraud' | 'other';
  requestedResolution: 'refund' | 'rework' | 'partial_refund' | 'cancellation';
  amount: number;
  claimedAmount?: number;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  resolution?: string;
  resolutionBy?: string; // ID модератора
  notes?: string;
  appealCount: number;
  appealDeadline?: Date;
}

export interface DisputeEvidence {
  id: string;
  type: 'message' | 'photo' | 'document' | 'video' | 'receipt' | 'screenshot';
  url: string;
  fileName?: string;
  description: string;
  uploadedBy: string;
  uploadedAt: Date;
  verified?: boolean;
  verifiedAt?: Date;
}

export interface FraudReport {
  id: string;
  reportedBy: string; // userId
  targetUserId: string;
  orderId?: string;
  type: 'account_activity' | 'fake_order' | 'payment_fraud' | 'identity_fraud' | 'abuse' | 'other';
  description: string;
  evidence: string[];
  riskLevel: FraudRiskLevel;
  status: 'new' | 'investigating' | 'confirmed' | 'rejected' | 'resolved';
  createdAt: Date;
  investigatedAt?: Date;
  investigatedBy?: string;
  actionTaken?: string; // suspension, ban, warning, etc.
  aiScore?: number; // 0-100 fraud probability
}

export interface UserActivity {
  id: string;
  userId: string;
  action: 'login' | 'payment' | 'order_created' | 'order_completed' | 'profile_update' | 'message_sent' | 'dispute_created' | 'logout';
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  riskFlags?: string[]; // ['unusual_location', 'rapid_requests', etc.]
}

export interface PaymentEscrow {
  id: string;
  orderId: string;
  clientId: string;
  masterId: string;
  amount: number;
  currency: string;
  status: 'held' | 'released' | 'refunded' | 'disputed';
  heldAt: Date;
  releaseDate?: Date;
  releasedAt?: Date;
  refundedAt?: Date;
  disputeId?: string;
  autoReleaseDate: Date; // Auto-release if not disputed
  metadata?: Record<string, any>;
}

export interface ComplianceSnapshot {
  id: string;
  userId: string;
  timestamp: Date;
  verificationsStatus: Record<string, VerificationStatus>;
  agreementsStatus: Record<string, AgreementStatus>;
  riskLevel: FraudRiskLevel;
  flagsCount: number;
  complianceScore: number; // 0-100
  notes?: string;
}

// ==================== COMMON TYPE DEFINITIONS ====================
export type UserRole = 'client' | 'master' | 'admin';
export type Language = 'en' | 'uk';
export type Urgency = 'low' | 'medium' | 'high';
export type OrderStatus = 'pending' | 'accepted' | 'in_progress' | 'ready' | 'completed' | 'cancelled';
export type PaymentType = 'card' | 'bank_transfer' | 'wallet';
export type TransactionType = 'payment' | 'refund';
export type TransactionStatus = 'pending' | 'completed' | 'failed';
export type NotificationType = 'order' | 'message' | 'status' | 'rating' | 'completion' | 'urgent';
export type BookingStatus = 'booked' | 'completed' | 'cancelled';

// ==================== ADVANCED MESSAGING TYPES ====================
export type MessageType = 'text' | 'image' | 'document' | 'proposal' | 'estimate' | 'system';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

export interface AdvancedMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  type: MessageType;
  content: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  proposalId?: string;
  estimateData?: {
    price: number;
    currency: string;
    description: string;
    deadline: string;
  };
  status: MessageStatus;
  timestamp: Date;
  readAt?: Date;
  edited?: boolean;
  editedAt?: Date;
  reactions?: { emoji: string; userIds: string[] }[];
  pinned?: boolean;
}

export interface Chat {
  id: string;
  orderId?: string;
  participantIds: string[];
  participantNames: string[];
  lastMessage?: AdvancedMessage;
  unreadCount: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
  archived?: boolean;
}

// ==================== COMMISSION & EARNINGS TYPES ====================
export type CommissionType = 'platform_fee' | 'successful_deal' | 'referral' | 'bonus';
export type EarningType = 'labor_income' | 'parts_markup' | 'commission_earned' | 'bonus_earned' | 'refund';
export type EarningStatus = 'pending' | 'confirmed' | 'withdrawn' | 'refunded';

export interface CommissionConfig {
  id: string;
  type: CommissionType;
  description: string;
  percentage: number;
  minAmount?: number;
  maxAmount?: number;
  active: boolean;
  createdAt: Date;
}

export interface MasterEarning {
  id: string;
  masterId: string;
  orderId: string;
  type: EarningType;
  grossAmount: number;
  commissionPercent: number;
  commissionAmount: number;
  netAmount: number;
  currency: string;
  status: EarningStatus;
  description: string;
  createdAt: Date;
  confirmedAt?: Date;
  withdrawnAt?: Date;
}

export interface PlatformRevenue {
  id: string;
  masterId: string;
  orderId: string;
  commissionAmount: number;
  commissionPercent: number;
  currency: string;
  createdAt: Date;
}

export interface MasterBalance {
  masterId: string;
  totalEarnings: number;
  totalCommissions: number;
  netBalance: number;
  pending: number;
  confirmed: number;
  pendingEarnings: number;
  withdrawnTotal: number;
  currency: string;
  lastUpdated: Date;
}

// ==================== ADDITIONAL INTERFACES ====================
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
  AWAITING_CLIENT = 'awaiting_client',
  AWAITING_MASTER = 'awaiting_master',
  CONFIRMED_BY_MASTER = 'confirmed_by_master',
  RELEASED_TO_MASTER = 'released_to_master',
  REFUNDED_TO_CLIENT = 'refunded_to_client',
  DISPUTED = 'disputed',
  CANCELLED = 'cancelled'
}

export interface EscrowPayment {
  id: string;
  orderId: string;
  amount: number;
  currency: 'UAH' | 'USD' | 'EUR';
  clientId: string;
  masterId: string;
  status: EscrowStatus;
  clientConfirmed: boolean;
  clientConfirmedAt?: string;
  masterConfirmed: boolean;
  masterConfirmedAt?: string;
  paymentMethod: 'card' | 'bank_transfer' | 'crypto' | 'mono' | 'privat24';
  transactionHash?: string;
  platformFeePercent: number;
  platformFeeAmount: number;
  masterReceiveAmount: number;
  createdAt: string;
  expiresAt: string;
  releasedAt?: string;
  refundedAt?: string;
  description: string;
  disputeReason?: string;
  notes?: string;
}

export interface IEscrowDataProvider {
  getById(id: string): EscrowPayment | null;
  getByOrderId(orderId: string): EscrowPayment[];
  getAll(): EscrowPayment[];
  save(payment: EscrowPayment): void;
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
