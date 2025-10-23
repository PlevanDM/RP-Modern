import { useState, useEffect, useMemo } from 'react';
import { Navigation } from './components/Navigation';
import { EnhancedDashboard } from './components/EnhancedDashboard';
import { Orders } from './components/Orders';
import { Portfolio } from './components/Portfolio';
import { Proposals } from './components/Proposals';
import { Reports } from './components/Reports';
import { PaymentMethods } from './components/PaymentMethods';
import { TransactionHistory } from './components/TransactionHistory';
import { MasterReports } from './components/MasterReports';
import { Messages } from './components/Messages';
import { Toast } from './components/common/Toast/Toast';
import { useToast } from './hooks/useToast';
import { mockUsers, mockOrders, mockPortfolio, mockProposals, mockMasterOrders } from './utils/mockData';
import { loadOrdersFromStorage, saveOrdersToStorage } from './utils/orderManager';
import { MastersList } from './components/features/master/MastersList';
import { PartsInventory } from './components/features/parts/PartsInventory';
import { MasterReviews } from './components/features/reviews/MasterReviews';
import { OrdersBoard, OrderItem } from './components/features/orders/OrdersBoard';
import { OrderDetail } from './components/features/orders/OrderDetail/OrderDetail';
import { PaymentManagement } from './components/PaymentManagement';
import { ProposalModal } from './components/ProposalModal';
import { DeviceCatalog } from './components/DeviceCatalog';
import { LandingPage } from './components/LandingPage';
import { User, Order, Proposal, PortfolioItem, EscrowTransaction } from './types/models';
import { Profile } from './components/Profile';
import { MasterDashboard } from './components/features/master/MasterDashboard/MasterDashboard';
import { ClientDashboard } from './components/features/client/ClientDashboard/ClientDashboard';
import { AdminDashboard } from './components/features/admin/AdminDashboard/AdminDashboard';
import { FinancialDashboard } from './components/features/finance/FinancialDashboard';
import { SettingsPanel } from './components/features/admin/SettingsPanel';
import { JarvisChat } from './components/features/ai/JarvisChat';
import { useProposalManagement } from './hooks/useProposalManagement';
// 🧪 Import database tests

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [showMasterPortfolio, setShowMasterPortfolio] = useState(false);
  const [selectedMasterPortfolio] = useState<PortfolioItem[]>(
    []
  );
  const [selectedChatMaster, setSelectedChatMaster] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [, setViewedOrders] = useState<Set<string>>(new Set());
  const {
    proposals,
    setProposals,
    createProposal,
    acceptProposal,
    rejectProposal,
  } = useProposalManagement(orders, setOrders, mockProposals);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedOrderForProposal, setSelectedOrderForProposal] =
    useState<Order | null>(null);

  const { toasts, success } = useToast();

  // 📋 INITIALIZATION: Load orders and proposals from localStorage on mount
  useEffect(() => {
    // Load current user from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setCurrentUser(userData);
        console.log('Loaded user from localStorage:', userData);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }

    const storedOrders = loadOrdersFromStorage();

    // If no stored orders, use initial mock data
    if (storedOrders.length === 0) {
      saveOrdersToStorage(mockOrders);
      setOrders(mockOrders);
    } else {
      setOrders(storedOrders);
    }

    // Load proposals from localStorage (use same key as orderManager)
    const savedProposals = localStorage.getItem('repairHubProposals');
    if (savedProposals) {
      setProposals(JSON.parse(savedProposals) as Proposal[]);
    }
  }, []);

  // 📋 LISTENER: Listen for storage changes to sync orders across components
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedOrders = loadOrdersFromStorage();
      setOrders(updatedOrders);
      console.log('Orders updated from storage change:', updatedOrders.length);
    };

    // Listen for storage events (for cross-tab sync)
    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events (for same-tab sync)
    window.addEventListener('ordersUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('ordersUpdated', handleStorageChange);
    };
  }, []);

  const masters = useMemo(() =>
    mockUsers.filter(user => user.role === 'master'), []
  );

  const handleLogin = (user: User | null) => {
    if (user) {
      setCurrentUser(user);
      setActiveItem('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveItem('login');
  };

  const handleLogoClick = () => {
    setActiveItem('dashboard');
  };

  const markOrderAsViewed = (orderId: string) => {
    setViewedOrders(prev => new Set([...prev, orderId]));
  };

  const getUnviewedOrdersCount = () => {
    if (currentUser?.role === 'master') {
      // Для мастера считаем открытые клиентские заказы
      const openOrders = orders.filter(order => order.status === 'open');
      return openOrders.length;
    } else if (currentUser?.role === 'client') {
      // Для клиента считаем заказы с предложениями
      const ordersWithProposals = orders.filter(order => 
        order.status === 'proposed' || order.status === 'awaiting_client_confirmation'
      );
      return ordersWithProposals.length;
    }
    return 0;
  };

  const handleCompleteWork = (orderId: string) => {
    // Обновляем статус заказа на 'awaiting_payment_confirmation' - мастер завершил работу, клиент должен подтвердить и оплатить
    const updatedOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'awaiting_payment_confirmation' as const, updatedAt: new Date() }
        : order
    );

    setOrders(updatedOrders);

    // Сохраняем в localStorage
    saveOrdersToStorage(updatedOrders);

    success('✅ Роботу завершено! Очікуємо підтвердження клієнта та оплати.');
  };

  const handleConfirmPayment = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Создаем эскроу транзакцию для оплаты мастеру
    const escrowTransaction: EscrowTransaction = {
      id: `escrow_${Date.now()}`,
      orderId: orderId,
      clientId: order.clientId,
      masterId: order.assignedMasterId || '',
      amount: order.agreedPrice || 0,
      status: 'escrowed',
      createdAt: new Date()
    };

    // Обновляем статус заказа на 'paid' и устанавливаем дату оплаты
    const updatedOrders = orders.map(o =>
      o.id === orderId
        ? {
            ...o,
            status: 'paid' as const,
            paymentStatus: 'released' as const,
            paymentDate: new Date(),
            releaseDate: new Date(),
            updatedAt: new Date()
          }
        : o
    );

    setOrders(updatedOrders);

    // Сохраняем эскроу транзакцию
    const existingEscrows = JSON.parse(
      localStorage.getItem('repairHubEscrows') || '[]'
    );
    existingEscrows.push(escrowTransaction);
    localStorage.setItem('repairHubEscrows', JSON.stringify(existingEscrows));

    // Сохраняем в localStorage
    saveOrdersToStorage(updatedOrders);

    success(`✅ Оплата підтверджена! ${order.agreedPrice} грн переведено майстру.`);
  };

  const toggleFavoriteMaster = (masterId: string) => {
    setFavorites(prev => 
      prev.includes(masterId) 
        ? prev.filter(id => id !== masterId)
        : [...prev, masterId]
    );
  };

  const sendOrderToMaster = (orderId: string, masterId: string) => {
    // Создаем предложение от мастера для заказа
    const master = mockUsers.find(u => u.id === masterId);
    if (!master) return;

    const newProposal: Proposal = {
      id: `proposal_${Date.now()}`,
      orderId,
      masterId,
      masterName: master.name,
      masterRating: master.rating,
      masterAvatar: master.avatar,
      price: 0, // Мастер сам предложит цену
      estimatedDays: 1,
      description: 'Запрос на рассмотрение заказа',
      status: 'pending',
      createdAt: new Date(),
      photos: []
    };

    setProposals([...proposals, newProposal]);
    success(`✅ Заказ отправлен мастеру ${master.name} на рассмотрение!`);
  };

  const createOrder = (orderData: Partial<Order>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      title: orderData.title || 'Нове замовлення',
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      clientId: currentUser?.id || '',
      clientName: currentUser?.name || '',
      urgency: 'low',
      description: '',
      deviceType: 'Other',
      issue: '',
      device: '',
      city: '',
      budget: 0,
      proposalCount: 0,
      paymentStatus: 'pending',
      paymentAmount: 0,
      paymentMethod: '',
      escrowId: '',
      paymentDate: new Date(),
      disputeStatus: 'none',
    };

    setOrders([...orders, newOrder]);
    success('✅ Замовлення успішно створено!');
  };

  const deleteOrder = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'deleted' as const, deletedAt: new Date() }
        : order
    );
    setOrders(updatedOrders);
    saveOrdersToStorage(updatedOrders);
    success('✅ Замовлення успішно видалено!');
  };

  const restoreOrder = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'open' as const, deletedAt: undefined }
        : order
    );
    setOrders(updatedOrders);
    saveOrdersToStorage(updatedOrders);
    success('✅ Замовлення успішно відновлено!');
  };

  const toggleActiveSearch = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, isActiveSearch: !order.isActiveSearch }
        : order
    );
    setOrders(updatedOrders);
    const order = orders.find(o => o.id === orderId);
    if (order) {
      success(`✅ ${order.isActiveSearch ? 'Пошук призупинено' : 'Пошук активовано'}!`);
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'open': 'Відкрито',
      'proposed': 'З пропозиціями',
      'accepted': 'Прийнято',
      'in_progress': 'В роботі',
      'completed': 'Завершено',
      'cancelled': 'Скасовано',
      'deleted': 'Видалено',
      'searching': 'Пошук майстра',
      'active_search': 'Активний пошук майстра'
    };
    return statusMap[status] || status;
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date() }
        : order
    );
    setOrders(updatedOrders);
    saveOrdersToStorage(updatedOrders);
    success(`✅ Статус замовлення змінено на "${getStatusText(newStatus)}"!`);
  };

  const editOrder = (orderId: string, updates: Partial<Order>) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            ...updates,
            updatedAt: new Date() 
          }
        : order
    );
    setOrders(updatedOrders);
    saveOrdersToStorage(updatedOrders);
    success('✅ Замовлення успішно оновлено!');
  };

  // Payment management functions
  const updatePayment = (orderId: string, paymentData: Partial<Order>) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, ...paymentData, updatedAt: new Date() }
        : order
    );
    setOrders(updatedOrders);
    success('✅ Платіж успішно оновлено!');
  };

  const releasePayment = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            paymentStatus: 'released' as const,
            releaseDate: new Date(),
            updatedAt: new Date() 
          }
        : order
    );
    setOrders(updatedOrders);
    success('✅ Кошти успішно виплачено майстру!');
  };

  const refundPayment = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            paymentStatus: 'refunded' as const,
            updatedAt: new Date() 
          }
        : order
    );
    setOrders(updatedOrders);
    success('✅ Кошти повернено клієнту!');
  };

  // Dispute management functions
  const createDispute = (orderId: string, reason: string, description: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            disputeStatus: 'open' as const,
            disputeReason: reason,
            disputeDescription: description,
            disputeCreatedAt: new Date(),
            supportTicketId: `TICKET-${Date.now()}`,
            updatedAt: new Date() 
          }
        : order
    );
    setOrders(updatedOrders);
    success('✅ Спір створено! Техпідтримка буде повідомлена.');
  };

  const escalateDispute = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            disputeStatus: 'escalated' as const,
            updatedAt: new Date() 
          }
        : order
    );
    setOrders(updatedOrders);
    success('✅ Спір ескаловано до техпідтримки!');
  };

  // Функция для закрытия всех модальных окон при смене раздела
  const handleNavigation = (item: string) => {
    setActiveItem(item);
    setSelectedOrder(null);
    setShowMasterPortfolio(false);
    setShowProposalModal(false);
    setSelectedOrderForProposal(null);
  };

  if (!currentUser) {
    return <LandingPage onLogin={() => handleLogin(JSON.parse(localStorage.getItem('currentUser') || 'null'))} />;
  }

  if (showMasterPortfolio) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Navigation
            currentUser={currentUser}
            activeItem={activeItem}
            onItemClick={handleNavigation}
            onLogout={handleLogout}
            onLogoClick={handleLogoClick}
            unviewedOrdersCount={getUnviewedOrdersCount()}
          />
          <div className="flex-1 p-6">
            <button
              onClick={() => setShowMasterPortfolio(false)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ← Назад до пошуку
            </button>
            <Portfolio
              portfolio={selectedMasterPortfolio}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex overflow-x-hidden">
      <Navigation
        currentUser={currentUser}
        activeItem={activeItem}
        onItemClick={handleNavigation}
        onLogout={handleLogout}
        onLogoClick={handleLogoClick}
        unviewedOrdersCount={getUnviewedOrdersCount()}
      />
        <div className="flex-1 p-3 lg:p-6 lg:ml-56 2xl:ml-64 overflow-y-auto overflow-x-hidden pt-20 lg:pt-6">
          {activeItem === 'dashboard' && (
            currentUser.role === 'master' ? (
              <MasterDashboard
                currentUser={currentUser}
                stats={{
                  activeOrders: orders.filter(o => o.status === 'in_progress').length,
                  completedOrders: orders.filter(o => o.status === 'completed' || o.status === 'paid').length,
                  totalEarned: 125000,
                  rating: currentUser.rating || 4.9,
                }}
              />
            ) : currentUser.role === 'client' ? (
              <ClientDashboard
                currentUser={currentUser}
                orders={orders.filter(o => o.clientId === currentUser.id)}
              />
            ) : currentUser.role === 'admin' ? (
              <AdminDashboard
                users={mockUsers}
                orders={orders}
                transactions={[]}
              />
            ) : (
              <EnhancedDashboard
                currentUser={currentUser}
                orders={orders}
                proposals={proposals}
                masters={masters}
                favoriteMasters={favorites}
                onSelectOrder={(order: Order) => {
                  console.log('Select order from dashboard:', order);
                  setSelectedOrder(order);
                }}
              />
            )
          )}

          {activeItem === 'finance' && (
            <FinancialDashboard
              orders={orders}
              transactions={[]}
            />
          )}

          {activeItem === 'settings' && currentUser?.role === 'admin' && (
            <SettingsPanel />
          )}

          {activeItem === 'payments' && currentUser && (
            <PaymentManagement
              currentUser={currentUser}
              orders={orders}
              onUpdatePayment={updatePayment}
              onReleasePayment={releasePayment}
              onRefundPayment={refundPayment}
              onCreateDispute={createDispute}
              onEscalateDispute={escalateDispute}
            />
          )}

          {activeItem === 'myOrders' && (
            <Orders
              currentUser={currentUser}
              orders={orders}
              onSendToMaster={sendOrderToMaster}
              onCreateOrder={createOrder}
              onDeleteOrder={deleteOrder}
              onRestoreOrder={restoreOrder}
              onToggleActiveSearch={toggleActiveSearch}
              onUpdateOrderStatus={updateOrderStatus}
              masters={masters}
              onEditOrder={editOrder}
            />
          )}

          {activeItem === 'inventory' && (
            <div className="p-8">
              <PartsInventory 
                userRole={currentUser?.role}
                onBuyPart={(part) => console.log('Buy part:', part)}
                onViewMaster={(masterId) => console.log('View master:', masterId)}
              />
            </div>
          )}

          {activeItem === 'portfolio' && (
            <Portfolio
              portfolio={mockPortfolio}
              currentUser={currentUser}
            />
          )}

          {activeItem === 'proposals' && (
            <Proposals
              currentUser={currentUser}
              proposals={(currentUser?.role === 'client'
                ? proposals.filter(proposal =>
                  orders.some(order => order.id === proposal.orderId && order.clientId === currentUser?.id)
                )
                : proposals.filter(proposal => proposal.masterId === currentUser?.id)
              ) as Proposal[]}
              orders={orders}
              isMaster={currentUser?.role === 'master'}
              onSubmitProposal={(orderId, price, description) => {
                createProposal({
                  orderId,
                  price,
                  description,
                  masterId: currentUser?.id || '',
                  masterName: currentUser?.name || '',
                  masterRating: currentUser?.rating || 0,
                  masterAvatar: currentUser?.avatar || '',
                  estimatedDays: 1,
                });
                setShowProposalModal(false);
                setSelectedOrderForProposal(null);
                success('✅ Пропозицію успішно відправлено!');
              }}
              onAcceptProposal={acceptProposal}
              onRejectProposal={rejectProposal}
              onShowToast={success}
            />
          )}

          {activeItem === 'priceComparison' && (
            <div className="p-8">
              <MastersList 
                masters={mockUsers.filter(u => u.role === 'master')}
                currentUserCity={currentUser?.city}
                onSelectMaster={(master) => {
                  console.log('Selected master:', master);
                  setSelectedChatMaster(master);
                  setActiveItem('messages');
                }}
                onContact={(master) => {
                  console.log('Contact master:', master);
                  setSelectedChatMaster(master);
                  setActiveItem('messages');
                }}
                onToggleFavorite={toggleFavoriteMaster}
                favoriteMasters={favorites}
              />
            </div>
          )}

          {activeItem === 'reports' && (
            <Reports
              currentUser={currentUser}
              orders={orders}
            />
          )}

          {activeItem === 'paymentMethods' && currentUser && (
            <PaymentMethods
              currentUser={currentUser}
            />
          )}

          {activeItem === 'transactionHistory' && currentUser && (
            <TransactionHistory
              currentUser={currentUser}
              transactions={[]}
            />
          )}

          {activeItem === 'masterReports' && (
            <MasterReports
              currentUser={currentUser}
              orders={orders}
            />
          )}

          {activeItem === 'messages' && currentUser && (
            <Messages
              selectedMaster={selectedChatMaster ?? undefined}
            />
          )}

          {activeItem === 'profile' && (
            <Profile
              currentUser={currentUser ?? undefined}
            />
          )}

          {activeItem === 'catalog' && (
            <DeviceCatalog currentUser={currentUser} />
          )}

          {activeItem === 'masters' && (
            <div className="p-8">
              <MastersList 
                masters={mockUsers.filter(u => u.role === 'master')}
                currentUserCity={currentUser?.city}
                onSelectMaster={(master) => {
                  console.log('Selected master:', master);
                  setSelectedChatMaster(master);
                  setActiveItem('messages');
                }}
                onContact={(master) => {
                  console.log('Contact master:', master);
                  setSelectedChatMaster(master);
                  setActiveItem('messages');
                }}
                onToggleFavorite={toggleFavoriteMaster}
                favoriteMasters={favorites}
              />
            </div>
          )}

          {activeItem === 'parts' && (
            <div className="p-8">
              <PartsInventory
                userRole={currentUser?.role}
                onBuyPart={(part) => console.log('Buy part:', part)}
                onViewMaster={(masterId) => console.log('View master:', masterId)}
              />
            </div>
          )}

          {activeItem === 'orders' &&
            (currentUser?.role === 'master' ||
              currentUser?.role === 'client') && (
              <div className="p-8">
                <OrdersBoard
                  orders={
                    (currentUser?.role === 'client'
                      ? orders.filter(
                          (order) => order.clientId === currentUser?.id
                        )
                      : orders.filter(
                          (order) =>
                            order.status === 'open' ||
                            order.status === 'awaiting_client_confirmation' ||
                            order.status === 'in_progress' ||
                            order.status === 'awaiting_payment_confirmation'
                        )
                    ).map((order: Order) => ({
                      id: order.id,
                      title: order.title,
                      clientName: order.clientName,
                      device: order.device,
                      issue: order.issue,
                      city: order.city,
                      status: order.status as OrderItem['status'],
                      urgency: order.urgency,
                      budget: order.budget,
                      proposalCount: order.proposalCount,
                      createdAt: order.createdAt,
                    }))
                  }
                  userRole={currentUser?.role}
                  onSelectOrder={(orderItem) => {
                    const order = orders.find((o) => o.id === orderItem.id);
                    if (order) {
                      setSelectedOrder(order);
                    }
                  }}
                  onMarkOrderAsViewed={markOrderAsViewed}
                  unviewedOrdersCount={getUnviewedOrdersCount()}
                  onSubmitProposal={(orderId) => {
                    const order =
                      currentUser?.role === 'service'
                        ? mockMasterOrders.find((o) => o.id === orderId)
                        : orders.find((o) => o.id === orderId);
                    if (order) {
                      setSelectedOrderForProposal(order);
                      setShowProposalModal(true);
                    }
                  }}
                  onCompleteWork={handleCompleteWork}
                  onConfirmPayment={handleConfirmPayment}
                />
              </div>
            )}

          {activeItem === 'reviews' && (
            <div className="p-8">
              <MasterReviews 
                masterId="master1"
                masterName="Alex Master"
                averageRating={4.9}
                totalReviews={127}
              />
            </div>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-6 right-6 z-50 space-y-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => {}}
            />
          </div>
        ))}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetail
          orderId={selectedOrder.id}
          orderTitle={selectedOrder.title}
          orderDescription={selectedOrder.issue}
          masterName={currentUser?.fullName || currentUser?.name}
          masterAvatar={currentUser?.avatar}
          status={selectedOrder.status}
          priority={selectedOrder.urgency}
          startDate={new Date(selectedOrder.createdAt).toLocaleDateString('uk-UA')}
          estimatedEndDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('uk-UA')}
          location={selectedOrder.city}
          photos={selectedOrder.devicePhotos || []}
          comments={[
            {
              author: 'Іван Петренко',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan',
              text: 'Чудове виконання роботи!',
              date: '2025-01-15'
            },
            {
              author: 'Марія Коваленко',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
              text: 'Все заслуговує похвали',
              date: '2025-01-16'
            }
          ]}
          chatMessages={[
            {
              sender: 'master',
              text: 'Добрий день! Я змогу розпочати роботу відразу.',
              time: '10:30'
            },
            {
              sender: 'client',
              text: 'Спасибі! Коли буде готово?',
              time: '10:32'
            },
            {
              sender: 'master',
              text: 'Приблизно за 2-3 дні. Залежить від складності.',
              time: '10:33'
            },
            {
              sender: 'client',
              text: 'Добре, чекаю на вас',
              time: '10:35'
            }
          ]}
          onBack={() => setSelectedOrder(null)}
        />
      )}

      {/* Proposal Modal */}
      {showProposalModal && selectedOrderForProposal && (
        <ProposalModal
          isOpen={showProposalModal}
          onClose={() => {
            setShowProposalModal(false);
            setSelectedOrderForProposal(null);
          }}
          orderId={selectedOrderForProposal.id}
          orderTitle={selectedOrderForProposal.title}
          clientName={selectedOrderForProposal.clientName}
          budget={selectedOrderForProposal.budget}
          onSubmit={(price, description) => {
            createProposal({
              orderId: selectedOrderForProposal.id,
              price,
              description,
              masterId: currentUser?.id || '',
              masterName: currentUser?.name || '',
              masterRating: currentUser?.rating || 0,
              masterAvatar: currentUser?.avatar || '',
              estimatedDays: 1,
            });
            setShowProposalModal(false);
            setSelectedOrderForProposal(null);
            success('✅ Пропозицію успішно відправлено!');
          }}
        />
      )}
      <JarvisChat />
    </div>
  );
}

export default App;
