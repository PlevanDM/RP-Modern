import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationItem {
  icon: string;
  text: string;
}

const notifications: NotificationItem[] = [
  { icon: '📱', text: 'Нове замовлення #1234' },
  { icon: '🔧', text: 'Повідомлення від майстра' },
  { icon: '✨', text: 'Замовлення #5678 завершено' },
  { icon: '⭐', text: 'Отримано новий відгук' },
  { icon: '💼', text: 'Новий клієнт зареєструвався' },
  { icon: '🎯', text: 'Запропоновано нову ціну' },
];

const AnimatedMarquee: React.FC = () => {
      const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
        const interval = setInterval(() => {
          // Delay the actual switch to allow exit animation
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % notifications.length);
          }, 500);
        }, 4000);

        return () => clearInterval(interval);
      }, []);

  const currentNotification = notifications[currentIndex];

  return (
    <div className="overflow-hidden relative h-8 mt-1 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.8, rotateX: -90 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            rotateX: 0,
          }}
          exit={{ 
            opacity: 0, 
            y: -20, 
            scale: 0.8, 
            rotateX: 90,
          }}
          transition={{
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="flex items-center gap-2 px-4"
        >
          {/* Icon with rotation and glow effect */}
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full blur-md"
            />
            <span className="text-2xl relative z-10">{currentNotification.icon}</span>
          </motion.div>
          
          {/* Text with gradient and shimmer */}
          <motion.span
            animate={{ 
              backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              color: "#374151"
            }}
            className="text-sm font-medium"
          >
            {currentNotification.text}
          </motion.span>

          {/* Pulsing dot indicator */}
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-2 h-2 bg-gray-500 rounded-full"
          />
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default AnimatedMarquee;
