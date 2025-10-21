# 🔧 RepairHub Pro - Платформа для ремонту пристроїв Apple

**Українська** | [English](#english)

Повнофункціональна платформа для управління ремонтом пристроїв Apple, яка з'єднує клієнтів, майстрів та сервісів у єдиній екосистемі.

---

## 📋 Умісти

1. [Про проект](#про-проект)
2. [Бізнес-логіка](#бізнес-логіка)
3. [Особливості](#особливості)
4. [Технологічний стек](#технологічний-стек)
5. [Встановлення](#встановлення)
6. [Запуск](#запуск)
7. [Структура проекту](#структура-проекту)
8. [Тестові користувачі](#тестові-користувачі)

---

## 📱 Про проект

**RepairHub Pro** - це модерна веб-платформа, яка дозволяє:

- **Клієнтам** розміщувати замовлення на ремонт пристроїв та спілкуватися з майстрами
- **Майстрам** приймати замовлення, розміщувати пропозиції та керувати своїм портфоліо
- **Сервісам** управляти замовленнями та залучати майстрів як партнерів

---

## 🎯 Бізнес-логіка

### 👤 Клієнт

**Меню:**
- 📊 Дашборд - статистика, останні замовлення
- 📦 Мої замовлення - список всіх замовлень
- 💳 **Платежі (Escrow)** - управління платежами з гарантією
- 💬 Повідомлення - чат з майстрами
- 👨 Профіль - дані користувача

**Функції:**
- Розміщувати замовлення на ремонт
- Переглядати пропозиції від майстрів
- Приймати/відхиляти пропозиції
- **✅ Платити через Escrow (гроші блокуються до підтвердження)**
- **⚖️ Відкривати спори якщо виникли проблеми**
- Спілкуватися з майстром в чаті
- Бачити фото прогресу ремонту

### 🔧 Майстер

**Меню:**
- 📊 Дашборд - статистика
- 🎯 Доска замовлень - нові замовлення
- ⭐ Рейтинги & рецензії
- 📦 Мої запчастини - управління каталогом
- 💬 Повідомлення - чат з клієнтами
- 💼 Портфоліо - вибір робіт
- 💳 **Платежі (Escrow)** - управління виплатами
- 👨 Профіль - дані користувача

**Функції:**
- Переглядати замовлення клієнтів
- Подавати пропозиції з ціною
- **✅ Отримувати платежі через Escrow**
- **⚖️ Захист від спорів через гарантію платформи**
- Спілкуватися з клієнтами
- Завантажувати фото виконаної роботи
- Отримувати оцінки та рецензії

---

## 🔒 Escrow система платежів

**Як на криптобіржах!** Гроші не йдуть безпосередньо мастеру, а депонуються на безпечному рахунку до завершення роботи та підтвердження обох сторін.

### Процес платежу:
1. **AWAITING_CLIENT** - Клієнт платить → гроші переводяться в escrow
2. **AWAITING_MASTER** - Мастер виконує роботу
3. **CONFIRMED_BY_MASTER** - Мастер підтверджує завершення
4. **RELEASED_TO_MASTER** ✅ - Клієнт підтверджує якість → платіж виплачується

### Особливості:
- ✅ **5% комісія платформи** - справедлива ціна
- ✅ **Розв'язання спорів** - 24-48 годин на розгляд
- ✅ **Автоматичний повернення** - через 30 днів якщо не підтвердили
- ✅ **Миттєва виплата** - як обидві сторони дали "ОК"

Детальна документація: [ESCROW_SYSTEM.md](./ESCROW_SYSTEM.md)

---

## 🎯 Бізнес-Модель Платформи

**RepairHub Pro** - це мультиролева платформа для оптимізації ремонтів Apple техніки:

### 👤 ДЛЯ КЛІЄНТІВ
- Знайти перевірених мастерів по рейтингу і місцеположенню
- Розташувати замовлення на ремонт Apple техніки
- Отримати пропозиції від кількох мастерів
- Порівняти ціни прямо в додатку
- Спілкуватися в режимі реального часу

### 🔧 ДЛЯ МАЙСТРІВ
- Переглядати всі замовлення на дошці оголошень
- Відправляти свої пропозиції клієнтам
- Управління своїм складом запчастин
- Купити потрібні запчастини у інших майстрів
- Показувати портфоліо своєї роботи

### 💼 ДЛЯ СЕРВІСІВ/ЦЕНТРІВ
- Видити запчастини у всіх майстрів
- Порівнювати ціни роботи і матеріалів
- Виставляти пропозиції майстрам
- Оптимізувати закупівлі
- Отримувати звіти аналітики

---

## 🔄 Основні Процеси

**Процес 1: Клієнт розташовує замовлення**
- Вибирає пристрій (iPhone/iPad/Mac/Apple Watch)
- Описує проблему з готового списку
- Встановлює термін і бюджет
- Майстри отримують сповіщення

**Процес 2: Майстер відправляє пропозицію**
- Переглядає доску замовлень
- Встановлює ціну
- Пише опис роботи
- Клієнт порівнює пропозиції

**Процес 3: Сервіс купує запчастини**
- Переглядає склади всіх майстрів
- Порівнює ціни
- Купує найкраще пропозиція
- Отримує у майстра

**Процес 4: Сервіс аналізує ціни**
- Видить ціни всіх майстрів
- Фільтрує по послузі
- Знаходить найбільш вигідні умови
- Переговорює умови

---

## ✨ Особливості

✅ **Повна локалізація на українській мові**
✅ **Три типи користувачів (Client, Master, Service)**
✅ **Система замовлень та пропозицій**
✅ **Чат між користувачами**
✅ **Управління портфоліо та запчастинами**
✅ **Адаптивний дизайн**
✅ **Сучасний UI з Tailwind CSS**
✅ **TypeScript для надійності**

---

## 🛠️ Технологічний стек

- **Frontend:** React 18 + TypeScript + Vite
- **Стилізація:** Tailwind CSS + PostCSS
- **Бібліотеки:**
  - Lucide React (іконки)
  - React Hook Form (форми)
  - Zod (валідація)
  - Zustand (state management)

---

## 📦 Встановлення

### Вимоги
- Node.js 16+ або вище
- npm або yarn

### Кроки

```bash
# 1. Клонувати або завантажити проект
cd REPAIR-MASTER-PROD

# 2. Встановити залежності
npm install

# 3. Готово!
```

---

## 🚀 Запуск

### Розроблення
```bash
npm run dev
```
Проект буде доступний на `http://localhost:3004`

### Виробництво
```bash
npm run build
npm run preview
```

---

## 📂 Структура проекту

```
REPAIR-MASTER-PROD/
├── src/
│   ├── components/          # React компоненти
│   │   ├── Navigation.tsx    # Навігація з профілем
│   │   ├── Dashboard.tsx     # Дашборд
│   │   ├── Orders.tsx        # Замовлення з модальним вікном
│   │   ├── Messages.tsx      # Чат
│   │   ├── Proposals.tsx     # Пропозиції
│   │   ├── PaymentMethods.tsx # Способи оплати
│   │   ├── MasterInventory.tsx # Запчастини
│   │   ├── Portfolio.tsx     # Портфоліо
│   │   ├── Profile.tsx       # Профіль з редагуванням
│   │   └── LoginPage.tsx     # Вхід
│   ├── hooks/               # Custom React hooks
│   │   └── useTranslation.ts # Мультимовна підтримка
│   ├── types/               # TypeScript типи
│   │   └── index.ts         # Визначення типів
│   ├── utils/               # Утиліти
│   │   └── mockData.ts      # Mock дані для тестування
│   ├── App.tsx              # Головний компонент
│   ├── main.tsx             # Точка входу
│   └── index.css            # Глобальні стилі
├── public/                  # Статичні файли
├── package.json             # Залежності проекту
├── tsconfig.json            # TypeScript конфіг
├── vite.config.ts           # Vite конфіг
├── tailwind.config.js       # Tailwind конфіг
└── README.md                # Цей файл
```

---

## 🧪 Тестові користувачі

Використовуйте ці облікові записи для тестування:

### 1️⃣ Client
- **Ім'я:** John Client
- **Роль:** 👤 Клієнт
- **Функції:** Розміщувати замовлення, спілкуватися з майстрами

### 2️⃣ Master
- **Ім'я:** Alex Master
- **Роль:** 🔧 Майстер
- **Функції:** Розміщувати пропозиції, керувати портфоліо

### 3️⃣ Service Admin
- **Ім'я:** Service Admin
- **Роль:** ⚙️ Сервіс
- **Функції:** Управління майстрами та замовленнями

---

## 🔄 Цикл замовлення

```
1. КЛІЄНТ розміщує замовлення
          ↓
2. МАЙСТЕР переглядає замовлення
          ↓
3. МАЙСТЕР розміщує пропозицію з ціною
          ↓
4. КЛІЄНТ приймає/відхиляє пропозицію
          ↓
5. МАЙСТЕР починає роботу
          ↓
6. МАЙСТЕР розміщує фото прогресу
          ↓
7. КЛІЄНТ та МАЙСТЕР спілкуються в чаті
          ↓
8. РОБОТА ЗАВЕРШЕНА ✅
```

---

## 🌐 Структура ролей

| Функція | Client | Master | Service |
|---------|--------|--------|---------|
| Розміщувати замовлення | ✅ | ❌ | ❌ |
| Переглядати замовлення | ✅ | ✅ | ✅ |
| Розміщувати пропозиції | ❌ | ✅ | ❌ |
| Керувати портфоліо | ❌ | ✅ | ❌ |
| Керувати запчастинами | ❌ | ✅ | ❌ |
| Спілкуватися в чаті | ✅ | ✅ | ❌ |
| Керувати сервісом | ❌ | ❌ | ✅ |

---

## 📱 Функціональність

### Замовлення
- ✅ Розміщувати нові замовлення
- ✅ Переглядати пропозиції
- ✅ Приймати/відхиляти пропозиції
- ✅ Модальне вікно з деталями замовлення
- ✅ Role-based дії

### Пропозиції
- ✅ Переглядати відкриті замовлення
- ✅ Розміщувати пропозиції з ціною та терміном
- ✅ Управління пропозиціями

### Чат
- ✅ Відправлення повідомлень
- ✅ Прочитання хронології
- ✅ Автоматичне прокручування

### Профіль
- ✅ Просмотр даних користувача
- ✅ Редагування інформації
- ✅ Статистика по ролям

### Платежі
- ✅ Список способів оплати
- ✅ Додавання/видалення карт
- ✅ Встановлення основного способу

---

## 🎨 UI Особливості

- 🎯 Аватар профіля з іконкою ролі в навігації
- 📱 Адаптивний дизайн
- 🌙 Темні тона для комфорту
- ⚡ Швидке завантаження
- 🧬 Чистий код та структура

---

## 📝 Липня запис статусів замовлення

- `open` - Замовлення розміщено, очікує пропозицій
- `proposed` - Є пропозиції від майстрів
- `accepted` - Пропозиція прийнята
- `in_progress` - Робота в процесі
- `completed` - Робота завершена ✅
- `cancelled` - Замовлення скасовано ❌

---

## 🚀 Виконані задачі

- ✅ Трирівнева система користувачів
- ✅ Система замовлень та пропозицій
- ✅ Чат між користувачами
- ✅ Управління портфоліо та запчастинами
- ✅ Модальні вікна з деталями
- ✅ Role-based UI та функціональність
- ✅ Вся локалізація на українській
- ✅ Адаптивний мобільний дизайн

---

## 📞 Контакти та підтримка

Це навчальний проект для демонстрації бізнес-логіки та фронтенд розроблення.

---

## 📄 Ліцензія

MIT License

---

## English

# 🔧 RepairHub Pro - Apple Device Repair Platform

A fully functional web platform connecting clients, masters, and services for managing Apple device repairs.

[Full English documentation available on request]

---

**Made with ❤️ for Apple device repair community**

## 🎨 2026 MODERN IMPROVEMENTS

### ✨ Dashboard - Modernized Analytics
- ✅ **Enhanced Metrics**: Completion rate, success percentage, detailed statistics
- ✅ **Improved UI**: Modern card design with hover effects and transitions
- ✅ **Better Organization**: 3-column widget layout with quick stats
- ✅ **Performance**: useMemo for efficient calculations

### 💬 Messages - Professional Chat Interface
- ✅ **Sidebar Navigation**: User list with role indicators (Master/Client)
- ✅ **Search Functionality**: Filter messages in real-time
- ✅ **Modern Design**: Rounded corners, smooth transitions, better spacing
- ✅ **User Selection**: Click to view conversations with specific users
- ✅ **Improved UX**: Better chat bubble styling, time display

### 📋 Orders - Advanced Filtering & Sorting
- ✅ **Status Filter**: Filter orders by status (Open, Proposed, In Progress, Completed)
- ✅ **Smart Sorting**: Sort by date (newest) or price (highest)
- ✅ **Result Counter**: See how many orders match your filters
- ✅ **Enhanced Cards**: Better spacing, improved information hierarchy
- ✅ **Modern Layout**: Rounded corners, subtle shadows, hover effects

### 👤 Profile - Professional Design
- ✅ **Improved Typography**: Better font hierarchy and spacing
- ✅ **Enhanced Input Fields**: Larger padding, better focus states
- ✅ **Contact Cards**: Organized contact info with hover effects and icons
- ✅ **Stats Display**: Larger, more prominent statistics cards
- ✅ **Better Editing UX**: Clear form layout with improved styling
- ✅ **Role-Specific Content**: Master specialization highlighted in blue

## 🚀 Key Features 2026

### Modern UI/UX
- 🎨 **Rounded Corners**: All components use `rounded-xl` for modern look
- ✨ **Smooth Transitions**: Hover effects and color transitions
- 📊 **Better Typography**: Improved font weights and sizes
- 🎯 **Clean Spacing**: Consistent padding and margins throughout

### Functional Improvements
- 🔍 **Advanced Filtering**: Filter and search across multiple fields
- 📈 **Better Data Visualization**: Cleaner stat cards and metrics
- ⌨️ **Responsive Design**: Mobile-first, works on all screen sizes
- 💪 **Type Safety**: Full TypeScript support with interfaces

### Performance
- ⚡ **useMemo**: Memoized expensive calculations
- 🚀 **Efficient Rendering**: Only re-renders when needed
- 📦 **Clean Code**: Well-organized, maintainable structure

## 📝 Components Updated
1. **Dashboard.tsx** - Analytics hub with metrics
2. **Messages.tsx** - Chat system with user selection
3. **Orders.tsx** - Order management with filters
4. **Profile.tsx** - User profile with better styling