import { Button } from '../ui/button';
import { Wrench, Shield, Globe, Calendar, Clock, Youtube, Instagram, Send, Mail, Phone, Smartphone, Laptop, Tablet, MapPin, Circle, CreditCard, Star, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { LoginModal } from '../auth/LoginModal';
import { RegisterModal } from '../auth/RegisterModal';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LandingPageProps {}

const ModernLandingPage: React.FC<LandingPageProps> = () => {
  const t = useTranslation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [language, setLanguage] = useState<'uk' | 'en' | 'ru'>('uk');
  interface FallingOrder {
    id: number; 
    device: string; 
    city: string; 
    amount: number;
    status: 'new' | 'in_progress' | 'completed';
    issue: string;
    y: number;
    x: number;
    weight: number; // Вага оголошення (1-3)
    velocity: number; // Швидкість падіння
    bounce: number; // Коефіцієнт відскоку
  }
  
  const [fallingOrders, setFallingOrders] = useState<FallingOrder[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Контентна зона (центр екрану)
  const contentBounds = {
    top: window.innerHeight * 0.25,
    bottom: window.innerHeight * 0.75,
    left: window.innerWidth * 0.2,
    right: window.innerWidth * 0.8
  };

  // Оновлення часу
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Генерація падаючих замовлень - без накладання
  useEffect(() => {
    const devices = [
      'iPhone 15 Pro', 'iPhone 14', 'iPhone 13 Pro Max', 'iPhone 12',
      'Samsung S23 Ultra', 'Samsung S22', 'Samsung S21', 'Samsung A54',
      'Xiaomi 13 Pro', 'Xiaomi 12', 'Xiaomi Redmi Note 12',
      'iPad Air', 'iPad Pro',
      'MacBook Pro 14"', 'MacBook Air M2',
      'Huawei P50', 'OnePlus 11'
    ];
    const cities = ['Київ', 'Львів', 'Харків', 'Одеса', 'Дніпро', 'Запоріжжя', 'Вінниця'];
    const issues = [
      'Заміна екрану', 'Заміна батареї', 'Ремонт камери', 'Чистка від води',
      'Заміна порту', 'Програмне забезпечення', 'Діагностика', 'Ремонт кнопок'
    ];
    const statuses: Array<'new' | 'in_progress' | 'completed'> = ['new', 'in_progress', 'completed'];
    const amounts = [1200, 1500, 1800, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
    
    const cardWidth = 280;
    
    // Випадкова позиція по всій ширині екрану (з відступами)
    const getRandomX = (): number => {
      const padding = 50; // Відступи з боків
      const minX = padding;
      const maxX = window.innerWidth - cardWidth - padding;
      return Math.random() * (maxX - minX) + minX;
    };
    
    const newOrder = (): FallingOrder => {
      // Випадкова позиція по всій площі екрану
      const randomX = getRandomX();
      
      // Визначаємо вагу на основі типу пристрою і суми
      const deviceType = devices[Math.floor(Math.random() * devices.length)];
      const amountValue = amounts[Math.floor(Math.random() * amounts.length)];
      
      // Важчі пристрої (MacBook, iPad) мають більшу вагу
      let weight = 1;
      if (deviceType.includes('MacBook') || deviceType.includes('Pro')) {
        weight = 3;
      } else if (deviceType.includes('iPad')) {
        weight = 2;
      } else if (deviceType.includes('iPhone')) {
        weight = 1.5;
      }
      
      // Вища сума = легше (оптимістичний настрій)
      const weightMultiplier = amountValue > 4000 ? 0.8 : 1;
      weight *= weightMultiplier;
      
      // Швидкість залежить від ваги (важкіші падають швидше)
      const velocity = 0.5 + (weight * 0.15); // 0.5-0.95
      
      // Відскок залежить від ваги (важкіші менше відскакують)
      const bounce = 1.0 - (weight * 0.15); // 0.7-1.0
      
      return {
        id: Date.now() + Math.random(),
        device: deviceType,
        city: cities[Math.floor(Math.random() * cities.length)],
        amount: amountValue,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        issue: issues[Math.floor(Math.random() * issues.length)],
        y: -100,
        x: randomX,
        weight: weight,
        velocity: velocity,
        bounce: bounce
      };
    };

    // Нескінченний фоновий ефект - постійно падають і зникають
    const generateCard = () => {
      const order = newOrder();
      setFallingOrders(prev => [...prev, order]);
    };

    // Генеруємо 8-10 карток на старті
    for (let i = 0; i < 8; i++) {
      setTimeout(() => generateCard(), i * 400);
    }

    // Додаємо нові картки кожні 1.5-2 секунди
    const addInterval = setInterval(() => {
      generateCard();
    }, 2000);

    // Видаляємо старі картки після анімації (після 8 секунд)
    const removeInterval = setInterval(() => {
      setFallingOrders(prev => {
        if (prev.length > 10) {
          return prev.slice(prev.length - 10);
        }
        return prev;
      });
    }, 2000);
    
    return () => {
      clearInterval(addInterval);
      clearInterval(removeInterval);
    };
  }, []);

  // Зона скуповування внизу екрану
  const collectionZone = {
    top: window.innerHeight * 0.85,
    bottom: window.innerHeight,
    left: 0,
    right: window.innerWidth
  };


  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Підкладка для падаючих елементів */}
      <div className="absolute inset-0 bg-background/50 z-[1]" />
      
      {/* Падаючі замовлення - тільки у верхній половині */}
      <div className="absolute inset-0 pointer-events-none z-[2]" style={{ height: '60%' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {fallingOrders.map((order, index) => {
            const startX = order.x;
            const rotation = (Math.random() * 10 - 5);
            const delay = index * 1.5; // Збільшена затримка між елементами
            
            // Визначаємо іконку на основі пристрою
            const getIcon = () => {
              const device = order.device.toLowerCase();
              if (device.includes('iphone') || device.includes('samsung') || device.includes('xiaomi')) return Smartphone;
              if (device.includes('ipad') || device.includes('tablet')) return Tablet;
              if (device.includes('macbook') || device.includes('laptop')) return Laptop;
              return Smartphone;
            };
            
            const Icon = getIcon();
            const colors = [
              'from-gray-100/80 to-gray-200/80 border-gray-300/40',
              'from-gray-100/80 to-gray-200/80 border-gray-300/40',
              'from-gray-100/80 to-gray-200/80 border-gray-300/40',
              'from-gray-100/80 to-gray-200/80 border-gray-300/40'
            ];
            const textColors = [
              'text-gray-700',
              'text-gray-700',
              'text-gray-700',
              'text-gray-700'
            ];
            const colorIndex = index % colors.length;
            const finalY = window.innerHeight * 0.82;
            
            return (
              <motion.div
                key={order.id}
                layoutId={`order-${order.id}`}
                initial={{ 
                  y: -300, 
                  x: startX, 
                  opacity: 0,
                  scale: 0.8,
                  rotate: rotation * 0.2
                }}
                animate={{ 
                  y: finalY,
                  opacity: 0.85,
                  scale: 0.9,
                  rotate: rotation,
                }}
                exit={{ 
                  opacity: 0,
                  y: window.innerHeight + 100,
                  scale: 0.6,
                  transition: { duration: 0.3, ease: "easeIn" }
                }}
                transition={{ 
                  duration: 8 + (Math.random() * 3),
                  ease: "easeOut",
                  delay: index * 0.05
                }}
                className="absolute"
                style={{ 
                  left: `${startX}px`,
                  pointerEvents: 'none',
                  filter: 'blur(0.3px)'
                }}
              >
                <motion.div 
                  className={`
                    backdrop-blur-sm bg-white/90 
                    border border-gray-300
                    px-3 py-2 rounded-lg shadow-lg
                    flex items-center gap-2
                    transition-all duration-200
                    transform-gpu
                  `}
                  style={{
                    minWidth: `${200 + (order.weight * 10)}px`,
                    maxWidth: `${230 + (order.weight * 15)}px`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    fontSize: `${13 + (order.weight * 1)}px`
                  }}
                  animate={{
                    boxShadow: [
                      `0 4px 8px rgba(0, 0, 0, 0.08)`,
                      `0 6px 12px rgba(0, 0, 0, 0.1)`,
                      `0 4px 8px rgba(0, 0, 0, 0.08)`
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="relative">
                    <Icon className={`w-5 h-5 text-gray-600`} />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="font-bold text-gray-900 text-sm leading-tight">
                      {order.device}
                    </div>
                    <div className="text-xs text-gray-600">
                      {order.issue}
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1 pt-1 border-t border-gray-200">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="font-medium">{order.city}</span>
                      </div>
                      <div className="font-bold text-sm text-gray-900">
                        ₴{order.amount.toLocaleString('uk-UA')}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Верхня панель з мовою і часом - Анімація */}
      <motion.div 
            className="absolute top-4 sm:top-6 left-0 right-0 flex justify-between items-center px-4 sm:px-8 z-[100]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="flex items-center gap-3">
          <motion.button
            onClick={() => setLanguage(prev => {
              if (prev === 'uk') return 'en';
              if (prev === 'en') return 'ru';
              return 'uk';
            })}
            className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition px-3 py-2 rounded-lg hover:bg-background/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}>
              <Globe className="w-5 h-5" />
            </motion.div>
            <span className="uppercase font-semibold">{language}</span>
          </motion.button>
        </motion.div>

        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
          <motion.div 
            className="flex items-center gap-1 sm:gap-2 text-foreground/70"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-mono hidden sm:inline">
              {currentTime.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
          <div className="flex items-center gap-1 sm:gap-2 text-foreground/70">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-mono text-xs sm:text-sm">
              {currentTime.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full relative z-[200]"
      >
        {/* Header - Покращені анімації */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div 
              className="relative"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 40px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Wrench className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                </motion.div>
              </motion.div>
            </motion.div>
            <div>
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
              >
                Repair HUB
              </motion.h1>
              <motion.p 
                className="text-primary text-base sm:text-lg md:text-xl"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Pro
              </motion.p>
            </div>
          </div>
          <motion.p 
            className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {t('common.modernPlatform')}
          </motion.p>
        </motion.div>

        {/* CTA Buttons - З анімаціями */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto" onClick={() => setIsRegisterModalOpen(true)}>Начать работу</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => setIsLoginModalOpen(true)}>Войти</Button>
          </motion.div>
        </motion.div>

        {isLoginModalOpen && (
          <LoginModal 
            onClose={() => setIsLoginModalOpen(false)} 
            onSwitchToRegister={() => {
              setIsLoginModalOpen(false);
              setTimeout(() => setIsRegisterModalOpen(true), 100);
            }}
          />
        )}
        {isRegisterModalOpen && (
          <RegisterModal 
            onClose={() => setIsRegisterModalOpen(false)} 
            onSwitchToLogin={() => {
              setIsRegisterModalOpen(false);
              setTimeout(() => setIsLoginModalOpen(true), 100);
            }}
          />
        )}

        {/* Footer - З анімаціями */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          {/* Блок з перевагами платформи */}
          <motion.div 
            className="flex flex-col gap-4 items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Заголовок */}
            <motion.div 
              className="flex items-center justify-center gap-2 text-muted-foreground mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <Shield className="w-4 h-4" />
              </motion.div>
              <span>Безопасная платформа • Гарантия качества</span>
            </motion.div>

            {/* Карточки з перевагами - топові анімації */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 max-w-7xl px-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              {[
                { icon: Lock, text: 'Безпечна оплата', gradient: 'from-emerald-50 to-emerald-100' },
                { icon: Star, text: 'Рейтинг 4.5+', gradient: 'from-amber-50 to-amber-100' },
                { icon: CheckCircle2, text: 'Гарантія 30 днів', gradient: 'from-blue-50 to-blue-100' },
                { icon: CreditCard, text: 'Мінімальна комісія', gradient: 'from-purple-50 to-purple-100' },
                { icon: Clock, text: 'Підтримка 24/7', gradient: 'from-cyan-50 to-cyan-100' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg border border-gray-200 bg-gradient-to-br ${item.gradient} backdrop-blur-sm cursor-pointer relative overflow-hidden text-xs sm:text-sm`}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        mass: 1
                      }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, -2, 2, 0],
                    transition: { 
                      type: "spring",
                      stiffness: 300,
                      damping: 10
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Шimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "linear"
                      }
                    }}
                  />
                  
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      transition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <item.icon className="w-4 h-4 text-gray-700 relative z-10" />
                  </motion.div>
                  <span className="text-xs font-medium text-gray-800 relative z-10">{item.text}</span>
                  
                  {/* Magnetic effect background */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 bg-white/20 blur-xl"
                    whileHover={{ scale: 2 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Соціальні мережі - топові анімації з magnetic hover */}
          <div className="flex flex-col gap-6 items-center px-4">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <motion.a
                href="https://youtube.com/@repairhub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 relative overflow-hidden group w-full sm:w-auto"
                whileHover={{ scale: 1.1, rotateY: 10 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-400/20 via-transparent to-transparent"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  animate={{
                    rotate: [0, 5, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Youtube className="w-4 h-4 text-gray-700 relative z-10" />
                </motion.div>
                <span className="text-sm text-gray-700 relative z-10">YouTube</span>
              </motion.a>

              <motion.a
                href="https://instagram.com/repairhub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 relative overflow-hidden group w-full sm:w-auto"
                whileHover={{ scale: 1.1, rotateY: -10 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 100 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-transparent to-transparent"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  animate={{
                    rotate: [0, -5, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Instagram className="w-4 h-4 text-gray-700 relative z-10" />
                </motion.div>
                <span className="text-sm text-gray-700 relative z-10">Instagram</span>
              </motion.a>

              <motion.a
                href="https://t.me/repairhub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 relative overflow-hidden group w-full sm:w-auto"
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-transparent"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  animate={{
                    x: [0, 3, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Send className="w-4 h-4 text-gray-700 relative z-10" />
                </motion.div>
                <span className="text-sm text-gray-700 relative z-10">Telegram</span>
              </motion.a>
            </div>

            {/* Контакти */}
            <motion.div 
              className="flex flex-col gap-3 text-sm text-foreground/70"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div 
                className="flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div animate={{ rotate: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Mail className="w-4 h-4" />
                </motion.div>
                <span>support@repairhub.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div animate={{ rotate: [0, -15, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                  <Phone className="w-4 h-4" />
                </motion.div>
                <span>+380 50 123 4567</span>
              </motion.div>
            </motion.div>

            {/* Копірайт */}
            <motion.div 
              className="text-xs text-foreground/50 pt-4 border-t border-foreground/10 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <p>© 2026 Repair HUB Pro. Всі права захищені.</p>
              <p className="mt-2">Зв'яжіться з нами • Підтримка • Політика конфіденційності</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModernLandingPage;