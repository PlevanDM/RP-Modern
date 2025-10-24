import { useState, useMemo } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { Search, Filter, ChevronDown, Package, User, Calendar, DollarSign, Clock, MessageCircle } from 'lucide-react';
import { Order, User as CurrentUser } from '../types/models';
import { CreateOrderModal } from './CreateOrderModal';
import { ProposalModal } from './ProposalModal';

interface OrdersProps {
  currentUser: CurrentUser;
  orders?: Order[];
  onSendToMaster?: (orderId: string, masterId: string) => void;
  onCreateOrder?: (orderData: Partial<Order>) => void;
  onDeleteOrder?: (orderId: string) => void;
  onRestoreOrder?: (orderId: string) => void;
  onToggleActiveSearch?: (orderId: string) => void;
  onUpdateOrderStatus?: (orderId: string, newStatus: Order['status']) => void;
  onCreateProposal?: (proposalData: Partial<Proposal>) => void;
  masters?: {
    id: string;
    avatar: string;
    name: string;
    specialization: string;
    rating: number;
    city: string;
  }[];
  onEditOrder?: (orderId: string, updates: Partial<Order>) => void;
}

export function Orders({ currentUser, orders = [], onSendToMaster, onCreateOrder, onDeleteOrder, onRestoreOrder, onToggleActiveSearch, onUpdateOrderStatus, masters = [], onEditOrder, onCreateProposal }: OrdersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    urgency: 'medium'
  });
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'price'>('date');
  const [showMasterSelection, setShowMasterSelection] = useState(false);
  const [selectedOrderForMaster, setSelectedOrderForMaster] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);

  const filteredOrders = useMemo(() => {
    // Фільтруємо заказы: если клиент, то только его заказы; если мастер, то все
    let result = orders.filter(order => {
      // Если пользователь клиент, показываем только его заказы
      if (currentUser?.role === 'client') {
        return order?.clientId === currentUser?.id;
      }
      // Если мастер, показываем все заказы
      return true;
    });

    // Фільтр за пошуковим термом
    result = result.filter(order =>
      (order?.deviceType?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order?.issue?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (order?.title?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    // Фільтр за статусом
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }

    // Сортування
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'price') {
        return (b.agreedPrice || 0) - (a.agreedPrice || 0);
      }
      return 0;
    });

    return result;
  }, [orders, searchTerm, statusFilter, sortBy, currentUser?.id, currentUser?.role]);

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      'open': 'bg-blue-100 text-blue-800',
      'proposed': 'bg-purple-100 text-purple-800',
      'accepted': 'bg-yellow-100 text-yellow-800',
      'in_progress': 'bg-cyan-100 text-cyan-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'deleted': 'bg-gray-100 text-gray-600',
      'searching': 'bg-orange-100 text-orange-800',
      'active_search': 'bg-indigo-100 text-indigo-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'open': '🟡 Відкрито',
      'proposed': '💬 Є пропозиції',
      'accepted': '✅ Прийнято',
      'in_progress': '🔧 В роботі',
      'completed': '✔️ Завершено',
      'cancelled': '❌ Скасовано',
      'deleted': '🗑️ Видалено',
      'searching': '🔍 Пошук майстра',
      'active_search': '🔍 Активний пошук майстра'
    };
    return statusMap[status] || status;
  };

  const getUrgencyBadge = (urgency?: string) => {
    const urgencyMap: Record<string, string> = {
      'high': '🔴 Терміно',
      'medium': '🟡 Звичайно',
      'low': '🟢 Не терміно'
    };
    return urgencyMap[urgency || 'low'] || '🟢 Не терміно';
  };

  const handleEditOrder = () => {
    if (selectedOrder) {
      setEditForm({
        title: selectedOrder.title,
        description: selectedOrder.description,
        urgency: selectedOrder.urgency || 'medium'
      });
    }
    setIsEditing(true);
  };

  const handleSaveOrder = () => {
    if (selectedOrder && onEditOrder) {
      onEditOrder(selectedOrder.id, editForm);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSendToMaster = (orderId: string) => {
    setSelectedOrderForMaster(orderId);
    setShowMasterSelection(true);
  };

  const handleSelectMaster = (masterId: string) => {
    onSendToMaster?.(selectedOrderForMaster, masterId);
    setShowMasterSelection(false);
    setSelectedOrderForMaster('');
  };

  const handleCreateOrder = (orderData: Partial<Order>) => {
    onCreateOrder?.(orderData);
  };

  const handleDeleteOrder = (order: Order) => {
    setOrderToDelete(order);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteOrder = () => {
    if (orderToDelete && onDeleteOrder) {
      onDeleteOrder(orderToDelete.id);
      setShowDeleteConfirm(false);
      setOrderToDelete(null);
      setSelectedOrder(null); // Закрываем детальный просмотр
    }
  };

  const cancelDeleteOrder = () => {
    setShowDeleteConfirm(false);
    setOrderToDelete(null);
  };

  const handleRestoreOrder = (order: Order) => {
    if (onRestoreOrder) {
      onRestoreOrder(order.id);
    }
  };

  const handleToggleActiveSearch = (order: Order) => {
    if (onToggleActiveSearch) {
      onToggleActiveSearch(order.id);
    }
  };

  const handleStatusChange = (order: Order, newStatus: string) => {
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(order.id, newStatus as Order['status']);
    }
  };

  const statuses = [
    { value: 'all', label: 'Усі замовлення' },
    { value: 'open', label: 'Відкрито' },
    { value: 'proposed', label: 'З пропозиціями' },
    { value: 'in_progress', label: 'В роботі' },
    { value: 'completed', label: 'Завершено' },
    { value: 'deleted', label: 'Видалені' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Замовлення</h1>
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-xs relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Пошук замовлень..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <AddIcon sx={{ fontSize: 20 }} />
            Створити замовлення
          </button>
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-wrap gap-4 items-center">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <ChevronDown className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'price')}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          >
            <option value="date">За датою (новіші)</option>
            <option value="price">За ціною (більші)</option>
          </select>
        </div>

        {/* Counter */}
        <div className="ml-auto">
          <p className="text-sm text-gray-600">
            Знайдено: <span className="font-bold text-indigo-600">{filteredOrders.length}</span>
          </p>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">Замовлень не знайдено</p>
          <p className="text-gray-400 text-sm mt-1">Спробуйте змінити фільтри пошуку</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => {
            const isDeleted = order.status === 'deleted';
            return (
              <div 
                key={order.id} 
                onClick={() => setSelectedOrder(order)}
                className={`rounded-xl shadow-sm border transition-all p-6 cursor-pointer ${
                  isDeleted 
                    ? 'bg-gray-50 border-gray-200 opacity-60' 
                    : 'bg-white border-gray-100 hover:shadow-md hover:border-indigo-200'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold ${isDeleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {order.title}
                    </h3>
                    <p className={`text-sm mt-1 ${isDeleted ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                      {order.deviceType} - {order.issue}
                    </p>
                    {isDeleted && order.deletedAt && (
                      <p className="text-xs text-red-500 mt-1">
                        Видалено: {new Date(order.deletedAt).toLocaleDateString('uk-UA')}
                      </p>
                    )}
                  </div>
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 border-0 outline-none cursor-pointer ${getStatusColor(order.status)}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="open">🟡 Відкрито</option>
                    <option value="active_search">🔍 Активний пошук майстра</option>
                    <option value="accepted">✅ Прийнято</option>
                    <option value="in_progress">🔧 В роботі</option>
                    <option value="completed">✔️ Завершено</option>
                    <option value="deleted">🗑️ Видалено</option>
                  </select>
                </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {order.assignedMasterId && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Призначен майстер</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(order.createdAt).toLocaleDateString('uk-UA')}</span>
                </div>

                {order.agreedPrice && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">${order.agreedPrice}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{getUrgencyBadge(order.urgency)}</span>
                </div>
              </div>

              {order.status === 'proposed' && (
                <div className="mt-4 flex items-center gap-2 p-2 bg-purple-50 rounded-lg text-purple-700 text-sm">
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <p>Є пропозиції від майстрів</p>
                </div>
              )}
            </div>
            );
          })}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-x-hidden">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700 max-w-3xl w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-bold">{selectedOrder.title}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-all duration-200"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Пристрій</p>
                  <p className="font-medium text-slate-100">{selectedOrder.deviceType}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Проблема</p>
                  <p className="font-medium text-slate-100">{selectedOrder.issue}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Статус</p>
                  <p className="font-medium text-slate-100">{getStatusText(selectedOrder.status)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Терміновість</p>
                  <p className="font-medium text-slate-100">{getUrgencyBadge(selectedOrder.urgency)}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-slate-400 mb-2">Опис</p>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Назва замовлення</label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Опис проблеми</label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Терміновість</label>
                      <select
                        value={editForm.urgency}
                        onChange={(e) => setEditForm({...editForm, urgency: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="high">🔴 Терміно</option>
                        <option value="medium">🟡 Звичайно</option>
                        <option value="low">🟢 Не терміно</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-100 bg-slate-800/50 border border-slate-700 p-4 rounded-lg">{selectedOrder.description}</p>
                )}
              </div>

              {/* Master Info */}
              {selectedOrder.assignedMasterId && (
                <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg">
                  <p className="text-sm text-slate-400 mb-2">Призначений майстер</p>
                  <p className="font-medium text-slate-100">Alex Master</p>
                </div>
              )}

              {/* Pricing Info */}
              {selectedOrder.agreedPrice && (
                <div className="grid grid-cols-2 gap-4 bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-slate-400">Запропонована ціна</p>
                    <p className="text-lg font-bold text-green-400">${selectedOrder.proposedPrice || selectedOrder.agreedPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Узгоджена ціна</p>
                    <p className="text-lg font-bold text-green-400">${selectedOrder.agreedPrice}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                {/* CLIENT ACTIONS */}
                {currentUser?.role === 'client' && (
                  <>
                    {selectedOrder.status === 'proposed' && (
                      <>
                        <button className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25">
                          <CheckCircleIcon sx={{ fontSize: 20 }} /> Прийняти пропозицію
                        </button>
                        <button className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/25">
                          <CancelIcon sx={{ fontSize: 20 }} /> Відхилити
                        </button>
                      </>
                    )}

                    {selectedOrder.status === 'open' && !isEditing && (
                      <>
                        <button 
                          onClick={handleEditOrder}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25"
                        >
                          <EditIcon sx={{ fontSize: 20 }} /> Редагувати замовлення
                        </button>
                        <button 
                          onClick={() => handleSendToMaster(selectedOrder.id)}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25"
                        >
                          <MessageIcon sx={{ fontSize: 20 }} /> Відправити майстрам
                        </button>
                        <button 
                          onClick={() => handleToggleActiveSearch(selectedOrder)}
                          className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                            selectedOrder.isActiveSearch !== false 
                              ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 hover:shadow-orange-500/25' 
                              : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 hover:shadow-slate-500/25'
                          } text-white`}
                        >
                          <SearchIcon sx={{ fontSize: 20 }} /> 
                          {selectedOrder.isActiveSearch !== false ? 'Призупинити пошук' : 'Активувати пошук'}
                        </button>
                        <button 
                          onClick={() => handleDeleteOrder(selectedOrder)}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/25"
                        >
                          <CloseIcon sx={{ fontSize: 20 }} /> Видалити замовлення
                        </button>
                      </>
                    )}

                    {selectedOrder.status === 'deleted' && (
                      <>
                        <button 
                          onClick={() => handleRestoreOrder(selectedOrder)}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25"
                        >
                          <CheckCircleIcon sx={{ fontSize: 20 }} /> Відновити замовлення
                        </button>
                      </>
                    )}

                    {selectedOrder.status === 'open' && isEditing && (
                      <>
                        <button 
                          onClick={handleSaveOrder}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25"
                        >
                          <CheckCircleIcon sx={{ fontSize: 20 }} /> Зберегти зміни
                        </button>
                        <button 
                          onClick={handleCancelEdit}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-slate-500/25"
                        >
                          <CancelIcon sx={{ fontSize: 20 }} /> Скасувати
                        </button>
                      </>
                    )}

                    {selectedOrder.status === 'in_progress' && (
                      <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25">
                        <MessageIcon sx={{ fontSize: 20 }} /> Чат з майстром
                      </button>
                    )}
                  </>
                )}

                {/* MASTER ACTIONS */}
                {currentUser?.role === 'master' && (
                  <>
                    {selectedOrder.status === 'proposed' && (
                      <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
                        📊 Переглянути пропозиції
                      </button>
                    )}

                    {selectedOrder.status === 'open' && (
                      <button
                        onClick={() => setShowProposalModal(true)}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25">
                        <EditIcon sx={{ fontSize: 20 }} /> Розмістити пропозицію
                      </button>
                    )}

                    {selectedOrder.status === 'in_progress' && (
                      <>
                        <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25">
                          <MessageIcon sx={{ fontSize: 20 }} /> Чат з клієнтом
                        </button>
                        <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25">
                          📸 Поділитися фото
                        </button>
                      </>
                    )}
                  </>
                )}

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 font-medium transition-all duration-200 shadow-lg hover:shadow-slate-500/25"
                >
                  Закрити
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно выбора мастера */}
      {showMasterSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Виберіть майстра</h3>
              <button
                onClick={() => setShowMasterSelection(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <CloseIcon sx={{ fontSize: 24 }} />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Виберіть майстра, якому хочете відправити замовлення на розгляд
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {masters.map((master) => (
                <div
                  key={master.id}
                  onClick={() => handleSelectMaster(master.id)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={master.avatar}
                      alt={master.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{master.name}</h4>
                      <p className="text-sm text-gray-600">{master.specialization}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm text-gray-600">{master.rating}</span>
                        <span className="text-sm text-gray-500">• {master.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно создания заказа */}
      <CreateOrderModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateOrder}
        currentUser={currentUser}
      />

      {/* Модальное окно создания предложения */}
      {selectedOrder && (
        <ProposalModal
            isOpen={showProposalModal}
            onClose={() => setShowProposalModal(false)}
            onSubmit={(proposalData) => {
                onCreateProposal?.({ ...proposalData, orderId: selectedOrder.id });
                setShowProposalModal(false);
            }}
            order={selectedOrder}
            currentUser={currentUser}
        />
      )}

      {/* Модальное окно подтверждения удаления */}
      {showDeleteConfirm && orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <CloseIcon sx={{ fontSize: 24 }} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Видалити замовлення</h3>
                <p className="text-sm text-gray-600">Цю дію неможливо скасувати</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                Ви впевнені, що хочете видалити замовлення:
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-900">{orderToDelete.title}</h4>
                <p className="text-sm text-gray-600">{orderToDelete.deviceType} - {orderToDelete.issue}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Створено: {new Date(orderToDelete.createdAt).toLocaleDateString('uk-UA')}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={cancelDeleteOrder}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Скасувати
              </button>
              <button
                onClick={confirmDeleteOrder}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
