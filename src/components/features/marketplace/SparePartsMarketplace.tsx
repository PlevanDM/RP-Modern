import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  ShoppingCart,
  Package,
  TrendingUp,
  MapPin,
  Truck,
  Star,
  Heart,
  Eye,
  Plus,
  Settings,
  DollarSign,
  RefreshCw,
  CheckCircle,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { SparePart, PartCategory, PartCondition, MarketplaceFilters } from '../../../types/spareParts';

export function SparePartsMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PartCategory | 'all'>('all');
  const [selectedCondition, setSelectedCondition] = useState<PartCondition | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popular'>('newest');

  // Mock data - буде замінено на API
  const mockParts: SparePart[] = [
    {
      id: '1',
      title: 'Дисплей iPhone 14 Pro OLED Original',
      description: 'Оригінальний OLED дисплей для iPhone 14 Pro. Повністю робочий, без дефектів.',
      category: 'screen',
      condition: 'like-new',
      compatibility: [{ brand: 'Apple', model: 'iPhone 14 Pro', year: 2022 }],
      sellerId: 'seller1',
      sellerName: 'TechParts UA',
      sellerRating: 4.8,
      sellerLocation: 'Київ',
      price: 8500,
      currency: 'UAH',
      negotiable: true,
      quantity: 3,
      inStock: true,
      shippingOptions: [
        { id: '1', type: 'nova-poshta', name: 'Нова Пошта', price: 70, estimatedDays: 1 },
        { id: '2', type: 'self-pickup', name: 'Самовивіз', price: 0, estimatedDays: 0 }
      ],
      novaPoshtaEnabled: true,
      selfPickup: true,
      images: ['/parts/iphone14-display.jpg'],
      views: 245,
      favorites: 12,
      createdAt: new Date('2024-11-01'),
      updatedAt: new Date('2024-11-01'),
      status: 'active',
      exchangeAllowed: false
    },
    {
      id: '2',
      title: 'Батарея Samsung Galaxy S23 Ultra Original',
      description: 'Оригінальна батарея Samsung 5000mAh. Нова, запечатана.',
      category: 'battery',
      condition: 'new',
      compatibility: [{ brand: 'Samsung', model: 'Galaxy S23 Ultra', year: 2023 }],
      sellerId: 'seller2',
      sellerName: 'Mobile Parts Pro',
      sellerRating: 4.9,
      sellerLocation: 'Львів',
      price: 1200,
      currency: 'UAH',
      negotiable: false,
      quantity: 10,
      inStock: true,
      shippingOptions: [
        { id: '1', type: 'nova-poshta', name: 'Нова Пошта', price: 60, estimatedDays: 2 }
      ],
      novaPoshtaEnabled: true,
      selfPickup: false,
      images: ['/parts/samsung-battery.jpg'],
      views: 189,
      favorites: 8,
      createdAt: new Date('2024-10-28'),
      updatedAt: new Date('2024-10-28'),
      status: 'active',
      exchangeAllowed: true,
      exchangeFor: ['Батарея iPhone 13 Pro']
    }
  ];

  const categories: { id: PartCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Всі', icon: <Package className="w-4 h-4" /> },
    { id: 'screen', label: 'Екрани', icon: <Package className="w-4 h-4" /> },
    { id: 'battery', label: 'Батареї', icon: <Package className="w-4 h-4" /> },
    { id: 'camera', label: 'Камери', icon: <Package className="w-4 h-4" /> },
    { id: 'motherboard', label: 'Плати', icon: <Package className="w-4 h-4" /> },
    { id: 'charging-port', label: 'Роз\'єми', icon: <Package className="w-4 h-4" /> },
  ];

  const conditions: { id: PartCondition | 'all'; label: string; color: string }[] = [
    { id: 'all', label: 'Всі', color: 'gray' },
    { id: 'new', label: 'Нова', color: 'green' },
    { id: 'like-new', label: 'Як нова', color: 'blue' },
    { id: 'excellent', label: 'Відмінний', color: 'cyan' },
    { id: 'good', label: 'Хороший', color: 'yellow' },
    { id: 'fair', label: 'Задовільний', color: 'orange' },
  ];

  // Filtered parts
  const filteredParts = useMemo(() => {
    let parts = mockParts;

    if (searchQuery) {
      parts = parts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      parts = parts.filter(p => p.category === selectedCategory);
    }

    if (selectedCondition !== 'all') {
      parts = parts.filter(p => p.condition === selectedCondition);
    }

    parts = parts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        parts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        parts.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        parts.sort((a, b) => b.views - a.views);
        break;
      case 'newest':
      default:
        parts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return parts;
  }, [mockParts, searchQuery, selectedCategory, selectedCondition, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                🛒 Торгова Майданка Запчастин
              </h1>
              <p className="text-gray-600">
                {filteredParts.length} запчастин • Швидка доставка Новою Поштою
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Кошик (0)
              </Button>
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Додати запчастину
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Пошук запчастин..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-gray-400" />
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

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="whitespace-nowrap"
              >
                {cat.icon}
                <span className="ml-2">{cat.label}</span>
              </Button>
            ))}
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <Card>
                  <CardContent className="p-4 space-y-4">
                    {/* Condition */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Стан</label>
                      <div className="flex flex-wrap gap-2">
                        {conditions.map((cond) => (
                          <Button
                            key={cond.id}
                            variant={selectedCondition === cond.id ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCondition(cond.id)}
                          >
                            {cond.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Ціна: {priceRange[0]} - {priceRange[1]} грн
                      </label>
                      <div className="flex gap-4">
                        <Input
                          type="number"
                          placeholder="Від"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                        />
                        <Input
                          type="number"
                          placeholder="До"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                        />
                      </div>
                    </div>

                    {/* Sort */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Сортування</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="newest">Найновіші</option>
                        <option value="price-low">Ціна: від низької</option>
                        <option value="price-high">Ціна: від високої</option>
                        <option value="popular">Популярні</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredParts.map((part) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="p-0">
                  <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-300" />
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      {part.exchangeAllowed && (
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                          <RefreshCw className="w-3 h-3 inline mr-1" />
                          Обмін
                        </span>
                      )}
                      {part.novaPoshtaEnabled && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                          <Truck className="w-3 h-3 inline mr-1" />
                          НП
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {part.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                      {conditions.find(c => c.id === part.condition)?.label}
                    </span>
                    <span className="text-xs text-gray-600 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {part.sellerLocation}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{part.sellerRating}</span>
                    <span className="text-xs text-gray-600">{part.sellerName}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {part.price} ₴
                      </div>
                      {part.negotiable && (
                        <div className="text-xs text-gray-600">Торг</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm">
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-3 pt-3 border-t text-xs text-gray-600">
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {part.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {part.favorites}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredParts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Нічого не знайдено
            </h3>
            <p className="text-gray-600 mb-4">
              Спробуйте змінити параметри пошуку
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedCondition('all');
              setPriceRange([0, 10000]);
            }}>
              Скинути фільтри
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

