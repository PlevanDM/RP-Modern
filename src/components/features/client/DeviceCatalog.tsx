import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronRight,
  Plus,
  Apple,
  Smartphone,
  Tablet,
  Clock,
  DollarSign,
  Star,
  Filter,
  X,
  ArrowRight,
  Package,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { APPLE_MODELS } from '../../../utils/appleModels';

// Типи брендов
interface Brand {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  models: string[];
}

// Бренды и их модели
const DEVICE_BRANDS: Brand[] = [
  {
    id: 'apple',
    name: 'Apple',
    icon: <Apple className="w-6 h-6 text-black" />,
    color: 'from-gray-900 to-gray-700',
    models: [
      'iPhone 14 Pro',
      'iPhone 14 Pro Max',
      'iPhone 14',
      'iPhone 13 Pro',
      'iPhone 13',
      'iPhone 12',
      'iPhone SE',
      'iPad Pro',
      'iPad Air',
      'MacBook Pro',
      'AirPods Pro'
    ]
  },
  {
    id: 'samsung',
    name: 'Samsung',
    icon: <Smartphone className="w-6 h-6 text-blue-400" />,
    color: 'from-blue-600 to-blue-400',
    models: [
      'Galaxy S24 Ultra',
      'Galaxy S24+',
      'Galaxy S24',
      'Galaxy S23 Ultra',
      'Galaxy A54',
      'Galaxy A14',
      'Galaxy Z Fold 5',
      'Galaxy Tab S9',
      'Galaxy Buds2'
    ]
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    icon: <Smartphone className="w-6 h-6 text-red-400" />,
    color: 'from-red-600 to-red-400',
    models: [
      'Xiaomi 14 Ultra',
      'Xiaomi 14',
      'Xiaomi 13T Pro',
      'Xiaomi 13',
      'Xiaomi 12T Pro',
      'Redmi Note 13',
      'Redmi 13',
      'Redmi Pad',
      'Xiaomi Buds 5'
    ]
  },
  {
    id: 'google',
    name: 'Google Pixel',
    icon: <Smartphone className="w-6 h-6 text-green-400" />,
    color: 'from-green-600 to-green-400',
    models: [
      'Pixel 8 Pro',
      'Pixel 8',
      'Pixel 7a',
      'Pixel Fold',
      'Pixel Tablet'
    ]
  },
  {
    id: 'oneplus',
    name: 'OnePlus',
    icon: <Smartphone className="w-6 h-6 text-red-500" />,
    color: 'from-red-700 to-red-500',
    models: [
      'OnePlus 12',
      'OnePlus 11',
      'OnePlus 12 Pro',
      'OnePlus Nord 3',
      'OnePlus Pad'
    ]
  },
  {
    id: 'asus',
    name: 'ASUS',
    icon: <Smartphone className="w-6 h-6 text-cyan-400" />,
    color: 'from-cyan-600 to-cyan-400',
    models: [
      'ROG Phone 8 Pro',
      'ROG Phone 8',
      'ZenFone 10',
      'ASUS Pad',
      'ROG Ally'
    ]
  },
  {
    id: 'oppo',
    name: 'Oppo',
    icon: <Smartphone className="w-6 h-6 text-green-500" />,
    color: 'from-green-700 to-green-500',
    models: [
      'Find X6 Pro',
      'Find X6',
      'Reno 10',
      'A78',
      'Oppo Pad'
    ]
  },
  {
    id: 'vivo',
    name: 'Vivo',
    icon: <Smartphone className="w-6 h-6 text-blue-600" />,
    color: 'from-blue-700 to-blue-500',
    models: [
      'X90 Pro',
      'X90',
      'V27',
      'Y100',
      'Vivo Pad'
    ]
  },
  {
    id: 'dji',
    name: 'DJI',
    icon: <Tablet className="w-6 h-6 text-orange-400" />,
    color: 'from-orange-600 to-orange-400',
    models: [
      'Mavic 3 Pro',
      'Mavic 3',
      'Air 3S',
      'Mini 3 Pro',
      'Mini 2'
    ]
  },
  {
    id: 'gopro',
    name: 'GoPro',
    icon: <Smartphone className="w-6 h-6 text-red-600" />,
    color: 'from-red-800 to-red-600',
    models: [
      'Hero 12',
      'Hero 11',
      'Hero 10',
      'Max'
    ]
  }
];

// Типы проблем
const ISSUE_TYPES = [
  '🔧 Розбитий екран',
  '🔋 Не тримає батарея',
  '💧 Пошкодження водою',
  '📷 Проблема з камерою',
  '🔊 Проблема зі звуком',
  '📡 Проблема з зв\'язком',
  '⚡ Не включається',
  '🌡️ Перегрівання',
  '🎮 Проблема з сенсором',
  '🔌 Проблема з портом'
];

interface CreateOrderData {
  brand: string;
  model: string;
  issue: string;
  description: string;
  phone: string;
}

