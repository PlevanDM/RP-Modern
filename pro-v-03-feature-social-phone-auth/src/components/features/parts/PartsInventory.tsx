import React, { useState, useMemo } from 'react';
import { SPARE_PARTS_DETAILED } from '../../../utils/constants';

interface Part {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  masterName: string;
  masterId: string;
  inStock: number;
  rating: number;
  verified: boolean;
}

interface PartsInventoryProps {
  parts?: Part[];
  userRole?: 'master' | 'service' | 'client';
  onBuyPart?: (part: Part) => void;
  onViewMaster?: (masterId: string) => void;
}

// Генеруємо тестові дані запчастин
const generateMockParts = (): Part[] => {
  const masters = [
    { id: 'master1', name: 'Alex Master' },
    { id: 'master2', name: 'Maria Master' },
    { id: 'master3', name: 'Sergei Master' },
    { id: 'master4', name: 'Oksana Master' },
  ];

  const parts: Part[] = [];
  let id = 1;

  Object.entries(SPARE_PARTS_DETAILED).forEach(([category, subcats]) => {
    if (typeof subcats === 'object' && !Array.isArray(subcats)) {
      Object.entries(subcats).forEach(([subcat, items]) => {
        if (Array.isArray(items)) {
          items.forEach((itemName) => {
            const master = masters[Math.floor(Math.random() * masters.length)];
            parts.push({
              id: `part_${id++}`,
              name: itemName,
              category,
              subcategory: subcat,
              price: Math.floor(Math.random() * 5000) + 500,
              masterName: master.name,
              masterId: master.id,
              inStock: Math.floor(Math.random() * 20) + 1,
              rating: (Math.random() * 1.0 + 4.0).toFixed(1) as unknown as number,
              verified: Math.random() > 0.3,
            });
          });
        }
      });
    } else if (Array.isArray(subcats)) {
      subcats.forEach((itemName) => {
        const master = masters[Math.floor(Math.random() * masters.length)];
        parts.push({
          id: `part_${id++}`,
          name: itemName,
          category,
          subcategory: category,
          price: Math.floor(Math.random() * 5000) + 500,
          masterName: master.name,
          masterId: master.id,
          inStock: Math.floor(Math.random() * 20) + 1,
          rating: (Math.random() * 1.0 + 4.0).toFixed(1) as unknown as number,
          verified: Math.random() > 0.3,
        });
      });
    }
  });

  return parts;
};

export const PartsInventory: React.FC<PartsInventoryProps> = ({
  parts = generateMockParts(),
  onBuyPart,
  onViewMaster,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'stock'>('price-asc');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(parts.map((p) => p.category));
    return Array.from(cats).sort();
  }, [parts]);

  const filteredAndSorted = useMemo(() => {
    const filtered = parts.filter((part) => {
      const matchesSearch =
        searchQuery === '' ||
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.masterName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === '' || part.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Сортування
    filtered.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'stock') return b.inStock - a.inStock;
      return 0;
    });

    return filtered;
  }, [parts, searchQuery, selectedCategory, sortBy]);

  const totalValue = useMemo(() => {
    return filteredAndSorted.reduce((sum, part) => sum + part.price * part.inStock, 0);
  }, [filteredAndSorted]);

  const totalParts = useMemo(() => {
    return filteredAndSorted.reduce((sum, part) => sum + part.inStock, 0);
  }, [filteredAndSorted]);

  return (
    <div className="w-full">
      {/* Заголовок */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-4xl font-bold text-gray-900">🛠️</span>
          <h1 className="text-4xl font-bold text-gray-900">Каталог Запчастин</h1>
        </div>
        <p className="text-lg text-gray-600">
          Купуй напряму від майстрів - найвищі ціни і якість гарантовані
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
          <p className="text-sm text-indigo-700 font-medium mb-1">Всього позицій</p>
          <p className="text-3xl font-bold text-indigo-900">{filteredAndSorted.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-700 font-medium mb-1">На складі</p>
          <p className="text-3xl font-bold text-green-900">{totalParts}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-700 font-medium mb-1">Сумарна вартість</p>
          <p className="text-3xl font-bold text-blue-900">{(totalValue / 1000).toFixed(1)}K грн</p>
        </div>
      </div>

      {/* Пошук та фільтри */}
      <div className="mb-8 space-y-4">
        {/* Основний пошук */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5">🔍</span>
          <input
            type="text"
            placeholder="Пошук запчастин за назвою або майстром..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Кнопки керування */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">🧩</span>
            <span className="text-sm font-medium text-gray-700">Фільтри</span>
          </button>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Сортування:</label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | 'price-asc'
                    | 'price-desc'
                    | 'rating'
                    | 'stock'
                )
              }
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="price-asc">Ціна: від низької</option>
              <option value="price-desc">Ціна: від високої</option>
              <option value="rating">Рейтинг: найвищі</option>
              <option value="stock">Кількість: найбільше</option>
            </select>
          </div>

          {(searchQuery || selectedCategory) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
              className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <span className="w-4 h-4">✖️</span>
              Очистити
            </button>
          )}
        </div>

        {/* Панель фільтрів */}
        {showFilters && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Категорія</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === ''
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Всі
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Таблиця запчастин */}
      {filteredAndSorted.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Запчастина</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Категорія</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Майстер</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">На складі</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Ціна</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Рейтинг</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Дія</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSorted.map((part) => (
                <tr key={part.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{part.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {part.subcategory}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onViewMaster?.(part.masterId)}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                    >
                      {part.masterName}
                      {part.verified && <span className="text-xs">✓</span>}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm font-medium text-gray-900">{part.inStock}</span>
                      {part.inStock > 10 && (
                        <span className="text-xs px-2 py-1 rounded bg-green-50 text-green-700">Багато</span>
                      )}
                      {part.inStock <= 5 && (
                        <span className="text-xs px-2 py-1 rounded bg-red-50 text-red-700">Мало</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-gray-900">{part.price.toLocaleString('uk-UA')} грн</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.round(part.rating as number)
                              ? '⭐'
                              : '☆'
                          }`}
                        >
                          {i < Math.round(part.rating as number) ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onBuyPart?.(part)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <span className="w-4 h-4">🛍️</span>
                      <span className="hidden sm:inline">Купити</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-4">Запчастин не знайдено</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Очистити фільтри
          </button>
        </div>
      )}
    </div>
  );
};
