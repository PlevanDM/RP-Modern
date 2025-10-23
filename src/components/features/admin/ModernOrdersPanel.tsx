// Modern Orders Management Panel
import React, { useState } from 'react';
import { 
  Package, Search, Filter, Plus, Eye, Edit, Trash2, 
  Clock, CheckCircle, XCircle, AlertTriangle, MapPin,
  Calendar, DollarSign, User, Phone, MessageSquare,
  Truck, CreditCard, Star, MoreVertical
} from 'lucide-react';
import {
  AdminCard,
  SectionHeader,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminTable,
  TableRow,
  TableCell,
  Badge,
  EmptyState
} from './AdminDesignSystem';

export const ModernOrdersPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const orders = [
    {
      id: 1,
      orderNumber: '#RH-2024-001',
      client: 'Анна Коваленко',
      master: 'Олександр Петренко',
      service: 'Заміна екрану iPhone 15',
      status: 'in_progress',
      priority: 'high',
      price: 4500,
      createdAt: '2024-01-15',
      dueDate: '2024-01-20',
      location: 'Київ, вул. Хрещатик, 10',
      phone: '+380501234567',
      rating: 4.8,
      progress: 65
    },
    {
      id: 2,
      orderNumber: '#RH-2024-002',
      client: 'Марія Сидоренко',
      master: 'Максим Іванов',
      service: 'Ремонт MacBook Pro',
      status: 'completed',
      priority: 'medium',
      price: 8500,
      createdAt: '2024-01-10',
      dueDate: '2024-01-18',
      location: 'Львів, пр. Свободи, 25',
      phone: '+380671234567',
      rating: 4.9,
      progress: 100
    },
    {
      id: 3,
      orderNumber: '#RH-2024-003',
      client: 'Ігор Мельник',
      master: 'Олександр Петренко',
      service: 'Заміна батареї Samsung Galaxy',
      status: 'pending',
      priority: 'low',
      price: 2200,
      createdAt: '2024-01-12',
      dueDate: '2024-01-25',
      location: 'Харків, вул. Сумська, 5',
      phone: '+380931234567',
      rating: 0,
      progress: 0
    },
    {
      id: 4,
      orderNumber: '#RH-2024-004',
      client: 'Ольга Петренко',
      master: 'Максим Іванов',
      service: 'Чистка від вологи iPhone 14',
      status: 'cancelled',
      priority: 'high',
      price: 3200,
      createdAt: '2024-01-08',
      dueDate: '2024-01-15',
      location: 'Одеса, вул. Дерибасівська, 15',
      phone: '+380441234567',
      rating: 0,
      progress: 0
    },
    {
      id: 5,
      orderNumber: '#RH-2024-005',
      client: 'Дмитро Коваль',
      master: 'Олександр Петренко',
      service: 'Ремонт iPad Air',
      status: 'in_progress',
      priority: 'medium',
      price: 6800,
      createdAt: '2024-01-14',
      dueDate: '2024-01-22',
      location: 'Дніпро, пр. Дмитра Яворницького, 88',
      phone: '+380631234567',
      rating: 4.7,
      progress: 40
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || order.priority === filterPriority;
    
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA');
  };

  const formatPrice = (price: number) => {
    return `₴${price.toLocaleString()}`;
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
          {filteredOrders.length === 0 ? (
            <EmptyState
              icon={Package}
              title="Замовлення не знайдені"
              description="Спробуйте змінити параметри пошуку або фільтри"
            />
          ) : (
            <AdminTable headers={['Замовлення', 'Клієнт', 'Майстер', 'Послуга', 'Статус', 'Пріоритет', 'Ціна', 'Прогрес', 'Дії']}>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.orderNumber}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Створено: {formatDate(order.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          До: {formatDate(order.dueDate)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.client}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{order.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{order.location}</span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {order.master.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{order.master}</p>
                        {order.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">{order.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{order.service}</p>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant={getStatusColor(order.status) as any} size="sm">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status === 'completed' ? 'Завершено' :
                         order.status === 'in_progress' ? 'В процесі' :
                         order.status === 'pending' ? 'Очікує' : 'Скасовано'}
                      </div>
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant={getPriorityColor(order.priority) as any} size="sm">
                      {order.priority === 'high' ? 'Високий' :
                       order.priority === 'medium' ? 'Середній' : 'Низький'}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">{formatPrice(order.price)}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${order.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{order.progress}%</span>
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
              ))}
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
