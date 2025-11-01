import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, X, Package, Filter, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import * as simpleIcons from 'simple-icons';
import {
  allUkraineDevices,
  getAllBrands,
  getModelsByBrand,
  getModelsByCategory,
  searchModels,
  getPopularModels,
  getNewModels,
  UkraineDeviceModel
} from '../../../data/ukrainePopularDevices';

interface ImprovedDeviceCatalogProps {
  onDeviceSelect?: (device: UkraineDeviceModel) => void;
}

export function ImprovedDeviceCatalog({ onDeviceSelect }: ImprovedDeviceCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Smartphone' | 'Laptop'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState<'all' | 'budget' | 'mid' | 'premium'>('all');

  // Отримати всі бренди
  const brands = useMemo(() => getAllBrands(), []);

  // Фільтрація пристроїв
  const filteredDevices = useMemo(() => {
    let devices = allUkraineDevices;

    // Пошук
    if (searchQuery) {
      devices = searchModels(searchQuery);
    }

    // Фільтр по бренду
    if (selectedBrand) {
      devices = devices.filter(d => d.brand === selectedBrand);
    }

    // Фільтр по категорії
    if (selectedCategory !== 'all') {
      devices = devices.filter(d => d.category === selectedCategory);
    }

    // Фільтр по ціні
    if (priceFilter !== 'all') {
      devices = devices.filter(d => d.priceRange === priceFilter);
    }

    return devices;
  }, [searchQuery, selectedBrand, selectedCategory, priceFilter]);

  // Популярні пристрої
  const popularDevices = useMemo(() => getPopularModels().slice(0, 6), []);
  const newDevices = useMemo(() => getNewModels().slice(0, 6), []);

  // Отримати іконку бренду
  const getBrandIcon = (brand: string) => {
    const iconMap: Record<string, string> = {
      'Apple': 'siApple',
      'Samsung': 'siSamsung',
      'Xiaomi': 'siXiaomi',
      'Realme': 'siRealme',
      'OnePlus': 'siOneplus',
      'POCO': 'siPoco',
      'Oppo': 'siOppo',
      'Vivo': 'siVivo',
      'Nothing': 'siNothing',
      'Google': 'siGoogle',
      'Huawei': 'siHuawei',
      'Honor': 'siHonor',
      'Motorola': 'siMotorola',
      'Nokia': 'siNokia',
      'Sony': 'siSony',
      'LG': 'siLg',
      'ZTE': 'siZte',
      'TCL': 'siTcl',
      'ASUS': 'siAsus',
      'Lenovo': 'siLenovo',
      'HP': 'siHp',
      'Dell': 'siDell',
      'Acer': 'siAcer',
      'MSI': 'siMsi',
    };

    const iconKey = iconMap[brand];
    const icon = iconKey ? simpleIcons[iconKey as keyof typeof simpleIcons] : null;

    if (!icon || typeof icon !== 'object' || !('path' in icon)) {
      return null;
    }

    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d={icon.path} />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Каталог пристроїв
          </h1>
          <p className="text-gray-600">
            {allUkraineDevices.length}+ моделей від {brands.length} брендів
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Пошук пристрою або бренду..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <Button
              variant={showFilters ? 'default' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5 mr-2" />
              Фільтри
            </Button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <Card>
                  <CardContent className="p-4 space-y-4">
                    {/* Category Filter */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Категорія
                      </label>
                      <div className="flex gap-2">
                        {['all', 'Smartphone', 'Laptop'].map((cat) => (
                          <Button
                            key={cat}
                            variant={selectedCategory === cat ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory(cat as any)}
                          >
                            {cat === 'all' ? 'Всі' : cat === 'Smartphone' ? 'Смартфони' : 'Ноутбуки'}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Price Filter */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Ціновий діапазон
                      </label>
                      <div className="flex gap-2">
                        {['all', 'budget', 'mid', 'premium'].map((price) => (
                          <Button
                            key={price}
                            variant={priceFilter === price ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPriceFilter(price as any)}
                          >
                            {price === 'all' ? 'Всі' : price === 'budget' ? 'Бюджет' : price === 'mid' ? 'Середній' : 'Преміум'}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Popular Brands */}
        {!searchQuery && !selectedBrand && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Популярні бренди</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {brands.slice(0, 16).map((brand) => (
                <motion.button
                  key={brand}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBrand(brand)}
                  className="p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-orange-500 transition-all flex flex-col items-center gap-2"
                >
                  <div className="text-gray-700">
                    {getBrandIcon(brand)}
                  </div>
                  <span className="text-xs font-medium text-gray-900">{brand}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Brand */}
        {selectedBrand && (
          <div className="mb-6 flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedBrand(null)}
            >
              <X className="w-4 h-4 mr-1" />
              {selectedBrand}
            </Button>
            <span className="text-sm text-gray-600">
              {filteredDevices.length} моделей
            </span>
          </div>
        )}

        {/* Devices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDevices.map((device) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-gray-700">
                      {getBrandIcon(device.brand)}
                    </div>
                    {device.popular && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        ТОП
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg">{device.name}</CardTitle>
                  <p className="text-sm text-gray-600">{device.brand}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {device.year}
                      </span>
                      {device.priceRange && (
                        <span className={`px-2 py-1 text-xs rounded ${
                          device.priceRange === 'budget' ? 'bg-green-100 text-green-700' :
                          device.priceRange === 'mid' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {device.priceRange === 'budget' ? 'Бюджет' :
                           device.priceRange === 'mid' ? 'Середній' : 'Преміум'}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onDeviceSelect?.(device)}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredDevices.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Нічого не знайдено
            </h3>
            <p className="text-gray-600 mb-4">
              Спробуйте змінити параметри пошуку або фільтри
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedBrand(null);
                setSelectedCategory('all');
                setPriceFilter('all');
              }}
            >
              Скинути фільтри
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

