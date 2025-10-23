import { useState, useEffect, useCallback, useMemo } from 'react';
import ModernNavigation from './components/ModernNavigation';
import ModernLandingPage from './components/ModernLandingPage';
import ModernMasterDashboard from './components/features/master/MasterDashboard/ModernMasterDashboard';
import ModernClientDashboard from './components/features/client/ClientDashboard/ModernClientDashboard';
import { MyDevices } from './components/features/client/MyDevices';
import { DeviceCatalog } from './components/features/client/DeviceCatalog';
import RepairHubDashboard from './components/features/admin/AdminDashboard/RepairHubDashboard';
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
import { mockUsers, mockOrders, mockPortfolio, mockProposals, mockMasterOrders } from './utils/mockData';
import { User, Order, Proposal, PortfolioItem } from './types/models';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Загружаем пользователя из localStorage при монтировании
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
  }, []);

  // Оптимизация: useMemo для подсчета непросмотренных заказов (вычисляется только когда меняются orders или currentUser)
  const getUnviewedOrdersCount = useCallback(() => {
    if (!currentUser) return 0;
    return orders.filter(order =>
      order.clientId === currentUser.id &&
      order.status === 'new'
    ).length;
  }, [currentUser, orders]);

  // Оптимизация: useCallback для функции входа в систему
  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setActiveItem('dashboard'); // Автоматически переходим на дашборд
  }, []);

  // Оптимизация: useCallback для функции выхода из системы
  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setActiveItem('dashboard');
  }, []);

  // Handler для принятия пропозиции
  const handleAcceptProposal = useCallback((proposalId: string) => {
    setProposals(prev => prev.map(p => 
      p.id === proposalId ? { ...p, status: 'accepted' } : p
    ));
  }, []);

  // Handler для отклонения пропозиции
  const handleRejectProposal = useCallback((proposalId: string) => {
    setProposals(prev => prev.map(p => 
      p.id === proposalId ? { ...p, status: 'rejected' } : p
    ));
  }, []);

  // Оптимизация: useMemo для фильтрации заказов клиента
  const clientOrders = useMemo(() => {
    if (!currentUser || currentUser.role !== 'client') return [];
    return orders.filter(o => o.clientId === currentUser.id);
  }, [orders, currentUser]);

  // Если пользователь не авторизован, показываем лендинг
  if (!currentUser) {
    return (
      <ModernLandingPage onLogin={handleLogin} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <ModernNavigation
        currentUser={currentUser}
        activeItem={activeItem}
          setActiveItem={setActiveItem}
          unviewedOrdersCount={getUnviewedOrdersCount()}
        onLogout={handleLogout}
        />
        <div className="flex-1 ml-52 overflow-y-auto overflow-x-hidden h-screen">
          <div className="w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="flex justify-between items-center px-6 py-4">
              {/* Ліва сторона - Час і дата */}
              <div className="text-right min-w-fit">
                <div className="text-xl font-bold text-gray-900 font-mono">22:44:20</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">чт, 23 ЖОВТ.</div>
              </div>

              {/* Центр - Заголовок */}
              <div className="flex-1 text-center">
                <h1 className="text-2xl font-bold text-gray-900">RepairHub Pro</h1>
                <p className="text-sm text-gray-600">Ласкаво просимо в ваш особистий кабінет</p>
              </div>

              {/* Права сторона - Погода, валюти, крипто */}
              <div className="flex items-center gap-3 min-w-fit">
                {/* Уведомления */}
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition relative"
                  title="Уведомления"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">2</span>
                </button>

                {/* Профіль */}
                <button 
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    if (!showProfileMenu) {
                      setActiveItem('profile');
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Профіль"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM6.5 18a3 3 0 00-3 3v1h15v-1a3 3 0 00-3-3H6.5z" />
                  </svg>
                </button>

                {/* Настройки */}
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

                {/* Вихід */}
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Вихід"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>

                {/* Погода */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:border-blue-300 transition whitespace-nowrap">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <div className="text-xs">
                    <div className="font-semibold text-gray-900">15°C</div>
                    <div className="text-xs text-gray-600">Хмарно</div>
                  </div>
                </div>

                {/* USD */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:border-green-300 transition whitespace-nowrap">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div className="text-xs">
                    <div className="text-xs text-gray-600">USD</div>
                    <div className="font-semibold text-gray-900">₴41.50</div>
                  </div>
                </div>

                {/* USDT */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg border border-cyan-200 hover:border-cyan-300 transition whitespace-nowrap">
                  <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div className="text-xs">
                    <div className="text-xs text-gray-600">USDT</div>
                    <div className="font-semibold text-gray-900">₴41.45</div>
                  </div>
                </div>

                {/* Bitcoin */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200 hover:border-orange-300 transition whitespace-nowrap">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div className="text-xs">
                    <div className="text-xs text-gray-600">BTC</div>
                    <div className="font-semibold text-gray-900">$67.5k</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Модальное окно Уведомлений */}
          {showNotifications && (
            <div className="absolute right-6 top-20 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-40">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Уведомлення</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Майстер розпочав роботу</p>
                      <p className="text-xs text-gray-600 mt-1">Майстер Іван Петренко розпочав роботу над замовленням</p>
                      <p className="text-xs text-gray-500 mt-1">10 хв назад</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Нова пропозиція</p>
                      <p className="text-xs text-gray-600 mt-1">Нова пропозиція від майстра для замовлення</p>
                      <p className="text-xs text-gray-500 mt-1">1 год назад</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Переглянути все</button>
              </div>
            </div>
          )}

          <div className="pl-2 pr-4 lg:pl-3 lg:pr-6 py-2 w-full">
          {activeItem === 'dashboard' && (
            currentUser.role === 'master' ? (
                <ModernMasterDashboard
                currentUser={currentUser}
                stats={{
                  activeOrders: orders.filter(o => o.status === 'in_progress').length,
                  completedOrders: orders.filter(o => o.status === 'completed' || o.status === 'paid').length,
                  totalEarned: 125000,
                  rating: currentUser.rating || 4.9,
                }}
              />
            ) : currentUser.role === 'client' ? (
                <ModernClientDashboard
                currentUser={currentUser}
                  orders={clientOrders}
              />
            ) : currentUser.role === 'admin' ? (
              <RepairHubDashboard
                users={mockUsers}
                orders={orders}
                transactions={[]}
              />
            ) : (
                <div className="text-center p-8">
                  <h1 className="text-2xl font-bold mb-4">Ласкаво просимо до RepairHub Pro!</h1>
                  <p className="text-gray-600">Оберіть роль для продовження роботи.</p>
                </div>
              )
            )}

            {activeItem === 'catalog' && (
              <DeviceCatalog />
            )}

            {activeItem === 'users' && currentUser?.role === 'admin' && (
              <ModernUsersPanel />
            )}

            {activeItem === 'orders' && currentUser?.role === 'admin' && (
              <ModernOrdersPanel />
            )}

            {activeItem === 'finance' && currentUser?.role === 'admin' && (
              <ModernFinancialPanel />
            )}

            {activeItem === 'settings' && currentUser?.role === 'admin' && (
              <ModernSettingsPanel />
          )}

          {activeItem === 'myOrders' && (
            <Orders
              currentUser={currentUser}
              orders={orders}
                onSendToMaster={() => {}}
                onCreateOrder={() => {}}
                onDeleteOrder={() => {}}
                onRestoreOrder={() => {}}
                onToggleActiveSearch={() => {}}
                onUpdateOrderStatus={() => {}}
                masters={mockUsers}
                onEditOrder={() => {}}
            />
          )}

          {activeItem === 'myDevices' && (
            <MyDevices />
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
                proposals={proposals}
              orders={orders}
              isMaster={currentUser?.role === 'master'}
                onSubmitProposal={() => {}}
                onAcceptProposal={handleAcceptProposal}
                onRejectProposal={handleRejectProposal}
                onShowToast={() => {}}
            />
          )}

          {activeItem === 'priceComparison' && (
            <div className="p-8">
              <MastersList 
                masters={mockUsers.filter(u => u.role === 'master')}
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
                <MasterReviews
              currentUser={currentUser}
              orders={orders}
            />
              </div>
          )}

            {activeItem === 'payments' && currentUser && (
              <PaymentManagement
              currentUser={currentUser}
                orders={orders}
                onUpdatePayment={() => {}}
                onReleasePayment={() => {}}
                onRefundPayment={() => {}}
                onCreateDispute={() => {}}
                onEscalateDispute={() => {}}
              />
            )}

            {activeItem === 'messages' && (
              <Messages
              currentUser={currentUser}
                masters={mockUsers}
              orders={orders}
            />
          )}

          {activeItem === 'profile' && (
            <Profile
                currentUser={currentUser}
                orders={orders}
                onUpdateProfile={() => {}}
              />
            )}
            {activeItem === 'settings' && (
              <Settings
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
