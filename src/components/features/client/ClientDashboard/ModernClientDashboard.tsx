import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Plus, 
  Search, 
  Bell, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  Calendar,
  User as UserIcon,
  MapPin,
  DollarSign,
  Package,
  ArrowRight,
  Filter,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Progress } from '../../../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Input } from '../../../ui/input';
import { User } from '../../../../types';

interface Order {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  progress: number;
  master?: {
    name: string;
    avatar: string;
    rating: number;
  };
  date: string;
  price: number;
  category: string;
  location: string;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning';
  message: string;
  time: string;
  read: boolean;
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const ModernClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const stats: StatCard[] = [
    {
      title: 'Всього замовлень',
      value: '24',
      change: '+12%',
      icon: <Package className="w-5 h-5" />,
      trend: 'up'
    },
    {
      title: 'В роботі',
      value: '3',
      change: '+2',
      icon: <Clock className="w-5 h-5" />,
      trend: 'up'
    },
    {
      title: 'Завершено',
      value: '18',
      change: '+5',
      icon: <CheckCircle2 className="w-5 h-5" />,
      trend: 'up'
    },
    {
      title: 'Витрачено',
      value: '₴45,230',
      change: '+18%',
      icon: <DollarSign className="w-5 h-5" />,
      trend: 'up'
    }
  ];

  const orders: Order[] = [
    {
      id: '1',
      title: 'Ремонт iPhone 14 Pro',
      status: 'in-progress',
      progress: 65,
      master: {
        name: 'Іван Петренко',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan',
        rating: 4.8
      },
      date: '2024-01-15',
      price: 3500,
      category: 'Apple',
      location: 'Київ, вул. Ленінградська 45'
    },
    {
      id: '2',
      title: 'Заміна екрану Samsung Galaxy S23',
      status: 'in-progress',
      progress: 30,
      master: {
        name: 'Сергій Іванов',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey',
        rating: 4.9
      },
      date: '2024-01-16',
      price: 8500,
      category: 'Samsung',
      location: 'Київ, пр. Миру 12'
    },
    {
      id: '3',
      title: 'Ремонт Xiaomi Redmi Note 12',
      status: 'pending',
      progress: 0,
      date: '2024-01-17',
      price: 4200,
      category: 'Xiaomi',
      location: 'Харків, вул. Сумська 8'
    }
  ];

