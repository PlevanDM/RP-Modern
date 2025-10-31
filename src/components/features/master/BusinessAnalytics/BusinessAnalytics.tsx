import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock, Star, Users } from 'lucide-react';

export function BusinessAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock analytics data
  const analyticsData = {
    revenue: {
      current: 45000,
      previous: 38000,
      change: 18.4,
      trend: 'up'
    },
    orders: {
      current: 28,
      previous: 22,
      change: 27.3,
      trend: 'up'
    },
    rating: {
      current: 4.8,
      previous: 4.6,
      change: 4.3,
      trend: 'up'
    },
    avgCompletionTime: {
      current: 2.3,
      previous: 2.8,
      change: -17.9,
      trend: 'down'
    }
  };

  const monthlyData = [
    { month: 'Січень', revenue: 35000, orders: 22, rating: 4.7 },
    { month: 'Лютий', revenue: 42000, orders: 26, rating: 4.8 },
    { month: 'Березень', revenue: 45000, orders: 28, rating: 4.8 },
    { month: 'Квітень', revenue: 48000, orders: 30, rating: 4.9 }
  ];

  const servicePopularity = [
    { service: 'iPhone ремонт', orders: 45, revenue: 18000 },
    { service: 'MacBook ремонт', orders: 28, revenue: 22000 },
    { service: 'iPad ремонт', orders: 15, revenue: 8000 },
    { service: 'Apple Watch ремонт', orders: 12, revenue: 6000 }
  ];

  const deviceDistribution = [
    { device: 'iPhone', percentage: 45 },
    { device: 'MacBook', percentage: 28 },
    { device: 'iPad', percentage: 15 },
    { device: 'Apple Watch', percentage: 12 }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Бізнес-аналітика</h1>
          <div className="flex space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Тиждень</option>
              <option value="month">Місяць</option>
              <option value="quarter">Квартал</option>
              <option value="year">Рік</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Дохід</h3>
                <p className="text-3xl font-bold text-blue-600">₴{analyticsData.revenue.current.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-2">
                  {getTrendIcon(analyticsData.revenue.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(analyticsData.revenue.trend)}`}>
                    +{analyticsData.revenue.change}%
                  </span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-900">Замовлення</h3>
                <p className="text-3xl font-bold text-green-600">{analyticsData.orders.current}</p>
                <div className="flex items-center space-x-1 mt-2">
                  {getTrendIcon(analyticsData.orders.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(analyticsData.orders.trend)}`}>
                    +{analyticsData.orders.change}%
                  </span>
                </div>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-yellow-900">Рейтинг</h3>
                <p className="text-3xl font-bold text-yellow-600">{analyticsData.rating.current}</p>
                <div className="flex items-center space-x-1 mt-2">
                  {getTrendIcon(analyticsData.rating.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(analyticsData.rating.trend)}`}>
                    +{analyticsData.rating.change}%
                  </span>
                </div>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-900">Час виконання</h3>
                <p className="text-3xl font-bold text-purple-600">{analyticsData.avgCompletionTime.current} год</p>
                <div className="flex items-center space-x-1 mt-2">
                  {getTrendIcon(analyticsData.avgCompletionTime.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(analyticsData.avgCompletionTime.trend)}`}>
                    {analyticsData.avgCompletionTime.change}%
                  </span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Динаміка доходу (6 місяців)</h3>
            <div className="space-y-3">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{data.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(data.revenue / 50000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">₴{data.revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Popularity */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Популярність послуг</h3>
            <div className="space-y-3">
              {servicePopularity.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{service.service}</span>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(service.orders / 50) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{service.orders}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Розподіл пристроїв</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {deviceDistribution.map((device, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 relative">
                  <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {device.percentage}%
                  </div>
                </div>
                <p className="text-sm text-gray-600">{device.device}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Section */}
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Цілі на місяць</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Дохід: ₴50,000</span>
                <span className="text-sm text-gray-500">₴45,000 / ₴50,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Рейтинг: 4.9</span>
                <span className="text-sm text-gray-500">4.8 / 4.9</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Замовлення: 30</span>
                <span className="text-sm text-gray-500">28 / 30</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '93%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
