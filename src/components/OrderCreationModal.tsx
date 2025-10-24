import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Watch, 
  Camera, 
  Headphones, 
  Gamepad2, 
  Monitor,
  Upload,
  MapPin,
  Clock,
  Camera as CameraIcon,
  FileText,
  Video,
  Send,
  X
} from 'lucide-react';

interface OrderCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderData: any) => void;
  currentUser: any;
}

interface DeviceType {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  category: string;
  brands: string[];
}

interface RepairType {
  id: string;
  name: string;
  description: string;
  estimatedPrice: { min: number; max: number };
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const OrderCreationModal: React.FC<OrderCreationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    deviceType: '',
    brand: '',
    model: '',
    repairType: '',
    description: '',
    urgency: 'normal' as 'urgent' | 'normal' | 'flexible',
    budget: { min: 0, max: 0 },
    location: '',
    preferredTime: '',
    photos: [] as File[],
    videos: [] as File[],
    documents: [] as File[]
  });

  const deviceTypes: DeviceType[] = [
    { id: 'smartphone', name: 'Смартфон', icon: Smartphone, category: 'Мобильные устройства', brands: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus', 'Google', 'Sony', 'LG'] },
    { id: 'laptop', name: 'Ноутбук', icon: Laptop, category: 'Компьютеры', brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Razer'] },
    { id: 'tablet', name: 'Планшет', icon: Tablet, category: 'Мобильные устройства', brands: ['Apple', 'Samsung', 'Huawei', 'Lenovo', 'Microsoft', 'Amazon'] },
    { id: 'smartwatch', name: 'Умные часы', icon: Watch, category: 'Носимые устройства', brands: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Huawei', 'Amazfit'] },
    { id: 'camera', name: 'Камера', icon: Camera, category: 'Фото/Видео', brands: ['Canon', 'Nikon', 'Sony', 'Panasonic', 'Fujifilm', 'Olympus'] },
    { id: 'headphones', name: 'Наушники', icon: Headphones, category: 'Аудио', brands: ['Apple', 'Sony', 'Bose', 'Sennheiser', 'Audio-Technica', 'JBL'] },
    { id: 'gaming', name: 'Игровая консоль', icon: Gamepad2, category: 'Игры', brands: ['Sony', 'Microsoft', 'Nintendo', 'Steam', 'Valve'] },
    { id: 'monitor', name: 'Монитор', icon: Monitor, category: 'Периферия', brands: ['Samsung', 'LG', 'Dell', 'ASUS', 'Acer', 'BenQ', 'ViewSonic'] }
  ];

  const repairTypes: RepairType[] = [
    { id: 'screen', name: 'Замена экрана', description: 'Ремонт или замена поврежденного дисплея', estimatedPrice: { min: 2000, max: 15000 }, estimatedTime: '1-3 дня', difficulty: 'medium' },
    { id: 'battery', name: 'Замена батареи', description: 'Замена изношенной или неисправной батареи', estimatedPrice: { min: 1500, max: 8000 }, estimatedTime: '1-2 дня', difficulty: 'easy' },
    { id: 'water', name: 'Устранение попадания воды', description: 'Чистка и ремонт после попадания жидкости', estimatedPrice: { min: 3000, max: 12000 }, estimatedTime: '2-5 дней', difficulty: 'hard' },
    { id: 'software', name: 'Проблемы с ПО', description: 'Переустановка системы, восстановление данных', estimatedPrice: { min: 1000, max: 5000 }, estimatedTime: '1-2 дня', difficulty: 'easy' },
    { id: 'charging', name: 'Ремонт зарядки', description: 'Замена разъема зарядки или ремонт цепи питания', estimatedPrice: { min: 2000, max: 6000 }, estimatedTime: '1-2 дня', difficulty: 'medium' },
    { id: 'camera', name: 'Ремонт камеры', description: 'Замена или ремонт камеры устройства', estimatedPrice: { min: 2500, max: 10000 }, estimatedTime: '1-3 дня', difficulty: 'medium' },
    { id: 'speaker', name: 'Ремонт динамика', description: 'Замена или ремонт динамиков и микрофона', estimatedPrice: { min: 1500, max: 5000 }, estimatedTime: '1-2 дня', difficulty: 'easy' },
    { id: 'motherboard', name: 'Ремонт материнской платы', description: 'Диагностика и ремонт системной платы', estimatedPrice: { min: 5000, max: 25000 }, estimatedTime: '3-7 дней', difficulty: 'hard' }
  ];

  const handleFileUpload = (files: FileList, type: 'photos' | 'videos' | 'documents') => {
    const newFiles = Array.from(files);
    setOrderData(prev => ({
      ...prev,
      [type]: [...prev[type], ...newFiles]
    }));
  };

  const handleRemoveFile = (index: number, type: 'photos' | 'videos' | 'documents') => {
    setOrderData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    const order = {
      id: `order_${Date.now()}`,
      ...orderData,
      clientId: currentUser.id,
      clientName: currentUser.name,
      status: 'pending',
      createdAt: new Date(),
      proposals: [],
      estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    };
    
    onSubmit(order);
    onClose();
    setCurrentStep(1);
    setOrderData({
      deviceType: '',
      brand: '',
      model: '',
      repairType: '',
      description: '',
      urgency: 'normal',
      budget: { min: 0, max: 0 },
      location: '',
      preferredTime: '',
      photos: [],
      videos: [],
      documents: []
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'normal': return 'text-blue-600 bg-blue-100';
      case 'flexible': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Создание заказа</h2>
                <p className="text-blue-100">Шаг {currentStep} из 4</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full ${
                      step <= currentStep ? 'bg-white' : 'bg-white bg-opacity-30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Step 1: Device Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Выберите тип устройства
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {deviceTypes.map((device) => {
                    const Icon = device.icon;
                    return (
                      <motion.button
                        key={device.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setOrderData(prev => ({ ...prev, deviceType: device.id }))}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          orderData.deviceType === device.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                        }`}
                      >
                        <Icon className="w-8 h-8 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {device.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {device.category}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>

                {orderData.deviceType && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Выберите бренд
                    </h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {deviceTypes.find(d => d.id === orderData.deviceType)?.brands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() => setOrderData(prev => ({ ...prev, brand }))}
                          className={`p-3 rounded-lg border transition-all ${
                            orderData.brand === brand
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Модель устройства
                      </label>
                      <input
                        type="text"
                        value={orderData.model}
                        onChange={(e) => setOrderData(prev => ({ ...prev, model: e.target.value }))}
                        placeholder="Например: iPhone 15 Pro, MacBook Air M2"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Repair Type */}
            {currentStep === 2 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Выберите тип ремонта
                </h3>
                
                <div className="space-y-4">
                  {repairTypes.map((repair) => (
                    <motion.button
                      key={repair.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setOrderData(prev => ({ ...prev, repairType: repair.id }))}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        orderData.repairType === repair.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {repair.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {repair.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              ₴{repair.estimatedPrice.min} - ₴{repair.estimatedPrice.max}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {repair.estimatedTime}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(repair.difficulty)}`}>
                              {repair.difficulty === 'easy' ? 'Легко' : 
                               repair.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Описание проблемы
                  </label>
                  <textarea
                    value={orderData.description}
                    onChange={(e) => setOrderData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Опишите подробно, что случилось с устройством..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Дополнительные детали
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Срочность
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'urgent', label: 'Срочно', description: 'Нужно в течение дня' },
                        { value: 'normal', label: 'Обычно', description: 'В течение недели' },
                        { value: 'flexible', label: 'Не спешу', description: 'Когда будет удобно' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setOrderData(prev => ({ ...prev, urgency: option.value as any }))}
                          className={`w-full p-3 rounded-lg border text-left transition-all ${
                            orderData.urgency === option.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {option.label}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {option.description}
                              </p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${getUrgencyColor(option.value)}`}>
                              {option.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Бюджет
                    </label>
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          placeholder="От"
                          value={orderData.budget.min || ''}
                          onChange={(e) => setOrderData(prev => ({ 
                            ...prev, 
                            budget: { ...prev.budget, min: parseInt(e.target.value) || 0 }
                          }))}
                          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                        <input
                          type="number"
                          placeholder="До"
                          value={orderData.budget.max || ''}
                          onChange={(e) => setOrderData(prev => ({ 
                            ...prev, 
                            budget: { ...prev.budget, max: parseInt(e.target.value) || 0 }
                          }))}
                          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Укажите диапазон бюджета для ремонта
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Местоположение
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={orderData.location}
                        onChange={(e) => setOrderData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Город, район"
                        className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Предпочтительное время
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={orderData.preferredTime}
                        onChange={(e) => setOrderData(prev => ({ ...prev, preferredTime: e.target.value }))}
                        placeholder="Утром, вечером, выходные"
                        className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Media Upload */}
            {currentStep === 4 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Добавьте фото и документы
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Photos */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                      <CameraIcon className="w-5 h-5 mr-2" />
                      Фотографии
                    </h4>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'photos')}
                        className="hidden"
                        id="photos-upload"
                      />
                      <label htmlFor="photos-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Загрузить фото
                        </p>
                      </label>
                    </div>
                    <div className="space-y-2">
                      {orderData.photos.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-gray-900 dark:text-white truncate">
                            {file.name}
                          </span>
                          <button
                            onClick={() => handleRemoveFile(index, 'photos')}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Videos */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                      <Video className="w-5 h-5 mr-2" />
                      Видео
                    </h4>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept="video/*"
                        onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'videos')}
                        className="hidden"
                        id="videos-upload"
                      />
                      <label htmlFor="videos-upload" className="cursor-pointer">
                        <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Загрузить видео
                        </p>
                      </label>
                    </div>
                    <div className="space-y-2">
                      {orderData.videos.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-gray-900 dark:text-white truncate">
                            {file.name}
                          </span>
                          <button
                            onClick={() => handleRemoveFile(index, 'videos')}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Документы
                    </h4>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'documents')}
                        className="hidden"
                        id="documents-upload"
                      />
                      <label htmlFor="documents-upload" className="cursor-pointer">
                        <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Загрузить документы
                        </p>
                      </label>
                    </div>
                    <div className="space-y-2">
                      {orderData.documents.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-gray-900 dark:text-white truncate">
                            {file.name}
                          </span>
                          <button
                            onClick={() => handleRemoveFile(index, 'documents')}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Назад
            </button>
            
            <div className="flex space-x-2">
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Далее
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Создать заказ
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
