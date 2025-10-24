# 🚀 Система Профессиональной Коммуникации и Управления Заработками

## 📋 Оглавление

1. [Обзор](#обзор)
2. [Архитектура системы](#архитектура-системы)
3. [Компоненты коммуникации](#компоненты-коммуникации)
4. [Система заработков и комиссий](#система-заработков-и-комиссий)
5. [API Справочник](#api-справочник)
6. [Примеры использования](#примеры-использования)
7. [Настройка комиссий](#настройка-комиссий)

---

## Обзор

Новая система включает **профессиональную коммуникацию** между клиентами и мастерами, а также **полноценную систему управления заработками** с отслеживанием комиссий платформы.

### ✨ Ключевые функции:

#### 💬 Коммуникация
- **Расширенный чат** с поддержкой:
  - Текстовые сообщения с редактированием и удалением
  - Загрузка и обмен файлами/документами
  - Отправка смет и пропозиций прямо в чате
  - Реакции на сообщения (эмодзи)
  - Закрепление важных сообщений
  - Архивирование чатов
- **Real-time уведомления** при новых сообщениях
- **Счетчик непрочитанных** сообщений

#### 💰 Заработки и комиссии
- **Отслеживание доходов мастера**:
  - Трудовой доход
  - Разметка деталей
  - Бонусы и комиссии
- **Система комиссий платформы**:
  - Стандартная комиссия 15%
  - Премиум комиссия 10% (от 5000₴)
  - Бонусы за успешные сделки
  - Реферальные бонусы
- **Управление балансом**:
  - Отслеживание pending/confirmed/withdrawn статусов
  - Вывод средств
  - Детальные отчеты и аналитика

---

## Архитектура системы

```
┌─────────────────────────────────────────────────────────┐
│                    React Components                      │
│  ┌──────────────────┐  ┌─────────────────────────────┐  │
│  │AdvancedMessaging │  │MasterEarningsAnalytics      │  │
│  └────────┬─────────┘  └─────────────────────────────┘  │
│           │                        │                     │
│           ▼                        ▼                     │
├─────────────────────────────────────────────────────────┤
│                    Custom Hooks                          │
│           useAdvancedMessaging / useEarnings            │
├─────────────────────────────────────────────────────────┤
│                    Services (Singleton)                  │
│  ┌──────────────────┐  ┌─────────────────────────────┐  │
│  │messagesService   │  │earningsService              │  │
│  └─────────┬────────┘  └──────────┬──────────────────┘  │
│            │                      │                     │
│            └──────────┬───────────┘                     │
│                       │                                 │
├───────────────────────┼─────────────────────────────────┤
│            Zustand Stores & localStorage                │
└───────────────────────────────────────────────────────────┘
```

---

## Компоненты коммуникации

### AdvancedMessaging Component

Полнофункциональный компонент чата с поддержкой всех типов сообщений.

**Props:**
```typescript
interface AdvancedMessagingProps {
  chat: Chat;                    // Объект чата
  currentUser: User;             // Текущий пользователь
  otherUser: User;               // Собеседник
  messages: AdvancedMessage[];   // Список сообщений
  onClose?: () => void;          // Callback при закрытии
}
```

**Типы сообщений:**
- `text` - Текстовое сообщение
- `document` - Файл/документ
- `proposal` - Пропозиция с ценой и сроком
- `estimate` - Смета/расчет
- `system` - Системное сообщение

**Функциональность:**
```typescript
// Отправить текстовое сообщение
handleSendMessage()

// Отправить пропозицию
handleSendProposal({
  price: 500,
  currency: 'UAH',
  description: 'Замена батареи',
  deadline: '2024-10-30'
})

// Добавить реакцию
handleAddReaction(messageId, '👍')

// Отредактировать
handleEditMessage(message)

// Удалить
handleDeleteMessage(messageId)

// Закрепить
pinMessage(messageId, true)
```

---

## Система заработков и комиссий

### MasterEarningsAnalytics Component

Компонент с полной аналитикой заработков мастера.

**Вкладки:**
1. **Обзор** - KPI, статусы заработков, диаграммы
2. **Заработки** - Таблица всех транзакций
3. **Аналитика** - Графики доходов, статистика

**Функциональность:**
```typescript
// Получить баланс мастера
balance = earningsService.getMasterBalance(masterId)
// {
//   totalEarnings: 50000,
//   totalCommissions: 7500,
//   netBalance: 42500,
//   pendingEarnings: 5000,
//   withdrawnTotal: 30000
// }

// Получить детальный отчет
report = earningsService.getDetailedEarningsReport(masterId)
// {
//   totalGrossIncome: 50000,
//   totalCommissionsPaid: 7500,
//   totalNetIncome: 42500,
//   pendingEarnings: 5000,
//   confirmedEarnings: 10000,
//   withdrawnTotal: 30000,
//   availableBalance: 10000,
//   earnings: [...]
// }

// Статистика за период
stats = earningsService.getEarningsStatistics(
  masterId,
  startDate,
  endDate
)
// {
//   totalEarnings: 50000,
//   totalCommissions: 7500,
//   netIncome: 42500,
//   ordersCount: 10,
//   averageOrderValue: 5000
// }
```

---

## API Справочник

### MessagesService

Синглтон для управления сообщениями и чатами.

#### Основные методы:

```typescript
// Создать или получить чат
getOrCreateChat(
  participantIds: string[],
  participantNames: string[],
  orderId?: string
): Chat

// Отправить сообщение
sendMessage(
  chatId: string,
  senderId: string,
  senderName: string,
  senderAvatar: string,
  receiverId: string,
  content: string,
  type?: MessageType,
  fileUrl?: string,
  fileName?: string,
  estimateData?: any
): AdvancedMessage

// Отметить как прочитанное
markAsRead(
  chatId: string,
  messageIds: string[],
  userId: string
): void

// Получить сообщения чата
getChatMessages(chatId: string): AdvancedMessage[]

// Получить чаты пользователя
getUserChats(userId: string): Chat[]

// Добавить реакцию
addReaction(messageId: string, emoji: string, userId: string): void

// Редактировать сообщение
editMessage(messageId: string, newContent: string, userId: string): boolean

// Удалить сообщение
deleteMessage(messageId: string, userId: string): boolean

// Закрепить/открепить
pinMessage(messageId: string, pinned: boolean): void

// Архивировать чат
archiveChat(chatId: string, archived: boolean): void

// Подписаться на обновления
subscribe(listener: () => void): () => void
```

### EarningsService

Синглтон для управления заработками и комиссиями.

#### Основные методы:

```typescript
// Создать запись о заработке
createEarning(
  masterId: string,
  orderId: string,
  type: EarningType,
  grossAmount: number,
  description: string,
  currency?: string
): MasterEarning

// Подтвердить заработок (pending -> confirmed)
confirmEarning(earningId: string): boolean

// Вывести заработок (-> withdrawn)
withdrawEarning(earningId: string): boolean

// Вернуть заработок (-> refunded)
refundEarning(earningId: string, reason: string): boolean

// Получить баланс мастера
getMasterBalance(masterId: string): MasterBalance

// Получить заработки мастера
getMasterEarnings(masterId: string): MasterEarning[]

// Получить по статусу
getEarningsByStatus(masterId: string, status: EarningStatus): MasterEarning[]

// Статистика за период
getEarningsStatistics(
  masterId: string,
  startDate: Date,
  endDate: Date
): EarningsStatistics

// Доход платформы
getPlatformRevenue(startDate?: Date, endDate?: Date): PlatformRevenue[]

// Общий доход платформы
getTotalPlatformRevenue(startDate?: Date, endDate?: Date): number

// Получить конфигурации комиссий
getCommissionConfigs(): CommissionConfig[]

// Обновить конфиг комиссии
updateCommissionConfig(configId: string, updates: Partial<CommissionConfig>): boolean

// Активные заработки (pending + confirmed)
getActiveMasterEarnings(masterId: string): MasterEarning[]

// Доступный баланс для вывода
getWithdrawableBalance(masterId: string): number

// Детальный отчет
getDetailedEarningsReport(masterId: string): DetailedReport
```

---

## Примеры использования

### Пример 1: Отправка пропозиции через чат

```typescript
import { AdvancedMessaging } from '@/components/AdvancedMessaging';
import { messagesService } from '@/services/messagesService';

function ClientOrderPage() {
  const [chat, setChat] = useState<Chat | null>(null);
  const currentUser = getCurrentUser(); // клиент
  const master = getMaster(); // мастер

  const handleStartChat = () => {
    const newChat = messagesService.getOrCreateChat(
      [currentUser.id, master.id],
      [currentUser.name, master.name],
      orderId
    );
    setChat(newChat);
  };

  return (
    <div>
      <button onClick={handleStartChat}>Начать переговоры</button>
      
      {chat && (
        <AdvancedMessaging
          chat={chat}
          currentUser={currentUser}
          otherUser={master}
          messages={messagesService.getChatMessages(chat.id)}
        />
      )}
    </div>
  );
}
```

### Пример 2: Мастер отправляет смету

```typescript
import { AdvancedMessaging } from '@/components/AdvancedMessaging';

function MasterProposal() {
  const chat = getSelectedChat();
  
  const handleSendEstimate = () => {
    messagesService.sendMessage(
      chat.id,
      currentUser.id,
      currentUser.name,
      currentUser.avatar,
      client.id,
      'Смета на ремонт iPhone 13',
      'estimate',
      undefined,
      undefined,
      {
        price: 1500,
        currency: 'UAH',
        description: 'Замена экрана + батареи',
        deadline: '2024-11-01'
      }
    );
  };

  return <button onClick={handleSendEstimate}>Отправить смету</button>;
}
```

### Пример 3: Создание заработка при завершении заказа

```typescript
import { earningsService } from '@/services/earningsService';

function CompleteOrder(order: Order, master: User) {
  const handleCompleteOrder = () => {
    // Создать запись о заработке
    const earning = earningsService.createEarning(
      master.id,
      order.id,
      'labor_income', // Тип: трудовой доход
      order.amount, // Сумма до комиссии
      `Ремонт ${order.device}`,
      'UAH'
    );

    // earning будет иметь статус 'pending'
    // После проверки администратором:
    // earningsService.confirmEarning(earning.id);

    // После вывода:
    // earningsService.withdrawEarning(earning.id);

    // Обновить баланс мастера
    const balance = earningsService.getMasterBalance(master.id);
    console.log('Новый баланс:', balance);
  };

  return <button onClick={handleCompleteOrder}>Завершить заказ</button>;
}
```

### Пример 4: Просмотр аналитики заработков

```typescript
import { MasterEarningsAnalytics } from '@/components/MasterEarningsAnalytics';

function MasterDashboard() {
  const master = getCurrentUser();

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <MasterEarningsAnalytics masterId={master.id} />
      </div>
    </div>
  );
}
```

### Пример 5: Использование хука

```typescript
import { useAdvancedMessaging } from '@/hooks/useAdvancedMessaging';

function MessagingCenter() {
  const currentUser = getCurrentUser();
  const {
    chats,
    selectedChat,
    messages,
    unreadCount,
    sendMessage,
    sendProposal,
    createOrSelectChat,
    markChatAsRead,
  } = useAdvancedMessaging(currentUser.id);

  const handleSelectChat = (chat: Chat) => {
    createOrSelectChat(
      chat.participantIds,
      chat.participantNames,
      chat.orderId
    );
    markChatAsRead();
  };

  return (
    <div>
      <div className="unread-badge">{unreadCount}</div>
      <ChatList chats={chats} onSelectChat={handleSelectChat} />
      {selectedChat && (
        <ChatWindow
          chat={selectedChat}
          onSendProposal={sendProposal}
        />
      )}
    </div>
  );
}
```

---

## Настройка комиссий

### Стандартные комиссии

По умолчанию система настроена с следующими комиссиями:

| Тип | Описание | Размер | Условие |
|-----|---------|--------|---------|
| `platform_fee_standard` | Стандартная комиссия | 15% | При сумме < 5000₴ |
| `platform_fee_premium` | Премиум комиссия | 10% | При сумме ≥ 5000₴ |
| `referral_bonus` | Бонус за реферала | 5% | Автоматически |
| `successful_deal_bonus` | Бонус за успешную сделку | 2% | От суммы ≥ 1000₴ |

### Изменение комиссии (Admin)

```typescript
import { earningsService } from '@/services/earningsService';

// Получить текущие конфиги
const configs = earningsService.getCommissionConfigs();

// Изменить стандартную комиссию на 12%
earningsService.updateCommissionConfig('platform-fee-standard', {
  percentage: 12
});

// Добавить новую комиссию
const newConfig: CommissionConfig = {
  id: 'vip-discount',
  type: 'platform_fee',
  description: 'VIP скидка',
  percentage: 5,
  minAmount: 10000,
  active: true,
  createdAt: new Date()
};

// Примечание: Для добавления новой конфигурации нужно расширить сервис
```

---

## Жизненный цикл заработка

```
1. СОЗДАНИЕ (pending)
   ↓
2. ПОДТВЕРЖДЕНИЕ (pending → confirmed)
   ↓
3. ВЫВОД (confirmed → withdrawn)
   ↓
4. ВЫПЛАТА (withdrawn - завершено)

АЛЬТЕРНАТИВНЫЕ ПУТИ:
- pending → refunded (отмена)
- confirmed → refunded (возврат)
```

### Состояния заработка:

| Статус | Описание | Действия доступны |
|--------|---------|------------------|
| `pending` | Ожидание проверки | Подтвердить, Вернуть |
| `confirmed` | Подтвержден | Вывести, Вернуть |
| `withdrawn` | Выведен | - |
| `refunded` | Возвращен | - |

---

## Интеграция с заказами

Когда заказ завершен, автоматически создается запись о заработке:

```typescript
// В OrderService или OrderStore
async completeOrder(order: Order, master: User) {
  // 1. Завершить заказ
  order.status = 'completed';

  // 2. Создать запись о заработке
  const earning = earningsService.createEarning(
    master.id,
    order.id,
    'labor_income',
    order.agreedPrice,
    `Ремонт ${order.device}`,
    'UAH'
  );

  // 3. Отправить уведомление мастеру
  notifyMaster(master, {
    title: 'Заказ завершен',
    message: `Вы заработали ₴${earning.netAmount} (после комиссии)`,
  });

  // 4. Сохранить
  saveOrder(order);
}
```

---

## Мониторинг и аналитика

### Для мастера:
- 📊 Просмотр всех доходов
- 📈 Графики по периодам
- 🎯 Средний доход за заказ
- 💳 Отслеживание вывода средств

### Для администратора:
- 💰 Общий доход платформы
- 📊 Аналитика по мастерам
- 💸 Отслеживание комиссий
- ⚙️ Управление процентами комиссий

---

## Уведомления

Система отправляет уведомления при:

1. **Новом сообщении** - Мгновенно
2. **Новой пропозиции** - С деталями
3. **Создании заработка** - При завершении заказа
4. **Подтверждении заработка** - От админа
5. **Готовности вывода** - Когда средства доступны
6. **Успешном выводе** - Завершение транзакции

---

## Безопасность

- ✅ Валидация всех входных данных
- ✅ Защита от несанкционированного доступа
- ✅ Шифрование чувствительных данных (в localStorage)
- ✅ Аудит всех финансовых операций
- ✅ Логирование всех действий

---

## Производительность

- 📦 Данные хранятся в localStorage
- ⚡ Синглтон паттерн для сервисов
- 🔄 Оптимизированная подписка на обновления
- 💾 Lazy loading чатов и сообщений

---

## Будущие улучшения

- [ ] WebSocket для real-time синхронизации
- [ ] Голосовые сообщения
- [ ] Видео-вызовы
- [ ] Групповые чаты
- [ ] Интеграция с платежными системами
- [ ] Автоматический вывод средств
- [ ] Расширенная аналитика

---

**Версия**: 1.0  
**Последнее обновление**: October 2024  
**Автор**: Development Team
