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
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Заголовок */}
      <div className="mb-6 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🔍 Знайти майстра
        </h1>
        <p className="text-base text-gray-600 mb-4">
          Виберіть найкращого фахівця для вашої техніки Apple
        </p>
        
        {/* Подсказки для клиентов */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 text-xl">💡</div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Як користуватися пошуком:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Пошук:</strong> Введіть ім'я майстра або тип послуги (наприклад: "екран", "батарея")</li>
                <li>• <strong>Фільтри:</strong> Оберіть місто, тип пристрою та послуги для точного пошуку</li>
                <li>• <strong>Карточка майстра:</strong> Натисніть "Написати" для чату, "Портфоліо" для перегляду робіт</li>
                <li>• <strong>Зірка:</strong> Додайте майстра до обраних для швидкого доступу</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Пошук та фільтри */}
      <div className="px-6 mb-6 space-y-4">
        {/* Основний пошук */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Пошук за ім'ям майстра або спеціальністю..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              title="Введіть ім'я майстра або тип послуги для пошуку"
            />
          </div>
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
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-all duration-200"
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

        {/* Панель фільтрів - завжди видима */}
        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Фільтри пошуку</h3>
            <span className="text-sm text-gray-500">(оберіть критерії для точного пошуку)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Фільтр по місту */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏙️ Місто
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                title="Оберіть місто для пошуку майстрів"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📱 Тип пристрою
              </label>
              <select
                value={selectedDeviceType}
                onChange={(e) => setSelectedDeviceType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                title="Оберіть тип пристрою Apple для ремонту"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔧 Тип послуги
              </label>
              <select
                value={selectedServiceType}
                onChange={(e) => setSelectedServiceType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                title="Оберіть тип послуги або проблему з пристроєм"
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
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Знайдено <span className="font-semibold text-blue-600">{filteredMasters.length}</span> майстрів
            {hasActiveFilters && (
              <span className="ml-2 text-xs text-gray-500">
                (з фільтрами)
              </span>
            )}
          </p>
          {filteredMasters.length > 0 && (
            <div className="text-xs text-gray-500">
              💡 Натисніть на карточку майстра для деталей
            </div>
          )}
        </div>
      </div>

      {/* Сітка мастерів */}
      <div className="px-6">
        {filteredMasters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Майстрів не знайдено
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Спробуйте змінити фільтри або критерії пошуку. Можливо, варто:
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 max-w-md mx-auto">
              <ul className="text-sm text-yellow-800 text-left space-y-1">
                <li>• Очистити всі фільтри</li>
                <li>• Змінити місто пошуку</li>
                <li>• Спробувати інший тип пристрою</li>
                <li>• Ввести інші ключові слова</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('');
                setSelectedDeviceType('');
                setSelectedServiceType('');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              title="Очистити всі фільтри та показати всіх майстрів"
            >
              🔄 Очистити фільтри
            </button>
          </div>
        )}
      </div>

      {/* Модальное окно портфолио */}
      <PortfolioModal
        isOpen={!!selectedMasterForPortfolio}
        onClose={() => setSelectedMasterForPortfolio(null)}
        master={selectedMasterForPortfolio}
      />
    </div>
  );
};
