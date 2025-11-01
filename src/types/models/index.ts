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

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'escrowed' | 'released' | 'refunded' | 'frozen';
  commission: number; // e.g., 0.10 (10%)
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
  decision?: 'client_wins' | 'master_wins' | 'compromise'; // Решение админа
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
  role: 'client' | 'master' | 'admin' | 'superadmin';
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
  portfolio?: PortfolioItem[]; // Портфолио майстра
  
  // Нові поля для клієнта
  clientMobileOS?: 'android' | 'ios'; // Операційна система мобільного пристрою
  clientComputerOS?: 'windows' | 'mac' | 'linux'; // Операційна система комп'ютера
  skillLevel?: 'beginner' | 'intermediate' | 'advanced'; // Рівень навичок роботи з технікою
  preferredPriority?: string[]; // Пріоритети (швидкість, якість, ціна, гарантія)
  budgetRange?: 'low' | 'medium' | 'high'; // Бюджет на ремонт
  
  // Нові поля для майстра
  workLocation?: 'service' | 'home' | 'mobile'; // Працює в сервісі, вдома або виїздний
  equipment?: Array<{ id: string; model: string }>; // Обладнання майстра з моделями
  workExperience?: number; // Досвід роботи (роки)
  workingRadius?: number; // Радіус роботи (км)
  repairBrands?: string[]; // Бренди, які ремонтує майстер
  repairTypes?: string[]; // Типи ремонтів, які виконує майстер
  isMobile?: boolean; // Чи є виїздним майстром
  languages?: string[]; // Мови для спілкування
  certifications?: string[]; // Сертифікати та освіта
  partsInventory?: Part[]; // Інвентар запчастин майстра
  registrationDate?: Date; // Дата реєстрації
  lastLogin?: Date; // Останній вхід
  
  // Преміум підписка для клієнтів
  premiumSubscription?: PremiumSubscription;
}

