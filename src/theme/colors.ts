/**
 * 🎨 UNIFIED COLOR SYSTEM FOR RP-MODERN
 * 
 * Єдина кольорова палітра для всього проекту
 * Використовуйте ці константи замість хардкоду кольорів
 */

// ============================================================
// PRIMARY COLORS - Основні кольори проекту
// ============================================================

export const PRIMARY_GRADIENT = {
  // Головний градієнт (Blue → Purple)
  bg: 'from-blue-600 to-purple-600',
  bgLight: 'from-blue-50 via-white to-purple-50',
  button: 'from-blue-500 to-purple-500',
  buttonHover: 'from-blue-600 to-purple-600',
  text: 'from-blue-600 to-purple-600',
  icon: 'from-blue-500 to-purple-500',
} as const;

// ============================================================
// STAT CARD COLORS - Кольори для статистичних карток
// ============================================================

export const STAT_COLORS = {
  // Дохід / Гроші
  revenue: {
    gradient: 'from-green-500 to-emerald-600',
    bg: 'from-green-50 to-emerald-50',
    text: 'text-green-600',
    border: 'border-green-200',
  },
  // Замовлення / Пакети
  orders: {
    gradient: 'from-blue-500 to-cyan-600',
    bg: 'from-blue-50 to-cyan-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  // Завершено / Успіх
  completed: {
    gradient: 'from-purple-500 to-pink-600',
    bg: 'from-purple-50 to-pink-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
  // Рейтинг / Зірки
  rating: {
    gradient: 'from-yellow-500 to-orange-600',
    bg: 'from-yellow-50 to-orange-50',
    text: 'text-yellow-600',
    border: 'border-yellow-200',
  },
  // Час / Швидкість
  time: {
    gradient: 'from-indigo-500 to-purple-600',
    bg: 'from-indigo-50 to-purple-50',
    text: 'text-indigo-600',
    border: 'border-indigo-200',
  },
  // Клієнти / Користувачі
  users: {
    gradient: 'from-pink-500 to-rose-600',
    bg: 'from-pink-50 to-rose-50',
    text: 'text-pink-600',
    border: 'border-pink-200',
  },
} as const;

// ============================================================
// STATUS COLORS - Кольори статусів
// ============================================================

export const STATUS_COLORS = {
  // Успіх / Активний
  success: {
    gradient: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-700',
    border: 'border-green-200',
  },
  // Помилка / Видалення
  error: {
    gradient: 'from-red-500 to-rose-600',
    bg: 'bg-red-50',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-700',
    border: 'border-red-200',
  },
  // Попередження / Очікування
  warning: {
    gradient: 'from-yellow-500 to-orange-600',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    badge: 'bg-yellow-100 text-yellow-700',
    border: 'border-yellow-200',
  },
  // Інформація / Нейтральний
  info: {
    gradient: 'from-blue-500 to-cyan-600',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
    border: 'border-blue-200',
  },
  // Неактивний / Сірий
  inactive: {
    gradient: 'from-gray-400 to-gray-600',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    badge: 'bg-gray-100 text-gray-700',
    border: 'border-gray-200',
  },
} as const;

// ============================================================
// FEATURE COLORS - Кольори для окремих функцій
// ============================================================

export const FEATURE_COLORS = {
  // Маркетплейс
  marketplace: {
    gradient: 'from-blue-500 to-purple-500',
    bg: 'from-blue-50 via-white to-purple-50',
    text: 'from-blue-600 to-purple-600',
    icon: 'from-blue-500 to-purple-500',
  },
  // Обмін
  exchange: {
    gradient: 'from-orange-500 to-yellow-500',
    bg: 'from-orange-50 via-white to-yellow-50',
    text: 'from-orange-600 to-yellow-600',
    icon: 'from-orange-500 to-yellow-500',
  },
  // Повідомлення
  messages: {
    gradient: 'from-cyan-500 to-blue-500',
    bg: 'from-cyan-50 via-white to-blue-50',
    text: 'from-cyan-600 to-blue-600',
    icon: 'from-cyan-500 to-blue-500',
  },
  // Платежі
  payments: {
    gradient: 'from-green-500 to-emerald-500',
    bg: 'from-green-50 via-white to-emerald-50',
    text: 'from-green-600 to-emerald-600',
    icon: 'from-green-500 to-emerald-500',
  },
  // Портфоліо
  portfolio: {
    gradient: 'from-purple-500 to-pink-500',
    bg: 'from-purple-50 via-white to-pink-50',
    text: 'from-purple-600 to-pink-600',
    icon: 'from-purple-500 to-pink-500',
  },
  // Звіти
  reports: {
    gradient: 'from-indigo-500 to-purple-500',
    bg: 'from-indigo-50 via-white to-purple-50',
    text: 'from-indigo-600 to-purple-600',
    icon: 'from-indigo-500 to-purple-500',
  },
} as const;

// ============================================================
// BACKGROUND COLORS - Фонові кольори
// ============================================================

export const BG_COLORS = {
  // Головний фон
  main: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
  // Картка
  card: 'bg-white',
  cardHover: 'hover:bg-gray-50',
  // Сірий фон
  gray: 'bg-gray-50',
  grayHover: 'hover:bg-gray-100',
  // Темний фон
  dark: 'bg-gray-900',
  darkCard: 'bg-gray-800',
} as const;

// ============================================================
// TEXT COLORS - Кольори тексту
// ============================================================

export const TEXT_COLORS = {
  primary: 'text-gray-900',
  secondary: 'text-gray-600',
  muted: 'text-gray-500',
  disabled: 'text-gray-400',
  white: 'text-white',
  gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
} as const;

// ============================================================
// BORDER COLORS - Кольори рамок
// ============================================================

export const BORDER_COLORS = {
  default: 'border-gray-200',
  hover: 'hover:border-gray-300',
  focus: 'focus:border-blue-500',
  primary: 'border-blue-500',
  success: 'border-green-500',
  error: 'border-red-500',
  warning: 'border-yellow-500',
} as const;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Отримати кольори для статистичної картки за індексом
 */
export function getStatColor(index: number) {
  const colors = Object.values(STAT_COLORS);
  return colors[index % colors.length];
}

/**
 * Отримати колір статусу
 */
export function getStatusColor(status: 'success' | 'error' | 'warning' | 'info' | 'inactive') {
  return STATUS_COLORS[status];
}

/**
 * Отримати колір функції
 */
export function getFeatureColor(feature: keyof typeof FEATURE_COLORS) {
  return FEATURE_COLORS[feature];
}

// ============================================================
// EXPORT ALL
// ============================================================

export const COLORS = {
  primary: PRIMARY_GRADIENT,
  stat: STAT_COLORS,
  status: STATUS_COLORS,
  feature: FEATURE_COLORS,
  bg: BG_COLORS,
  text: TEXT_COLORS,
  border: BORDER_COLORS,
} as const;

export default COLORS;

