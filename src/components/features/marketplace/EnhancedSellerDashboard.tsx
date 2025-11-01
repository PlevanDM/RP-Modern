import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  ShoppingCart,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Users,
  Calendar,
  Download,
  Upload,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  MoreVertical,
  Copy,
  Share2,
  RefreshCw,
  Zap,
  Award,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { SparePart, SellerStats } from '../../../types/spareParts';
import { financialService } from '../../../services/financialService';

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

export function EnhancedSellerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'orders' | 'earnings' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'sold' | 'reserved'>('all');
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');

  // Mock data з розширеною статистикою
  const sellerStats: SellerStats = {
    totalSales: 156,
    totalRevenue: 485600,
    activeListings: 24,
    soldItems: 132,
    rating: 4.9,
    reviewsCount: 98,
    responseTime: 8,
    completionRate: 98
  };

  const mockListings: SparePart[] = useMemo(() => [
    {
      id: '1',
      title: 'Дисплей iPhone 14 Pro OLED Original',
      description: 'Оригінальний OLED дисплей, без дефектів, гарантія 6 місяців',
      category: 'Дисплеї',
      condition: 'Як нова',
      compatibility: [{ brand: 'Apple', model: 'iPhone 14 Pro' }],
      sellerId: 'seller1',
      sellerName: 'TechParts UA',
      sellerRating: 4.9,
      sellerLocation: 'Київ',
      price: 8500,
      currency: 'UAH',
      negotiable: true,
      quantity: 3,
      inStock: true,
      shippingOptions: [],
      novaPoshtaEnabled: true,
      selfPickup: true,
      images: [],
      views: 456,
      favorites: 23,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      status: 'active',
      exchangeAllowed: false,
      photos: ['https://via.placeholder.com/300x200?text=iPhone+14+Display']
    },
    {
      id: '2',
      title: 'Батарея Samsung Galaxy S23 Ultra Original',
      description: 'Оригінальна батарея Samsung, 5000mAh',
      category: 'Батареї',
      condition: 'Нова',
      compatibility: [{ brand: 'Samsung', model: 'Galaxy S23 Ultra' }],
      sellerId: 'seller1',
      sellerName: 'TechParts UA',
      sellerRating: 4.9,
      sellerLocation: 'Київ',
      price: 1850,
      currency: 'UAH',
      negotiable: false,
      quantity: 8,
      inStock: true,
      shippingOptions: [],
      novaPoshtaEnabled: true,
      selfPickup: true,
      images: [],
      views: 234,
      favorites: 15,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      status: 'active',
      exchangeAllowed: true,
      photos: ['https://via.placeholder.com/300x200?text=Samsung+Battery']
    },
    {
      id: '3',
      title: 'Камера Xiaomi 13 Pro 50MP',
      description: 'Основна камера 50MP, ідеальний стан',
      category: 'Камери',
      condition: 'Відмінний',
      compatibility: [{ brand: 'Xiaomi', model: '13 Pro' }],
      sellerId: 'seller1',
      sellerName: 'TechParts UA',
      sellerRating: 4.9,
      sellerLocation: 'Київ',
      price: 3200,
      currency: 'UAH',
      negotiable: true,
      quantity: 0,
      inStock: false,
      shippingOptions: [],
      novaPoshtaEnabled: true,
      selfPickup: false,
      images: [],
      views: 189,
      favorites: 8,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      status: 'sold',
      exchangeAllowed: false,
      photos: ['https://via.placeholder.com/300x200?text=Xiaomi+Camera']
    }
  ], []);

  const commissionRates = financialService.getCommissionRates();
  const estimatedCommission = (sellerStats.totalRevenue * commissionRates.sale) / 100;
  const netRevenue = sellerStats.totalRevenue - estimatedCommission;

  // Статистичні картки
  const statsCards: StatCard[] = useMemo(() => [
    {
      title: 'Загальний дохід',
      value: `₴${sellerStats.totalRevenue.toLocaleString()}`,
      change: '+24.5%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Активні оголошення',
      value: sellerStats.activeListings,
      change: '+3',
      trend: 'up',
      icon: <Package className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Продано',
      value: sellerStats.soldItems,
      change: '+12',
      trend: 'up',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Рейтинг',
      value: sellerStats.rating.toFixed(1),
      change: '+0.3',
      trend: 'up',
      icon: <Star className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Час відповіді',
      value: `${sellerStats.responseTime} хв`,
      change: '-2 хв',
      trend: 'up',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Виконання',
      value: `${sellerStats.completionRate}%`,
      change: '+3%',
      trend: 'up',
      icon: <Target className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-600'
    }
  ], [sellerStats]);

  const filteredListings = useMemo(() => {
    return mockListings.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           listing.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || listing.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [mockListings, searchTerm, filterStatus]);

  const recentActivity = useMemo(() => [
    { 
      type: 'sale', 
      text: 'Продано: Камера Xiaomi 13 Pro', 
      amount: 3200,
      time: '2 год тому',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    },
    { 
      type: 'view', 
      text: 'Дисплей iPhone 14 Pro переглянули 12 разів', 
      time: '3 год тому',
      icon: <Eye className="w-5 h-5 text-blue-500" />
    },
    { 
      type: 'favorite', 
      text: 'Батарея Samsung додали в обране 3 рази', 
      time: '5 год тому',
      icon: <Heart className="w-5 h-5 text-red-500" />
    },
    { 
      type: 'message', 
      text: 'Нове повідомлення від покупця', 
      time: '6 год тому',
      icon: <AlertCircle className="w-5 h-5 text-orange-500" />
    },
    { 
      type: 'sale', 
      text: 'Продано: Дисплей iPhone 13', 
      amount: 6500,
      time: '1 день тому',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    }
  ], []);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                Кабінет Продавця
              </h1>
              <p className="text-gray-600 text-lg">
                Управління запчастинами та продажами
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Експорт
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500">
                <Plus className="w-4 h-4 mr-2" />
                Додати
              </Button>
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex gap-2">
            {(['day', 'week', 'month', 'year'] as const).map((p) => (
              <Button
                key={p}
                variant={period === p ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod(p)}
              >
                {p === 'day' ? 'День' : p === 'week' ? 'Тиждень' : p === 'month' ? 'Місяць' : 'Рік'}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: '📊 Огляд', icon: BarChart3 },
            { id: 'listings', label: '📦 Оголошення', count: mockListings.length, icon: Package },
            { id: 'orders', label: '🛒 Замовлення', icon: ShoppingCart },
            { id: 'earnings', label: '💰 Заробіток', icon: DollarSign },
            { id: 'analytics', label: '📈 Аналітика', icon: TrendingUp }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count && tab.count > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {statsCards.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                            {stat.icon}
                          </div>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            stat.trend === 'up' ? 'bg-green-100 text-green-700' :
                            stat.trend === 'down' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> :
                             stat.trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
                            {stat.change}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-500" />
                    Швидкі дії
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'Додати запчастину', icon: Plus, color: 'bg-blue-500' },
                      { label: 'Мої оголошення', icon: Package, color: 'bg-purple-500' },
                      { label: 'Статистика', icon: BarChart3, color: 'bg-green-500' },
                      { label: 'Вивести кошти', icon: Download, color: 'bg-orange-500' }
                    ].map((action, index) => (
                      <motion.button
                        key={action.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${action.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center gap-3`}
                      >
                        <action.icon className="w-6 h-6" />
                        <span className="font-medium text-sm text-center">{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Остання активність
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{activity.text}</div>
                          <div className="text-xs text-gray-600">{activity.time}</div>
                        </div>
                        {activity.amount && (
                          <div className="text-lg font-bold text-green-600">
                            +₴{activity.amount.toLocaleString()}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Досягнення
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { title: 'Топ продавець', desc: '98% виконання замовлень', icon: '🏆', color: 'bg-yellow-50' },
                        { title: 'Швидка відповідь', desc: 'Середній час: 8 хв', icon: '⚡', color: 'bg-blue-50' },
                        { title: 'Високий рейтинг', desc: '4.9/5.0 з 98 відгуків', icon: '⭐', color: 'bg-purple-50' }
                      ].map((achievement, i) => (
                        <div key={i} className={`p-4 ${achievement.color} rounded-lg`}>
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div>
                              <div className="font-semibold text-sm">{achievement.title}</div>
                              <div className="text-xs text-gray-600">{achievement.desc}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-500" />
                      Клієнти
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                        <div>
                          <div className="text-sm text-gray-600">Всього клієнтів</div>
                          <div className="text-2xl font-bold text-green-600">342</div>
                        </div>
                        <Users className="w-12 h-12 text-green-500 opacity-20" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                        <div>
                          <div className="text-sm text-gray-600">Повторні покупки</div>
                          <div className="text-2xl font-bold text-blue-600">67%</div>
                        </div>
                        <RefreshCw className="w-12 h-12 text-blue-500 opacity-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Listings Tab */}
          {activeTab === 'listings' && (
            <motion.div
              key="listings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search and Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        placeholder="Пошук оголошень..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex gap-2">
                      {[
                        { key: 'all', label: 'Всі' },
                        { key: 'active', label: 'Активні' },
                        { key: 'sold', label: 'Продані' },
                        { key: 'reserved', label: 'Зарезервовані' }
                      ].map((filter) => (
                        <Button
                          key={filter.key}
                          variant={filterStatus === filter.key ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFilterStatus(filter.key as any)}
                        >
                          {filter.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Listings Grid */}
              <div className="grid grid-cols-1 gap-4">
                {filteredListings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                          {/* Image */}
                          <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                            {listing.photos && listing.photos[0] ? (
                              <img src={listing.photos[0]} alt={listing.title} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-16 h-16 text-gray-400" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 w-full">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1">{listing.title}</h3>
                                <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-2xl font-bold text-blue-600">{listing.price} ₴</div>
                                {listing.negotiable && (
                                  <Badge variant="secondary" className="mt-1">Торг</Badge>
                                )}
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {listing.views} переглядів
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {listing.favorites} в обраному
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {getTimeAgo(listing.createdAt)}
                              </div>
                              <Badge className={`${
                                listing.status === 'active' ? 'bg-green-100 text-green-700' :
                                listing.status === 'sold' ? 'bg-gray-100 text-gray-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {listing.status === 'active' ? 'Активне' :
                                 listing.status === 'sold' ? 'Продано' : 'Зарезервовано'}
                              </Badge>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4 mr-2" />
                                Редагувати
                              </Button>
                              <Button size="sm" variant="outline">
                                <Copy className="w-4 h-4 mr-2" />
                                Дублювати
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share2 className="w-4 h-4 mr-2" />
                                Поділитися
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Видалити
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {filteredListings.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-600 mb-4">Оголошень не знайдено</p>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Додати запчастину
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <motion.div
              key="earnings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Financial Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      Фінансова статистика
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                        <div className="text-sm text-gray-600 mb-2">Загальний дохід</div>
                        <div className="text-4xl font-bold text-green-600 mb-1">
                          ₴{sellerStats.totalRevenue.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <TrendingUp className="w-4 h-4" />
                          +24.5% за місяць
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
                        <div className="text-sm text-gray-600 mb-2">Комісія платформи ({commissionRates.sale}%)</div>
                        <div className="text-4xl font-bold text-red-600 mb-1">
                          -₴{estimatedCommission.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Включає гарант-сервіс
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                        <div className="text-sm text-gray-600 mb-2">Чистий дохід</div>
                        <div className="text-4xl font-bold text-blue-600 mb-1">
                          ₴{netRevenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Доступно для виведення
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500" size="lg">
                      <Download className="w-5 h-5 mr-2" />
                      Вивести кошти
                    </Button>
                  </CardContent>
                </Card>

                {/* Commission Rates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                      Ставки комісії
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { label: 'Продаж запчастин', value: `${commissionRates.sale}%`, color: 'bg-blue-100 text-blue-700' },
                        { label: 'Гарант-сервіс', value: `${commissionRates.escrow}%`, color: 'bg-purple-100 text-purple-700' },
                        { label: 'Виведення коштів', value: `${commissionRates.withdrawal}%`, color: 'bg-orange-100 text-orange-700' },
                        { label: 'Мінімальна комісія', value: `${commissionRates.minCommission} ₴`, color: 'bg-gray-100 text-gray-700' }
                      ].map((rate, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="font-medium text-sm">{rate.label}</span>
                          <Badge className={rate.color}>{rate.value}</Badge>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Інформація про комісію</p>
                          <p className="text-xs">
                            Комісія автоматично утримується при кожній транзакції. 
                            Гарант-сервіс захищає обидві сторони угоди.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Детальна аналітика
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">Аналітика в розробці</p>
                    <p className="text-sm">Тут буде детальна статистика продажів, графіки та звіти</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

