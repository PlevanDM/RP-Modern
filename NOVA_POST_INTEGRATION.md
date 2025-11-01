# 📦 Nova Post Integration Plan for RP-Modern

## 1️⃣ СИСТЕМНИЙ АНАЛІЗ

### Nova Post функціонал:
- Створення відправлень (Electronic Waybill - ЕН)
- Відстеження статусів посилок
- Управління адресами та відділеннями
- Друк термоетикеток
- Виклик кур'єра
- Оплата послуг
- Міжнародні відправлення

### RP-Modern інтеграційні точки:
- Order Management System
- Payment Processing
- User Roles (Client, Master, Admin)
- Notification System
- Database

---

## 2️⃣ УЧАСНИКИ ТА ЇХ РОЛІ

### 👤 CLIENT (Замовник ремонту)
**Дії:**
- Створює замовлення для ремонту
- Вибирає спосіб доставки (Nova Post, курʼєр, самовивіз)
- Отримує посилку у відділенні
- Отримує сповіщення про статус

**Nova Post операції:**
- Отримання адреси відділення
- Відстеження посилки
- Друк етикетки для повернення

### 🔧 MASTER (Майстер)
**Дії:**
- Приймає замовлення на ремонт
- Готує пристрій до відправки
- Генерує код для Nova Post
- Здає посилку в Nova Post

**Nova Post операції:**
- Створення відправлення
- Друк термоетикетки
- Отримання трекінг-номера

### 🏢 ADMIN (Адміністратор платформи)
**Дії:**
- Налаштування Nova Post API ключа
- Контроль доставок
- Аналіз статистики доставок
- Обробка проблемних доставок

**Nova Post операції:**
- Масові операції з посилками
- Отримання звітів
- Управління договорами

---

## 3️⃣ ПРОЦЕСИ І ЛОГІКА ІНТЕГРАЦІЇ

### 📋 Process 1: Замовлення → Відправлення

```
CLIENT FLOW:
1. Клієнт створює замовлення
2. Вибирає "Доставка Nova Post"
3. Заповнює адресу (верифікація через Nova Post API)
4. Замовлення переходить до майстра

MASTER FLOW:
1. Майстер приймає замовлення
2. Виконує ремонт
3. На платформі натискає "Готово до відправки"
   → СИСТЕМА:
     - Автоматично створює посилку в Nova Post
     - Генерує трекінг-номер
     - Друкує термоетикетку
     - Відправляє notification з номером

4. Майстер здає посилку в Nova Post відділенні

CLIENT NOTIFICATION:
- "Ваш пристрій надісланий"
- Трекінг-номер для відстеження
- Посилання на трекінг у Nova Post
```

### 💰 Process 2: Оплата & Доставка

```
FLOW:
1. Клієнт оплачує через платформу
2. Платіж переводиться у статус "escrowed"
3. Сервіс готує посилку
4. При натисканні "Готово до відправки":
   - Створюється посилка в Nova Post
   - Платіж переводиться у статус "released"
   - Майстер отримує гроші
5. Клієнт отримує посилку
6. Процес завершується

СИСТЕМА КОНТРОЛЮЄ:
- Статус посилки в Nova Post
- Якщо посилка не доставлена за N днів → алерт
- Якщо втрачена → повернення грошей
```

### ⚠️ Process 3: Проблемні Доставки

```
SCENARIO 1: Неправильна адреса
→ Верифікація адреси перед створенням посилки
→ Якщо не валідна → блокування
→ Notification клієнту

SCENARIO 2: Посилка не доставлена
→ Відстеження статусу кожен день
→ Якщо 14+ днів без руху → автоматичне повернення грошей
→ Dispute створюється автоматично

SCENARIO 3: Посилка втрачена
→ Клієнт報告 про проблему
→ Admin перевіряє статус у Nova Post
→ Компенсація клієнту
→ Запит до Nova Post на розслідування
```

---

## 4️⃣ DATABASE SCHEMA

### Нова таблиця: `shipments`

```sql
CREATE TABLE shipments (
  id VARCHAR(36) PRIMARY KEY,
  orderId VARCHAR(36) NOT NULL,
  novaPostTrackingNumber VARCHAR(20) UNIQUE,
  novaPostRefNumber VARCHAR(20),
  
  -- Sender (Master)
  senderId VARCHAR(36) NOT NULL,
  senderCity VARCHAR(100),
  senderPhone VARCHAR(20),
  
  -- Recipient (Client)
  recipientId VARCHAR(36) NOT NULL,
  recipientCity VARCHAR(100),
  recipientPhone VARCHAR(20),
  recipientAddress VARCHAR(255),
  
  -- Nova Post Details
  novaPostDepartureId INT,
  novaPostDepartureName VARCHAR(100),
  novaPostDestinationId INT,
  novaPostDestinationName VARCHAR(100),
  
  -- Status
  status ENUM('pending', 'created', 'in_transit', 'arrived', 'delivered', 'returned', 'lost'),
  novaPostStatus VARCHAR(50),
  lastStatusUpdate TIMESTAMP,
  
  -- Tracking
  trackingUpdates JSON,
  
  -- Cost
  shippingCost DECIMAL(10,2),
  insurance DECIMAL(10,2),
  
  -- Dates
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sentAt TIMESTAMP,
  deliveredAt TIMESTAMP,
  
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (senderId) REFERENCES users(id),
  FOREIGN KEY (recipientId) REFERENCES users(id)
);
```

### Оновлення таблиці `orders`

```sql
ALTER TABLE orders ADD COLUMN (
  shippingMethod ENUM('nova_post', 'courier', 'pickup'),
  shipmentId VARCHAR(36),
  deliveryAddress VARCHAR(255),
  deliveryCity VARCHAR(100),
  novaPostDepartment INT,
  trackingNumber VARCHAR(20),
  FOREIGN KEY (shipmentId) REFERENCES shipments(id)
);
```

