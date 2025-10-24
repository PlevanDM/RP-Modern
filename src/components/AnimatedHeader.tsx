import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, Settings, LogOut, Clock, Calendar } from 'lucide-react';

interface AnimatedHeaderProps {
  currentUser: any;
  notifications: any[];
  onReadNotification: (id: string) => void;
  onRemoveNotification: (id: string) => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onLogout: () => void;
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  currentUser,
  notifications,
  onReadNotification,
  onRemoveNotification,
  onProfileClick,
  onSettingsClick,
  onLogout,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tickerText, setTickerText] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Обновляем время каждую секунду
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Бегущая строка с реальными уведомлениями
  useEffect(() => {
    if (notifications.length === 0) {
      setTickerText('🔔 Немає нових сповіщень');
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (notifications.length > 0) {
        const notification = notifications[currentIndex];
        setTickerText(`🔔 ${notification.message}`);
        currentIndex = (currentIndex + 1) % notifications.length;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [notifications]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('uk-UA', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('uk-UA', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    }).toUpperCase();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm relative overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30" />
      
      <div className="relative z-10 flex justify-between items-center px-6 py-4">
        {/* Левая часть - время и дата */}
        <motion.div 
          className="text-right min-w-fit"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-xl font-bold text-gray-900 font-mono flex items-center gap-2"
            animate={{ 
              textShadow: [
                '0 0 0px rgba(59, 130, 246, 0)',
                '0 0 10px rgba(59, 130, 246, 0.3)',
                '0 0 0px rgba(59, 130, 246, 0)'
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Clock className="w-5 h-5 text-blue-500" />
            {formatTime(currentTime)}
          </motion.div>
          <motion.div 
            className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Calendar className="w-3 h-3" />
            {formatDate(currentTime)}
          </motion.div>
        </motion.div>

        {/* Центральная часть - только бегущая строка и роль */}
        <div className="flex-1 text-center px-4">
          {/* Бегущая строка с уведомлениями */}
          <div className="relative overflow-hidden mb-3 h-6 flex items-center">
            {/* Градиентные маски для плавного появления/исчезновения */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-20" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-20" />
            
            <motion.div
              className="text-sm font-medium text-gray-700 whitespace-nowrap flex items-center"
              key={tickerText}
              initial={{ x: '100%' }}
              animate={{ x: '-100%' }}
              transition={{ 
                duration: 20, 
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              {tickerText}
            </motion.div>
          </div>

          {/* Только роль пользователя */}
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {currentUser && (
              <motion.div 
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  currentUser.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                  currentUser.role === 'master' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentUser.role === 'admin' ? '👨‍💼 Адміністратор' :
                 currentUser.role === 'master' ? '🔧 Майстер' :
                 '👤 Клієнт'}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Правая часть - иконки */}
        <div className="flex items-center gap-3 min-w-fit">
          {/* Уведомления */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-lg transition relative"
              title="Сповіщення"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* Выпадающий список уведомлений */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Сповіщення</h3>
                    {notifications.length === 0 ? (
                      <p className="text-gray-500 text-sm">Немає нових сповіщень</p>
                    ) : (
                      <div className="space-y-2">
                        {notifications.slice(0, 5).map((notification) => (
                          <motion.div
                            key={notification.id}
                            className={`p-3 rounded-lg border ${
                              notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                            }`}
                            whileHover={{ scale: 1.02 }}
                          >
                            <p className="text-sm text-gray-700">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Профиль */}
          <motion.button
            onClick={onProfileClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Профіль"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <User className="w-5 h-5 text-gray-600" />
          </motion.button>

          {/* Настройки */}
          <motion.button
            onClick={onSettingsClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Налаштування"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </motion.button>

          {/* Выход */}
          <motion.button
            onClick={onLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Вихід"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
