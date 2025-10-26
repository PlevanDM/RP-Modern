import React from 'react';
import { cn } from '../../lib/utils';

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <label 
      className={cn("block text-sm font-medium text-gray-700", className)}
      {...props}
    >
      {children}
    </label>
  );
};

