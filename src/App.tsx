import { useState } from 'react';
import ModernNavigation from './components/layout/ModernNavigation';
import ModernLandingPage from './components/pages/ModernLandingPage';
import ModernMasterDashboard from './components/features/master/MasterDashboard/ModernMasterDashboard';
import ModernClientDashboard from './components/features/client/ClientDashboard/ModernClientDashboard';
import { MyDevices } from './components/features/client/MyDevices';
import { DeviceCatalog } from './components/pages/DeviceCatalog';
import { AdminDashboard } from './components/features/admin/AdminDashboard';
import { ModernSettingsPanel } from './components/features/admin/ModernSettingsPanel';
import { ModernUsersPanel } from './components/features/admin/ModernUsersPanel';
import { ModernOrdersPanel } from './components/features/admin/ModernOrdersPanel';
import { ModernFinancialPanel } from './components/features/admin/ModernFinancialPanel';
import { Orders } from './components/pages/Orders';
import { Portfolio } from './components/pages/Portfolio';
import { Proposals } from './components/pages/Proposals';
import { Messages } from './components/pages/Messages';
import { Profile } from './components/pages/Profile';
import { Settings } from './components/pages/Settings';
import { MastersList } from './components/features/master/MastersList';
import { PartsInventory } from './components/features/parts/PartsInventory';
import { MasterReviews } from './components/features/reviews/MasterReviews';
import { PaymentManagement } from './components/pages/PaymentManagement';
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
          <div className="w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="text-right min-w-fit">
                <div className="text-xl font-bold text-gray-900 font-mono">22:44:20</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">чт, 23 ЖОВТ.</div>
              </div>

              <div className="flex-1 text-center">
                <h1 className="text-2xl font-bold text-gray-900">RepairHub Pro</h1>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <p className="text-sm text-gray-600">Ласкаво просимо в ваш особистий кабінет</p>
                  {currentUser && (
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      currentUser.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      currentUser.role === 'master' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {currentUser.role === 'admin' ? '👨‍💼 Адміністратор' :
                       currentUser.role === 'master' ? '🔧 Майстер' :
                       '👤 Клієнт'}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 min-w-fit">
                <NotificationCenter
                  notifications={notifications}
                  onRead={readNotification}
                  onRemove={removeNotification}
                />
                <button
                  onClick={() => setActiveItem('profile')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Профіль"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM6.5 18a3 3 0 00-3 3v1h15v-1a3 3 0 00-3-3H6.5z" />
                  </svg>
                </button>

                <button
                  onClick={() => setActiveItem('settings')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Налаштування"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>

            <button
                  onClick={logout}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Вихід"
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
