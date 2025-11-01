import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Star,
  Clock,
  CheckCircle2,
  Bell,
  Wrench,
  Users,
  BarChart3,
  Search,
  ChevronRight,
  Activity,
  Wallet,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Progress } from '../../../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Input } from '../../../ui/input';
import { ScrollArea } from '../../../ui/scroll-area';
import { User } from '../../../../types';
import { useTranslation } from '../../../../hooks/useTranslation';
import { PortfolioManager } from '../portfolio/PortfolioManager';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps & { onClick?: () => void }> = ({ title, value, change, icon, trend, onClick }) => {
  const t = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`relative overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${onClick ? '' : 'cursor-default'}`}
        onClick={onClick}
      >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
          <CardTitle className="text-sm sm:text-sm font-semibold sm:font-medium text-muted-foreground truncate pr-2">{title}</CardTitle>
          <div className="h-10 w-10 sm:h-8 sm:w-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent className="pt-2 px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="text-2xl sm:text-2xl font-bold truncate mb-2">{value}</div>
          <div className="flex items-center mt-1 text-xs sm:text-xs">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 sm:h-4 sm:w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 sm:h-4 sm:w-4 text-red-500 mr-1" />
            )}
            <span className={`${trend === 'up' ? 'text-green-500' : 'text-red-500'} font-semibold`}>
              {change}%
            </span>
            <span className="text-muted-foreground ml-1">{t('common.fromLastMonth')}</span>
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

interface ModernMasterDashboardProps {
  currentUser: User;
  stats: {
    activeOrders: number;
    completedOrders: number;
    totalEarned: number;
    rating: number;
  };
  orders: Task[];
  tasks: Task[];
  notifications: Notification[];
  revenueData: { month: string; value: number }[];
  setActiveItem: (item: string) => void;
  setSelectedOrder: (order: Task | null) => void;
}

