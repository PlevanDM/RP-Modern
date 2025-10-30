# 🏗️ RepairHub Pro - Детальна схема взаємодій та функцій

> **Повна документація архітектури, функціональності та взаємодій системи**

---

## 📑 Зміст

1. [Архітектура системи](#архітектура-системи)
2. [Ролі та права доступу](#ролі-та-права-доступу)
3. [Моделі даних](#моделі-даних)
4. [Сервіси та API](#сервіси-та-api)
5. [Потоки взаємодій](#потоки-взаємодій)
6. [Компоненти UI](#компоненти-ui)
7. [Схема замовлення (Order Flow)](#схема-замовлення)
8. [Схема чату (Chat System)](#схема-чату)
9. [Платежна система (Payment System)](#платежна-система)
10. [Мастер-мачинг (Master Matching)](#мастер-мачинг)

---

## 🏛️ Архітектура системи

### Структура проєкту

```
RP-Modern/
├── src/
│   ├── components/          # React компоненти
│   │   ├── features/        # Функціональні компоненти
│   │   │   ├── client/      # Для клієнтів
│   │   │   ├── master/      # Для майстрів
│   │   │   ├── admin/       # Для адміністраторів
│   │   │   ├── chat/        # Чат система
│   │   │   └── ai/          # AI (Jarvis)
│   │   ├── pages/           # Сторінки
│   │   ├── layout/          # Layout компоненти
│   │   └── common/          # Загальні компоненти
│   ├── services/            # Бізнес-логіка
│   ├── store/               # Zustand stores
│   ├── types/               # TypeScript типи
│   └── utils/               # Утиліти
├── server/                  # Backend (Node.js/Express)
│   ├── server.ts            # Express сервер
│   └── db.json              # JSON база даних
└── public/                  # Статичні файли
```

### Технологічний стек

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **State Management**: Zustand
- **API**: REST API (Express.js)
- **Storage**: LocalStorage (розробка), JSON DB (backend)
- **i18n**: react-i18next (UK, RU, EN, PL, RO)

---

## 👥 Ролі та права доступу

### 1. CLIENT (Клієнт)

#### Права доступу:
- ✅ Створювати замовлення
- ✅ Переглядати свої замовлення
- ✅ Приймати/відхиляти пропозиції майстрів
- ✅ Відміняти замовлення (до початку роботи)
- ✅ Відкривати спори
- ✅ Оплачувати замовлення (Escrow)
- ✅ Редагувати свої замовлення (тільки статус "open")
- ✅ Видаляти свої замовлення (тільки статус "open")
- ✅ Спостерігати за прогресом ремонту
- ✅ Залишати відгуки та рейтинги
- ✅ Використовувати чат з майстрами
- ✅ Зберігати пристрої в "Мої Пристрої"
- ✅ Покупувати Premium підписку
- ✅ Зберігати чеки та квитанції (Premium)
- ✅ Отримувати гарантійну підтримку (Premium)

#### Профіль клієнта:
```typescript
{
  role: 'client',
  clientMobileOS?: 'android' | 'ios',
  clientComputerOS?: 'windows' | 'mac' | 'linux',
  skillLevel?: 'beginner' | 'intermediate' | 'advanced',
  preferredPriority?: string[], // speed, quality, price, warranty
  budgetRange?: 'low' | 'medium' | 'high',
  premiumSubscription?: PremiumSubscription
}
```

#### Доступні сторінки:
- **Dashboard** - Дашборд клієнта
- **Каталог пристроїв** - Вибір пристрою для ремонту
- **Мої Пристрої** - Збережені пристрої
- **Мої Замовлення** - Список замовлень
- **Пропозиції** - Пропозиції від майстрів
- **Повідомлення** - Чат з майстрами
- **Платежі** - Управління платежами
- **Профіль** - Профіль користувача
- **Налаштування** - Налаштування профілю

---

### 2. MASTER (Майстер)

#### Права доступу:
- ✅ Переглядати відкриті замовлення
- ✅ Створювати пропозиції для відкритих замовлень
- ✅ Завершувати призначені йому замовлення
- ✅ Відміняти призначені замовлення
- ✅ Відкривати спори по своїх замовленнях
- ✅ Оновлювати свої пропозиції (поки вони в статусі "pending")
- ✅ Переглядати деталі замовлень
- ✅ Отримувати оплату за виконану роботу
- ✅ Управляти портфоліо
- ✅ Додавати фото робіт
- ✅ Управляти інвентарем запчастин
- ✅ Використовувати чат з клієнтами
- ✅ НадаAndyвати техпідтримку (Master Support)
- ✅ Заробляти на техпідтримці (% від сесій)

#### Профіль майстра:
```typescript
{
  role: 'master',
  workLocation?: 'service' | 'home' | 'mobile',
  repairBrands?: string[], // Apple, Samsung, Xiaomi...
  repairTypes?: string[], // Екрани, Батареї, Камера...
  workExperience?: number, // Роки досвіду
  workingRadius?: number, // Радіус роботи (км)
  equipment?: Array<{ id: string; model: string }>,
  languages?: string[],
  certifications?: string[],
  partsInventory?: Part[],
  rating: number,
  completedOrders: number
}
```

#### Доступні сторінки:
- **Dashboard** - Дашборд майстра
- **Дошка Замовлень** - Kanban дошка замовлень
- **Пропозиції** - Мої пропозиції
- **Портфоліо** - Мої роботи
- **Інвентар** - Управління запчастинами
- **Маркетплейс Запчастин** - Купівля запчастин
- **Повідомлення** - Чат з клієнтами
- **Техпідтримка** - Панель техпідтримки (Master Support)
- **Відгуки** - Відгуки клієнтів
- **Профіль** - Профіль майстра
- **Налаштування** - Налаштування профілю

---

### 3. ADMIN (Адміністратор)

#### Права доступу:
- ✅ **Користувачі**: Перегляд, редагування, блокування, видалення
- ✅ **Замовлення**: Перегляд всіх замовлень, редагування, модерація
- ✅ **Транзакції**: Перегляд та управління платежами
- ✅ **Звіти**: Аналітика доходів, статистика
- ✅ **Налаштування**: Конфігурація системи
- ✅ **Логи**: Перегляд логів системи
- ✅ **Інвентар**: Управлін prem inv ритор ром
- ✅ **Спори**: Розглядання та вирішення спорів
- ✅ **RBAC**: Управління ролями та правами

#### Доступні сторінки:
- **Admin Dashboard** - Головна панель
- **Користувачі** - Управління користувачами
- **Замовлення** - Управління замовленнями
- **Фінанси** - Фінансова аналітика
- **Аналітика** - Статистика та графіки
- **Спори** - Розглядання спорів
- **Історія** - Історія дій користувачів
- **Налаштування** - Налаштування платформи

---

### 4. SUPERADMIN (Супер-адміністратор)

#### Права доступу:
- ✅ **Всі права Admin** +
- ✅ Повний доступ до бази даних
- ✅ Управління всіма ролями
- ✅ Системні налаштування
- ✅ Експорт даних
- ✅ Управління безпекою

---

## 📊 Моделі даних

### User (Користувач)
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city: string;
  role: 'client' | 'master' | 'admin' | 'superadmin';
  avatar: string;
  rating: number;
  balance: number;
  
  // Для клієнта
  clientMobileOS?: 'android' | 'ios';
  clientComputerOS?: 'windows' | 'mac' | 'linux';
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  preferredPriority?: string[];
  budgetRange?: 'low' | 'medium' | 'high';
  premiumSubscription?: PremiumSubscription|
  
  // Для майстра
  workLocation?: 'service' | 'home' | 'mobile';
  repairBrands?: string[];
  repairTypes?: string[];
  workExperience?: number;
  workingRadius?: number;
  equipment?: Array<{ id: string; model: string }>;
  partsInventory?: Part[];
  
  // Загальні
  verified: boolean;
  blocked: boolean;
  completedOrders: number;
  portfolio?: PortfolioItem[];
  createdAt: Date;
}
```

### Order (Замовлення)
```typescript
interface Order {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  deviceType: 'smartphone' | 'tablet' | 'laptop' | 'other';
  brand?: string;
  device: string;
  issue: string;
  city: string;
  budget?: number;
  status: 'open' | 'proposed' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
  assignedMasterId?: string;
  amount?: number;
  agreedPrice?: number;
  proposalCount: number;
  urgency: 'low' | 'medium' | 'high';
  
  // Платежі
  paymentStatus: 'pending' | 'escrowed' | 'released' | 'refunded';
  paymentAmount: number;
  paymentMethod: string;
  escrowId: string;
  
  // Спори
  disputeStatus: 'none' | 'open' | 'investigating' | 'resolved' | 'escalated';
  
  // Медіа
  devicePhotos?: string[];
  defectPhotos?: string[];
  
  // Дати
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}
```

### Offer/Proposal (Пропозиція)
```typescript
interface Offer {
  id: string;
  orderId: string;
  masterId: string;
  masterName: string;
  masterRating: number;
  price: number;
  estimatedDays: number;
  description: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  photos?: string[];
  createdAt: Date;
}
```

### Message (Повідомлення)
```typescript
interface Message {
  id: string;
  conversationId: string;
  orderId?: string;
  senderId: string;
  senderName?: string;
  senderRole?: 'client' | 'master' | 'admin' | 'superadmin';
  recipientId: string;
  content?: string;
  photos?: string[];
  attachments?: MessageAttachment[];
  messageType: 'text' | 'image' | 'file' | 'system' | 'proposal' | 'negotiate';
  read: boolean;
  delivered: boolean;
  edited?: boolean;
  deleted?: boolean;
  replyToId?: string;
  reactions?: MessageReaction[];
  createdAt: Date;
}
```

### Conversation (Розмова)
```typescript
interface Conversation {
  id: string;
  participants: string[];
  participantNames?: Record<string, string>;
  participantRoles?: Record<string, 'client' | 'master' | 'admin' | 'superadmin'>;
  orderId?: string;
  lastMessage?: Message;
  lastMessageAt?: Date;
  unreadCount: Record<string, number>;
  pinned?: boolean;
  muted?: Record<string, boolean>;
  archived?: Record<string, boolean>;
  createdAt: Date;
}
```

### PremiumSubscription (Преміум підписка)
```typescript
interface PremiumSubscription {
  id: string;
  userId: string;
  status: 'active' | 'expired' | 'cancelled';
  plan: 'premium';
  price: number; // 4.99 EUR
  currency: 'EUR';
  startDate: Date;
  endDate?: Date;
  renewalDate?: Date;
  autoRenew: boolean;
  benefits: {
    warrantySupport: boolean;
    receiptStorage: boolean;
    prioritySupport: boolean;
  };
}
```

### MasterSupportSession (Сесія техпідтримки майстра)
```typescript
interface MasterSupportSession {
  id: string;
  masterId: string;
  ticketId: string;
  scheduledAt: Date;
 TwoDate?: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  duration?: number; // хвилини
  commission?: number; // % від суми сесії
  earnings?: number;
}
```

---

## 🔧 Сервіси та API

### Authentication Service (`apiAuthService.ts`)
- `login(email, password)` - Вхід користувача
- `register(user)` - Реєстрація нового користувача
- Підтримка тестових користувачів (localStorage)

### Order Service (`apiOrderService.ts`)
- `createOrder(order)` - Створення замовлення
- `getOrders()` - Отримання списку замовлень
- `updateOrderStatus(orderId, status)` - Оновлення статусу
- `deleteOrder(orderId)` - Видалення за/Xовлення

### Chat Service (`chatService.ts`)
- `getOrCreateConversation(userId1, userId2, orderId?)` - Створення/отримання розмови
- `sendMessage(...)` - Відправка повідомлення
- `getMessages(conversationId)` - Отримання повідомлень
- `markMessageAsRead(messageId, userId)` - Позначення прочитаним
- `editMessage(messageId, newContent)` - Редагування повідомлення
- `deleteMessage(messageId)` - Видалення повідомлення
- `addReaction(messageId, userId, emoji)` - Додавання реакції
- `searchMessages(conversationId, query)` - Пошук повідомлень
- `logChatAction(...)` - Логування дій (для адмінів)

### Master Matching Service (`masterMatchingService.ts`)
- `calculateMatchScore(clientPreferences, masterProfile)` - Розрахунок відповідності (0-100)
- `findMatchingMasters(order, allMasters)` - Пошук підходящих майстрів
- Враховує: місце роботи, бренди, типи ремонтів, досвід, рейтинг, відстань

### Master Support Service (`masterSupportService.ts`)
- `getMasterSchedule(masterId)` - Графік роботи майстра
- `saveMasterSchedule(schedule)` - Збереження графіку
- `createMasterSession(session)` - Створення сесії техпідтримки
- `createSupportTicket(ticket)` - Створення тікета
- `getMasterStats(masterId)` - Статистика май jersey

### Premium Subscription Service (`premiumSubscriptionService.ts`)
- `getUserSubscription(userId)` - Отримання підписки
- `createSubscription(userId, autoRenew)` - Створення підписки (4.99 EUR/місяць)
- `cancelSubscription(subscriptionId)` - Скасування
- `addReceipt(userId, receipt)` - Додавання чека (Premium)
- `getReceipts(userId)` - Отримання чеків
- `createWarrantyCase(userId, case)` - Створення гарантійного кейсу (Premium)

### User Service (`apiUserService.ts`)
- `getUsers()` - Отримання користувачів
- `updateUser(userId, data)` - Оновлення профілю
- `deleteUser(userId)` - Видалення користувача

### Portfolio Service (`apiPortfolioService.ts`)
- `getPortfolio(masterId)` - Отримання портфоліо
- `addPortfolioItem(item)` - Додавання роботи
- `updatePortfolioItem(itemId, data)` - Оновлення

---

## 🔄 Потоки взаємодій

### 1. Реєстрація та Онбординг

```
Лендинг → Реєстрація → Вибір ролі (Client/Master)
    ↓
[CLIENT]                    [MASTER]
    ↓                           ↓
Onboarding:              Onboarding:
- Профіль                  - Профіль
- Пристрої                 - Спеціалізація
- Завершення               - Досвід
                          - Інструменти
                          - Завершення
    ↓                           ↓
    └───────► Dashboard ────────┘
```

### 2. Створення замовлення (Client)

```
[Каталог пристроїв] або [Jarvis AI]
    ↓
Вибір пристрою:
- Тип (smartphone/tablet/laptop)
- Бренд (Apple/Samsung/Xiaomi...)
- Модель (iPhone 14, Galaxy S23...)
    ↓
Вибір проблеми:
- Ремонт екрану
- Заміна батареї
- Ремонт камери
- Інше...
    ↓
Деталі замовлення:
- Опис проблеми
- Фото пристрою/дефекту
- Терміновість (low/medium/high)
- Місто
- Бюджет (опціонально)
    ↓
[Замовлення створено: status="open"]
    ↓
Уведомлення → Майстрам з відповідним профілем
    ↓
Замовлення з'являється в "Дошці замовлень" майстрів
```

### 3. Пропозиція від майстра (Master → Client)

```
[Master Dashboard] → [Дошка замовлень]
    ↓
Перегляд замовлення (status="open")
    ↓
[Створити пропозицію]
    ↓
Заповнення пропозиції:
- Ціна (UAH)
- Термін виконання (дні)
- Опис роботи
- Фото з портфоліо (опціонально)
    ↓
[Пропозиція відправлена: status="pending"]
    ↓
Уведомлення → Клієнту
    ↓
Замовлення: proposalCount++
    ↓
[Клієнт переглядає пропозиції]
```

### 4. Прийняття пропозиції (Client)

```
[Мої Замовлення] → [Перегляд пропозицій]
    ↓
Порівняння пропозицій:
- Ціна
- Термін
- Рейтинг майстра
- Відгуки
    ↓
[Прийняти пропозицію]
    ↓
Усі інші пропозиції → status="rejected"
    ↓
Замовлення:
- status="accepted"
- assignedMasterId = masterId
- agreedPrice = proposal.price
    ↓
Уведомлення → Майстру
    ↓
Створення розмови (Conversation) в чаті
```

### 5. Оплата та Escrow (Client)

```
[Замовлення: status="accepted"]
    ↓
[Оплатити замовлення]
    ↓
Вибір методу оплати:
- Карта
- Банківський переказ
- Криптовалюта (USDT)
- PayPal
    ↓
[Платіж відправлено в Escrow]
    ↓
Order:
- paymentStatus="escrowed"
- paymentAmount = agreedPrice
- escrowId = generated
    ↓
Master отримує уведомлення
    ↓
Master може почати роботу
```

### 6. Виконання роботи (Master)

```
[Замовлення: status="accepted", paymentStatus="escrowed"]
    ↓
Master змінює статус:
[Почати роботу] → status="in_progress"
    ↓
[Оновлення прогресу]
- Фото процесу роботи
- Опис виконаних дій
- Чат з клієнтом
    ↓
[Завершити роботу]
    ↓
Уведомлення → Клієнту
    ↓
[Очікування підтвердження від клієнта]
```

### 7. Звільнення оплати (Client)

```
[Замовлення: status="in_progress"]
[Робота завершена майстром]
    ↓
Клієнт перевіряє результат
    ↓
[Підтвердити завершення]
    ↓
Платіж:
- paymentStatus="released"
- Master отримує: amount - (amount * 0.05) // 5% комісія
- Платформа: amount * 0.05
 Road → Master.balance
    ↓
Order:
- status="completed"
- completedAt = Date.now()
    ↓
Уведомлення → Master (оплата отримана)
    ↓
[Залишити відгук] (опціонально)
```

### 8. Чат між користувачами

```
[Повідомлення] → [Список розмов]
    ↓
Вибір/створення розмови:
- Автоматично створюється при прийнятті пропозиції
- Можна створити вручну
    ↓
[ChatWindow]
    ↓
Функціональність:
- Надсилання тексту
- Надсилання фото
- Надсилання файлів
- Редагування повідомлень
- Видалення повідомлень
- Відповіді на повідомлення
- Реакції (👍, ❤️, 😂...)
- Пошук повідомлень
    ↓
Усі повідомлення зберігаються в localStorage
Усі дії логуються (для адмінів)
```

---

## 📱 Компоненти UI

### Client Components

#### `ModernClientDashboard`
- Статистика замовлень
- Швидкі дії (створити замовлення)
- Останні замовлення
- Рекомендовані майстри

#### `DeviceCatalog`
- Каталог пристроїв (>100 моделей)
- Фільтрація: бренд, тип, категорія
- 3D модель пристрою (Spline)
- Вибір моделі → Створення замовлення

#### `MyDevices`
- Збережені пристрої клієнта
- Історія ремонтів кожного пристрою
- Швидке створення замовлення для пристрою

#### `Orders` (Client View)
- Список замовлень клієнта
- Фільтри: статус, дата
- Перегляд деталей
- Дії: редагувати, видалити, відмінити, спір

#### `PremiumSubscriptionTab`
- Перегляд статусу підписки
- Покупка Premium (4.99 EUR/місяць)
- Управління підпискою
- Чеки та квитанції
- Гарантійні кейси

---

### Master Components

#### `ModernMasterDashboard`
- Статистика: замовлень, доходів, рейтингу
- Останні замовлення
- Швидкі дії

#### `MasterOrdersBoard`
- Kanban дошка замовлень
- Колонки: Нові, В роботі, Завершені
- Drag & Drop для зміни статусу
- Фільтри та пошук

#### `Proposals` (Master View)
- Мої пропозиції
- Статус кожної пропозиції
- Швидке створення пропозиції

#### `PortfolioPage`
- Галерея робіт
- Додавання нових робіт (фото до/після)
- Редагування та видалення

#### `MasterInventory`
- Інвентар запчастин
- Додавання/видалення запчастин
- Ціни та кількість

#### `MasterPartsMarketplace`
- Маркетплейс запчастин
- Пошук та покупка

#### `MasterSupportPanel`
- Графік роботи техпідтримки
- Створення сесій
- Тікети підтримки
- Статистика заробітку (% від сесій)

---

### Admin Components

#### `AdminDashboard`
- Огляд системи: користувачі, замовлення, доходи
- Вкладки: Огляд, Користувачі, Замовлення, Фінанси, Спори

#### `ModernUsersPanel`
- Список користувачів
- Фільтри: роль, статус верифікації
- Дії: редагувати, блокувати, видалити, змінити роль

#### `ModernFinancialPanel`
- Фінансова аналітика
- Графіки доходів
- Транзакції
- Комісії платформи

#### `SettingsConfiguration`
- Налаштування платформи
- Конфігурація параметрів
- RBAC управління

---

### Common Components

#### `ChatWindow`
- Вікно чату
- Надсилання повідомлень (текст, фото, файли)
- Редагування/видалення
- Реакції
- Відповіді на повідомлення

#### `MessagesNew`
- Список розмов
- Пошук розмов
- Вибір розмови → відкриття ChatWindow

#### `JarvisChat`
- AI асистент (передчат)
- Збір інформації: пристрій, проблема, терміновість
- Створення замовлення на основі зібраної інформації

---

## 🔀 Схема замовлення (Order Flow)

### Статуси замовлення та переходи

```
┌─────────────────────────────────────────────────────────────┐
│                    ORDER LIFECYCLE                           │
└─────────────────────────────────────────────────────────────┘

[open] ─────────────► [proposed] ──────────► [accepted]
  │                          │                     │
  │                          │                     │
  ├──► [deleted]             ├──► [cancelled]      │
  │                          │                     │
  │                          │                     ▼
  │                          │              [in_progress]
  │                          │                     │
  │                          │                     ├──► [completed]
  │                          │                     │
  │                          │                     └──► [disputed]
  │                          │                              │
  │                          │                              │
  │                          └──► [disputed] ───────────────┘
  │                                                         │
  └─────────────────────────────────────────────────────────┘
                          [cancelled]

Переходи статусів:

open → proposed          Master: Створює пропозицію
open → deleted           Client: Видаляє замовлення
open → cancelled         Client: Відміняє

proposed → accepted      Client: Приймає пропозицію
proposed → rejected      Client: Відхиляє пропозицію (інші пропозиції)
proposed → cancelled     Master: Скасовує пропозицію

accepted → in_progress   Master: Починає роботу (після оплати)
accepted → cancelled     Client/Master: Відміняє
accepted → disputed      Client/Master: Відкриває спір

in_progress → completed  Master: Завершує + Client: Підтверджує
in_progress → disputed   Client/Master: Відкриває спір
in_progress → cancelled  Master: Відміняє

disputed → resolved      Admin: Вирішує спір
disputed → in_progress   Admin: Повертає в роботу
disputed → cancelled     Admin: Скасовує
```

### Детальний workflow замовлення

```
1. СТВОРЕННЯ (Client)
   ├─ Order: status="open", proposalCount=0
   ├─ Уведомлення → Майстрам (відповідного профілю)
   └─ Замовлення з'являється в "Дошці замовлень"

2. ПРОПОЗИЦІЇ (Master)
   ├─ Master переглядає замовлення
   ├─ Створює пропозицію (Offer)
   ├─ Order: proposalCount++
   ├─ Уведомлення → Client
   └─ Пропозиція з'являється в списку пропозицій клієнта

3. ПРИЙНЯТТЯ (Client)
   ├─ Client порівнює пропозиції
   ├─ Вибирає найкращу
   ├─ Order: status="accepted", assignedMasterId, agreedPrice
   ├─ Всі інші пропозиції → status="rejected"
   ├─ Уведомлення → Master
   └─ Створення розмови в чаті

4. ОПЛАТА (Client)
   ├─ Client оплачує замовлення
   ├─ Order: paymentStatus="escrowed", escrowId
   ├─ Уведомлення → Master
   └─ Master може почати роботу

5. ВИКОНАННЯ (Master)
   ├─ Master: status="in_progress"
   ├─ Оновлення прогресу (фото, опис)
   ├─ Чат з клієнтом
   ├─ Master: статус="completed" (робота готова)
   └─ Уведомлення → Client

6. ПІДТВЕРДЖЕННЯ (Client)
   ├─ Client перевіряє результат
   ├─ Підтверджує завершення
   ├─ Платіж випускається з Escrow
   ├─ Master отримує: amount - 5%
   ├─ Платформа отримує: 5%
   ├─ Order: status="completed", paymentStatus="released"
   └─ Запит на відгук → Client

7. СПОР (Client/Master, якщо потрібно)
   ├─ Створення спору
   ├─ Order: disputeStatus="open"
   ├─ Уведомлення → Admin
   ├─ Admin розглядає спір
   ├─ Рішення: client_wins / master_wins / compromise
   └─ Order: disputeStatus="resolved"
```

---

## 💬 Схема чату (Chat System)

### Створення розмови

```
Автоматично:
├─ При прийнятті пропозиції (Client + Master)
└─ conversationId = "conv_{userId1}_{userId2}_order_{orderId}"

Вручну:
├─ Відкриття чату з користувачем
└─ conversationId = "conv_{userId1}_{userId2}"
```

### Надсилання повідомлення

```
[ChatWindow]
pdf
├─ Введення тексту
├─ Додавання фото (опціонально)
├─ Додавання файлів (опціонально)
├─ Відповідь на повідомлення (опціонально)
    ↓
sendMessage()
├─ Генерація messageId
├─ Конвертація фото у base64
├─ Створення Message:
│   ├─ conversationId
│   ├─ senderId, senderName, senderRole
│   ├─ recipientId
│   ├─ content, photos, attachments
│   ├─ messageType (text/image/file)
│   └─ status: delivered=false, read=false
├─ Збереження в localStorage
├─ Оновлення Conversation.lastMessage
├─ Збільшення unreadCount для recipient
└─ Логування дії: logChatAction('sent')
```

### Читання повідомлення

```
[Отримувач відкриває розмову]
    ↓
markConversationAsRead()
├─ Всі непрочитані → read=true
├─ unreadCount[userId] = 0
└─ Логування: logChatAction('read')
```

### Редагування/Видалення

```
Редагування:
├─ editMessage(messageId, newContent)
├─ Message: edited=true, editedAt=Date, content=newContent
└─ Логування: logChatAction('edited')

Видалення:
├─ deleteMessage(messageId)
├─ Message: deleted=true, deletedAt=Date, content="Повідомлення видалено"
└─ Логування: logChatAction('deleted')
```

---

## 💳 Платежна система (Payment System)

### Escrow система

```
┌─────────────────────────────────────────────────────┐
│              ESCROW PAYMENT FLOW                     │
└─────────────────────────────────────────────────────┘

1. ОПЛАТА (Client)
   ├─ Client обирає метод оплати
   ├─ Платіж відправляється в Escrow
   ├─ Order.paymentStatus = "escrowed"
   ├─ Order.escrowId = generated
   └─ Гроші заблоковані, Master ще не отримав

2. ВИКОНАННЯ РОБОТИ (Master)
   ├─ Master виконує роботу
   ├─ Master завершує (status="completed")
   └─ Очікування підтвердження від Client

3. ЗВІЛЬНЕННЯ (Client)
   ├─ Client перевіряє результат
   ├─ Client підтверджує
   ├─ Платіж випускається:
   │   ├─ Master: amount - (amount * 0.05) → balance
   │   ├─ Платформа: amount * 0.05
   │   └─ Order.paymentStatus = "released"
   └─ Order.status = "completed"

4. СПІР (якщо потрібно)
   ├─ Client/Master відкриває спір
   ├─ Admin розглядає
   ├─ Рішення:
   │   ├─ client_wins → refund (повернення Client)
   │   ├─ master_wins → release (ροплата Master)
   │   └─ compromise → часткове розподілення
   └─ Order.paymentStatus = "refunded" або "released"
```

### Методи оплати

- 💳 **Карта** (Visa, Mastercard)
- 🏦 **Банківський переказ**
- ₿ **Криптовалюта** (USDT)
- 📧 **PayPal**
- 🍎 **Apple Pay**
- 📱 **Google Pay**

### Комісія платформи

- **Стандартна комісія**: 5%
- **Платформа отримує**: amount * 0.05
- **Master отримує**: amount * 0.95

---

## 🎯 Мастер-мачинг (Master Matching)

### Алгоритм підбору майстрів

```
Клієнт створює замовлення:
├─ deviceType: 'smartphone'
├─ brand: 'Apple'
├─ issue: 'Ремонт екрану'
├─ city: 'Київ'
└─ clientPreferences (з профілю клієнта)
    ├─ preferredWorkLocation: 'service' | 'home' | 'mobile'
    ├─ skillLevel: 'beginner' | 'intermediate' | 'advanced'
    ├─ budgetRange: 'low' | 'medium' | 'high'
    └─ preferredPriority: ['speed', 'quality', 'price']
```

```
Розрахунок відповідності (calculateMatchScore):

┌────────────────────────────────────────────────────┐
│         КРИТЕРІЇ ОЦІНКИ (100 балів)                │
├────────────────────────────────────────────────────┤
│ 1. Місце роботи (20%)                              │
│    - Ідеальна відповідність: +20                   │
│    - Часткова: +15                                 │
│    - Не відповідає: +5                             │
├────────────────────────────────────────────────────┤
│ 2. Бренди та типи ремонту (35%)                    │
│    - Пряме співпадіння бренду: +20                 │
│    - Співпадіння типу ремонту: +15                 │
│    - Бонус для виїзних (+5)                        │
├────────────────────────────────────────────────────┤
│ 3. Місто та відстань (15%)                         │
│    - Те саме місто: +15                            │
│    - В межах workingRadius: +10                    │
│    - Інше місто: +2                                │
├────────────────────────────────────────────────────┤
│ 4. Досвід та рейтинг (20%)                         │
│    - workExperience >= 5 років: +10                │
│    - rating >= 4.5: +10                            │
│    - completedOrders >= 10: +5                     │
├────────────────────────────────────────────────────┤
│ 5. Відповідність пріоритетам (10%)                 │
│    - preferredPriority: speed/quality/price        │
│    - Враховується при виборі                         │
└────────────────────────────────────────────────────┘

Результат: 0-100 балів
```

### Ранжування майстрів

```
1. Розрахунок matchScore для кожного майстра
2. Сортування за matchScore (від більшого до меншого)
3. Фільтрація:
   ├─ verified = true
   ├─ blocked = false
   ├─ city відповідає (або в workingRadius شرі)
   └─ repairBrands включає brand замовлення
4. Показ топ-10 найкращих майстрів клі Drive
```

---

## 🔐 Безпека та права

### Перевірка прав доступу

```
Для кожної дії перевіряється:

1. Роль користувача
2. Власність ресурсу (order.userId === currentUser.id)
3. Статус ресурсу (order.status)
4. Наявність необхідних полів (assignedMasterId)

Приклади:
├─ createProposal:
│   ├─ currentUser.role === 'master'
│   ├─ order.status === 'open'
│   └─ !existingProposal для цього майстра
│
├─ acceptProposal:
│   ├─ currentUser.role === 'client'
│   ├─ proposal.status === 'pending'
│   └─ order.clientId === currentUser.id
│
└─ completeOrder:
    ├─ currentUser.role === 'master'
    ├─ order.assignedMasterId === currentUser.id
    └─ order.status === 'in_progress'
```

---

## 📊 Статистика та аналітика

### Для Client:
- Кількість замовлень
- Статистика витрат
- Список майстрів, з якими працювали
- Історія cancelів

### Для Master:
- Кількість замовлень
- Доходи (з урахуванням комісій)
- Рейтинг та відгуки
- Статистика по типах ремонтів
- Заробіток з техпідтримки

### Для Admin:
- Загальна кількість користувачів
- Кількість замовлень (активних, завершених)
- Фінансова статистика (виручка, комісії)
- Кількість спорів
- Активність користувачів

---

## 🌐 Інтернаціоналізація (i18n)

### Підтримувані мови:
- 🇺🇦 **Українська** (uk) - основна
- 🇷🇺 **Російська** (ru)
- 🇬🇧 **Англійська** (en)
- 🇵🇱 **Польська** (pl)
- 🇷🇴 **Румунська** (ro)

### Компоненти перекладу:
- `LanguageSwitcher` - перемикач мови
- `useTranslation()` - хук для перекладів
- `translation.json` - файли перекладів

---

## 🤖 AI Система (Jarvis)

### Функціональність:

```
Jarvis Chat → Збір інформації перед створенням замовлення:
├─ 1. Тип пристрою (smartphone/tablet/laptop/other)
├─ 2. Бренд (Apple, Samsung, Xiaomi...)
├─ 3. Модель (конкретна модель)
├─ 4. Проблема (якщо не вибрано в каталозі)
├─ 5. Опис проблеми (детальний)
└─ 6. Терміновість (low/medium/high)
    ↓
[Створення замовлення з зібраної інформації]
```

---

## 📱 Мобільна оптимизация

- ✅ Responsive дизайн (mobile-first)
- ✅ Touch-оптимізовані кнопки
- ✅ Bottom navigation для мобільних
- ✅ Mobile menu
- ✅ Адаптивні форми
- ✅ Оптимізація для маленьких екранів

---

## 🎨 Design System

### Компоненти:
- `Button` - Кнопки з варіантами
- `Input` - Поля вводу
- `Modal` - Модальні вікна
- `Toast` - Сповіщення
- `Card` - Картки
- `Badge` - Значки
- `Avatar` - Аватари
- `Tabs` - Вкладки

### Кольори:
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)
- Gray scale для текстів та фонів

---

## 🔔 Система уведомлень

### Типи уведомлень:
- `order` - Замовлення
- `message` - Повідомлення
- `status` - Зміна статусу
- `rating` - Відгук
- `payment` - Платіж

### Автоматичні уведомлення:

```
Створення замовлення → Усі майстри (відповідного профілю)
Отримання пропозиції → Client
Прийняття пропозиції → Master
Початок роботи → Client
Завершення роботи → Client
Звільнення оплати → Master
Створення спору → Client, Master, Admin
Нове повідомлен attributed в чаті → Отримувач
```

---

## 💾 Зберігання даних

### LocalStorage Keys:
- `repair_master_users` - Користувачі
- `repair_master_orders` - Замовлення
- `repair_master_offers` - Пропозиції
- `repairhub_conversations` - Розмови
- `repairhub_messages` - Повідомлення
- `repairhub_chat_logs` - Логи чату
- `masterSupportSchedules` - Графіки техпідтримки
- `masterSupportSessions` - Сесії техпідтримки
- `supportTickets` - Тікети
- `repairhub_premium_subscriptions` - Преміум підписки
- `repairhub_receipts` - Чеки (Premium)
- `repairhub_warranty_cases` - Гарантійні кейси

---

## 🚀 Deployment

### Компоненти:
- **Frontend**: Vite build → static files
- **Backend**: Node.js/Express server
- **Database**: JSON file (dev), PostgreSQL (prod)
- **Web Server**: Nginx
- **Containerization**: Docker

### Конфігурація:
- `Dockerfile` - контейнеризація
- `docker-compose.yml` - оркестрація
- `nginx.conf` - конфігурація веб-сервера
- `vite.config.ts` - конфігурація Vite

---

## 🔗 Посилання на GitHub

**Репозиторій:** https://github.com/PlevanDM/RP-Modern

**Гілка:** `udate-2`

---

*Документація створена: 2025*
*Версія системи: 1.0.0*