---

## 5️⃣ API ENDPOINTS ДЛЯ 積 Integration

### Backend endpoints (потрібно додати)

```typescript
// Nova Post Configuration
POST /api/admin/nova-post/configure
  - Налаштування API ключа
  - Role: admin, superadmin

// Shipment Creation
POST /api/orders/:orderId/create-shipment
  - Створення посилки
  - Role: master, admin
  - Params: departureId, destinationId

// Verify Address
POST /api/nova-post/verify-address
  - Верифікація адреси
  - Role: client
  - Body: { city, address, phone }

// Get Departments
GET /api/nova-post/departments/:city
  - Отримання списку відділень
  - Role: all
  - Params: city

// Track Shipment
GET /api/shipments/:shipmentId/track
  - Отримання статусу посилки
  - Role: client, master, admin

// Print Label
GET /api/shipments/:shipmentId/label
  - Генерування термоетикетки (PDF)
  - Role: master, admin

// Shipment History
GET /api/orders/:orderId/shipments
  - Історія доставок замовлення
  - Role: client, master, admin

// Create Return Shipment
POST /api/shipments/:shipmentId/return
  - Створення посилки повернення
  - Role: client, admin

// List All Shipments (Admin)
GET /api/admin/shipments
  - Усі посилки в системі
  - Role: admin, superadmin
```

---

## 6️⃣ IMPLEMENTATION STACK

### Backend (Node.js)
```typescript
// nova-post-service.ts
import axios from 'axios';

class NovaPostService {
  private apiUrl = 'https://api.novaposhta.ua/v3.0/';
  private apiKey: string;
  
  async createShipment(params: CreateShipmentParams)
  async verifyAddress(city: string, address: string)
  async getDepartments(city: string)
  async trackShipment(trackingNumber: string)
  async getPrintLabel(refNumber: string)
  async createReturnShipment(shipmentId: string)
}

// Database queries
async function createShipmentRecord(shipment: Shipment)
async function updateShipmentStatus(shipmentId: string, status: string)
async function getShipmentHistory(orderId: string)
```

### Frontend (React)
```typescript
// Components
- ShippingMethodSelector (вибір доставки)
- AddressVerifier (верифікація адреси)
- DepartmentSelector (вибір відділення)
- TrackingViewer (відстеження)
- ShipmentLabel (печать етикетки)

// Stores (Zustand)
shipmentStore.ts - стан всіх доставок

// Services
novaPostService.ts - API клієнт
```

---

## 7️⃣ INTEGRATION DIAGRAM

```
┌─────────────┐
│   CLIENT    │
└──────┬──────┘
       │ Створює замовлення
       │ Вибирає доставку
       │ Верифікує адресу
       ▼
┌──────────────────────────┐
│   RP-MODERN PLATFORM     │
│  ┌────────────────────┐  │
│  │  Order Management  │  │
│  └────────────────────┘  │
└──────────┬───────────────┘
           │
           │ Майстер готує ремонт
           │ Натискає "Готово"
           ▼
┌──────────────────────────┐
│  NOVA POST SERVICE       │
│  ┌────────────────────┐  │
│  │ Create Shipment    │  │
│  │ Get Tracking       │  │
│  │ Print Label        │  │
│  └────────────────────┘  │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│   NOVA POST API          │
│   (External Service)     │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│   DELIVERY              │
│   Client receives       │
└──────────────────────────┘
```

---

## 8️⃣ NOTIFICATION SYSTEM

### Сповіщення для Клієнта:
```
1. "Посилка надіслана" (при створенні в Nova Post)
2. "Посилка прибула до відділення" (при зміні статусу)
3. "Готово до отримання" (при прибутті)
4. "Посилка видана" (при отриманні)
5. "Проблема з доставкою" (алерт)
```

### Сповіщення для Майстра:
```
1. "Замовлення готово до відправки" (от клієнта)
2. "Посилка успішно створена" (от системи)
3. "Посилка доставлена" (від системи)
4. "Платіж отримано" (при доставці)
```

### Сповіщення для Адміна:
```
1. "Проблемна доставка" (алерт)
2. "Посилка втрачена" (алерт)
3. "Щоденний звіт доставок"
```

---

## 9️⃣ ERROR HANDLING

```typescript
// Типові помилки
1. ADDRESS_NOT_FOUND - Адреса не знайдена
   → Запропонувати вибрати з списку
   
2. INVALID_PHONE - Невірний номер телефону
   → Запитати правильний номер
   
3. CITY_NOT_SUPPORTED - Місто не обслуговується
   → Запропонувати альтернативу
   
4. API_KEY_INVALID - Невірний API ключ
   → Алерт админу, блокування доставки
   
5. SHIPMENT_LOST - Посилка втрачена
   → Автоматичне повернення грошей
   → Dispute створюється
```

---

## 🔟 DEPLOYMENT CHECKLIST

- [ ] Отримати Nova Post API ключ
- [ ] Налаштувати у .env файлі
- [ ] Додати Shipments таблицю в БД
- [ ] Реалізувати backend endpoints
- [ ] Реалізувати frontend компоненти
- [ ] Налаштувати автоматичне відстеження
- [ ] Тестування на sandbox
- [ ] Production migration
- [ ] Моніторинг помилок доставки

---

## 📞 NOVA POST КОНТАКТИ

- **API Документація**: https://api-portal.novapost.com/uk/
- **Email**: api.consult@novapost.com
- **Роботи**: Пн-Нд: 08:00 — 20:00

---

**Integration Status**: 📋 READY FOR IMPLEMENTATION

