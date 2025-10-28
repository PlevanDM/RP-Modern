import { Button } from '../ui/button';
import { Wrench, Shield, Globe, Calendar, Clock, Youtube, Instagram, Send, Mail, Phone, Smartphone, Laptop, Tablet, MapPin, Circle, CreditCard, Star, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { LoginModal } from '../auth/LoginModal';
import { RegisterModal } from '../auth/RegisterModal';
import { useState, useEffect, useRef } from 'react';

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
    
    const cardWidth = 300; // Ширина картки
    const minGap = 40; // Мінімальна відстань між картками
    const availableWidth = window.innerWidth * 0.7; // 70% ширини екрану
    const startX = window.innerWidth * 0.15; // Початок зони
    
    // Створюємо "слоти" для позиціонування
    const slots: number[] = [];
    for (let x = startX; x <= startX + availableWidth - cardWidth; x += cardWidth + minGap) {
      slots.push(x);
    }
    
    const findFreeSlot = (usedPositions: number[]): number => {
      // Шукаємо вільний слот
      for (const slot of slots) {
        const isFree = !usedPositions.some(pos => Math.abs(pos - slot) < cardWidth + minGap);
        if (isFree) return slot;
      }
      
      // Якщо всі слоти зайняті, генеруємо випадкову позицію з більшою відстанню
      let newX: number;
      let attempts = 0;
      do {
        newX = Math.random() * availableWidth + startX;
        const isFarEnough = usedPositions.every(pos => {
          return Math.abs(newX - pos) > (cardWidth + minGap);
        });
        attempts++;
        if (isFarEnough || attempts > 100) break;
      } while (attempts < 100);
      
      return newX;
    };
    
    const newOrder = (usedSlots: number[] = []) => {
      const freeX = findFreeSlot(usedSlots);
      
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
        x: freeX,
        weight: weight,
        velocity: velocity,
        bounce: bounce
      };
    };

    // Перша хвиля - 5 карток
    const initial: FallingOrder[] = [];
    const usedSlots: number[] = [];
    
    for (let i = 0; i < 5; i++) {
      const order = newOrder(usedSlots);
      initial.push(order);
      usedSlots.push(order.x);
    }
    setFallingOrders(initial);
    
    const interval = setInterval(() => {
      // Падає по 1 елементу
      setFallingOrders(prev => {
        if (prev.length >= 7) return prev;
        
        const usedSlots = prev.map(order => order.x);
        const newOrderData = newOrder(usedSlots);
        return [...prev, newOrderData];
      });
    }, 2500); // Кожні 2.5 секунди
    
    return () => clearInterval(interval);
  }, []); // Видалено залежність від fallingOrders.length

  // Накопичення елементів внизу - не більше 8
  useEffect(() => {
    const timer = setInterval(() => {
      setFallingOrders(prev => {
        if (prev.length > 8) {
          // Видаляємо найстаріші
          return prev.slice(-8);
        }
        return prev;
      });
    }, 1500);
    return () => clearInterval(timer);
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
              'from-blue-500/20 to-purple-500/20 border-blue-400/30',
              'from-green-500/20 to-teal-500/20 border-green-400/30',
              'from-purple-500/20 to-pink-500/20 border-purple-400/30',
              'from-orange-500/20 to-red-500/20 border-orange-400/30'
            ];
            const textColors = [
              'text-blue-300',
              'text-green-300',
              'text-purple-300',
              'text-orange-300'
            ];
            const colorIndex = index % colors.length;
            
            return (
              <motion.div
                key={order.id}
                layoutId={`order-${order.id}`}
                initial={{ 
                  y: -300, 
                  x: startX, 
                  opacity: 0,
                  scale: 0.8,
                  rotate: rotation
                }}
                animate={{ 
                  y: [
                    -200,
                    window.innerHeight * 0.3,  // 30% шляху
                    window.innerHeight * 0.55,  // 55%
                    window.innerHeight * 0.75,  // 75%
                    window.innerHeight * 0.82,  // Зупинка
                    window.innerHeight * 0.78 + (order.bounce * 50),  // Відскок вгору
                    window.innerHeight * 0.82  // Фінальна позиція
                  ],
                  opacity: [0, 0.7, 1, 1, 1, 0.9],
                  x: startX, // Фіксована X-позиція для кожного елемента
                  rotate: [
                    rotation * 0.1,
                    rotation * 0.4,
                    rotation * 0.7,
                    rotation * 1.0,  // До відскоку
                    rotation * 1.1,  // Відскок
                    rotation * 1.0   // Фінал
                  ],
                  scale: [0.85, 0.95, 0.92, 0.9, 0.93, 0.9]
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0.6,
                  y: window.innerHeight + 100,
                  transition: { duration: 0.6, ease: "easeIn" }
                }}
                transition={{ 
                  duration: (10 / order.velocity) + (Math.random() * 3 / order.velocity), // Важкіші швидше
                  times: [0, 0.25, 0.5, 0.7, 0.8, 1],
                  ease: ["easeInOut", "easeOut", "easeIn", "easeOut", "easeInOut", "easeInOut"]
                }}
                className="absolute"
                style={{ 
                  left: `${startX}px`,
                  willChange: 'transform',
                  filter: 'blur(0.4px) brightness(0.95)',
                  opacity: 0.85,
                  pointerEvents: 'none'
                }}
              >
                <motion.div 
                  className={`
                    backdrop-blur-md bg-gradient-to-br ${colors[colorIndex]} 
                    border ${colors[colorIndex].split(' ')[2]}
                    px-4 py-3 rounded-2xl shadow-2xl
                    flex items-center gap-3
                    transition-all duration-300
                    transform-gpu
                  `}
                  whileHover={{ scale: 1.08, y: -3 }}
                  style={{
                    minWidth: `${250 + (order.weight * 10)}px`,
                    maxWidth: `${280 + (order.weight * 15)}px`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    fontSize: `${14 + (order.weight * 2)}px`
                  }}
                  animate={{
                    boxShadow: [
                      `0 ${20 + (order.weight * 5)}px ${25 + (order.weight * 10)}px -5px rgba(0, 0, 0, ${0.2 + (order.weight * 0.1)}), 0 ${10 + (order.weight * 3)}px ${10 + (order.weight * 5)}px -5px rgba(0, 0, 0, 0.1)`,
                      `0 ${25 + (order.weight * 8)}px ${50 + (order.weight * 15)}px -12px rgba(0, 0, 0, ${0.3 + (order.weight * 0.15)}), 0 0 0 1px rgba(255, 255, 255, 0.05)`,
                      `0 ${15 + (order.weight * 5)}px ${30 + (order.weight * 10)}px -5px rgba(0, 0, 0, ${0.25 + (order.weight * 0.1)})`
                    ],
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="relative">
                    <Icon className={`w-6 h-6 ${textColors[colorIndex]} animate-pulse`} />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className={`font-bold ${textColors[colorIndex]} text-sm leading-tight`}>
                      {order.device}
                    </div>
                    <div className={`text-xs font-medium ${textColors[colorIndex]}/90 opacity-90`}>
                      {order.issue}
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1 pt-1 border-t border-white/10">
                      <div className="flex items-center gap-1.5 text-xs text-foreground/70">
                        <MapPin className="w-3.5 h-3.5 opacity-70" />
                        <span className="font-medium">{order.city}</span>
                      </div>
                      <div className={`font-bold text-sm px-2 py-0.5 rounded-md ${
                        order.status === 'new' ? 'bg-green-500/20 text-green-300' : 
                        order.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-300' : 
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        ₴{order.amount.toLocaleString('uk-UA')}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col items-end gap-1">
                    <motion.div
                      className={`w-2.5 h-2.5 rounded-full ${
                        order.status === 'new' ? 'bg-green-400' : 
                        order.status === 'in_progress' ? 'bg-yellow-400' : 
                        'bg-blue-400'
                      }`}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className={`text-[10px] ${
                      order.status === 'new' ? 'text-green-300' : 
                      order.status === 'in_progress' ? 'text-yellow-300' : 
                      'text-blue-300'
                    }`}>
                      {order.status === 'new' ? 'Нове' : 
                       order.status === 'in_progress' ? 'В роботі' : 
                       'Готово'}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Верхня панель з мовою і часом - Анімація */}
      <motion.div 
        className="absolute top-6 left-0 right-0 flex justify-between items-center px-8 z-[100]"
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

        <div className="flex items-center gap-6 text-sm">
          <motion.div 
            className="flex items-center gap-2 text-foreground/70"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="w-4 h-4" />
            <span className="font-mono">
              {currentTime.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
          <div className="flex items-center gap-2 text-foreground/70">
            <Calendar className="w-4 h-4" />
            <span className="font-mono">
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
                className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center"
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
                  <Wrench className="w-7 h-7 text-primary-foreground" />
                </motion.div>
              </motion.div>
            </motion.div>
            <div>
              <motion.h1 
                className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
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
                className="text-primary text-lg"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Pro
              </motion.p>
            </div>
          </div>
          <motion.p 
            className="text-muted-foreground text-xl max-w-2xl mx-auto"
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
          className="flex justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" onClick={() => setIsRegisterModalOpen(true)}>Начать работу</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="outline" onClick={() => setIsLoginModalOpen(true)}>Войти</Button>
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

            {/* Карточки з перевагами */}
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
              {/* Безпечна оплата */}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Lock className="w-4 h-4" />
                <span className="text-xs">Безпечна оплата після виконання</span>
              </motion.div>

              {/* Рейтинг майстрів */}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Star className="w-4 h-4" />
                <span className="text-xs">Підвірені майстри з рейтингом 4.5+</span>
              </motion.div>

              {/* Гарантія */}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs">Гарантія на послуги 30 днів</span>
              </motion.div>

              {/* Комісія (завуальовано) */}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-xs">Мінімальна комісія платформи</span>
              </motion.div>

              {/* Швидке вирішення */}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Clock className="w-4 h-4" />
                <span className="text-xs">Швидке вирішення питань 24/7</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Соціальні мережі */}
          <div className="flex flex-col gap-6 items-center">
            <div className="flex items-center gap-4">
              <motion.a
                href="https://youtube.com/@repairhub"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -4, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <Youtube className="w-5 h-5 relative z-10" />
                <span className="text-sm font-medium relative z-10">YouTube</span>
              </motion.a>

              <motion.a
                href="https://instagram.com/repairhub"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -4, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 hover:bg-pink-500/20 transition relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                <Instagram className="w-5 h-5 relative z-10" />
                <span className="text-sm font-medium relative z-10">Instagram</span>
              </motion.a>

              <motion.a
                href="https://t.me/repairhub"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -4, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
                <Send className="w-5 h-5 relative z-10" />
                <span className="text-sm font-medium relative z-10">Telegram</span>
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