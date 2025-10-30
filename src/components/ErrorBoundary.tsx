import React, { Component, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const ErrorFallback: React.FC<{ onReload: () => void }> = ({ onReload }) => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          ⚠️ {t('errors.loadingError', 'Помилка завантаження')}
        </h1>
        <p className="text-gray-600 mb-4">
          {t('errors.somethingWrong', 'Щось пішло не так. Спробуйте оновити сторінку.')}
        </p>
        <button
          onClick={onReload}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('common.refresh', 'Оновити сторінку')}
        </button>
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
    const errorMessage = error?.message || '';
    if (errorMessage.includes('ResizeObserver') || 
        errorMessage.includes('Non-Error promise rejection') ||
        errorMessage.includes('ChunkLoadError') ||
        errorMessage.includes('WebGL') ||
        errorMessage.includes('THREE.WebGLRenderer') ||
        errorMessage.includes('Error creating WebGL context')) {
      console.warn('Non-critical error ignored:', errorMessage);
      return { hasError: false, error: undefined };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Логуємо тільки критичні помилки
    const errorMessage = error?.message || '';
    if (!errorMessage.includes('ResizeObserver') && 
        !errorMessage.includes('Non-Error promise rejection') &&
        !errorMessage.includes('ChunkLoadError') &&
        !errorMessage.includes('WebGL') &&
        !errorMessage.includes('THREE.WebGLRenderer')) {
      console.error('Error caught by boundary:', error, errorInfo);
    } else {
      console.warn('Non-critical error caught (will be ignored):', errorMessage);
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

      return <ErrorFallback onReload={handleReload} />;
    }

    return this.props.children;
  }
}
