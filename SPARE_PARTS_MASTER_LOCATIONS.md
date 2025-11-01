# 🛠️ Spare Parts & Master Locations Module for RP-Modern

## OVERVIEW

RP-Modern расширяется на две ключевые области:
1. **E-Commerce для запчастей** (запчасти с доставкой Nova Post)
2. **Локационная работа майстров** (на дому, в мастерской, гибридная)

---

## 📊 СИСТЕМА РОЛЕЙ И МОДУЛЕЙ

### 1️⃣ НОВЫЕ РОЛИ И ТИПЫ ПОЛЬЗОВАТЕЛЕЙ

```
┌─────────────────────────────────────────────────────┐
│           СИСТЕМА РОЛЕЙ В RP-MODERN               │
├─────────────────────────────────────────────────────┤
│                                                     │
│ CLIENT (Клиент ремонта)                            │
│  ├─ Заказывает ремонт                             │
│  ├─ Покупает запчасти                             │
│  └─ Выбирает локацию обслуживания                │
│                                                     │
│ MASTER (Мастер)                                    │
│  ├─ master_solo (индивидуальные майстры)         │
│  ├─ master_workshop (работает в своей мастерской)│
│  └─ master_mobile (выезжает на дом)              │
│                                                     │
│ PARTS_VENDOR (Поставщик запчастей)               │
│  ├─ Загружает каталог запчастей                  │
│  ├─ Управляет инвентарем                         │
│  └─ Получает заказы на доставку                 │
│                                                     │
│ LOGISTICS (Логист)                                │
│  ├─ Управляет доставкой запчастей              │
│  ├─ Координирует Nova Post отправки             │
│  └─ Отслеживает посылки                         │
│                                                     │
│ ADMIN (Администратор платформы)                  │
│  ├─ Управляет всеми типами пользователей       │
│  ├─ Контролирует доставки                       │
│  └─ Генерирует отчеты                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🏪 MODULE 1: E-COMMERCE ДЛЯ ЗАПЧАСТЕЙ

### 1.1 СТРУКТУРА КАТАЛОГА ЗАПЧАСТЕЙ

```sql
CREATE TABLE spare_parts (
  id VARCHAR(36) PRIMARY KEY,
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(50) UNIQUE,
  vendorId VARCHAR(36) NOT NULL,
  
  -- Classification
  category VARCHAR(100),           -- Phone, Laptop, Tablet, etc
  partType VARCHAR(100),           -- Screen, Battery, Speaker, etc
  compatibility JSON,              -- Compatible devices
  
  -- Inventory
  stock INT DEFAULT 0,
  reservedStock INT DEFAULT 0,
  reorderLevel INT DEFAULT 10,
  
  -- Pricing
  costPrice DECIMAL(10,2),
  retailPrice DECIMAL(10,2),
  vendor_discount DECIMAL(5,2),    -- For wholesale
  
  -- Images & Details
  images JSON,                     -- Array of image URLs
  specifications JSON,             -- Technical specs
  
  -- Status
  status ENUM('active', 'inactive', 'discontinued'),
  isHazardous BOOLEAN DEFAULT FALSE,
  requiresSpecialShipping BOOLEAN DEFAULT FALSE,
  
  -- Logistics
  weight DECIMAL(8,3),             -- In kg
  dimensions VARCHAR(50),          -- L x W x H
  shippingCost DECIMAL(10,2),
  
  -- Tracking
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  vendorLastUpdate TIMESTAMP,
  
  FOREIGN KEY (vendorId) REFERENCES users(id)
);

CREATE TABLE spare_parts_vendors (
  id VARCHAR(36) PRIMARY KEY,
  vendorId VARCHAR(36) NOT NULL,
  
  company_name VARCHAR(255),
  company_registration VARCHAR(100),
  
  warehouse_address VARCHAR(255),
  warehouse_city VARCHAR(100),
  warehouse_country VARCHAR(100),
  
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  
  nova_post_account VARCHAR(100),  -- Nova Post sender ID
  shipping_rates JSON,
  
  business_license_url VARCHAR(255),
  tax_id VARCHAR(50),
  
  status ENUM('verified', 'pending', 'suspended'),
  verification_date TIMESTAMP,
  
  FOREIGN KEY (vendorId) REFERENCES users(id)
);

