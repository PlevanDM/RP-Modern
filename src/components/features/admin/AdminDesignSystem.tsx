// Admin Design System - Unified components for all admin panels
import React from 'react';
import { LucideIcon } from 'lucide-react';

// Base Card Component
export const AdminCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}> = ({ children, className = '', hover = true }) => (
  <div className={`
    bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
    rounded-xl shadow-sm transition-all duration-300
    ${hover ? 'hover:shadow-lg hover:-translate-y-1' : ''}
    ${className}
  `}>
    {children}
  </div>
);

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
  <AdminCard className="p-6 cursor-pointer group">
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
  </AdminCard>
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

// Activity Item Component
export const ActivityItem: React.FC<{
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
  status: 'success' | 'warning' | 'error' | 'info';
}> = ({ icon: Icon, title, description, time, status }) => {
  const statusColors = {
    success: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
  };

  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <div className={`p-2 rounded-full ${statusColors[status]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{time}</span>
    </div>
  );
};

// Table Component
export const AdminTable: React.FC<{
  headers: string[];
  children: React.ReactNode;
  className?: string;
}> = ({ headers, children, className = '' }) => (
  <div className={`overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {children}
        </tbody>
      </table>
    </div>
  </div>
);

// Table Row Component
export const TableRow: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <tr className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${className}`}>
    {children}
  </tr>
);

// Table Cell Component
export const TableCell: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white ${className}`}>
    {children}
  </td>
);

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

// Button Component
export const AdminButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}> = ({ children, variant = 'primary', size = 'md', onClick, disabled = false, className = '' }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
    ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center rounded-lg font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {children}
    </button>
  );
};

// Input Component
export const AdminInput: React.FC<{
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  className?: string;
}> = ({ placeholder, value, onChange, type = 'text', className = '' }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    className={`
      w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
      rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
      text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500
      ${className}
    `}
  />
);

// Select Component
export const AdminSelect: React.FC<{
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}> = ({ options, value, onChange, placeholder, className = '' }) => (
  <select
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    className={`
      w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
      rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
      text-gray-900 dark:text-white
      ${className}
    `}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

// Progress Bar Component
export const ProgressBar: React.FC<{
  value: number;
  max?: number;
  label?: string;
  className?: string;
}> = ({ value, max = 100, label, className = '' }) => (
  <div className={`w-full ${className}`}>
    {label && (
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{value}%</span>
      </div>
    )}
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  </div>
);

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

export default {
  AdminCard,
  StatCard,
  SectionHeader,
  ActivityItem,
  AdminTable,
  TableRow,
  TableCell,
  Badge,
  AdminButton,
  AdminInput,
  AdminSelect,
  ProgressBar,
  EmptyState
};
