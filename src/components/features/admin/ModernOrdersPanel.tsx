// Modern Orders Management Panel
import { useEffect, useState } from 'react';
import { 
  Package, Search, Plus, Eye, Edit,
  Clock, CheckCircle, XCircle, AlertTriangle, MapPin,
  Calendar, DollarSign, Phone, MessageSquare
} from 'lucide-react';
import {
  AdminCard,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminTable,
  TableRow,
  TableCell,
  Badge,
  EmptyState
} from './AdminDesignSystem';
import { apiOrderService } from '../../../services/apiOrderService';
import { Order } from '../../../types';

export const ModernOrdersPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { orders } = await apiOrderService.getOrders(1, 50);
        setOrders(orders || []);
      } catch {
        setError('Не вдалося завантажити замовлення');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = `${order.id}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (order.clientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (order.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const orderWithPriority = order as Order & { priority?: string };
    const matchesPriority = filterPriority === 'all' || (orderWithPriority.priority) === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = [
    { title: 'Всього замовлень', value: orders.length, icon: Package, color: 'text-blue-600' },
    { title: 'В процесі', value: orders.filter(o => o.status === 'in_progress').length, icon: Clock, color: 'text-yellow-600' },
    { title: 'Завершені', value: orders.filter(o => o.status === 'completed').length, icon: CheckCircle, color: 'text-green-600' },
    { title: 'Очікують', value: orders.filter(o => o.status === 'pending').length, icon: AlertTriangle, color: 'text-orange-600' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertTriangle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'info';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'neutral';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'neutral';
    }
  };

  const formatDate = (dateValue: string | number | Date | null | undefined) => {
    const d = typeof dateValue === 'string' || typeof dateValue === 'number' ? new Date(dateValue) : (dateValue ? new Date(dateValue) : null);
    return d ? d.toLocaleDateString('uk-UA') : '-';
  };

  const formatPrice = (price?: number) => {
    const p = typeof price === 'number' ? price : 0;
    return `₴${p.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            📦 Управління замовленнями
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Керування всіма замовленнями та їх статусами
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <AdminCard key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </AdminCard>
          ))}
        </div>

        {/* Filters and Search */}
        <AdminCard className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <AdminInput
                  placeholder="Пошук по номеру замовлення, клієнту або послузі..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <AdminSelect
                value={filterStatus}
                onChange={setFilterStatus}
                options={[
                  { value: 'all', label: 'Всі статуси' },
                  { value: 'pending', label: 'Очікують' },
                  { value: 'in_progress', label: 'В процесі' },
                  { value: 'completed', label: 'Завершені' },
                  { value: 'cancelled', label: 'Скасовані' }
                ]}
                className="w-40"
              />
              
              <AdminSelect
                value={filterPriority}
                onChange={setFilterPriority}
                options={[
                  { value: 'all', label: 'Всі пріоритети' },
                  { value: 'high', label: 'Високий' },
                  { value: 'medium', label: 'Середній' },
                  { value: 'low', label: 'Низький' }
                ]}
                className="w-40"
              />
              
              <AdminButton>
                <Plus className="w-4 h-4 mr-2" />
                Новий замовлення
              </AdminButton>
            </div>
          </div>
        </AdminCard>

        {/* Orders Table */}
        <AdminCard className="overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Завантаження...</div>
          ) : error ? (
            <EmptyState icon={Package} title="Помилка" description={error} />
          ) : filteredOrders.length === 0 ? (
            <EmptyState
              icon={Package}
              title="Замовлення не знайдені"
              description="Спробуйте змінити параметри пошуку або фільтри"
            />
          ) : (
            <AdminTable headers={['Замовлення', 'Клієнт', 'Майстер', 'Послуга', 'Статус', 'Пріоритет', 'Ціна', 'Прогрес', 'Дії']}>
              {filteredOrders.map((order) => {
                const orderWithPriority = order as Order & { priority?: string };
                return (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.id}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Створено: {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.clientName || '-'}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{order.clientPhone || '-'}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{order.city || '-'}</span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {order.masterId ? 'M' : '—'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{masterName}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{order.title || '-'}</p>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)} size="sm">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status === 'completed' ? 'Завершено' :
                         order.status === 'in_progress' ? 'В процесі' :
                         order.status === 'pending' ? 'Очікує' : 'Скасовано'}
                      </div>
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant={getPriorityColor((orderWithPriority.priority) || 'medium')} size="sm">
                      {(orderWithPriority.priority) === 'high' ? 'Високий' :
                       (orderWithPriority.priority) === 'low' ? 'Низький' : 'Середній'}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">{formatPrice(order.paymentAmount || order.agreedPrice || 0)}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${order.status === 'completed' ? 100 : order.status === 'in_progress' ? 60 : order.status === 'accepted' ? 30 : 10}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{order.status === 'completed' ? 100 : order.status === 'in_progress' ? 60 : order.status === 'accepted' ? 30 : 10}%</span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AdminButton variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </AdminButton>
                      <AdminButton variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </AdminButton>
                      <AdminButton variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </AdminButton>
                      <AdminButton variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </AdminButton>
                    </div>
                  </TableCell>
                </TableRow>
              );
              })}
            </AdminTable>
          )}
        </AdminCard>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Показано {filteredOrders.length} з {orders.length} замовлень
            </p>
            <div className="flex items-center gap-2">
              <AdminButton variant="ghost" size="sm">Попередня</AdminButton>
              <AdminButton variant="primary" size="sm">1</AdminButton>
              <AdminButton variant="ghost" size="sm">2</AdminButton>
              <AdminButton variant="ghost" size="sm">3</AdminButton>
              <AdminButton variant="ghost" size="sm">Наступна</AdminButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernOrdersPanel;
