import React from 'react';
import { Plus, FileText, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickActionsProps {
  onCreateOrder?: () => void;
  onOpenOrders?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateOrder,
  onOpenOrders,
  onSettings,
  onLogout,
}) => {
  const actions = [
    {
      icon: Plus,
      label: 'Нове замовлення',
      color: 'bg-green-500 hover:bg-green-600',
      onClick: onCreateOrder,
    },
    {
      icon: FileText,
      label: 'Мої замовлення',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: onOpenOrders,
    },
    {
      icon: Settings,
      label: 'Налаштування',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: onSettings,
    },
    {
      icon: LogOut,
      label: 'Вихід',
      color: 'bg-red-500 hover:bg-red-600',
      onClick: onLogout,
    },
  ];

  return (
    <div className="flex gap-2">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          className={`p-2 text-white rounded-lg transition ${action.color}`}
          onClick={action.onClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          title={action.label}
        >
          <action.icon className="w-5 h-5" />
        </motion.button>
      ))}
    </div>
  );
};
