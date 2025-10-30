/**
 * Уніфікована система дизайну компонентів
 * Всі компоненти використовують однакові стилі
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

// ============================================
// УНІФІКОВАНА КНОПКА
// ============================================

export interface UnifiedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const UnifiedButton: React.FC<UnifiedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  ...props
}) => {
  const variants = {
    primary: 'bg-[#1976d2] text-white hover:bg-[#1565c0] shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 focus:ring-2 focus:ring-[#1976d2] focus:ring-offset-2',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
    danger: 'bg-[#d32f2f] text-white hover:bg-[#c62828] shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 focus:ring-2 focus:ring-[#d32f2f] focus:ring-offset-2',
    ghost: 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50/80 hover:border-gray-400 shadow-sm focus:ring-2 focus:ring-[#1976d2] focus:ring-offset-2',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl min-h-[40px]',
    md: 'px-6 py-3 text-sm rounded-xl min-h-[48px]',
    lg: 'px-8 py-4 text-base rounded-xl min-h-[52px]',
    xl: 'px-10 py-5 text-lg rounded-xl min-h-[56px]',
  };

  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-200 ease-in-out',
        'active:scale-[0.97]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100',
        'focus:outline-none',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
    </button>
  );
};

// ============================================
// УНІФІКОВАНА КАРТКА
// ============================================

export interface UnifiedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'none';
}

export const UnifiedCard: React.FC<UnifiedCardProps> = ({
  children,
  hover = false,
  padding = 'md',
  shadow = 'md',
  className,
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const shadows = {
    none: '',
    sm: 'shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]',
    md: 'shadow-[0_2px_4px_0_rgba(0,0,0,0.06)]',
    lg: 'shadow-[0_8px_16px_0_rgba(0,0,0,0.1)]',
  };

  return (
    <div
      {...props}
      className={cn(
        'bg-white rounded-xl',
        'border border-gray-200',
        shadows[shadow],
        'transition-all duration-200',
        hover && 'hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.08)] hover:-translate-y-0.5',
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

// ============================================
// УНІФІКОВАНІ БАДЖІ
// ============================================

export interface UnifiedBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

export const UnifiedBadge: React.FC<UnifiedBadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  ...props
}) => {
  const variants = {
    success: 'bg-[#e8f5e9] text-[#1b5e20] border-[#2e7d32]',
    warning: 'bg-[#fff3e0] text-[#e65100] border-[#ed6c02]',
    error: 'bg-[#ffebee] text-[#c62828] border-[#d32f2f]',
    info: 'bg-[#e1f5fe] text-[#01579b] border-[#0288d1]',
    neutral: 'bg-gray-100 text-gray-700 border-gray-300',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs rounded-md border',
    md: 'px-3 py-1 text-sm rounded-lg border',
    lg: 'px-4 py-1.5 text-base rounded-xl border',
  };

  return (
    <span
      {...props}
      className={cn(
        'inline-flex items-center font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

// ============================================
// УНІФІКОВАНИЙ ІНПУТ
// ============================================

export interface UnifiedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  icon?: LucideIcon;
}

export const UnifiedInput: React.FC<UnifiedInputProps> = ({
  label,
  error = false,
  helperText,
  icon: Icon,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          {...props}
          className={cn(
            'w-full px-4 py-3 rounded-xl',
            'border-2 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            Icon && 'pl-10',
            error
              ? 'border-[#d32f2f] focus:ring-[#d32f2f] focus:border-[#d32f2f]'
              : 'border-gray-300 focus:ring-[#1976d2] focus:border-[#1976d2]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
        />
      </div>
      {helperText && (
        <p className={cn(
          'mt-1.5 text-sm',
          error ? 'text-[#d32f2f]' : 'text-gray-600'
        )}>
          {helperText}
        </p>
      )}
    </div>
  );
};

// ============================================
// УНІФІКОВАНИЙ ЗАГОЛОВОК
// ============================================

export interface UnifiedHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  subtitle?: string;
  icon?: LucideIcon;
}

export const UnifiedHeading: React.FC<UnifiedHeadingProps> = ({
  children,
  level = 2,
  subtitle,
  icon: Icon,
  className,
  ...props
}) => {
  const sizes = {
    1: 'text-4xl sm:text-5xl md:text-6xl font-bold',
    2: 'text-3xl sm:text-4xl md:text-5xl font-bold',
    3: 'text-2xl sm:text-3xl md:text-4xl font-semibold',
    4: 'text-xl sm:text-2xl md:text-3xl font-semibold',
    5: 'text-lg sm:text-xl md:text-2xl font-medium',
    6: 'text-base sm:text-lg md:text-xl font-medium',
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <div className={cn('mb-6', className)}>
      <Tag
        {...props}
        className={cn(
          'flex items-center gap-3 text-gray-900',
          sizes[level]
        )}
      >
        {Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#1976d2]" />}
        {children}
      </Tag>
      {subtitle && (
        <p className="mt-2 text-base sm:text-lg text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
};

// ============================================
// УНІФІКОВАНИЙ КОНТЕЙНЕР
// ============================================

export interface UnifiedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const UnifiedContainer: React.FC<UnifiedContainerProps> = ({
  children,
  maxWidth = 'xl',
  padding = 'md',
  className,
  ...props
}) => {
  const maxWidths = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  const paddings = {
    none: '',
    sm: 'px-4',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
  };

  return (
    <div
      {...props}
      className={cn(
        'mx-auto w-full',
        maxWidths[maxWidth],
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
};


