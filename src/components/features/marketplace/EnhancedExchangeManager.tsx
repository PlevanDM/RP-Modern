import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw,
  Package,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Minus,
  Upload,
  Image as ImageIcon,
  MessageSquare,
  DollarSign,
  Star,
  MapPin,
  Calendar,
  Eye,
  Heart,
  Send,
  Filter,
  Search,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { SparePart } from '../../../types/spareParts';

interface ExchangeProposal {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromPartId: string;
  fromPartTitle: string;
  fromPartPrice: number;
  fromPartPhotos: string[];
  toPartId: string;
  toPartTitle: string;
  toPartPrice: number;
  additionalPayment: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
}

interface EnhancedExchangeManagerProps {
  userParts?: SparePart[];
  availableForExchange?: SparePart[];
}

export function EnhancedExchangeManager({ 
  userParts = [], 
  availableForExchange = [] 
}: EnhancedExchangeManagerProps) {
  const [selectedUserPart, setSelectedUserPart] = useState<SparePart | null>(null);
  const [selectedExchangePart, setSelectedExchangePart] = useState<SparePart | null>(null);
  const [exchangeMessage, setExchangeMessage] = useState('');
  const [additionalPayment, setAdditionalPayment] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState<'browse' | 'proposals' | 'myOffers'>('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Mock data для демонстрації
  const mockUserParts: SparePart[] = useMemo(() => [
    {
      id: '1',
      title: 'iPhone 14 Pro Дисплей OLED',
      description: 'Оригінальний дисплей, без дефектів',
      category: 'Дисплеї',
      price: 8500,
      condition: 'Відмінний',
      photos: ['https://via.placeholder.com/300x200?text=iPhone+14+Display'],
      sellerName: 'Ви',
      sellerLocation: 'Київ',
      sellerRating: 4.9,
      views: 0,
      favorites: 0,
      createdAt: new Date(),
      exchangeAllowed: true,
      exchangeFor: ['Samsung S23 Display', 'iPhone 13 Pro Display']
    },
    {
      id: '2',
      title: 'MacBook Pro 16" Батарея',
      description: 'Оригінальна батарея, 95% здоров\'я',
      category: 'Батареї',
      price: 3200,
      condition: 'Відмінний',
      photos: ['https://via.placeholder.com/300x200?text=MacBook+Battery'],
      sellerName: 'Ви',
      sellerLocation: 'Київ',
      sellerRating: 4.9,
      views: 0,
      favorites: 0,
      createdAt: new Date(),
      exchangeAllowed: true,
      exchangeFor: ['Dell XPS Battery', 'Lenovo Battery']
    }
  ], []);

  const mockAvailableParts: SparePart[] = useMemo(() => [
    {
      id: '101',
      title: 'Samsung S23 Ultra Дисплей AMOLED',
      description: 'Оригінальний дисплей з рамкою, ідеальний стан',
      category: 'Дисплеї',
      price: 9200,
      condition: 'Новий',
      photos: ['https://via.placeholder.com/300x200?text=Samsung+S23+Display'],
      sellerName: 'Олександр М.',
      sellerLocation: 'Львів',
      sellerRating: 4.8,
      views: 45,
      favorites: 12,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      exchangeAllowed: true,
      exchangeFor: ['iPhone 14 Display', 'iPhone 13 Pro Display']
    },
    {
      id: '102',
      title: 'iPhone 13 Pro Дисплей',
      description: 'Оригінал, без жодних дефектів',
      category: 'Дисплеї',
      price: 7500,
      condition: 'Відмінний',
      photos: ['https://via.placeholder.com/300x200?text=iPhone+13+Display'],
      sellerName: 'Марія К.',
      sellerLocation: 'Одеса',
      sellerRating: 5.0,
      views: 67,
      favorites: 23,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      exchangeAllowed: true,
      exchangeFor: ['iPhone 14 Display', 'Samsung Display']
    },
    {
      id: '103',
      title: 'Dell XPS 15 Батарея',
      description: 'Оригінальна батарея Dell, 97Wh',
      category: 'Батареї',
      price: 3500,
      condition: 'Новий',
      photos: ['https://via.placeholder.com/300x200?text=Dell+Battery'],
      sellerName: 'Іван П.',
      sellerLocation: 'Харків',
      sellerRating: 4.7,
      views: 34,
      favorites: 8,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      exchangeAllowed: true,
      exchangeFor: ['MacBook Battery', 'Lenovo Battery']
    }
  ], []);

  const mockProposals: ExchangeProposal[] = useMemo(() => [
    {
      id: 'p1',
      fromUserId: 'user123',
      fromUserName: 'Дмитро С.',
      fromPartId: '201',
      fromPartTitle: 'Xiaomi 13 Pro Дисплей',
      fromPartPrice: 6800,
      fromPartPhotos: ['https://via.placeholder.com/300x200?text=Xiaomi+Display'],
      toPartId: '1',
      toPartTitle: 'iPhone 14 Pro Дисплей OLED',
      toPartPrice: 8500,
      additionalPayment: 1700,
      message: 'Привіт! Цікавить обмін з доплатою. Дисплей у відмінному стані, можу надати додаткові фото.',
      status: 'pending',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 'p2',
      fromUserId: 'user456',
      fromUserName: 'Анна В.',
      fromPartId: '202',
      fromPartTitle: 'iPhone 12 Дисплей',
      fromPartPrice: 5500,
      fromPartPhotos: ['https://via.placeholder.com/300x200?text=iPhone+12+Display'],
      toPartId: '1',
      toPartTitle: 'iPhone 14 Pro Дисплей OLED',
      toPartPrice: 8500,
      additionalPayment: 3000,
      message: 'Готова доплатити різницю. Дисплей оригінальний, є всі документи.',
      status: 'pending',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
    }
  ], []);

  const allUserParts = userParts.length > 0 ? userParts : mockUserParts;
  const allAvailableParts = availableForExchange.length > 0 ? availableForExchange : mockAvailableParts;

  const filteredParts = useMemo(() => {
    return allAvailableParts.filter(part => {
      const matchesSearch = part.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           part.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || part.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allAvailableParts, searchTerm, filterCategory]);

  const categories = useMemo(() => {
    const cats = new Set(allAvailableParts.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, [allAvailableParts]);

  const calculatePriceDifference = () => {
    if (!selectedUserPart || !selectedExchangePart) return 0;
    return selectedExchangePart.price - selectedUserPart.price;
  };

  const priceDifference = calculatePriceDifference();
  const needsAdditionalPayment = priceDifference > 0;

  const handleProposeExchange = () => {
    setShowConfirmation(true);
  };

  const handleConfirmExchange = () => {
    if (import.meta.env.DEV) {
      console.log('Exchange proposed:', {
        userPart: selectedUserPart,
        exchangePart: selectedExchangePart,
        additionalPayment: needsAdditionalPayment ? priceDifference : 0,
        message: exchangeMessage,
        photos: selectedPhotos
      });
    }
    // Reset
    setShowConfirmation(false);
    setSelectedUserPart(null);
    setSelectedExchangePart(null);
    setExchangeMessage('');
    setSelectedPhotos([]);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} ${days === 1 ? 'день' : 'дні'} тому`;
    if (hours > 0) return `${hours} год тому`;
    return 'Щойно';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl shadow-lg">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            Обмін Запчастинами
          </h1>
          <p className="text-gray-600 text-lg">
            Обміняйте свої запчастини на потрібні з можливістю доплати
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'browse', label: '🔍 Огляд', icon: Search },
            { key: 'proposals', label: '📨 Пропозиції', count: mockProposals.length, icon: MessageSquare },
            { key: 'myOffers', label: '📤 Мої пропозиції', icon: Send }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.key as any)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count && tab.count > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'browse' && (
            <motion.div
              key="browse"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {!showConfirmation ? (
                <>
                  {/* Search and Filters */}
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            placeholder="Пошук запчастин..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {categories.map((cat) => (
                            <Button
                              key={cat}
                              variant={filterCategory === cat ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setFilterCategory(cat)}
                              className="whitespace-nowrap"
                            >
                              {cat === 'all' ? 'Всі' : cat}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Your Parts */}
                    <Card className="border-2 border-orange-200">
                      <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
                        <CardTitle className="flex items-center gap-2 text-orange-700">
                          <Package className="w-5 h-5" />
                          Ваші запчастини
                          <Badge variant="secondary">{allUserParts.filter(p => p.exchangeAllowed).length}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 max-h-[600px] overflow-y-auto">
                        <div className="space-y-3">
                          {allUserParts.filter(p => p.exchangeAllowed).map((part) => (
                            <motion.button
                              key={part.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedUserPart(part)}
                              className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                                selectedUserPart?.id === part.id
                                  ? 'border-orange-500 bg-orange-50 shadow-lg'
                                  : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                              }`}
                            >
                              {part.photos && part.photos.length > 0 && (
                                <img
                                  src={part.photos[0]}
                                  alt={part.title}
                                  className="w-full h-32 object-cover rounded-lg mb-3"
                                />
                              )}
                              <div className="font-semibold text-sm mb-1">{part.title}</div>
                              <div className="text-xs text-gray-600 mb-2">{part.category}</div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-bold text-orange-600">{part.price} ₴</span>
                                <Badge variant="secondary" className="text-xs">
                                  {part.condition}
                                </Badge>
                              </div>
                              {part.exchangeFor && part.exchangeFor.length > 0 && (
                                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                                  <span className="font-medium">Шукаю:</span> {part.exchangeFor.slice(0, 2).join(', ')}
                                  {part.exchangeFor.length > 2 && '...'}
                                </div>
                              )}
                            </motion.button>
                          ))}
                          {allUserParts.filter(p => p.exchangeAllowed).length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                              <Package className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                              <p className="text-sm font-medium mb-2">Немає запчастин для обміну</p>
                              <Button size="sm" variant="outline" className="mt-2">
                                <Plus className="w-4 h-4 mr-2" />
                                Додати запчастину
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Exchange Visualization */}
                    <div className="hidden lg:flex items-center justify-center">
                      <Card className="w-full border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <motion.div
                              animate={{ 
                                rotate: [0, 180, 360],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                              className="mb-4"
                            >
                              <RefreshCw className="w-20 h-20 text-orange-500 mx-auto" />
                            </motion.div>
                            
                            {selectedUserPart && selectedExchangePart ? (
                              <div className="space-y-4">
                                <div className="text-sm font-medium text-gray-700">Різниця в ціні:</div>
                                <div className={`text-4xl font-bold ${
                                  priceDifference > 0 ? 'text-red-600' :
                                  priceDifference < 0 ? 'text-green-600' :
                                  'text-gray-600'
                                }`}>
                                  {priceDifference > 0 ? '+' : ''}{priceDifference} ₴
                                </div>
                                {needsAdditionalPayment && (
                                  <div className="p-3 bg-yellow-100 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                                    <div className="text-sm font-medium text-yellow-800">
                                      Потрібна доплата
                                    </div>
                                  </div>
                                )}
                                {priceDifference < 0 && (
                                  <div className="p-3 bg-green-100 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                                    <div className="text-sm font-medium text-green-800">
                                      Ви отримаєте {Math.abs(priceDifference)} ₴
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-gray-500 space-y-2">
                                <p className="text-sm">Оберіть запчастини для обміну</p>
                                <div className="flex items-center justify-center gap-2 text-xs">
                                  <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">1</div>
                                  <ArrowRight className="w-4 h-4" />
                                  <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">2</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Available for Exchange */}
                    <Card className="border-2 border-blue-200">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                        <CardTitle className="flex items-center gap-2 text-blue-700">
                          <RefreshCw className="w-5 h-5" />
                          Доступно для обміну
                          <Badge variant="secondary">{filteredParts.length}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 max-h-[600px] overflow-y-auto">
                        <div className="space-y-3">
                          {filteredParts.map((part) => (
                            <motion.button
                              key={part.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedExchangePart(part)}
                              className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                                selectedExchangePart?.id === part.id
                                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                              }`}
                            >
                              {part.photos && part.photos.length > 0 && (
                                <div className="relative mb-3">
                                  <img
                                    src={part.photos[0]}
                                    alt={part.title}
                                    className="w-full h-32 object-cover rounded-lg"
                                  />
                                  {part.photos.length > 1 && (
                                    <Badge className="absolute top-2 right-2 bg-black/70">
                                      <ImageIcon className="w-3 h-3 mr-1" />
                                      {part.photos.length}
                                    </Badge>
                                  )}
                                </div>
                              )}
                              <div className="font-semibold text-sm mb-1">{part.title}</div>
                              <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  {part.sellerRating}
                                </div>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {part.sellerLocation}
                                </div>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-bold text-blue-600">{part.price} ₴</span>
                                <Badge variant="secondary" className="text-xs">
                                  {part.condition}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {part.views}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart className="w-3 h-3" />
                                  {part.favorites}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {getTimeAgo(part.createdAt)}
                                </div>
                              </div>
                              {part.exchangeFor && part.exchangeFor.length > 0 && (
                                <div className="mt-2 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                                  <span className="font-medium">Шукає:</span> {part.exchangeFor.slice(0, 2).join(', ')}
                                  {part.exchangeFor.length > 2 && '...'}
                                </div>
                              )}
                            </motion.button>
                          ))}
                          {filteredParts.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                              <Search className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                              <p className="text-sm font-medium">Нічого не знайдено</p>
                              <p className="text-xs mt-1">Спробуйте змінити фільтри</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                /* Confirmation with Photos and Message */
                <Card className="max-w-4xl mx-auto">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
                    <CardTitle className="flex items-center gap-2">
                      <RefreshCw className="w-6 h-6 text-orange-600" />
                      Підтвердження обміну
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {/* Exchange Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
                          <div className="text-sm text-gray-600 mb-3 font-medium">Ви віддаєте:</div>
                          {selectedUserPart?.photos && selectedUserPart.photos[0] && (
                            <img
                              src={selectedUserPart.photos[0]}
                              alt={selectedUserPart.title}
                              className="w-full h-40 object-cover rounded-lg mb-3"
                            />
                          )}
                          <div className="font-bold text-lg mb-2">{selectedUserPart?.title}</div>
                          <div className="text-xs text-gray-600 mb-3">{selectedUserPart?.category}</div>
                          <div className="text-3xl font-bold text-orange-600">
                            {selectedUserPart?.price} ₴
                          </div>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                          <div className="text-sm text-gray-600 mb-3 font-medium">Ви отримуєте:</div>
                          {selectedExchangePart?.photos && selectedExchangePart.photos[0] && (
                            <img
                              src={selectedExchangePart.photos[0]}
                              alt={selectedExchangePart.title}
                              className="w-full h-40 object-cover rounded-lg mb-3"
                            />
                          )}
                          <div className="font-bold text-lg mb-2">{selectedExchangePart?.title}</div>
                          <div className="text-xs text-gray-600 mb-3">
                            {selectedExchangePart?.sellerName} • {selectedExchangePart?.sellerLocation}
                          </div>
                          <div className="text-3xl font-bold text-blue-600">
                            {selectedExchangePart?.price} ₴
                          </div>
                        </div>
                      </div>

                      {/* Additional Payment */}
                      {needsAdditionalPayment && (
                        <motion.div
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-yellow-500 rounded-lg">
                              <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-lg">Потрібна доплата</span>
                          </div>
                          <div className="text-4xl font-bold text-yellow-600 mb-2">
                            {priceDifference} ₴
                          </div>
                          <p className="text-sm text-gray-700">
                            Запчастина, яку ви хочете отримати, дорожча за вашу. Доплата буде утримана на платформі до завершення обміну.
                          </p>
                        </motion.div>
                      )}

                      {priceDifference < 0 && (
                        <motion.div
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-green-500 rounded-lg">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-lg">Ви отримаєте компенсацію</span>
                          </div>
                          <div className="text-4xl font-bold text-green-600 mb-2">
                            {Math.abs(priceDifference)} ₴
                          </div>
                          <p className="text-sm text-gray-700">
                            Ваша запчастина дорожча. Різниця буде перерахована вам після завершення обміну.
                          </p>
                        </motion.div>
                      )}

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Повідомлення продавцю
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                          <textarea
                            value={exchangeMessage}
                            onChange={(e) => setExchangeMessage(e.target.value)}
                            placeholder="Розкажіть про стан вашої запчастини, умови обміну тощо..."
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
                            rows={4}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {exchangeMessage.length} / 500 символів
                        </div>
                      </div>

                      {/* Photo Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Додаткові фото (необов'язково)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {selectedPhotos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={photo}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                onClick={() => removePhoto(index)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          {selectedPhotos.length < 6 && (
                            <label className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all">
                              <Upload className="w-6 h-6 text-gray-400 mb-1" />
                              <span className="text-xs text-gray-500">Додати фото</span>
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoUpload}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Максимум 6 фото. Додайте фото вашої запчастини для підвищення довіри.
                        </div>
                      </div>

                      {/* Terms */}
                      <div className="p-6 bg-gray-50 rounded-xl space-y-3 text-sm">
                        <div className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          Умови обміну:
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Обидві запчастини повинні відповідати опису та фото</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Доставка через Нову Пошту (кожен оплачує свою відправку)</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Можливість повернення протягом 3 днів при невідповідності</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Гарант-сервіс платформи включено (комісія 5%)</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Доплата утримується на платформі до підтвердження отримання</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowConfirmation(false);
                            setExchangeMessage('');
                            setSelectedPhotos([]);
                          }}
                          className="flex-1"
                          size="lg"
                        >
                          <XCircle className="w-5 h-5 mr-2" />
                          Скасувати
                        </Button>
                        <Button
                          onClick={handleConfirmExchange}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                          size="lg"
                        >
                          <Send className="w-5 h-5 mr-2" />
                          Відправити пропозицію
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {activeTab === 'proposals' && (
            <motion.div
              key="proposals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    Вхідні пропозиції
                    <Badge variant="destructive">{mockProposals.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProposals.map((proposal) => (
                      <motion.div
                        key={proposal.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="font-bold text-lg mb-1">{proposal.fromUserName}</div>
                            <div className="text-sm text-gray-600">{getTimeAgo(proposal.createdAt)}</div>
                          </div>
                          <Badge variant={proposal.status === 'pending' ? 'default' : 'secondary'}>
                            {proposal.status === 'pending' ? 'Очікує' : proposal.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-xs text-gray-600 mb-2">Пропонує:</div>
                            <div className="font-semibold mb-1">{proposal.fromPartTitle}</div>
                            <div className="text-xl font-bold text-blue-600">{proposal.fromPartPrice} ₴</div>
                          </div>
                          <div className="p-4 bg-orange-50 rounded-lg">
                            <div className="text-xs text-gray-600 mb-2">За вашу:</div>
                            <div className="font-semibold mb-1">{proposal.toPartTitle}</div>
                            <div className="text-xl font-bold text-orange-600">{proposal.toPartPrice} ₴</div>
                          </div>
                        </div>

                        {proposal.additionalPayment > 0 && (
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="w-4 h-4 text-yellow-600" />
                              <span className="font-medium">Доплата:</span>
                              <span className="font-bold text-yellow-600">{proposal.additionalPayment} ₴</span>
                            </div>
                          </div>
                        )}

                        <div className="p-4 bg-gray-50 rounded-lg mb-4">
                          <div className="text-sm text-gray-700">{proposal.message}</div>
                        </div>

                        {proposal.status === 'pending' && (
                          <div className="flex gap-3">
                            <Button variant="outline" className="flex-1">
                              <XCircle className="w-4 h-4 mr-2" />
                              Відхилити
                            </Button>
                            <Button className="flex-1 bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Прийняти
                            </Button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'myOffers' && (
            <motion.div
              key="myOffers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-6 h-6" />
                    Мої пропозиції
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <Send className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-medium">У вас поки немає відправлених пропозицій</p>
                    <p className="text-xs mt-1">Оберіть запчастини для обміну на вкладці "Огляд"</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        {!showConfirmation && selectedUserPart && selectedExchangePart && activeTab === 'browse' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Button
              size="lg"
              onClick={handleProposeExchange}
              className="shadow-2xl bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold px-8 py-6 text-lg"
            >
              <RefreshCw className="w-6 h-6 mr-3" />
              Запропонувати обмін
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

