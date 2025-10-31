import { useState, useEffect } from 'react';
import ModernNavigation from './components/layout/ModernNavigation';
import ModernLandingPage from './components/pages/ModernLandingPage';
import ModernMasterDashboard from './components/features/master/MasterDashboard/ModernMasterDashboard';
import ModernClientDashboard from './components/features/client/ClientDashboard/ModernClientDashboard';
import { MyDevices } from './components/features/client/MyDevices';
import { DeviceCatalog } from './components/features/client/DeviceCatalog';
import { AdminDashboard } from './components/features/admin/AdminDashboard';
import SuperadminDashboard from './components/features/superadmin/SuperadminDashboard';
import { SettingsConfiguration } from './components/features/admin/SettingsConfiguration';
import { ModernUsersPanel } from './components/features/admin/ModernUsersPanel';
import { ModernFinancialPanel } from './components/features/admin/ModernFinancialPanel';
import { Orders } from './components/pages/Orders';
// import { Portfolio } from './components/pages/Portfolio';
// import { Messages } from './components/pages/Messages';
import { MessagesNew } from './components/pages/MessagesNew';
import { Reports } from './components/Reports';
import { Profile } from './components/pages/Profile';
import { Settings } from './components/pages/Settings';
import { Proposals } from './components/pages/Proposals';
import { ReviewsPage } from './components/pages/ReviewsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { MastersList } from './components/features/master/MastersList';
import { PartsInventory } from './components/features/parts/PartsInventory';
import { PaymentManagement } from './components/pages/PaymentManagement';
import PortfolioPage from './components/features/master/portfolio/PortfolioPage';
import { MasterOrdersBoard } from './components/features/master/MasterOrdersBoard/MasterOrdersBoard';
// import { MasterInventory } from './components/MasterInventory';
import MasterPartsMarketplace from './components/features/master/MasterPartsMarketplace';
import { MasterSupportPanel } from './components/features/master/MasterSupportPanel';
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
import { MobileMenuButtonInHeader } from './components/layout/MobileMenuButtonInHeader';
import { useAutoRefresh } from './hooks/useAutoRefresh';

