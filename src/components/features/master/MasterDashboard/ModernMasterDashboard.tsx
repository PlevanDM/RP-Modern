import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell,
  Wrench,
  Package,
  Users,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Search,
  Filter,
  ChevronRight,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Progress } from '../../../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Input } from '../../../ui/input';
import { ScrollArea } from '../../../ui/scroll-area';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center mt-1 text-xs">
            {trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
              {change}%
            </span>
            <span className="text-muted-foreground ml-1">от прошлого месяца</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface Task {
  id: string;
  title: string;
  client: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  progress: number;
}

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success';
  message: string;
  time: string;
}

const ModernMasterDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Активные заказы',
      value: '24',
      change: 12,
      icon: <Wrench className="h-4 w-4" />,
      trend: 'up' as const,
    },
    {
      title: 'Доход за месяц',
      value: '₽145,230',
      change: 8,
      icon: <DollarSign className="h-4 w-4" />,
      trend: 'up' as const,
    },
    {
      title: 'Средний рейтинг',
      value: '4.8',
      change: 5,
      icon: <Star className="h-4 w-4" />,
      trend: 'up' as const,
    },
    {
      title: 'Завершено заказов',
      value: '156',
      change: -3,
      icon: <CheckCircle2 className="h-4 w-4" />,
      trend: 'down' as const,
    },
  ];

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Ремонт iPhone 13 Pro',
      client: 'Иван Петров',
      status: 'in-progress',
      priority: 'high',
      deadline: '2024-01-15',
      progress: 65,
    },
    {
      id: '2',
      title: 'Замена экрана Samsung Galaxy',
      client: 'Мария Сидорова',
      status: 'pending',
      priority: 'medium',
      deadline: '2024-01-16',
      progress: 20,
    },
    {
      id: '3',
      title: 'Диагностика MacBook Pro',
      client: 'Алексей Иванов',
      status: 'in-progress',
      priority: 'low',
      deadline: '2024-01-17',
      progress: 45,
    },
    {
      id: '4',
      title: 'Замена батареи iPad',
      client: 'Ольга Смирнова',
      status: 'completed',
      priority: 'medium',
      deadline: '2024-01-14',
      progress: 100,
    },
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'warning',
      message: 'Заказ #1234 требует внимания - приближается дедлайн',
      time: '5 мин назад',
    },
    {
      id: '2',
      type: 'success',
      message: 'Новый отзыв от клиента Иван Петров - 5 звезд',
      time: '15 мин назад',
    },
    {
      id: '3',
      type: 'info',
      message: 'Новый заказ назначен на завтра в 10:00',
      time: '1 час назад',
    },
  ];

  const revenueData = [
    { month: 'Янв', value: 85 },
    { month: 'Фев', value: 72 },
    { month: 'Мар', value: 90 },
    { month: 'Апр', value: 78 },
    { month: 'Май', value: 95 },
    { month: 'Июн', value: 88 },
  ];

  const getStatusBadge = (status: Task['status']) => {
    const variants = {
      pending: { label: 'Ожидает', className: 'bg-yellow-500/10 text-yellow-500' },
      'in-progress': { label: 'В работе', className: 'bg-blue-500/10 text-blue-500' },
      completed: { label: 'Завершено', className: 'bg-green-500/10 text-green-500' },
    };
    return variants[status];
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    const variants = {
      low: { label: 'Низкий', className: 'bg-gray-500/10 text-gray-500' },
      medium: { label: 'Средний', className: 'bg-orange-500/10 text-orange-500' },
      high: { label: 'Высокий', className: 'bg-red-500/10 text-red-500' },
    };
    return variants[priority];
  };

  const maxRevenue = Math.max(...revenueData.map(d => d.value));

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Wrench className="h-8 w-8 text-primary" />
              RepairHub Pro
            </h1>
            <p className="text-muted-foreground mt-1">Панель управления мастера</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Поиск заказов..." className="pl-9 w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">МС</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tasks and Calendar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Tasks */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Активные задачи</CardTitle>
                      <CardDescription>Управление текущими заказами</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Все задачи
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {tasks.map((task, index) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground mb-1">{task.title}</h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {task.client}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Badge className={getStatusBadge(task.status).className}>
                                {getStatusBadge(task.status).label}
                              </Badge>
                              <Badge className={getPriorityBadge(task.priority).className}>
                                {getPriorityBadge(task.priority).label}
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Дедлайн: {task.deadline}
                              </span>
                              <span>{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-2" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>

            {/* Revenue Analytics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Аналитика доходов
                  </CardTitle>
                  <CardDescription>Динамика за последние 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.map((data, index) => (
                      <motion.div
                        key={data.month}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{data.month}</span>
                          <span className="font-semibold">₽{data.value}k</span>
                        </div>
                        <div className="relative h-8 bg-accent rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(data.value / maxRevenue) * 100}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                            className="absolute h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Notifications and Quick Stats */}
          <div className="space-y-6">
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Уведомления
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-3">
                      {notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex gap-3">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                notification.type === 'warning'
                                  ? 'bg-yellow-500/10 text-yellow-500'
                                  : notification.type === 'success'
                                  ? 'bg-green-500/10 text-green-500'
                                  : 'bg-blue-500/10 text-blue-500'
                              }`}
                            >
                              {notification.type === 'warning' ? (
                                <AlertCircle className="h-4 w-4" />
                              ) : notification.type === 'success' ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <Activity className="h-4 w-4" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Рейтинг и отзывы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold text-foreground mb-2">4.8</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= 4 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Основано на 156 отзывах</p>
                  </div>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-8">{rating}★</span>
                        <Progress
                          value={rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 3 : 1}
                          className="h-2"
                        />
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {rating === 5 ? '75%' : rating === 4 ? '20%' : rating === 3 ? '3%' : '1%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Calendar Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Расписание на сегодня
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { time: '09:00', task: 'Диагностика iPhone', client: 'А. Петров' },
                    { time: '11:30', task: 'Замена экрана Samsung', client: 'М. Иванова' },
                    { time: '14:00', task: 'Ремонт MacBook', client: 'И. Сидоров' },
                    { time: '16:30', task: 'Консультация', client: 'О. Смирнова' },
                  ].map((appointment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {appointment.time}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {appointment.task}
                        </p>
                        <p className="text-xs text-muted-foreground">{appointment.client}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernMasterDashboard;
