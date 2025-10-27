import React, { Component, ReactNode } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const ErrorFallback: React.FC<{ onReload: () => void; t: (key: string) => string }> = ({ onReload, t }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        ⚠️ {t('errors.loadingError')}
      </h1>
      <p className="text-gray-600 mb-4">
        {t('errors.somethingWrong')}
      </p>
      <button
        onClick={onReload}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {t('common.refresh')}
      </button>
    </div>
  </div>
);

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Используем HOC для передачи хука переводов
      const ErrorWithTranslation = () => {
        const t = useTranslation();
        return <ErrorFallback onReload={() => window.location.reload()} t={t} />;
      };

      return <ErrorWithTranslation />;
    }

    return this.props.children;
  }
}

