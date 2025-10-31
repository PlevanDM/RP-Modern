import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class SplineErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Логуємо помилку Spline/WebGL, але не викидаємо далі
    console.warn('Spline ErrorBoundary caught error (non-critical):', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center p-4">
            <p className="text-sm text-gray-600">3D анімація недоступна</p>
            <p className="text-xs text-gray-500 mt-1">Ваш браузер не підтримує WebGL</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

