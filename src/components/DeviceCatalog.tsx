import { useState, useEffect } from 'react';
import { DeviceModel, User } from '../types/models';
import { DeviceGallery } from './DeviceGallery';
import { useIFixitGuides } from '../hooks/useApi';
import { CreateOrderModal } from './CreateOrderModal';
import { Order } from '../types/models';

interface DeviceCatalogProps {
  currentUser?: User;
}

export function DeviceCatalog({ currentUser: userProp }: DeviceCatalogProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceModel | null>(
    null
  );
  const [currentUser, setCurrentUser] = useState<User | undefined>(
    userProp
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [createdOrderData, setCreatedOrderData] = useState<{
    device: string;
    color: string;
    storage: string;
  } | null>(null);

  // Загружаем iFixit гайды для выбранного устройства только для мастеров
  const { guides: ifixitGuide, loading: guidesLoading } = useIFixitGuides(
    currentUser?.role === 'master' ? selectedDevice?.name : undefined
  );

  useEffect(() => {
    // Используем переданный prop или получаем из localStorage
    if (userProp) {
      setCurrentUser(userProp);
    } else {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setCurrentUser(userData);
        } catch (error) {
          console.error('Error loading user from localStorage:', error);
        }
      }
    }
  }, [userProp]);

  const handleDeviceSelect = (device: DeviceModel) => {
    setSelectedDevice(device);
    setSelectedColor(null);
    setSelectedStorage(null);
    console.log('Selected device:', device);
  };

  const handleCloseModal = () => {
    setSelectedDevice(null);
    setSelectedColor(null);
    setSelectedStorage(null);
  };

  const handleCreateOrder = () => {
    if (!selectedDevice || !selectedColor || !selectedStorage) {
      alert('Будь ласка, виберіть колір та пам\'ять');
      return;
    }

    // Генерируем уникальный ID для заказа
    const orderId = 'order-' + Date.now();
    const now = new Date().toISOString();

    // Создаём объект заказа с полной структурой
    const newOrder = {
      id: orderId,
      title: `${selectedDevice.brand} ${selectedDevice.name}`,
      description: `Пристрій: ${selectedDevice.name}\nКолір: ${selectedColor}\nПам'ять: ${selectedStorage}`,
      deviceType: selectedDevice.category,
      device: selectedDevice.name,
      issue: 'Потребує ремонту',
      budget: selectedDevice.price?.min || 5000,
      city: 'Київ', // По умолчанию
      status: 'open' as const,
      urgency: 'medium' as const,
      createdAt: now,
      updatedAt: now,
      clientId: currentUser?.id || 'client-1',
      brand: selectedDevice.brand,
      category: selectedDevice.category,
      color: selectedColor,
      storage: selectedStorage
    };

    console.log('✅ Создана заявка:', newOrder);

    // Сохраняем заказ в localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('repair_master_orders') || '[]');
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('repair_master_orders', JSON.stringify(updatedOrders));
      console.log('💾 Заказ сохранен в localStorage');

      // Отправляем событие для синхронизации между компонентами
      window.dispatchEvent(new CustomEvent('ordersUpdated'));
    } catch (error) {
      console.error('❌ Ошибка при сохранении заказа:', error);
    }

    // Сохраняем данные для вывода в модальное окно
    setCreatedOrderData({
      device: selectedDevice.name,
      color: selectedColor,
      storage: selectedStorage
    });
    setShowSuccessModal(true);

    // Закрываем основное модальное окно после небольшой задержки
    setTimeout(() => {
      handleCloseModal();
    }, 300);
  };

  const handleCreateOrderFromModal = (orderData: Partial<Order>) => {
    console.log('✅ Создана заявка из модального окна:', orderData);
    try {
      const existingOrders = JSON.parse(localStorage.getItem('repair_master_orders') || '[]');
      const updatedOrders = [orderData, ...existingOrders];
      localStorage.setItem('repair_master_orders', JSON.stringify(updatedOrders));
      console.log('💾 Заказ сохранен в localStorage');
      window.dispatchEvent(new CustomEvent('ordersUpdated'));
    } catch (error) {
      console.error('❌ Ошибка при сохранении заказа:', error);
    }
    setShowCreateOrderModal(false);
    setShowSuccessModal(true);
  };

  // Определяем, является ли пользователь мастером
  const isMaster = currentUser?.role === 'master';

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-4">
        <div className="max-w-5xl mx-auto px-2 sm:px-4 flex flex-col items-center">
          {/* Заголовок в зависимости от роли */}
          <div className="text-center mb-6 w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isMaster ? 'Справочник устройств' : 'Выберите устройство для ремонта'}
            </h1>
            <p className="text-sm text-gray-600">
              {isMaster
                ? 'Техническая информация о моделях устройств Apple и Dyson'
                : 'Выберите устройство, которое нужно отремонтировать'
              }
            </p>
          </div>

          <DeviceGallery onDeviceSelect={handleDeviceSelect} isMaster={isMaster} />

          {/* Модальное окно с деталями устройства */}
          {selectedDevice && (
  <div className="create-order-button-container">
    <button
      onClick={() => {
        setCreatedOrderData({
          device: selectedDevice.name,
          color: selectedColor || 'default',
          storage: selectedStorage || 'default'
        });
        setShowCreateOrderModal(true);
      }}
      className="btn btn-primary btn-large"
    >
      📝 Создать заявку
    </button>
  </div>
)}
          {showCreateOrderModal && (
            <CreateOrderModal
              isOpen={showCreateOrderModal}
              onClose={() => setShowCreateOrderModal(false)}
              onSubmit={handleCreateOrderFromModal}
              currentUser={currentUser}
              initialData={{
                title: `Ремонт ${createdOrderData?.device}`,
                description: `Цвет: ${createdOrderData?.color}, Память: ${createdOrderData?.storage}`,
              }}
            />
          )}
          {selectedDevice && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-x-hidden">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedDevice.name}
                      </h2>
                      <p className="text-gray-600">
                        {selectedDevice.brand} • {selectedDevice.category}
                      </p>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {isMaster ? (
                    // ===== УПРОЩЁННЫЙ ВАРИАНТ ДЛЯ МАСТЕРА =====
                    <div className="space-y-6">
                      {/* Галерея фото устройства */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Фото пристрою</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedDevice.photos.slice(0, 6).map((photo) => (
                            <div
                              key={photo.id}
                              className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                            >
                              <img
                                src={photo.url}
                                alt={photo.alt}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = `https://via.placeholder.com/300x300?text=${selectedDevice.name}`;
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Модельные коды */}
                      {selectedDevice.modelCodes && selectedDevice.modelCodes.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Модельні коди (A-коди):</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedDevice.modelCodes.map((code) => (
                              <span
                                key={code}
                                className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg text-sm font-mono font-semibold border border-purple-300"
                              >
                                {code}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Год выпуска и поколение */}
                      <div className="grid grid-cols-2 gap-4">
                        {selectedDevice.year && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Рік випуску:</p>
                            <p className="text-lg font-semibold text-gray-900">{selectedDevice.year}</p>
                          </div>
                        )}
                        {selectedDevice.generation && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Покоління:</p>
                            <p className="text-lg font-semibold text-gray-900">{selectedDevice.generation}</p>
                          </div>
                        )}
                      </div>

                      {/* Кнопки для мастера */}
                      <div className="pt-4 grid grid-cols-2 gap-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Копіювати коди
                        </button>
                        <button
                          onClick={handleCloseModal}
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        >
                          Закрити
                        </button>
                      </div>
                    </div>
                  ) : (
                    // ===== ПОЛНЫЙ ВАРИАНТ ДЛЯ КЛИЕНТА =====
                    <div className="space-y-6">
                      {/* Выбор цвета */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          🎨 Виберіть колір:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {selectedDevice.colors.map(color => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${
                                selectedColor === color
                                  ? 'border-purple-600 bg-purple-50 text-purple-900'
                                  : 'border-gray-300 text-gray-700 hover:border-purple-500 hover:bg-purple-50'
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Выбор памяти */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          💾 Виберіть пам'ять:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {selectedDevice.storageOptions.map(storage => (
                            <button
                              key={storage}
                              onClick={() => setSelectedStorage(storage)}
                              className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${
                                selectedStorage === storage
                                  ? 'border-purple-600 bg-purple-50 text-purple-900'
                                  : 'border-gray-300 text-gray-700 hover:border-purple-500 hover:bg-purple-50'
                              }`}
                            >
                              {storage}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* iFixit гайды - только для мастеров */}
                      {currentUser?.role === 'master' && (
                        <>
                          {guidesLoading && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <p className="text-sm text-blue-800">🔄 Загружаю гайды ремонту...</p>
                            </div>
                          )}
                          {ifixitGuide && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <span className="text-xl">🔧</span>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-green-900 mb-2">Гайд по ремонту:</h4>
                                  <p className="text-sm text-green-800 mb-3">{ifixitGuide.title}</p>
                                  {ifixitGuide.difficulty && (
                                    <p className="text-sm text-green-700 mb-2">
                                      📊 Складність: <span className="font-semibold">{ifixitGuide.difficulty}</span>
                                    </p>
                                  )}
                                  {ifixitGuide.repairabilityScore && (
                                    <p className="text-sm text-green-700 mb-3">
                                      ⭐ Оцінка ремонтопридатності: <span className="font-semibold">{ifixitGuide.repairabilityScore}</span>
                                    </p>
                                  )}
                                  <a
                                    href={ifixitGuide.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold underline"
                                  >
                                    Переглянути повний гайд →
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}
                          {!guidesLoading && !ifixitGuide && selectedDevice && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                              <p className="text-sm text-amber-800">⚠️ Гайд ремонту не знайдено для цього пристрою</p>
                            </div>
                          )}
                        </>
                      )}

                      {/* Кнопки действия */}
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={handleCloseModal}
                          className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        >
                          Скасувати
                        </button>
                        <button
                          onClick={handleCreateOrder}
                          className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!selectedColor || !selectedStorage}
                        >
                          ➕ Створити заявку
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && createdOrderData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center">
              <div className="text-5xl mb-3">✅</div>
              <h2 className="text-2xl font-bold">Заявка успішно створена!</h2>
            </div>

            {/* Order Details */}
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="text-xs text-gray-600">Модель</p>
                    <p className="font-semibold text-gray-900">{createdOrderData.device}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="text-xs text-gray-600">Колір</p>
                    <p className="font-semibold text-gray-900">{createdOrderData.color}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💾</span>
                  <div>
                    <p className="text-xs text-gray-600">Пам'ять</p>
                    <p className="font-semibold text-gray-900">{createdOrderData.storage}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-sm text-blue-900">
                  📞 Майстри зможуть побачити вашу заявку найближчасом. Ми повідомимо вам про всі пропозиції.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setCreatedOrderData(null);
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105"
              >
                Чудово! 🎉
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
