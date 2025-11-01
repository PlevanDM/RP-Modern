import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  User as UserIcon,
  Moon,
  Globe,
  HelpCircle,
  Clock,
  Calendar,
  Wrench
} from 'lucide-react';
import { User } from '../../types/models';
import { Badge } from '../ui/badge';
import { PRIMARY_GRADIENT } from '../../theme/colors';

interface NavbarHeaderProps {
  currentUser: User | null;
  unviewedOrdersCount?: number;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  onSearchChange?: (query: string) => void;
  onDashboardClick?: () => void;
  onProfileClick?: () => void;
}

export const EnhancedNavbarHeader: React.FC<NavbarHeaderProps> = ({
  currentUser,
  unviewedOrdersCount = 0,
  onSettingsClick,
  onLogout,
  onSearchChange,
  onDashboardClick,
  onProfileClick,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  if (!currentUser) return null;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  // Отримати поточний час
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  };

  // Отримати поточну дату
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  // Оновлення часу кожну хвилину
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
      setCurrentDate(getCurrentDate());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Отримати колір ролі
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
      case 'superadmin':
        return 'bg-red-500';
      case 'master':
        return 'bg-blue-500';
      case 'client':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Отримати текст ролі
  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Адміністратор';
      case 'superadmin':
        return 'Супер Адмін';
      case 'master':
        return 'Майстер';
      case 'client':
        return 'Клієнт';
      default:
        return role;
    }
  };

  return (
    <motion.div
      className="sticky top-0 z-50 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white shadow-lg"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6 gap-3 sm:gap-4">
          {/* Left: Logo + Time/Date */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={onDashboardClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="hidden sm:inline text-lg font-bold">
                RepairHub
              </span>
            </motion.div>

            {/* Time & Date Widget */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-100" />
                <span className="text-sm font-semibold">{currentTime}</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-100" />
                <span className="text-xs text-blue-100">{currentDate}</span>
              </div>
            </div>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg">
            <motion.div
              className="relative w-full"
              animate={{ scale: isSearchFocused ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Пошук замовлень, майстрів, запчастин..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg"
              />
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => handleSearch('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Right: Widgets + Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language Selector */}
            <motion.button
              className="hidden sm:flex items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium hidden lg:inline">🇺🇦</span>
            </motion.button>

            {/* Help */}
            <motion.button
              className="hidden sm:block p-2 hover:bg-white/10 rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="w-4 h-4" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              className="relative p-2 hover:bg-white/10 rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              {unviewedOrdersCount > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {unviewedOrdersCount > 9 ? '9+' : unviewedOrdersCount}
                </motion.div>
              )}
            </motion.button>

            {/* Settings */}
            <motion.button
              className="hidden sm:block p-2 hover:bg-white/10 rounded-lg transition-all"
              onClick={onSettingsClick}
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Settings className="w-5 h-5" />
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                className="flex items-center gap-2 p-1 pl-2 pr-3 hover:bg-white/10 rounded-xl transition-all"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center font-bold text-sm sm:text-base shadow-lg backdrop-blur-sm border-2 border-white/30">
                    {currentUser.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getRoleColor(currentUser.role)} rounded-full border-2 border-white shadow-sm`} />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs sm:text-sm font-semibold leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-blue-100 opacity-90">
                    {getRoleText(currentUser.role)}
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </motion.button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      className="fixed inset-0 z-40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsUserMenuOpen(false)}
                    />

                    {/* Menu */}
                    <motion.div
                      className="absolute right-0 mt-2 w-72 bg-white text-gray-900 rounded-2xl shadow-2xl py-2 z-50 border border-gray-100"
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${PRIMARY_GRADIENT.button} flex items-center justify-center font-bold text-white text-lg shadow-lg`}>
                              {currentUser.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getRoleColor(currentUser.role)} rounded-full border-2 border-white shadow-sm`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm">{currentUser.name}</p>
                            <p className="text-xs text-gray-500">{currentUser.email}</p>
                            <Badge className="mt-1 text-[10px]">
                              {getRoleText(currentUser.role)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <motion.button
                          className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition flex items-center gap-3 text-sm"
                          onClick={onProfileClick}
                          whileHover={{ x: 4 }}
                        >
                          <UserIcon className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">Мій профіль</span>
                        </motion.button>

                        <motion.button
                          className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition flex items-center gap-3 text-sm"
                          onClick={onSettingsClick}
                          whileHover={{ x: 4 }}
                        >
                          <Settings className="w-4 h-4 text-gray-600" />
                          <span className="font-medium">Налаштування</span>
                        </motion.button>

                        <motion.button
                          className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition flex items-center gap-3 text-sm"
                          whileHover={{ x: 4 }}
                        >
                          <Moon className="w-4 h-4 text-gray-600" />
                          <span className="font-medium">Темна тема</span>
                          <Badge variant="secondary" className="ml-auto text-[10px]">
                            Скоро
                          </Badge>
                        </motion.button>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 pt-2">
                        <motion.button
                          className="w-full text-left px-4 py-2.5 hover:bg-red-50 transition flex items-center gap-3 text-sm text-red-600 font-medium"
                          onClick={onLogout}
                          whileHover={{ x: 4 }}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Вийти з системи</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

