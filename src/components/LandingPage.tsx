import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginModal } from './auth/LoginModal';
import { RegisterModal } from './auth/RegisterModal';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Payment as PaymentIcon, Lock as LockIcon, Bolt as BoltIcon } from '@mui/icons-material';
import { NewReleases as NewIcon, CheckCircle as ReadyIcon, ErrorOutline as UrgentIcon } from '@mui/icons-material';

interface LandingPageProps {
  onLogin?: (user: unknown) => void;
}

// Старые SVG иконки
const ElectricityIcon = () => (
  <svg className="w-12 h-12 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const UsersIcon = () => (
  <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
  </svg>
);

const SecurityIcon = () => (
  <svg className="w-12 h-12 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
  </svg>
);

const ChatIcon = () => (
  <svg className="w-12 h-12 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  </svg>
);

const MobileIcon = () => (
  <svg className="w-12 h-12 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 2H7c-1.1 0-1.99.9-1.99 2v16c0 1.1.89 2 1.99 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5-3H7V4h10v13z"/>
  </svg>
);

const locations = ['Вул. Героїв, 15', 'Пр. Мира, 22', 'Вул. Крещатик, 10', 'Вул. Комарова, 5', 'Вул. Миру, 88'];
const statuses: ('new' | 'ready' | 'urgent')[] = ['new', 'ready', 'urgent'];

