import { useState } from 'react';
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
import { useOrdersStore } from '../store/ordersStore';
import { Pagination } from './ui/Pagination';
import { useDebounce } from '../hooks/useDebounce';

interface OrdersProps {
  currentUser: CurrentUser;
  masters?: {
    id: string;
    avatar: string;
    name: string;
    specialization: string;
    rating: number;
    city: string;
  }[];
}

export function Orders({ currentUser, masters = [] }: OrdersProps) {
  const { orders, currentPage, totalPages, fetchOrders, createOrder, deleteOrder, restoreOrder, toggleActiveSearch, updateOrderStatus, editOrder, submitProposal, sendToMaster } = useOrdersStore();
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
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchOrders(currentPage, 10, debouncedSearchTerm, statusFilter, sortBy);
  }, [currentPage, debouncedSearchTerm, statusFilter, sortBy, fetchOrders]);

  const handlePageChange = (page: number) => {
    fetchOrders(page, 10, debouncedSearchTerm, statusFilter, sortBy);
  };

  const filteredOrders = orders;

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
    if (selectedOrder) {
      editOrder({ ...selectedOrder, ...editForm });
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
    sendToMaster(selectedOrderForMaster, masterId);
    setShowMasterSelection(false);
    setSelectedOrderForMaster('');
  };

  const handleCreateOrder = (orderData: Partial<Order>) => {
    createOrder(orderData as Omit<Order, 'id'>);
  };

  const handleDeleteOrder = (order: Order) => {
    setOrderToDelete(order);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteOrder = () => {
    if (orderToDelete) {
      deleteOrder(orderToDelete.id);
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
    restoreOrder(order.id);
  };

  const handleToggleActiveSearch = (order: Order) => {
    toggleActiveSearch(order.id);
  };

  const _handleStatusChange = (order: Order, newStatus: string) => {
    updateOrderStatus(order.id, newStatus as Order['status']);
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
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </div>
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-indigo-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedOrder.title}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white hover:bg-indigo-700 rounded p-2 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Пристрій</p>
                  <p className="font-medium text-gray-900">{selectedOrder.deviceType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Проблема</p>
                  <p className="font-medium text-gray-900">{selectedOrder.issue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Статус</p>
                  <p className="font-medium text-gray-900">{getStatusText(selectedOrder.status)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Терміновість</p>
                  <p className="font-medium text-gray-900">{getUrgencyBadge(selectedOrder.urgency)}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Опис</p>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Назва замовлення</label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Опис проблеми</label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Терміновість</label>
                      <select
                        value={editForm.urgency}
                        onChange={(e) => setEditForm({...editForm, urgency: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="high">🔴 Терміно</option>
                        <option value="medium">🟡 Звичайно</option>
                        <option value="low">🟢 Не терміно</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedOrder.description}</p>
                )}
              </div>

              {/* Master Info */}
              {selectedOrder.assignedMasterId && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-500 mb-2">Призначений майстер</p>
                  <p className="font-medium text-gray-900">Alex Master</p>
                </div>
              )}

              {/* Pricing Info */}
              {selectedOrder.agreedPrice && (
                <div className="grid grid-cols-2 gap-4 bg-green-50 p-4 rounded-lg border border-green-200">
                  <div>
                    <p className="text-sm text-gray-500">Запропонована ціна</p>
                    <p className="text-lg font-bold text-green-600">${selectedOrder.proposedPrice || selectedOrder.agreedPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Узгоджена ціна</p>
                    <p className="text-lg font-bold text-green-600">${selectedOrder.agreedPrice}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-4">
                {/* CLIENT ACTIONS */}
                {currentUser?.role === 'client' && (
                  <>
                    {selectedOrder.status === 'proposed' && (
                      <>
                        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center justify-center gap-2">
                          <CheckCircleIcon sx={{ fontSize: 20 }} /> Прийняти пропозицію
                        </button>
                        <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors flex items-center justify-center gap-2">
                          <CancelIcon sx={{ fontSize: 20 }} /> Відхилити
                        </button>
                      </>
                    )}

                    {selectedOrder.status === 'open' && !isEditing && (
                      <>
                        <button 
                          onClick={handleEditOrder}
                          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <EditIcon sx={{ fontSize: 20 }} /> Редагувати замовлення
                        </button>
                        <button 
                          onClick={() => handleSendToMaster(selectedOrder.id)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <MessageIcon sx={{ fontSize: 20 }} /> Відправити майстрам
                        </button>
                        <button 
                          onClick={() => handleToggleActiveSearch(selectedOrder)}
                          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                            selectedOrder.isActiveSearch !== false 
                              ? 'bg-orange-600 text-white hover:bg-orange-700' 
                              : 'bg-gray-600 text-white hover:bg-gray-700'
                          }`}
                        >
                          <SearchIcon sx={{ fontSize: 20 }} /> 
                          {selectedOrder.isActiveSearch !== false ? 'Призупинити пошук' : 'Активувати пошук'}
                        </button>
                        <button 
                          onClick={() => handleDeleteOrder(selectedOrder)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <CloseIcon sx={{ fontSize: 20 }} /> Видалити замовлення
                        </button>
                      </>
                    )}

                    {selectedOrder.status === 'deleted' && (
                      <>
                        <button 
                          onClick={() => handleRestoreOrder(selectedOrder)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircleIcon sx={{ fontSize: 20 }} /> Відновити замовлення
                        </button>
                      </>
                    )}

                    {selectedOrder.status === 'open' && isEditing && (
                      <>
                        <button 
                          onClick={handleSaveOrder}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircleIcon sx={{ fontSize: 20 }} /> Зберегти зміни
                        </button>
                        <button 
                          onClick={handleCancelEdit}
                          className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <CancelIcon sx={{ fontSize: 20 }} /> Скасувати
                        </button>
                      </>
                    )}

                    {selectedOrder.status === 'in_progress' && (
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2">
                        <MessageIcon sx={{ fontSize: 20 }} /> Чат з майстром
                      </button>
                    )}
                  </>
                )}

                {/* ADMIN ACTIONS */}
                {currentUser?.role === 'admin' && !isEditing && (
                  <>
                    <button
                      onClick={handleEditOrder}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <EditIcon sx={{ fontSize: 20 }} /> Редагувати
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(selectedOrder)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <CloseIcon sx={{ fontSize: 20 }} /> Видалити
                    </button>
                  </>
                )}

                {/* MASTER ACTIONS */}
                {currentUser?.role === 'master' && (
                  <>
                    {selectedOrder.status === 'proposed' && (
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                        📊 Переглянути пропозиції
                      </button>
                    )}

                    {selectedOrder.status === 'open' && (
                      <button
                        onClick={() => setShowProposalModal(true)}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors flex items-center justify-center gap-2">
                        <EditIcon sx={{ fontSize: 20 }} /> Розмістити пропозицію
                      </button>
                    )}

                    {selectedOrder.status === 'in_progress' && (
                      <>
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2">
                          <MessageIcon sx={{ fontSize: 20 }} /> Чат з клієнтом
                        </button>
                        <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors">
                          📸 Поділитися фото
                        </button>
                      </>
                    )}
                  </>
                )}

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 font-medium transition-colors"
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
              if (currentUser) {
                submitProposal(selectedOrder.id, proposalData.price, proposalData.description);
              }
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