export function DeviceCatalog({ onCreateOrder }: { onCreateOrder?: (data: any) => void }) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderData, setOrderData] = useState<CreateOrderData>({
    brand: '',
    model: '',
    issue: '',
    description: '',
    phone: ''
  });

  const filteredBrands = DEVICE_BRANDS.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedBrandData = DEVICE_BRANDS.find(b => b.id === selectedBrand);
  const filteredModels = selectedBrandData?.models || [];

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    setSelectedModel(null);
    setSelectedIssue(null);
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
  };

  const handleIssueSelect = (issue: string) => {
    setSelectedIssue(issue);
    if (selectedBrand && selectedModel) {
      setOrderData({
        ...orderData,
        brand: selectedBrandData?.name || '',
        model: selectedModel,
        issue: issue
      });
      setShowOrderForm(true);
    }
  };

  const handleCreateOrder = () => {
    if (orderData.brand && orderData.model && orderData.issue && orderData.phone) {
      if (onCreateOrder) {
        onCreateOrder(orderData);
      }
      // Reset
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedIssue(null);
      setShowOrderForm(false);
      setOrderData({
        brand: '',
        model: '',
        issue: '',
        description: '',
        phone: ''
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-6 w-full"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Каталог Пристроїв</h1>
        <p className="text-gray-600">Знайдіть свое пристрій и створіть заявку на ремонт</p>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Пошук бренду..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </motion.div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Brands */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Бренди
              </CardTitle>
              <CardDescription>Виберіть виробника</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredBrands.map((brand) => (
                <motion.button
                  key={brand.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleBrandSelect(brand.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    selectedBrand === brand.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-background hover:bg-accent'
                  }`}
                >
                  <div className="p-2 bg-background/50 rounded-lg">
                    {brand.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{brand.name}</p>
                    <p className="text-xs opacity-70">{brand.models.length} моделей</p>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </motion.button>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Middle Column - Models */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Моделі
              </CardTitle>
              <CardDescription>
                {selectedBrand ? `${selectedBrandData?.name}` : 'Виберіть бренд'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
              {selectedBrand ? (
                filteredModels.length > 0 ? (
                  filteredModels.map((model) => (
                    <motion.button
                      key={model}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleModelSelect(model)}
                      className={`w-full flex items-center gap-2 p-3 rounded-lg transition-all ${
                        selectedModel === model
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-background hover:bg-accent'
                      }`}
                    >
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm">{model}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </motion.button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Немає моделей
                  </p>
                )
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Виберіть бренд щоб побачити моделі
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Issues */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Проблема
              </CardTitle>
              <CardDescription>
                {selectedModel ? `${selectedModel}` : 'Виберіть модель'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
              {selectedModel ? (
                ISSUE_TYPES.map((issue) => (
                  <motion.button
                    key={issue}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleIssueSelect(issue)}
                    className={`w-full flex items-center gap-2 p-3 rounded-lg transition-all text-left ${
                      selectedIssue === issue
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-background hover:bg-accent'
                    }`}
                  >
                    <span className="text-lg">{issue.split(' ')[0]}</span>
                    <span className="font-medium text-sm flex-1">
                      {issue.split(' ').slice(1).join(' ')}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </motion.button>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Виберіть модель щоб побачити проблеми
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Order Form Modal */}
      <AnimatePresence>
        {showOrderForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Створити Заявку</h2>
                <button
                  onClick={() => setShowOrderForm(false)}
                  className="p-1 hover:bg-accent rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Summary */}
                <div className="bg-accent/50 p-4 rounded-lg space-y-2">
                  <p className="text-sm text-muted-foreground">Пристрій:</p>
                  <p className="font-semibold text-lg">
                    {orderData.brand} {orderData.model}
                  </p>
                  <p className="text-sm text-muted-foreground">Проблема:</p>
                  <p className="font-semibold">{orderData.issue}</p>
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ваш номер телефону
                  </label>
                  <Input
                    type="tel"
                    placeholder="+380 XX XXX XXXX"
                    value={orderData.phone}
                    onChange={(e) =>
                      setOrderData({ ...orderData, phone: e.target.value })
                    }
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Додаткові деталі (необов\'язково)
                  </label>
                  <textarea
                    placeholder="Опишіть проблему детальніше..."
                    value={orderData.description}
                    onChange={(e) =>
                      setOrderData({ ...orderData, description: e.target.value })
                    }
                    className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowOrderForm(false)}
                    className="flex-1"
                  >
                    Скасувати
                  </Button>
                  <Button
                    onClick={handleCreateOrder}
                    disabled={!orderData.phone}
                    className="flex-1 gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Створити
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredBrands.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Бренд не знайдено</p>
          <p className="text-sm text-gray-500">Спробуйте інший запит</p>
        </motion.div>
      )}
    </motion.div>
  );
}
