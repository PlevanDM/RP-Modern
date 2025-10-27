// Payment types
export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'crypto' | 'paypal' | 'apple_pay' | 'google_pay';
  name: string;
  last4?: string; // Последние 4 цифры карты
  isDefault: boolean;
  isActive: boolean;
  expiryDate?: string;
}

export interface EscrowTransaction {
  id: string;
  orderId: string;
  clientId: string;
  masterId: string;
  amount: number;
  status: 'pending' | 'escrowed' | 'released' | 'refunded';
  createdAt: Date;
  releasedAt?: Date;
  refundedAt?: Date;
}

export interface Dispute {
  id: string;
  orderId: string;
  clientId: string;
  masterId: string;
  reason: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'escalated';
  createdAt: Date;
  resolvedAt?: Date;
  supportTicketId?: string;
  resolution?: string;
  resolutionBy?: string; // ID пользователя, который решил спор
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

// Device type for clients
export interface Device {
    id: string;
    brand: string;
    model: string;
    issue: string;
}

// User types
export interface User {
  id: string;
  name: string;
  fullName?: string;
  city: string;
  skills: string[];
  specialization: string;
  role: 'client' | 'master' | 'admin';
  avatar: string;
  rating: number;
  phone?: string;
  email?: string;
  password?: string;
  verified?: boolean;
  blocked?: boolean;
  balance: number; // Баланс пользователя
  paymentMethods?: PaymentMethod[]; // Способы оплаты
  experience?: WorkExperience[];
  completedOrders?: number;
  bio?: string;
  tools?: string[]; // Инструменты мастера
  devices?: Device[]; // Устройства клиента
  
  // Нові поля для клієнта
  clientMobileOS?: 'android' | 'ios'; // Операційна система мобільного пристрою
  clientComputerOS?: 'windows' | 'mac' | 'linux'; // Операційна система комп'ютера
  skillLevel?: 'beginner' | 'intermediate' | 'advanced'; // Рівень навичок роботи з технікою
  preferredPriority?: string[]; // Пріоритети (швидкість, якість, ціна, гарантія)
  budgetRange?: 'low' | 'medium' | 'high'; // Бюджет на ремонт
  
  // Нові поля для майстра
  workLocation?: 'service' | 'home'; // Працює в сервісі або вдома
  equipment?: Array<{ id: string; model: string }>; // Обладнання майстра з моделями
  workExperience?: number; // Досвід роботи (роки)
  workingRadius?: number; // Радіус роботи (км)
  languages?: string[]; // Мови для спілкування
  certifications?: string[]; // Сертифікати та освіта
}

// Order (размещено клієнтом)
export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  title: string; // Що потрібно було зробити
  description: string;
  deviceType: 'iPhone' | 'iPad' | 'Mac' | 'Apple Watch' | 'Other';
  device: string;
  city: string;
  budget: number;
  proposalCount: number;
  issue: string; // Проблема
  status: 'open' | 'proposed' | 'in_progress' | 'completed' | 'awaiting_payment_confirmation' | 'paid' | 'cancelled' | 'deleted' | 'searching' | 'active_search' | 'accepted' | 'awaiting_client_confirmation';
  proposedPrice?: number;
  agreedPrice?: number;
  deadline?: Date;
  urgency: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  assignedMasterId?: string;
  devicePhotos?: string[]; // Фото устройства
  defectPhotos?: string[]; // Фото дефекта
  location?: string; // Местоположение
  clientPhone?: string;
  clientEmail?: string;
  isActiveSearch?: boolean; // Активный поиск мастеров
  deletedAt?: Date; // Дата удаления
  paymentStatus: 'pending' | 'escrowed' | 'released' | 'refunded'; // Статус платежа
  paymentAmount: number; // Сумма платежа
  paymentMethod: string; // Способ оплаты
  escrowId: string; // ID эскроу-счета
  paymentDate: Date; // Дата платежа
  releaseDate?: Date; // Дата разблокировки средств
  disputeStatus: 'none' | 'open' | 'investigating' | 'resolved' | 'escalated'; // Статус спора
  disputeReason?: string; // Причина спора
  disputeDescription?: string; // Описание спора
  disputeCreatedAt?: Date; // Дата создания спора
  supportTicketId?: string; // ID тикета техподдержки
  masterId?: string | null;
  brand?: string;
  assignedBy?: string;
  assignedAt?: Date | null;
  priority?: 'low' | 'medium' | 'high';
  notes?: string;
  clientRating?: number;
  messages?: Message[];
}

