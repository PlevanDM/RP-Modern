import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  MapPin,
  DollarSign,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { useTranslation } from 'react-i18next';
import { Order } from '../../../types/models';

interface EnhancedOrdersBoardProps {
  orders?: Order[];
  onOrderClick?: (order: Order) => void;
  onStatusChange?: (orderId: string, newStatus: string) => void;
}

type OrderStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

interface KanbanColumn {
  id: OrderStatus;
  title: string;
  color: string;
  icon: React.ReactNode;
  count: number;
}

export function EnhancedOrdersBoard({ 
  orders = [],
  onOrderClick,
  onStatusChange 
}: EnhancedOrdersBoardProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  // Mock data якщо orders пусті
  const mockOrders: Order[] = [
    {
      id: '1',
      title: 'Заміна екрану iPhone 14 Pro',
      description: 'Розбитий екран, потрібна термінова заміна',
      device: 'iPhone 14 Pro',
      deviceType: 'iPhone',
      issue: 'Розбитий екран',
      budget: 8500,
      city: 'Київ',
      status: 'open',
      urgency: 'high',
      createdAt: new Date('2024-11-01'),
      updatedAt: new Date('2024-11-01'),
      clientId: 'client1',
      clientName: 'Іван Петренко',
      proposalCount: 3,
      paymentStatus: 'pending',
      paymentAmount: 0,
      paymentMethod: '',
      escrowId: '',
      paymentDate: new Date(),
      disputeStatus: 'none'
    },
    {
      id: '2',
      title: 'Заміна батареї Samsung S23',
      description: 'Батарея швидко розряджається',
      device: 'Samsung Galaxy S23 Ultra',
      deviceType: 'iPhone',
      issue: 'Проблема з батареєю',
      budget: 1200,
      city: 'Львів',
      status: 'in_progress',
      urgency: 'medium',
      createdAt: new Date('2024-10-30'),
      updatedAt: new Date('2024-11-01'),
      clientId: 'client2',
      clientName: 'Марія Коваль',
      proposalCount: 5,
      paymentStatus: 'pending',
      paymentAmount: 0,
      paymentMethod: '',
      escrowId: '',
      paymentDate: new Date(),
      disputeStatus: 'none'
    },
    {
      id: '3',
      title: 'Чистка MacBook Pro',
      description: 'Перегрівається, потрібна чистка',
      device: 'MacBook Pro 16"',
      deviceType: 'Mac',
      issue: 'Перегрів',
      budget: 800,
      city: 'Одеса',
      status: 'completed',
      urgency: 'low',
      createdAt: new Date('2024-10-28'),
      updatedAt: new Date('2024-10-31'),
      clientId: 'client3',
      clientName: 'Олександр Сидоренко',
      proposalCount: 2,
      paymentStatus: 'paid',
      paymentAmount: 800,
      paymentMethod: 'card',
      escrowId: '',
      paymentDate: new Date(),
      disputeStatus: 'none'
    }
  ];

  const displayOrders = orders.length > 0 ? orders : mockOrders;

  // Фільтрація замовлень
  const filteredOrders = useMemo(() => {
    let filtered = displayOrders;

    // Пошук
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.device.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фільтр по статусу
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }

    return filtered;
  }, [displayOrders, searchQuery, selectedStatus]);

  // Kanban колонки
  const columns: KanbanColumn[] = useMemo(() => [
    {
      id: 'open',
      title: 'Нові',
      color: 'bg-blue-500',
      icon: <Package className="w-5 h-5" />,
      count: filteredOrders.filter(o => o.status === 'open').length
    },
    {
      id: 'in_progress',
      title: 'В роботі',
      color: 'bg-yellow-500',
      icon: <Clock className="w-5 h-5" />,
      count: filteredOrders.filter(o => o.status === 'in_progress').length
    },
    {
      id: 'completed',
      title: 'Завершено',
      color: 'bg-green-500',
      icon: <CheckCircle className="w-5 h-5" />,
      count: filteredOrders.filter(o => o.status === 'completed').length
    },
    {
      id: 'cancelled',
      title: 'Скасовано',
      color: 'bg-red-500',
      icon: <XCircle className="w-5 h-5" />,
      count: filteredOrders.filter(o => o.status === 'cancelled').length
    }
  ], [filteredOrders]);

  // Отримати замовлення по статусу
  const getOrdersByStatus = (status: OrderStatus) => {
    return filteredOrders.filter(order => order.status === status);
  };

  // Отримати колір пріоритету
  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  // Отримати текст пріоритету
  const getUrgencyText = (urgency?: string) => {
    switch (urgency) {
      case 'high': return 'Терміново';
      case 'medium': return 'Середній';
      case 'low': return 'Низький';
      default: return 'Звичайний';
    }
  };

  // Рендер картки замовлення
  const OrderCard = ({ order }: { order: Order }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className="mb-3"
    >
      <Card className="cursor-pointer hover:shadow-lg transition-all">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                {order.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <User className="w-3 h-3" />
                <span>{order.clientName}</span>
              </div>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Device */}
          <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
            <Package className="w-3 h-3" />
            <span>{order.device}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
            <MapPin className="w-3 h-3" />
            <span>{order.city}</span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-bold text-sm">₴{order.budget}</span>
            </div>
            <Badge 
              variant="outline" 
              className={`text-xs ${getUrgencyColor(order.urgency)}`}
            >
              {getUrgencyText(order.urgency)}
            </Badge>
          </div>

          {/* Proposals count */}
          {order.proposalCount > 0 && (
            <div className="mt-2 text-xs text-gray-600 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>{order.proposalCount} пропозицій</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Дошка Замовлень
            </h1>
            <p className="text-gray-600">
              {filteredOrders.length} замовлень • {columns.find(c => c.id === 'open')?.count} нових
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Пошук замовлень..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* View Mode */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'kanban' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('kanban')}
                >
                  Kanban
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  Список
                </Button>
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              <Button
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('all')}
              >
                Всі ({filteredOrders.length})
              </Button>
              {columns.map((column) => (
                <Button
                  key={column.id}
                  variant={selectedStatus === column.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus(column.id)}
                  className="whitespace-nowrap"
                >
                  {column.icon}
                  <span className="ml-2">{column.title} ({column.count})</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Kanban Board */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {columns.map((column) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="h-full">
                  <CardHeader className={`${column.color} text-white`}>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <div className="flex items-center gap-2">
                        {column.icon}
                        <span>{column.title}</span>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {column.count}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 min-h-[500px]">
                    <AnimatePresence>
                      {getOrdersByStatus(column.id).map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </AnimatePresence>
                    {getOrdersByStatus(column.id).length === 0 && (
                      <div className="text-center py-8 text-gray-400">
                        <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Немає замовлень</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{order.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={`${getUrgencyColor(order.urgency)}`}
                          >
                            {getUrgencyText(order.urgency)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{order.clientName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            <span>{order.device}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{order.city}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-bold">₴{order.budget}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

