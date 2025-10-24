"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Wrench,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertCircle,
  Award,
  Package,
  Filter,
  Download,
  MoreVertical,
  ArrowRight,
  LayoutDashboard
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Input } from '../../../ui/input';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  color: string;
}

interface RecentTransaction {
  id: string;
  type: 'repair' | 'payment' | 'review' | 'order';
  description: string;
  user: string;
  timestamp: string;
  icon: React.ReactNode;
}

interface TopMaster {
  id: string;
  initials: string;
  name: string;
  repairs: number;
  rating: number;
  avatar: string;
}

const ModernAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const stats: StatCard[] = [
    {
      title: 'Загальний дохід',
      value: '₴125,350',
      change: '+23.5%',
      icon: <DollarSign className="w-6 h-6" />,
      trend: 'up',
      color: 'bg-blue-500/10 text-blue-600'
    },
    {
      title: 'Активні ремонти',
      value: '487',
      change: '+12.3%',
      icon: <Wrench className="w-6 h-6" />,
      trend: 'up',
      color: 'bg-orange-500/10 text-orange-600'
    },
    {
      title: 'Всього користувачів',
      value: '2,543',
      change: '+18.2%',
      icon: <Users className="w-6 h-6" />,
      trend: 'up',
      color: 'bg-purple-500/10 text-purple-600'
    },
    {
      title: 'Завершено сьогодні',
      value: '156',
      change: '+5.4%',
      icon: <CheckCircle2 className="w-6 h-6" />,
      trend: 'up',
      color: 'bg-green-500/10 text-green-600'
    }
  ];

  const chartData = [
    { name: 'Пн', revenue: 4000, repairs: 240, users: 240 },
    { name: 'Вт', revenue: 3000, repairs: 221, users: 221 },
    { name: 'Ср', revenue: 2000, repairs: 229, users: 200 },
    { name: 'Чт', revenue: 2780, repairs: 200, users: 218 },
    { name: 'Пт', revenue: 1890, repairs: 229, users: 250 },
    { name: 'Сб', revenue: 2390, repairs: 200, users: 210 },
    { name: 'Нд', revenue: 3490, repairs: 210, users: 222 },
  ];

  const recentTransactions: RecentTransaction[] = [
    {
      id: '1',
      type: 'repair',
      description: 'Новий запит на ремонт від John Doe',
      user: 'John Doe',
      timestamp: '2 хв назад',
      icon: <Package className="w-4 h-4" />
    },
    {
      id: '2',
      type: 'payment',
      description: 'Ремонт #1234 завершено Mike Smith',
      user: 'Mike Smith',
      timestamp: '15 хв назад',
      icon: <CheckCircle2 className="w-4 h-4" />
    },
    {
      id: '3',
      type: 'payment',
      description: 'Очікується платіж за замовленням #5678',
      user: 'Sarah Johnson',
      timestamp: '1 год назад',
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: '4',
      type: 'review',
      description: 'Отримано новий відгук на 5 зірок',
      user: 'David Brown',
      timestamp: '2 год назад',
      icon: <Award className="w-4 h-4" />
    },
    {
      id: '5',
      type: 'order',
      description: 'Терміновий ремонт призначено Sarah Johnson',
      user: 'Admin',
      timestamp: '3 год назад',
      icon: <AlertCircle className="w-4 h-4" />
    }
  ];

  const topMasters: TopMaster[] = [
    { id: '1', initials: 'MS', name: 'Mike Smith', repairs: 156, rating: 4.9, avatar: 'https://i.pravatar.cc/96?img=4' },
    { id: '2', initials: 'SJ', name: 'Sarah Johnson', repairs: 142, rating: 4.8, avatar: 'https://i.pravatar.cc/96?img=5' },
    { id: '3', initials: 'DB', name: 'David Brown', repairs: 128, rating: 4.7, avatar: 'https://i.pravatar.cc/96?img=6' },
    { id: '4', initials: 'EW', name: 'Emma Wilson', repairs: 115, rating: 4.9, avatar: 'https://i.pravatar.cc/96?img=7' },
  ];

  return (
    <div className="w-full space-y-6 pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <LayoutDashboard className="w-8 h-8" />
          Адміністративна панель
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Монітор основних метрик і операцій платформи
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    від минулого місяця
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs for detailed views */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Огляд</TabsTrigger>
          <TabsTrigger value="analytics">Аналітика</TabsTrigger>
          <TabsTrigger value="activity">Активність</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Останні операції</CardTitle>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Фільтр
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                          {transaction.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {transaction.timestamp}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Masters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Топ майстри</CardTitle>
                  <CardDescription>За кількістю ремонтів</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topMasters.map((master, index) => (
                    <motion.div
                      key={master.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={master.avatar} />
                          <AvatarFallback>{master.initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {master.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {master.repairs} ремонтів
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-auto">
                        ★ {master.rating}
                      </Badge>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Дохід за тиждень</CardTitle>
                <CardDescription>Динаміка доходу, ремонтів та користувачів</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Дохід" strokeWidth={2} />
                    <Line type="monotone" dataKey="repairs" stroke="#f97316" name="Ремонти" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Активність платформи</CardTitle>
                <CardDescription>Активність користувачів за останній тиждень</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#8b5cf6" name="Активні користувачі" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModernAdminDashboard;