function App() {
  const { t, i18n } = useTranslation();
  const { currentUser, logout, isOnboardingCompleted, completeOnboarding } = useAuthStore();
  
  // Check if we're on privacy page
  const [isPrivacyPage, setIsPrivacyPage] = useState(window.location.pathname === '/privacy');
  
  useEffect(() => {
    const handleLocationChange = () => {
      setIsPrivacyPage(window.location.pathname === '/privacy');
    };
    
    window.addEventListener('popstate', handleLocationChange);
    // Check on mount and after navigation
    handleLocationChange();
    
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [, forceUpdate] = useState({});

  // Обробка зміни мови без перезавантаження - покращена версія
  useEffect(() => {
    const handleLanguageChange = () => {
      // Форсуємо перерендер всіх компонентів
      forceUpdate({});
      // Додатково оновлюємо i18n для синхронізації
      i18n.emit('languageChanged');
    };
    
    const handleLanguageUpdated = (_event: CustomEvent) => {
      // Додаткова синхронізація після зміни мови
      forceUpdate({});
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    document.addEventListener('language-updated', handleLanguageUpdated as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      document.removeEventListener('language-updated', handleLanguageUpdated as EventListener);
    };
  }, [i18n]);
  
  const {
    orders,
    createOrder,
    updatePayment,
    releasePayment,
    refundPayment,
    createDispute,
    escalateDispute,
    fetchOrders,
  } = useOrdersStore();
  const { notifications, readNotification } = useNotificationsStore();
  
  const handleNotificationClick = (notification: Notification) => {
    readNotification(notification.id);
  };

  // Обробник створення замовлення від Джарвіса
  const handleCreateOrder = (orderData: {
    title: string;
    description: string;
    device: string;
    deviceType: string;
    issue: string;
    budget: number;
    urgency?: 'low' | 'medium' | 'high';
    location?: string;
  }) => {
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
  
  // Debug: логування зміни activeItem
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('ActiveItem changed to:', activeItem);
    }
  }, [activeItem]);
  const [_selectedOrder, _setSelectedOrder] = useState<Order | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const { fetchNotifications } = useNotificationsStore();

  // Автооновлення замовлень кожні 10 секунд
  useAutoRefresh({
    enabled: !!currentUser && (currentUser.role === 'client' || currentUser.role === 'master'),
    interval: 15000, // 15 секунд (зменшено частоту для зменшення навантаження)
    onRefresh: async () => {
      try {
        // Спочатку оновлюємо замовлення (критичні дані)
        await fetchOrders();
        
        // Повідомлення оновлюємо окремо з обробкою помилок
        // щоб помилки не ламали основний функціонал
        try {
          await fetchNotifications();
        } catch {
          // Ігноруємо помилки повідомлень - вони не критичні
          if (import.meta.env.DEV) {
            console.debug('Notifications refresh failed (non-critical)');
          }
        }
      } catch (error) {
        // Критичні помилки логуються
        console.error('Auto-refresh error:', error);
      }
    },
    dependencies: [currentUser?.id],
  });

  useEffect(() => {
    if (currentUser) {
      fetchNotifications();
      fetchOrders();
    }
    const fetchUsers = async () => {
      try {
        const allUsers = await apiUserService.getUsers();
        setUsers(allUsers);
        
        // Initialize test data if needed
        const orders = JSON.parse(localStorage.getItem('repair_master_orders') || '[]');
        if (orders.length === 0) {
          const { initializeTestData } = await import('./utils/testData');
          initializeTestData();
        }
      } catch (error: unknown) {
        // Тиха обробка помилок - не ламаємо рендеринг
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn('Failed to fetch users (non-critical):', errorMessage);
        // Якщо не вдалося завантажити, залишаємо порожній масив
        setUsers([]);
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser, fetchOrders, fetchNotifications]);

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

  // Автоматично завершуємо onboarding для майстра, якщо всі дані вже заповнені
  useEffect(() => {
    if (!isOnboardingCompleted && currentUser && currentUser.role === 'master' && 
        currentUser.name && 
        currentUser.city && 
        currentUser.phone && 
        currentUser.workLocation && 
        currentUser.repairBrands && 
        currentUser.repairBrands.length > 0 && 
        currentUser.repairTypes && 
        currentUser.repairTypes.length > 0 && 
        currentUser.workExperience !== undefined) {
      // Майстер вже заповнив всі дані під час реєстрації - автоматично завершуємо onboarding
      completeOnboarding();
    }
  }, [currentUser, isOnboardingCompleted, completeOnboarding]);

  if (!currentUser) {
    return <ModernLandingPage />;
  }

  if (!isOnboardingCompleted) {

    const handleOnboardingComplete = async (data: {
      name?: string;
      city?: string;
      phone?: string;
      specialization?: string[];
      serviceAreas?: string[];
      repairBrands?: string[];
      repairTypes?: string[];
    }) => {
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

    // Для майстра не показуємо ClientProfileStep, якщо дані вже є
    const masterHasBasicData = currentUser.name && currentUser.city && currentUser.phone;
    const masterSteps = masterHasBasicData ? [
      <SpecializationStep onComplete={handleOnboardingComplete} />,
      <ExperienceStep />,
      <ToolsStep />,
      <OnboardingCompletionStep name={currentUser.name} />,
    ] : [
      <ClientProfileStep onComplete={handleOnboardingComplete} />,
      <SpecializationStep onComplete={handleOnboardingComplete} />,
      <ExperienceStep />,
      <ToolsStep />,
      <OnboardingCompletionStep name={currentUser.name} />,
    ];

    const steps = currentUser.role === 'client' ? clientSteps : masterSteps;

    return <OnboardingWizard steps={steps} onComplete={completeOnboarding} />;
  }

  // Show privacy page if on /privacy route
  if (isPrivacyPage) {
    return <PrivacyPage />;
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
          onCreateOrder={handleCreateOrder}
        />
        <div className="flex-1 md:ml-56 overflow-y-auto overflow-x-hidden h-screen relative">
          <div className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-[150] md:z-[100]">
            <div className="flex justify-between items-center px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 gap-1 sm:gap-2">
              <div className="flex items-center gap-1 sm:gap-2 min-w-fit shrink-0">
                <MobileMenuButtonInHeader />
              </div>
              <div className="text-right min-w-fit shrink-0">
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 font-mono leading-tight">
                  {currentTime.toLocaleTimeString('uk-UA', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-0.5">
                  {currentTime.toLocaleDateString(i18n.language === 'uk' ? 'uk-UA' : i18n.language === 'ru' ? 'ru-RU' : i18n.language === 'pl' ? 'pl-PL' : i18n.language === 'ro' ? 'ro-RO' : 'en-US', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short'
                  })}
                </div>
              </div>

              <div className="flex-1 text-center relative hidden sm:block min-w-0 mx-2">
                <AnimatedMarquee notifications={notifications} onNotificationClick={handleNotificationClick} />
              </div>

              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 min-w-fit shrink-0">
                <NotificationCenter />
                <LanguageSwitcher />
                <button
                  onClick={() => setActiveItem('profile')}
                  className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg sm:rounded-xl transition-all min-h-[40px] min-w-[40px] sm:min-h-[36px] sm:min-w-[36px] flex items-center justify-center shrink-0"
                  title={t('navigation.profile')}
                >
                  <svg className="w-5 h-5 sm:w-4 sm:h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM6.5 18a3 3 0 00-3 3v1h15v-1a3 3 0 00-3-3H6.5z" />
                  </svg>
                </button>

                <button
                  onClick={() => setActiveItem('settings')}
                  className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg sm:rounded-xl transition-all min-h-[40px] min-w-[40px] sm:min-h-[36px] sm:min-w-[36px] flex items-center justify-center shrink-0 hidden sm:flex"
                  title={t('navigation.settings')}
                >
                  <svg className="w-5 h-5 sm:w-4 sm:h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>

                <button
                  onClick={logout}
                  className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg sm:rounded-xl transition-all text-gray-700 min-h-[40px] min-w-[40px] sm:min-h-[36px] sm:min-w-[36px] flex items-center justify-center shrink-0"
                  title={t('common.logout')}
                >
                  <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              ) : currentUser.role === 'superadmin' ? (
                <SuperadminDashboard />
              ) : (
                <div className="text-center p-8">
                  <h1 className="text-2xl font-bold mb-4">Ласкаво просимо до RepairHub Pro!</h1>
                  <p className="text-gray-600">Оберіть роль для продовження роботи.</p>
                </div>
              ))}

            {activeItem === 'catalog' && <DeviceCatalog onCreateOrder={handleCreateOrder} />}

            {activeItem === 'users' && (currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && <ModernUsersPanel />}

            {activeItem === 'finance' && (currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && <ModernFinancialPanel />}

            {activeItem === 'analytics' && (currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && (
              <div className="p-8">
                <AdminDashboard />
              </div>
            )}

            {activeItem === 'security' && (currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && (
              <div className="p-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-semibold mb-4">Безпека</h2>
                  <p className="text-gray-600">Налаштування безпеки та доступу</p>
                </div>
              </div>
            )}

            {activeItem === 'activity' && (currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && (
              <div className="p-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-semibold mb-4">Активність</h2>
                  <p className="text-gray-600">Моніторинг активності системи</p>
                </div>
              </div>
            )}

            {activeItem === 'database' && (currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && (
              <div className="p-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-semibold mb-4">База даних</h2>
                  <p className="text-gray-600">Управління базою даних</p>
                </div>
              </div>
            )}

            {activeItem === 'settings' && (currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && <SettingsConfiguration />}

            {activeItem === 'myOrders' && (
              currentUser?.role === 'master' ? (
                <MasterOrdersBoard />
              ) : (
                <Orders
                  currentUser={currentUser}
                  masters={masters}
                />
              )
            )}

            {activeItem === 'myDevices' && <MyDevices />}

            {activeItem === 'inventory' && (
              <MasterPartsMarketplace />
            )}

            {activeItem === 'partsInventory' && (
              <div className="p-8">
                <PartsInventory />
              </div>
            )}

            {activeItem === 'portfolio' && (
              <React.Suspense fallback={<div className="p-8"><div className="animate-pulse">Завантаження портфоліо...</div></div>}>
                <PortfolioPage />
              </React.Suspense>
            )}

            {activeItem === 'reviews' && (
              <React.Suspense fallback={<div className="p-8"><div className="animate-pulse">Завантаження рейтингів...</div></div>}>
                <ReviewsPage />
              </React.Suspense>
            )}

            {activeItem === 'reports' && currentUser?.role === 'master' && (
              <React.Suspense fallback={<div className="p-8"><div className="animate-pulse">Завантаження звітів...</div></div>}>
                <Reports currentUser={currentUser} orders={safeOrders} />
              </React.Suspense>
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
              <React.Suspense fallback={<div className="p-8"><div className="animate-pulse">Завантаження повідомлень...</div></div>}>
                <MessagesNew 
                  currentUser={currentUser} 
                  masters={masters} 
                  orders={safeOrders}
                />
              </React.Suspense>
            )}

            {activeItem === 'masterSupport' && currentUser?.role === 'master' && (
              <MasterSupportPanel />
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