CREATE TABLE parts_orders (
  id VARCHAR(36) PRIMARY KEY,
  clientId VARCHAR(36) NOT NULL,
  
  order_items JSON,                -- Array of parts with quantities
  total_amount DECIMAL(10,2),
  
  shipping_address VARCHAR(255),
  shipping_city VARCHAR(100),
  shipping_method ENUM('nova_post', 'courier'),
  nova_post_department INT,
  
  payment_status ENUM('pending', 'paid', 'failed'),
  delivery_status ENUM('pending', 'processing', 'shipped', 'delivered'),
  
  order_number VARCHAR(50) UNIQUE,
  tracking_number VARCHAR(20),
  
  notes TEXT,
  
  createdAt TIMESTAMP,
  deliveredAt TIMESTAMP,
  
  FOREIGN KEY (clientId) REFERENCES users(id)
);
```

### 1.2 ПАРТНЕРЫ И ЭКОСИСТЕМА ЗАПЧАСТЕЙ

```
PARTS SUPPLIERS (Поставщики):
├─ International vendors (Aliexpress, DHgate, etc)
├─ Local distribuitors (Ukrainian suppliers)
├─ Original manufacturers (Apple, Samsung, etc)
└─ Individual vendors (мастера продают свои части)

INTEGRATION:
├─ Автоимпорт каталога из API поставщиков
├─ Синхронизация цен и наличия
├─ Автоматическая обновка инвентаря
└─ Интеграция с Nova Post для доставки
```

### 1.3 ПРОЦЕСС ЗАКАЗА ЗАПЧАСТЕЙ

```
CLIENT FLOW:
1. Клієнт ищет запчасть в каталоге
2. Видит цену, наличие, совместимость
3. Добавляет в корзину
4. Выбирает адрес доставки
5. Оплачивает через платформу
6. Получает трекинг номер Nova Post
7. Отслеживает доставку в реальном времени

PARTS_VENDOR FLOW:
1. Вендор загружает запчасти в каталог
2. Система рассчитывает стоимость доставки
3. При заказе -> вендор получает notification
4. Вендор упаковывает и передает Nova Post
5. Система отслеживает доставку
6. При получении -> платеж поступает вендору

MASTER FLOW:
1. Мастер заказывает запчасти для клиента
   или для своего инвентаря
