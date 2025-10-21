import { 
  LayoutDashboard, 
  Search, 
  ClipboardList, 
  MessageCircle, 
  User as UserIcon,
  Star, 
  Wrench, 
  Package, 
  Briefcase, 
  Tag, 
  CreditCard, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { User } from '../types/models';
import { useState } from 'react';

interface NavigationProps {
  currentUser: User;
  activeItem: string;
  onItemClick: (item: string) => void;
  onLogout: () => void;
  onLogoClick?: () => void;
  unviewedOrdersCount?: number; // Новый пропс для счетчика
}

export function Navigation({ currentUser, activeItem, onItemClick, onLogout, onLogoClick, unviewedOrdersCount = 0 }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  if (!currentUser) return null;

  const getMenuItems = () => {
    const baseItems = [
      { key: 'dashboard', name: 'Дашборд', icon: LayoutDashboard, description: 'Головна сторінка' },
      { key: 'catalog', name: 'Каталог Пристроїв', icon: Package, description: 'База фото пристроїв' }
    ];

    if (currentUser.role === 'admin') {
      return [
        ...baseItems,
        { key: 'finance', name: 'Фінанси', icon: CreditCard, description: 'Фінансова панель' },
        { key: 'settings', name: 'Налаштування', icon: SettingsIcon, description: 'Адмін-панель' },
      ];
    }

    if (currentUser.role === 'client') {
      return [
        ...baseItems,
        { key: 'masters', name: 'Знайти Майстрів', icon: Search, description: 'Пошук по місту' },
        { key: 'orders', name: 'Мої Замовлення', icon: ClipboardList, description: 'Розташувати' },
        { key: 'proposals', name: 'Пропозиції', icon: Tag, description: 'От майстрів' },
        { key: 'payments', name: 'Платежі', icon: CreditCard, description: 'Ескроу-система' },
        { key: 'messages', name: 'Чат', icon: MessageCircle, description: 'Спілкування' },
        { key: 'profile', name: 'Профіль', icon: UserIcon, description: 'Мої дані' }
      ];
    } else if (currentUser.role === 'master') {
      return [
        ...baseItems,
        { key: 'orders', name: 'Доска Замовлень', icon: ClipboardList, description: 'Всі замовлення' },
        { key: 'reviews', name: 'Рейтинги & Рецензії', icon: Star, description: 'Мої відгуки' },
        { key: 'parts', name: 'Мої Запчастини', icon: Wrench, description: 'Мій склад' },
        { key: 'proposals', name: 'Мої Пропозиції', icon: Tag, description: 'Відправлені' },
        { key: 'payments', name: 'Платежі', icon: CreditCard, description: 'Виплати' },
        { key: 'messages', name: 'Чат', icon: MessageCircle, description: 'З клієнтами' },
        { key: 'portfolio', name: 'Портфоліо', icon: Briefcase, description: 'Мої роботи' },
        { key: 'profile', name: 'Профіль', icon: UserIcon, description: 'Мої дані' }
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white h-16 flex items-center justify-between px-4 z-50 border-b border-slate-700">
        <button
          onClick={onLogoClick}
          className="flex-1"
          title="Повернутися на головну"
        >
          <div className="text-lg font-bold">RepairHub</div>
        </button>
        
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-slate-900 text-white z-40 overflow-y-auto">
          {/* User Profile */}
          <div 
            className="p-4 bg-slate-800 border-b border-slate-700 cursor-pointer hover:bg-slate-700 transition"
            onClick={() => setActive('profile')}
          >
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar || `https://i.pravatar.cc/96?img=${Math.random() * 100}`}
                alt={currentUser.name || 'User'}
                className="w-10 h-10 rounded-full border-2 border-indigo-500 hover:border-indigo-400 transition cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {currentUser.name || currentUser.fullName}
                </p>
                <p className="text-xs text-indigo-300 mt-1 flex items-center gap-1">
                  {currentUser.role === 'client' && (
                    <>
                      <PersonIcon sx={{ fontSize: 14 }} />
                      Клієнт
                    </>
                  )}
                  {currentUser.role === 'master' && (
                    <>
                      <BuildIcon sx={{ fontSize: 14 }} />
                      Майстер
                    </>
                  )}
                  {currentUser.role === 'service' && (
                    <>
                      <SettingsIcon sx={{ fontSize: 14 }} />
                      Сервіс
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="p-3 space-y-1">
            {menuItems && menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => {
                    onItemClick(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                  {item.key === 'orders' && (currentUser.role === 'master') && unviewedOrdersCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      {unviewedOrdersCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-slate-700 mt-4">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200 text-sm"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Вихід</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-56 2xl:w-64 bg-slate-900 text-white h-screen flex-col shadow-lg fixed left-0 top-0 z-50">
        {/* Header with logo */}
        <div className="p-6 border-b border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 flex justify-center sticky top-0 z-10">
          <div
            className="cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={onLogoClick}
            title="Повернутися на головну"
          >
            <Logo className="h-20 w-auto" />
          </div>
        </div>

        {/* User Profile Section */}
        <div 
          className="p-4 bg-gradient-to-b from-slate-700 to-slate-800 border-b border-slate-700 sticky top-28 z-10 cursor-pointer hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-lg"
          onClick={() => setActive('profile')}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={currentUser.avatar || `https://i.pravatar.cc/96?img=${Math.random() * 100}`}
                alt={currentUser.name || 'User'}
                className="w-14 h-14 rounded-full border-3 border-indigo-500 hover:border-indigo-400 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/50"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800 shadow-md"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate hover:text-indigo-300 transition">
                {currentUser.name || currentUser.fullName}
              </p>
              <div className="text-xs text-indigo-200 mt-1.5 flex items-center gap-1 bg-indigo-500/20 px-2.5 py-1 rounded-full w-fit hover:bg-indigo-500/30 transition">
                {currentUser.role === 'client' && (
                  <>
                    <PersonIcon sx={{ fontSize: 14 }} />
                    <span className="font-medium">Клієнт</span>
                  </>
                )}
                {currentUser.role === 'master' && (
                  <>
                    <BuildIcon sx={{ fontSize: 14 }} />
                    <span className="font-medium">Майстер</span>
                  </>
                )}
                {currentUser.role === 'service' && (
                  <>
                    <SettingsIcon sx={{ fontSize: 14 }} />
                    <span className="font-medium">Сервіс</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems && menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.key;

            return (
              <button
                key={item.key}
                onClick={() => onItemClick(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
                {item.key === 'orders' && (currentUser.role === 'master') && unviewedOrdersCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    {unviewedOrdersCount} нових
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Вихід</span>
          </button>
        </div>
      </div>
    </>
  );
}
