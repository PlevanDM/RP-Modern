import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdminButton } from './AdminDesignSystem';
import { X } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, title, description }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
        <div className="flex justify-end gap-4">
          <AdminButton variant="ghost" onClick={onClose}>{t('common.cancel')}</AdminButton>
          <AdminButton variant="danger" onClick={onConfirm}>{t('common.confirm')}</AdminButton>
        </div>
      </div>
    </div>
  );
};
