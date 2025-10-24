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

export const CardHeader: React.FC<CardProps> = ({ children, ...props }) => {
  const style = {
    padding: `${spacing.md} ${spacing.md} 0 ${spacing.md}`,
  };

  return (
    <div style={style} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardProps> = ({ children, ...props }) => {
  const style = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: colors.text.primary,
    margin: 0,
  };

  return (
    <h3 style={style} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<CardProps> = ({ children, ...props }) => {
  const style = {
    fontSize: '0.875rem',
    color: colors.text.secondary,
    margin: `${spacing.xs} 0 0 0`,
  };

  return (
    <p style={style} {...props}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, ...props }) => {
  const style = {
    padding: spacing.md,
  };

  return (
    <div style={style} {...props}>
      {children}
    </div>
  );
};