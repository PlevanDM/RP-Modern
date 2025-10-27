
import { useState } from 'react';
import { Order, User } from '../types/models';
import { Modal } from './ui/modal';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  createOrder: (order: Omit<Order, 'id'>) => void;
  currentUser: User;
}

export function CreateOrderModal({
  isOpen,
  onClose,
  createOrder,
  currentUser,
}: CreateOrderModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deviceType: 'iPhone' as const,
    device: '',
    budget: '',
    issue: '',
    urgency: 'medium' as const,
    location: currentUser.city || '',
    clientPhone: currentUser.phone || '',
    clientEmail: currentUser.email || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData: Omit<Order, 'id'> = {
      ...formData,
      clientId: currentUser.id,
      clientName: currentUser.name || currentUser.fullName || '',
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      device: formData.device,
      city: formData.location || currentUser.city,
      budget: parseInt(formData.budget, 10),
      proposalCount: 0,
      issue: formData.issue,
      urgency: formData.urgency,
      paymentStatus: 'pending',
      paymentAmount: 0,
      paymentMethod: '',
      escrowId: '',
      paymentDate: new Date(),
    };

    createOrder(orderData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Створити нове замовлення">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Назва замовлення"
          required
          value={formData.title}
          onChange={handleInputChange}
        />
        <select
          name="deviceType"
          required
          value={formData.deviceType}
          onChange={handleInputChange}
        >
          <option value="iPhone">iPhone</option>
          <option value="iPad">iPad</option>
          <option value="Mac">Mac</option>
          <option value="Apple Watch">Apple Watch</option>
          <option value="Other">Інше</option>
        </select>
        <Input
          name="device"
          placeholder="Модель пристрою"
          required
          value={formData.device}
          onChange={handleInputChange}
        />
        <Input
          name="budget"
          type="number"
          placeholder="Бюджет"
          required
          value={formData.budget}
          onChange={handleInputChange}
        />
        <select
          name="issue"
          required
          value={formData.issue}
          onChange={handleInputChange}
        >
          <option value="">Оберіть проблему</option>
          <option value="Пошкодження екрану">Пошкодження екрану</option>
          <option value="Проблема з батареєю">Проблема з батареєю</option>
          <option value="Пошкодження від рідини">Пошкодження від рідини</option>
          <option value="Несправність обладнання">Несправність апаратури</option>
          <option value="Software Issue">Проблема з програмним забезпеченням</option>
          <option value="Other">Інше</option>
        </select>
        <textarea
          name="description"
          placeholder="Опис проблеми"
          required
          value={formData.description}
          onChange={handleInputChange}
        />
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Скасувати
          </Button>
          <Button type="submit">
            Створити замовлення
          </Button>
        </div>
      </form>
    </Modal>
  );
}
