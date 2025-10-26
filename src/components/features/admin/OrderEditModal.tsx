import React, { useState } from 'react';
import { Order } from '../../../types/models';
import { AdminButton, AdminInput, AdminSelect } from './AdminDesignSystem';
import { X } from 'lucide-react';

interface OrderEditModalProps {
  order: Order;
  onClose: () => void;
  onSave: (order: Order) => void;
  loading: boolean;
}

export const OrderEditModal: React.FC<OrderEditModalProps> = ({ order, onClose, onSave, loading }) => {
  const [editedOrder, setEditedOrder] = useState(order);

  const handleChange = (field: string, value: string | number) => {
    setEditedOrder(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedOrder);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Редагувати замовлення</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Назва</label>
              <AdminInput 
                placeholder="Назва замовлення" 
                value={editedOrder.title} 
                onChange={(value) => handleChange('title', value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Опис</label>
              <textarea
                value={editedOrder.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Статус</label>
                <AdminSelect
                  options={[
                    { value: 'open', label: 'Відкрито' },
                    { value: 'proposed', label: 'Є пропозиції' },
                    { value: 'accepted', label: 'Прийнято' },
                    { value: 'in_progress', label: 'В роботі' },
                    { value: 'completed', label: 'Завершено' },
                    { value: 'cancelled', label: 'Скасовано' },
                  ]}
                  value={editedOrder.status}
                  onChange={(value) => handleChange('status', value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Терміновість</label>
                <AdminSelect
                  options={[
                    { value: 'low', label: 'Низька' },
                    { value: 'medium', label: 'Середня' },
                    { value: 'high', label: 'Висока' },
                  ]}
                  value={editedOrder.urgency}
                  onChange={(value) => handleChange('urgency', value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <AdminButton type="button" variant="ghost" onClick={onClose}>Скасувати</AdminButton>
            <AdminButton type="submit" variant="primary" disabled={loading}>
              {loading ? 'Збереження...' : 'Зберегти'}
            </AdminButton>
          </div>
        </form>
      </div>
    </div>
  );
};
