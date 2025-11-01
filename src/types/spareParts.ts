/**
 * SPARE PARTS MARKETPLACE TYPES
 * Типи для торгової майданки запчастин
 */

export interface SparePart {
  id: string;
  title: string;
  description: string;
  category: PartCategory;
  condition: PartCondition;
  compatibility: PartCompatibility[];
  
  // Seller info
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sellerLocation: string;
  
  // Pricing
  price: number;
  currency: 'UAH' | 'USD' | 'EUR';
  negotiable: boolean;
  
  // Stock
  quantity: number;
  inStock: boolean;
  
  // Shipping
  shippingOptions: ShippingOption[];
  novaPoshtaEnabled: boolean;
  selfPickup: boolean;
  
  // Media
  images: string[];
  video?: string;
  
  // Metadata
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'sold' | 'reserved' | 'archived';
  
  // Exchange
  exchangeAllowed: boolean;
  exchangeFor?: string[];
}

export type PartCategory = 
  | 'screen'
  | 'battery'
  | 'camera'
  | 'motherboard'
  | 'charging-port'
  | 'speaker'
  | 'microphone'
  | 'button'
  | 'housing'
  | 'flex-cable'
  | 'connector'
  | 'antenna'
  | 'sim-tray'
  | 'other';

export type PartCondition = 
  | 'new'           // Нова
  | 'like-new'      // Як нова
  | 'excellent'     // Відмінний стан
  | 'good'          // Хороший стан
  | 'fair'          // Задовільний стан
  | 'for-parts';    // На запчастини

export interface PartCompatibility {
  brand: string;
  model: string;
  year?: number;
}

export interface ShippingOption {
  id: string;
  type: 'nova-poshta' | 'ukr-poshta' | 'courier' | 'self-pickup';
  name: string;
  price: number;
  estimatedDays: number;
  description?: string;
}

export interface PartOrder {
  id: string;
  partId: string;
  part: SparePart;
  
  // Buyer
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  
  // Seller
  sellerId: string;
  sellerName: string;
  
  // Order details
  quantity: number;
  totalPrice: number;
  
  // Shipping
  shippingOption: ShippingOption;
  shippingAddress?: NovaPoshtaAddress;
  trackingNumber?: string;
  
  // Payment
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  escrowEnabled: boolean;
  
  // Status
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  
  // Exchange
  isExchange: boolean;
  exchangePartId?: string;
}

export interface NovaPoshtaAddress {
  city: string;
  cityRef: string;
  warehouse: string;
  warehouseRef: string;
  recipientName: string;
  recipientPhone: string;
}

export type PaymentMethod = 
  | 'cash-on-delivery'    // Накладений платіж
  | 'card'                // Картка
  | 'escrow'              // Через гарант-сервіс
  | 'crypto';             // Криптовалюта

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'held'      // Утримується (escrow)
  | 'released'  // Відпущено продавцю
  | 'refunded'
  | 'failed';

export type OrderStatus = 
  | 'pending'           // Очікує підтвердження
  | 'confirmed'         // Підтверджено
  | 'preparing'         // Готується до відправки
  | 'shipped'           // Відправлено
  | 'in-transit'        // В дорозі
  | 'delivered'         // Доставлено
  | 'completed'         // Завершено
  | 'cancelled'         // Скасовано
  | 'disputed'          // Спір
  | 'returned';         // Повернуто

export interface PartCart {
  id: string;
  userId: string;
  items: PartCartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartCartItem {
  partId: string;
  part: SparePart;
  quantity: number;
  price: number;
  shippingOption?: ShippingOption;
}

export interface SellerStats {
  totalSales: number;
  totalRevenue: number;
  activeListings: number;
  soldItems: number;
  rating: number;
  reviewsCount: number;
  responseTime: number; // minutes
  completionRate: number; // percentage
}

export interface MarketplaceFilters {
  category?: PartCategory;
  condition?: PartCondition;
  priceMin?: number;
  priceMax?: number;
  brand?: string;
  model?: string;
  location?: string;
  shippingType?: string;
  inStockOnly?: boolean;
  exchangeOnly?: boolean;
}

export interface FinancialTransaction {
  id: string;
  orderId: string;
  type: TransactionType;
  amount: number;
  currency: 'UAH' | 'USD' | 'EUR';
  
  // Parties
  fromUserId: string;
  toUserId: string;
  
  // Commission
  platformCommission: number;
  commissionRate: number; // percentage
  
  // Status
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  
  // Metadata
  description: string;
  createdAt: Date;
  completedAt?: Date;
}

export type TransactionType = 
  | 'sale'              // Продаж
  | 'purchase'          // Покупка
  | 'commission'        // Комісія платформи
  | 'refund'            // Повернення
  | 'withdrawal'        // Виведення коштів
  | 'deposit';          // Поповнення

export interface Wallet {
  userId: string;
  balance: number;
  currency: 'UAH' | 'USD' | 'EUR';
  pendingBalance: number; // Очікує підтвердження
  availableBalance: number; // Доступно для виведення
  totalEarned: number;
  totalSpent: number;
  transactions: FinancialTransaction[];
}

