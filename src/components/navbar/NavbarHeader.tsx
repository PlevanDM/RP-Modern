import React from 'react';
import { Bell, Settings, LogOut, ChevronDown, Search } from 'lucide-react';
import { User } from '../../types/models';
import { motion } from 'framer-motion';
import { Logo } from '../Logo';

interface NavbarHeaderProps {
  currentUser: User | null;
  unviewedOrdersCount?: number;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  onSearchChange?: (query: string) => void;
  onDashboardClick?: () => void;
}

export const NavbarHeader: React.FC<NavbarHeaderProps> = ({
  currentUser,
  unviewedOrdersCount = 0,
  onSettingsClick,
  onLogout,
  onSearchChange,
  onDashboardClick,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  if (!currentUser) return null;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  return (
    <motion.div
      className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between h-16 px-4 gap-4">
        {/* Left: Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition duration-200"
          onClick={onDashboardClick}
        >
          <Logo />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold leading-tight">RepairHub</h1>
            <p className="text-xs text-blue-100">Платформа для ремонту</p>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-300" />
            <input
              type="text"
              placeholder="Пошук замовлень, майстрів..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Notifications */}
          <motion.button
            className="relative p-2 hover:bg-blue-500 rounded-lg transition duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5" />
            {unviewedOrdersCount > 0 && (
              <motion.span
                className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {unviewedOrdersCount > 9 ? '9+' : unviewedOrdersCount}
              </motion.span>
            )}
          </motion.button>

          {/* Settings */}
          <motion.button
            className="p-2 hover:bg-blue-500 rounded-lg transition duration-200"
            onClick={onSettingsClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5" />
          </motion.button>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              className="flex items-center gap-2 p-1 pl-2 hover:bg-blue-500 rounded-lg transition duration-200"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-semibold">
                {currentUser.name?.[0] || 'U'}
              </div>
              <ChevronDown className={`w-4 h-4 transition ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            {isUserMenuOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-56 bg-white text-gray-900 rounded-lg shadow-xl py-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="font-semibold text-sm">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
                </div>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition flex items-center gap-2 text-red-600"
                  onClick={onLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Вихід
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
