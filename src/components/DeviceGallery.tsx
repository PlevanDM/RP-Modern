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
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Каталог пристроїв
        </h2>
        <p className="text-gray-600">
          {step === 'brand' && 'Виберіть бренд'}
          {step === 'category' && `${selectedBrand} - Виберіть тип пристрою`}
          {step === 'model' && `${selectedBrand} ${selectedCategoryState} - Виберіть модель`}
        </p>
      </div>

      {/* Навигация по шагам */}
      {step !== 'brand' && (
        <div className="flex gap-2 max-w-4xl mx-auto mb-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center gap-2"
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
          <div className="flex gap-2 max-w-4xl mx-auto mb-4 justify-end">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                viewMode === 'grid'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <GridViewIcon className="w-5 h-5" />
              Сетка
            </button>
            <button
              onClick={() => setViewMode('icons')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                viewMode === 'icons'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ListViewIcon className="w-5 h-5" />
              Значки
            </button>
          </div>

          {/* Сетка вид */}
          {viewMode === 'grid' && (
            <div className="space-y-3 max-w-4xl mx-auto">
              {models.map(device => (
                <button
                  key={device.id}
                  onClick={() => handleModelSelect(device)}
                  className="w-full p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-lg hover:bg-purple-50 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {device.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                        <PaletteIcon className="w-4 h-4 text-purple-500" />
                        Кольори: {device.colors.join(', ')}
                      </p>
                      <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                        <StorageIcon className="w-4 h-4 text-blue-500" />
                        Пам'ять: {device.storageOptions.join(', ')}
                      </p>
                    </div>
                    <div className="ml-4 group-hover:translate-x-1 transition-transform flex-shrink-0">
                      <ChevronRightIcon className="w-6 h-6 text-gray-400" />
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
