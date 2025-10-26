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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-900/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Wrench className="w-6 h-6" />
            </div>
            <span className="text-xl font-semibold text-white">RepairHub Pro</span>
          </motion.div>
          
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <Button variant="secondary" onClick={handleLogin}>
              Увійти
            </Button>
          </div>
        </div>
      </header>

      {/* Split Screen */}
      <div className="flex h-screen pt-16">
        {/* MASTER SIDE */}
        <motion.div
          className={`flex-1 relative overflow-hidden border-r border-white/20 transition-all duration-300 ${
            hoveredSide === 'master' ? 'bg-blue-900/30' : 'bg-blue-950/20'
          }`}
          onHoverStart={() => setHoveredSide('master')}
          onHoverEnd={() => setHoveredSide(null)}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <Wrench className="w-24 h-24 mx-auto text-blue-400 mb-4" />
              </motion.div>
              
              <h2 className="text-5xl font-bold text-white mb-4">
                МАЙСТЕР
              </h2>
              
              <p className="text-xl text-blue-200 mb-6">
                Отримуй замовлення напряму без пошуку роботи
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-left bg-blue-900/30 rounded-lg p-4 backdrop-blur">
                  <Target className="w-6 h-6 text-blue-300" />
                  <div>
                    <p className="font-semibold text-white">Прямі замовлення</p>
                    <p className="text-sm text-blue-200">Вони самі приходять до тебе</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-left bg-blue-900/30 rounded-lg p-4 backdrop-blur">
                  <TrendingUp className="w-6 h-6 text-blue-300" />
                  <div>
                    <p className="font-semibold text-white">Стабільний дохід</p>
                    <p className="text-sm text-blue-200">Постійний потік клієнтів</p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleQuickLogin('master1')}
              >
                Ввійти як майстер
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Falling Orders Animation */}
          {orders.map((order) => (
            <motion.div
              key={order.id}
              className="absolute top-0"
              initial={{ y: -50, opacity: 1 }}
              animate={{ y: '100vh', opacity: 0 }}
              transition={{ duration: 3, ease: 'easeIn' }}
              style={{ left: `${order.x}%` }}
            >
              <Package className="w-8 h-8 text-blue-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* DIVIDER */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-1 h-32 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
          />
        </div>

        {/* CLIENT SIDE */}
        <motion.div
          className={`flex-1 relative overflow-hidden transition-all duration-300 ${
            hoveredSide === 'client' ? 'bg-purple-900/30' : 'bg-purple-950/20'
          }`}
          onHoverStart={() => setHoveredSide('client')}
          onHoverEnd={() => setHoveredSide(null)}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <DollarSign className="w-24 h-24 mx-auto text-purple-400 mb-4" />
              </motion.div>
              
              <h2 className="text-5xl font-bold text-white mb-4">
                КЛІЄНТ
              </h2>
              
              <p className="text-xl text-purple-200 mb-6">
                Економ свій час і гроші на якісному ремонті
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-left bg-purple-900/30 rounded-lg p-4 backdrop-blur">
                  <Sparkles className="w-6 h-6 text-purple-300" />
                  <div>
                    <p className="font-semibold text-white">Перевірені майстри</p>
                    <p className="text-sm text-purple-200">Професійне обслуговування</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-left bg-purple-900/30 rounded-lg p-4 backdrop-blur">
                  <DollarSign className="w-6 h-6 text-purple-300" />
                  <div>
                    <p className="font-semibold text-white">Економія до 40%</p>
                    <p className="text-sm text-purple-200">Конкуренція майстрів</p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => handleQuickLogin('client1')}
              >
                Ввійти як клієнт
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Money Saving Animation */}
          <motion.div
            className="absolute top-20 right-20"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <DollarSign className="w-12 h-12 text-green-400" />
          </motion.div>
          
          <motion.div
            className="absolute top-40 right-40"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <DollarSign className="w-8 h-8 text-green-400" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 left-20"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <DollarSign className="w-10 h-10 text-green-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Footer with Test Accounts */}
      <footer className="fixed bottom-0 w-full border-t border-white/10 bg-slate-900/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-gray-400">Тестові акаунти:</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickLogin('client1')}
              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Клієнт
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickLogin('master1')}
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              <Wrench className="w-4 h-4 mr-2" />
              Майстер
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickLogin('admin1')}
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
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