  const orderHistory: Order[] = [
    {
      id: '4',
      title: 'Ремонт GoPro Hero 11',
      status: 'completed',
      progress: 100,
      master: {
        name: 'Олексій Смірнов',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        rating: 4.7
      },
      date: '2024-01-10',
      price: 2500,
      category: 'GoPro',
      location: 'Львів, вул. Арбату 22'
    },
    {
      id: '5',
      title: 'Заміна батареї DJI Mini 3',
      status: 'completed',
      progress: 100,
      master: {
        name: 'Дмитро Козлов',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
        rating: 4.6
      },
      date: '2024-01-05',
      price: 3000,
      category: 'DJI',
      location: 'Одеса, вул. Пушкіна 15'
    }
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      message: 'Майстер Іван Петренко розпочав роботу над замовленням "Ремонт iPhone 14 Pro"',
      time: '10 хв назад',
      read: false
    },
    {
      id: '2',
      type: 'info',
      message: 'Нова пропозиція від майстра для замовлення "Ремонт Xiaomi Redmi Note 12"',
      time: '1 год назад',
      read: false
    },
    {
      id: '3',
      type: 'success',
      message: 'Замовлення "Ремонт GoPro Hero 11" успішно завершено',
      time: '2 дні назад',
      read: true
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Очікує';
      case 'in-progress':
        return 'В роботі';
      case 'completed':
        return 'Завершено';
      case 'cancelled':
        return 'Відмінено';
      default:
        return status;
    }
  };

  // Этапы ремонта мобильной электроники
  const getRepairStages = (progress: number) => {
    const stages = [
      { name: 'Прийнято в роботу', completed: progress > 0 },
      { name: 'Діагностика', completed: progress > 20 },
      { name: 'Замовлення запчастин', completed: progress > 40 },
      { name: 'Ремонт', completed: progress > 60 },
      { name: 'Тестування', completed: progress > 80 },
      { name: 'Готово', completed: progress >= 100 }
    ];
    return stages;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-2 md:p-4 flex flex-col items-center w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-4 w-full"
      >
        {/* 1. ПРИОРИТЕТ: Активные заказы (самое важное для клиента) */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Clock className="w-6 h-6 text-primary" />
                  Активні замовлення
                  <Badge variant="secondary" className="ml-2">
                    {orders.filter(o => o.status === 'in-progress' || o.status === 'pending').length}
                  </Badge>
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Фільтр
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {orders.filter(o => o.status === 'in-progress' || o.status === 'pending').map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-4 border border-border/50 rounded-xl bg-gradient-to-br from-white to-gray-50/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 backdrop-blur-sm"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 text-gray-900">{order.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.date).toLocaleDateString('uk-UA')}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {order.location.split(',')[0]}
                        </span>
                        <span className="font-bold text-primary text-sm">₴{order.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-xs px-2 py-1 font-medium`}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>

                  {/* Master Info */}
                  {order.master && (
                    <div className="flex items-center gap-3 mb-3 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={order.master.avatar} />
                        <AvatarFallback className="text-xs">{order.master.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{order.master.name}</p>
                        <p className="text-xs text-muted-foreground">⭐ {order.master.rating} • Майстер</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Написати
                      </Button>
                    </div>
                  )}

                  {/* Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">Прогрес</span>
                      <motion.span 
                        className="font-bold text-primary"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {order.progress}%
                      </motion.span>
                    </div>
                    <div className="relative">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary via-blue-500 to-green-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${order.progress}%` }}
                          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                        />
                      </div>
                      {/* Animated shimmer effect */}
                      <motion.div
                        className="absolute top-0 left-0 h-2 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    
                    {/* Animated Status Bar */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Етапи ремонту:</p>
                      <div className="relative">
                        {/* Background Progress Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 rounded-full transform -translate-y-1/2" />
                        
                        {/* Animated Progress Line */}
                        <motion.div 
                          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-primary to-green-500 rounded-full transform -translate-y-1/2"
                          initial={{ width: 0 }}
                          animate={{ width: `${order.progress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        />
                        
                        {/* Animated Stage Indicators */}
                        <div className="relative flex justify-between">
                          {getRepairStages(order.progress).map((stage, stageIndex) => (
                            <motion.div
                              key={stageIndex}
                              initial={{ opacity: 0, scale: 0, y: 20 }}
                              animate={{ 
                                opacity: 1, 
                                scale: 1, 
                                y: 0,
                                rotate: stage.completed ? [0, 5, -5, 0] : 0
                              }}
                              transition={{ 
                                delay: stageIndex * 0.2 + 0.8,
                                duration: 0.6,
                                rotate: { duration: 0.3, delay: stageIndex * 0.1 + 1.5 }
                              }}
                              className="flex flex-col items-center"
                            >
                              {/* Animated Circle */}
                              <motion.div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  stage.completed 
                                    ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-500 shadow-lg' 
                                    : 'bg-white border-gray-300'
                                }`}
                                animate={stage.completed ? {
                                  boxShadow: [
                                    '0 0 0 0 rgba(34, 197, 94, 0.4)',
                                    '0 0 0 8px rgba(34, 197, 94, 0)',
                                    '0 0 0 0 rgba(34, 197, 94, 0)'
                                  ]
                                } : {}}
                                transition={{
                                  boxShadow: {
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: stageIndex * 0.3
                                  }
                                }}
                              >
                                {stage.completed && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: stageIndex * 0.2 + 1, duration: 0.4 }}
                                  >
                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                  </motion.div>
                                )}
                                {!stage.completed && (
                                  <motion.div
                                    className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                                    animate={{ 
                                      scale: [1, 1.2, 1],
                                      opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: stageIndex * 0.2
                                    }}
                                  />
                                )}
                              </motion.div>
                              
                              {/* Stage Label */}
                              <motion.span
                                className={`text-xs font-medium mt-1 text-center max-w-16 ${
                                  stage.completed 
                                    ? 'text-green-700' 
                                    : 'text-gray-500'
                                }`}
                                animate={stage.completed ? {
                                  color: ['#15803d', '#16a34a', '#15803d']
                                } : {}}
                                transition={{
                                  color: {
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: stageIndex * 0.2
                                  }
                                }}
                              >
                                {stage.name}
                              </motion.span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        Деталі
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                      {order.status === 'pending' && (
                        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                          <Search className="w-3 h-3 mr-1" />
                          Знайти майстра
                        </Button>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground font-medium">{order.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {orders.filter(o => o.status === 'in-progress' || o.status === 'pending').length === 0 && (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">Немає активних замовлень</h3>
                  <p className="text-sm text-muted-foreground mb-4">Створіть нове замовлення або знайдіть майстра</p>
                  <Button className="mr-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Створити замовлення
                  </Button>
                  <Button variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    Знайти майстра
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* 2. ПРИОРИТЕТ: Быстрые действия */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Швидкі дії
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full h-auto py-6 flex flex-col items-center justify-center group bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
                    <div className="p-2 bg-white/20 rounded-lg mb-2">
                      <Plus className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-base">Створити замовлення</p>
                    <p className="text-xs opacity-90 mt-1">Нова заявка на ремонт</p>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center justify-center group border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300" size="lg">
                    <div className="p-2 bg-primary/10 rounded-lg mb-2">
                      <Search className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-bold text-base">Знайти майстра</p>
                    <p className="text-xs text-muted-foreground mt-1">Пошук спеціалістів</p>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center justify-center group border-2 hover:border-green-500/50 hover:bg-green-50 transition-all duration-300" size="lg">
                    <div className="p-2 bg-green-500/10 rounded-lg mb-2">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="font-bold text-base">Мої повідомлення</p>
                    <p className="text-xs text-muted-foreground mt-1">Чат з майстрами</p>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 3. ПРИОРИТЕТ: Уведомления (важные для клиента) */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Важливі увідомлення
                <Badge variant="secondary" className="ml-2">
                  {notifications.filter(n => !n.read).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.slice(0, 3).map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    notification.read 
                      ? 'bg-background/30 border-border/50' 
                      : 'bg-primary/5 border-primary/20'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-full h-fit ${
                      notification.type === 'success' 
                        ? 'bg-green-500/10' 
                        : notification.type === 'warning'
                        ? 'bg-yellow-500/10'
                        : 'bg-blue-500/10'
                    }`}>
                      {notification.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : notification.type === 'warning' ? (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <Bell className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-sm text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* 4. ПРИОРИТЕТ: Краткая статистика */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      {stat.icon}
                    </div>
                    <Badge variant="secondary" className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* 5. ПРИОРИТЕТ: История заказов (компактно) */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Останні завершені замовлення
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {orderHistory.slice(0, 3).map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 border border-border rounded-lg bg-background/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{order.title}</h4>
                        <p className="text-sm text-muted-foreground">{order.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₴{order.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString('uk-UA')}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export { ModernClientDashboard as default };
