import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LanguageSwitcher from '../LanguageSwitcher';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { LoginModal } from '../auth/LoginModal';
import {
  Wrench, Zap, Shield, Users, Star, ArrowRight, Smartphone, Package, Clock, Award, TrendingUp, User, MessageCircle
} from 'lucide-react';

interface LandingPageProps {
  onLogin?: (userId: string) => void;
}

const ModernLandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCreateOrder = () => {
    // Quick login as client
    if (onLogin) {
      onLogin('client1'); // Client ID
    }
  };

  const handleQuickLogin = (userId: string) => {
    console.log('Quick login with userId:', userId);
    if (onLogin) {
      onLogin(userId);
    }
  };

  const handleTelegramLogin = () => {
    // Telegram widget will be loaded
    if ((window as any).Telegram?.Login?.auth) {
      (window as any).Telegram.Login.auth(
        {bot_id: 'YOUR_BOT_ID', request_access: true},
        (data: any) => {
          if (onLogin) {
            onLogin('client1'); // Login as client with Telegram data
          }
        }
      );
    } else {
      // Fallback: direct login
      if (onLogin) {
        onLogin('client1');
      }
    }
  };

  const handleGoogleLogin = () => {
    // Google OAuth simulation
    if (onLogin) {
      onLogin('client1');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Wrench className="w-6 h-6" />
            </div>
            <span className="text-xl font-semibold">RepairHub Pro</span>
          </motion.div>
          
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <Button variant="default" size="default" onClick={handleLogin}>
              Увійти
            </Button>
          </div>
        </div>
      </header>

      {/* Hero - Compact */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Професійний ремонт мобільних пристроїв
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Швидкий, якісний та надійний сервіс
            </p>
            <div className="flex gap-4 justify-center mb-6">
              <Button size="lg" className="px-8" onClick={handleCreateOrder}>
                Створити замовлення
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8" onClick={handleLogin}>
                Увійти
              </Button>
            </div>
            
            {/* Social Login */}
            <div className="space-y-3 mb-4">
              <p className="text-sm text-muted-foreground text-center">Або увійдіть через:</p>
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="outline" 
                  className="px-6"
                  onClick={handleTelegramLogin}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Telegram
                </Button>
                <Button 
                  variant="outline" 
                  className="px-6"
                  onClick={handleGoogleLogin}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.93 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
              </div>
            </div>

            {/* Quick Login Options */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-2 text-center">Тестові акаунти:</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm" onClick={() => handleQuickLogin('client1')}>
                  <User className="w-4 h-4 mr-2" />
                  Клієнт
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleQuickLogin('master1')}>
                  <Wrench className="w-4 h-4 mr-2" />
                  Майстер
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleQuickLogin('admin1')}>
                  <Shield className="w-4 h-4 mr-2" />
                  Адмін
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats - Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Клієнтів</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Wrench className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">1000+</p>
                <p className="text-sm text-muted-foreground">Ремонтів</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">4.9/5</p>
                <p className="text-sm text-muted-foreground">Рейтинг</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">Підтримка</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <Card>
              <CardContent className="p-6">
                <Shield className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Гарантія якості</h3>
                <p className="text-muted-foreground">6 місяців гарантії на ремонт</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Clock className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Швидкий сервіс</h3>
                <p className="text-muted-foreground">Ремонт за 1-3 дні</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Smartphone className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Багато брендів</h3>
                <p className="text-muted-foreground">Apple, Samsung, Xiaomi</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Готові почати?</h2>
                <p className="text-muted-foreground mb-6">
                  Створіть замовлення зараз
                </p>
                <Button size="lg" className="px-12" onClick={handleCreateOrder}>
                  Створити замовлення
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 RepairHub Pro. Всі права захищені.
        </div>
      </footer>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default ModernLandingPage;
