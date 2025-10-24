# 🔗 Руководство по интеграции системы коммуникации и заработков

## 📖 Содержание

1. [Быстрый старт](#быстрый-старт)
2. [Структура файлов](#структура-файлов)
3. [Интеграция компонентов](#интеграция-компонентов)
4. [Интеграция с существующим кодом](#интеграция-с-существующим-кодом)
5. [Тестирование](#тестирование)
6. [Развертывание](#развертывание)

---

## Быстрый старт

### 1. Новые файлы в проекте

```
src/
├── types/
│   └── index.ts (ОБНОВЛЕН - добавлены новые типы)
├── services/
│   ├── messagesService.ts (НОВЫЙ)
│   └── earningsService.ts (НОВЫЙ)
├── hooks/
│   └── useAdvancedMessaging.ts (НОВЫЙ)
├── components/
│   ├── AdvancedMessaging.tsx (НОВЫЙ)
│   └── MasterEarningsAnalytics.tsx (НОВЫЙ)
└── documentation/
    ├── COMMUNICATION_AND_EARNINGS_SYSTEM.md (НОВЫЙ)
    └── INTEGRATION_GUIDE.md (ВЫ ЧИТАЕТЕ)
```

### 2. Быстрая интеграция (5 минут)

```typescript
// В вашем компоненте Dashboard
import { AdvancedMessaging } from '@/components/AdvancedMessaging';
import { MasterEarningsAnalytics } from '@/components/MasterEarningsAnalytics';
import { useAdvancedMessaging } from '@/hooks/useAdvancedMessaging';

export function Dashboard() {
  const currentUser = getCurrentUser();
  const { chats, selectedChat, messages, createOrSelectChat } = 
    useAdvancedMessaging(currentUser.id);

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Левая панель - список чатов */}
      <div className="col-span-1 bg-white rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Сообщения</h2>
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => createOrSelectChat(chat.participantIds, chat.participantNames)}
            className="p-2 cursor-pointer hover:bg-gray-100 rounded"
          >
            {chat.participantNames.join(', ')}
          </div>
        ))}
      </div>

      {/* Средняя панель - чат */}
      <div className="col-span-1">
        {selectedChat && (
          <AdvancedMessaging
            chat={selectedChat}
            currentUser={currentUser}
            otherUser={/* собеседник */}
            messages={messages}
          />
        )}
      </div>

      {/* Правая панель - аналитика (только для мастеров) */}
      {currentUser.role === 'master' && (
        <div className="col-span-1">
          <MasterEarningsAnalytics masterId={currentUser.id} />
        </div>
      )}
    </div>
  );
}
```

---

## Структура файлов

### Types

```typescript
// Новые типы добавлены в src/types/index.ts

// Сообщения
export type MessageType = 'text' | 'image' | 'document' | 'proposal' | 'estimate' | 'system';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

export interface AdvancedMessage { /* ... */ }
export interface Chat { /* ... */ }

// Заработки
export type EarningType = 'labor_income' | 'parts_markup' | 'commission_earned' | 'bonus_earned' | 'refund';
export type EarningStatus = 'pending' | 'confirmed' | 'withdrawn' | 'refunded';

export interface MasterEarning { /* ... */ }
export interface MasterBalance { /* ... */ }
export interface CommissionConfig { /* ... */ }
export interface PlatformRevenue { /* ... */ }
```

### Services

#### MessagesService

```typescript
// src/services/messagesService.ts
class MessagesService {
  public getOrCreateChat(...): Chat
  public sendMessage(...): AdvancedMessage
  public markAsRead(...): void
  public getChatMessages(...): AdvancedMessage[]
  public getUserChats(...): Chat[]
  public addReaction(...): void
  public editMessage(...): boolean
  public deleteMessage(...): boolean
  public pinMessage(...): void
  public archiveChat(...): void
  public subscribe(...): () => void
}

export const messagesService = MessagesService.getInstance();
```

#### EarningsService

```typescript
// src/services/earningsService.ts
class EarningsService {
  public createEarning(...): MasterEarning
  public confirmEarning(...): boolean
  public withdrawEarning(...): boolean
  public refundEarning(...): boolean
  public getMasterBalance(...): MasterBalance
  public getMasterEarnings(...): MasterEarning[]
  public getEarningsByStatus(...): MasterEarning[]
  public getEarningsStatistics(...): EarningsStatistics
  public getPlatformRevenue(...): PlatformRevenue[]
  public getTotalPlatformRevenue(...): number
  public getCommissionConfigs(): CommissionConfig[]
  public updateCommissionConfig(...): boolean
  // ... и другие методы
}

export const earningsService = EarningsService.getInstance();
```

### Components

#### AdvancedMessaging.tsx

- **Функция**: Полнофункциональный компонент чата
- **Props**: chat, currentUser, otherUser, messages, onClose
- **Возможности**:
  - Отправка текстовых сообщений
  - Загрузка файлов
  - Пропозиции и сметы
  - Реакции на сообщения
  - Редактирование и удаление
  - Закрепление сообщений

#### MasterEarningsAnalytics.tsx

- **Функция**: Аналитика заработков мастера
- **Props**: masterId
- **Вкладки**:
  - Обзор (KPI, диаграммы)
  - Заработки (таблица транзакций)
  - Аналитика (графики)

### Hooks

#### useAdvancedMessaging

```typescript
const {
  chats,              // Chat[]
  selectedChat,       // Chat | null
  messages,          // AdvancedMessage[]
  unreadCount,       // number
  loading,           // boolean
  sendMessage,       // (receiverId, content, ...) => void
  sendProposal,      // (receiverId, price, ...) => void
  createOrSelectChat, // (participantIds, names, orderId) => Chat
  markChatAsRead,    // () => void
  archiveChat,       // (chatId) => void
  pinMessage,        // (messageId, pinned) => void
  addReaction,       // (messageId, emoji) => void
  setSelectedChat,   // (chat) => void
} = useAdvancedMessaging(currentUserId);
```

---

## Интеграция компонентов

### 1. Добавление в Master Dashboard

```typescript
// components/features/master/MasterDashboard/index.tsx

import { MasterEarningsAnalytics } from '@/components/MasterEarningsAnalytics';

export function MasterDashboard() {
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Мастер Панель</h1>
      
      {/* Уже существующие элементы */}
      <div className="grid grid-cols-3 gap-4">
        <OrdersBoard />
        <ProposalsList />
        <PortfolioWidget />
      </div>

      {/* НОВОЕ: Аналитика заработков */}
      <div className="bg-white rounded-lg shadow">
        <MasterEarningsAnalytics masterId={currentUser.id} />
      </div>
    </div>
  );
}
```

### 2. Добавление в Order Details

```typescript
// components/features/orders/OrderDetails.tsx

import { AdvancedMessaging } from '@/components/AdvancedMessaging';
import { messagesService } from '@/services/messagesService';

export function OrderDetails({ orderId }: { orderId: string }) {
  const order = getOrder(orderId);
  const currentUser = getCurrentUser();
  const [chat, setChat] = useState<Chat | null>(null);

  useEffect(() => {
    // Создать или получить чат для этого заказа
    const newChat = messagesService.getOrCreateChat(
      [currentUser.id, order.masterId],
      [currentUser.name, order.masterName],
      orderId
    );
    setChat(newChat);
  }, [orderId]);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <OrderInfo order={order} />
      </div>
      
      <div>
        {chat && (
          <AdvancedMessaging
            chat={chat}
            currentUser={currentUser}
            otherUser={getMaster(order.masterId)}
            messages={messagesService.getChatMessages(chat.id)}
          />
        )}
      </div>
    </div>
  );
}
```

### 3. Добавление Messaging Center

```typescript
// components/MessageCenter.tsx

import { useAdvancedMessaging } from '@/hooks/useAdvancedMessaging';

export function MessageCenter() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const {
    chats,
    selectedChat,
    messages,
    unreadCount,
    createOrSelectChat,
  } = useAdvancedMessaging(currentUser.id);

  return (
    <div className="h-screen flex">
      {/* Левая панель - список чатов */}
      <div className="w-1/4 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">
            Сообщения {unreadCount > 0 && `(${unreadCount})`}
          </h2>
        </div>
        
        <div className="overflow-y-auto">
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              selected={selectedChat?.id === chat.id}
              onSelect={() => createOrSelectChat(
                chat.participantIds,
                chat.participantNames
              )}
            />
          ))}
        </div>
      </div>

      {/* Правая панель - сообщения */}
      <div className="flex-1">
        {selectedChat ? (
          <AdvancedMessaging
            chat={selectedChat}
            currentUser={currentUser}
            otherUser={/* собеседник */}
            messages={messages}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Выберите чат</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Интеграция с существующим кодом

### 1. Обновление Order Store

```typescript
// src/store/ordersStore.ts

import { earningsService } from '../services/earningsService';

export const useOrdersStore = create<OrdersState>()((set, get) => ({
  // ... существующий код ...

  completeOrder: (orderId: string) => {
    const order = get().orders.find(o => o.id === orderId);
    if (!order) return;

    // Обновить статус заказа
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status: 'completed' } : o
      ),
    }));

    // НОВОЕ: Создать запись о заработке
    const earning = earningsService.createEarning(
      order.masterId,
      orderId,
      'labor_income',
      order.agreedPrice || order.budget,
      `Ремонт ${order.device}`,
      'UAH'
    );

    // Отправить уведомление
    useUIStore.getState().showNotification(
      `Заказ завершен! Вы заработали ₴${earning.netAmount}`
    );
  },
}));
```

### 2. Обновление Auth Store

```typescript
// src/store/authStore.ts

// Проверить, является ли пользователь админом
const isAdmin = (user: User) => user.role === 'admin';

// Добавить функцию для управления комиссиями (только для админов)
export const updateCommissions = (adminUser: User, configId: string, updates: any) => {
  if (!isAdmin(adminUser)) {
    throw new Error('Only admins can update commissions');
  }
  
  earningsService.updateCommissionConfig(configId, updates);
};
```

### 3. Обновление Navigation

```typescript
// components/ModernNavigation.tsx

import { useAdvancedMessaging } from '@/hooks/useAdvancedMessaging';
import MailIcon from '@mui/icons-material/Mail';

export function Navigation() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { unreadCount } = useAdvancedMessaging(currentUser?.id || '');

  return (
    <nav className="...">
      {/* Существующие элементы */}
      
      {/* НОВОЕ: Иконка сообщений */}
      <Link to="/messages" className="relative">
        <MailIcon />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Link>

      {/* Для мастеров: иконка заработков */}
      {currentUser?.role === 'master' && (
        <Link to="/earnings" className="flex items-center gap-2">
          <AttachMoneyIcon />
          <span>Заработки</span>
        </Link>
      )}
    </nav>
  );
}
```

---

## Тестирование

### 1. Тестирование MessagesService

```typescript
// Test
import { messagesService } from '@/services/messagesService';

