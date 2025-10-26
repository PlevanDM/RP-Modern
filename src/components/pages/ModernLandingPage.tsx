import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Wrench, Zap, Shield, Users, Star, ArrowRight, Smartphone
} from 'lucide-react';

const CompactLandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Wrench className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              RepairHub Pro
            </span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button variant="default" size="sm">
              Увійти
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Compact */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
              Професійний ремонт <br />мобільних пристроїв
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Швидкий, якісний та надійний сервіс з ремонту вашого обладнання
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="px-8">
                Створити замовлення
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Дивитися каталог
              </Button>
            </div>
          </motion.div>

          {/* Stats - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            <Card className="p-4 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">500+</p>
              <p className="text-sm text-muted-foreground">Клієнтів</p>
            </Card>
            <Card className="p-4 text-center">
              <Wrench className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">1000+</p>
              <p className="text-sm text-muted-foreground">Ремонтів</p>
            </Card>
            <Card className="p-4 text-center">
              <Star className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">4.9/5</p>
              <p className="text-sm text-muted-foreground">Рейтинг</p>
            </Card>
            <Card className="p-4 text-center">
              <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">24/7</p>
              <p className="text-sm text-muted-foreground">Підтримка</p>
            </Card>
          </motion.div>

          {/* Features - Compact 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Гарантія якості</h3>
              <p className="text-muted-foreground">6 місяців гарантії на всі види ремонту</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Швидкий сервіс</h3>
              <p className="text-muted-foreground">Ремонт за 1-3 дні без черги</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Smartphone className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Багато брендів</h3>
              <p className="text-muted-foreground">Apple, Samsung, Xiaomi та інші</p>
            </Card>
          </motion.div>

          {/* CTA - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center"
          >
            <Card className="p-8 bg-gradient-to-r from-primary/10 to-blue-600/10 border-2 border-primary/20">
              <h2 className="text-3xl font-bold mb-4">Готові почати?</h2>
              <p className="text-muted-foreground mb-6">
                Створіть замовлення прямо зараз
              </p>
              <Button size="lg" className="px-12">
                Створити замовлення
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer - Compact */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 RepairHub Pro. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompactLandingPage;
