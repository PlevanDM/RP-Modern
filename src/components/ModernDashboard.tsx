import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import {
  Wrench,
  Star,
  CheckCircle,
  Calendar,
  DollarSign,
  MapPin,
  Bell,
  Filter,
  MoreHorizontal,
  Eye,
  Plus,
  RefreshCw,
  Activity,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Package,
} from 'lucide-react';

// Интерфейсы
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  delay?: number;
}

interface OrderCardProps {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  progress: number;
  master: {
    name: string;
    avatar: string;
    rating: number;
  };
  date: string;
  location: string;
  price: string;
  delay?: number;
}

interface NotificationProps {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

// Компонент статистической карточки
const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  delay = 0 
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const changeIcon = {
    positive: <TrendingUp className="w-4 h-4" />,
    negative: <TrendingDown className="w-4 h-4" />,
    neutral: <Activity className="w-4 h-4" />
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <Card className="h-full border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
              {icon}
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${changeColor[changeType]}`}>
              {changeIcon[changeType]}
              <span>{change}</span>
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
            <div className="text-sm text-muted-foreground">{title}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Компонент карточки заказа
const OrderCard: React.FC<OrderCardProps> = ({ 
  id: _id, 
  title, 
  status, 
  progress, 
  master, 
  date, 
  location, 
  price, 
  delay = 0 
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-700', text: 'Очікує' },
    in_progress: { color: 'bg-blue-100 text-blue-700', text: 'В роботі' },
    completed: { color: 'bg-green-100 text-green-700', text: 'Завершено' },
    cancelled: { color: 'bg-red-100 text-red-700', text: 'Скасовано' }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Card className="h-full border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{date}</span>
              </div>
            </div>
            <Badge className={`${statusConfig[status].color} border-0`}>
              {statusConfig[status].text}
            </Badge>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={master.avatar} />
              <AvatarFallback>{master.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-foreground">{master.name}</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-muted-foreground">{master.rating}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Прогрес</span>
              <span className="text-sm font-medium text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{location}</span>
            </div>
            <div className="text-lg font-bold text-primary">{price}</div>
          </div>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
            <Button size="sm" variant="outline" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              Деталі
            </Button>
            <Button size="sm" variant="outline">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Компонент уведомления
const NotificationCard: React.FC<NotificationProps> = ({ 
  id: _id, 
  title, 
  message, 
  type, 
  time, 
  read 
}) => {
  const typeConfig = {
    info: { icon: <Info className="w-5 h-5" />, color: 'text-blue-600' },
    success: { icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-green-600' },
    warning: { icon: <AlertCircle className="w-5 h-5" />, color: 'text-yellow-600' },
    error: { icon: <XCircle className="w-5 h-5" />, color: 'text-red-600' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`p-4 rounded-lg border border-border/50 bg-gradient-to-r from-background/80 to-background/40 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 ${!read ? 'border-primary/20 bg-primary/5' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className={`${typeConfig[type].color} mt-1`}>
          {typeConfig[type].icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${!read ? 'text-foreground' : 'text-muted-foreground'}`}>
            {title}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">{message}</p>
          <p className="text-xs text-muted-foreground mt-2">{time}</p>
        </div>
        {!read && (
          <div className="w-2 h-2 bg-primary rounded-full mt-2" />
        )}
      </div>
    </motion.div>
  );
};

// Основной компонент дашборда
const ModernDashboard: React.FC = () => {
  const [notifications] = useState<NotificationProps[]>([
    {
      id: '1',
      title: 'Нове замовлення',
      message: 'Майстер Іван Петренко розпочав роботу над замовленням "Ремонт iPhone 15 Pro"',
      type: 'info',
      time: '10 хв назад',
      read: false
    },
    {
      id: '2',
      title: 'Завершено ремонт',
      message: 'Замовлення "Заміна екрану Samsung Galaxy" успішно завершено',
      type: 'success',
      time: '1 год назад',
      read: false
    },
    {
      id: '3',
      title: 'Нова пропозиція',
      message: 'Отримано пропозицію від майстра для замовлення "Ремонт MacBook Pro"',
      type: 'warning',
      time: '2 години назад',
      read: true
    }
  ]);

  const stats = [
    {
      title: 'Всього замовлень',
      value: '24',
      change: '+12%',
      changeType: 'positive' as const,
      icon: <Package className="w-6 h-6" />
    },
    {
      title: 'В роботі',
      value: '3',
      change: '+2',
      changeType: 'positive' as const,
      icon: <Wrench className="w-6 h-6" />
    },
    {
      title: 'Завершено',
      value: '18',
      change: '+5',
      changeType: 'positive' as const,
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: 'Витрачено',
      value: '₴45,230',
      change: '+18%',
      changeType: 'positive' as const,
      icon: <DollarSign className="w-6 h-6" />
    }
  ];

  const orders = [
    {
      id: '1',
      title: 'Ремонт iPhone 15 Pro',
      status: 'in_progress' as const,
      progress: 65,
      master: {
        name: 'Іван Петренко',
        avatar: 'https://i.pravatar.cc/96?img=1',
        rating: 4.8
      },
      date: '15.01.2024',
      location: 'Київ',
      price: '₴3,500'
    },
    {
      id: '2',
      title: 'Заміна екрану Samsung Galaxy',
      status: 'in_progress' as const,
      progress: 30,
      master: {
        name: 'Сергій Іванов',
        avatar: 'https://i.pravatar.cc/96?img=2',
        rating: 4.9
      },
      date: '16.01.2024',
      location: 'Київ',
      price: '₴2,800'
    },
    {
      id: '3',
      title: 'Ремонт MacBook Pro',
      status: 'pending' as const,
      progress: 0,
      master: {
        name: 'Олександр Коваленко',
        avatar: 'https://i.pravatar.cc/96?img=3',
        rating: 4.7
      },
      date: '17.01.2024',
      location: 'Харків',
      price: '₴4,200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Дашборд
              </h1>
              <p className="text-muted-foreground mt-1">
                Ласкаво просимо в ваш особистий кабінет
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Експорт
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Оновити
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      Поточні замовлення
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Фільтр
                      </Button>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Новий
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {orders.map((order, index) => (
                      <OrderCard
                        key={order.id}
                        {...order}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Notifications Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Уведомлення
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <AnimatePresence>
                      {notifications.map((notification) => (
                        <NotificationCard
                          key={notification.id}
                          {...notification}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;