describe('MessagesService', () => {
  it('should create a chat', () => {
    const chat = messagesService.getOrCreateChat(
      ['user1', 'user2'],
      ['User 1', 'User 2']
    );
    
    expect(chat.participantIds).toContain('user1');
    expect(chat.participantIds).toContain('user2');
  });

  it('should send a message', () => {
    const chat = messagesService.getOrCreateChat(
      ['user1', 'user2'],
      ['User 1', 'User 2']
    );

    const message = messagesService.sendMessage(
      chat.id,
      'user1',
      'User 1',
      'avatar.jpg',
      'user2',
      'Hello!'
    );

    expect(message.content).toBe('Hello!');
    expect(message.status).toBe('sent');
  });
});
```

### 2. Тестирование EarningsService

```typescript
// Test
import { earningsService } from '@/services/earningsService';

describe('EarningsService', () => {
  it('should create earning with correct commission', () => {
    const earning = earningsService.createEarning(
      'master1',
      'order1',
      'labor_income',
      1000,
      'Test earning'
    );

    // При сумме < 5000: комиссия 15%
    expect(earning.commissionPercent).toBe(15);
    expect(earning.commissionAmount).toBe(150);
    expect(earning.netAmount).toBe(850);
  });

  it('should get master balance', () => {
    const balance = earningsService.getMasterBalance('master1');
    
    expect(balance.masterId).toBe('master1');
    expect(balance.netBalance).toBe(0);
  });
});
```

---

## Развертывание

### 1. Подготовка к Production

```bash
# 1. Запустить тесты
npm run test

