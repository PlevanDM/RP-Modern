# 🔌 RepairHUB Pro v2.0 - API Endpoints Documentation

## 📍 Base URL
```
Frontend: http://localhost:3000
Backend:  http://localhost:3001
```

---

## 🔐 Authentication

### POST `/api/auth/register`
Реєстрація нового користувача

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Іван Іванов",
  "city": "Київ",
  "role": "client" // client | master | admin
}
```

**Response:** `{ token, user }`

---

### POST `/api/auth/login`
Вхід в систему

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `{ token, user }`

---

## 📦 Orders API

### POST `/api/orders`
Створення нового замовлення (Client only)

**Auth:** Bearer token, requireRole('client')

**Body:**
```json
{
  "title": "Ремонт дисплея iPhone 14 Pro",
  "description": "Екран потрісканий після падіння",
  "device": "iPhone 14 Pro",
  "budget": 3500,
  "urgency": "medium"
}
```

**Валідація:**
- Client може мати максимум 10 активних замовлень
- Відповідь 403 якщо ліміт перевищено

**Response:** `Order`

---

### GET `/api/orders`
Отримати замовлення (RLS за роль)

**Auth:** Bearer token

**Row-Level Security:**
- **Client:** Тільки свої замовлення
- **Master:** Open замовлення + свої
- **Admin:** Всі замовлення

**Response:** `Order[]`

---

### GET `/api/orders/:id`
Отримати одне замовлення

**Auth:** authMiddleware, checkOrderOwnership

**Response:** `Order`

---

### PATCH `/api/orders/:id`
Редагувати замовлення (Client only)

**Auth:** authMiddleware, requireRole('client')

**Умови:**
- Тільки власник замовлення
- Тільки якщо `status === 'open'`

**Body:**
```json
{
  "title": "Нова назва",
  "description": "Новий опис",
  "budget": 4000
}
```

**Response:** `Order`

---

### POST `/api/orders/:id/cancel`
Скасувати замовлення

**Auth:** authMiddleware, requireRole('client' | 'admin')

**Логіка:**
- `status = 'open'` → Можна скасувати
- `status = 'accepted'` → Можна скасувати
- `status = 'in_progress'` → Тільки через спір
- Admin може скасувати будь-яке замовлення

**Response:** `{ message, order }`

---

## 💼 Offers API

### POST `/api/offers`
Створити пропозицію (Master only)

**Auth:** authMiddleware, requireRole('master')

**Body:**
```json
{
  "orderId": "order-123",
  "price": 3000,
  "description": "Заменю дисплей на оригінальний",
  "estimatedDays": 3
}
```

**Валідація:**
- Master може мати максимум 5 активних пропозицій
- Order status має бути 'open'
- Не можна надіслати повторну пропозицію на той самий order

**Response:** `Offer`

---

### GET `/api/offers?orderId=:id`
Отримати пропозиції для замовлення

**Auth:** authMiddleware

**Умови:**
- Тільки owner замовлення або admin

**Response:** `Offer[]`

---

### POST `/api/offers/:id/accept`
Прийняти пропозицію (Client only)

**Auth:** authMiddleware, requireRole('client')

**Транзакція:**
1. `offer.status` → 'accepted'
2. `order.status` → 'accepted'
3. `order.masterId` → offer.masterId
4. Всі інші пропозиції → 'rejected'

**Response:** `{ message, order }`

---

### DELETE `/api/offers/:id`
Відкликати пропозицію (Master only)

**Auth:** authMiddleware, requireRole('master')

**Умови:**
- Тільки власна пропозиція
- Тільки якщо status = 'pending'

**Response:** 204 No Content

---

## 💰 Payment API (Escrow)

### POST `/api/payments`
Створити payment (escrow) - Client only

**Auth:** authMiddleware, requireRole('client')

**Body:**
```json
{
  "orderId": "order-123",
  "amount": 3000
}
```

**Валідація:**
- order.status === 'accepted'
- order.clientId === user.id
- order.paymentStatus === 'pending'

**Транзакція:**
1. Створює `Payment` (status: 'escrowed')
2. `order.status` → 'in_progress'
3. `order.paymentStatus` → 'escrowed'

**Response:** `{ payment, order }`

---

### POST `/api/payments/:orderId/release`
Вивільнити кошти майстру - Client only

**Auth:** authMiddleware, requireRole('client')

**Валідація:**
- order.status === 'in_progress'
- order.clientId === user.id

**Транзакція:**
1. `payment.status` → 'released'
2. `order.status` → 'completed'
3. `master.balance += amount * 0.90`
4. Platform commission: `amount * 0.10`

**Response:** `{ payment, order, earnings }`

---

## ⚖️ Dispute API

### POST `/api/disputes`
Створити спір

**Auth:** authMiddleware, checkOrderOwnership

**Body:**
```json
{
  "orderId": "order-123",
  "reason": "Некачественная работа",
  "description": "Детали..."
}
```

**Валідація:**
- order.status === 'in_progress' OR 'completed'
- User має бути client OR master

**Транзакція:**
1. Зупиняє payment: `payment.status = 'frozen'`
2. `order.status` → 'disputed'
3. Створює Dispute запис

**Response:** `{ dispute, payment }`

---

### POST `/api/disputes/:id/resolve`
Вирішити спір (Admin only)

**Auth:** authMiddleware, requireRole('admin')

**Body:**
```json
{
  "decision": "client_wins", // client_wins | master_wins | compromise
  "explanation": "Текст рішення"
}
```

**Транзакція:**

**1. client_wins:**
- `payment.status` → 'refunded'
- `order.status` → 'cancelled'
- Повний refund клієнту

**2. master_wins:**
- `payment.status` → 'released'
- `order.status` → 'completed'
- `master.balance += amount * 0.90`
- Release коштів майстру

**3. compromise:**
- `payment.status` → 'frozen'
- Ручне розподілення адміном

**Response:** `{ dispute, order, payment }`

---

## ⭐ Review API

### POST `/api/reviews`
Створити відгук (Client only)

**Auth:** authMiddleware, requireRole('client')

**Body:**
```json
{
  "orderId": "order-123",
  "rating": 5,
  "text": "Відмінна робота!"
}
```

**Валідація:**
- order.status === 'completed'
- order.clientId === user.id
- Відгук ще не існує

**Дія:**
- Оновлює `master.rating` (середнє значення)

**Response:** `Review`

---

### PATCH `/api/reviews/:id`
Редагувати відгук (Client only)

**Auth:** authMiddleware, requireRole('client')

**Умови:**
- review.authorId === user.id
- Від створення < 24 годин

**Response:** `Review`

---

## 👨‍💼 Admin API

### GET `/api/admin/users`
Отримати всіх користувачів (Admin)

**Auth:** authMiddleware, requireRole('admin')

**Response:** `User[]`

---

### PATCH `/api/admin/users/:id`
Оновити користувача (Admin)

**Body:**
```json
{
  "role": "master",
  "balance": 5000,
  "verified": true,
  "blocked": false
}
```

**Response:** `User`

---

### POST `/api/admin/users/:id/ban`
Забанити користувача

**Response:** `{ message }`

---

### POST `/api/admin/users/:id/unban`
Розбанити користувача

**Response:** `{ message }`

---

### GET `/api/admin/orders`
Всі замовлення

**Response:** `Order[]`

---

### PATCH `/api/admin/orders/:id`
Форс оновлення замовлення

**Body:**
```json
{
  "status": "completed",
  "masterId": "master-123"
}
```

**Response:** `Order`

---

## 🔄 Master Workflow

### POST `/api/orders/:id/start`
Почати роботу (Master)

**Auth:** authMiddleware, requireRole('master')

**Умови:**
- order.masterId === user.id
- order.status === 'in_progress'

**Response:** `{ message }`

---

### POST `/api/orders/:id/finish`
Завершити роботу (Master)

**Auth:** authMiddleware, requireRole('master')

**Дія:**
- Встановлює `order.completedAt`
- Надсилає сповіщення клієнту

**Response:** `{ message }`

---

## 💵 Withdrawals

### POST `/api/withdrawals`
Вивести кошти (Master)

**Auth:** authMiddleware, requireRole('master')

**Body:**
```json
{
  "amount": 5000
}
```

**Валідація:**
- user.balance >= 500 (мін. сума)
- user.balance >= amount

**Response:** `{ message, newBalance }`

---

## 📊 Public API

### GET `/api/devices`
Отримати базу пристроїв

**Auth:** Not required

**Response:** `DeviceModel[]`

---

## 🕐 Cron Jobs

### Auto-Release (Щогодини)
- Шукає: `order.status = 'in_progress'` AND `completedAt < 7 days ago`
- Дія: Автоматично вивільняє payment майстру

### Auto-Dispute (Щогодини)
- Шукає: `dispute.status = 'open'` AND `createdAt > 24 hours ago`
- Дія: Автоматично вирішує на користь клієнта (client_wins)

---

## 🔒 Безпека

### Middleware:
1. **authMiddleware** - JWT валідація
2. **requireRole(['role'])** - Перевірка ролі
3. **checkOrderOwnership** - Перевірка власності

### Business Logic:
- Всі дії перевіряються через `server/businessLogic.ts`
- Row-Level Security на всіх GET endpoints
- Заборона прямого редагування критичних полів

---

## 📝 Status Codes

- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

---

**Версія:** 2.0  
**Дата:** 2025-01-28

