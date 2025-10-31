import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration: _duration = 3000,
  onClose
}) => {
  const getStyles = () => {
    const baseStyles = 'flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl backdrop-blur-sm border max-w-md';
    
    const typeStyles = {
      success: 'bg-green-500/95 text-white border-green-400/50',
      error: 'bg-red-500/95 text-white border-red-400/50',
      info: 'bg-blue-500/95 text-white border-blue-400/50',
      warning: 'bg-amber-500/95 text-white border-amber-400/50'
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
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={getStyles()}
    >
      {getIcon()}
      <p className="flex-1 font-medium text-sm">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-75 transition-opacity ml-2"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