export interface Review {
  id: string;
  orderId: string;
  authorId: string;
  authorName: string;
  text: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'order' | 'message' | 'status' | 'rating';
  read: boolean;
  createdAt: Date;
}

export interface UserAction {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
}

// Proposal (пропозиція від майстра до клієнта)
export interface Proposal {
  id: string;
  orderId: string;
  masterId: string;
  masterName: string;
  masterRating: number;
  price: number;
  estimatedDays: number;
  description: string; // Майстер пояснює як він це зробить
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  createdAt: Date;
  photos?: string[]; // Фото робіт майстра з портфоліо
  cancelReason?: string; // Причина отмены (если статус cancelled)
  cancelledAt?: Date; // Дата отмены
  estimatedTime?: string;
  masterAvatar: string;
}

// Message (повідомлення між клієнтом і майстром)
export interface Message {
  id: string;
  orderId?: string;
  senderId: string;
  senderName?: string;
  senderRole?: 'client' | 'master';
  recipientId: string;
  content?: string;
  photos?: string[];
  createdAt?: Date;
  timestamp?: Date;
  read?: boolean;
  receiverId?: string;
  text?: string;
}

// Progress Update (фото прогресу роботи від майстра)
export interface ProgressUpdate {
  id: string;
  orderId: string;
  masterId: string;
  photos: string[];
  description: string;
  createdAt: Date;
  status?: string;
  message?: string;
  timestamp?: Date;
  images?: string[];
}

// Portfolio Item (портфоліо майстра)
export interface PortfolioItem {
  id: string;
  masterId: string;
  title: string;
  description: string;
  photos: string[];
  images: string[];
  rating: number;
  completedDate?: Date;
  beforeImage?: string;
  afterImage?: string;
  price?: number;
  completedAt?: Date;
  clientReview?: string;
  deviceType?: string;
  issue?: string;
}

// Freelance Proposal (фриланс пропозиція від сервісу до майстра)
export interface FreelanceProposal {
  id: string;
  masterId?: string;
  title: string;
  description: string;
  budget: number;
  deadline: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'open';
  createdAt: Date;
  clientId?: string;
  skills?: string[];
  location?: string;
  clientName?: string;
  clientRating?: number;
  deviceType?: string;
  brand?: string;
  issue?: string;
  urgency?: 'low' | 'medium' | 'high';
  proposedPrice?: number;
  agreedPrice?: number;
  updatedAt?: Date;
  clientPhone?: string;
  clientEmail?: string;
  paymentStatus?: 'pending' | 'escrowed' | 'released' | 'refunded';
  paymentAmount?: number;
  paymentMethod?: string;
  escrowId?: string;
}

// Device and Photo types
export interface DevicePhoto {
  id: string;
  model: string;
  color: string;
  type: 'front' | 'back' | 'side' | 'accessory';
  url: string;
  alt: string;
}

export interface DeviceModel {
  id: string;
  name: string;
  brand: string;
  category: 'Smartphone' | 'Tablet' | 'Laptop' | 'Smartwatch' | 'Other';
  photos: DevicePhoto[];
  colors: string[];
  storageOptions?: string[];
  price?: {
    min: number;
    max: number;
  };
  modelCodes?: string[]; // Модельные коды (A-коды)
  year?: number; // Год выпуска
  generation?: string; // Поколение устройства
  repairGuides?: {
    title: string;
    guideId: number;
    difficulty?: string;
    repairabilityScore?: number | string;
    url: string;
  }[]; // Гайды по ремонту от iFixit
  specifications?: {
    display?: string;
    processor?: string;
    camera?: string;
    battery?: string;
    connectivity?: string[];
    ram?: string;
  };
}

export interface DeviceInfo {
  id: string;
  model: string;
  brand: string;
  category: string;
  color?: string;
  storage?: string;
  photo?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  orderId?: string;
  type: 'income' | 'expense' | 'refund' | 'payout';
  status: 'completed' | 'pending' | 'failed';
  amount: number;
  currency: 'UAH' | 'USD' | 'EUR';
  description: string;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
  category?: 'order_payment' | 'service_fee' | 'withdrawal' | 'refund';
  relatedUserId?: string;
}
