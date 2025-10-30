// Material Design 3 (Material You) + 2026 Trends
// Enhanced with softer shadows, larger touch targets, glassmorphism
import React from 'react';
import { LucideIcon } from 'lucide-react';

// Material Design 3 Card Component
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'outlined' | 'elevated';
  onClick?: () => void;
}> = ({ children, className = '', hover = true, variant = 'default', onClick }) => {
  const baseStyles = 'bg-white rounded-2xl transition-all duration-300 ease-out';
  
  const variants = {
    default: 'border border-gray-200/60 hover:border-gray-300/80 shadow-sm hover:shadow-md',
    outlined: 'border-2 border-gray-300/80 hover:border-gray-400 shadow-sm hover:shadow-md',
    elevated: 'shadow-md hover:shadow-xl border-0'
  };

  const hoverEffect = hover ? 'cursor-pointer hover:-translate-y-0.5' : '';
  const clickable = onClick ? 'cursor-pointer active:scale-[0.97]' : '';

  return (
    <div 
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${hoverEffect}
        ${clickable}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Stat Card Component
export const StatCard: React.FC<{
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  children?: React.ReactNode;
}> = ({ title, value, change, changeType = 'neutral', icon: Icon, iconColor = 'text-blue-600', children }) => (
  <Card className="p-6 cursor-pointer group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      {change && (
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          changeType === 'positive' 
            ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30' 
            : changeType === 'negative'
            ? 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30'
            : 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/30'
        }`}>
          {change}
        </span>
      )}
    </div>
    
    <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{value}</p>
    {children}
  </Card>
);

// Section Header Component
export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}> = ({ title, subtitle, icon: Icon, action }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      {Icon && (
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
      )}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
    {action}
  </div>
);

// Material Design 3 Button Component
export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false, 
  className = '', 
  icon: Icon,
  iconPosition = 'left'
}) => {
  // Уніфіковані стилі кнопок
  const variants = {
    primary: 'bg-[#1976d2] text-white hover:bg-[#1565c0] shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 focus:ring-2 focus:ring-[#1976d2] focus:ring-offset-2',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
    danger: 'bg-[#d32f2f] text-white hover:bg-[#c62828] shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 focus:ring-2 focus:ring-[#d32f2f] focus:ring-offset-2',
    ghost: 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50/80 hover:border-gray-400 shadow-sm focus:ring-2 focus:ring-[#1976d2] focus:ring-offset-2'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-full min-h-[40px]',
    md: 'px-6 py-3 text-sm rounded-full min-h-[48px]',
    lg: 'px-8 py-4 text-base rounded-full min-h-[52px]',
    xl: 'px-10 py-5 text-lg rounded-full min-h-[56px]'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-medium 
        transition-all duration-200 ease-in-out
        active:scale-[0.97]
        focus:outline-none focus:ring-2 focus:ring-[#1976d2] focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
    </button>
  );
};

// Material Design 3 Input Component
export const Input: React.FC<{
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  className?: string;
  icon?: LucideIcon;
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  variant?: 'filled' | 'outlined';
}> = ({ 
  placeholder, 
  value, 
  onChange, 
  type = 'text', 
  className = '', 
  icon: Icon, 
  label,
  error = false,
  helperText,
  disabled = false,
  variant = 'filled'
}) => {
  const baseStyles = 'w-full px-4 py-3 rounded-xl transition-all duration-300 ease-out outline-none text-sm min-h-[52px]';
  const filledStyles = error 
    ? 'bg-[#fce8e6] border-2 border-[#d32f2f] focus:border-[#d32f2f] focus:bg-white text-gray-900 placeholder:text-gray-400' 
    : 'bg-gray-50/80 border-2 border-transparent focus:bg-white focus:border-[#1976d2] text-gray-900 placeholder:text-gray-400';
  
  const outlinedStyles = error
    ? 'bg-white border-2 border-[#d32f2f] focus:border-[#d32f2f] focus:shadow-sm focus:shadow-red-500/10 text-gray-900'
    : 'bg-white border-2 border-gray-300/80 focus:border-[#1976d2] focus:shadow-sm focus:shadow-blue-500/10 text-gray-900';

  const inputStyles = variant === 'filled' ? filledStyles : outlinedStyles;
  const iconColor = error ? 'text-[#d32f2f]' : 'text-gray-400';
  const labelColor = error ? 'text-[#d32f2f]' : 'text-gray-700';

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium ${labelColor} mb-1.5`}>
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${iconColor}`} />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={`
            ${baseStyles}
            ${inputStyles}
            ${Icon ? 'pl-12' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${error ? 'focus:ring-2 focus:ring-red-500 focus:ring-offset-1' : 'focus:ring-2 focus:ring-[#1976d2] focus:ring-offset-1'}
            ${className}
          `}
        />
      </div>
      {helperText && (
        <p className={`mt-1.5 text-xs ${error ? 'text-[#d32f2f]' : 'text-gray-500'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

// Badge Component
export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}> = ({ children, variant = 'neutral', size = 'md' }) => {
  const variants = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

// Progress Bar Component
export const ProgressBar: React.FC<{
  value: number;
  max?: number;
  label?: string;
  className?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}> = ({ value, max = 100, label, className = '', color = 'blue' }) => {
  const colors = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    green: 'bg-gradient-to-r from-green-500 to-green-600',
    yellow: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    red: 'bg-gradient-to-r from-red-500 to-red-600',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600'
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{value}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className={`${colors[color]} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
};

// Empty State Component
export const EmptyState: React.FC<{
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}> = ({ icon: Icon, title, description, action }) => (
  <div className="text-center py-12">
    <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-6">{description}</p>
    {action}
  </div>
);

// Loading Spinner Component
export const LoadingSpinner: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizes[size]} ${className}`} />
  );
};

// Material Design 3 Modal Component
export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
}> = ({ isOpen, onClose, title, children, size = 'md', icon: Icon }) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className={`
          relative bg-white rounded-3xl shadow-2xl shadow-black/20 w-full transition-all
          ${sizes[size]}
          animate-in fade-in slide-in-from-bottom-4 duration-300
        `}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/60">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Alert Component
export const Alert: React.FC<{
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description?: string;
  onClose?: () => void;
}> = ({ type, title, description, onClose }) => {
  const types = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-200 dark:border-green-800',
      icon: 'text-green-600 dark:text-green-400',
      title: 'text-green-800 dark:text-green-200',
      description: 'text-green-700 dark:text-green-300'
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/30',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: 'text-yellow-600 dark:text-yellow-400',
      title: 'text-yellow-800 dark:text-yellow-200',
      description: 'text-yellow-700 dark:text-yellow-300'
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-200 dark:border-red-800',
      icon: 'text-red-600 dark:text-red-400',
      title: 'text-red-800 dark:text-red-200',
      description: 'text-red-700 dark:text-red-300'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      title: 'text-blue-800 dark:text-blue-200',
      description: 'text-blue-700 dark:text-blue-300'
    }
  };

  const typeConfig = types[type];

  return (
    <div className={`rounded-lg border ${typeConfig.bg} ${typeConfig.border} p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <div className={`w-5 h-5 ${typeConfig.icon}`}>
            {type === 'success' && <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
            {type === 'warning' && <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>}
            {type === 'error' && <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>}
            {type === 'info' && <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}
          </div>
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${typeConfig.title}`}>{title}</h3>
          {description && (
            <p className={`mt-1 text-sm ${typeConfig.description}`}>{description}</p>
          )}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 ${typeConfig.icon} hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Page Header Component
export const PageHeader: React.FC<{
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
}> = ({ title, subtitle, icon: Icon, actions }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  </div>
);

export default {
  Card,
  StatCard,
  SectionHeader,
  Button,
  Input,
  Badge,
  ProgressBar,
  EmptyState,
  LoadingSpinner,
  Modal,
  Alert,
  PageHeader
};
