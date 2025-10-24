import React from 'react';
import { colors, sizes } from './DesignSystem';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  const style = {
    backgroundColor: colors[variant],
    fontSize: sizes[size],
    color: colors.text.primary,
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: 'none',
  };

  return (
    <button
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};
