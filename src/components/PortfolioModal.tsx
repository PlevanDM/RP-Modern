import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import { User } from '../types/models';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  master: User | null;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  onClose,
  master,
}) => {
  if (!isOpen || !master) return null;

  // Моковые данные портфолио для демонстрации
  const portfolioItems = [
    {
      id: 1,
      title: 'Заміна екрану iPhone 15 Pro Max',
      description: 'Повна заміна дисплея з оригінальними запчастинами Apple',
        beforeImage: '/images/portfolio/placeholder-before.svg',
        afterImage: '/images/portfolio/placeholder-after.svg',
      price: 8500,
      completedAt: '2024-10-15',
      deviceType: 'iPhone',
        issue: 'Пошкодження екрану'
    },
    {
      id: 2,
      title: 'Ремонт логічної плати MacBook Air M2',
      description: 'Діагностика та ремонт материнської плати після заливання водою',
        beforeImage: '/images/portfolio/placeholder-before.svg',
        afterImage: '/images/portfolio/placeholder-after.svg',
      price: 12000,
      completedAt: '2024-10-10',
      deviceType: 'Mac',
        issue: 'Пошкодження від рідини'
    },
    {
      id: 3,
      title: 'Заміна батареї iPad Pro 12.9"',
      description: 'Заміна акумулятора з гарантією на 6 місяців',
      beforeImage: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Стара+батарея',
      afterImage: 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Нова+батарея',
      price: 4500,
      completedAt: '2024-10-05',
      deviceType: 'iPad',
        issue: 'Проблема з батареєю'
    },
    {
      id: 4,
      title: 'Ремонт камери iPhone 14 Pro',
      description: 'Заміна задньої камери з калібруванням',
      beforeImage: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Несправна+камера',
      afterImage: 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Нова+камера',
      price: 3200,
      completedAt: '2024-09-28',
      deviceType: 'iPhone',
        issue: 'Несправність обладнання'
    },
    {
      id: 5,
      title: 'Заміна дисплея Apple Watch Series 8',
      description: 'Ремонт екрану з підтримкою Always-On Display',
      beforeImage: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Розбитий+екран',
      afterImage: 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Новий+екран',
      price: 2800,
      completedAt: '2024-09-20',
      deviceType: 'Apple Watch',
        issue: 'Пошкодження екрану'
    },
    {
      id: 6,
      title: 'Ремонт клавіатури MacBook Pro 16"',
      description: 'Заміна клавіатури з підтримкою Touch Bar',
      beforeImage: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Пошкоджена+клавіатура',
      afterImage: 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Нова+клавіатура',
      price: 6500,
      completedAt: '2024-09-15',
      deviceType: 'Mac',
        issue: 'Несправність обладнання'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={master.avatar}
                alt={master.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {master.name}
                  {master.verified && (
                    <VerifiedIcon sx={{ fontSize: 24 }} className="text-indigo-600" />
                  )}
                </h2>
                <p className="text-lg text-gray-600">{master.specialization}</p>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <StarIcon sx={{ fontSize: 18 }} className="text-yellow-400" />
                    <span className="font-semibold text-gray-900">{master.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">(Верифіковано ✓)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <LocationOnIcon sx={{ fontSize: 16 }} />
                    <span>{master.city}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseIcon sx={{ fontSize: 28 }} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Портфоліо робіт</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Images */}
                <div className="grid grid-cols-2 gap-1">
                  <div className="relative">
                    <img
                      src={item.beforeImage}
                      alt="До ремонту"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      До
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={item.afterImage}
                      alt="Після ремонту"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Після
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                        {item.deviceType}
                      </span>
                      <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs">
                        {item.issue}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      {new Date(item.completedAt).toLocaleDateString('uk-UA')}
                    </div>
                    <div className="font-semibold text-indigo-600">
                      ₴{item.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state if no portfolio items */}
          {portfolioItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Портфоліо порожнє
              </h3>
              <p className="text-gray-600">
                У цього майстра поки немає опублікованих робіт
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 rounded-b-lg">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Закрити
            </button>
            <button
              onClick={() => {
                // Здесь можно добавить логику для перехода к чату с мастером
                onClose();
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Написати майстру
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
