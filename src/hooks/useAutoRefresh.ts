import { useEffect, useRef } from 'react';

interface UseAutoRefreshOptions {
  enabled?: boolean;
  interval?: number; // мілісекунди
  onRefresh: () => void | Promise<void>;
  dependencies?: any[]; // залежності для перезапуску
}

/**
 * Хук для автоматичного оновлення даних (polling)
 * Використовується для автооновлення статусів замовлень, повідомлень тощо
 */
export function useAutoRefresh({
  enabled = true,
  interval = 10000, // 10 секунд за замовчуванням
  onRefresh,
  dependencies = [],
}: UseAutoRefreshOptions) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Функція для оновлення з захистом від паралельних викликів
    const refresh = async () => {
      if (isRefreshingRef.current) {
        return; // Вже виконується оновлення
      }

      try {
        isRefreshingRef.current = true;
        await onRefresh();
      } catch (error) {
        console.error('Auto-refresh error:', error);
      } finally {
        isRefreshingRef.current = false;
      }
    };

    // Перше оновлення одразу
    refresh();

    // Налаштовуємо інтервал
    intervalRef.current = setInterval(refresh, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, interval, onRefresh, ...dependencies]);

  // Функція для ручного оновлення
  const manualRefresh = async () => {
    if (!isRefreshingRef.current) {
      await onRefresh();
    }
  };

  return { manualRefresh };
}




