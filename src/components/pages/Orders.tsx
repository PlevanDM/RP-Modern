import { useState, useMemo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Search, Filter, ChevronDown, Package, User, Calendar, DollarSign, Clock, MessageCircle } from 'lucide-react';
import { Order, User as CurrentUser } from '../../types/models';
import { CreateOrderModal } from '../CreateOrderModal';
import { ProposalModal } from '../ProposalModal';
import { OrderEditModal } from '../features/admin/OrderEditModal';
import { ConfirmationDialog } from '../features/admin/ConfirmationDialog';
import { DisputeModal } from '../modals/DisputeModal';
import OrderDetails from './OrderDetails';
import { useTranslation } from 'react-i18next';
import { getClientAvailableActions } from '../../utils/orderPermissions';
import { FiltersBar } from '../common/FiltersBar';
import { useOrdersStore } from '../../store/ordersStore';
import { useUIStore } from '../../store/uiStore';

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
  const { t } = useTranslation();
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
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [orderForDispute, setOrderForDispute] = useState<Order | null>(null);
  
  const { releasePayment, createDispute } = useOrdersStore();

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
      // Если мастер, показываем только доступные заказы (открытые или назначенные ему)
      // и которые соответствуют его специализации (repairBrands, repairTypes)
      if (currentUser?.role === 'master') {
        const isAssignedToMe = order.assignedMasterId === currentUser?.id;
        
        // Если заказ назначен мастеру, всегда показываем
        if (isAssignedToMe) {
          return true;
        }
        
        // Если открыт (для предложений), проверяем соответствие специализации
        if (order.status === 'open') {
          // Проверяем соответствие бренда устройства с repairBrands мастера
          const brandMatches = !order.brand || !currentUser.repairBrands || 
            currentUser.repairBrands.length === 0 ||
            currentUser.repairBrands.some(brand => 
              order.brand?.toLowerCase().includes(brand.toLowerCase()) ||
              brand.toLowerCase().includes(order.brand?.toLowerCase() || '')
            );
          
          // Проверяем соответствие типа ремонта с repairTypes мастера
          const repairTypeMatches = !order.issue || !currentUser.repairTypes ||
            currentUser.repairTypes.length === 0 ||
            currentUser.repairTypes.some(type => 
              order.issue?.toLowerCase().includes(type.toLowerCase()) ||
              type.toLowerCase().includes(order.issue?.toLowerCase() || '')
            );
          
          return brandMatches && repairTypeMatches;
        }
        
        return false;
      }
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

  const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
      'open': '🟡',
      'proposed': '💬',
      'accepted': '✅',
      'in_progress': '🔧',
      'completed': '✔️',
      'cancelled': '🚫',
      'deleted': '🗑️',
      'searching': '🔍',
      'active_search': '🔍'
    };
    return icons[status] || '⚪';
  };

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

  const handleClientAction = (order: Order, actionId: string) => {
    switch (actionId) {
      case 'cancel':
        if (onUpdateOrderStatus) {
          onUpdateOrderStatus(order.id, 'cancelled');
          useUIStore.getState().showNotification('Замовлення скасовано');
        }
        break;
      case 'edit':
        setOrderToEdit(order);
        setShowEditModal(true);
        break;
      case 'create_payment':
        setActiveItem?.('payments');
        break;
      case 'release_payment':
        if (releasePayment) {
          releasePayment(order.id);
        }
        break;
      case 'create_dispute':
        setOrderForDispute(order);
        setShowDisputeModal(true);
        break;
      case 'create_review':
        setActiveItem?.('reviews');
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const handleDisputeSubmit = (reason: string, description: string) => {
    if (orderForDispute && createDispute) {
      createDispute(orderForDispute.id, reason, description);
    }
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

  const statuses = [
    { value: 'all', label: t('orders.allOrders') },
    { value: 'open', label: t('status.open') },
    { value: 'proposed', label: t('status.proposed') },
    { value: 'in_progress', label: t('status.in_progress') },
    { value: 'completed', label: t('status.completed') },
    { value: 'deleted', label: t('orders.deleted') }
  ];

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('navigation.orders')}</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none sm:max-w-xs relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-3.5 sm:h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.searchOrders')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base sm:text-sm min-h-[44px] sm:min-h-[36px]"
            />
          </div>
          {currentUser.role === 'client' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center justify-center gap-2 px-4 sm:px-3 py-2.5 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors text-base sm:text-sm font-medium min-h-[44px] sm:min-h-[36px]"
            >
              <AddIcon sx={{ fontSize: 22, fontSize: { xs: 22, sm: 20 } }} />
              <span className="hidden sm:inline">{t('common.createOrder')}</span>
              <span className="sm:hidden">{t('common.createOrder')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters & Sorting - Покращений UX */}
      <FiltersBar
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        statusOptions={statuses}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOptions={[
          { value: 'date', label: t('orders.sortByDate') },
          { value: 'price', label: t('orders.sortByPrice') }
        ]}
        resultsCount={filteredOrders.length}
        resultsLabel={t('orders.found')}
        onClearAll={() => {
          setStatusFilter('all');
          setSortBy('date');
        }}
        hasActiveFilters={statusFilter !== 'all'}
      />

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-xl border border-gray-100 px-4">
          <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-500 text-base sm:text-lg font-medium">{t('orders.notFound')}</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">{t('orders.tryFilters')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => {
            const isDeleted = order.status === 'deleted';
            return (
              <div 
                key={order.id} 
                onClick={() => setSelectedOrder(order)}
                className={`rounded-xl shadow-sm border transition-all p-4 sm:p-6 cursor-pointer ${
                  isDeleted 
                    ? 'bg-gray-50 border-gray-200 opacity-60' 
                    : 'bg-white border-gray-100 hover:shadow-md hover:border-indigo-200 active:bg-gray-50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base sm:text-lg font-bold break-words ${isDeleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {order.title}
                    </h3>
                    <p className={`text-sm sm:text-base mt-1 break-words ${isDeleted ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                      {order.deviceType} - {order.issue}
                    </p>
                    {isDeleted && order.deletedAt && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1">
                        {t('status.deletedAt')}: {new Date(order.deletedAt).toLocaleDateString('uk-UA')}
                      </p>
                    )}
                  </div>
                  {/* Status badge - not changeable by client */}
                  <div className={`px-3 py-1.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 border-0 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {t(`status.${order.status}`)}
                  </div>
                </div>

                {/* Client Actions */}
                {currentUser?.role === 'client' && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {(() => {
                      const availableActions = getClientAvailableActions(order, currentUser);
                      return availableActions
                        .filter(action => action.allowed)
                        .map(action => (
                          <button
                            key={action.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClientAction(order, action.id);
                            }}
                            className="px-3 py-2 sm:py-1.5 bg-blue-600 text-white text-sm sm:text-xs rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium min-h-[40px] sm:min-h-[28px] flex items-center justify-center gap-1"
                          >
                            {action.icon} {action.label}
                          </button>
                        ));
                    })()}
                  </div>
                )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 text-sm sm:text-base">
                {order.assignedMasterId && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate text-xs sm:text-sm">{t('orders.assignedMaster')}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-gray-400 shrink-0" />
                  <span className="text-xs sm:text-sm">{new Date(order.createdAt).toLocaleDateString('uk-UA')}</span>
                </div>

                {order.agreedPrice && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-gray-400 shrink-0" />
                    <span className="font-medium text-gray-900 text-xs sm:text-sm">${order.agreedPrice}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-gray-400 shrink-0" />
                  <span className="text-xs sm:text-sm">{getUrgencyBadge(order.urgency)}</span>
                </div>
              </div>

              {order.proposalCount > 0 && order.status === 'open' && (
                <div className="mt-4 flex items-center gap-2 p-2.5 sm:p-2 bg-purple-50 rounded-lg text-purple-700 text-sm">
                  <MessageCircle className="w-4 h-4 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm">{t('orders.hasProposals')}</p>
                </div>
              )}
            </div>
            );
          })}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 sm:p-4 overflow-x-hidden">
          <div className="bg-white rounded-xl sm:rounded-xl shadow-2xl max-w-3xl w-full h-full sm:h-auto sm:max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-indigo-600 text-white p-4 sm:p-6 flex justify-between items-center z-10">
              <h2 className="text-lg sm:text-2xl font-bold break-words pr-2">{selectedOrder.title}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white hover:bg-indigo-700 active:bg-indigo-800 rounded p-2 transition-colors shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center text-xl sm:text-2xl"
                aria-label="Close"
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
              <h3 className="text-lg font-semibold text-gray-900">{t('orders.selectMaster')}</h3>
              <button
                onClick={() => setShowMasterSelection(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <CloseIcon sx={{ fontSize: 24 }} />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              {t('orders.selectMasterDescription')}
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
        createOrder={(orderData) => {
          if (onCreateOrder) {
            onCreateOrder(orderData as Partial<Order>);
          }
        }}
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
        title={t('orders.deleteOrder')}
        description={orderToDelete ? t('orders.deleteConfirm', { title: orderToDelete.title }) : ''}
      />

      {/* Модальне вікно створення спору */}
      <DisputeModal
        isOpen={showDisputeModal}
        onClose={() => {
          setShowDisputeModal(false);
          setOrderForDispute(null);
        }}
        onSubmit={handleDisputeSubmit}
        orderTitle={orderForDispute?.title}
      />
    </div>
  );
}


