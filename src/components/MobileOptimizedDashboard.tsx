import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Home, Search, MessageCircle, User, ChevronRight, Bell, Star } from 'lucide-react';

export function MobileOptimizedDashboard() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Mock data
  const orders = [
    { id: '#1001', client: 'Анна К.', device: 'iPhone 15', status: 'assigned', priority: 'high' },
    { id: '#1002', client: 'Борис С.', device: 'Samsung S24', status: 'new', priority: 'medium' }
  ];

  const stats = [
    { label: t('common.orders'), value: '24', icon: '📦', color: 'bg-blue-100' },
    { label: t('common.revenue'), value: '₴8.5K', icon: '💰', color: 'bg-green-100' },
    { label: t('common.rating'), value: '4.9', icon: '⭐', color: 'bg-yellow-100' },
    { label: t('common.messages') || 'Повідомлення', value: '12', icon: '💬', color: 'bg-purple-100' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="pb-20 space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 px-4 pt-4">
              {stats.map((stat, idx) => (
                <div key={idx} className={`${stat.color} rounded-lg p-4 text-center`}>
                  <p className="text-2xl mb-1">{stat.icon}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-4">
              <h3 className="font-bold text-gray-900 mb-3">⚡ {t('dashboard.quickActions')}</h3>
              <div className="space-y-2">
                <button className="w-full p-4 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition">
                  + {t('dashboard.newOrder')}
                </button>
                <button className="w-full p-4 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition">
                  {t('dashboard.viewProposals')}
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">📋 {t('dashboard.recentOrders')}</h3>
                <a href="#" className="text-blue-600 text-sm font-medium">{t('common.viewAll')}</a>
              </div>
              <div className="space-y-2">
                {orders.map(order => (
                  <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        order.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.priority === 'high' ? `🔴 ${t('priority.high')}` : `🟡 ${t('priority.medium')}`}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{order.client} • {order.device}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {order.status === 'assigned' ? `✅ ${t('status.assigned') || 'Призначено'}` : `📥 ${t('status.new') || 'Нове'}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="px-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-900 mb-2">💡 {t('dashboard.tipOfTheDay')}</p>
                <p className="text-xs text-blue-700">{t('dashboard.tipMessage')}</p>
              </div>
            </div>
          </div>
        );

      case 'search':
        return (
          <div className="pb-20 px-4 pt-4">
            <h3 className="font-bold text-gray-900 mb-4">🔍 {t('common.search')}</h3>
            <input
              type="text"
              placeholder={t('dashboard.searchPlaceholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            />
            <div className="space-y-2">
              {['iPhone ремонт', 'Samsung екран', 'Мак батарея', 'iPad логіка'].map((item, idx) => (
                <button key={idx} className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="pb-20 px-4 pt-4">
            <h3 className="font-bold text-gray-900 mb-4">💬 {t('navigation.messages')}</h3>
            <div className="space-y-2">
              {['Анна К.', 'Боріс С.', 'Малька П.'].map((name, idx) => (
                <div key={idx} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{name}</p>
                      <p className="text-xs text-gray-500 truncate">Останнє повідомлення...</p>
                    </div>
                  </div>
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="pb-20 px-4 pt-4">
            <h3 className="font-bold text-gray-900 mb-4">👤 {t('navigation.profile')}</h3>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-3" />
              <p className="font-bold text-gray-900 text-lg">Іван Коваль</p>
              <p className="text-sm text-gray-600">🔧 {t('dashboard.masterVirtuoso')}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-gray-900">4.9/5 ({t('dashboard.reviewsCount', { count: 42 })})</span>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50 transition">
                ✏️ {t('common.editProfile')}
              </button>
              <button className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50 transition">
                📸 {t('navigation.portfolio')}
              </button>
              <button className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50 transition">
                ⚙️ {t('navigation.settings')}
              </button>
              <button className="w-full p-3 border border-red-300 text-red-600 rounded-lg font-medium text-sm hover:bg-red-50 transition">
                🚪 {t('common.logout')}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">RepairHub</h1>
          <div className="flex items-center gap-2">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto pt-16">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {[
            { id: 'home', icon: Home, label: t('navigation.home') },
            { id: 'search', icon: Search, label: t('common.search') },
            { id: 'messages', icon: MessageCircle, label: t('navigation.messages') },
            { id: 'profile', icon: User, label: t('navigation.profile') }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 flex flex-col items-center gap-1 transition ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 pt-16" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="max-w-md mx-auto bg-white rounded-b-lg shadow-lg p-4 space-y-2">
            {[t('navigation.settings'), t('common.help'), t('common.about'), t('common.logout')].map(item => (
              <button key={item} className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition text-sm font-medium text-gray-700">
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
