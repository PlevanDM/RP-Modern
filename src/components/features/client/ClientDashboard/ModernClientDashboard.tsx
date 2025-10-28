import React, { useState } from 'react';
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
import { User } from '../../../../types/models';
import { useTranslation } from '../../../../hooks/useTranslation';

interface Order {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'open' | 'accepted' | 'proposed';
  progress?: number;
  master?: {
    name: string;
    avatar: string;
    rating: number;
  };
  date?: string;
  createdAt?: Date | string;
  price?: number;
  category?: string;
  location?: string;
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

interface ModernClientDashboardProps {
  currentUser: User;
  orders: Order[];
  notifications: Notification[];
  setActiveItem: (item: string) => void;
  createOrder: (order: Omit<Order, 'id'>) => void;
  setSelectedOrder: (order: Order | null) => void;
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
      change: '+12%',
      icon: <Package className="w-5 h-5" />,
      trend: 'up',
    },
    {
      title: t('status.in_progress'),
      value: clientOrders.filter((o) => o.status === 'in-progress').length.toString(),
      change: '+2',
      icon: <Clock className="w-5 h-5" />,
      trend: 'up',
    },
    {
      title: t('status.completed'),
      value: clientOrders.filter((o) => o.status === 'completed').length.toString(),
      change: '+5',
      icon: <CheckCircle2 className="w-5 h-5" />,
      trend: 'up',
    },
    {
      title: t('common.spent'),
      value: `₴${(clientOrders
        .filter((o) => o.status === 'completed')
        .reduce((acc, o) => acc + (o.price || 0), 0))
        .toLocaleString()}`,
      change: '+18%',
      icon: <DollarSign className="w-5 h-5" />,
      trend: 'up',
    },
  ];

  const orders = clientOrders
    .filter((order) => ['in-progress', 'pending', 'open', 'proposed'].includes(order.status))
    .filter((order) => statusFilter === 'all' || order.status === statusFilter);
  const orderHistory = clientOrders.filter((order) => ['completed', 'paid'].includes(order.status));

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

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return t('status.pending');
      case 'in-progress':
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
    <div data-testid="client-dashboard" className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-2 md:p-4 flex flex-col items-center w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto space-y-4 w-full"
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
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                {t('common.quickActions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full h-auto py-6 flex items-center justify-between group"
                    size="lg"
                    onClick={() => setCreateOrderModalOpen(true)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Plus className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">{t('common.createOrder')}</p>
                        <p className="text-xs opacity-80">{t('common.newRepairRequest')}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className="w-full h-auto py-6 flex items-center justify-between group"
                    size="lg"
                    onClick={() => setActiveItem('priceComparison')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Search className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">{t('navigation.findMasters')}</p>
                        <p className="text-xs text-muted-foreground">{t('common.searchSpecialists')}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    {t('common.currentOrders')}
                  </CardTitle>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
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
                    className="p-4 border border-border rounded-xl bg-background/50 hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      setSelectedOrder(order);
                      setActiveItem('myOrders');
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{order.title}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {order.date 
                            ? new Date(order.date).toLocaleDateString('uk-UA')
                            : order.createdAt 
                              ? new Date(order.createdAt).toLocaleDateString('uk-UA')
                              : 'Без дати'}
                        </div>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>

                    {order.master && (
                      <div className="flex items-center gap-3 mb-3 p-2 bg-muted/30 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={order.master.avatar} />
                          <AvatarFallback>{order.master.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{order.master.name}</p>
                          <p className="text-xs text-muted-foreground">⭐ {order.master.rating}</p>
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

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {order.location.split(',')[0]}
                        </span>
                        <span className="font-semibold text-foreground">₴{(order.price || 0).toLocaleString()}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setActiveItem('myOrders');
                        }}
                      >
                        Деталі
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Order History */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
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
                    className="p-4 border border-border rounded-lg bg-background/50 hover:shadow-md transition-all duration-300 cursor-pointer"
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
                        <p className="font-semibold">₴{(order.price || 0).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {(order.date 
                            ? new Date(order.date)
                            : order.createdAt 
                              ? new Date(order.createdAt)
                              : null)?.toLocaleDateString('uk-UA') || 'Без дати'}
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

export { ModernClientDashboard as default };