const ModernMasterDashboard: React.FC<ModernMasterDashboardProps> = ({
  currentUser,
  stats: masterStats,
  orders,
  tasks,
  notifications,
  revenueData,
  setActiveItem,
  setSelectedOrder,
}) => {
  const t = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Calculate max revenue for progress bars
  const maxRevenue = revenueData.length > 0 
    ? Math.max(...revenueData.map(d => d.value)) 
    : 100;

  const filteredTasks = tasks
    .filter((task) => statusFilter === 'all' || task.status === statusFilter)
    .filter((task) => priorityFilter === 'all' || task.priority === priorityFilter)
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.client.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const stats = [
    {
      title: t('navigation.orders'),
      value: masterStats.activeOrders.toString(),
      change: masterStats.activeOrders,
      icon: <Wrench className="h-4 w-4" />,
      trend: masterStats.activeOrders > 0 ? 'up' as const : 'down' as const,
    },
    {
      title: t('common.revenue'),
      value: `₴${masterStats.totalEarned.toLocaleString()}`,
      change: masterStats.totalEarned,
      icon: <Wallet className="h-4 w-4" />,
      trend: masterStats.totalEarned > 0 ? 'up' as const : 'down' as const,
    },
    {
      title: t('common.rating'),
      value: masterStats.rating.toString(),
      change: masterStats.rating > 4 ? Math.round((masterStats.rating - 3.5) * 10) : masterStats.rating < 3.5 ? -Math.round((3.5 - masterStats.rating) * 10) : 0,
      icon: <Star className="h-4 w-4" />,
      trend: masterStats.rating > 3.5 ? 'up' as const : 'down' as const,
    },
    {
      title: t('common.completedOrders'),
      value: masterStats.completedOrders.toString(),
      change: masterStats.completedOrders,
      icon: <CheckCircle2 className="h-4 w-4" />,
      trend: masterStats.completedOrders > 0 ? 'up' as const : 'down' as const,
    },
  ];

  const getStatusBadge = (status: Task['status']) => {
    const variants = {
      pending: { label: t('status.pending'), className: 'bg-yellow-500/10 text-yellow-500' },
      'in-progress': { label: t('status.in_progress'), className: 'bg-blue-500/10 text-blue-500' },
      completed: { label: t('status.completed'), className: 'bg-green-500/10 text-green-500' },
    };
    return variants[status] || { label: status, className: 'bg-gray-500/10 text-gray-500' };
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    const variants = {
      low: { label: t('priority.low'), className: 'bg-gray-500/10 text-gray-500' },
      medium: { label: t('priority.medium'), className: 'bg-orange-500/10 text-orange-500' },
      high: { label: t('priority.high'), className: 'bg-red-500/10 text-red-500' },
    };
    return variants[priority] || { label: priority, className: 'bg-gray-500/10 text-gray-500' };
  };


  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
                <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                {currentUser.name}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">{t('navigation.dashboard')}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="outline" size="icon" className="relative shrink-0">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  {notifications.length}
                </span>
              </Button>
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">МС</AvatarFallback>
              </Avatar>
            </div>
          </div>
          {/* Search and Filters - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('common.searchOrders')}
                className="pl-8 sm:pl-9 w-full text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 sm:p-2 text-base sm:text-sm border-2 sm:border border-gray-300 rounded-xl sm:rounded-md bg-background flex-1 sm:flex-none min-w-0 min-h-[52px] sm:min-h-[36px] font-medium sm:font-normal"
              >
                <option value="all">{t('common.allStatuses')}</option>
                <option value="pending">{t('status.pending')}</option>
                <option value="in-progress">{t('status.in_progress')}</option>
                <option value="completed">{t('status.completed')}</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-3 sm:p-2 text-base sm:text-sm border-2 sm:border border-gray-300 rounded-xl sm:rounded-md bg-background flex-1 sm:flex-none min-w-0 min-h-[52px] sm:min-h-[36px] font-medium sm:font-normal"
              >
                <option value="all">{t('common.allPriorities')}</option>
                <option value="low">{t('priority.low')}</option>
                <option value="medium">{t('priority.medium')}</option>
                <option value="high">{t('priority.high')}</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    {...stat}
                    onClick={() => {
                        setActiveItem('myOrders');
                    }}
                />
            ))}
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 sm:space-x-1 overflow-x-auto pb-2">
            <Button 
              variant={activeTab === 'dashboard' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('dashboard')}
              className="text-base sm:text-base shrink-0 px-5 sm:px-3 py-3 sm:py-2 min-h-[48px] sm:min-h-[32px] font-semibold sm:font-medium"
            >
              Dashboard
            </Button>
            <Button 
              variant={activeTab === 'portfolio' ? 'default' : 'outline'} 
              onClick={() => setActiveTab('portfolio')}
              className="text-base sm:text-base shrink-0 px-5 sm:px-3 py-3 sm:py-2 min-h-[48px] sm:min-h-[32px] font-semibold sm:font-medium"
            >
              Portfolio
            </Button>
        </div>

        {/* Main Content */}
        {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Tasks and Calendar */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Active Tasks */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg sm:text-lg font-bold">{t('masterDashboard.activeTasks', 'Активні задачі')}</CardTitle>
                      <CardDescription className="text-sm sm:text-sm mt-1.5 font-medium">{t('masterDashboard.manageCurrentOrders', 'Управління поточними замовленнями')}</CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveItem('myOrders')}
                      className="text-sm sm:text-sm w-full sm:w-auto px-4 py-2.5 sm:py-2 min-h-[44px] sm:min-h-[32px] font-semibold sm:font-medium"
                    >
                      Все задачи
                      <ChevronRight className="h-4 w-4 sm:h-4 sm:w-4 ml-2 sm:ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ScrollArea className="h-[250px] sm:h-[300px] md:h-[400px] pr-2 sm:pr-4">
                    <div className="space-y-3 sm:space-y-4">
                      {filteredTasks.map((task, index) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-4 sm:p-4 border-2 sm:border border-border rounded-xl sm:rounded-lg hover:bg-accent/50 active:bg-accent/70 transition-all cursor-pointer shadow-sm hover:shadow-md"
                          onClick={() => {
                            const order = orders.find((o) => o.id === task.id);
                            setSelectedOrder(order || null);
                            setActiveItem('myOrders');
                          }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-3 mb-3 sm:mb-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-base sm:text-base text-foreground mb-2 break-words leading-tight">{task.title}</h4>
                              <p className="text-sm sm:text-sm text-muted-foreground flex items-center gap-1.5">
                                <Users className="h-4 w-4 sm:h-3 sm:w-3 shrink-0" />
                                <span className="truncate">{task.client}</span>
                              </p>
                            </div>
                            <div className="flex gap-2 sm:gap-2 flex-wrap">
                              <Badge className={`${getStatusBadge(task.status).className} text-xs sm:text-xs px-3 py-1 sm:px-2 sm:py-0.5 font-semibold sm:font-normal`}>
                                {getStatusBadge(task.status).label}
                              </Badge>
                              <Badge className={`${getPriorityBadge(task.priority).className} text-xs sm:text-xs px-3 py-1 sm:px-2 sm:py-0.5 font-semibold sm:font-normal`}>
                                {getPriorityBadge(task.priority).label}
                              </Badge>
                            </div>
                          </div>
                          <div className="space-y-2 sm:space-y-2">
                            <div className="flex items-center justify-between text-xs sm:text-xs text-muted-foreground">
                              <span className="flex items-center gap-1.5 truncate">
                                <Clock className="h-4 w-4 sm:h-3 sm:w-3 shrink-0" />
                                <span className="truncate font-medium">Дедлайн: {task.deadline}</span>
                              </span>
                              <span className="ml-2 shrink-0 font-bold text-foreground">{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-2 sm:h-2" />
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
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-lg">
                    <BarChart3 className="h-5 w-5 sm:h-5 sm:w-5 text-primary shrink-0" />
                    Аналитика доходов
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-sm mt-1.5 font-medium">Динамика за последние 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {revenueData.map((data, index) => (
                      <motion.div
                        key={data.month}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="space-y-1.5 sm:space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-muted-foreground font-medium">{data.month}</span>
                          <span className="font-semibold text-foreground">₴{data.value}k</span>
                        </div>
                        <div className="relative h-6 sm:h-8 bg-accent rounded-full overflow-hidden">
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
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-lg">
                    <Bell className="h-5 w-5 sm:h-5 sm:w-5 text-primary shrink-0" />
                    Уведомления
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ScrollArea className="h-[200px] sm:h-[250px] md:h-[300px] pr-2 sm:pr-4">
                    <div className="space-y-2 sm:space-y-3">
                      {notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-4 sm:p-3 border-2 sm:border border-border rounded-xl sm:rounded-lg hover:bg-accent/50 active:bg-accent/70 transition-all cursor-pointer shadow-sm hover:shadow-md"
                          onClick={() => {
                            // Navigate based on notification type
                            if (notification.message.toLowerCase().includes('пропозиція') || notification.message.toLowerCase().includes('предложение')) {
                              setActiveItem('proposals');
                            } else if (notification.message.toLowerCase().includes('замовлення') || notification.message.toLowerCase().includes('заказ') || notification.message.toLowerCase().includes('роботі') || notification.message.toLowerCase().includes('работе')) {
                              setActiveItem('myOrders');
                            } else {
                              setActiveItem('myOrders');
                            }
                          }}
                        >
                          <div className="flex gap-3 sm:gap-3">
                            <div
                              className={`h-10 w-10 sm:h-8 sm:w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                notification.type === 'warning'
                                  ? 'bg-yellow-500/10 text-yellow-500'
                                  : notification.type === 'success'
                                  ? 'bg-green-500/10 text-green-500'
                                  : 'bg-blue-500/10 text-blue-500'
                              }`}
                            >
                              {notification.type === 'warning' ? (
                                <CheckCircle2 className="h-5 w-5 sm:h-4 sm:w-4" />
                              ) : notification.type === 'success' ? (
                                <CheckCircle2 className="h-5 w-5 sm:h-4 sm:w-4" />
                              ) : (
                                <Activity className="h-5 w-5 sm:h-4 sm:w-4" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm sm:text-sm text-foreground leading-relaxed break-words font-medium">{notification.message}</p>
                              <p className="text-xs sm:text-xs text-muted-foreground mt-1.5 font-medium">
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="cursor-pointer transition-all hover:shadow-lg"
                onClick={() => setActiveItem('reports')}
              >
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                    Рейтинг и отзывы
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                  <div className="text-center py-2 sm:py-4">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">4.8</div>
                    <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            star <= 4 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Основано на 156 отзывах</p>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xs sm:text-sm text-muted-foreground w-6 sm:w-8 shrink-0">{rating}★</span>
                        <Progress
                          value={rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 3 : 1}
                          className="h-1.5 sm:h-2 flex-1"
                        />
                        <span className="text-xs sm:text-sm text-muted-foreground w-8 sm:w-12 text-right shrink-0">
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
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                    Расписание на сегодня
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-2 sm:space-y-3">
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => setActiveItem('myOrders')}
                    >
                      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs sm:text-sm shrink-0">
                        {appointment.time}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                          {appointment.task}
                        </p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{appointment.client}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        )}
        {activeTab === 'portfolio' && (
            <PortfolioManager />
        )}
      </div>
    </div>
  );
};

export default ModernMasterDashboard;
