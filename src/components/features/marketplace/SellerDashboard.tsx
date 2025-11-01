import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  DollarSign,
  TrendingUp,
  Eye,
  Heart,
  ShoppingCart,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { SparePart, SellerStats } from '../../../types/spareParts';
import { financialService } from '../../../services/financialService';

export function SellerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'orders' | 'earnings'>('overview');

  // Mock data
  const sellerStats: SellerStats = {
    totalSales: 45,
    totalRevenue: 125000,
    activeListings: 12,
    soldItems: 33,
    rating: 4.8,
    reviewsCount: 28,
    responseTime: 15,
    completionRate: 95
  };

  const mockListings: SparePart[] = [
    {
      id: '1',
      title: 'Дисплей iPhone 14 Pro OLED Original',
      description: 'Оригінальний OLED дисплей',
      category: 'screen',
      condition: 'like-new',
      compatibility: [{ brand: 'Apple', model: 'iPhone 14 Pro' }],
      sellerId: 'seller1',
      sellerName: 'TechParts UA',
      sellerRating: 4.8,
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
      views: 245,
      favorites: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active',
      exchangeAllowed: false
    }
  ];

  const commissionRates = financialService.getCommissionRates();
  const estimatedCommission = (sellerStats.totalRevenue * commissionRates.sale) / 100;
  const netRevenue = sellerStats.totalRevenue - estimatedCommission;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Кабінет Продавця
          </h1>
          <p className="text-gray-600">Управління запчастинами та продажами</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Огляд', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'listings', label: 'Оголошення', icon: <Package className="w-4 h-4" /> },
            { id: 'orders', label: 'Замовлення', icon: <ShoppingCart className="w-4 h-4" /> },
            { id: 'earnings', label: 'Заробіток', icon: <DollarSign className="w-4 h-4" /> }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as any)}
              className="whitespace-nowrap"
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Активні оголошення</span>
                    <Package className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold">{sellerStats.activeListings}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {sellerStats.soldItems} продано
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Загальний дохід</span>
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold">{sellerStats.totalRevenue.toLocaleString()} ₴</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Комісія: {estimatedCommission.toLocaleString()} ₴
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Рейтинг</span>
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-3xl font-bold">{sellerStats.rating}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {sellerStats.reviewsCount} відгуків
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Час відповіді</span>
                    <Clock className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="text-3xl font-bold">{sellerStats.responseTime}хв</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {sellerStats.completionRate}% виконання
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Швидкі дії</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button className="h-24">
                    <div className="flex flex-col items-center gap-2">
                      <Plus className="w-6 h-6" />
                      <span>Додати запчастину</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-24">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="w-6 h-6" />
                      <span>Мої оголошення</span>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-24">
                    <div className="flex flex-col items-center gap-2">
                      <BarChart3 className="w-6 h-6" />
                      <span>Статистика</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Остання активність</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'view', text: 'Дисплей iPhone 14 Pro переглянули 5 разів', time: '2 год тому' },
                    { type: 'favorite', text: 'Батарея Samsung додали в обране', time: '5 год тому' },
                    { type: 'sale', text: 'Продано: Камера Xiaomi 13', time: '1 день тому' }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      {activity.type === 'view' && <Eye className="w-5 h-5 text-blue-500" />}
                      {activity.type === 'favorite' && <Heart className="w-5 h-5 text-red-500" />}
                      {activity.type === 'sale' && <CheckCircle className="w-5 h-5 text-green-500" />}
                      <div className="flex-1">
                        <div className="font-medium text-sm">{activity.text}</div>
                        <div className="text-xs text-gray-600">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Мої оголошення</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Додати запчастину
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {mockListings.map((listing) => (
                <Card key={listing.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{listing.title}</h3>
                            <p className="text-sm text-gray-600">{listing.description}</p>
                          </div>
                          <div className="text-2xl font-bold">{listing.price} ₴</div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {listing.views} переглядів
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {listing.favorites} в обраному
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            listing.status === 'active' ? 'bg-green-100 text-green-700' :
                            listing.status === 'sold' ? 'bg-gray-100 text-gray-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {listing.status === 'active' ? 'Активне' :
                             listing.status === 'sold' ? 'Продано' : 'Зарезервовано'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            Редагувати
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Видалити
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Фінансова статистика</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium">Загальний дохід</span>
                    <span className="text-2xl font-bold text-green-600">
                      {sellerStats.totalRevenue.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                    <span className="font-medium">Комісія платформи ({commissionRates.sale}%)</span>
                    <span className="text-2xl font-bold text-red-600">
                      -{estimatedCommission.toLocaleString()} ₴
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">Чистий дохід</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {netRevenue.toLocaleString()} ₴
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-4">Ставки комісії</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Продаж запчастин:</span>
                      <span className="font-medium">{commissionRates.sale}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Гарант-сервіс:</span>
                      <span className="font-medium">{commissionRates.escrow}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Виведення коштів:</span>
                      <span className="font-medium">{commissionRates.withdrawal}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Мінімальна комісія:</span>
                      <span className="font-medium">{commissionRates.minCommission} ₴</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6">
                  Вивести кошти
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

