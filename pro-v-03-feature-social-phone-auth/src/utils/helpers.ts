import { OrderStatus, Urgency, Language } from '../types';

export function getStatusText(status: OrderStatus, language: Language): string {
  const statusMap: { [key in OrderStatus]: Record<Language, string> } = {
    'pending': { en: 'Pending', uk: 'Очікує' },
    'accepted': { en: 'Accepted', uk: 'Прийнято' },
    'in_progress': { en: 'In Progress', uk: 'В роботі' },
    'ready': { en: 'Ready', uk: 'Готово' },
    'completed': { en: 'Completed', uk: 'Завершено' },
    'cancelled': { en: 'Cancelled', uk: 'Скасовано' }
  };
  return statusMap[status][language];
}

export function getUrgencyText(urgency: Urgency, language: Language): string {
  const urgencyMap: Record<Urgency, Record<Language, string>> = {
    'low': { en: 'Low priority', uk: 'Низький пріоритет' },
    'medium': { en: 'Medium priority', uk: 'Середній пріоритет' },
    'high': { en: 'High priority', uk: 'Високий пріоритет' }
  };
  return urgencyMap[urgency][language];
}

export function getSkillInLanguage(skill: string, language: Language): string {
  const skillsTranslation: Record<string, Record<Language, string>> = {
    'iPhone': { en: 'iPhone', uk: 'iPhone' },
    'iPad': { en: 'iPad', uk: 'iPad' },
    'MacBook': { en: 'MacBook', uk: 'MacBook' },
    'Screen Replacement': { en: 'Screen Replacement', uk: 'Заміна екрану' },
    'Battery': { en: 'Battery', uk: 'Батарея' },
    'BGA Soldering': { en: 'BGA Soldering', uk: 'BGA спайка' },
    'Motherboard': { en: 'Motherboard', uk: 'Материнська плата' },
    'Display': { en: 'Display', uk: 'Дисплей' },
    'Пошкодження від рідини': { en: 'Liquid Damage', uk: 'Пошкодження від рідини' },
    'Data Recovery': { en: 'Data Recovery', uk: 'Відновлення даних' },
    'Android': { en: 'Android', uk: 'Android' }
  };

  return skillsTranslation[skill]?.[language] || skill;
}

export function formatDate(date: Date, language: Language): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  
  if (language === 'uk') {
    return date.toLocaleDateString('uk-UA', options);
  }
  return date.toLocaleDateString('en-US', options);
}

export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function formatCurrency(amount: number, currency: string = '$'): string {
  return `${currency}${amount.toFixed(2)}`;
}

export function getStatusColor(status: OrderStatus): string {
  const colorMap: { [key in OrderStatus]: string } = {
    'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    'accepted': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    'in_progress': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
    'ready': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    'completed': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
    'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
  };
  return colorMap[status];
}

export function getUrgencyColor(urgency: Urgency): string {
  const colorMap: { [key in Urgency]: string } = {
    'low': 'text-green-600 dark:text-green-400',
    'medium': 'text-yellow-600 dark:text-yellow-400',
    'high': 'text-red-600 dark:text-red-400'
  };
  return colorMap[urgency];
}

/**
 * Утиліта для обробки помилок завантаження зображень
 * Додає іконку замість відсутнього зображення
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  img.style.display = 'none';
  const parent = img.parentElement;
  if (parent) {
    parent.classList.add('flex', 'items-center', 'justify-center', 'bg-gray-100');
    const icon = document.createElement('div');
    icon.className = 'w-full h-full flex items-center justify-center';
    icon.innerHTML = `
      <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6h16M4 6a2 2 0 012-2h12a2 2 0 012 2M4 6v10a2 2 0 002 2h12a2 2 0 002-2V6m-4 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m0 0h8"/>
      </svg>
    `;
    parent.appendChild(icon);
  }
};

/**
 * Утиліта для отримання фото з fallback
 */
export const getImageUrl = (imagePath?: string, fallbackUrl?: string): string => {
  if (!imagePath) {
    return fallbackUrl || '';
  }
  return imagePath;
};

/**
 * Отримує зображення користувача з fallback для відсутніх фото
 */
export const getUserAvatar = (avatar?: string): string => {
  return avatar || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23D1D5DB%22%3E%3Cpath d=%22M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z%22/%3E%3C/svg%3E';
};

/**
 * Утиліта для отримання іконки замість відсутнього зображення
 */
export const getPlaceholderIcon = (): string => {
  return 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%239CA3AF%22%3E%3Cpath d=%22M4 6h16M4 6a2 2 0 012-2h12a2 2 0 012 2M4 6v10a2 2 0 002 2h12a2 2 0 002-2V6m-4 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m0 0h8%22/%3E%3C/svg%3E';
};