const FallingOrders = ({ onOrderAccepted }: { onOrderAccepted?: () => void }) => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Array<{ 
    id: string; 
    delay: number; 
    left: number; 
    duration: number;
    title: string;
    status: 'new' | 'ready' | 'urgent';
    price: number;
    location: string;
  }>>([]);
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const repairTypes = React.useMemo(() => [
    { title: t('landing.orders.repairType0'), icon: 'A' },
    { title: t('landing.orders.repairType1'), icon: 'B' },
    { title: t('landing.orders.repairType2'), icon: 'C' },
    { title: t('landing.orders.repairType3'), icon: 'D' },
    { title: t('landing.orders.repairType4'), icon: 'E' }
  ], [t]);

  useEffect(() => {
    // Початкові замовлення
    const newOrders = Array.from({ length: 15 }, (_, i) => {
      const repairType = repairTypes[Math.floor(Math.random() * repairTypes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return {
        id: `order-${i}`,
        delay: i * 0.3,
        left: Math.random() * 85 + 5,
        duration: 4 + Math.random() * 2,
        title: repairType.title,
        status,
        price: 1500 + Math.floor(Math.random() * 4000),
        location: locations[Math.floor(Math.random() * locations.length)]
      };
    });
    setOrders(newOrders);

    // Постійно додавати нові замовлення
    const interval = setInterval(() => {
      setOrders(prev => {
        const repairType = repairTypes[Math.floor(Math.random() * repairTypes.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const newOrder = {
          id: `order-${Date.now()}`,
          delay: 0,
          left: Math.random() * 85 + 5,
          duration: 4 + Math.random() * 2,
          title: repairType.title,
          status,
          price: 1500 + Math.floor(Math.random() * 4000),
          location: locations[Math.floor(Math.random() * locations.length)]
        };
        // Зберігаємо максимум 25 замовлень
        return [...prev.slice(-24), newOrder];
      });
    }, 700);

    // Collision detection for particle breaking
    const checkCollisions = () => {
      const textElement = document.getElementById('falling-text');
      const container = textElement?.closest('.absolute') as HTMLElement;
      
      if (!textElement || !container) return;

      const textRect = textElement.getBoundingClientRect();
      const containerRect = container.parentElement?.getBoundingClientRect();
      
      if (!containerRect) return;

      document.querySelectorAll('.falling-order').forEach(orderEl => {
        const orderRect = orderEl.getBoundingClientRect();
        
        // Check if order collides with text area
        if (
          orderRect.bottom > textRect.top - 20 &&
          orderRect.top < textRect.bottom + 20 &&
          orderRect.right > textRect.left - 20 &&
          orderRect.left < textRect.right + 20
        ) {
          // Create particle burst effect
          const letters = t('landing.orders.instruction').split('');
          letters.forEach((letter, idx) => {
            if (Math.random() > 0.4) { // 60% of letters burst
              const particle = document.createElement('div');
              particle.className = 'text-particle';
              particle.textContent = letter;
              
              // Position relative to container
              const offsetX = textRect.left - containerRect.left;
              const offsetY = textRect.top - containerRect.top;
              
              particle.style.left = `${offsetX + (idx * 8) % (textRect.width || 100)}px`;
              particle.style.top = `${offsetY + (idx * 3) % (textRect.height || 50)}px`;
              
              // Random burst direction
              const angle = Math.random() * Math.PI * 2;
              const distance = 50 + Math.random() * 100;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance - 50;
              
              particle.style.setProperty('--tx', `${tx}px`);
              particle.style.setProperty('--ty', `${ty}px`);
              
              container.appendChild(particle);
              
              setTimeout(() => particle.remove(), 800);
            }
          });
        }
      });
    };

    const collisionInterval = setInterval(checkCollisions, 50);

    return () => {
      clearInterval(interval);
      clearInterval(collisionInterval);
    };
  }, [repairTypes, t]);

  const getStatusColor = (status: 'new' | 'ready' | 'urgent') => {
    switch(status) {
      case 'new': return 'bg-blue-500';
      case 'ready': return 'bg-green-500';
      case 'urgent': return 'bg-red-500';
    }
  };

  const getStatusLabel = (status: 'new' | 'ready' | 'urgent') => {
    switch(status) {
      case 'new': return 'Нове';
      case 'ready': return 'Готове';
      case 'urgent': return 'Терміново';
    }
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 via-blue-25 to-transparent rounded-2xl overflow-hidden border border-blue-200">
      <style>{`
        @keyframes fallDown {
          from {
            opacity: 1;
            transform: translateY(-50px) rotateZ(-2deg);
          }
          50% {
            transform: translateY(180px) rotateZ(1deg);
          }
          to {
            opacity: 0;
            transform: translateY(400px) rotateZ(-1deg);
          }
        }
        .falling-order {
          animation: fallDown var(--duration, 4s) ease-in forwards;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .falling-order:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
        }

      `}</style>

      {/* Background Blur Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-10 left-1/2 w-36 h-36 bg-blue-400 rounded-full blur-3xl opacity-10"></div>

      {/* Animated Orders */}
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => setSelectedOrder(order)}
          className="falling-order absolute w-64 bg-white rounded-lg shadow-lg p-3 border border-blue-200"
          style={{
            left: `${order.left}%`,
            top: '-80px',
            '--duration': `${order.duration}s`
          } as React.CSSProperties}
        >
          <div className="flex items-start gap-2">
            <div className={`w-10 h-10 ${getStatusColor(order.status)} rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
              {order.status === 'new' && <NewIcon sx={{ fontSize: 20 }} />}
              {order.status === 'ready' && <ReadyIcon sx={{ fontSize: 20 }} />}
              {order.status === 'urgent' && <UrgentIcon sx={{ fontSize: 20 }} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{order.title}</p>
              <p className="text-xs text-gray-600 truncate">{order.location}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-blue-600 font-medium">₴{order.price}</p>
                <span className={`text-xs font-bold text-white px-2 py-0.5 rounded ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            <p className="text-gray-600 text-lg font-semibold">{t('landing.orders.instruction')}</p>
          </div>
        </div>
      </div>

      {/* Modal with Order Details */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{selectedOrder.title}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 text-sm">📍 Місце</span>
                <span className="font-medium text-gray-900">{selectedOrder.location}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 text-sm">💰 Ціна</span>
                <span className="text-lg font-bold text-blue-600">₴{selectedOrder.price}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 text-sm">📊 Статус</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusLabel(selectedOrder.status)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedOrder(null);
                onOrderAccepted?.();
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Прийняти замовлення
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export function LandingPage({ onLogin: _onLogin }: LandingPageProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { t, i18n } = useTranslation();
  const [_currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Listen for language changes from i18n
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
      console.log('LandingPage language changed to:', lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Параллакс эффект больше не нужен
  useEffect(() => {
    const handleScroll = () => {
      // This effect is no longer needed as scrollY is removed.
      // Keeping the function definition for now, but it will not be called.
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Масив функцій для ленивого обчислення при зміні мови
  const getFeatures = useCallback(() => [
    {
      icon: <ElectricityIcon />,
      title: t('features.manageOrders.title'),
      description: t('features.manageOrders.description')
    },
    {
      icon: <UsersIcon />,
      title: t('features.findWorkers.title'),
      description: t('features.findWorkers.description')
    },
    {
      icon: <AnalyticsIcon />,
      title: t('features.analytics.title'),
      description: t('features.analytics.description')
    },
    {
      icon: <SecurityIcon />,
      title: t('features.security.title'),
      description: t('features.security.description')
    },
    {
      icon: <ChatIcon />,
      title: t('features.chat.title'),
      description: t('features.chat.description')
    },
    {
      icon: <MobileIcon />,
      title: t('features.mobileVersion.title'),
      description: t('features.mobileVersion.description')
    }
  ], [t]);

  // Мемоізований масив функцій з залежністю від мови
  const features = React.useMemo(() => getFeatures(), [getFeatures]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
              RP
            </div>
            <span>RepairHub</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium transition"
            >
              Вхід
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
            >
              Реєстрація
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('landing.hero.title')}
            </h1>
            <p className="text-2xl text-blue-600 font-semibold mb-6">
              {t('landing.hero.subtitle')}
            </p>
            <p className="text-lg text-gray-600 mb-8">
              {t('landing.hero.description')}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowRegister(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition flex items-center gap-2 text-lg"
              >
                {t('landing.hero.cta')} <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition text-lg"
              >
                {t('landing.hero.cta_secondary')}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              ✓ {t('landing.hero.benefits.commission')}  ✓ {t('landing.hero.benefits.fair')}  ✓ {t('landing.hero.benefits.daily')}
            </p>
          </div>
          <div className="hidden md:block">
            <FallingOrders onOrderAccepted={() => setShowRegister(true)} />
          </div>
        </div>
      </section>



      {/* Escrow Payment Highlight Section */}
      <section className="py-12 px-4 bg-white">
        <style>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
            }
            50% {
              box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
            }
          }
          .card-animate {
            animation: slideInUp 0.6s ease-out forwards;
          }
          .card-1 { animation-delay: 0.1s; }
          .card-2 { animation-delay: 0.2s; }
          .card-3 { animation-delay: 0.3s; }
          .card-4 { animation-delay: 0.4s; }
          .icon-animate {
            animation: rotate 20s linear infinite;
          }
          .card-hover {
            transition: all 0.3s ease;
          }
          .card-hover:hover {
            animation: pulse-glow 1s infinite;
            transform: translateY(-5px);
          }
          
          .crypto-item {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          
          .crypto-item:hover {
            transform: scale(1.1);
          }
          
          .crypto-item:hover > div:first-child {
            filter: brightness(1.3) drop-shadow(0 0 20px currentColor);
          }
          
          .crypto-item svg {
            animation: cryptoFloat 3s ease-in-out infinite, cryptoPulse 2s ease-in-out infinite;
          }
          
          .crypto-item:nth-child(1) svg {
            animation-delay: 0s, 0s;
          }
          
          .crypto-item:nth-child(2) svg {
            animation-delay: 0.4s, 0.3s;
          }
          
          .crypto-item:nth-child(3) svg {
            animation-delay: 0.8s, 0.6s;
          }
          
          @keyframes cryptoFloat {
            0%, 100% {
              transform: translateY(0) rotateZ(0deg);
            }
            25% {
              transform: translateY(-12px) rotateZ(-3deg);
            }
            50% {
              transform: translateY(-18px) rotateZ(0deg);
            }
            75% {
              transform: translateY(-8px) rotateZ(3deg);
            }
          }
          
          @keyframes cryptoPulse {
            0%, 100% {
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
            }
            50% {
              filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
            }
          }
          
          @keyframes cryptoRotate {
            0% {
              transform: rotateY(0deg) rotateZ(0deg) scale(1);
            }
            50% {
              transform: rotateY(180deg) rotateZ(10deg) scale(1.1);
            }
            100% {
              transform: rotateY(360deg) rotateZ(0deg) scale(1);
            }
          }
        `}</style>
        
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t('landing.escrow.title')}</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-4">
              {t('landing.escrow.subtitle')}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">{t('landing.escrow.what_is')}</span> {t('landing.escrow.what_is_desc')} <span className="font-semibold">{t('landing.escrow.safe')}</span>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="card-animate card-1 bg-white rounded-xl p-6 shadow-md border border-gray-200 card-hover">
              <div className="icon-animate text-5xl mb-3 inline-block">
                <PaymentIcon sx={{ fontSize: 48, color: '#3b82f6' }} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('landing.escrow.payment_methods.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ {t('landing.escrow.payment_methods.card')}</li>
                <li>✓ {t('landing.escrow.payment_methods.monobank')}</li>
                <li>✓ {t('landing.escrow.payment_methods.crypto')}</li>
              </ul>
            </div>

            <div className="card-animate card-2 bg-white rounded-xl p-6 shadow-md border border-gray-200 card-hover">
              <div className="icon-animate text-5xl mb-3 inline-block">
                <LockIcon sx={{ fontSize: 48, color: '#10b981' }} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('landing.escrow.guarantee.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ {t('landing.escrow.guarantee.safe')}</li>
                <li>✓ {t('landing.escrow.guarantee.no_access')}</li>
                <li>✓ {t('landing.escrow.guarantee.automatic')}</li>
              </ul>
            </div>

            <div className="card-animate card-3 bg-white rounded-xl p-6 shadow-md border border-gray-200 card-hover">
              <div className="icon-animate text-5xl mb-3 inline-block">
                <BoltIcon sx={{ fontSize: 48, color: '#f59e0b' }} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('landing.escrow.fast.title')}</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ {t('landing.escrow.fast.instant')}</li>
                <li>✓ {t('landing.escrow.fast.commission')}</li>
                <li>✓ {t('landing.escrow.fast.no_delays')}</li>
              </ul>
            </div>
          </div>

          <div className="card-animate card-4 bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center card-hover">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('landing.escrow.crypto.title')}</h3>
            <div className="flex justify-center gap-8 mb-4">
              <div className="crypto-item">
                <PaymentIcon sx={{ fontSize: 48, color: '#f59e0b' }} />
              </div>
              <div className="crypto-item">
                <BoltIcon sx={{ fontSize: 48, color: '#3b82f6' }} />
              </div>
              <div className="crypto-item">
                <LockIcon sx={{ fontSize: 48, color: '#10b981' }} />
              </div>
            </div>
            <p className="text-sm text-gray-600">{t('landing.escrow.crypto.description')}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('landing.features.title')}</h2>
            <p className="text-xl text-gray-600">{t('landing.features.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Часті запитання</h2>
            <p className="text-xl text-gray-600">Найбільш поширені питання та відповіді</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Як зареєструватися на платформі?</h3>
              <p className="text-gray-600 mb-4">Для реєстрації вам потрібно натиснути кнопку "Реєстрація" у верхньому правому куті та заповнити форму з необхідними даними.</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Як знайти робітника для ремонту?</h3>
              <p className="text-gray-600 mb-4">Ви можете скористатися пошуком за ключовими словами, наприклад "ремонт iPhone", "ремонт ноутбуків", або переглянути список активних майстрів на головній сторінці.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Як оплатити замовлення через Escrow?</h3>
              <p className="text-gray-600 mb-4">Після прийняття замовлення, ви можете скористатися різними методами оплати, такими як картка, Monobank або криптовалюта. Всі платежі проходять через безпечну систему Escrow, яка захищає ваші кошти.</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Як оцінити робітника?</h3>
              <p className="text-gray-600 mb-4">Після завершення роботи ви можете залишити відгук та оцінити майстра за 5 зірок. Це допоможе іншим клієнтам зробити правильний вибір.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">{t('footer.product')}</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">{t('footer.features')}</a></li>
                <li><a href="#" className="hover:text-blue-600">{t('footer.pricing')}</a></li>
                <li><a href="#" className="hover:text-blue-600">{t('footer.security')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">{t('footer.about')}</a></li>
                <li><a href="#" className="hover:text-blue-600">{t('footer.blog')}</a></li>
                <li><a href="#" className="hover:text-blue-600">{t('footer.contact')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">{t('footer.terms')}</a></li>
                <li><a href="#" className="hover:text-blue-600">{t('footer.privacy')}</a></li>
                <li><a href="#" className="hover:text-blue-600">{t('footer.cookies')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">{t('footer.contacts')}</h4>
              <p className="text-gray-600">{t('footer.phone')}</p>
              <p className="text-gray-600">{t('footer.email')}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
}
















