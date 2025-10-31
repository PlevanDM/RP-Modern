import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, MessageSquare, Info, Smartphone, Tablet, Watch } from 'lucide-react';
import { Notification } from '../types';

interface AnimatedMarqueeProps {
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
}

// Функція для отримання іконки з типу сповіщення
const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'order':
      return { Icon: ShoppingCart, category: 'info' };
    case 'message':
      return { Icon: MessageSquare, category: 'info' };
    case 'status':
      return { Icon: Info, category: 'info' };
    case 'rating':
      return { Icon: Star, category: 'success' };
    default:
      return { Icon: Info, category: 'info' };
  }
};

const getNotificationStyles = (category: 'success' | 'info' | 'warning') => {
  switch (category) {
    case 'success':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-800',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600'
      };
    case 'warning':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600'
      };
    default:
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-800',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600'
      };
  }
};

const AnimatedMarquee: React.FC<AnimatedMarqueeProps> = ({ notifications = [], onNotificationClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (notifications.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications]);

  // Не показуємо панель якщо немає сповіщень
  if (notifications.length === 0) {
    return null;
  }

  const currentNotification = notifications[currentIndex];
  const { Icon, category } = getNotificationIcon(currentNotification.type);
  const styles = getNotificationStyles(category as 'success' | 'info' | 'warning');

  const handleClick = () => {
    onNotificationClick?.(currentNotification);
  };

  return (
    <div className="overflow-hidden relative h-10 mt-1 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.button
          key={currentIndex}
          onClick={handleClick}
          initial={{ opacity: 0, y: 30, x: -20, scale: 0.85, rotate: -5 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: -30, x: 20, scale: 0.85, rotate: 5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.34, 1.56, 0.64, 1]
          }}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg ${styles.bg} ${styles.text} shadow-sm hover:shadow-lg transition-all outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          {/* Professional SVG Icon */}
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.1
            }}
            className={`flex items-center justify-center w-8 h-8 rounded-full ${styles.iconBg}`}
          >
            <Icon className={`w-4 h-4 ${styles.iconColor}`} strokeWidth={2.5} />
          </motion.div>
          
          {/* Material Design Text */}
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium tracking-wide"
          >
            {currentNotification.message}
          </motion.span>
        </motion.button>
      </AnimatePresence>

      {/* Animated Gadget Icons Floating Across the Plane */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { Icon: Smartphone, delay: 0, x: '10%', y: '20%' },
          { Icon: Tablet, delay: 0.3, x: '70%', y: '30%' },
          { Icon: Watch, delay: 0.6, x: '40%', y: '60%' },
          { Icon: Info, delay: 0.9, x: '80%', y: '50%' },
        ].map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.15, 0],
              scale: [0, 1, 0],
              y: [0, -30, 0],
              x: [0, Math.sin(index) * 20, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{ left: x, top: y }}
          >
            <Icon className="w-8 h-8 text-blue-400/30" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedMarquee;
