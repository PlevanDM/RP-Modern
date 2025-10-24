import React from 'react';
import { colors, spacing } from './DesignSystem';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  const style = {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  };

  return (
    <div
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};
