import { DeviceModel } from '../types/models';

interface DeviceCardProps {
  device: DeviceModel;
  onSelect?: (device: DeviceModel) => void;
  isMaster?: boolean;
  className?: string;
}

export function DeviceCard({ device, onSelect, isMaster = false, className = '' }: DeviceCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(device);
    }
  };

  // Получаем фото устройства (первое доступное)
  const primaryPhoto = device.photos.length > 0 ? device.photos[0] : null;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {/* Фото устройства */}
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        {primaryPhoto ? (
          <img
            src={primaryPhoto.url}
            alt={primaryPhoto.alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback для отсутствующих изображений
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const iconDiv = document.createElement('div');
                iconDiv.className = 'w-full h-full flex items-center justify-center bg-gray-100';
                iconDiv.innerHTML = `
                  <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16M4 6a2 2 0 012-2h12a2 2 0 012 2M4 6v10a2 2 0 002 2h12a2 2 0 002-2V6m-4 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m0 0h8" />
                  </svg>
                `;
                parent.appendChild(iconDiv);
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16M4 6a2 2 0 012-2h12a2 2 0 012 2M4 6v10a2 2 0 002 2h12a2 2 0 002-2V6m-4 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m0 0h8" />
            </svg>
          </div>
        )}

        {/* Бейдж категории */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            device.category === 'iPhone' ? 'bg-blue-100 text-blue-800' :
            device.category === 'iPad' ? 'bg-purple-100 text-purple-800' :
            device.category === 'MacBook' ? 'bg-gray-100 text-gray-800' :
            device.category === 'Apple Watch' ? 'bg-pink-100 text-pink-800' :
            device.category === 'Dyson' ? 'bg-cyan-100 text-cyan-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {device.category}
          </span>
        </div>

      </div>

      {/* Информация об устройстве */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">
              {device.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {device.brand}
            </p>
          </div>
        </div>

        {/* ДЛЯ МАСТЕРА - ТОЛЬКО НАЗВАНИЯ И КОДЫ, БЕЗ ЦВЕТОВ И ЦЕН */}
        {!isMaster && (
          <>
            {/* Цвета - только для клиента */}
            {device.colors.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Доступные цвета:</p>
                <div className="flex flex-wrap gap-1">
                  {device.colors.slice(0, 4).map((color, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                    >
                      {color}
                    </span>
                  ))}
                  {device.colors.length > 4 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      +{device.colors.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Опции хранения - только для клиента */}
            {device.storageOptions && device.storageOptions.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Память:</p>
                <div className="flex flex-wrap gap-1">
                  {device.storageOptions.slice(0, 3).map((storage, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
                    >
                      {storage}
                    </span>
                  ))}
                  {device.storageOptions.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                      +{device.storageOptions.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Ценовой диапазон - только для клиента */}
            {device.price && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Цена:</span>
                  <div className="text-right">
                    {device.price.min === device.price.max ? (
                      <span className="font-semibold text-gray-900">
                        ₴{device.price.min.toLocaleString()}
                      </span>
                    ) : (
                      <div>
                        <span className="text-sm text-gray-500 line-through">
                          от ₴{device.price.min.toLocaleString()}
                        </span>
                        <span className="font-semibold text-gray-900 block">
                          до ₴{device.price.max.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ДЛЯ МАСТЕРА - ТОЛЬКО МОДЕЛЬНЫЕ КОДЫ */}
        {isMaster && device.modelCodes && device.modelCodes.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium text-gray-600 mb-2">A-коди:</p>
            <div className="flex flex-wrap gap-1">
              {device.modelCodes.slice(0, 2).map((code, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-mono bg-purple-50 text-purple-700 rounded font-semibold"
                >
                  {code}
                </span>
              ))}
              {device.modelCodes.length > 2 && (
                <span className="px-2 py-1 text-xs font-mono bg-purple-50 text-purple-700 rounded">
                  +{device.modelCodes.length - 2}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
