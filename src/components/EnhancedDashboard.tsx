import { useState, useMemo } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import StarIcon from '@mui/icons-material/Star';
import MessageIcon from '@mui/icons-material/Message';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Order, User, Proposal } from '../types/models';

interface Master {
  id: string;
  avatar: string;
  name: string;
  specialization: string;
  rating: number;
}

interface EnhancedDashboardProps {
  currentUser: User;
  orders: Order[];
  proposals: Proposal[];
  masters: Master[];
  favoriteMasters: string[];
  onSelectOrder?: (order: Order) => void;
}

export function EnhancedDashboard({
  currentUser,
  orders,
  proposals,
  masters,
  favoriteMasters,
  onSelectOrder,
}: EnhancedDashboardProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>(
    'month'
  );

  // Статистика заказов
  const orderStats = useMemo(() => {
    const now = new Date();
    const timeFilter = (date: Date | string) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      switch (timeRange) {
        case 'week':
          return now.getTime() - dateObj.getTime() <= 7 * 24 * 60 * 60 * 1000;
        case 'month':
          return now.getTime() - dateObj.getTime() <= 30 * 24 * 60 * 60 * 1000;
        case 'year':
          return now.getTime() - dateObj.getTime() <= 365 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    };

    const recentOrders = orders.filter(order => timeFilter(order.createdAt));
    
    return {
      total: recentOrders.length,
      open: recentOrders.filter(o => o.status === 'open').length,
      inProgress: recentOrders.filter(o => o.status === 'in_progress').length,
      completed: recentOrders.filter(o => o.status === 'completed').length,
      withPhotos: recentOrders.filter(o => o.devicePhotos && o.devicePhotos.length > 0).length,
      urgent: recentOrders.filter(o => o.urgency === 'high').length
    };
  }, [orders, timeRange]);

  // Статистика предложений
  const proposalStats = useMemo(() => {
    const now = new Date();
    const timeFilter = (date: Date | string) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      switch (timeRange) {
        case 'week':
          return now.getTime() - dateObj.getTime() <= 7 * 24 * 60 * 60 * 1000;
        case 'month':
          return now.getTime() - dateObj.getTime() <= 30 * 24 * 60 * 60 * 1000;
        case 'year':
          return now.getTime() - dateObj.getTime() <= 365 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    };

    const recentProposals = proposals.filter(proposal => timeFilter(proposal.createdAt));
    
    return {
      total: recentProposals.length,
      pending: recentProposals.filter(p => p.status === 'pending').length,
      accepted: recentProposals.filter(p => p.status === 'accepted').length,
      rejected: recentProposals.filter(p => p.status === 'rejected').length,
      averagePrice: recentProposals.length > 0 
        ? Math.round(recentProposals.reduce((sum, p) => sum + (p.price || 0), 0) / recentProposals.length)
        : 0
    };
  }, [proposals, timeRange]);

  // Избранные мастера
  const favoriteMastersData = useMemo(() => {
    return masters.filter(master => favoriteMasters.includes(master.id));
  }, [masters, favoriteMasters]);

  // Последние заказы
  const recentOrders = useMemo(() => {
    return orders
      .sort((a, b) => {
        const dateA = typeof a.createdAt === 'string' ? new Date(a.createdAt) : a.createdAt;
        const dateB = typeof b.createdAt === 'string' ? new Date(b.createdAt) : b.createdAt;
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);
  }, [orders]);

  // Последние предложения
  const recentProposals = useMemo(() => {
    return proposals
      .sort((a, b) => {
        const dateA = typeof a.createdAt === 'string' ? new Date(a.createdAt) : a.createdAt;
        const dateB = typeof b.createdAt === 'string' ? new Date(b.createdAt) : b.createdAt;
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 3);
  }, [proposals]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-yellow-600 bg-yellow-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'completed':
      case 'paid': return 'text-green-600 bg-green-100';
      case 'awaiting_payment_confirmation': return 'text-amber-600 bg-amber-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-6">
      {/* Приветствие */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              👋 Привіт, {currentUser.name || currentUser.fullName}!
            </h1>
            <p className="text-indigo-100 text-lg">
              Ласкаво просимо до RepairHub - вашої мультибрендової платформи для ремонту пристроїв
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">⭐ {currentUser.rating || 4.8}</div>
            <div className="text-indigo-100">Ваш рейтинг</div>
          </div>
        </div>
      </div>

      {/* Фильтр времени */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Статистика за період</h2>
          <div className="flex gap-2">
            {[
              { value: 'week', label: 'Тиждень' },
              { value: 'month', label: 'Місяць' },
              { value: 'year', label: 'Рік' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  setTimeRange(option.value as 'week' | 'month' | 'year')
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === option.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Основная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Заказы */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <AssignmentIcon className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{orderStats.total}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Всього замовлень</h3>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            <span>+12% з минулого місяця</span>
          </div>
        </div>

        {/* Активные заказы */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <PendingIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{orderStats.open + orderStats.inProgress}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Активні замовлення</h3>
          <div className="text-sm text-gray-500">
            {orderStats.open} відкритих, {orderStats.inProgress} в роботі
          </div>
        </div>

        {/* Завершенные */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{orderStats.completed}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Завершено</h3>
          <div className="text-sm text-gray-500">
            {orderStats.completed > 0 ? `${Math.round((orderStats.completed / orderStats.total) * 100)}% від загальних` : '0%'}
          </div>
        </div>

        {/* Предложения */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <MessageIcon className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{proposalStats.total}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Пропозиції</h3>
          <div className="text-sm text-gray-500">
            {proposalStats.pending} очікують, {proposalStats.accepted} прийнято
          </div>
        </div>
      </div>

      {/* Дополнительная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Заказы с фото */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <PhotoCameraIcon className="w-6 h-6 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Закази з фото</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{orderStats.withPhotos}</div>
          <div className="text-sm text-gray-500">
            {orderStats.total > 0 ? `${Math.round((orderStats.withPhotos / orderStats.total) * 100)}% від загальних` : '0%'}
          </div>
        </div>

        {/* Термінові закази */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <AccessTimeIcon className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Термінові закази</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{orderStats.urgent}</div>
          <div className="text-sm text-gray-500">
            Потребують негайного вирішення
          </div>
        </div>

        {/* Середня ціна */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <TrendingUpIcon className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Середня ціна</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {proposalStats.averagePrice > 0 ? `₴${proposalStats.averagePrice}` : '₴0'}
          </div>
          <div className="text-sm text-gray-500">
            За пропозиціями майстрів
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Избранные мастера */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Улюблені майстри</h3>
            <span className="text-sm text-gray-500">{favoriteMastersData.length} майстрів</span>
          </div>
          
          {favoriteMastersData.length > 0 ? (
            <div className="space-y-3">
              {favoriteMastersData.slice(0, 3).map((master) => (
                <div key={master.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={master.avatar}
                    alt={master.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{master.name}</h4>
                    <p className="text-sm text-gray-600">{master.specialization}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{master.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <StarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>У вас поки немає улюблених майстрів</p>
              <p className="text-sm">Додайте їх зі сторінки "Знайти Майстрів"</p>
            </div>
          )}
        </div>

        {/* Последние предложения */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Останні пропозиції</h3>
            <span className="text-sm text-gray-500">{recentProposals.length} пропозицій</span>
          </div>
          
          {recentProposals.length > 0 ? (
            <div className="space-y-3">
              {recentProposals.map((proposal) => (
                <div 
                  key={proposal.id} 
                  onClick={() => {
                    // Знайти замовлення для цієї пропозиції
                    const order = orders.find(o => o.id === proposal.orderId);
                    if (order && onSelectOrder) {
                      onSelectOrder(order);
                    }
                  }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 border border-gray-200 cursor-pointer transition-all duration-200"
                >
                  <img
                    src={proposal.masterAvatar}
                    alt={proposal.masterName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{proposal.masterName}</h4>
                    <p className="text-sm text-gray-600">Замовлення #{proposal.orderId}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₴{proposal.price}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      proposal.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {proposal.status === 'pending' ? 'Очікує' :
                       proposal.status === 'accepted' ? 'Прийнято' : 'Відхилено'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Поки немає пропозицій</p>
              <p className="text-sm">Створіть замовлення, щоб отримати пропозиції</p>
            </div>
          )}
        </div>
      </div>

      {/* Последние заказы */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Останні замовлення</h3>
          <span className="text-sm text-gray-500">{recentOrders.length} замовлень</span>
        </div>
        
        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => onSelectOrder?.(order)}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <AssignmentIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{order.title}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-600">{order.deviceType} • {order.issue}</span>
                    <span className="text-sm text-gray-500">
                      {(typeof order.createdAt === 'string' ? new Date(order.createdAt) : order.createdAt).toLocaleDateString('uk-UA')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-lg">{getUrgencyIcon(order.urgency)}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status === 'open' ? 'Відкрито' :
                     order.status === 'in_progress' ? 'В роботі' :
                     order.status === 'completed' || order.status === 'paid' ? 'Завершено' :
                     order.status === 'awaiting_payment_confirmation' ? 'Очікує оплати' :
                     order.status === 'cancelled' ? 'Скасовано' : order.status}
                  </span>
                  {order.devicePhotos && order.devicePhotos.length > 0 && (
                    <PhotoCameraIcon className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <AssignmentIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Поки немає замовлень</p>
            <p className="text-sm">Створіть перше замовлення, щоб почати</p>
          </div>
        )}
      </div>
    </div>
  );
}
