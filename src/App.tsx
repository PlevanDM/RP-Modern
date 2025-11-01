import React, { useState, useEffect, Suspense } from 'react';
import ModernNavigation from './components/layout/ModernNavigation';
import ModernLandingPage from './components/pages/ModernLandingPage';
// const ModernMasterDashboard = React.lazy(() => import('./components/features/master/MasterDashboard/ModernMasterDashboard'));
import { EnhancedMasterDashboard } from './components/features/master/EnhancedMasterDashboard';
import { EnhancedOrdersBoard } from './components/features/master/EnhancedOrdersBoard';
const ModernClientDashboard = React.lazy(() => import('./components/features/client/ClientDashboard/ModernClientDashboard'));
import { MyDevices } from './components/features/client/MyDevices';
import { DeviceCatalog } from './components/features/client/DeviceCatalog';
const AdminDashboard = React.lazy(() => import('./components/features/admin/AdminDashboard'));
const SuperadminDashboard = React.lazy(() => import('./components/features/superadmin/SuperadminDashboard'));
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
// import MasterPartsMarketplace from './components/features/master/MasterPartsMarketplace';
import { SparePartsMarketplace } from './components/features/marketplace/SparePartsMarketplace';
// import { SellerDashboard } from './components/features/marketplace/SellerDashboard';
import { EnhancedSellerDashboard } from './components/features/marketplace/EnhancedSellerDashboard';
// import { ExchangeManager } from './components/features/marketplace/ExchangeManager';
import { EnhancedExchangeManager } from './components/features/marketplace/EnhancedExchangeManager';
import { MasterSupportPanel } from './components/features/master/MasterSupportPanel';
import { useAuthStore } from './store/authStore';
import { useOrdersStore } from './store/ordersStore';
import { useNotificationsStore } from './store/notificationsStore';
import { NotificationCenter } from './components/NotificationCenter';
import { OnboardingWizard } from './components/OnboardingWizard';
import LanguageSwitcher from './components/LanguageSwitcher';
import { Order, User, Notification } from './types/models';
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
import { EnhancedNavbarHeader } from './components/navbar/EnhancedNavbarHeader';
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
    deviceType: 'iPhone' | 'iPad' | 'Mac' | 'Apple Watch' | 'Other';
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
      city: currentUser?.city || '',
      status: 'open',
      urgency: orderData.urgency || 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
      clientId: currentUser?.id || '',
      clientName: currentUser?.name || '',
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

  const setSelectedOrder = (order: Order | null) => {
    _setSelectedOrder(order);
  };

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
        // Критичні помилки логуються тільки в DEV
        if (import.meta.env.DEV) {
          console.error('Auto-refresh error:', error);
        }
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
      } catch (error: unknown) {
        // Тиха обробка помилок - не ламаємо рендеринг
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (import.meta.env.DEV) {
          console.warn('Failed to fetch users (non-critical):', errorMessage);
        }
        // Якщо не вдалося завантажити, залишаємо порожній масив
        setUsers([]);
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser?.id, fetchOrders, fetchNotifications]);

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
          // Оновлюємо дані користувача через API
          await apiUserService.updateUserProfile(currentUser.id, data);
          completeOnboarding();
        } catch (error) {
          if (import.meta.env.DEV) {
            console.error('Error saving onboarding data:', error);
          }
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
      <EnhancedNavbarHeader
        currentUser={currentUser}
        unviewedOrdersCount={notifications.filter(n => !n.read).length}
        onSettingsClick={() => setActiveItem('settings')}
        onLogout={logout}
        onDashboardClick={() => setActiveItem('dashboard')}
        onProfileClick={() => setActiveItem('profile')}
      />
      <div className="flex h-screen pt-14">
        <ModernNavigation
          currentUser={currentUser}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          unviewedOrdersCount={0}
          onLogout={logout}
          onCreateOrder={handleCreateOrder}
        />
        <div className="flex-1 md:ml-56 overflow-y-auto overflow-x-hidden h-screen relative">
          <div className="pl-2 pr-4 lg:pl-3 lg:pr-6 py-2 w-full">
            <Suspense fallback={<div className="p-8"><div className="animate-pulse">Завантаження панелі...</div></div>}>
              {activeItem === 'dashboard' &&
                (currentUser.role === 'master' ? (
                  <EnhancedMasterDashboard
                    currentUser={currentUser}
                    stats={{
                      activeOrders: safeOrders.filter((o) => o.status === 'in_progress').length,
                      completedOrders: safeOrders.filter(
                        (o) => o.status === 'completed'
                      ).length,
                      totalEarned: 125000,
                      rating: currentUser.rating || 4.9,
                    }}
                    orders={safeOrders}
                    notifications={notifications}
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
                    <h1 className="text-2xl font-bold mb-4">{t('common.platformName') || 'RepairHub'}</h1>
                    <p className="text-gray-600">Оберіть роль для продовження роботи.</p>
                  </div>
                ))}
            </Suspense>

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
                <EnhancedOrdersBoard orders={safeOrders} />
              ) : (
                <Orders
                  currentUser={currentUser}
                  masters={masters}
                />
              )
            )}

            {activeItem === 'myDevices' && <MyDevices />}

            {activeItem === 'inventory' && (
              <SparePartsMarketplace />
            )}
            
            {activeItem === 'sellerDashboard' && (
              <EnhancedSellerDashboard />
            )}
            
            {activeItem === 'exchangeParts' && (
              <EnhancedExchangeManager 
                userParts={[]}
                availableForExchange={[]}
              />
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
                  onShowToast={(msg) => {
                    if (import.meta.env.DEV) {
                      console.log(msg);
                    }
                  }}
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
