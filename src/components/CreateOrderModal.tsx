
import { useState, useEffect } from 'react';
import { Order, User } from '../types/models';
import { UnifiedModal, UnifiedInput, UnifiedTextarea, UnifiedSelect, UnifiedButton, UnifiedModalFooter } from './common/UnifiedModal';
import { SUPPORTED_BRANDS, COMMON_ISSUES, DEVICE_TYPES } from '../utils/brands';
import { searchModels } from '../utils/appleModels';

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
    brand: '',
    deviceType: 'smartphone' as const,
    device: '',
    budget: '',
    issue: '',
    urgency: 'medium' as const,
    location: currentUser.city || '',
    clientPhone: currentUser.phone || '',
    clientEmail: currentUser.email || '',
    imei: '',
    serialNumber: ''
  });

  const [availableModels, setAvailableModels] = useState<string[]>([]);

  useEffect(() => {
    if (formData.brand === 'apple' && formData.deviceType) {
      const categoryMap: Record<string, any> = {
        'smartphone': 'iPhone',
        'tablet': 'iPad',
        'laptop': 'MacBook',
        'desktop': 'Mac',
        'watch': 'AppleWatch',
        'earphones': 'AirPods'
      };
      
      const category = categoryMap[formData.deviceType];
      if (category) {
        const models = searchModels('').filter(m => m.category === category);
        setAvailableModels(models.map(m => m.name));
      } else {
        setAvailableModels([]);
      }
    } else if (formData.brand) {
      const brand = SUPPORTED_BRANDS.find(b => b.id === formData.brand);
      setAvailableModels(brand?.devices || []);
    } else {
      setAvailableModels([]);
    }
  }, [formData.brand, formData.deviceType]);

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
      title: formData.title,
      description: formData.description,
      deviceType: 'iPhone', // За замовчуванням
      device: formData.device,
      brand: formData.brand,
      city: formData.location || currentUser.city,
      budget: parseInt(formData.budget, 10),
      proposalCount: 0,
      issue: formData.issue,
      urgency: formData.urgency,
      clientId: currentUser.id,
      clientName: currentUser.name || currentUser.fullName || '',
      imei: formData.imei || undefined,
      serialNumber: formData.serialNumber || undefined,
      clientPhone: formData.clientPhone,
      clientEmail: formData.clientEmail,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      paymentStatus: 'pending',
      paymentAmount: 0,
      paymentMethod: '',
      escrowId: '',
      paymentDate: new Date(),
      disputeStatus: 'none'
    };

    createOrder(orderData);
    onClose();
  };

  return (
    <UnifiedModal isOpen={isOpen} onClose={onClose} title="Створити нове замовлення" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <UnifiedInput
          label="Назва замовлення"
          name="title"
          placeholder="Наприклад: Ремонт дисплея iPhone"
          required
          value={formData.title}
          onChange={handleInputChange}
        />

        <UnifiedSelect
          label="Тип пристрою"
          name="deviceType"
          required
          value={formData.deviceType}
          onChange={handleInputChange}
          options={[
            { value: '', label: 'Оберіть тип' },
            ...DEVICE_TYPES.map(type => ({ value: type.id, label: type.name }))
          ]}
        />

        <UnifiedSelect
          label="Бренд"
          name="brand"
          required
          value={formData.brand}
          onChange={handleInputChange}
          options={[
            { value: '', label: 'Оберіть бренд' },
            ...SUPPORTED_BRANDS.map(brand => ({ value: brand.id, label: `${brand.logo} ${brand.name}` }))
          ]}
        />

        {availableModels.length > 0 ? (
          <UnifiedSelect
            label="Модель пристрою"
            name="device"
            required
            value={formData.device}
            onChange={handleInputChange}
            options={[
              { value: '', label: 'Оберіть модель' },
              ...availableModels.map(model => ({ value: model, label: model }))
            ]}
          />
        ) : (
          <UnifiedInput
            label="Модель пристрою"
            name="device"
            placeholder="Введіть модель"
            required
            value={formData.device}
            onChange={handleInputChange}
          />
        )}

        <UnifiedInput
          label="Бюджет на ремонт"
          name="budget"
          type="number"
          placeholder="Введіть суму (₴)"
          required
          value={formData.budget}
          onChange={handleInputChange}
        />

        <UnifiedSelect
          label="Тип проблеми"
          name="issue"
          required
          value={formData.issue}
          onChange={handleInputChange}
          options={[
            { value: '', label: 'Оберіть проблему' },
            ...COMMON_ISSUES.map(issue => ({ value: issue.name, label: `${issue.icon} ${issue.name}` }))
          ]}
        />

        <UnifiedTextarea
          label="Опис проблеми"
          name="description"
          rows={4}
          placeholder="Детально опишіть проблему..."
          required
          value={formData.description}
          onChange={handleInputChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <UnifiedInput
            label="IMEI (за потреби)"
            name="imei"
            placeholder="000000000000000"
            value={formData.imei}
            onChange={handleInputChange}
          />

          <UnifiedInput
            label="Серійний номер (за потреби)"
            name="serialNumber"
            placeholder="SNXXXXXXXXXX"
            value={formData.serialNumber}
            onChange={handleInputChange}
          />
        </div>

        <UnifiedModalFooter>
          <UnifiedButton variant="outline" type="button" onClick={onClose}>
            Скасувати
          </UnifiedButton>
          <UnifiedButton variant="primary" type="submit">
            Створити замовлення
          </UnifiedButton>
        </UnifiedModalFooter>
      </form>
    </UnifiedModal>
  );
}
