import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NotificationItem {
  icon: string;
  text: string;
  delay: number;
  effect: 'fade' | 'bounce' | 'scale' | 'rotate';
}

const notifications: NotificationItem[] = [
  { icon: '📱', text: 'Нове замовлення #1234', delay: 0, effect: 'fade' },
  { icon: '🔧', text: 'Повідомлення від майстра', delay: 0.2, effect: 'bounce' },
  { icon: '✨', text: 'Замовлення #5678 завершено', delay: 0.4, effect: 'scale' },
  { icon: '⭐', text: 'Отримано новий відгук', delay: 0.6, effect: 'rotate' },
];

const getRandomEffect = () => {
  const effects: NotificationItem['effect'][] = ['fade', 'bounce', 'scale', 'rotate'];
  return effects[Math.floor(Math.random() * effects.length)];
};

const AnimatedMarquee: React.FC = () => {
  const [animatedNotifications, setAnimatedNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    // Initialize with random effects
    const items = notifications.map(item => ({
      ...item,
      effect: getRandomEffect(),
    }));
    setAnimatedNotifications(items);

    // Change random item every 3 seconds
    const interval = setInterval(() => {
      setAnimatedNotifications(prev => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const newItems = [...prev];
        newItems[randomIndex] = {
          ...newItems[randomIndex],
          effect: getRandomEffect(),
        };
        return newItems;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAnimationProps = (effect: NotificationItem['effect']) => {
    switch (effect) {
      case 'fade':
        return {
          animate: { opacity: [0.5, 1, 0.5] },
          transition: { duration: 2, repeat: Infinity },
        };
      case 'bounce':
        return {
          animate: { y: [0, -5, 0] },
          transition: { duration: 1.5, repeat: Infinity },
        };
      case 'scale':
        return {
          animate: { scale: [1, 1.2, 1] },
          transition: { duration: 1.5, repeat: Infinity },
        };
      case 'rotate':
        return {
          animate: { rotate: [0, 360] },
          transition: { duration: 2, repeat: Infinity, ease: 'linear' },
        };
      default:
        return {};
    }
  };

  return (
    <div className="overflow-hidden relative h-6 mt-1">
      <div className="animate-marquee whitespace-nowrap text-sm text-gray-600 flex items-center gap-3">
        {animatedNotifications.map((item, index) => (
          <motion.span
            key={index}
            {...getAnimationProps(item.effect)}
            className="inline-flex items-center gap-1"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.text}</span>
          </motion.span>
        ))}
        <span className="mx-2">•</span>
        {animatedNotifications.map((item, index) => (
          <motion.span
            key={`dup-${index}`}
            {...getAnimationProps(item.effect)}
            className="inline-flex items-center gap-1"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.text}</span>
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default AnimatedMarquee;
