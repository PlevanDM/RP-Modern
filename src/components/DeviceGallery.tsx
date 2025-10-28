import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DeviceModel } from '../types/models';
import { devicePhotoService } from '../services/devicePhotoService';
import { SUPPORTED_BRANDS } from '../utils/brands';
import {
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Laptop as LaptopIcon,
  Watch as WatchIcon,
  Apple as AppleIcon,
  Android as AndroidIcon,
  Storage as StorageIcon,
  ChevronRight as ChevronRightIcon,
  NavigateBefore as NavigateBeforeIcon,
  Palette as PaletteIcon,
  PhoneAndroid as SamsungIconComponent,
  Google as GoogleIcon,
  ViewComfy as GridViewIcon,
  ViewAgenda as ListViewIcon,
} from '@mui/icons-material';

interface DeviceGalleryProps {
  onDeviceSelect?: (device: DeviceModel) => void;
  selectedCategory?: DeviceModel['category'];
  isMaster?: boolean;
  className?: string;
}

export default function DeviceGallery({
  onDeviceSelect,
  className = ''
}: DeviceGalleryProps) {
  const [step, setStep] = useState<'brand' | 'category' | 'model'>('brand');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategoryState, setSelectedCategoryState] = useState<DeviceModel['category'] | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'icons'>('grid');

  // Получаем устройства
  const allDevices = devicePhotoService.getAllDeviceModels();

  // Получаем уникальные бренды - спочатку з SUPPORTED_BRANDS
  const brands = useMemo(() => {
    // Беремо всі бренди з SUPPORTED_BRANDS для відображення
    const allSupportedBrands = SUPPORTED_BRANDS.map(b => b.name);
    // Додаємо бренди з бази даних, якщо їх немає в SUPPORTED_BRANDS
    const databaseBrands = new Set(allDevices.map(device => device.brand));
    const uniqueBrands = new Set([...allSupportedBrands, ...databaseBrands]);
    return Array.from(uniqueBrands).sort();
  }, [allDevices]);

  // Получаем категории для выбранного бренда
  const categories = useMemo(() => {
    if (!selectedBrand) return [];
    const categorySet = new Set(
      allDevices
        .filter(device => device.brand === selectedBrand)
        .map(device => device.category)
    );
    return Array.from(categorySet).sort();
  }, [selectedBrand, allDevices]);

  // Получаем модели для выбранного бренда и категории
  const models = useMemo(() => {
    if (!selectedBrand || !selectedCategoryState) return [];
    return allDevices.filter(
      device => device.brand === selectedBrand && device.category === selectedCategoryState
    );
  }, [selectedBrand, selectedCategoryState, allDevices]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Smartphone':
        return <SmartphoneIcon className="w-16 h-16 text-blue-500" />;
      case 'Tablet':
        return <TabletIcon className="w-16 h-16 text-blue-500" />;
      case 'Laptop':
        return <LaptopIcon className="w-16 h-16 text-blue-500" />;
      case 'Smartwatch':
        return <WatchIcon className="w-16 h-16 text-blue-500" />;
      default:
        return <StorageIcon className="w-16 h-16 text-gray-500" />;
    }
  };

  const getBrandIcon = (brand: string) => {
    const brandLower = brand.toLowerCase();
    switch (brandLower) {
      case 'apple':
        return <AppleIcon className="w-14 h-14 text-gray-700" />;
      case 'samsung':
        return <SamsungIconComponent className="w-14 h-14 text-blue-600" />;
      case 'google':
        return <GoogleIcon className="w-14 h-14 text-green-600" />;
      case 'oneplus':
        return <AndroidIcon className="w-14 h-14" style={{ color: '#F5010C' }} />;
      case 'xiaomi':
        return (
          <svg className="w-14 h-14" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M96 0C43.008 0 0 43.008 0 96s43.008 96 96 96c52.992 0 96-43.008 96-96S148.992 0 96 0z" fill="#FF6900"/>
            <text x="96" y="120" textAnchor="middle" fontSize="48" fontWeight="bold" fill="white">MI</text>
          </svg>
        );
      case 'huawei':
        return (
          <svg className="w-14 h-14" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="96" y="120" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#FF0000">华为</text>
          </svg>
        );
      case 'oppo':
        return (
          <svg className="w-14 h-14" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="96" cy="96" r="80" fill="#46C2CB"/>
            <text x="96" y="120" textAnchor="middle" fontSize="32" fontWeight="bold" fill="white">OPPO</text>
          </svg>
        );
      case 'vivo':
        return (
          <svg className="w-14 h-14" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="96" y="120" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#0071BC">vivo</text>
          </svg>
        );
      case 'realme':
        return (
          <svg className="w-14 h-14" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="96" cy="96" r="80" fill="#FFC107"/>
            <text x="96" y="120" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#000">realme</text>
          </svg>
        );
      case 'asus':
        return (
          <svg className="w-14 h-14" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="96" y="120" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#000">ASUS</text>
          </svg>
        );
      case 'sony':
        return (
          <svg className="w-14 h-14" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="96" y="120" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#000">SONY</text>
          </svg>
        );
      case 'lg':
        return (
          <svg className="w-14 h-14" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="96" y="120" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#A50034">LG</text>
          </svg>
        );
      case 'dyson':
        return <StorageIcon className="w-14 h-14 text-blue-400" />;
      default:
        return <StorageIcon className="w-14 h-14 text-gray-400" />;
    }
  };

  // Функція для отримання кольору бренду
  const getBrandColor = (brand: string) => {
    const brandData = SUPPORTED_BRANDS.find(b => b.name === brand);
    return brandData?.color || '#000000';
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedCategoryState(null);
    setStep('category');
  };

  const handleCategorySelect = (category: DeviceModel['category']) => {
    setSelectedCategoryState(category);
    setStep('model');
  };

  const handleModelSelect = (device: DeviceModel) => {
    if (onDeviceSelect) {
      onDeviceSelect(device);
    }
  };

  const handleBack = () => {
    if (step === 'category') {
      setSelectedBrand(null);
      setStep('brand');
    } else if (step === 'model') {
      setSelectedCategoryState(null);
      setStep('category');
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Заголовок и поиск - улучшенный дизайн */}
      <div className="text-center bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 -mx-4 -mt-6 p-10 rounded-3xl mb-8 shadow-lg border border-purple-200">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
          Каталог пристроїв
        </h2>
        <p className="text-gray-700 text-xl font-semibold">
          {step === 'brand' && 'Виберіть бренд для початку'}
          {step === 'category' && `${selectedBrand} - Виберіть тип пристрою`}
          {step === 'model' && `${selectedBrand} ${selectedCategoryState} - Виберіть модель`}
        </p>
        {/* Progress indicator */}
        <div className="mt-6 flex justify-center gap-2">
          <div className={`h-2 w-12 rounded-full ${step === 'brand' ? 'bg-purple-600' : 'bg-gray-300'}`} />
          <div className={`h-2 w-12 rounded-full ${step === 'category' ? 'bg-purple-600' : 'bg-gray-300'}`} />
          <div className={`h-2 w-12 rounded-full ${step === 'model' ? 'bg-purple-600' : 'bg-gray-300'}`} />
        </div>
      </div>

      {/* Навигация по шагам */}
      {step !== 'brand' && (
        <div className="flex gap-2 max-w-4xl mx-auto mb-4">
          <button
            onClick={handleBack}
            className="px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-100 transition-all flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 border border-gray-200"
          >
            <NavigateBeforeIcon className="w-5 h-5" />
            Назад
          </button>
        </div>
      )}

      {/* Шаг 1: Выбор бренда - улучшенный дизайн */}
      {step === 'brand' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {brands.map(brand => {
            const brandDevices = allDevices.filter(d => d.brand === brand);
            const brandData = SUPPORTED_BRANDS.find(b => b.name === brand);
            const deviceCount = brandData ? brandData.devices.length : brandDevices.length;
            
            return (
              <motion.button
                key={brand}
                onClick={() => handleBrandSelect(brand)}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-500 hover:shadow-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 transition-all group relative overflow-hidden"
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                
                <div className="relative z-10 text-6xl mb-4 text-center">
                  {brandData?.logo ? (
                    <span className="text-6xl">{brandData.logo}</span>
                  ) : (
                    getBrandIcon(brand)
                  )}
                </div>
                <p className="font-bold text-gray-900 text-lg mb-3 group-hover:text-purple-600 transition-colors">{brand}</p>
                <div className="text-xs text-gray-500 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1.5 rounded-full font-semibold">
                  {deviceCount} моделей
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Шаг 2: Выбор типа устройства - улучшенный дизайн */}
      {step === 'category' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {categories.map(category => {
            const categoryDevices = allDevices.filter(d => d.brand === selectedBrand && d.category === category);
            return (
              <motion.button
                key={category}
                onClick={() => handleCategorySelect(category as DeviceModel['category'])}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="p-10 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-500 hover:shadow-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 transition-all text-center group relative overflow-hidden"
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                
                <div className="relative z-10 text-7xl mb-5">{getCategoryIcon(category)}</div>
                <p className="font-bold text-gray-900 text-xl mb-3 group-hover:text-purple-600 transition-colors">{category}</p>
                <div className="text-sm text-gray-500 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full font-semibold">
                  {categoryDevices.length} моделей
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Шаг 3: Выбор модели */}
      {step === 'model' && (
        <>
          {/* Переключатель вида */}
          <div className="flex gap-3 max-w-4xl mx-auto mb-4 justify-end">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white shadow-xl shadow-purple-300/50 scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-md hover:shadow-lg'
              }`}
            >
              <GridViewIcon className="w-5 h-5" />
              Сетка
            </button>
            <button
              onClick={() => setViewMode('icons')}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 ${
                viewMode === 'icons'
                  ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white shadow-xl shadow-purple-300/50 scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-md hover:shadow-lg'
              }`}
            >
              <ListViewIcon className="w-5 h-5" />
              Значки
            </button>
          </div>

          {/* Сетка вид */}
          {viewMode === 'grid' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              {models.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Немає моделей для цього бренда і категорії</p>
                </div>
              ) : (
                models.map((device, index) => (
                  <motion.button
                    key={device.id}
                    onClick={() => handleModelSelect(device)}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-500 hover:shadow-xl hover:shadow-purple-200/30 transition-all text-left group relative overflow-hidden"
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-4">
                          {device.name}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <PaletteIcon className="w-4 h-4 text-purple-500" />
                            <span className="font-medium">Кольори:</span>
                            <span className="text-gray-700">{device.colors.join(', ')}</span>
                          </div>
                          {device.storageOptions.length > 0 && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <StorageIcon className="w-4 h-4 text-blue-500" />
                              <span className="font-medium">Пам'ять:</span>
                              <span className="text-gray-700">{device.storageOptions.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 group-hover:translate-x-2 transition-all duration-300 flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg">
                          <ChevronRightIcon className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          )}

          {/* Значки вид */}
          {viewMode === 'icons' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto p-4">
              {models.map(device => (
                <button
                  key={device.id}
                  onClick={() => handleModelSelect(device)}
                  className="group relative p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-xl hover:bg-purple-50 hover:scale-110 transition-all flex flex-col items-center justify-center min-h-[140px]"
                >
                  {/* Tooltip на hover - показывает полное название */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap z-50 font-semibold">
                    {device.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>

                  {/* Иконка устройства - большего размера */}
                  <div className="mb-4 group-hover:scale-125 transition-transform">
                    {device.category === 'Smartphone' ? (
                      <SmartphoneIcon className="w-12 h-12 text-blue-500" />
                    ) : device.category === 'Tablet' ? (
                      <TabletIcon className="w-12 h-12 text-blue-500" />
                    ) : device.category === 'Laptop' ? (
                      <LaptopIcon className="w-12 h-12 text-blue-500" />
                    ) : (
                      <SmartphoneIcon className="w-12 h-12 text-gray-500" />
                    )}
                  </div>

                  {/* Название - только первая часть, остальное в tooltip */}
                  <p className="text-center text-sm font-semibold text-gray-900 group-hover:text-purple-600 break-words w-full">
                    {device.brand === 'Samsung' && device.name.replace('Samsung Galaxy ', '')}
                    {device.brand === 'Google' && device.name.replace('Google Pixel ', '')}
                    {device.brand === 'Apple' && device.name.replace('iPhone ', '').replace('iPad ', '')}
                    {!['Samsung', 'Google', 'Apple'].includes(device.brand) && device.name}
                  </p>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
