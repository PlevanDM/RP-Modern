
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Order, User } from '../types/models';
import { UnifiedModal, UnifiedButton, UnifiedModalFooter } from './common/UnifiedModal';
import { FormField, FormSection } from './common/FormField';
import { SUPPORTED_BRANDS, COMMON_ISSUES, DEVICE_TYPES } from '../utils/brands';
import { searchModels } from '../utils/appleModels';
import { User as UserIcon, Mail, Phone, MapPin, Smartphone, DollarSign, FileText } from 'lucide-react';

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
  const { t } = useTranslation();
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
      const categoryMap: Record<string, string> = {
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

  // handleInputChange is defined but not used - keeping for potential future use
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData: Omit<Order, 'id'> = {
      title: formData.title,
      description: formData.description,
      deviceType: formData.deviceType || 'smartphone',
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

  // Валідація полів
  const validateTitle = (value: string | number): string | null => {
    const str = String(value).trim();
    if (str.length < 3) return 'Назва замовлення повинна містити мінімум 3 символи';
    if (str.length > 100) return 'Назва замовлення не може перевищувати 100 символів';
    return null;
  };

  const validateDescription = (value: string | number): string | null => {
    const str = String(value).trim();
    if (str.length < 10) return 'Опишіть проблему детальніше (мінімум 10 символів)';
    if (str.length > 1000) return 'Опис не може перевищувати 1000 символів';
    return null;
  };

  const validateEmail = (value: string | number): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const str = String(value).trim();
    if (str && !emailRegex.test(str)) {
      return 'Вкажіть правильний e-mail (приклад: name@gmail.com)';
    }
    return null;
  };

  const validatePhone = (value: string | number): string | null => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    const str = String(value).replace(/\s/g, '');
    if (str && !phoneRegex.test(str)) {
      return 'Вкажіть правильний номер телефону (приклад: +380501234567)';
    }
    return null;
  };

  const validateBudget = (value: string | number): string | null => {
    const num = Number(value);
    if (num < 0) return 'Бюджет не може бути від\'ємним';
    if (num > 1000000) return 'Бюджет не може перевищувати 1 000 000 грн';
    return null;
  };

  return (
    <UnifiedModal isOpen={isOpen} onClose={onClose} title="Створити замовлення на ремонт" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Заголовок та опис форми */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700">
            Заповніть поля нижче, щоб створити заявку на ремонт пристрою. Всі обов'язкові поля позначені <span className="text-red-500 font-semibold">*</span>.
          </p>
        </div>

        {/* Контактні дані */}
        <FormSection
          title="Контактні дані"
          description="Ваша контактна інформація для зв'язку"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Ім'я"
              name="clientName"
              type="text"
              value={currentUser.name || ''}
              onChange={() => {}}
              placeholder="Іван Петров"
              required
              icon={<UserIcon className="w-4 h-4" />}
              validate={(v) => {
                const str = String(v).trim();
                if (!str) return 'Вкажіть ваше ім\'я';
                if (str.length < 2) return 'Ім\'я повинно містити мінімум 2 символи';
                return null;
              }}
            />

            <FormField
              label="Телефон"
              name="clientPhone"
              type="tel"
              value={formData.clientPhone}
              onChange={(v) => setFormData({ ...formData, clientPhone: String(v) })}
              placeholder="+380 50 123 45 67"
              required
              icon={<Phone className="w-4 h-4" />}
              validate={validatePhone}
              helperText="Формат: +380XXXXXXXXX"
            />

            <FormField
              label="E-mail"
              name="clientEmail"
              type="email"
              value={formData.clientEmail}
              onChange={(v) => setFormData({ ...formData, clientEmail: String(v) })}
              placeholder="ivan@email.ua"
              required
              icon={<Mail className="w-4 h-4" />}
              validate={validateEmail}
              helperText="Використовується для повідомлень про статус замовлення"
            />

            <FormField
              label="Місто"
              name="location"
              type="text"
              value={formData.location}
              onChange={(v) => setFormData({ ...formData, location: String(v) })}
              placeholder="Київ"
              required
              icon={<MapPin className="w-4 h-4" />}
            />
          </div>
        </FormSection>

        {/* Інформація про пристрій */}
        <FormSection
          title="Інформація про пристрій"
          description="Деталі про пристрій, який потрібно відремонтувати"
        >
          <FormField
            label="Тип пристрою"
            name="deviceType"
            type="select"
            value={formData.deviceType}
            onChange={(v) => {
              const newValue = String(v);
              setFormData({ ...formData, deviceType: newValue as 'smartphone' | 'tablet' | 'laptop' | 'other' });
            }}
            placeholder="Оберіть тип..."
            required
            icon={<Smartphone className="w-4 h-4" />}
            helperText="Оберіть тип пристрою зі списку"
            options={[
              { value: '', label: 'Оберіть тип...' },
              ...DEVICE_TYPES.map(type => ({ value: type.id, label: type.name }))
            ]}
          />

          <FormField
            label="Бренд"
            name="brand"
            type="select"
            value={formData.brand}
            onChange={(v) => setFormData({ ...formData, brand: String(v) })}
            placeholder="Оберіть бренд..."
            required
            options={[
              { value: '', label: 'Оберіть бренд...' },
              ...SUPPORTED_BRANDS.map(brand => ({ value: brand.id, label: brand.name }))
            ]}
          />

          {availableModels.length > 0 ? (
            <FormField
              label="Модель пристрою"
              name="device"
              type="select"
              value={formData.device}
              onChange={(v) => setFormData({ ...formData, device: String(v) })}
              placeholder="Оберіть модель..."
              required
              options={[
                { value: '', label: 'Оберіть модель...' },
                ...availableModels.map(model => ({ value: model, label: model }))
              ]}
            />
          ) : (
            <FormField
              label="Модель пристрою"
              name="device"
              type="text"
              value={formData.device}
              onChange={(v) => setFormData({ ...formData, device: String(v) })}
              placeholder="iPhone 14"
              required
              validate={(v) => {
                const str = String(v).trim();
                if (!str) return 'Вкажіть модель пристрою';
                return null;
              }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="IMEI"
              name="imei"
              type="text"
              value={formData.imei}
              onChange={(v) => setFormData({ ...formData, imei: String(v) })}
              placeholder="0123456789ABC"
              hint="IMEI можна знайти в налаштуваннях пристрою. Для Apple-пристроїв: Налаштування → Загальні → Про цей пристрій"
            />

            <FormField
              label="Серійний номер"
              name="serialNumber"
              type="text"
              value={formData.serialNumber}
              onChange={(v) => setFormData({ ...formData, serialNumber: String(v) })}
              placeholder="SNXXXXXXXXXX"
            />
          </div>
        </FormSection>

        {/* Опис проблеми */}
        <FormSection
          title="Опис проблеми"
          description="Детально опишіть, що сталося з пристроєм та як проявляється несправність"
        >
          <FormField
            label="Назва замовлення"
            name="title"
            type="text"
            value={formData.title}
            onChange={(v) => setFormData({ ...formData, title: String(v) })}
            placeholder="Ремонт дисплея iPhone 14"
            required
            validate={validateTitle}
            helperText="Короткий опис проблеми (3-100 символів)"
          />

          <FormField
            label="Тип проблеми"
            name="issue"
            type="select"
            value={formData.issue}
            onChange={(v) => setFormData({ ...formData, issue: String(v) })}
            placeholder="Оберіть тип..."
            required
            options={[
              { value: '', label: 'Оберіть тип проблеми...' },
              ...COMMON_ISSUES.map(issue => ({ value: issue.name, label: `${issue.icon} ${issue.name}` }))
            ]}
          />

          <FormField
            label="Детальний опис"
            name="description"
            type="textarea"
            rows={5}
            value={formData.description}
            onChange={(v) => setFormData({ ...formData, description: String(v) })}
            placeholder="Підробно опишіть, що сталося з пристроєм і як проявляється несправність. Наприклад: 'Дисплей не реагує на дотики, на екрані з'явилася тріщина після падіння. Пристрій вмикається, але сенсор не працює.'"
            required
            validate={validateDescription}
            icon={<FileText className="w-4 h-4" />}
            helperText="Чим детальніше опис, тим точніше майстер зможе оцінити роботу"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Бюджет ремонту"
              name="budget"
              type="number"
              value={formData.budget}
              onChange={(v) => setFormData({ ...formData, budget: String(v) })}
              placeholder="2500"
              unit="грн"
              required
              icon={<DollarSign className="w-4 h-4" />}
              validate={validateBudget}
              helperText="Вкажіть бажану суму ремонту в гривнях"
            />

            <FormField
              label="Терміновість"
              name="urgency"
              type="select"
              value={formData.urgency}
              onChange={(v) => setFormData({ ...formData, urgency: String(v) as 'low' | 'medium' | 'high' })}
              placeholder="Середня"
              options={[
                { value: 'low', label: 'Низька' },
                { value: 'medium', label: 'Середня' },
                { value: 'high', label: 'Висока' }
              ]}
            />
          </div>
        </FormSection>

        <UnifiedModalFooter>
          <UnifiedButton variant="outline" type="button" onClick={onClose}>
            {t('common.cancel')}
          </UnifiedButton>
          <UnifiedButton variant="primary" type="submit">
            Створити замовлення
          </UnifiedButton>
        </UnifiedModalFooter>
      </form>
    </UnifiedModal>
  );
}
