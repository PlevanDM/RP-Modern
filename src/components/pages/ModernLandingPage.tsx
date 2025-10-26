import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LanguageSwitcher from '../LanguageSwitcher';
import { Button } from '../ui/button';
import { LoginModal } from '../auth/LoginModal';
import {
  Wrench, ArrowRight, Package, DollarSign, TrendingUp, Sparkles, Target, Users, User, Shield
} from 'lucide-react';

interface LandingPageProps {
  onLogin?: (userId: string) => void;
}

const ModernLandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'master' | 'client' | null>(null);
  const [orders, setOrders] = useState<Array<{ id: number; x: number; opacity: number }>>([]);

  // Генерація падаючих замовлень
  const generateOrder = () => {
    const newOrder = {
      id: Date.now(),
      x: Math.random() * 100,
      opacity: 1
    };
    setOrders(prev => [...prev, newOrder]);
    
    setTimeout(() => {
      setOrders(prev => prev.filter(o => o.id !== newOrder.id));
    }, 3000);
  };

  React.useEffect(() => {
    if (hoveredSide === 'master') {
      const interval = setInterval(generateOrder, 800);
      return () => clearInterval(interval);
    }
  }, [hoveredSide]);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleQuickLogin = (userId: string) => {
    if (onLogin) {
      onLogin(userId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white">
              <Wrench className="w-6 h-6" />
            </div>
            <span className="text-xl font-semibold text-gray-900">RepairHub Pro</span>
          </motion.div>
          
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <Button variant="default" onClick={handleLogin}>
              Увійти
            </Button>
          </div>
        </div>
      </header>

      {/* Split Screen with Diagonal Design */}
      <div className="h-screen pt-16 relative overflow-hidden">
        {/* MASTER SIDE - Left side with angled cut */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            clipPath: hoveredSide === 'master' 
              ? 'polygon(0 0, 55% 0, 45% 100%, 0 100%)'
              : 'polygon(0 0, 52% 0, 42% 100%, 0 100%)'
          }}
        >
          <div 
            className={`h-full transition-all duration-300 cursor-pointer ${
              hoveredSide === 'master' 
                ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                : 'bg-gradient-to-br from-gray-100 to-gray-200'
            }`}
            onMouseEnter={() => setHoveredSide('master')}
            onMouseLeave={() => setHoveredSide(null)}
            onClick={() => handleQuickLogin('master1')}
          >
            <div className="h-full flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              {/* Falling Orders */}
              {hoveredSide === 'master' && orders.map((order) => (
                <motion.div
                  key={order.id}
                  className="absolute top-0"
                  initial={{ y: -50, opacity: 1 }}
                  animate={{ y: '100vh', opacity: 0 }}
                  transition={{ duration: 3, ease: 'easeIn' }}
                  style={{ left: `${order.x}%` }}
                >
                  <Package className="w-8 h-8 text-white/30" />
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md z-10"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: hoveredSide === 'master' ? 1.1 : 1 }}
                  className="mb-6"
                >
                  <Wrench className={`w-24 h-24 mx-auto mb-4 ${hoveredSide === 'master' ? 'text-white' : 'text-gray-400'}`} />
                </motion.div>
                
                <h2 className={`text-5xl font-bold mb-4 ${hoveredSide === 'master' ? 'text-white' : 'text-gray-700'}`}>
                  МАЙСТЕР
                </h2>
                
                <p className={`text-xl mb-6 ${hoveredSide === 'master' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {hoveredSide === 'master' ? 'Отримуй замовлення напряму' : 'Потрібні замовлення без пошуку'}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CLIENT SIDE - Right side with angled cut */}
        <motion.div
          className="absolute top-0 right-0 w-full h-full"
          style={{
            clipPath: hoveredSide === 'client'
              ? 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)'
              : 'polygon(48% 0, 100% 0, 100% 100%, 42% 100%)'
          }}
        >
          <div 
            className={`h-full transition-all duration-300 cursor-pointer ${
              hoveredSide === 'client'
                ? 'bg-gradient-to-br from-purple-500 to-purple-600'
                : 'bg-gradient-to-br from-gray-200 to-gray-300'
            }`}
            onMouseEnter={() => setHoveredSide('client')}
            onMouseLeave={() => setHoveredSide(null)}
            onClick={() => handleQuickLogin('client1')}
          >
            <div className="h-full flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              {/* Floating Money */}
              {hoveredSide === 'client' && (
                <>
                  <motion.div
                    className="absolute top-20 right-20"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <DollarSign className="w-12 h-12 text-white/30" />
                  </motion.div>
                  <motion.div
                    className="absolute top-40 right-40"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <DollarSign className="w-8 h-8 text-white/20" />
                  </motion.div>
                </>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md z-10"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: hoveredSide === 'client' ? 1.1 : 1 }}
                  className="mb-6"
                >
                  <DollarSign className={`w-24 h-24 mx-auto mb-4 ${hoveredSide === 'client' ? 'text-white' : 'text-gray-500'}`} />
                </motion.div>
                
                <h2 className={`text-5xl font-bold mb-4 ${hoveredSide === 'client' ? 'text-white' : 'text-gray-700'}`}>
                  КЛІЄНТ
                </h2>
                
                <p className={`text-xl mb-6 ${hoveredSide === 'client' ? 'text-purple-100' : 'text-gray-500'}`}>
                  {hoveredSide === 'client' ? 'Економ час і гроші' : 'Знайди перевіреного майстра'}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Center Divider Line */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-1 h-32 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"
          />
        </div>
      </div>

      {/* Footer with Test Accounts */}
      <footer className="fixed bottom-0 w-full border-t bg-white/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-gray-500">Тестові акаунти:</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickLogin('client1')}
              className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Клієнт
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickLogin('master1')}
              className="border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white"
            >
              <Wrench className="w-4 h-4 mr-2" />
              Майстер
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickLogin('admin1')}
              className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
            >
              <Shield className="w-4 h-4 mr-2" />
              Адмін
            </Button>
          </div>
        </div>
      </footer>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default ModernLandingPage;