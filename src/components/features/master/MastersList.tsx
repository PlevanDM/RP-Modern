import React, { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import { MasterCard } from '../../MasterCard';
import { PortfolioModal } from '../../PortfolioModal';
import { User } from '../../../types/models';
import { UKRAINIAN_CITIES } from '../../../utils/ukrainianCities';

interface MastersListProps {
  masters: User[];
  currentUserCity?: string;
  onSelectMaster?: (master: User) => void;
  onContact?: (master: User) => void;
  onToggleFavorite?: (masterId: string) => void;
  favoriteMasters?: string[];
}

export const MastersList: React.FC<MastersListProps> = ({
  masters,
  onSelectMaster,
  onContact,
  onToggleFavorite,
  favoriteMasters = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDeviceType, setSelectedDeviceType] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [selectedMasterForPortfolio, setSelectedMasterForPortfolio] = useState<User | null>(null);

  // Отримання всіх міст з бази даних
  const allCities = useMemo(() => {
    return UKRAINIAN_CITIES.map(c => c.name).sort();
  }, []);

  // Константи для фильтров
  const deviceTypes = [
    { value: 'iPhone', label: 'iPhone' },
    { value: 'iPad', label: 'iPad' },
    { value: 'Mac', label: 'Mac' },
    { value: 'Apple Watch', label: 'Apple Watch' },
    { value: 'Other', label: 'Інше' }
  ];

  const serviceTypes = [
    { value: 'Пошкодження екрану', label: 'Пошкодження екрану' },
    { value: 'Проблема з батареєю', label: 'Проблема з батареєю' },
    { value: 'Несправність обладнання', label: 'Несправність обладнання' },
    { value: 'Пошкодження від рідини', label: 'Пошкодження від рідини' },
    { value: 'Software Issue', label: 'Програмне забезпечення' },
    { value: 'Charging Issue', label: 'Зарядка' },
    { value: 'Camera Issue', label: 'Камера' },
    { value: 'Speaker Issue', label: 'Динамік' },
    { value: 'Other', label: 'Інше' }
  ];

  // Фільтровані мастери
  const filteredMasters = useMemo(() => {
    return masters.filter((master) => {
      const matchesSearch =
        searchQuery === '' ||
        master.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        master.specialization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        master.skills?.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCity = selectedCity === '' || master.city === selectedCity;

      // Фильтр по типу устройства (проверяем навыки мастера)
      const matchesDeviceType = selectedDeviceType === '' || 
        master.skills?.some(skill => 
          skill.toLowerCase().includes(selectedDeviceType.toLowerCase())
        );

      // Фильтр по типу услуги (проверяем специализацию)
      const matchesServiceType = selectedServiceType === '' ||
        master.specialization?.toLowerCase().includes(selectedServiceType.toLowerCase()) ||
        master.skills?.some(skill => 
          skill.toLowerCase().includes(selectedServiceType.toLowerCase())
        );

      return matchesSearch && matchesCity && matchesDeviceType && matchesServiceType;
    });
  }, [masters, searchQuery, selectedCity, selectedDeviceType, selectedServiceType]);

  const hasActiveFilters =
    searchQuery || selectedCity || selectedDeviceType || selectedServiceType;

  return (
    <div className="w-full">
      {/* Заголовок */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Знайти майстра
        </h1>
        <p className="text-sm text-gray-600">
          Оберіть найкращого фахівця для вашої техніки
        </p>
      </div>

      {/* Пошук та фільтри */}
      <div className="mb-6 space-y-3">
        {/* Основний пошук */}
        <div className="relative">
          <input
            type="text"
            placeholder="Пошук за ім'ям майстра або спеціальністю..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all text-sm"
          />
        </div>

        {/* Кнопка очистки фильтров */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('');
                setSelectedDeviceType('');
                setSelectedServiceType('');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              title="Очистити всі фільтри"
            >
              <X className="w-4 h-4" />
              Очистити фільтри
            </button>
            <span className="text-sm text-gray-500">
              Активних фільтрів: {(searchQuery ? 1 : 0) + (selectedCity ? 1 : 0) + (selectedDeviceType ? 1 : 0) + (selectedServiceType ? 1 : 0)}
            </span>
          </div>
        )}

        {/* Панель фільтрів */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-700">Фільтри пошуку</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Фільтр по місту */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Місто
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
              >
                <option value="">Всі міста</option>
                {allCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Фільтр по типу пристрою */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Тип пристрою
              </label>
              <select
                value={selectedDeviceType}
                onChange={(e) => setSelectedDeviceType(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
              >
                <option value="">Всі пристрої</option>
                {deviceTypes.map((device) => (
                  <option key={device.value} value={device.value}>
                    {device.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Фільтр по типу послуги */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Тип послуги
              </label>
              <select
                value={selectedServiceType}
                onChange={(e) => setSelectedServiceType(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
              >
                <option value="">Всі послуги</option>
                {serviceTypes.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Результати */}
      <div className="mb-4">
        <p className="text-xs text-gray-600">
          Знайдено {filteredMasters.length} майстрів
        </p>
      </div>

      {/* Сітка мастерів */}
      {filteredMasters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMasters.map((master) => (
            <div key={master.id} onClick={() => onSelectMaster?.(master)}>
              <MasterCard 
                master={master} 
                className="cursor-pointer" 
                onContact={() => onContact?.(master)}
                onPortfolio={() => setSelectedMasterForPortfolio(master)}
                onToggleFavorite={onToggleFavorite}
                isFavorite={favoriteMasters.includes(master.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">
            Майстрів не знайдено. Спробуйте змінити фільтри пошуку.
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('');
                setSelectedDeviceType('');
                setSelectedServiceType('');
              }}
              className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
            >
              Очистити фільтри
            </button>
          )}
        </div>
      )}

      {/* Модальное окно портфолио */}
      <PortfolioModal
        isOpen={!!selectedMasterForPortfolio}
        onClose={() => setSelectedMasterForPortfolio(null)}
        master={selectedMasterForPortfolio}
      />
    </div>
  );
};
