import React from 'react';
import { colors } from './DesignSystem';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children, ...props }) => {
  const style = {
    minWidth: '100%',
    borderCollapse: 'collapse',
    divideY: 'divide-gray-200',
  };

  return (
    <table
      style={style}
      {...props}
    >
      {children}
    </table>
  );
};
