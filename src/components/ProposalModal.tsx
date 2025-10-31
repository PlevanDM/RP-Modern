import { useState, useEffect } from 'react';
import { Order, User, Proposal } from '../types/models';
import { Modal } from './ui/modal';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (proposalData: Partial<Proposal>) => void;
  order: Order;
  currentUser: User;
}

export function ProposalModal({ isOpen, onClose, onSubmit, order, currentUser }: ProposalModalProps) {
  const [formData, setFormData] = useState({
    price: '',
    description: '',
    estimatedDays: '1',
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({ price: '', description: '', estimatedDays: '1' });
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onSubmit({
      price: parseFloat(formData.price),
      description: formData.description,
      estimatedDays: parseInt(formData.estimatedDays, 10),
      masterId: currentUser.id,
      masterName: currentUser.name,
      masterRating: currentUser.rating,
      status: 'pending',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Разместить предложение">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Замовлення</label>
            <p className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100">{order.title}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ціна ($)</label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Кількість днів</label>
            <Input
              type="number"
              value={formData.estimatedDays}
              onChange={(e) => setFormData({ ...formData, estimatedDays: e.target.value })}
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Опис роботи</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Поясніть як ви виконаєте роботу..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-24"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="w-full">
              Розмістити
            </Button>
            <Button onClick={onClose} variant="outline" className="w-full">
              Скасувати
            </Button>
          </div>
        </div>
    </Modal>
  );
}
