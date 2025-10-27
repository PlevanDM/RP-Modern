import { useState, useMemo } from 'react';
import { DeviceModel } from '../types/models';
import { devicePhotoService } from '../services/devicePhotoService';
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

export function DeviceGallery({
  onDeviceSelect,
  className = ''
}: DeviceGalleryProps) {
  const [step, setStep] = useState<'brand' | 'category' | 'model'>('brand');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategoryState, setSelectedCategoryState] = useState<DeviceModel['category'] | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'icons'>('grid');

  // Получаем устройства
  const allDevices = devicePhotoService.getAllDeviceModels();

  // Получаем уникальные бренды
  const brands = useMemo(() => {
    const brandSet = new Set(allDevices.map(device => device.brand));
    return Array.from(brandSet).sort();
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
    switch (brand) {
      case 'Apple':
        return <AppleIcon className="w-14 h-14 text-gray-700" />;
      case 'Samsung':
        return <SamsungIconComponent className="w-14 h-14 text-blue-600" />;
      case 'Google':
        return <GoogleIcon className="w-14 h-14 text-red-500" />;
      case 'OnePlus':
        return <AndroidIcon className="w-14 h-14 text-red-600" />;
      case 'Xiaomi':
        return <AndroidIcon className="w-14 h-14 text-red-500" />;
      case 'Dyson':
        return <StorageIcon className="w-14 h-14 text-blue-400" />;
      default:
        return <StorageIcon className="w-14 h-14 text-gray-400" />;
    }
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
      {/* Заголовок и поиск */}
      <div className="text-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 -mx-4 -mt-6 p-8 rounded-2xl mb-6">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Каталог пристроїв
        </h2>
        <p className="text-gray-700 text-lg font-medium">
          {step === 'brand' && 'Виберіть бренд для початку'}
          {step === 'category' && `${selectedBrand} - Виберіть тип пристрою`}
          {step === 'model' && `${selectedBrand} ${selectedCategoryState} - Виберіть модель`}
        </p>
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

      {/* Шаг 1: Выбор бренда */}
      {step === 'brand' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {brands.map(brand => {
            const brandDevices = allDevices.filter(d => d.brand === brand);
            return (
              <button
                key={brand}
                onClick={() => handleBrandSelect(brand)}
                className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-xl hover:scale-105 hover:bg-purple-50 transition-all group"
              >
                <div className="text-5xl mb-3 text-center">
                  {getBrandIcon(brand)}
                </div>
                <p className="font-bold text-gray-900 text-base mb-2">{brand}</p>
                <p className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">{brandDevices.length} моделей</p>
              </button>
            );
          })}
        </div>
      )}

      {/* Шаг 2: Выбор типа устройства */}
      {step === 'category' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {categories.map(category => {
            const categoryDevices = allDevices.filter(d => d.brand === selectedBrand && d.category === category);
            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category as DeviceModel['category'])}
                className="p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-xl hover:scale-105 hover:bg-purple-50 transition-all text-center group"
              >
                <div className="text-6xl mb-4">{getCategoryIcon(category)}</div>
                <p className="font-bold text-gray-900 text-lg mb-2">{category}</p>
                <p className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded inline-block">{categoryDevices.length} моделей</p>
              </button>
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
              {models.map((device, index) => (
                <button
                  key={device.id}
                  onClick={() => handleModelSelect(device)}
                  className="w-full p-6 bg-gradient-to-br from-white to-purple-50/30 border-2 border-gray-200 rounded-2xl hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-200/50 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 transition-all text-left group relative overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Градієнтний фон при hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                        {device.name}
                      </h3>
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-gray-600 group-hover:text-gray-800 flex items-center gap-2">
                          <PaletteIcon className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">Кольори:</span>
                          <span className="text-gray-700">{device.colors.join(', ')}</span>
                        </p>
                        <p className="text-sm text-gray-600 group-hover:text-gray-800 flex items-center gap-2">
                          <StorageIcon className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">Пам'ять:</span>
                          <span className="text-gray-700">{device.storageOptions.join(', ')}</span>
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 group-hover:translate-x-2 transition-all duration-300 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg">
                        <ChevronRightIcon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
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
