import React, { useState } from 'react';
import {
  X, Search, Clock, DollarSign, 
  User, Phone, MapPin, Star
} from 'lucide-react';

interface Order {
  id: string;
  clientName: string;
  clientPhone: string;
  clientRating: number;
  deviceType: string;
  deviceModel: string;
  problemDescription: string;
  status: 'new' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  dueDate: string;
  estimatedPrice: number;
  location: string;
  proposals: Proposal[];
}

interface Proposal {
  id: string;
  masterId: string;
  masterName: string;
  masterRating: number;
  offerPrice: number;
  estimatedDays: number;
  description: string;
  timestamp: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const mockOrders: Order[] = [
  {
    id: '#1001',
    clientName: 'Анна Коваленко',
    clientPhone: '+38(099) 123-45-67',
    clientRating: 4.9,
    deviceType: 'iPhone',
    deviceModel: 'iPhone 15 Pro',
    problemDescription: 'Розбите скло, камера не працює',
    status: 'new',
    priority: 'high',
    createdAt: '2025-01-21 14:30',
    dueDate: '2025-01-23',
    estimatedPrice: 2500,
    location: 'Київ, вул. Франка 25',
    proposals: [
      { id: 'p1', masterId: 'm1', masterName: 'Олександр Петренко', masterRating: 4.8, offerPrice: 2200, estimatedDays: 1, description: 'Замічу скло та камеру якісно', timestamp: '14:45', status: 'pending' },
      { id: 'p2', masterId: 'm2', masterName: 'Максим Іванов', masterRating: 4.7, offerPrice: 2500, estimatedDays: 2, description: 'Повна діагностика та ремонт', timestamp: '15:00', status: 'pending' }
    ]
  },
  {
    id: '#1002',
    clientName: 'Борис Сидоренко',
    clientPhone: '+38(095) 234-56-78',
    clientRating: 4.6,
    deviceType: 'Samsung',
    deviceModel: 'Galaxy S24',
    problemDescription: 'Батарея швидко розряджається',
    status: 'assigned',
    priority: 'medium',
    createdAt: '2025-01-20 10:15',
    dueDate: '2025-01-24',
    estimatedPrice: 1500,
    location: 'Львів, Площа Ринок 15',
    proposals: [
      { id: 'p3', masterId: 'm1', masterName: 'Олександр Петренко', masterRating: 4.8, offerPrice: 1400, estimatedDays: 1, description: 'Заміна батареї оригіналом', timestamp: '11:00', status: 'accepted' }
    ]
  },
  {
    id: '#1003',
    clientName: 'Марія Тимошенко',
    clientPhone: '+38(093) 345-67-89',
    clientRating: 5.0,
    deviceType: 'iPad',
    deviceModel: 'iPad Pro 12.9',
    problemDescription: 'Екран не включається',
    status: 'in_progress',
    priority: 'urgent',
    createdAt: '2025-01-19 09:00',
    dueDate: '2025-01-22',
    estimatedPrice: 4500,
    location: 'Одеса, вул. Дерибасівська 45',
    proposals: [
      { id: 'p4', masterId: 'm3', masterName: 'Іван Коваль', masterRating: 4.9, offerPrice: 4500, estimatedDays: 3, description: 'Заміна дисплею з установкою', timestamp: '09:30', status: 'accepted' }
    ]
  },
  {
    id: '#1004',
    clientName: 'Петро Василенко',
    clientPhone: '+38(097) 456-78-90',
    clientRating: 4.5,
    deviceType: 'MacBook',
    deviceModel: 'MacBook Air M2',
    problemDescription: 'Клавіатура несправна, деякі клавіші не працюють',
    status: 'completed',
    priority: 'medium',
    createdAt: '2025-01-15 16:20',
    dueDate: '2025-01-21',
    estimatedPrice: 3000,
    location: 'Харків, вул. Сумська 100',
    proposals: [
      { id: 'p5', masterId: 'm2', masterName: 'Максим Іванов', masterRating: 4.7, offerPrice: 2800, estimatedDays: 2, description: 'Замічу клавіатуру', timestamp: '16:45', status: 'accepted' }
    ]
  }
];

const statusConfig = {
  new: { label: 'Нове', color: 'bg-blue-100', textColor: 'text-blue-700', icon: '📥' },
  assigned: { label: 'Призначено', color: 'bg-purple-100', textColor: 'text-purple-700', icon: '👤' },
  in_progress: { label: 'В роботі', color: 'bg-yellow-100', textColor: 'text-yellow-700', icon: '⚙️' },
  completed: { label: 'Завершено', color: 'bg-green-100', textColor: 'text-green-700', icon: '✅' },
  cancelled: { label: 'Скасовано', color: 'bg-red-100', textColor: 'text-red-700', icon: '❌' }
};

const priorityConfig = {
  low: { label: 'Низька', color: 'bg-gray-100 text-gray-700' },
  medium: { label: 'Середня', color: 'bg-yellow-100 text-yellow-700' },
  high: { label: 'Висока', color: 'bg-orange-100 text-orange-700' },
  urgent: { label: 'Терміно', color: 'bg-red-100 text-red-700' }
};

export function OrdersBoard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterSearch, setFilterSearch] = useState('');
  const [newProposal, setNewProposal] = useState('');
  const [showProposalForm, setShowProposalForm] = useState(false);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(filterSearch.toLowerCase()) ||
    order.clientName.toLowerCase().includes(filterSearch.toLowerCase()) ||
    order.deviceModel.toLowerCase().includes(filterSearch.toLowerCase())
  );

  const getOrdersByStatus = (status: Order['status']) => 
    filteredOrders.filter(order => order.status === status);

  const changeOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const acceptProposal = (orderId: string, proposalId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? {
            ...order,
            proposals: order.proposals.map(p => ({
              ...p,
              status: p.id === proposalId ? 'accepted' : p.status === 'pending' ? 'rejected' : p.status
            })),
            status: 'assigned' as const
          }
        : order
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">📦 Доска Замовлень</h1>
              <p className="text-slate-300">Керуйте замовленнями та пропозиціями від майстрів</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
              + Нове замовлення
            </button>
          </div>

          {/* Search */}
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Пошук по ID, клієнту, пристрою..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
          {(['new', 'assigned', 'in_progress', 'completed', 'cancelled'] as const).map(status => (
            <div key={status} className="flex flex-col">
              {/* Column Header */}
              <div className={`${statusConfig[status].color} ${statusConfig[status].textColor} rounded-t-lg p-4 font-bold flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span>{statusConfig[status].icon}</span>
                  <span>{statusConfig[status].label}</span>
                </div>
                <span className="bg-white/20 px-2 py-1 rounded text-sm font-semibold">
                  {getOrdersByStatus(status).length}
                </span>
              </div>

              {/* Column Content */}
              <div className="bg-slate-700/30 rounded-b-lg p-3 space-y-3 min-h-96 max-h-96 overflow-y-auto">
                {getOrdersByStatus(status).map(order => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105 border-l-4 border-blue-500"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{order.id}</p>
                        <p className="text-xs text-slate-600">{order.clientName}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityConfig[order.priority].color}`}>
                        {priorityConfig[order.priority].label}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 mb-3 line-clamp-2">{order.deviceType} {order.deviceModel}</p>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-slate-600">
                        <DollarSign className="w-3 h-3" />
                        <span>{order.estimatedPrice} ₴</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="text-slate-600">{order.clientRating}</span>
                      </div>
                    </div>

                    {order.proposals.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-200">
                        <p className="text-xs font-semibold text-slate-700">
                          💬 {order.proposals.length} пропоз.
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {getOrdersByStatus(status).length === 0 && (
                  <div className="flex items-center justify-center h-32 text-slate-400">
                    <p className="text-center">Немає замовлень</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl max-h-96 overflow-y-auto animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{selectedOrder.id}</h2>
                  <p className="text-slate-600">{selectedOrder.deviceType} {selectedOrder.deviceModel}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-100 rounded-lg transition-all">
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Client Info */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" /> Клієнт
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-semibold">Ім'я:</span> {selectedOrder.clientName}</p>
                    <p className="text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> {selectedOrder.clientPhone}</p>
                    <p className="text-sm flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedOrder.location}</p>
                    <p className="text-sm flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> Рейтинг: {selectedOrder.clientRating}/5</p>
                  </div>
                </div>

                {/* Order Info */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5" /> Детали замовлення
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-semibold">Статус:</span> <span className={`px-2 py-1 rounded text-xs font-semibold ${statusConfig[selectedOrder.status].color} ${statusConfig[selectedOrder.status].textColor}`}>{statusConfig[selectedOrder.status].label}</span></p>
                    <p className="text-sm"><span className="font-semibold">Пріоритет:</span> <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityConfig[selectedOrder.priority].color}`}>{priorityConfig[selectedOrder.priority].label}</span></p>
                    <p className="text-sm"><span className="font-semibold">Вартість:</span> {selectedOrder.estimatedPrice} ₴</p>
                    <p className="text-sm flex items-center gap-2"><Clock className="w-4 h-4" /> До: {selectedOrder.dueDate}</p>
                  </div>
                </div>
              </div>

              {/* Problem Description */}
              <div className="mb-6 pb-6 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Опис проблеми</h3>
                <p className="text-slate-700 text-sm">{selectedOrder.problemDescription}</p>
              </div>

              {/* Proposals Section */}
              <div className="mb-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Пропозиції від майстрів ({selectedOrder.proposals.length})
                </h3>

                <div className="space-y-3">
                  {selectedOrder.proposals.map(proposal => (
                    <div key={proposal.id} className={`p-4 rounded-lg border-l-4 ${
                      proposal.status === 'accepted' ? 'bg-green-50 border-green-500' :
                      proposal.status === 'rejected' ? 'bg-red-50 border-red-500' :
                      'bg-blue-50 border-blue-500'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-slate-900">{proposal.masterName}</p>
                          <p className="text-xs text-slate-600 flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" /> {proposal.masterRating}/5 • {proposal.timestamp}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          proposal.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          proposal.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {proposal.status === 'accepted' ? '✓ Прийнято' :
                           proposal.status === 'rejected' ? '✗ Відхилено' :
                           '⏳ Очікує'}
                        </span>
                      </div>

                      <p className="text-sm text-slate-700 mb-3">{proposal.description}</p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="space-x-4">
                          <span className="font-semibold text-slate-900">💰 {proposal.offerPrice} ₴</span>
                          <span className="text-slate-600">⏱️ {proposal.estimatedDays} дн.</span>
                        </div>
                        {proposal.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => acceptProposal(selectedOrder.id, proposal.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-xs font-semibold"
                            >
                              Прийняти
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs font-semibold">
                              Відхилити
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Management */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-bold text-slate-900 mb-3">Змінити статус</h3>
                <div className="flex gap-2 flex-wrap">
                  {(['new', 'assigned', 'in_progress', 'completed', 'cancelled'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => changeOrderStatus(selectedOrder.id, status)}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all transform hover:scale-105 ${
                        selectedOrder.status === status
                          ? statusConfig[status].color + ' ' + statusConfig[status].textColor
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {statusConfig[status].icon} {statusConfig[status].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
