/**
 * УНИФИЦИРОВАННОЕ МОДАЛЬНОЕ ОКНО
 * Единый дизайн для всех модальных окон в приложении
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface UnifiedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  showCloseButton?: boolean;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full mx-4'
};

export const UnifiedModal: React.FC<UnifiedModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'lg',
  showCloseButton = true
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className={`relative ${sizeClasses[maxWidth]} w-full bg-white rounded-2xl shadow-2xl overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Унифицированный Input компонент
 */
export const UnifiedInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
  }
> = ({ label, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg 
          focus:ring-2 focus:ring-purple-500 focus:border-transparent
          transition-all duration-200 bg-white
          placeholder:text-gray-400 ${className}`}
        {...props}
      />
    </div>
  );
};

/**
 * Унифицированный Textarea компонент
 */
export const UnifiedTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
  }
> = ({ label, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg 
          focus:ring-2 focus:ring-purple-500 focus:border-transparent
          transition-all duration-200 bg-white resize-none
          placeholder:text-gray-400 ${className}`}
        {...props}
      />
    </div>
  );
};

/**
 * Унифицированный Select компонент
 */
export const UnifiedSelect: React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    options: Array<{ value: string; label: string }>;
  }
> = ({ label, options, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg 
          focus:ring-2 focus:ring-purple-500 focus:border-transparent
          transition-all duration-200 bg-white
          cursor-pointer appearance-none ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

/**
 * Унифицированные кнопки
 */
export const UnifiedButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  }
> = ({ children, variant = 'primary', className = '', ...props }) => {
  // Уніфіковані кольори та стилі
  const variantClasses = {
    primary: 'bg-[#1976d2] hover:bg-[#1565c0] text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 focus:ring-2 focus:ring-[#1976d2] focus:ring-offset-2',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 shadow-sm hover:shadow-md focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
    outline: 'border-2 border-gray-300 hover:bg-gray-50 text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-[#1976d2] focus:ring-offset-2',
    ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
  };

  return (
    <button
      className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200
        focus:outline-none
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.97]
        ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Унифицированный Footer для модальных окон
 */
export const UnifiedModalFooter: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
      {children}
    </div>
  );
};