2. Доставка на адрес мастерской или дома
3. Система ведет историю использованных запчастей
4. Помогает отслеживать себестоимость ремонта
```

---

## 📍 MODULE 2: ЛОКАЦИОННАЯ РАБОТА МАСТЕРОВ

### 2.1 ТИПЫ МАСТЕРОВ И ЛОКАЦИЙ

```sql
CREATE TABLE master_profiles (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL UNIQUE,
  
  -- Master Type
  master_type ENUM('solo', 'workshop', 'mobile', 'hybrid'),
  
  -- Professional Info
  experience_years INT,
  specializations JSON,        -- Array of specializations
  certifications JSON,         -- Array of certifications
  licenses JSON,               -- Array of licenses
  
  -- Rating & Stats
  completed_orders INT,
  avg_rating DECIMAL(3,2),
  total_revenue DECIMAL(10,2),
  
  -- Operating Hours
  operating_hours JSON,        -- {mon: {open: "09:00", close: "18:00"}, ...}
  days_off JSON,               -- {mon: false, tue: true, ...}
  
  -- Service Types
  can_repair_at_home BOOLEAN DEFAULT FALSE,
  can_repair_at_workshop BOOLEAN DEFAULT FALSE,
  can_do_online_consultation BOOLEAN DEFAULT FALSE,
  
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE master_workshops (
  id VARCHAR(36) PRIMARY KEY,
  masterId VARCHAR(36) NOT NULL,
  
  workshop_name VARCHAR(255),
  workshop_type ENUM('permanent', 'temporary', 'mobile'),
  
  address VARCHAR(255),
  city VARCHAR(100),
  coordinates JSON,            -- {lat, lng} for map
  
  -- Accessibility
  parking_available BOOLEAN,
  wheelchair_accessible BOOLEAN,
  public_transport_nearby BOOLEAN,
  
  -- Hours
  opening_hours JSON,
  
  -- Capacity
  workstations INT,
  can_accept_walk_in BOOLEAN,
  
  -- Certifications
  rent_contract_url VARCHAR(255),
  operating_license_url VARCHAR(255),
  
  photos JSON,                 -- Gallery of workshop
  
  verification_status ENUM('verified', 'pending', 'rejected'),
  
  FOREIGN KEY (masterId) REFERENCES master_profiles(id)
);

CREATE TABLE master_service_locations (
  id VARCHAR(36) PRIMARY KEY,
  masterId VARCHAR(36) NOT NULL,
  
  -- Location Type
  location_type ENUM('workshop', 'home', 'mobile_service'),
  
  -- Address
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  coordinates JSON,
  
  -- Service Details
  available_services JSON,     -- Types of repairs available here
  estimated_wait_time INT,     -- In minutes
  
  -- Availability
  available_from DATE,
  available_to DATE,
  
  -- Client Reviews Specific to Location
  location_rating DECIMAL(3,2),
  reviews_count INT,
  
  FOREIGN KEY (masterId) REFERENCES master_profiles(id)
);
```

### 2.2 ТИПИ СЕРВІСІВ ПО ЛОКАЦІЯХ

```
┌─────────────────────────────────────────────────────┐
│        ТИПИ РОБОТИ МАСТЕРА ПО ЛОКАЦІЯМ            │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 🏪 WORKSHOP (Мастерская)                           │
│  ├─ Фиксированное место работы                    │
│  ├─ Специализированное оборудование              │
│  ├─ Прием по записи и без записи                │
│  ├─ Профессиональная среда                       │
│  └─ Репутация привязана к месту                 │
│                                                     │
│ 🏠 HOME (На дому мастера)                          │
│  ├─ Личная мастерская                           │
│  ├─ Ограниченное оборудование                   │
│  ├─ Прием только по записи                      │
│  ├─ Клієнти приносят устройства                 │
│  └─ Низкие затраты, но ограниченный функционал │
│                                                     │
│ 🚗 MOBILE (Мобильный сервис - на дом клиента)    │
│  ├─ Мастер приезжает к клиенту                  │
│  ├─ Собственный транспорт                       │
│  ├─ Портативное оборудование                    │
│  ├─ Удобно для клиента                          │
│  └─ Услуга дороже (выезд + работа)              │
│                                                     │
│ 🔄 HYBRID (Гибридный вариант)                      │
│  ├─ Собственная мастерская                      │
│  ├─ Услуга выезда на дом                        │
│  ├─ Максимальная гибкость                       │
│  └─ Выше цены, но и выше доход                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 2.3 ПРОЦЕС БУКВАННЯ СЕРВІСУ ПО ЛОКАЦІЯМ

```
SCENARIO 1: WORKSHOP REPAIR
─────────────────────────────
CLIENT:
1. Находит мастера с мастерской
2. Видит адрес, часы работы, рейтинг
3. Выбирает время визита (по записи или без)
4. Приносит устройство в мастерскую
5. Оплачивает после диагностики/ремонта

MASTER:
1. Видит заказ на мастерскую
2. Ждет клиента в определенное время
3. Проводит диагностику
4. Выполняет ремонт
5. Получает платеж


SCENARIO 2: HOME REPAIR (На дому мастера)
──────────────────────────────────────────
CLIENT:
1. Находит мастера, работающего дома
2. Видит адрес, часы приема (по записи)
3. Записывается на время
4. Приносит устройство
5. Мастер чинит прямо у себя дома

MASTER:
1. Принимает заказы на дом
2. Ждет клиента
3. Выполняет ремонт в домашней мастерской
4. Экономит на аренде помещения


SCENARIO 3: MOBILE REPAIR (На дому клиента)
─────────────────────────────────────────────
CLIENT:
1. Находит мастера с мобильным сервисом
2. Видит услугу "Выезд на дом"
3. Указывает свой адрес
4. Мастер приезжает с инструментами
5. Ремонтирует на месте
6. Оплачивает за ремонт + выезд

MASTER:
1. Видит заказ с адресом клиента
2. Выезжает на указанный адрес
3. Диагностирует устройство
4. Выполняет ремонт на месте
5. Получает более высокую оплату за выезд


SCENARIO 4: HYBRID (Гибридный)
───────────────────────────────
MASTER:
- Имеет основную мастерскую
- Дополнительно предлагает выезд на дом
- Может работать и там, и там
- Максимальная гибкость и доход
```

---

## 💰 MODULE 3: МОДЕЛЬ ЦЕНООБРАЗОВАНИЯ

### 3.1 РАСЧЕТ СТОИМОСТИ РЕМОНТА

```
WORKSHOP REPAIR (Ремонт в мастерской):
├─ Диагностика: base_fee (обычно 100-300 грн)
├─ Работа: hourly_rate * hours
├─ Запчасти: parts_cost * (1 + markup%)
├─ ИТОГО: diagnostic + labor + parts_cost

HOME REPAIR (На дому мастера):
├─ Диагностика: base_fee * 0.8 (скидка)
├─ Работа: hourly_rate * hours
├─ Запчасти: parts_cost * (1 + markup%)
├─ ИТОГО: diagnostic + labor + parts_cost

MOBILE REPAIR (Выезд на дом клиента):
├─ Диагностика: base_fee * 1.2 (надбавка за выезд)
├─ Выезд: trip_fee (зависит от расстояния)
├─ Работа: hourly_rate * hours * 1.1 (надбавка за мобильность)
├─ Запчасти: parts_cost * (1 + markup%)
├─ ИТОГО: diagnostic + trip + labor + parts_cost

HYBRID:
├─ Выбор локации клиентом
└─ Расчет по выбранному типу
```

### 3.2 ДИНАМИЧЕСКОЕ ЦЕНООБРАЗОВАНИЕ

```
FACTORS AFFECTING PRICE:
├─ Location Type (мастерская ↑ цена)
├─ Time of Day (вечер/выходные +20%)
├─ Device Type (сложность +15-50%)
├─ Urgency Level (срочно +30%)
├─ Master Ratings (высокий рейтинг +10-20%)
├─ Demand Level (пиковые часы +15%)
└─ Parts Availability (редкие части дороже)
```

---

## 🗺️ MODULE 4: ЛОКАЦИОННЫЕ СЕРВИСЫ

### 4.1 МАППИНГ И ПОИСК

```sql
CREATE TABLE location_search_history (
  id VARCHAR(36) PRIMARY KEY,
  clientId VARCHAR(36),
  
  search_query VARCHAR(255),
  
  filters JSON,                -- {
                               --   device_type: "phone",
                               --   location_type: "workshop",
                               --   max_distance: 5,
                               --   rating_min: 4.5,
                               --   availability: "today",
                               --   price_range: {min: 100, max: 500}
                               -- }
  
  results_count INT,
  selected_master_id VARCHAR(36),
  
  search_timestamp TIMESTAMP,
  
  FOREIGN KEY (clientId) REFERENCES users(id)
);

CREATE TABLE location_distance_tracking (
  id VARCHAR(36) PRIMARY KEY,
  orderId VARCHAR(36),
  masterId VARCHAR(36),
  
  client_coordinates JSON,      -- {lat, lng}
  master_location JSON,         -- {address, lat, lng}
  
  estimated_distance_km DECIMAL(5,2),
  actual_distance_km DECIMAL(5,2),
  
  is_same_city BOOLEAN,
  is_same_district BOOLEAN,
  travel_time_minutes INT,
  
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (masterId) REFERENCES master_profiles(id)
);
```

### 4.2 GPS И РЕАЛ-ТАЙМ ТРЕКИНГ

```
FOR MOBILE REPAIRS:
├─ Клиент видит мастера на карте
├─ Мастер видит маршрут к клиенту
├─ Real-time обновления локации
├─ ETA (примерное время прибытия)
├─ Notification когда мастер рядом
└─ Возможность отмены по дороге

SAFETY FEATURES:
├─ Скрытие реального адреса до подтверждения
├─ Верификация обеих сторон
├─ Emergency contact для платформы
└─ Tracking history для безопасности
```

---

## 📊 MODULE 5: АНАЛИТИКА И ОТЧЕТЫ

### 5.1 DASHBOARD ДЛЯ МАСТЕРА

```
МАСТЕР ВИДИТ:
├─ Доход по локациям (мастерская vs выезд)
├─ Загруженность каждой локации
├─ Клієнтские отзывы по локациям
├─ Наиболее прибыльные сервисы
├─ Тренды спроса по типам устройств
├─ Средняя цена за сервис
└─ Рейтинг по каждой локации

ADMIN ВИДИТ:
├─ Распределение мастеров по локациям
├─ Популярные районы обслуживания
├─ Гепты покрытия (где нет мастеров)
├─ Статистика выездного сервиса
├─ Доля мобильных vs стационарных
└─ Качество обслуживания по районам
```

### 5.2 РЕКОМЕНДАТЕЛЬНАЯ СИСТЕМА

```
SYSTEM RECOMMENDS:
├─ Клієнту мастера (по рейтингу, расстоянию, времени)
├─ Мастеру открыть вторую локацию (если спрос)
├─ Мастеру расширить сервисы (аналитика спроса)
├─ Платформе открыть новые районы (gap analysis)
└─ Партнерам размещать запчасти на складах
```

---

## 🔄 ИНТЕГРАЦИЯ ВСЕХ МОДУЛЕЙ

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  ПОЛНЫЙ ЦИКЛ РЕМОНТА В RP-MODERN                   │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  CLIENT:                                            │
│  1. Создает заказ ремонта                          │
│  2. Выбирает тип локации (мастерская/на дом)       │
│  3. Система найдет мастера                         │
│  4. Мастер выполняет диагностику                   │
│  5. Требуется запчасть?                            │
│     → ДА: ПЕРЕХОД К ЕCOMMERCE MODULE              │
│  6. Клиент заказывает запчасть                     │
│  7. Запчасть доставляется Nova Post                │
│  8. Мастер устанавливает запчасть                  │
│  9. Оплата + рейтинг + отзыв                       │
│                                                      │
│  MASTER:                                            │
│  1. Принимает заказ на выбранной локации           │
│  2. Выполняет ремонт                               │
│  3. Заказывает запчасти (оптом)                    │
│  4. Следит за запасами                             │
│  5. Получает заказ на выезд → navigates на карте   │
│  6. Приезжает, чинит, получает платеж              │
│                                                      │
│  PARTS_VENDOR:                                      │
│  1. Загружает запчасти в каталог                   │
│  2. Получает заказы от клієнтов и мастеров        │
│  3. Упаковывает и отправляет через Nova Post       │
│  4. Получает платеж за продажу                     │
│                                                      │
│  PLATFORM:                                          │
│  1. Соединяет все участников                       │
│  2. Берет комиссию (5-10%)                         │
│  3. Управляет платежами                            │
│  4. Отслеживает качество                           │
│  5. Предоставляет аналитику                        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 💳 MODULE 6: ПЛАТЕЖИ И КОМИССИИ

```
REVENUE MODEL:

REPAIR ORDERS:
├─ Platform Commission: 5-10% от стоимости работы
├─ Payment Processing Fee: 2% (Stripe/PayPal)
└─ Net Revenue: 3-8% per order

SPARE PARTS SALES:
├─ Platform Commission: 10-15% per parts sale
├─ Payment Processing Fee: 2%
└─ Net Revenue: 8-13% per part sold

PREMIUM FEATURES:
├─ Verified Badge: 50грн/месяц
├─ Priority Listing: 100грн/месяц
├─ Analytics Dashboard: 200грн/месяц
└─ API Access: 500грн/месяц

TOTAL REVENUE STREAMS:
├─ Repair commissions
├─ Parts commissions
├─ Premium subscriptions
├─ Advertising (partners)
└─ B2B API access
```

---

## 🚀 IMPLEMENTATION ROADMAP

```
PHASE 1: FOUNDATION (Недели 1-4)
├─ Database schema для запчастей
├─ E-commerce базовый функционал
├─ Master profiles и workshop info
└─ Integration с Nova Post для запчастей

PHASE 2: LOCATIONS (Недели 5-8)
├─ Location management для мастеров
├─ GPS tracking для мобильного сервиса
├─ Pricing по типам локаций
└─ Mapping и поиск

PHASE 3: LOGISTICS (Недели 9-12)
├─ Integration с Nova Post API
├─ Shipping cost calculator
├─ Автоматический tracking
└─ Inventory management

PHASE 4: ANALYTICS (Недели 13-16)
├─ Dashboard для мастеров
├─ Reports для platform
├─ Recommendation engine
└─ Performance metrics

PHASE 5: OPTIMIZATION (Недели 17-20)
├─ Mobile app для мастеров
├─ Offline mode для запчастей
├─ Advanced search filters
└─ User experience improvements
```

---

## 📱 FRONTEND COMPONENTS

```
NEW COMPONENTS TO BUILD:

Spare Parts Module:
├─ PartsCatalog - каталог запчастей
├─ PartsCart - корзина запчастей
├─ PartsOrder - оформление заказа
├─ PartsTracking - отслеживание доставки
└─ PartsReview - отзывы на запчасти

Master Locations:
├─ WorkshopFinder - поиск мастерских
├─ MobileServiceMap - карта для выезда
├─ LocationSelector - выбор типа обслуживания
├─ MasterProfile - профиль с локациями
└─ BookingCalendar - бронирование

Vendor Admin:
├─ PartsInventory - управление инвентарем
├─ VendorDashboard - дашборд поставщика
├─ ShippingManager - управление доставками
└─ VendorAnalytics - аналитика продаж
```

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] Database migration для spare_parts таблиц
- [ ] Implement Parts E-commerce API
- [ ] Create Master Location Management
- [ ] Integrate Nova Post для запчастей
- [ ] Build GPS tracking система
- [ ] Implement Dynamic Pricing
- [ ] Create Vendor Portal
- [ ] Build Analytics Dashboard
- [ ] Mobile App для мастеров
- [ ] Testing и QA
- [ ] Beta launch с select partners
- [ ] Full production launch

---

**Status**: 📋 READY FOR FULL IMPLEMENTATION

This integrated system creates a **complete repair ecosystem** with:
- E-commerce for spare parts
- Location-based master services
- Integrated logistics with Nova Post
- Complete analytics and reporting
- Multiple revenue streams

🚀 **RP-Modern becomes a SUPER-PLATFORM for repair services!**

