import React, { useState, cloneElement, isValidElement } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  Package,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Progress } from '../../../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { CreateOrderModal } from '../../../CreateOrderModal';
import { User, Order, Notification } from '../../../../types/models';
import { useTranslation } from '../../../../hooks/useTranslation';
import { safeLocaleCurrency, safeLocaleDate } from '../../../../utils/localeUtils';

// Extended interfaces for this component
interface ExtendedOrder extends Order {
  progress?: number;
  master?: {
    name: string;
    avatar: string;
    rating: number;
  };
  date?: string;
  category?: string;
}

interface ExtendedNotification extends Notification {
  type?: 'info' | 'success' | 'warning';
  time?: string;
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

interface ModernClientDashboardProps {
  currentUser: User;
  orders: ExtendedOrder[];
  notifications: ExtendedNotification[];
  setActiveItem: (item: string) => void;
  createOrder: (order: Omit<ExtendedOrder, 'id'>) => void;
  setSelectedOrder: (order: ExtendedOrder | null) => void;
}

const ModernClientDashboard: React.FC<ModernClientDashboardProps> = ({
  currentUser,
  orders: clientOrders,
  notifications: _notifications, // Не використовується - видалено для чистки UI
  setActiveItem,
  createOrder,
  setSelectedOrder,
}) => {
  const t = useTranslation();
  const [isCreateOrderModalOpen, setCreateOrderModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const stats: StatCard[] = [
    {
      title: t('common.totalOrders'),
      value: clientOrders.length.toString(),
      change: clientOrders.length > 0 ? `+${clientOrders.length}` : t('common.noOrders'),
      icon: <Package className="w-5 h-5" />,
      trend: clientOrders.length > 0 ? 'up' : 'down',
    },
    {
      title: t('status.in_progress'),
      value: clientOrders.filter((o) => o.status === 'in_progress').length.toString(),
      change: clientOrders.filter((o) => o.status === 'in_progress').length > 0 ? `+${clientOrders.filter((o) => o.status === 'in_progress').length}` : '-',
      icon: <Clock className="w-5 h-5" />,
      trend: clientOrders.filter((o) => o.status === 'in_progress').length > 0 ? 'up' : 'down',
    },
    {
      title: t('status.completed'),
      value: clientOrders.filter((o) => o.status === 'completed').length.toString(),
      change: clientOrders.filter((o) => o.status === 'completed').length > 0 ? `+${clientOrders.filter((o) => o.status === 'completed').length}` : '-',
      icon: <CheckCircle2 className="w-5 h-5" />,
      trend: clientOrders.filter((o) => o.status === 'completed').length > 0 ? 'up' : 'down',
    },
    {
      title: t('common.spent'),
      value: `₴${safeLocaleCurrency(clientOrders
        .filter((o) => o.status === 'completed')
        .reduce((acc, o) => acc + (o.price || 0), 0))}`,
      change: clientOrders.filter((o) => o.status === 'completed').reduce((acc, o) => acc + (o.price || 0), 0) > 0 ? `+₴${safeLocaleCurrency(clientOrders.filter((o) => o.status === 'completed').reduce((acc, o) => acc + (o.price || 0), 0))}` : t('common.noExpenses'),
      icon: <DollarSign className="w-5 h-5" />,
      trend: clientOrders.filter((o) => o.status === 'completed').reduce((acc, o) => acc + (o.price || 0), 0) > 0 ? 'up' : 'down',
    },
  ];

  const orders = clientOrders
    .filter((order) => ['in_progress', 'pending', 'open', 'proposed'].includes(order.status))
    .filter((order) => statusFilter === 'all' || order.status === statusFilter);
  const orderHistory = clientOrders.filter((order) => ['completed'].includes(order.status));

  const getStatusColor = (status: ExtendedOrder['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'open':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'proposed':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'accepted':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusText = (status: ExtendedOrder['status']) => {
    switch (status) {
      case 'pending':
        return t('status.pending');
      case 'in_progress':
        return t('status.in_progress');
      case 'completed':
        return t('status.completed');
      case 'cancelled':
        return t('status.cancelled');
      case 'open':
        return t('status.open');
      case 'proposed':
        return t('status.proposed');
      case 'accepted':
        return t('status.accepted');
      default:
        return status;
    }
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
    <div data-testid="client-dashboard" className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-3 sm:p-4 md:p-6 flex flex-col items-center w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto space-y-3 sm:space-y-4 w-full"
      >
        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setActiveItem('myOrders')}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 sm:p-3 bg-primary/10 rounded-xl">
                      {isValidElement(stat.icon) ? cloneElement(stat.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5 sm:w-6 sm:h-6" }) : stat.icon}
                    </div>
                    <Badge variant="secondary" className={`text-xs sm:text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <p className="text-xs sm:text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        {isCreateOrderModalOpen && (
          <CreateOrderModal
            isOpen={isCreateOrderModalOpen}
            onClose={() => setCreateOrderModalOpen(false)}
            createOrder={createOrder}
            currentUser={currentUser}
          />
        )}

        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                {t('common.quickActions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full h-auto py-4 sm:py-6 flex items-center justify-between group min-h-[56px] sm:min-h-auto"
                    size="lg"
                    onClick={() => setCreateOrderModalOpen(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 sm:p-2.5 bg-white/20 rounded-lg">
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm sm:text-base">{t('common.createOrder')}</p>
                        <p className="text-[10px] sm:text-xs opacity-80">{t('common.newRepairRequest')}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform shrink-0" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className="w-full h-auto py-4 sm:py-6 flex items-center justify-between group min-h-[56px] sm:min-h-auto"
                    size="lg"
                    onClick={() => setActiveItem('priceComparison')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 sm:p-2.5 bg-primary/10 rounded-lg">
                        <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm sm:text-base">{t('navigation.findMasters')}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{t('common.searchSpecialists')}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform shrink-0" />
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Orders Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    {t('common.currentOrders')}
                  </CardTitle>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 sm:p-2.5 text-xs sm:text-sm border border-gray-300 rounded-md bg-background min-h-[40px] sm:min-h-auto"
                  >
                    <option value="all">{t('common.allStatuses')}</option>
                    <option value="pending">{t('status.pending')}</option>
                    <option value="in-progress">{t('status.in_progress')}</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 sm:p-4 border border-border rounded-xl bg-background/50 hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      setSelectedOrder(order);
                      setActiveItem('myOrders');
                    }}
                  >
                    <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg leading-tight">{order.title}</h3>
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1 text-xs sm:text-sm text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                          <span className="truncate">{order.date 
                            ? safeLocaleDate(order.date)
                            : order.createdAt 
                              ? safeLocaleDate(order.createdAt)
                              : 'Без дати'}</span>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(order.status)} text-[10px] sm:text-xs shrink-0`}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>

                    {order.master && (
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 p-2 sm:p-2.5 bg-muted/30 rounded-lg">
                        <Avatar className="w-8 h-8 sm:w-9 sm:h-9 shrink-0">
                          <AvatarImage src={order.master.avatar} />
                          <AvatarFallback className="text-xs sm:text-sm">{order.master.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium truncate">{order.master.name}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">⭐ {order.master.rating}</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Прогрес</span>
                        <span className="font-medium">{order.progress}%</span>
                      </div>
                      <Progress value={order.progress} className="h-2" />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mt-3 pt-3 border-t border-border">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground w-full sm:w-auto">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                          <span className="truncate">{order.city || order.device}</span>
                        </span>
                        <span className="font-semibold text-foreground">₴{safeLocaleCurrency(order.price || 0)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full sm:w-auto text-xs sm:text-sm min-h-[36px] sm:min-h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                          setActiveItem('myOrders');
                        }}
                      >
                        Деталі
                        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Order History */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  {t('common.orderHistory')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orderHistory.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 sm:p-4 border border-border rounded-lg bg-background/50 hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      setSelectedOrder(order);
                      setActiveItem('myOrders');
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">{order.title}</h4>
                          <p className="text-sm text-muted-foreground">{order.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₴{safeLocaleCurrency(order.price || 0)}</p>
                        <p className="text-xs text-muted-foreground">
                          {(order.date 
                            ? safeLocaleDate(order.date)
                            : order.createdAt 
                              ? safeLocaleDate(order.createdAt)
                              : null) || 'Без дати'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">{t('common.yourActivity')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('common.completedThisMonth')}</span>
                    <span className="font-semibold">
                      {clientOrders.filter(o => o.status === 'completed' || o.status === 'paid').length} {t('common.orders')}
                    </span>
                  </div>
                  <Progress 
                    value={
                      clientOrders.length > 0 
                        ? (clientOrders.filter(o => o.status === 'completed' || o.status === 'paid').length / clientOrders.length * 100)
                        : 0
                    } 
                    className="h-2" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('common.averageMasterRating')}</span>
                    <span className="font-semibold">4.8 ⭐</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('common.timeSaved')}</span>
                    <span className="font-semibold">
                      {Math.floor(clientOrders.filter(o => o.status === 'completed' || o.status === 'paid').length * 1.5)} {t('common.hours')}
                    </span>
                  </div>
                  <Progress 
                    value={
                      clientOrders.length > 0
                        ? Math.min(100, (clientOrders.filter(o => o.status === 'completed' || o.status === 'paid').length / 10) * 100)
                        : 0
                    } 
                    className="h-2" 
                  />
                </div>
              </CardContent>
            </Card>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModernClientDashboard;
