import React from 'react';
import { colors, spacing, sizes } from './DesignSystem';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  const style = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.secondary}`,
    borderRadius: '0.25rem',
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: sizes.md,
    color: colors.text.primary,
    width: '100%',
  };

  return (
    <input
      style={style}
      {...props}
    />
  );
};
