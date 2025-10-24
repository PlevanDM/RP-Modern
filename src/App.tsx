import { useState } from 'react';
import ModernNavigation from './components/ModernNavigation';
import ModernLandingPage from './components/ModernLandingPage';
import ModernMasterDashboard from './components/features/master/MasterDashboard/ModernMasterDashboard';
import ModernClientDashboard from './components/features/client/ClientDashboard/ModernClientDashboard';
import { MyDevices } from './components/features/client/MyDevices';
import { DeviceCatalog } from './components/features/client/DeviceCatalog';
import { AdminDashboard } from './components/features/admin/AdminDashboard';
import { ModernSettingsPanel } from './components/features/admin/ModernSettingsPanel';
import { ModernUsersPanel } from './components/features/admin/ModernUsersPanel';
import { ModernOrdersPanel } from './components/features/admin/ModernOrdersPanel';
import { ModernFinancialPanel } from './components/features/admin/ModernFinancialPanel';
import { Orders } from './components/Orders';
import { Portfolio } from './components/Portfolio';
import { Proposals } from './components/Proposals';
import { Messages } from './components/Messages';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { MastersList } from './components/features/master/MastersList';
import { PartsInventory } from './components/features/parts/PartsInventory';
import { MasterReviews } from './components/features/reviews/MasterReviews';
import { PaymentManagement } from './components/PaymentManagement';
import { mockUsers, mockPortfolio } from './utils/mockData';
import { useAuthStore } from './store/authStore';
import { useOrdersStore } from './store/ordersStore';
import { useNotificationsStore } from './store/notificationsStore';
import { NotificationCenter } from './components/NotificationCenter';
import { OnboardingWizard } from './components/OnboardingWizard';
import { ClientProfileStep } from './components/onboarding/ClientProfileStep';
import { DeviceStep } from './components/onboarding/DeviceStep';
import { OnboardingCompletionStep } from './components/onboarding/OnboardingCompletionStep';
import { SpecializationStep } from './components/onboarding/SpecializationStep';
import { ExperienceStep } from './components/onboarding/ExperienceStep';
import { ToolsStep } from './components/onboarding/ToolsStep';
import { AnimatedHeader } from './components/AnimatedHeader';

function App() {
  const { currentUser, login, logout, isOnboardingCompleted, completeOnboarding } = useAuthStore();
  const {
    orders,
    proposals,
    acceptProposal,
    rejectProposal,
    updateOrderStatus,
    createOrder,
    deleteOrder,
    restoreOrder,
    toggleActiveSearch,
    sendToMaster,
    editOrder,
    submitProposal,
    updateProposal,
    updatePayment,
    releasePayment,
    refundPayment,
    createDispute,
    escalateDispute,
  } = useOrdersStore();
  const { notifications, readNotification, removeNotification } = useNotificationsStore();
  const [activeItem, setActiveItem] = useState('dashboard');

  if (!currentUser) {
    return <ModernLandingPage onLogin={login} />;
  }

  if (!isOnboardingCompleted) {
    const clientSteps = [
      <ClientProfileStep />,
      <DeviceStep onSkip={completeOnboarding} />,
      <OnboardingCompletionStep name={currentUser.name} />,
    ];

    const masterSteps = [
      <ClientProfileStep />,
      <SpecializationStep />,
      <ExperienceStep />,
      <ToolsStep />,
      <OnboardingCompletionStep name={currentUser.name} />,
    ];

    const steps = currentUser.role === 'client' ? clientSteps : masterSteps;

    return <OnboardingWizard steps={steps} onComplete={completeOnboarding} />;
  }

  const clientOrders = orders.filter((o) => o.clientId === currentUser.id);

    return (
      <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <ModernNavigation
            currentUser={currentUser}
            activeItem={activeItem}
          setActiveItem={setActiveItem}
          unviewedOrdersCount={0}
          onLogout={logout}
        />
        <div className="flex-1 md:ml-56 overflow-y-auto overflow-x-hidden h-screen">
          <AnimatedHeader
            currentUser={currentUser}
            notifications={notifications}
            onReadNotification={readNotification}
            onRemoveNotification={removeNotification}
            onProfileClick={() => setActiveItem('profile')}
            onSettingsClick={() => setActiveItem('settings')}
            onLogout={logout}
          />
          <div className="pl-2 pr-4 lg:pl-3 lg:pr-6 py-2 w-full">
            {activeItem === 'dashboard' &&
              (currentUser.role === 'master' ? (
                <ModernMasterDashboard
                currentUser={currentUser}
                stats={{
                    activeOrders: orders.filter((o) => o.status === 'in_progress').length,
                    completedOrders: orders.filter(
                      (o) => o.status === 'completed' || o.status === 'paid'
                    ).length,
                  totalEarned: 125000,
                  rating: currentUser.rating || 4.9,
                }}
              />
            ) : currentUser.role === 'client' ? (
                <ModernClientDashboard currentUser={currentUser} orders={clientOrders} />
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

            {activeItem === 'orders' && currentUser?.role === 'admin' && <ModernOrdersPanel />}

            {activeItem === 'finance' && currentUser?.role === 'admin' && <ModernFinancialPanel />}

            {activeItem === 'settings' && currentUser?.role === 'admin' && <ModernSettingsPanel />}

          {activeItem === 'myOrders' && (
            <Orders
              currentUser={currentUser}
              orders={orders}
                onSendToMaster={sendToMaster}
              onCreateOrder={createOrder}
              onDeleteOrder={deleteOrder}
              onRestoreOrder={restoreOrder}
              onToggleActiveSearch={toggleActiveSearch}
              onUpdateOrderStatus={updateOrderStatus}
                masters={mockUsers}
              onEditOrder={editOrder}
                onCreateProposal={() => {}}
            />
          )}

            {activeItem === 'myDevices' && <MyDevices />}

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
              <Portfolio portfolio={mockPortfolio} currentUser={currentUser} />
          )}

          {activeItem === 'proposals' && (
            <Proposals
              currentUser={currentUser}
                proposals={proposals}
              orders={orders}
              isMaster={currentUser?.role === 'master'}
                onSubmitProposal={submitProposal}
                onUpdateProposal={updateProposal}
              onAcceptProposal={acceptProposal}
              onRejectProposal={rejectProposal}
                onShowToast={() => {}}
            />
          )}

          {activeItem === 'priceComparison' && (
            <div className="p-8">
              <MastersList 
                  masters={mockUsers.filter((u) => u.role === 'master')}
                currentUserCity={currentUser?.city}
                  onSelectMaster={() => {}}
                  onContact={() => {}}
                  onToggleFavorite={() => {}}
                  favoriteMasters={[]}
              />
            </div>
          )}

          {activeItem === 'reports' && (
              <div className="p-8">
                <MasterReviews currentUser={currentUser} orders={orders} />
              </div>
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

            {activeItem === 'messages' && (
              <Messages currentUser={currentUser} masters={mockUsers} orders={orders} />
          )}

          {activeItem === 'profile' && (
            <Profile
                currentUser={currentUser}
                orders={orders}
                onUpdateProfile={() => {}}
              />
            )}
            {activeItem === 'settings' && <Settings currentUser={currentUser} onLogout={logout} />}
            </div>
        </div>
      </div>
      <NotificationCenter />
    </div>
  );
}

export default App;
