import React, { useState } from 'react';
import { AlertCircle, RefreshCw, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyPageStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void | Promise<void>;
  isLoading?: boolean;
  retryCount?: number;
  maxRetries?: number;
  suggestions?: string[];
}

/**
 * Покращений компонент для відображення пустого стану сторінки
 * З автоматичним повтором та інформативними повідомленнями
 */
export const EmptyPageState: React.FC<EmptyPageStateProps> = ({
  title = 'Помилка завантаження',
  message = 'Не вдалося завантажити дані. Спробуйте ще раз.',
  onRetry,
  isLoading = false,
  retryCount = 0,
  maxRetries = 3,
  suggestions = [],
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(retryCount);

  const handleRetry = async () => {
    if (retryAttempt >= maxRetries || isRetrying || !onRetry) return;
    
    setIsRetrying(true);
    setRetryAttempt(prev => prev + 1);
    
    try {
      await onRetry();
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      setTimeout(() => setIsRetrying(false), 1000);
    }
  };

  const defaultSuggestions = suggestions.length > 0 ? suggestions : [
    'Перевірте інтернет-з\'єднання',
    'Оновіть сторінку',
    'Спробуйте через кілька хвилин'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[400px] flex items-center justify-center p-8"
    >
      <div className="text-center max-w-md">
        <motion.div
          className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4"
          animate={isLoading || isRetrying ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          {isLoading || isRetrying ? (
            <RefreshCw className="w-10 h-10 text-blue-500" />
          ) : (
            <AlertCircle className="w-10 h-10 text-orange-500" />
          )}
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>

        {defaultSuggestions.length > 0 && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3 text-left">
            <div className="flex items-start gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium text-blue-900">Можливі рішення:</p>
            </div>
            <ul className="text-sm text-blue-800 space-y-1 ml-6 list-disc">
              {defaultSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
        
        {retryAttempt < maxRetries && onRetry && (
          <button
            onClick={handleRetry}
            disabled={isRetrying || isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          >
            {isRetrying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Спроба {retryAttempt + 1}...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Спробувати ще раз ({retryAttempt}/{maxRetries})</span>
              </>
            )}
          </button>
        )}
        
        {retryAttempt >= maxRetries && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Всі спроби вичерпано</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Перезавантажити сторінку
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