// Part (запчастина)
export interface Part {
  id: string;
  masterId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
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
  status: 'open' | 'proposed' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
  proposedPrice?: number;
  agreedPrice?: number;
  deadline?: Date;
  urgency: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date; // Дата завершения заказа
  assignedMasterId?: string;
  devicePhotos?: string[]; // Фото устройства
  defectPhotos?: string[]; // Фото дефекта
  location?: string; // Местоположение
  clientPhone?: string;
  clientEmail?: string;
  imei?: string; // IMEI номер для ідентифікації пристрою
  serialNumber?: string; // Серійний номер пристрою
  isActiveSearch?: boolean; // Активный поиск мастеров
  deletedAt?: Date; // Дата удаления
  paymentStatus: 'pending' | 'escrowed' | 'released' | 'refunded' | 'frozen'; // Статус платежа
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

export interface UserAction {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
}

// Offer (пропозиція від майстра до клієнта)
export interface Offer {
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

// Message (повідомлення між користувачами)
export interface Message {
  id: string;
  conversationId: string; // ID розмови (комбінація ID учасників)
  orderId?: string; // ID замовлення, якщо пов'язане
  senderId: string;
  senderName?: string;
  senderRole?: 'client' | 'master' | 'admin' | 'superadmin';
  recipientId: string; // ID отримувача
  content?: string; // Текст повідомлення
  text?: string; // Альтернативне поле для тексту (для сумісності)
  photos?: string[]; // URLs або base64 зображень
  attachments?: MessageAttachment[]; // Файли
  messageType: 'text' | 'image' | 'file' | 'system' | 'proposal' | 'negotiate';
  read: boolean; // Чи прочитано
  readAt?: Date; // Коли прочитано
  delivered: boolean; // Чи доставлено
  deliveredAt?: Date; // Коли доставлено
  edited?: boolean; // Чи було відредаговано
  editedAt?: Date; // Коли відредаговано
  deleted?: boolean; // Чи видалено
  deletedAt?: Date; // Коли видалено
  replyToId?: string; // ID повідомлення, на яке відповідають
  reactions?: MessageReaction[]; // Реакції (👍, ❤️, 😂 тощо)
  metadata?: Record<string, unknown>; // Додаткові дані
  createdAt: Date;
  timestamp?: Date; // Альтернативне поле для сумісності
  updatedAt?: Date;
  receiverId?: string; // Альтернативне поле для сумісності
}

// Вкладення до повідомлення
export interface MessageAttachment {
  id: string;
  type: 'image' | 'document' | 'video' | 'audio' | 'other';
  name: string;
  url: string; // URL або base64
  size: number; // Розмір в байтах
  mimeType?: string;
  thumbnailUrl?: string; // Мініатюра для фото/відео
}

// Реакція на повідомлення
export interface MessageReaction {
  userId: string;
  userName: string;
  emoji: string; // 👍, ❤️, 😂, 😮, 😢, 🙏
  createdAt: Date;
}

// Розмова (чат між користувачами)
export interface Conversation {
  id: string; // Унікальний ID розмови
  participants: string[]; // Масив ID учасників
  participantNames?: Record<string, string>; // Імена учасників
  participantRoles?: Record<string, 'client' | 'master' | 'admin' | 'superadmin'>; // Ролі
  orderId?: string; // ID замовлення, якщо пов'язане
  lastMessage?: Message; // Останнє повідомлення
  lastMessageAt?: Date;
  unreadCount: Record<string, number>; // Кількість непрочитаних для кожного користувача
  pinned?: boolean; // Чи закріплена розмова
  muted?: Record<string, boolean>; // Чи приглушена для користувача
  archived?: Record<string, boolean>; // Чи архівована для користувача
  createdAt: Date;
  updatedAt: Date;
}

// Лог чату (для адміністраторів)
export interface ChatLog {
  id: string;
  conversationId: string;
  messageId: string;
  action: 'sent' | 'read' | 'deleted' | 'edited' | 'reaction_added' | 'reaction_removed';
  userId: string;
  userName: string;
  details?: Record<string, unknown>;
  timestamp: Date;
  ipAddress?: string; // IP адреса (якщо потрібно)
  userAgent?: string; // User agent браузера
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

// Alias for compatibility
export type Proposal = FreelanceProposal;

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
  category: 'Smartphone' | 'Tablet' | 'Laptop' | 'Smartwatch' | 'Other' | 'Earbuds' | 'Accessories';
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
    // Для наушников
    batteryLife?: string; // Время работы от аккумулятора
    chargingCase?: string; // Время работы с футляром
    weight?: string; // Вес
    dimensions?: string; // Размеры
    microphones?: boolean; // Наличие микрофона
    noiseCancellation?: boolean; // Шумоподавление
    waterResistance?: string; // Водонепроницаемость
    // Для часов
    screenSize?: string; // Размер экрана
    strapMaterial?: string; // Материал ремешка
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
  category?: 'order_payment' | 'service_fee' | 'withdrawal' | 'refund' | 'premium_subscription';
  relatedUserId?: string;
}

// Преміум підписка для клієнтів
export interface PremiumSubscription {
  id: string;
  userId: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  plan: 'premium';
  price: number; // 4.99 EUR
  currency: 'EUR';
  startDate: Date;
  endDate?: Date; // Дата закінчення (якщо одноразова оплата)
  renewalDate?: Date; // Дата автоматичного продовження (якщо підписка)
  paymentMethod?: PaymentMethod;
  autoRenew: boolean; // Автоматичне продовження
  benefits: PremiumBenefits;
  createdAt: Date;
  updatedAt: Date;
}

export interface PremiumBenefits {
  warrantySupport: boolean; // Сутровід по гарантійним випадкам
  receiptStorage: boolean; // Зберігання чеків
  warrantyCaseLimit?: number; // Ліміт активних гарантійних випадків (якщо є)
  receiptStorageLimit?: number; // Ліміт збережених чеків (якщо є)
  prioritySupport: boolean; // Пріоритетна підтримка
}

// Чек для зберігання
export interface Receipt {
  id: string;
  userId: string;
  deviceId?: string; // ID пристрою з Device
  deviceBrand?: string;
  deviceModel?: string;
  purchaseDate: Date; // Дата покупки
  storeName?: string; // Назва магазину
  storeAddress?: string; // Адреса магазину
  amount: number;
  currency: 'UAH' | 'USD' | 'EUR';
  warrantyPeriod?: number; // Період гарантії в місяцях
  warrantyEndDate?: Date; // Дата закінчення гарантії
  receiptImage: string; // URL або base64 зображення чека
  receiptPdf?: string; // URL PDF чека
  description?: string; // Додаткові примітки
  tags?: string[]; // Теги для пошуку
  createdAt: Date;
  updatedAt: Date;
  isWarrantyActive: boolean; // Чи дійсна гарантія
}

// Гарантійний випадок
export interface WarrantyCase {
  id: string;
  userId: string;
  receiptId: string; // Посилання на чек
  deviceId?: string;
  deviceBrand: string;
  deviceModel: string;
  issue: string; // Опис проблеми
  issueType: 'defect' | 'repair' | 'replacement' | 'refund' | 'other'; // Тип проблеми
  status: 'pending' | 'submitted' | 'in_progress' | 'resolved' | 'rejected' | 'escalated';
  priority: 'low' | 'medium' | 'high';
  
  // Інформація про магазин/виробника
  merchantName: string;
  merchantContact?: string;
  merchantEmail?: string;
  
