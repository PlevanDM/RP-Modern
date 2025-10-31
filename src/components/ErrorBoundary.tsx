import React, { Component, ReactNode } from 'react';
import i18n from '../i18n/config';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// Error fallback with i18n support using i18n directly (not hook, since ErrorBoundary is outside I18nextProvider)
const ErrorFallback: React.FC<{ onReload: () => void; error?: Error }> = ({ onReload }) => {
  // Use i18n directly instead of hook (since we're outside I18nextProvider)
  const getTranslation = (key: string, defaultValue: string) => {
    try {
      const translated = i18n.t(key);
      return translated && translated !== key ? translated : defaultValue;
    } catch {
      return defaultValue;
    }
  };
  
  // Отримуємо деталі помилки для відображення (тільки в dev режимі)
  const errorDetails = error ? (
    <details className="mt-4 text-left max-w-lg mx-auto">
        <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
          Деталі помилки (для debugging)
        </summary>
        <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-40">
          {String(error?.message || 'Unknown error')}
          {error?.stack && `\n\nStack:\n${error.stack}`}
        </pre>
    </details>
  ) : null;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          ⚠️ {getTranslation('errors.loadingError', 'Помилка завантаження')}
        </h1>
        <p className="text-gray-600 mb-4">
          {getTranslation('errors.somethingWrong', 'Щось пішло не так. Спробуйте оновити сторінку.')}
        </p>
        {errorDetails}
        <div className="mt-6 space-y-2">
          <button
            onClick={onReload}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {getTranslation('common.refresh', 'Оновити сторінку')}
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              onReload();
            }}
            className="block w-full mt-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            Очистити кеш і оновити
          </button>
        </div>
      </div>
    </div>
  );
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): State {
    // Ігноруємо помилки, що не критичні для рендерингу
    const errorMessage = error?.message || ErrorBoundary.procurString(error) || '';
    const errorName = error?.name || '';
    const errorStack = error?.stack || '';
    
    // Список помилок, які не критичні
    const nonCriticalPatterns = [
      'ResizeObserver',
      'Non-Error promise rejection',
      'ChunkLoadError',
      'Loading chunk',
      'Failed to fetch dynamically imported module',
      'WebGL',
      'THREE.WebGLRenderer',
      'Error creating WebGL context',
      'Network request failed',
      'NetworkError',
      'fetch'
    ];
    
    const isNonCritical = nonCriticalPatterns.some(pattern => 
      errorMessage.includes(pattern) || 
      errorName.includes(pattern) ||
      errorStack.includes(pattern)
    );
    
    if (isNonCritical) {
      console.warn('Non-critical error ignored:', { errorMessage, errorName });
      // Для ChunkLoadError - спробуємо перезавантажити сторінку автоматично
      if (errorMessage.includes('ChunkLoadError') || errorMessage.includes('Loading chunk')) {
        console.warn('Chunk load error detected, attempting to reload page...');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      return { hasError: false, error: undefined };
    }
    
    console.error('Critical error caught by ErrorBoundary:', { errorMessage, errorName, errorStack });
    return { hasError: true, error };
  }
  
  // Helper to safely convert error to string
  static procurString(error: unknown): string {
    if (typeof error === 'string') return error;
    if (error?.message) return String(error.message);
    if (error?.toString) return error.toString();
    return String(error);
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Логуємо детальну інформацію про помилку
    const errorMessage = error?.message || '';
    const errorName = error?.name || '';
    
    // Детальне логування для debugging
    console.error('ErrorBoundary caught error:', {
      message: errorMessage,
      name: errorName,
      stack: error?.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    
    // Для критичних помилок - зберігаємо в localStorage для debugging
    try {
      const errorLog = {
        message: errorMessage,
        name: errorName,
        stack: error?.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href
      };
      const existingLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
      existingLogs.push(errorLog);
      // Зберігаємо тільки останні 10 помилок
      localStorage.setItem('errorLogs', JSON.stringify(existingLogs.slice(-10)));
    } catch (e) {
      console.warn('Failed to save error log:', e);
    }
  }

  componentDidUpdate(prevProps: Props) {
    // Скидаємо помилку якщо props змінилися
    if (prevProps !== this.props && this.state.hasError) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  render() {
    if (this.state.hasError) {
      const handleReload = () => {
        this.setState({ hasError: false, error: undefined });
        window.location.reload();
      };

      return <ErrorFallback onReload={handleReload} error={this.state.error} />;
    }

    return this.props.children;
  }
}
