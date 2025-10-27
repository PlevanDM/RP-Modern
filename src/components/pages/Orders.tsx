import { useState, useMemo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Search, Filter, ChevronDown, Package, User, Calendar, DollarSign, Clock, MessageCircle } from 'lucide-react';
import { Order, User as CurrentUser, Proposal } from '../../types/models';
import { CreateOrderModal } from '../CreateOrderModal';
import { ProposalModal } from '../ProposalModal';
import { OrderEditModal } from '../features/admin/OrderEditModal';
import { ConfirmationDialog } from '../features/admin/ConfirmationDialog';
import OrderDetails from './OrderDetails';

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
  acceptProposal?: (proposalId: string) => void;
  rejectProposal?: (proposalId: string) => void;
  setActiveItem?: (item: string) => void;
}

export function Orders({
  currentUser,
  orders = [],
  onSendToMaster,
  onCreateOrder,
  onDeleteOrder,
  onRestoreOrder,
  onToggleActiveSearch,
  onUpdateOrderStatus,
  masters = [],
  onEditOrder,
  onCreateProposal,
  acceptProposal,
  rejectProposal,
  setActiveItem,
}: OrdersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'price'>('date');
  const [showMasterSelection, setShowMasterSelection] = useState(false);
  const [selectedOrderForMaster, setSelectedOrderForMaster] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [_showEditModal, setShowEditModal] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredOrders = useMemo(() => {
    // Фільтруємо заказы: если клиент, то только его заказы; если мастер, то все
    let result = orders.filter(order => {
      // Если пользователь клиент, показываем только его заказы
      if (currentUser?.role === 'client') {
        return order?.clientId === currentUser?.id;
      }
      // Если администратор, показываем все заказы
      if (currentUser?.role === 'admin') {
        return true;
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
      setOrderToEdit(selectedOrder);
      setShowEditModal(true);
    }
  };

  const handleSaveEditOrder = async (editedOrder: Order) => {
    setIsLoading(true);
    try {
      if (onEditOrder) {
        onEditOrder(editedOrder.id, editedOrder);
      } else {
        const orders = JSON.parse(localStorage.getItem('repair_master_orders') || '[]');
        const updatedOrders = orders.map((o: Order) =>
          o.id === editedOrder.id ? editedOrder : o
        );
        localStorage.setItem('repair_master_orders', JSON.stringify(updatedOrders));
        window.dispatchEvent(new CustomEvent('ordersUpdated'));
      }
      setShowEditModal(false);
      setOrderToEdit(null);
      setSelectedOrder(null);
    } finally {
      setIsLoading(false);
    }
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
            <OrderDetails
              order={selectedOrder}
              currentUser={currentUser}
              handleEditOrder={handleEditOrder}
              handleSendToMaster={handleSendToMaster}
              handleToggleActiveSearch={handleToggleActiveSearch}
              handleDeleteOrder={handleDeleteOrder}
              handleRestoreOrder={handleRestoreOrder}
              setShowProposalModal={setShowProposalModal}
              acceptProposal={acceptProposal}
              rejectProposal={rejectProposal}
              setActiveItem={setActiveItem}
            />
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



      {/* Модальне вікно редагування замовлення */}
      {orderToEdit && (
        <OrderEditModal
          order={orderToEdit}
          onClose={() => {
            setShowEditModal(false);
            setOrderToEdit(null);
          }}
          onSave={handleSaveEditOrder}
          loading={isLoading}
        />
      )}

      {/* Модальне вікно підтвердження видалення */}
      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setOrderToDelete(null);
        }}
        onConfirm={confirmDeleteOrder}
        title="Видалити замовлення"
        description={orderToDelete ? `Ви впевнені, що хочете видалити замовлення "${orderToDelete.title}"?` : ''}
      />
    </div>
  );
}