  // Документи та докази
  evidencePhotos?: string[]; // Фото проблеми/пошкодження
  documents?: string[]; // Додаткові документи
  
  // Дії платформи
  platformActions?: WarrantyAction[]; // Дії від імені клієнта
  submittedAt?: Date; // Дата подачі скарги
  resolvedAt?: Date; // Дата вирішення
  resolution?: string; // Рішення
  resolutionType?: 'accepted' | 'rejected' | 'compromise'; // Тип рішення
  
  // Коментарі та комунікація
  notes?: string[]; // Внутрішні нотатки платформи
  clientNotes?: string; // Нотатки клієнта
  
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string; // ID співробітника платформи
}

export interface WarrantyAction {
  id: string;
  warrantyCaseId: string;
  type: 'email_sent' | 'phone_call' | 'letter_sent' | 'consumer_rights_claim' | 'escalation' | 'document_prepared';
  description: string;
  performedBy: string; // ID співробітника платформи
  performedAt: Date;
  result?: string; // Результат дії
  documents?: string[]; // Прикріплені документи
}

// ============================================================
// СИСТЕМА ТЕХПІДТРИМКИ ДЛЯ МАЙСТРІВ
// ============================================================

// Графік роботи майстра в техпідтримці
export interface MasterSupportSchedule {
  id: string;
  masterId: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Неділя, 1 = Понеділок, ...
  startTime: string; // Формат "HH:mm" (наприклад "09:00")
  endTime: string; // Формат "HH:mm" (наприклад "18:00")
  isActive: boolean; // Чи активний цей слот
  timezone?: string; // Часовий пояс (за замовчуванням UTC+2 для України)
  createdAt: Date;
  updatedAt: Date;
}

// Сесія роботи майстра в техпідтримці (конкретний заповнений слот)
export interface MasterSupportSession {
  id: string;
  masterId: string;
  scheduledAt: Date; // Дата та час сесії
  duration: number; // Тривалість в хвилинах (наприклад 60, 120)
  status: 'available' | 'busy' | 'completed' | 'cancelled';
  assignedTicketId?: string; // ID тікета, якщо призначено
  actualStartTime?: Date;
  actualEndTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Тікет техпідтримки
export interface SupportTicket {
  id: string;
  clientId: string; // ID клієнта, який створив запит
  clientName?: string;
  masterId?: string; // ID майстра, який взяв тікет (опціонально)
  masterName?: string;
  sessionId?: string; // ID сесії майстра, якщо призначено
  category: 'technical' | 'order' | 'payment' | 'warranty' | 'account' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'assigned' | 'in_progress' | 'waiting_client' | 'resolved' | 'closed' | 'cancelled';
  subject: string;
  description: string;
  attachments?: string[]; // URLs або base64 зображень/файлів
  messages?: SupportMessage[]; // Історія листування
  resolution?: string; // Рішення/відповідь після закриття
  rating?: number; // Оцінка від клієнта (1-5)
  feedback?: string; // Відгук клієнта
  createdAt: Date;
  updatedAt: Date;
  assignedAt?: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  estimatedResolutionTime?: Date; // Очікуваний час вирішення
}

// Повідомлення в тікеті
export interface SupportMessage {
  id: string;
  ticketId: string;
  senderId: string; // ID відправника (клієнт або майстер)
  senderName: string;
  senderRole: 'client' | 'master' | 'admin';
  content: string;
  attachments?: string[];
  isInternal?: boolean; // Чи це внутрішнє повідомлення (не видно клієнту)
  createdAt: Date;
}

// Статистика майстра в техпідтримці
export interface MasterSupportStats {
  masterId: string;
  totalTicketsHandled: number;
  totalHoursWorked: number;
  averageResponseTime: number; // Середній час відповіді в хвилинах
  averageResolutionTime: number; // Середній час вирішення в хвилинах
  averageRating: number; // Середня оцінка від клієнтів
  totalEarnings: number; // Загальний заробіток за техпідтримку
  commissionRate: number; // Процент від суми (наприклад 0.15 = 15%)
  periodStart: Date; // Початок періоду для статистики
  periodEnd: Date;
  ticketsThisMonth: number; // Тікетів оброблено цього місяця
  earningsThisMonth: number; // Заробіток за цей місяць
}

// Налаштування техпідтримки для майстра
export interface MasterSupportSettings {
  masterId: string;
  isSupportEnabled: boolean; // Чи хоче майстер працювати в техпідтримці
  defaultCommissionRate: number; // Процент за замовчуванням (0.10 = 10%)
  preferredCategories?: SupportTicket['category'][]; // Обрані категорії
  maxTicketsPerDay?: number; // Максимум тікетів на день
  autoAcceptTickets?: boolean; // Автоматично приймати нові тікети
  notificationSettings: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}
