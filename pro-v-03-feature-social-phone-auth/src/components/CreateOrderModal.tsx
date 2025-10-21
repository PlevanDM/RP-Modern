import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { Order, User } from '../types/models';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderData: Partial<Order>) => void;
  currentUser: User;
  initialData?: Partial<Order>;
}

export function CreateOrderModal({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
  initialData,
}: CreateOrderModalProps) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Створити нове замовлення</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <CloseIcon sx={{ fontSize: 28 }} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Основная информация */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Назва замовлення *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Наприклад: Заміна екрану iPhone 15"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип пристрою *
                </label>
                <select
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="iPhone">iPhone</option>
                  <option value="iPad">iPad</option>
                  <option value="Mac">Mac</option>
                  <option value="Apple Watch">Apple Watch</option>
                  <option value="Other">Інше</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Проблема *
                </label>
                <select
                  name="issue"
                  value={formData.issue}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Оберіть проблему</option>
                  <option value="Пошкодження екрану">Пошкодження екрану</option>
                  <option value="Проблема з батареєю">Проблема з батареєю</option>
                  <option value="Пошкодження від рідини">Пошкодження від рідини</option>
                  <option value="Несправність обладнання">Несправність апаратури</option>
                  <option value="Software Issue">Проблема з програмним забезпеченням</option>
                  <option value="Other">Інше</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Терміновість
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="low">🟢 Не терміно</option>
                  <option value="medium">🟡 Звичайно</option>
                  <option value="high">🔴 Терміно</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Опис проблеми *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="Детально опишіть проблему з вашим пристроєм..."
                required
              />
            </div>

            {/* Контактная информация */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Місцезнаходження
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Київ, вул. Хрещатик, 22"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="+380501234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            {/* Загрузка фото */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Фото устройства */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Фото пристрою
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, 'device')}
                    className="hidden"
                    id="device-photos"
                  />
                  <label
                    htmlFor="device-photos"
                    className="cursor-pointer flex flex-col items-center justify-center py-4"
                  >
                    <PhotoCameraIcon sx={{ fontSize: 48 }} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Натисніть для завантаження фото пристрою</span>
                  </label>
                  
                  {devicePhotos.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {devicePhotos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={photo}
                            alt={`Device ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index, 'device')}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Фото дефекта */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Фото дефекту
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, 'defect')}
                    className="hidden"
                    id="defect-photos"
                  />
                  <label
                    htmlFor="defect-photos"
                    className="cursor-pointer flex flex-col items-center justify-center py-4"
                  >
                    <PhotoCameraIcon sx={{ fontSize: 48 }} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Натисніть для завантаження фото дефекту</span>
                  </label>
                  
                  {defectPhotos.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {defectPhotos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={photo}
                            alt={`Defect ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index, 'defect')}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Скасувати
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.title || !formData.description}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Створення...' : 'Створити замовлення'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