# 2. Проверить типы
npm run type-check

# 3. Lint
npm run lint

# 4. Сборка
npm run build
```

### 2. Миграция данных

```typescript
// scripts/migrateEarnings.ts
// Если у вас уже есть заказы, создайте записи о заработках

import { earningsService } from '../src/services/earningsService';
import { ordersStore } from '../src/store/ordersStore';

async function migrateExistingOrders() {
  const completedOrders = ordersStore
    .getState()
    .orders
    .filter(o => o.status === 'completed');

  for (const order of completedOrders) {
    const earning = earningsService.createEarning(
      order.masterId,
      order.id,
      'labor_income',
      order.agreedPrice || order.budget,
      `Ремонт ${order.device}`,
      'UAH'
    );

    // Автоматически подтвердить старые заказы
    earningsService.confirmEarning(earning.id);
  }
}

migrateExistingOrders();
```

### 3. Переменные окружения

```bash
# .env
VITE_MESSAGES_STORAGE_KEY=messages-service-data
VITE_EARNINGS_STORAGE_KEY=earnings-service-data
VITE_COMMISSION_PERCENT=15
VITE_PREMIUM_COMMISSION_PERCENT=10
VITE_PREMIUM_THRESHOLD=5000
```

---

## Проверочный список интеграции

- [ ] Добавлены все новые типы в `types/index.ts`
- [ ] Созданы сервисы `messagesService` и `earningsService`
- [ ] Создан хук `useAdvancedMessaging`
- [ ] Добавлены компоненты `AdvancedMessaging` и `MasterEarningsAnalytics`
- [ ] Интегрирован MessageCenter в навигацию
- [ ] Интегрирована аналитика в MasterDashboard
- [ ] Обновлен OrdersStore для создания заработков
- [ ] Прошли unit-тесты
- [ ] Проверена типизация (tsc --noEmit)
- [ ] Пройден lint (eslint)
- [ ] Проведено manual тестирование
- [ ] Документация обновлена

---

## Контакт и поддержка

Вопросы? Проблемы? Создайте Issue или обратитесь в поддержку.

**Made with ❤️ by Development Team**
