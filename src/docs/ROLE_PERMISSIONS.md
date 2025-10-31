# Система прав доступа для ролей

## Обзор

Система контролирует доступ к действиям в зависимости от роли пользователя и статуса заказа.

## Роли

### Client (Клиент)
Клиент может:
- Создавать заказы
- Просматривать свои заказы
- Принимать/отклонять предложения
- Отменять заказы (до начала работы)
- Открывать споры
- Оплачивать заказы
- Редактировать свои заказы (только статус "open")
- Удалять свои заказы (только статус "open")

### Master (Мастер)
Мастер может:
- Просматривать открытые заказы
- Создавать предложения для открытых заказов
- Завершать назначенные ему заказы
- Отменять назначенные заказы
- Открывать споры по своим заказам
- Обновлять свои предложения (пока они в статусе "pending")
- Просматривать детали заказов

### Admin (Администратор)
Администратор может:
- Все действия для управления системой
- Рассматривать споры
- Модерировать пользователей и заказы

## Статусы заказов

### Workflow

```
open → proposed → accepted → in_progress → completed
  ↓         ↓         ↓          ↓
deleted   cancelled
         ↓
      dispute
```

### Переходы статусов

| Текущий статус | Следующие статусы | Кто может менять |
|----------------|-------------------|------------------|
| open | proposed, cancelled, deleted | Client, Master |
| proposed | accepted, cancelled, deleted | Client |
| accepted | in_progress, cancelled, dispute | Client, Master |
| in_progress | completed, cancelled, dispute | Master |
| completed | - | - |
| cancelled | - | - |
| deleted | open | Client |
| dispute | cancelled, in_progress, completed | Admin |

## Проверка прав доступа

### Для создания предложений (Master):
```typescript
- Текущий пользователь должен быть мастером
- Заказ должен существовать
- Статус заказа: 'open', 'searching', 'active_search'
- Мастер не должен иметь активное предложение для этого заказа
```

### Для принятия предложений (Client):
```typescript
- Текущий пользователь должен быть клиентом
- Предложение должно существовать
- Статус предложения должен быть 'pending'
- Клиент должен владеть заказом
- При принятии все остальные предложения автоматически отклоняются
```

### Для завершения заказа (Master):
```typescript
- Текущий пользователь должен быть мастером
- Мастер должен быть назначен на заказ (assignedMasterId)
- Статус заказа должен быть 'in_progress'
```

### Для отмены заказа:
```typescript
Client:
- Заказ должен принадлежать клиенту
- Статус: 'open', 'proposed', 'accepted'

Master:
- Мастер должен быть назначен на заказ
- Статус: 'accepted', 'in_progress'
```

### Для открытия спора:
```typescript
- Любой участник заказа (клиент или мастер)
- Статус заказа: 'accepted', 'in_progress'
```

## Файлы с логикой прав

- `src/store/ordersStore.ts` - основная логика в store
- `src/utils/permissions.ts` - вспомогательные функции проверки прав
- `src/components/OrderActions.tsx` - компонент действий на основе прав
- `src/utils/roleNotifications.ts` - система уведомлений по ролям

## Примеры использования

### Проверка прав в компоненте:

```typescript
import { checkOrderPermission, getAvailableActions } from '../utils/permissions';

const canCreateProposal = checkOrderPermission(currentUser, order, 'createProposal');
const availableActions = getAvailableActions(currentUser, order);
```

### Использование OrderActions компонента:

```tsx
<OrderActions
  order={order}
  currentUser={currentUser}
  onAcceptProposal={handleAccept}
  onComplete={handleComplete}
  onCancel={handleCancel}
  onDispute={handleDispute}
  onCreateProposal={handleCreateProposal}
/>
```

## Безопасность

Все проверки прав выполняются на стороне клиента И на стороне store. 
Для продакшна необходимо добавить проверки на backend.

## Уведомления

Система автоматически генерирует уведомления для всех участников при изменении статуса заказа:

- Создание заказа → уведомление всем мастерам
- Получение предложения → уведомление клиенту
- Принятие предложения → уведомление мастеру
- Завершение заказа → уведомление клиенту и мастеру
- Спор → уведомление клиенту, мастеру и админу
