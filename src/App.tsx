import { useState, useEffect } from 'react';
import ModernNavigation from './components/layout/ModernNavigation';
import ModernLandingPage from './components/pages/ModernLandingPage';
import ModernMasterDashboard from './components/features/master/MasterDashboard/ModernMasterDashboard';
import ModernClientDashboard from './components/features/client/ClientDashboard/ModernClientDashboard';
import { MyDevices } from './components/features/client/MyDevices';
import { DeviceCatalog } from './components/pages/DeviceCatalog';
import { AdminDashboard } from './components/features/admin/AdminDashboard';
import { SettingsConfiguration } from './components/features/admin/SettingsConfiguration';
import { ModernUsersPanel } from './components/features/admin/ModernUsersPanel';
import { ModernFinancialPanel } from './components/features/admin/ModernFinancialPanel';
import { Orders } from './components/pages/Orders';
import { Portfolio } from './components/pages/Portfolio';
import { Messages } from './components/pages/Messages';
import { Profile } from './components/pages/Profile';
import { Settings } from './components/pages/Settings';
import { Proposals } from './components/pages/Proposals';
import { ReviewsPage } from './components/pages/ReviewsPage';
import { MastersList } from './components/features/master/MastersList';
import { PartsInventory } from './components/features/parts/PartsInventory';
import { PaymentManagement } from './components/pages/PaymentManagement';
import { useAuthStore } from './store/authStore';
import { useOrdersStore } from './store/ordersStore';
import { useNotificationsStore } from './store/notificationsStore';
import { NotificationCenter } from './components/NotificationCenter';
import { OnboardingWizard } from './components/OnboardingWizard';
import LanguageSwitcher from './components/LanguageSwitcher';
import { Order, User } from './types/models';
import { Notification } from './types';
import { ClientProfileStep } from './components/onboarding/ClientProfileStep';
import { DeviceStep } from './components/onboarding/DeviceStep';
import { OnboardingCompletionStep } from './components/onboarding/OnboardingCompletionStep';
import { SpecializationStep } from './components/onboarding/SpecializationStep';
import { ExperienceStep } from './components/onboarding/ExperienceStep';
import { ToolsStep } from './components/onboarding/ToolsStep';
import AnimatedMarquee from './components/AnimatedMarquee';
import { apiUserService } from './services/apiUserService';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const { currentUser, logout, isOnboardingCompleted, completeOnboarding } = useAuthStore();
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const {
    orders,
    acceptProposal,
    rejectProposal,
    updateOrderStatus,
    createOrder,
    deleteOrder,
    restoreOrder,
    toggleActiveSearch,
    sendToMaster,
    editOrder,
    updatePayment,
    releasePayment,
    refundPayment,
    createDispute,
    escalateDispute,
  } = useOrdersStore();
  const { notifications, readNotification, removeNotification } = useNotificationsStore();
  
  const handleNotificationClick = (notification: Notification) => {
    readNotification(notification.id);
  };

  // Обробник створення замовлення від Джарвіса
  const handleJarvisCreateOrder = (orderData: any) => {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      title: orderData.title,
      description: orderData.description,
      device: orderData.device,
      deviceType: orderData.deviceType,
      issue: orderData.issue,
      budget: orderData.budget,
      city: orderData.city,
      status: 'open',
      urgency: orderData.urgency,
      createdAt: new Date(),
      updatedAt: new Date(),
      clientId: orderData.clientId,
      clientName: orderData.clientName,
      proposalCount: 0,
      paymentStatus: 'pending',
      paymentAmount: 0,
      paymentMethod: '',
      escrowId: '',
      paymentDate: new Date(),
      disputeStatus: 'none'
    };

    createOrder(newOrder);
    
    // Переключаємося на сторінку замовлень
    setTimeout(() => {
      setActiveItem('myOrders');
    }, 500);
  };

  const [activeItem, setActiveItem] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await apiUserService.getUsers();
      setUsers(allUsers);
      
      // Initialize test data if needed
      const orders = JSON.parse(localStorage.getItem('repair_master_orders') || '[]');
      if (orders.length === 0) {
        const { initializeTestData } = require('./utils/testData');
        initializeTestData();
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  // Оптимізовано: оновлюємо час тільки кожну хвилину замість кожної секунди
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Оновлюємо тільки якщо змінилася хвилина
      setCurrentTime(prev => {
        if (prev.getMinutes() !== now.getMinutes()) {
          return now;
        }
        return prev;
      });
    };
    
    // Перше оновлення одразу
    updateTime();
    
    // Оновлення кожної хвилини
    const timer = setInterval(updateTime, 60000);
    
    return () => clearInterval(timer);
  }, []);

  if (!currentUser) {
    return <ModernLandingPage />;
  }

  if (!isOnboardingCompleted) {
    const handleOnboardingComplete = async (data: any) => {
      if (currentUser) {
        try {
          // Оновлюємо дані користувача в localStorage
          const users = JSON.parse(localStorage.getItem('app_users') || '[]');
          const userIndex = users.findIndex((u: User) => u.id === currentUser.id);
          
          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...data };
            localStorage.setItem('app_users', JSON.stringify(users));
          }
          
          completeOnboarding();
        } catch (error) {
          console.error('Error saving onboarding data:', error);
          completeOnboarding();
        }
      } else {
        completeOnboarding();
      }
    };

    const clientSteps = [
      <ClientProfileStep onComplete={handleOnboardingComplete} />,
      <DeviceStep onSkip={completeOnboarding} />,
      <OnboardingCompletionStep name={currentUser.name} />,
    ];

    const masterSteps = [
      <ClientProfileStep onComplete={handleOnboardingComplete} />,
      <SpecializationStep onComplete={handleOnboardingComplete} />,
      <ExperienceStep />,
      <ToolsStep />,
      <OnboardingCompletionStep name={currentUser.name} />,
    ];

    const steps = currentUser.role === 'client' ? clientSteps : masterSteps;

    return <OnboardingWizard steps={steps} onComplete={completeOnboarding} />;
  }

  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeUsers = Array.isArray(users) ? users : [];
  
  const clientOrders = safeOrders.filter((o) => o.clientId === currentUser.id);
  const masters = safeUsers.filter((u) => u.role === 'master');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <ModernNavigation
          currentUser={currentUser}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          unviewedOrdersCount={0}
          onLogout={logout}
          onCreateOrder={handleJarvisCreateOrder}
        />
        <div className="flex-1 md:ml-56 overflow-y-auto overflow-x-hidden h-screen">
          <div className="w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="text-right min-w-fit">
                <div className="text-xl font-bold text-gray-900 font-mono">
                  {currentTime.toLocaleTimeString('uk-UA', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  {currentTime.toLocaleDateString('uk-UA', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short'
                  })}
                </div>
              </div>

              <div className="flex-1 text-center relative">
                <AnimatedMarquee notifications={notifications} onNotificationClick={handleNotificationClick} />
              </div>

              <div className="flex items-center gap-2 min-w-fit">
                <NotificationCenter
                  notifications={notifications}
                  onRead={readNotification}
                  onRemove={removeNotification}
                />
                <LanguageSwitcher />
                <button
                  onClick={() => setActiveItem('profile')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Profile"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM6.5 18a3 3 0 00-3 3v1h15v-1a3 3 0 00-3-3H6.5z" />
                  </svg>
                </button>

                <button
                  onClick={() => setActiveItem('settings')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Settings"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>

                <button
                  onClick={logout}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title={t('common.logout')}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>

              </div>
            </div>
          </div>
          <div className="pl-2 pr-4 lg:pl-3 lg:pr-6 py-2 w-full">
            {activeItem === 'dashboard' &&
              (currentUser.role === 'master' ? (
                <ModernMasterDashboard
                  currentUser={currentUser}
                  stats={{
                    activeOrders: safeOrders.filter((o) => o.status === 'in_progress').length,
                    completedOrders: safeOrders.filter(
                      (o) => o.status === 'completed' || o.status === 'paid'
                    ).length,
                    totalEarned: 125000,
                    rating: currentUser.rating || 4.9,
                  }}
                  orders={safeOrders}
                  tasks={safeOrders.map((o) => ({
                    id: o.id,
                    title: o.title,
                    client: o.clientName || o.clientId,
                    status: o.status === 'in_progress' ? 'in-progress' : o.status === 'completed' ? 'completed' : 'pending' as 'pending' | 'in-progress' | 'completed',
                    priority: o.urgency,
                    deadline: o.deadline ? o.deadline.toISOString().split('T')[0] : '',
                    progress: 0, // Default progress since Order doesn't have this field
                  }))}
                  notifications={notifications}
                  revenueData={[
                    { month: 'Jan', value: 85 },
                    { month: 'Feb', value: 72 },
                    { month: 'Mar', value: 90 },
                    { month: 'Apr', value: 78 },
                    { month: 'May', value: 95 },
                    { month: 'Jun', value: 88 },
                  ]}
                  setActiveItem={setActiveItem}
                  setSelectedOrder={setSelectedOrder}
                />
              ) : currentUser.role === 'client' ? (
                <ModernClientDashboard
                  currentUser={currentUser}
                  orders={clientOrders}
                  notifications={notifications}
                  setActiveItem={setActiveItem}
                  createOrder={createOrder}
                  setSelectedOrder={setSelectedOrder}
                />
              ) : currentUser.role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <div className="text-center p-8">
                  <h1 className="text-2xl font-bold mb-4">Ласкаво просимо до RepairHub Pro!</h1>
                  <p className="text-gray-600">Оберіть роль для продовження роботи.</p>
                </div>
              ))}

            {activeItem === 'catalog' && <DeviceCatalog />}

            {activeItem === 'users' && currentUser?.role === 'admin' && <ModernUsersPanel />}

            {activeItem === 'finance' && currentUser?.role === 'admin' && <ModernFinancialPanel />}

            {activeItem === 'analytics' && currentUser?.role === 'admin' && (
              <div className="p-8">
                <AdminDashboard />
              </div>
            )}

            {activeItem === 'security' && currentUser?.role === 'admin' && (
              <div className="p-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-semibold mb-4">Безпека</h2>
                  <p className="text-gray-600">Налаштування безпеки та доступу</p>
                </div>
              </div>
            )}

            {activeItem === 'activity' && currentUser?.role === 'admin' && (
              <div className="p-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-semibold mb-4">Активність</h2>
                  <p className="text-gray-600">Моніторинг активності системи</p>
                </div>
              </div>
            )}

            {activeItem === 'database' && currentUser?.role === 'admin' && (
              <div className="p-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-semibold mb-4">База даних</h2>
                  <p className="text-gray-600">Управління базою даних</p>
                </div>
              </div>
            )}

            {activeItem === 'settings' && currentUser?.role === 'admin' && <SettingsConfiguration />}

            {activeItem === 'myOrders' && (
              <Orders
                currentUser={currentUser}
                orders={selectedOrder ? [selectedOrder] : safeOrders}
                onSendToMaster={sendToMaster}
                onCreateOrder={createOrder}
                onDeleteOrder={deleteOrder}
                onRestoreOrder={restoreOrder}
                onToggleActiveSearch={toggleActiveSearch}
                onUpdateOrderStatus={updateOrderStatus}
                masters={masters}
                onEditOrder={editOrder}
                onCreateProposal={() => {}}
                acceptProposal={acceptProposal}
                rejectProposal={rejectProposal}
                setActiveItem={setActiveItem}
              />
            )}

            {activeItem === 'myDevices' && <MyDevices />}

            {activeItem === 'partsInventory' && (
              <div className="p-8">
                <PartsInventory />
              </div>
            )}

            {activeItem === 'portfolio' && (
              <Portfolio portfolio={[]} currentUser={currentUser} />
            )}

            {activeItem === 'reviews' && (
              <ReviewsPage />
            )}

            {activeItem === 'priceComparison' && (
              <div className="p-8">
                <MastersList
                  masters={masters}
                  currentUserCity={currentUser?.city}
                />
              </div>
            )}

            {activeItem === 'payments' && currentUser && (
              <PaymentManagement
                currentUser={currentUser}
                orders={safeOrders}
                onUpdatePayment={updatePayment}
                onReleasePayment={releasePayment}
                onRefundPayment={refundPayment}
                onCreateDispute={createDispute}
                onEscalateDispute={escalateDispute}
              />
            )}

            {activeItem === 'messages' && (
              <Messages 
                currentUser={currentUser} 
                masters={masters} 
                orders={safeOrders}
              />
            )}

            {activeItem === 'proposals' && (
              <div className="p-6">
                <Proposals
                  proposals={useOrdersStore.getState().proposals.filter(p => 
                    currentUser.role === 'client' ? p.orderId : p.masterId === currentUser.id
                  )}
                  orders={safeOrders}
                  isMaster={currentUser.role === 'master'}
                  onSubmitProposal={useOrdersStore.getState().submitProposal}
                  onUpdateProposal={useOrdersStore.getState().updateProposal}
                  onAcceptProposal={useOrdersStore.getState().acceptProposal}
                  onRejectProposal={useOrdersStore.getState().rejectProposal}
                  onShowToast={(msg) => console.log(msg)}
                />
              </div>
            )}

            {activeItem === 'profile' && (
              <Profile
                currentUser={currentUser}
                orders={safeOrders}
              />
            )}
            {activeItem === 'settings' && <Settings currentUser={currentUser} onLogout={logout} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
