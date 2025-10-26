import React, { useState } from 'react';
import { Order } from '../../../types';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedOrder(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedOrder);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminInput name="client" label="Client" value={editedOrder.client} onChange={handleChange} />
            <AdminInput name="master" label="Master" value={editedOrder.master} onChange={handleChange} />
            <AdminInput name="service" label="Service" value={editedOrder.service} onChange={handleChange} />
            <AdminInput name="price" label="Price" value={editedOrder.price.toString()} onChange={handleChange} type="number" />
            <AdminSelect
              name="status"
              label="Status"
              value={editedOrder.status}
              onChange={handleChange}
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' },
              ]}
            />
            <AdminSelect
              name="priority"
              label="Priority"
              value={editedOrder.priority}
              onChange={handleChange}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
            />
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <AdminButton type="button" variant="ghost" onClick={onClose}>Cancel</AdminButton>
            <AdminButton type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </AdminButton>
          </div>
        </form>
      </div>
    </div>
  );
};
