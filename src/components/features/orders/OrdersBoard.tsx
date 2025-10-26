export type { OrderItem };
import { useState, useMemo } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UKRAINIAN_CITIES } from '../../../utils/ukrainianCities';

interface OrderItem {
  id: string;
  title: string;
  clientName: string;
  device: string;
  deviceType: string;
  issue: string;
  city: string;
  status: 'open' | 'proposed' | 'in_progress' | 'completed' | 'awaiting_client_confirmation' | 'awaiting_payment_confirmation' | 'paid';
  urgency: 'low' | 'medium' | 'high';
  budget: number;
  proposalCount: number;
  createdAt: Date;
}

interface OrdersBoardProps {
  orders?: OrderItem[];
  userRole?: 'master' | 'client' | 'service';
  onSelectOrder?: (order: OrderItem) => void;
  onMarkOrderAsViewed?: (orderId: string) => void;
  unviewedOrdersCount?: number;
  onSubmitProposal?: (orderId: string) => void;
  onCompleteWork?: (orderId: string) => void;
  onConfirmPayment?: (orderId: string) => void;
  onEditOrder?: (order: OrderItem) => void;
  onDeleteOrder?: (orderId: string) => void;
}

// Mock дані замовлень
const generateMockOrders = (): OrderItem[] => {
  const devices = ['iPhone 15 Pro', 'Samsung Galaxy S24', 'Xiaomi Mi 14', 'iPad Air', 'MacBook Pro', 'Huawei P60', 'OnePlus 12', 'Google Pixel 8'];
  const deviceTypes = ['Смартфон', 'Планшет', 'Ноутбук'];
  const issues = [
    'Розбитий екран',
    'Швидка розрядка батареї',
    'Пошкодження від води',
    'Неробітна камера',
    'Проблема з портом',
  ];
  const cities = UKRAINIAN_CITIES.map(c => c.name);

  const orders: OrderItem[] = [];
  for (let i = 0; i < 20; i++) {
    const status = [
      'open',
      'proposed',
      'in_progress',
      'completed',
    ][Math.floor(Math.random() * 4)] as OrderItem['status'];
    const urgency = ['low', 'medium', 'high'][
      Math.floor(Math.random() * 3)
    ] as OrderItem['urgency'];

    orders.push({
      id: `order_${i}`,
      title: `${issues[Math.floor(Math.random() * issues.length)]} ${
        devices[Math.floor(Math.random() * devices.length)]
      }`,
      clientName: `Клієнт ${i + 1}`,
      device: devices[Math.floor(Math.random() * devices.length)],
      deviceType: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
      issue: issues[Math.floor(Math.random() * issues.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      status,
      urgency,
      budget: Math.floor(Math.random() * 5000) + 1000,
      proposalCount:
        status === 'open'
          ? 0
          : status === 'proposed'
            ? Math.floor(Math.random() * 5) + 1
            : Math.floor(Math.random() * 2),
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    });
  }

  return orders;
};

export const OrdersBoard: React.FC<OrdersBoardProps> = ({
  orders = generateMockOrders(),
  userRole = 'master',
  onSelectOrder,
  onMarkOrderAsViewed,
  unviewedOrdersCount = 0,
  onSubmitProposal,
  onCompleteWork,
  onConfirmPayment,
  onEditOrder,
  onDeleteOrder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'budget' | 'urgency'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderItem | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    deviceType: '',
    issue: '',
    budget: 0,
    urgency: 'medium' as const,
  });
  const [editFormErrors, setEditFormErrors] = useState({
    title: '',
    deviceType: '',
    issue: '',
    budget: '',
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<OrderItem | null>(null);

  const cities = useMemo(() => {
    const c = new Set(orders.map((o) => o.city));
    return Array.from(c).sort();
  }, [orders]);

  const statistics = useMemo(() => {
    return {
      total: orders.length,
      open: orders.filter((o) => o.status === 'open').length,
      proposed: orders.filter((o) => o.status === 'proposed').length,
      awaitingConfirmation: orders.filter((o) => o.status === 'awaiting_client_confirmation').length,
      inProgress: orders.filter((o) => o.status === 'in_progress').length,
      awaitingPayment: orders.filter((o) => o.status === 'awaiting_payment_confirmation').length,
      completed: orders.filter((o) => o.status === 'completed' || o.status === 'paid').length,
      totalBudget: orders.reduce((sum, o) => sum + (o.budget || 0), 0),
    };
  }, [orders]);

  const filteredAndSorted = useMemo(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        searchQuery === '' ||
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.clientName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === '' || order.status === selectedStatus;
      const matchesUrgency =
        selectedUrgency === '' || order.urgency === selectedUrgency;
      const matchesCity = selectedCity === '' || order.city === selectedCity;

      return matchesSearch && matchesStatus && matchesUrgency && matchesCity;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        const dateA = typeof a.createdAt === 'string' ? new Date(a.createdAt).getTime() : a.createdAt.getTime();
        const dateB = typeof b.createdAt === 'string' ? new Date(b.createdAt).getTime() : b.createdAt.getTime();
        return dateB - dateA;
      }
      if (sortBy === 'budget') return b.budget - a.budget;
      if (sortBy === 'urgency') {
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      }
      return 0;
    });

    return filtered;
  }, [orders, searchQuery, selectedStatus, selectedUrgency, selectedCity, sortBy]);

  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-blue-50 text-blue-700 border-blue-200',
      proposed: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      awaiting_client_confirmation: 'bg-orange-50 text-orange-700 border-orange-200',
      in_progress: 'bg-purple-50 text-purple-700 border-purple-200',
      awaiting_payment_confirmation: 'bg-amber-50 text-amber-700 border-amber-200',
      completed: 'bg-green-50 text-green-700 border-green-200',
      paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
    const labels = {
      open: 'Відкрито',
      proposed: 'З пропозиціями',
      awaiting_client_confirmation: 'Очікує підтвердження клієнта',
      in_progress: 'В роботі',
      awaiting_payment_confirmation: 'Очікує оплати',
      completed: 'Завершено',
      paid: 'Оплачено',
    };

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getUrgencyBadge = (urgency: 'low' | 'medium' | 'high') => {
    const styles: Record<typeof urgency, string> = {
      low: 'bg-green-50 text-green-700',
      medium: 'bg-yellow-50 text-yellow-700',
      high: 'bg-red-50 text-red-700',
    };
    const icons: Record<typeof urgency, string> = { low: '⬇️', medium: '→', high: '⬆️' };

    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${styles[urgency]}`}
      >
        <span>{icons[urgency]}</span>
        {urgency === 'low' ? 'Низька' : urgency === 'medium' ? 'Середня' : 'Висока'}
      </span>
    );
  };

  const handleEditClick = (order: OrderItem) => {
    setEditingOrder(order);
    setEditFormData({
      title: order.title,
      deviceType: order.deviceType,
      issue: order.issue,
      budget: order.budget,
      urgency: order.urgency,
    });
    setEditFormErrors({ title: '', deviceType: '', issue: '', budget: '' });
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    if (editingOrder) {
      const errors = {
        title: '',
        deviceType: '',
        issue: '',
        budget: '',
      };
      let isValid = true;

      if (!editFormData.title.trim()) {
        errors.title = "Назва замовлення не може бути порожньою.";
        isValid = false;
      }
      if (!editFormData.deviceType.trim()) {
        errors.deviceType = "Тип пристрою не може бути порожнім.";
        isValid = false;
      }
      if (!editFormData.issue.trim()) {
        errors.issue = "Проблема не може бути порожньою.";
        isValid = false;
      }
      if (editFormData.budget <= 0) {
        errors.budget = "Бюджет має бути позитивним числом.";
        isValid = false;
      }

      setEditFormErrors(errors);

      if (!isValid) {
        return;
      }

      onEditOrder?.({
        ...editingOrder,
        title: editFormData.title,
        deviceType: editFormData.deviceType,
        issue: editFormData.issue,
        budget: editFormData.budget,
        urgency: editFormData.urgency,
      });
      setShowEditModal(false);
      setEditingOrder(null);
      setIsFormDirty(false);
    }
  };

  const handleCancelEdit = () => {
    if (isFormDirty) {
      if (window.confirm("Ви впевнені, що хочете скасувати зміни?")) {
        setShowEditModal(false);
        setIsFormDirty(false);
      }
    } else {
      setShowEditModal(false);
    }
  };

  const handleDeleteClick = (order: OrderItem) => {
    setOrderToDelete(order);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      onDeleteOrder?.(orderToDelete.id);
      setShowDeleteConfirm(false);
      setOrderToDelete(null);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    setIsFormDirty(true);
  };

  return (
    <div className="w-full" data-testid="orders-board">
      {/* Заголовок */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold text-gray-900">Доска Замовлень</h1>
          {userRole === 'master' && unviewedOrdersCount > 0 && (
            <span className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full animate-pulse">
              {unviewedOrdersCount} нових
            </span>
          )}
        </div>
        <p className="text-lg text-gray-600">Всі доступні замовлення на ремонт Apple техніки</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2 md:gap-3 mb-8">
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <p className="text-2xl font-bold text-blue-900">{statistics.open}</p>
          <p className="text-xs text-blue-700 mt-1">Відкритих</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
          <p className="text-2xl font-bold text-yellow-900">{statistics.proposed}</p>
          <p className="text-xs text-yellow-700 mt-1">З пропозиціями</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
          <p className="text-2xl font-bold text-orange-900">{statistics.awaitingConfirmation}</p>
          <p className="text-xs text-orange-700 mt-1">Очікують підтвердження</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
          <p className="text-2xl font-bold text-purple-900">{statistics.inProgress}</p>
          <p className="text-xs text-purple-700 mt-1">В роботі</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
          <p className="text-2xl font-bold text-amber-900">{statistics.awaitingPayment}</p>
          <p className="text-xs text-amber-700 mt-1">Очікують оплати</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <p className="text-2xl font-bold text-green-900">{statistics.completed}</p>
          <p className="text-xs text-green-700 mt-1">Завершено</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
          <p className="text-2xl font-bold text-indigo-900">{statistics.total}</p>
          <p className="text-xs text-indigo-700 mt-1">Всього</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200">
          <p className="text-2xl font-bold text-orange-900">{(statistics.totalBudget / 1000).toFixed(0)}K</p>
          <p className="text-xs text-orange-700 mt-1">Бюджет</p>
        </div>
      </div>

      {/* Пошук та фільтри */}
      <div className="mb-8 space-y-2 md:space-y-4">
        {/* Основний пошук */}
        <div className="relative">
          <input
            type="text"
            placeholder="Пошук замовлень..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2 md:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm md:text-base"
          />
        </div>

        {/* Кнопки керування */}
        <div className="flex items-center gap-1 md:gap-2 flex-wrap">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-2 md:px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm"
          >
            <FilterListIcon className="text-gray-600" sx={{ fontSize: 18 }} />
            <span className="font-medium text-gray-700">Фільтри</span>
          </button>

          <div className="flex items-center gap-1 md:gap-2 flex-wrap">
            <label className="text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">
              Сортування:
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'newest' | 'budget' | 'urgency')
              }
              className="px-2 md:px-3 py-1 md:py-2 border border-gray-200 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Новіші</option>
              <option value="budget">По бюджету</option>
              <option value="urgency">По терміновості</option>
            </select>
          </div>

          {(searchQuery || selectedStatus || selectedUrgency || selectedCity) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('');
                setSelectedUrgency('');
                setSelectedCity('');
              }}
              className="flex items-center gap-1 px-2 py-1 text-xs md:text-sm text-gray-600 hover:text-gray-900"
            >
              <CloseIcon sx={{ fontSize: 18 }} />
              <span className="hidden md:inline">Очистити</span>
            </button>
          )}
        </div>

        {/* Панель фільтрів */}
        {showFilters && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Статус */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
              <div className="space-y-2">
                {['', 'open', 'proposed', 'awaiting_client_confirmation', 'in_progress', 'completed'].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={selectedStatus === status}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">
                      {status === ''
                        ? 'Всі'
                        : status === 'open'
                          ? 'Відкрито'
                          : status === 'proposed'
                            ? 'З пропозиціями'
                            : status === 'awaiting_client_confirmation'
                              ? 'Очікують підтвердження'
                              : status === 'in_progress'
                                ? 'В роботі'
                                : 'Завершено'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Срочність */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Срочність</label>
              <div className="space-y-2">
                {['', 'low', 'medium', 'high'].map((urgency) => (
                  <label key={urgency} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      value={urgency}
                      checked={selectedUrgency === urgency}
                      onChange={(e) => setSelectedUrgency(e.target.value)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">
                      {urgency === '' ? 'Всі' : urgency === 'low' ? 'Низька' : urgency === 'medium' ? 'Середня' : 'Висока'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Місто */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Місто</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="">Всі міста</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Список замовлень */}
      <div className="space-y-3">
        {filteredAndSorted.map((order) => (
          <div
            key={order.id}
            onClick={() => {
              onSelectOrder?.(order);
              if (userRole === 'master' && order.status === 'open' && onMarkOrderAsViewed) {
                onMarkOrderAsViewed(order.id);
              }
            }}
            className={`bg-white border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer ${
              userRole === 'master' && order.status === 'open' && !onMarkOrderAsViewed ? 'bg-blue-50 border-blue-300' : 
              order.status === 'awaiting_client_confirmation' ? 'bg-orange-50 border-orange-300 shadow-md' : ''
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4">
              {/* Інформація про замовлення */}
              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-900 mb-1">{order.title}</h3>
                <p className="text-sm text-gray-600 mb-2">від {order.clientName}</p>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                    <LocationOnIcon sx={{ fontSize: 14 }} />
                    {order.city}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                    <AccessTimeIcon sx={{ fontSize: 14 }} />
                    {(() => {
                      const now = Date.now();
                      const created = typeof order.createdAt === 'string' ? new Date(order.createdAt).getTime() : order.createdAt.getTime();
                      const diffMs = now - created;
                      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                      const diffDays = Math.floor(diffHours / 24);
                      
                      if (diffDays > 0) {
                        return `${diffDays} дн. тому`;
                      } else if (diffHours > 0) {
                        return `${diffHours} год. тому`;
                      } else {
                        const diffMinutes = Math.floor(diffMs / (1000 * 60));
                        return diffMinutes > 0 ? `${diffMinutes} хв. тому` : 'Щойно';
                      }
                    })()}
                  </span>
                </div>
              </div>

              {/* Статус та Срочність */}
              <div className="flex flex-col justify-center gap-2">
                <div>{getStatusBadge(order.status)}</div>
                <div>{getUrgencyBadge(order.urgency)}</div>
              </div>

              {/* Бюджет та Пропозиції */}
              <div className="text-right">
                <p className="text-lg font-bold text-indigo-600">{(order.budget || 0).toLocaleString('uk-UA')} грн</p>
                {order.status === 'proposed' && (
                  <p className="text-sm text-yellow-700 font-medium">{order.proposalCount} пропозицій</p>
                )}
              </div>

              {/* Кнопки */}
              <div className="flex items-center justify-end gap-1 md:gap-2 flex-wrap">
                {userRole === 'master' && order.status === 'open' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSubmitProposal?.(order.id);
                    }}
                    className="px-2 md:px-4 py-2 bg-green-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                  >
                    Пропозиція
                  </button>
                )}

                {/* Кнопка подтверждения оплаты клиентом */}
                {userRole === 'client' && order.status === 'awaiting_payment_confirmation' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onConfirmPayment?.(order.id);
                    }}
                    className="px-2 md:px-4 py-2 bg-emerald-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
                  >
                    Оплатити
                  </button>
                )}
                {userRole === 'master' && order.status === 'in_progress' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCompleteWork?.(order.id);
                    }}
                    className="px-2 md:px-4 py-2 bg-purple-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
                  >
                    Завершити
                  </button>
                )}

                {/* Кнопки редактирования и удаления для клиентов */}
                {userRole === 'client' && order.status === 'open' && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(order);
                      }}
                      className="p-1.5 md:p-2 md:px-3 bg-blue-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 md:gap-2"
                      title="Редагувати замовлення"
                    >
                      <EditIcon sx={{ fontSize: 16 }} />
                      <span className="hidden md:inline">Редагувати</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(order);
                      }}
                      className="p-1.5 md:p-2 md:px-3 bg-red-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1 md:gap-2"
                      title="Видалити замовлення"
                    >
                      <DeleteIcon sx={{ fontSize: 16 }} />
                      <span className="hidden md:inline">Видалити</span>
                    </button>
                  </>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectOrder?.(order);
                    if (userRole === 'master' && order.status === 'open' && onMarkOrderAsViewed) {
                      onMarkOrderAsViewed(order.id);
                    }
                  }}
                  className="px-2 md:px-4 py-2 bg-indigo-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
                >
                  Переглянути
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <ErrorOutlineIcon sx={{ fontSize: 48 }} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Замовлень не знайдено</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('');
              setSelectedUrgency('');
              setSelectedCity('');
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Очистити фільтри
          </button>
        </div>
      )}

      {/* Edit Order Modal */}
      {showEditModal && editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4 overflow-x-hidden">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-blue-600 text-white p-4 md:p-6 flex justify-between items-center rounded-t-lg">
              <h2 className="text-lg md:text-xl font-bold">Редагувати замовлення</h2>
              <button
                onClick={handleCancelEdit}
                className="text-white hover:bg-blue-700 rounded p-1 transition-colors"
              >
                <CloseIcon sx={{ fontSize: 24 }} />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Назва замовлення</label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                {editFormErrors.title && <p className="text-red-500 text-xs mt-1">{editFormErrors.title}</p>}
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Тип пристрою</label>
                <input
                  type="text"
                  name="deviceType"
                  value={editFormData.deviceType}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                {editFormErrors.deviceType && <p className="text-red-500 text-xs mt-1">{editFormErrors.deviceType}</p>}
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Проблема</label>
                <input
                  type="text"
                  name="issue"
                  value={editFormData.issue}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                {editFormErrors.issue && <p className="text-red-500 text-xs mt-1">{editFormErrors.issue}</p>}
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Бюджет (грн)</label>
                <input
                  type="number"
                  name="budget"
                  value={editFormData.budget}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                {editFormErrors.budget && <p className="text-red-500 text-xs mt-1">{editFormErrors.budget}</p>}
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Терміновість</label>
                <select
                  name="urgency"
                  value={editFormData.urgency}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="low">🟢 Не терміно</option>
                  <option value="medium">🟡 Звичайно</option>
                  <option value="high">🔴 Терміно</option>
                </select>
              </div>

              <div className="flex gap-2 md:gap-3 pt-2 md:pt-4">
                <button
                  onClick={handleEditSave}
                  className="flex-1 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors text-sm"
                >
                  Зберегти
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 px-3 md:px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 font-medium transition-colors text-sm"
                >
                  Скасувати
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4 overflow-x-hidden">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-red-600 text-white p-4 md:p-6 flex justify-between items-center rounded-t-lg">
              <h2 className="text-lg md:text-xl font-bold">Видалити замовлення?</h2>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-white hover:bg-red-700 rounded p-1 transition-colors"
              >
                <CloseIcon sx={{ fontSize: 24 }} />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <p className="text-gray-700 text-sm md:text-base">Ви впевнені, що хочете видалити це замовлення?</p>
              
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{orderToDelete.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{orderToDelete.device} - {orderToDelete.issue}</p>
                <p className="text-xs md:text-sm text-gray-600 mt-2">Бюджет: <span className="font-semibold">{orderToDelete.budget.toLocaleString('uk-UA')} грн</span></p>
              </div>

              <p className="text-xs md:text-sm text-gray-500">Це замовлення можна буде відновити пізніше.</p>

              <div className="flex gap-2 md:gap-3 pt-2 md:pt-4">
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-3 md:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors text-sm"
                >
                  Видалити
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-3 md:px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 font-medium transition-colors text-sm"
                >
                  Скасувати
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
