import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getStyles = () => {
    const baseStyles = 'flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm border animate-in fade-in slide-in-from-top-2 duration-300';
    
    const typeStyles = {
      success: 'bg-green-500/90 text-white border-green-400',
      error: 'bg-red-500/90 text-white border-red-400',
      info: 'bg-blue-500/90 text-white border-blue-400',
      warning: 'bg-amber-500/90 text-white border-amber-400'
    };

    return `${baseStyles} ${typeStyles[type]}`;
  };

  const getIcon = () => {
    const iconProps = { className: 'w-5 h-5 flex-shrink-0', strokeWidth: 2 };
    
    switch (type) {
      case 'success':
        return <CheckCircle2 {...iconProps} />;
      case 'error':
        return <AlertTriangle {...iconProps} />;
      case 'warning':
        return <AlertTriangle {...iconProps} />;
      default:
        return <Info {...iconProps} />;
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-top-2 duration-300">
      <div className={getStyles()}>
        {getIcon()}
        <p className="flex-1 font-medium text-sm">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="flex-shrink-0 hover:opacity-75 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
