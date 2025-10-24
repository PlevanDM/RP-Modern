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
  const [currentEffect, setCurrentEffect] = useState(0);

  // Магические эффекты для появления текста
  const magicEffects = [
    // 1. Волна
    {
      name: 'wave',
      variants: {
        initial: { opacity: 0, y: 20, scale: 0.8 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.6, ease: "easeOut" }
      }
    },
    // 2. Вращение
    {
      name: 'rotate',
      variants: {
        initial: { opacity: 0, rotate: -180, scale: 0.5 },
        animate: { opacity: 1, rotate: 0, scale: 1 },
        transition: { duration: 0.8, ease: "easeOut" }
      }
    },
    // 3. Масштабирование
    {
      name: 'scale',
      variants: {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: "backOut" }
      }
    },
    // 4. Слайд слева
    {
      name: 'slideLeft',
      variants: {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.7, ease: "easeOut" }
      }
    },
    // 5. Слайд справа
    {
      name: 'slideRight',
      variants: {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.7, ease: "easeOut" }
      }
    },
    // 6. Пульсация
    {
      name: 'pulse',
      variants: {
        initial: { opacity: 0, scale: 0.3 },
        animate: { 
          opacity: 1, 
          scale: [0.3, 1.2, 1],
          transition: { duration: 0.8, ease: "easeOut" }
        }
      }
    },
    // 7. Блики
    {
      name: 'glow',
      variants: {
        initial: { opacity: 0, textShadow: "0 0 0px rgba(59, 130, 246, 0)" },
        animate: { 
          opacity: 1, 
          textShadow: [
            "0 0 0px rgba(59, 130, 246, 0)",
            "0 0 20px rgba(59, 130, 246, 0.8)",
            "0 0 0px rgba(59, 130, 246, 0)"
          ]
        },
        transition: { duration: 1, ease: "easeOut" }
      }
    },
    // 8. Типография
    {
      name: 'typewriter',
      variants: {
        initial: { opacity: 0, width: 0 },
        animate: { opacity: 1, width: "100%" },
        transition: { duration: 1.2, ease: "easeOut" }
      }
    },
    // 9. Эластичность
    {
      name: 'elastic',
      variants: {
        initial: { opacity: 0, scale: 0.1 },
        animate: { 
          opacity: 1, 
          scale: [0.1, 1.3, 0.9, 1],
          transition: { duration: 1, ease: "easeOut" }
        }
      }
    },
    // 10. Звездный взрыв
    {
      name: 'starBurst',
      variants: {
        initial: { opacity: 0, scale: 0, rotate: 0 },
        animate: { 
          opacity: 1, 
          scale: [0, 1.5, 1],
          rotate: [0, 360],
          transition: { duration: 1.2, ease: "easeOut" }
        }
      }
    },
    // 11. Морфинг
    {
      name: 'morph',
      variants: {
        initial: { opacity: 0, borderRadius: "50%" },
        animate: { 
          opacity: 1, 
          borderRadius: "0%",
          transition: { duration: 0.8, ease: "easeOut" }
        }
      }
    },
    // 12. Магнитный эффект
    {
      name: 'magnetic',
      variants: {
        initial: { opacity: 0, y: -50, scale: 0.5 },
        animate: { 
          opacity: 1, 
          y: 0, 
          scale: [0.5, 1.1, 1],
          transition: { duration: 0.9, ease: "easeOut" }
        }
      }
    },
    // 13. Квантовый туннель
    {
      name: 'quantum',
      variants: {
        initial: { opacity: 0, scale: 0, rotateY: 180 },
        animate: { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0,
          transition: { duration: 1.1, ease: "easeOut" }
        }
      }
    },
    // 14. Гравитационный коллапс
    {
      name: 'gravity',
      variants: {
        initial: { opacity: 0, scale: 2, y: -100 },
        animate: { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { duration: 1.3, ease: "easeOut" }
        }
      }
    },
    // 15. Магический портал
    {
      name: 'portal',
      variants: {
        initial: { opacity: 0, scale: 0, rotate: 0 },
        animate: { 
          opacity: 1, 
          scale: [0, 1.2, 1],
          rotate: [0, 720],
          transition: { duration: 1.4, ease: "easeOut" }
        }
      }
    },
    // 16. Кристаллизация
    {
      name: 'crystal',
      variants: {
        initial: { opacity: 0, scale: 0, rotateX: 90 },
        animate: { 
          opacity: 1, 
          scale: 1, 
          rotateX: 0,
          transition: { duration: 1, ease: "easeOut" }
        }
      }
    },
    // 17. Энергетический взрыв
    {
      name: 'energy',
      variants: {
        initial: { opacity: 0, scale: 0, filter: "blur(20px)" },
        animate: { 
          opacity: 1, 
          scale: 1, 
          filter: "blur(0px)",
          transition: { duration: 1.2, ease: "easeOut" }
        }
      }
    },
    // 18. Телепортация
    {
      name: 'teleport',
      variants: {
        initial: { opacity: 0, x: -200, scale: 0.3 },
        animate: { 
          opacity: 1, 
          x: 0, 
          scale: [0.3, 1.2, 1],
          transition: { duration: 1.1, ease: "easeOut" }
        }
      }
    },
    // 19. Магический круг
    {
      name: 'magicCircle',
      variants: {
        initial: { opacity: 0, scale: 0, rotate: -180 },
        animate: { 
          opacity: 1, 
          scale: [0, 1.3, 1],
          rotate: 0,
          transition: { duration: 1.3, ease: "easeOut" }
        }
      }
    },
    // 20. Космический портал
    {
      name: 'spacePortal',
      variants: {
        initial: { opacity: 0, scale: 0, rotateY: 90, rotateZ: 45 },
        animate: { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0, 
          rotateZ: 0,
          transition: { duration: 1.5, ease: "easeOut" }
        }
      }
    }
  ];

  // Обновляем время каждую секунду
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Бегущая строка с реальными уведомлениями и магическими эффектами
  useEffect(() => {
    // Фильтруем только непрочитанные уведомления
    const unreadNotifications = notifications.filter(n => !n.read);
    
    if (unreadNotifications.length === 0) {
      setTickerText('🔔 Немає нових сповіщень');
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (unreadNotifications.length > 0) {
        const notification = unreadNotifications[currentIndex];
        setTickerText(`🔔 ${notification.message}`);
        
        // Выбираем случайный магический эффект
        const randomEffect = Math.floor(Math.random() * magicEffects.length);
        setCurrentEffect(randomEffect);
        
        currentIndex = (currentIndex + 1) % unreadNotifications.length;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [notifications, magicEffects]);

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
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40"
    >
      <div className="flex items-center justify-between px-6 py-4 h-16">
        {/* Левая часть - время и дата */}
        <motion.div 
          className="flex flex-col items-start min-w-fit"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-lg font-bold text-gray-900 font-mono flex items-center gap-2"
            animate={{ 
              textShadow: [
                '0 0 0px rgba(59, 130, 246, 0)',
                '0 0 8px rgba(59, 130, 246, 0.3)',
                '0 0 0px rgba(59, 130, 246, 0)'
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Clock className="w-4 h-4 text-blue-500" />
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

        {/* Центральная часть - бегущая строка */}
        <div className="flex-1 mx-6">
          <div className="relative overflow-hidden h-6 flex items-center">
            {/* Градиентные маски для плавного появления/исчезновения */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-20" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-20" />
            
            <motion.div
              className="text-sm font-medium text-gray-700 whitespace-nowrap flex items-center"
              key={`${tickerText}-${currentEffect}`}
              initial={{ x: '100%' }}
              animate={{ x: '-100%' }}
              transition={{ 
                duration: 20, 
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <motion.span
                key={tickerText}
                initial={magicEffects[currentEffect]?.variants.initial || { opacity: 0 }}
                animate={magicEffects[currentEffect]?.variants.animate || { opacity: 1 }}
                transition={magicEffects[currentEffect]?.variants.transition || { duration: 0.5 }}
                className="inline-block"
              >
                {tickerText}
              </motion.span>
            </motion.div>
          </div>
        </div>

        {/* Правая часть - иконки */}
        <div className="flex items-center gap-2 min-w-fit">
          {/* Уведомления */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => {
                setShowNotifications(!showNotifications);
                console.log('Notifications clicked, showNotifications:', !showNotifications);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition relative"
              title="Сповіщення"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Сповіщення</h3>
                      <span className="text-xs text-gray-500">{unreadCount} нових</span>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="text-center py-6">
                        <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Немає нових сповіщень</p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {notifications.slice(0, 5).map((notification) => (
                          <motion.div
                            key={notification.id}
                            className={`p-3 rounded-lg border cursor-pointer ${
                              notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              onReadNotification(notification.id);
                              console.log('Notification read:', notification.id);
                            }}
                          >
                            <p className="text-sm text-gray-700 font-medium">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time || 'Тільки що'}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {notifications.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            notifications.forEach(n => onReadNotification(n.id));
                            setShowNotifications(false);
                            console.log('All notifications marked as read');
                          }}
                          className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded transition-colors"
                        >
                          Позначити все як прочитане
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Профиль */}
          <motion.button
            onClick={() => {
              onProfileClick();
              console.log('Profile clicked');
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Профіль"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-5 h-5 text-gray-600" />
          </motion.button>

          {/* Настройки */}
          <motion.button
            onClick={() => {
              onSettingsClick();
              console.log('Settings clicked');
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Налаштування"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </motion.button>

          {/* Выход */}
          <motion.button
            onClick={() => {
              onLogout();
              console.log('Logout clicked');
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Вихід"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
