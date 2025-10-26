import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LanguageSwitcher from '../LanguageSwitcher';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { LoginModal } from '../auth/LoginModal';
import {
  Wrench, Search, Shield, Users, Star, ArrowRight, Smartphone, CheckCircle, Target, Zap, User
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
    if (onLogin) {
      onLogin('client1');
    }
  };

  const handleQuickLogin = (userId: string) => {
    if (onLogin) {
      onLogin(userId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b bg-background/95 backdrop-blur">
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
            <Button variant="default" onClick={handleLogin}>
              Увійти
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Мост між майстрами та клієнтами
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Платформа де майстри знаходять роботу, а клієнти — професійних ремонтників
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={handleCreateOrder}>
                Створити замовлення
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={handleLogin}>
                Увійти
              </Button>
            </div>

            {/* Quick Login */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3">Тестові акаунти:</p>
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

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <Card>
              <CardContent className="p-6">
                <Search className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Майстри знаходять роботу</h3>
                <p className="text-muted-foreground">
                  Замість пошуку на досках оголошень, отримуйте замовлення напряму
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Target className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Клієнти знаходять майстрів</h3>
                <p className="text-muted-foreground">
                  Швидко знайдіть перевіреного майстра для свого пристрою
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <CheckCircle className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Передпродажні тести</h3>
                <p className="text-muted-foreground">
                  Перевірте пристрій перед покупкою на OLX або інших майданчиках
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Майстрів</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Smartphone className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">2000+</p>
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Почніть зараз</h2>
                <p className="text-muted-foreground mb-6">
                  Майстр — отримуй замовлення. Клієнт — знаходи ремонт.
                </p>
                <Button size="lg" onClick={handleCreateOrder}>
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
