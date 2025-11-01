import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Clock,
  Star,
  Users,
  CheckCircle,
  AlertCircle,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { useTranslation } from 'react-i18next';

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

export function EnhancedMasterDashboard() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');

  // Mock data - буде замінено на реальні дані з API
  const stats: StatCard[] = useMemo(() => [
    {
      title: 'Загальний дохід',
      value: '₴45,230',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Активні замовлення',
      value: 8,
      change: '+3',
      trend: 'up',
      icon: <Package className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Завершено',
      value: 156,
      change: '+24',
      trend: 'up',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Рейтинг',
      value: '4.9',
      change: '+0.2',
      trend: 'up',
      icon: <Star className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Час відповіді',
      value: '12 хв',
      change: '-3 хв',
      trend: 'up',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Нові клієнти',
      value: 23,
      change: '+8',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-600'
    }
  ], []);

  const recentOrders = [
    {
      id: '1',
      client: 'Іван Петренко',
      device: 'iPhone 14 Pro',
      issue: 'Заміна екрану',
      price: 8500,
      status: 'in_progress',
      time: '2 год тому'
    },
    {
      id: '2',
      client: 'Марія Коваль',
      device: 'Samsung S23 Ultra',
      issue: 'Заміна батареї',
      price: 1200,
      status: 'pending',
      time: '5 год тому'
    },
    {
      id: '3',
      client: 'Олександр Сидоренко',
      device: 'MacBook Pro',
      issue: 'Чистка від пилу',
      price: 800,
      status: 'completed',
      time: '1 день тому'
    }
  ];

  const quickActions = [
    { label: 'Нове замовлення', icon: <Package className="w-5 h-5" />, color: 'bg-blue-500' },
    { label: 'Запчастини', icon: <Zap className="w-5 h-5" />, color: 'bg-purple-500' },
    { label: 'Статистика', icon: <BarChart3 className="w-5 h-5" />, color: 'bg-green-500' },
    { label: 'Календар', icon: <Calendar className="w-5 h-5" />, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Панель Майстра
            </h1>
            <p className="text-gray-600">Вітаємо! Ось ваша статистика за {period === 'day' ? 'день' : period === 'week' ? 'тиждень' : period === 'month' ? 'місяць' : 'рік'}</p>
          </motion.div>

          {/* Period Selector */}
          <div className="flex gap-2 mt-4">
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
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
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
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Швидкі дії</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${action.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center gap-3`}
                >
                  {action.icon}
                  <span className="font-medium text-sm">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Останні замовлення</CardTitle>
              <Button variant="outline" size="sm">
                Всі замовлення
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      order.status === 'completed' ? 'bg-green-100 text-green-600' :
                      order.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {order.status === 'completed' ? <CheckCircle className="w-6 h-6" /> :
                       order.status === 'in_progress' ? <Clock className="w-6 h-6" /> :
                       <AlertCircle className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{order.client}</p>
                      <p className="text-sm text-gray-600">{order.device} • {order.issue}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₴{order.price}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status === 'completed' ? 'Завершено' :
                       order.status === 'in_progress' ? 'В роботі' : 'Очікує'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

