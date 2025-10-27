import { Button } from '../ui/button';
import { Wrench, Shield, Globe, Calendar, Clock, Youtube, Instagram, Send, Mail, Phone, Smartphone, Laptop, Tablet, MapPin, Circle } from 'lucide-react';
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
  const [fallingOrders, setFallingOrders] = useState<Array<{ 
    id: number; 
    device: string; 
    city: string; 
    amount: number;
    status: 'new' | 'in_progress' | 'completed';
    issue: string;
  }>>([]);
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

  // Генерація падаючих замовлень
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
    const minGap = 20; // Мінімальна відстань між картками
    
    const findFreePosition = (): number => {
      // Збираємо всі поточні позиції
      const positions = fallingOrders.map(order => order.x);
      
      let attempts = 0;
      let newX: number;
      
      do {
        // Генеруємо позицію
        newX = Math.random() * (window.innerWidth * 0.7) + window.innerWidth * 0.15;
        attempts++;
        
        // Перевіряємо відстань від інших карток
        const isTooClose = positions.some(pos => {
          return Math.abs(newX - pos) < (cardWidth + minGap);
        });
        
        if (!isTooClose || attempts > 30) break;
      } while (attempts < 50);
      
      return newX;
    };
    
    const newOrder = () => {
      const freeX = findFreePosition();
      return {
        id: Date.now() + Math.random(),
        device: devices[Math.floor(Math.random() * devices.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        issue: issues[Math.floor(Math.random() * issues.length)],
        y: -100,
        x: freeX
      };
    };

    // Перша хвиля
    if (fallingOrders.length === 0) {
      setFallingOrders([newOrder(), newOrder(), newOrder()]);
    }
    
    const interval = setInterval(() => {
      // Падає по 1-2 елементи з інтервалом
      if (fallingOrders.length < 5) {
        const count = Math.random() > 0.65 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          setTimeout(() => {
            setFallingOrders(prev => [...prev, newOrder()]);
          }, i * 800); // Більший інтервал між двома елементами
        }
      }
    }, 5000); // Кожні 5 секунд
    
    return () => clearInterval(interval);
  }, [fallingOrders]);

  // Накопичення елементів внизу (максимум 7)
  useEffect(() => {
    const timer = setInterval(() => {
      setFallingOrders(prev => {
        if (prev.length > 7) {
          return prev.slice(-7);
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
      
      {/* Падаючі замовлення - покращений дизайн */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
        <AnimatePresence mode="popLayout">
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
                    window.innerHeight * 0.3,  // Третина шляху
                    window.innerHeight * 0.6,  // Дві третини
                    window.innerHeight * 0.82  // Фінальна позиція
                  ],
                  opacity: [0, 0.7, 1, 1],
                  x: [
                    startX,
                    startX + (Math.sin(order.id * 0.08) * 30),
                    startX + (Math.sin(order.id * 0.1) * 50),
                    startX + (Math.sin(order.id * 0.12) * 40)
                  ],
                  rotate: [
                    rotation * 0.2,
                    rotation * 0.6,
                    rotation * 1.0,
                    rotation * 1.2
                  ],
                  scale: [0.85, 0.95, 0.9, 0.88]
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0.6,
                  y: window.innerHeight + 100,
                  transition: { duration: 0.6, ease: "easeIn" }
                }}
                transition={{ 
                  duration: 14 + (Math.random() * 3),
                  times: [0, 0.35, 0.65, 1],
                  ease: ["easeOut", "easeInOut", "easeIn"]
                }}
                className="absolute"
                style={{ 
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
                    minWidth: '250px',
                    maxWidth: '280px',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                  animate={{
                    boxShadow: [
                      "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                      "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                      "0 15px 30px -5px rgba(0, 0, 0, 0.25)"
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

      {/* Верхня панель з мовою і часом */}
      <div className="absolute top-6 left-0 right-0 flex justify-between items-center px-8 z-[100]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(prev => {
              if (prev === 'uk') return 'en';
              if (prev === 'en') return 'ru';
              return 'uk';
            })}
            className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition"
          >
            <Globe className="w-5 h-5" />
            <span className="uppercase font-semibold">{language}</span>
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-foreground/70">
            <Clock className="w-4 h-4" />
            <span className="font-mono">
              {currentTime.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-foreground/70">
            <Calendar className="w-4 h-4" />
            <span className="font-mono">
              {currentTime.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full relative z-[200]"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Wrench className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Repair HUB</h1>
              <p className="text-primary text-lg">Pro</p>
            </div>
          </div>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            {t('common.modernPlatform')}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4"
        >
          <Button size="lg" onClick={() => setIsRegisterModalOpen(true)}>Начать работу</Button>
          <Button size="lg" variant="outline" onClick={() => setIsLoginModalOpen(true)}>Войти</Button>
        </motion.div>

        {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
        {isRegisterModalOpen && <RegisterModal onClose={() => setIsRegisterModalOpen(false)} />}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Shield className="w-4 h-4" />
            <span>Безопасная платформа • Гарантия качества</span>
          </div>

          {/* Соціальні мережі */}
          <div className="flex flex-col gap-6 items-center">
            <div className="flex items-center gap-4">
              <motion.a
                href="https://youtube.com/@repairhub"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
              >
                <Youtube className="w-5 h-5" />
                <span className="text-sm font-medium">YouTube</span>
              </motion.a>

              <motion.a
                href="https://instagram.com/repairhub"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 hover:bg-pink-500/20 transition"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm font-medium">Instagram</span>
              </motion.a>

              <motion.a
                href="https://t.me/repairhub"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition"
              >
                <Send className="w-5 h-5" />
                <span className="text-sm font-medium">Telegram</span>
              </motion.a>
            </div>

            {/* Контакти */}
            <div className="flex flex-col gap-3 text-sm text-foreground/70">
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@repairhub.com</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+380 50 123 4567</span>
              </div>
            </div>

            {/* Копірайт */}
            <div className="text-xs text-foreground/50 pt-4 border-t border-foreground/10 w-full">
              <p>© 2026 Repair HUB Pro. Всі права захищені.</p>
              <p className="mt-2">Зв'яжіться з нами • Підтримка • Політика конфіденційності</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModernLandingPage;