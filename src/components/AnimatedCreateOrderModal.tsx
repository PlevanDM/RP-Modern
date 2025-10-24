import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Trash2, Upload, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Order, User } from '../types/models';
import { Modal } from './ui/modal';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface AnimatedCreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderData: Partial<Order>) => void;
  currentUser: User;
  initialData?: Partial<Order>;
}

export function AnimatedCreateOrderModal({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
  initialData,
}: AnimatedCreateOrderModalProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    deviceType: initialData?.deviceType || 'iPhone' as const,
    issue: '',
    urgency: 'medium' as const,
    location: '',
    clientPhone: '',
    clientEmail: ''
  });

  const [devicePhotos, setDevicePhotos] = useState<string[]>([]);
  const [defectPhotos, setDefectPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'device' | 'defect') => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoUrl = event.target?.result as string;
        if (type === 'device') {
          setDevicePhotos(prev => [...prev, photoUrl]);
        } else {
          setDefectPhotos(prev => [...prev, photoUrl]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number, type: 'device' | 'defect') => {
    if (type === 'device') {
      setDevicePhotos(prev => prev.filter((_, i) => i !== index));
    } else {
      setDefectPhotos(prev => prev.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Назва замовлення обов\'язкова';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Опис проблеми обов\'язковий';
    }
    
    if (!formData.issue) {
      newErrors.issue = 'Оберіть проблему';
    }
    
    if (formData.clientPhone && !/^\+380\d{9}$/.test(formData.clientPhone)) {
      newErrors.clientPhone = 'Невірний формат телефону';
    }
    
    if (formData.clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Невірний формат email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const orderData: Partial<Order> = {
      ...formData,
      clientId: currentUser.id,
      clientName: currentUser.name || currentUser.fullName,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      devicePhotos: devicePhotos.length > 0 ? devicePhotos : undefined,
      defectPhotos: defectPhotos.length > 0 ? defectPhotos : undefined,
      location: formData.location || undefined,
      clientPhone: formData.clientPhone || undefined,
      clientEmail: formData.clientEmail || undefined
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit(orderData);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      deviceType: 'iPhone',
      issue: '',
      urgency: 'medium',
      location: '',
      clientPhone: '',
      clientEmail: ''
    });
    setDevicePhotos([]);
    setDefectPhotos([]);
    setErrors({});
  };

  const AnimatedInput = ({ 
    name, 
    label, 
    type = 'text', 
    placeholder, 
    required = false,
    value,
    onChange,
    error
  }: {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  }) => {
    const isFocused = focusedField === name;
    const hasValue = value.length > 0;
    const hasError = !!error;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="relative">
          <Input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
            placeholder={placeholder}
            required={required}
            className={`
              w-full px-4 py-3 border-2 rounded-xl transition-all duration-300
              ${hasError 
                ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                : isFocused || hasValue
                  ? 'border-blue-500 bg-blue-50 focus:border-blue-500 focus:ring-blue-200'
                  : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-200'
              }
            `}
          />
          <motion.label
            className={`
              absolute left-4 transition-all duration-300 pointer-events-none
              ${isFocused || hasValue
                ? 'top-2 text-xs text-blue-600 font-medium'
                : 'top-3 text-sm text-gray-500'
              }
            `}
            animate={{
              y: isFocused || hasValue ? -8 : 0,
              scale: isFocused || hasValue ? 0.85 : 1,
            }}
          >
            {label} {required && '*'}
          </motion.label>
        </div>
        
        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 mt-2 text-red-600 text-sm"
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const AnimatedSelect = ({ 
    name, 
    label, 
    options, 
    required = false,
    value,
    onChange,
    error
  }: {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
  }) => {
    const isFocused = focusedField === name;
    const hasValue = value.length > 0;
    const hasError = !!error;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="relative">
          <select
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
            required={required}
            className={`
              w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 appearance-none
              ${hasError 
                ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                : isFocused || hasValue
                  ? 'border-blue-500 bg-blue-50 focus:border-blue-500 focus:ring-blue-200'
                  : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-200'
              }
            `}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <motion.label
            className={`
              absolute left-4 transition-all duration-300 pointer-events-none
              ${isFocused || hasValue
                ? 'top-2 text-xs text-blue-600 font-medium'
                : 'top-3 text-sm text-gray-500'
              }
            `}
            animate={{
              y: isFocused || hasValue ? -8 : 0,
              scale: isFocused || hasValue ? 0.85 : 1,
            }}
          >
            {label} {required && '*'}
          </motion.label>
        </div>
        
        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 mt-2 text-red-600 text-sm"
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const PhotoUploadArea = ({ 
    type, 
    photos, 
    onUpload, 
    onRemove 
  }: {
    type: 'device' | 'defect';
    photos: string[];
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (index: number) => void;
  }) => {
    const isDevice = type === 'device';
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <label className="block text-sm font-medium text-gray-700">
          {isDevice ? 'Фото пристрою' : 'Фото дефекту'}
        </label>
        
        <motion.div 
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onUpload}
            className="hidden"
            id={`${type}-photos`}
          />
          <label
            htmlFor={`${type}-photos`}
            className="cursor-pointer flex flex-col items-center justify-center py-8"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Camera size={48} className="text-gray-400 mb-3" />
            </motion.div>
            <span className="text-sm text-gray-600 text-center">
              Натисніть для завантаження {isDevice ? 'фото пристрою' : 'фото дефекту'}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Підтримуються: JPG, PNG, GIF
            </span>
          </label>
        </motion.div>
        
        <AnimatePresence>
          {photos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 gap-3"
            >
              {photos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group"
                >
                  <img
                    src={photo}
                    alt={`${isDevice ? 'Device' : 'Defect'} ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <motion.button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Створити нове замовлення">
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Основная информация */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AnimatedInput
            name="title"
            label="Назва замовлення"
            placeholder="Наприклад: Заміна екрану iPhone 15"
            required
            value={formData.title}
            onChange={handleInputChange}
            error={errors.title}
          />

          <AnimatedSelect
            name="deviceType"
            label="Тип пристрою"
            required
            value={formData.deviceType}
            onChange={handleInputChange}
            options={[
              { value: 'iPhone', label: 'iPhone' },
              { value: 'iPad', label: 'iPad' },
              { value: 'Mac', label: 'Mac' },
              { value: 'Apple Watch', label: 'Apple Watch' },
              { value: 'Other', label: 'Інше' }
            ]}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatedSelect
            name="issue"
            label="Проблема"
            required
            value={formData.issue}
            onChange={handleInputChange}
            error={errors.issue}
            options={[
              { value: '', label: 'Оберіть проблему' },
              { value: 'Пошкодження екрану', label: 'Пошкодження екрану' },
              { value: 'Проблема з батареєю', label: 'Проблема з батареєю' },
              { value: 'Пошкодження від рідини', label: 'Пошкодження від рідини' },
              { value: 'Несправність обладнання', label: 'Несправність апаратури' },
              { value: 'Software Issue', label: 'Проблема з програмним забезпеченням' },
              { value: 'Other', label: 'Інше' }
            ]}
          />

          <AnimatedSelect
            name="urgency"
            label="Терміновість"
            value={formData.urgency}
            onChange={handleInputChange}
            options={[
              { value: 'low', label: '🟢 Не терміно' },
              { value: 'medium', label: '🟡 Звичайно' },
              { value: 'high', label: '🔴 Терміно' }
            ]}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatedInput
            name="description"
            label="Опис проблеми"
            type="textarea"
            placeholder="Детально опишіть проблему з вашим пристроєм..."
            required
            value={formData.description}
            onChange={handleInputChange}
            error={errors.description}
          />
        </motion.div>

        {/* Контактная информация */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatedInput
            name="location"
            label="Місцезнаходження"
            placeholder="Київ, вул. Хрещатик, 22"
            value={formData.location}
            onChange={handleInputChange}
          />

          <AnimatedInput
            name="clientPhone"
            label="Телефон"
            type="tel"
            placeholder="+380501234567"
            value={formData.clientPhone}
            onChange={handleInputChange}
            error={errors.clientPhone}
          />

          <AnimatedInput
            name="clientEmail"
            label="Email"
            type="email"
            placeholder="example@email.com"
            value={formData.clientEmail}
            onChange={handleInputChange}
            error={errors.clientEmail}
          />
        </motion.div>

        {/* Загрузка фото */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <PhotoUploadArea
            type="device"
            photos={devicePhotos}
            onUpload={(e) => handlePhotoUpload(e, 'device')}
            onRemove={(index) => removePhoto(index, 'device')}
          />

          <PhotoUploadArea
            type="defect"
            photos={defectPhotos}
            onUpload={(e) => handlePhotoUpload(e, 'defect')}
            onRemove={(index) => removePhoto(index, 'defect')}
          />
        </motion.div>

        {/* Кнопки */}
        <motion.div 
          className="flex justify-end gap-4 pt-6 border-t"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="px-6 py-3"
          >
            Скасувати
          </Button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.description}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              {isSubmitting ? (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Upload size={16} />
                  </motion.div>
                  Створення...
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <CheckCircle size={16} />
                  Створити замовлення
                </motion.div>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
    </Modal>
  );
}
