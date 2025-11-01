# 🎨 RP-MODERN DESIGN SYSTEM

Єдина дизайн-система для всього проекту. **ЗАВЖДИ** використовуйте ці кольори та стилі!

---

## 📋 ЗМІСТ

1. [Кольорова палітра](#кольорова-палітра)
2. [Градієнти](#градієнти)
3. [Статистичні картки](#статистичні-картки)
4. [Статуси](#статуси)
5. [Функціональні розділи](#функціональні-розділи)
6. [Типографіка](#типографіка)
7. [Компоненти](#компоненти)
8. [Анімації](#анімації)

---

## 🎨 КОЛЬОРОВА ПАЛІТРА

### Основні кольори

```typescript
import { PRIMARY_GRADIENT } from '@/theme/colors';

// Головний градієнт (Blue → Purple)
PRIMARY_GRADIENT.bg           // 'from-blue-600 to-purple-600'
PRIMARY_GRADIENT.bgLight      // 'from-blue-50 via-white to-purple-50'
PRIMARY_GRADIENT.button       // 'from-blue-500 to-purple-500'
PRIMARY_GRADIENT.text         // 'from-blue-600 to-purple-600'
```

### Використання:

```tsx
// ❌ НЕ РОБІТЬ ТАК:
<div className="bg-gradient-to-r from-red-500 to-pink-500">

// ✅ РОБІТЬ ТАК:
import { PRIMARY_GRADIENT } from '@/theme/colors';
<div className={`bg-gradient-to-r ${PRIMARY_GRADIENT.bg}`}>
```

---

## 🌈 ГРАДІЄНТИ

### Статистичні картки (6 кольорів)

```typescript
import { STAT_COLORS } from '@/theme/colors';

// 1. Дохід (Green → Emerald)
STAT_COLORS.revenue.gradient   // 'from-green-500 to-emerald-600'
STAT_COLORS.revenue.bg          // 'from-green-50 to-emerald-50'
STAT_COLORS.revenue.text        // 'text-green-600'

// 2. Замовлення (Blue → Cyan)
STAT_COLORS.orders.gradient     // 'from-blue-500 to-cyan-600'

// 3. Завершено (Purple → Pink)
STAT_COLORS.completed.gradient  // 'from-purple-500 to-pink-600'

// 4. Рейтинг (Yellow → Orange)
STAT_COLORS.rating.gradient     // 'from-yellow-500 to-orange-600'

// 5. Час (Indigo → Purple)
STAT_COLORS.time.gradient       // 'from-indigo-500 to-purple-600'

// 6. Клієнти (Pink → Rose)
STAT_COLORS.users.gradient      // 'from-pink-500 to-rose-600'
```

### Приклад використання:

```tsx
import { STAT_COLORS, getStatColor } from '@/theme/colors';

const statsCards = [
  {
    title: 'Загальний дохід',
    value: '₴125,000',
    icon: <DollarSign />,
    color: STAT_COLORS.revenue.gradient  // ✅
  },
  {
    title: 'Активні замовлення',
    value: 24,
    icon: <Package />,
    color: STAT_COLORS.orders.gradient   // ✅
  }
];

// Або автоматично за індексом:
const color = getStatColor(index);
```

---

## 🚦 СТАТУСИ

### 5 типів статусів

```typescript
import { STATUS_COLORS } from '@/theme/colors';

// 1. Успіх (Green)
STATUS_COLORS.success.badge     // 'bg-green-100 text-green-700'
STATUS_COLORS.success.bg        // 'bg-green-50'
STATUS_COLORS.success.border    // 'border-green-200'

// 2. Помилка (Red)
STATUS_COLORS.error.badge       // 'bg-red-100 text-red-700'

// 3. Попередження (Yellow)
STATUS_COLORS.warning.badge     // 'bg-yellow-100 text-yellow-700'

// 4. Інформація (Blue)
STATUS_COLORS.info.badge        // 'bg-blue-100 text-blue-700'

// 5. Неактивний (Gray)
STATUS_COLORS.inactive.badge    // 'bg-gray-100 text-gray-700'
```

### Приклад:

```tsx
import { STATUS_COLORS, getStatusColor } from '@/theme/colors';

<Badge className={STATUS_COLORS.success.badge}>
  Активне
</Badge>

// Або динамічно:
const statusColor = getStatusColor(order.status === 'active' ? 'success' : 'inactive');
<Badge className={statusColor.badge}>
  {order.status}
</Badge>
```

---

## 🎯 ФУНКЦІОНАЛЬНІ РОЗДІЛИ

Кожен розділ має свою унікальну кольорову схему:

```typescript
import { FEATURE_COLORS } from '@/theme/colors';

// 1. Маркетплейс (Blue → Purple)
FEATURE_COLORS.marketplace.gradient  // 'from-blue-500 to-purple-500'
FEATURE_COLORS.marketplace.bg        // 'from-blue-50 via-white to-purple-50'

// 2. Обмін (Orange → Yellow)
FEATURE_COLORS.exchange.gradient     // 'from-orange-500 to-yellow-500'
FEATURE_COLORS.exchange.bg           // 'from-orange-50 via-white to-yellow-50'

// 3. Повідомлення (Cyan → Blue)
FEATURE_COLORS.messages.gradient     // 'from-cyan-500 to-blue-500'

// 4. Платежі (Green → Emerald)
FEATURE_COLORS.payments.gradient     // 'from-green-500 to-emerald-500'

// 5. Портфоліо (Purple → Pink)
FEATURE_COLORS.portfolio.gradient    // 'from-purple-500 to-pink-500'

// 6. Звіти (Indigo → Purple)
FEATURE_COLORS.reports.gradient      // 'from-indigo-500 to-purple-500'
```

### Використання для сторінок:

```tsx
import { FEATURE_COLORS } from '@/theme/colors';

export function MarketplacePage() {
  const colors = FEATURE_COLORS.marketplace;
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} p-6`}>
      <h1 className={`text-4xl font-bold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent`}>
        Маркетплейс
      </h1>
      <div className={`p-3 bg-gradient-to-br ${colors.icon} rounded-2xl`}>
        <Store className="w-8 h-8 text-white" />
      </div>
    </div>
  );
}
```

---

## 📝 ТИПОГРАФІКА

### Заголовки

```tsx
// H1 - Головний заголовок сторінки
<h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  Заголовок
</h1>

// H2 - Підзаголовок
<h2 className="text-2xl font-bold text-gray-900">
  Підзаголовок
</h2>

// H3 - Заголовок картки
<h3 className="text-lg font-semibold text-gray-900">
  Заголовок картки
</h3>
```

### Текст

```tsx
// Основний текст
<p className="text-base text-gray-900">Основний текст</p>

// Вторинний текст
<p className="text-sm text-gray-600">Вторинний текст</p>

// Приглушений текст
<p className="text-xs text-gray-500">Приглушений текст</p>
```

---

## 🧩 КОМПОНЕНТИ

### Статистична картка

```tsx
import { STAT_COLORS } from '@/theme/colors';

<Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0">
  <CardContent className="p-6">
    <div className="flex items-start justify-between mb-4">
      {/* Іконка з градієнтом */}
      <div className={`p-3 rounded-xl bg-gradient-to-br ${STAT_COLORS.revenue.gradient} text-white shadow-lg`}>
        <DollarSign className="w-6 h-6" />
      </div>
      
      {/* Тренд */}
      <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        <ArrowUpRight className="w-3 h-3" />
        +24.5%
      </div>
    </div>
    
    {/* Значення */}
    <div>
      <p className="text-sm text-gray-600 mb-1">Загальний дохід</p>
      <p className="text-3xl font-bold text-gray-900">₴125,000</p>
    </div>
  </CardContent>
</Card>
```

### Кнопка з градієнтом

```tsx
import { PRIMARY_GRADIENT } from '@/theme/colors';

<Button className={`bg-gradient-to-r ${PRIMARY_GRADIENT.button} hover:${PRIMARY_GRADIENT.buttonHover}`}>
  <Plus className="w-4 h-4 mr-2" />
  Додати
</Button>
```

### Badge (Значок)

```tsx
import { STATUS_COLORS } from '@/theme/colors';

<Badge className={STATUS_COLORS.success.badge}>
  Активне
</Badge>

<Badge className={STATUS_COLORS.warning.badge}>
  Очікує
</Badge>

<Badge className={STATUS_COLORS.error.badge}>
  Скасовано
</Badge>
```

---

## 🎬 АНІМАЦІЇ

### Framer Motion - Стандартні анімації

```tsx
// Fade + Slide (для карток)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
>
  {/* Контент */}
</motion.div>

// Hover Scale (для кнопок)
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  {/* Контент */}
</motion.button>

// Rotate (для іконок)
<motion.div
  animate={{ rotate: [0, 180, 360] }}
  transition={{ repeat: Infinity, duration: 3 }}
>
  <RefreshCw />
</motion.div>
```

---

## ✅ ЧЕКЛИСТ ДЛЯ НОВИХ КОМПОНЕНТІВ

Перед створенням нового компонента перевірте:

- [ ] Використовуєте `import { COLORS } from '@/theme/colors'`
- [ ] Фон сторінки: `bg-gradient-to-br ${FEATURE_COLORS.xxx.bg}`
- [ ] Заголовок: `bg-gradient-to-r ${FEATURE_COLORS.xxx.text} bg-clip-text text-transparent`
- [ ] Іконка: `bg-gradient-to-br ${FEATURE_COLORS.xxx.icon}`
- [ ] Статистичні картки: `STAT_COLORS.xxx.gradient`
- [ ] Статуси: `STATUS_COLORS.xxx.badge`
- [ ] Анімації: `framer-motion` з стандартними параметрами
- [ ] Hover ефекти: `hover:shadow-lg transition-all duration-300`

---

## 🚫 ЩО НЕ РОБИТИ

### ❌ Хардкод кольорів:
```tsx
// НЕ РОБІТЬ ТАК:
<div className="bg-gradient-to-r from-red-500 to-pink-500">
<Badge className="bg-orange-100 text-orange-700">
```

### ✅ Використовуйте константи:
```tsx
// РОБІТЬ ТАК:
import { FEATURE_COLORS, STATUS_COLORS } from '@/theme/colors';
<div className={`bg-gradient-to-r ${FEATURE_COLORS.exchange.gradient}`}>
<Badge className={STATUS_COLORS.warning.badge}>
```

---

## 📚 ПРИКЛАДИ

### Повний приклад сторінки:

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FEATURE_COLORS, STAT_COLORS } from '@/theme/colors';
import { Package, TrendingUp } from 'lucide-react';

export function ExamplePage() {
  const colors = FEATURE_COLORS.marketplace;
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} p-6`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={`text-4xl font-bold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent mb-2 flex items-center gap-3`}>
          <div className={`p-3 bg-gradient-to-br ${colors.icon} rounded-2xl shadow-lg`}>
            <Package className="w-8 h-8 text-white" />
          </div>
          Маркетплейс
        </h1>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card className={`p-6 bg-gradient-to-br ${STAT_COLORS.revenue.bg}`}>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${STAT_COLORS.revenue.gradient} text-white`}>
            <DollarSign className="w-6 h-6" />
          </div>
          <p className={`text-3xl font-bold ${STAT_COLORS.revenue.text} mt-4`}>
            ₴125,000
          </p>
        </Card>
      </div>
    </div>
  );
}
```

---

## 🎯 ВИСНОВОК

**ЗАВЖДИ** використовуйте кольори з `@/theme/colors.ts`!

Це забезпечує:
- ✅ Єдиний стиль по всьому проекту
- ✅ Легку зміну кольорів в одному місці
- ✅ Кращу підтримку коду
- ✅ Професійний вигляд

---

**Створено:** 2025-11-02  
**Версія:** 1.0.0  
**Проект:** RP-Modern
