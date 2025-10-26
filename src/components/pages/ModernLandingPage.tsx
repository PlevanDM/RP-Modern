import React from 'react';
import { motion } from 'framer-motion';
import LanguageSwitcher from '../LanguageSwitcher';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  Wrench, Zap, Shield, Users, Star, ArrowRight, Smartphone, Package, Clock, Award, TrendingUp
} from 'lucide-react';

interface LandingPageProps {
  onLogin?: () => void;
}

const ModernLandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const handleLogin = () => {
    console.log('Login clicked');
    if (onLogin) {
      onLogin();
    } else {
      console.log('No login handler');
    }
  };

  const handleCreateOrder = () => {
    console.log('Create order clicked');
    if (onLogin) {
      onLogin();
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
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="px-8" onClick={handleCreateOrder}>
                Створити замовлення
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8" onClick={handleLogin}>
                Увійти
              </Button>
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
    </div>
  );
};

export default ModernLandingPage;
