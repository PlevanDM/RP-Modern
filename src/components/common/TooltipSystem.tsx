import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  delay?: number;
}

export function Tooltip({ text, position = 'top', icon, children, delay = 0 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full mb-2 -translate-x-1/2 left-1/2',
    bottom: 'top-full mt-2 -translate-x-1/2 left-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent'
  };

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setTimeout(() => setIsVisible(true), delay)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="inline-flex items-center"
        title={text}
      >
        {icon ? (
          icon
        ) : (
          <HelpCircle className="w-5 h-5 text-blue-500 hover:text-blue-600 transition cursor-help" />
        )}
      </button>

      {children}

      {isVisible && (
        <div
          className={`absolute z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none ${positionClasses[position]}`}
          style={{ animation: 'fade-in 0.2s ease-in' }}
        >
          {text}
          <div className={`absolute w-0 h-0 ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
}

// Для использования с кнопками
export function TooltipButton({
  text,
  onClick,
  children,
  className = '',
  position = 'top'
}: {
  text: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}) {
  return (
    <Tooltip text={text} position={position}>
      <button
        onClick={onClick}
        className={`relative group ${className}`}
      >
        {children}
      </button>
    </Tooltip>
  );
}

// Компонент для подсказок по всему приложению
export const HELPFUL_HINTS = {
  escrow: '🛡️ Escrow система защищает обе стороны. Ваши деньги будут удерживаться до завершения работы.',
  rating: '⭐ Рейтинг основан на отзывах клиентов. Выше рейтинг - лучше качество работы.',
  urgency: '⏰ Срочные заказы имеют приоритет. Они видны всем мастерам первыми.',
  budget: '💰 Укажите реальный бюджет. Это поможет получить точные предложения.',
  verification: '✅ Верифицированные мастера прошли проверку. Они надежнее.',
  commission: '💳 Комиссия платформы берется из суммы оплаты. Прозрачно и справедливо.',
  portfolio: '📸 Портфолио мастера показывает его работы. Изучите примеры перед выбором.',
  warranty: '🔧 Гарантия на работу означает, что мастер исправит любые проблемы.',
  chat: '💬 Общайтесь напрямую с мастером перед началом работы.',
  tracking: '📍 Отслеживайте статус выполнения в реальном времени.'
};

// Компонент для отображения подсказок при первом посещении
export function OnboardingHints() {
  const [hints, setHints] = useState([
    { id: 'welcome', title: 'Добро пожаловать! 👋', text: 'Это ваша первая работа с нашей платформой?', shown: false },
    { id: 'orders', title: 'Создание заказа 📋', text: 'Нажмите здесь, чтобы создать новый заказ и получить предложения от мастеров.', shown: false }
  ]);

  const dismissHint = (id: string) => {
    setHints(hints.map(h => h.id === id ? { ...h, shown: true } : h));
  };

  return (
    <div className="space-y-3">
      {hints.map(hint => (
        !hint.shown && (
          <div
            key={hint.id}
            className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg flex items-start justify-between gap-4 animate-slide-in"
          >
            <div>
              <h4 className="font-semibold text-blue-900">{hint.title}</h4>
              <p className="text-sm text-blue-700 mt-1">{hint.text}</p>
            </div>
            <button
              onClick={() => dismissHint(hint.id)}
              className="p-1 hover:bg-blue-100 rounded transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        )
      ))}
    </div>
  );
}

// Компонент информационного маячка
export function InfoBadge({
  text,
  type = 'info',
  icon
}: {
  text: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  icon?: React.ReactNode;
}) {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700'
  };

  const icons = {
    info: '📌',
    warning: '⚠️',
    success: '✅',
    error: '❌'
  };

  return (
    <div className={`border rounded-lg p-3 flex items-start gap-3 ${colors[type]}`}>
      <span className="text-lg flex-shrink-0">{icon || icons[type]}</span>
      <p className="text-sm">{text}</p>
    </div>
  );
}
