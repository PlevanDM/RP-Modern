import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import {
  Wrench,
  Zap,
  Shield,
  Users,
  Star,
  ArrowRight,
  Smartphone,
  Play,
  Award,
  Heart,
  Target,
  Phone,
  Mail,
  MapPin,
  User,
  Briefcase,
  Bell,
  DollarSign,
  Globe,
  MessageSquare,
  BarChart3,
  Crown,
  TrendingUp,
  Battery,
  Laptop,
  Tablet,
  Camera,
  Headphones,
  Gamepad2,
  Helicopter
} from 'lucide-react';

// Анимированные частицы
const FloatingParticles: React.FC = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-primary/20 to-primary/5"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.5, 1],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Анимированные заказы
const AnimatedOrders: React.FC = () => {
  const orders = [
    { text: "iPhone 15 Pro - замена экрана", icon: <Smartphone className="w-4 h-4" />, color: "from-blue-500/30" },
    { text: "Samsung Galaxy - ремонт батареи", icon: <Battery className="w-4 h-4" />, color: "from-green-500/30" },
    { text: "MacBook Pro - диагностика", icon: <Laptop className="w-4 h-4" />, color: "from-gray-500/30" },
    { text: "iPad Air - замена дисплея", icon: <Tablet className="w-4 h-4" />, color: "from-purple-500/30" },
    { text: "Xiaomi - ремонт камеры", icon: <Camera className="w-4 h-4" />, color: "from-orange-500/30" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orders.map((order, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ 
            y: -100, 
            opacity: 0, 
            x: Math.random() * 100 - 50, 
            rotate: Math.random() * 30 - 15 
          }}
          animate={{ 
            y: window.innerHeight + 100, 
            opacity: [0, 1, 1, 0], 
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50], 
            rotate: [0, Math.random() * 30 - 15, Math.random() * 30 - 15] 
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            delay: index * 2, 
            repeat: Infinity, 
            repeatDelay: 5, 
            ease: "linear" 
          }}
          style={{ left: `${Math.random() * 100}%` }}
        >
          <motion.div 
            className={`bg-gradient-to-r ${order.color} to-transparent backdrop-blur-sm rounded-2xl p-4 text-sm text-white border border-white/20 shadow-lg`} 
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                {order.icon}
              </motion.div>
              <span className="font-medium">{order.text}</span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Анимированный логотип
const AnimatedLogo: React.FC = () => (
  <motion.div 
    initial={{ scale: 0, rotate: -180 }} 
    animate={{ scale: 1, rotate: 0 }} 
    transition={{ duration: 2, ease: "easeOut" }} 
    className="relative inline-block" 
    whileHover={{ scale: 1.15, rotate: 5 }}
  >
    <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center shadow-2xl shadow-primary/40">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/40 to-transparent" 
      />
      <motion.div 
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }} 
        transition={{ duration: 4, repeat: Infinity }} 
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/60 to-accent/40" 
      />
      <motion.div 
        animate={{ 
          rotate: [0, 360], 
          scale: [1, 1.2, 1] 
        }} 
        transition={{ 
          rotate: { duration: 10, repeat: Infinity, ease: "linear" }, 
          scale: { duration: 3, repeat: Infinity } 
        }}
      >
        <Wrench className="w-12 h-12 text-white relative z-10" />
      </motion.div>
    </div>
  </motion.div>
);

// Карточка статистики
const StatCard: React.FC<{ value: string; label: string; icon: React.ReactNode; delay?: number; trend?: string }> = ({ 
  value, 
  label, 
  icon, 
  delay = 0, 
  trend 
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 60, scale: 0.8 }} 
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} 
      transition={{ duration: 1, delay, type: "spring", stiffness: 100 }} 
      whileHover={{ y: -15, scale: 1.08, transition: { duration: 0.4 } }} 
      className="relative group"
    >
      <Card className="h-full border-border/50 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl hover:bg-background transition-all duration-700 hover:shadow-2xl hover:shadow-primary/30 overflow-hidden">
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center gap-6">
            <motion.div 
              className="p-5 rounded-3xl bg-gradient-to-br from-primary/25 to-accent/15 text-primary group-hover:from-primary/35 group-hover:to-accent/25 transition-all duration-700" 
              whileHover={{ rotate: 360, scale: 1.1 }} 
              transition={{ duration: 0.8 }}
            >
              {icon}
            </motion.div>
            <div>
              <div className="text-5xl font-bold text-foreground mb-2">{value}</div>
              <div className="text-sm text-muted-foreground font-medium">{label}</div>
              {trend && (
                <div className="text-xs text-green-500 font-semibold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {trend}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Главная секция
const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeRole, setActiveRole] = useState<'client' | 'master'>('client');

  const handleQuickSwitch = (role: string) => {
    let userData;
    
    switch (role) {
      case 'client':
        userData = {
          id: 'client1',
          name: 'Анна Коваленко',
          fullName: 'Анна Коваленко',
          role: 'client',
          avatar: 'https://i.pravatar.cc/96?img=1',
          rating: 4.8,
          email: 'anna.kovalenko@gmail.com',
          phone: '+380501234567',
          verified: true,
          city: 'Київ',
          balance: 15000,
          skills: [],
          specialization: 'Client'
        };
        break;
      case 'master':
        userData = {
          id: 'master1',
          name: 'Олександр Петренко',
          fullName: 'Олександр Петренко',
          role: 'master',
          avatar: 'https://i.pravatar.cc/96?img=4',
          rating: 4.9,
          email: 'alex.petrenko@repair.ua',
          phone: '+380501234567',
          verified: true,
          city: 'Київ',
          skills: ['iPhone', 'iPad', 'MacBook'],
          specialization: 'Екрани iPhone',
          experience: '5 років',
          completedOrders: 1247,
          balance: 25000
        };
        break;
      case 'admin':
        userData = {
          id: 'admin1',
          name: 'Адміністратор',
          fullName: 'Адміністратор Системи',
          role: 'admin',
          avatar: 'https://i.pravatar.cc/96?img=10',
          rating: 5.0,
          email: 'admin@repairhub.pro',
          phone: '+380991234567',
          verified: true,
          city: 'Платформа',
          skills: ['all'],
          specialization: 'Системне адміністрування',
          balance: 0
        };
        break;
    }

    const newAuthState = {
      state: {
        currentUser: userData,
        isOnboardingCompleted: true
      },
      version: 0
    };
    
    localStorage.setItem('auth-storage', JSON.stringify(newAuthState));
    window.location.reload();
  };

  const clientContent = {
    title: "Знайдіть майстра",
    subtitle: "за 5 хвилин",
    description: "Швидко. Якісно. Надійно.",
    fullDescription: "Підключіться до мережі перевірених майстрів або знайдіть клієнтів для свого бізнесу",
    cta: "Знайти майстра",
    icon: <Smartphone className="w-6 h-6" />
  };

  const masterContent = {
    title: "Заробляйте на ремонті",
    subtitle: "обладнання",
    description: "Швидко. Якісно. Надійно.",
    fullDescription: "Підключіться до мережі перевірених майстрів або знайдіть клієнтів для свого бізнесу",
    cta: "Стати майстром",
    icon: <Wrench className="w-6 h-6" />
  };

  const currentContent = activeRole === 'client' ? clientContent : masterContent;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/98 to-primary/8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <FloatingParticles />
        <AnimatedOrders />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, type: "spring", stiffness: 100 }} 
          className="flex items-center justify-between mb-20"
        >
          <div className="flex items-center gap-6">
            <AnimatedLogo />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/90 to-accent bg-clip-text text-transparent">
                RepairHub Pro
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                Професійна платформа ремонту пристроїв
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-primary/25 to-accent/15 text-primary border-primary/40 px-6 py-3 text-lg font-bold"
            >
              🔥 Найкращі майстри України
            </Badge>
          </div>
        </motion.div>

        {/* Role Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }} 
          className="flex justify-center mb-20"
        >
          <div className="bg-gradient-to-r from-background/90 to-background/70 backdrop-blur-xl rounded-3xl p-4 border border-border/60 shadow-2xl shadow-primary/20">
            <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as 'client' | 'master')}>
              <TabsList className="grid w-full grid-cols-2 bg-transparent">
                <TabsTrigger 
                  value="client" 
                  className="flex items-center gap-4 px-8 py-4 rounded-2xl font-bold text-lg"
                >
                  <User className="w-6 h-6" />
                  Клієнт
                </TabsTrigger>
                <TabsTrigger 
                  value="master" 
                  className="flex items-center gap-4 px-8 py-4 rounded-2xl font-bold text-lg"
                >
                  <Wrench className="w-6 h-6" />
                  Майстер
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="text-center max-w-6xl mx-auto mb-24">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeRole} 
              initial={{ opacity: 0, y: 60, scale: 0.9 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: -60, scale: 0.9 }} 
              transition={{ duration: 1, type: "spring", stiffness: 100 }} 
              className="mb-16"
            >
              <h1 className="text-7xl md:text-8xl font-bold mb-10">
                <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  {currentContent.title}
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary/90 to-accent/70 bg-clip-text text-transparent">
                  {currentContent.subtitle}
                </span>
              </h1>
              <p className="text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto font-medium">
                {currentContent.description}
              </p>
              <p className="text-xl text-muted-foreground/80 max-w-5xl mx-auto leading-relaxed">
                {currentContent.fullDescription}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 100 }} 
            className="flex flex-col sm:flex-row gap-8 justify-center mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-primary/90 to-accent text-white px-12 py-6 text-2xl font-bold shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all duration-500 rounded-2xl"
              >
                {currentContent.icon}
                <span className="ml-3">{currentContent.cta}</span>
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-3"
                >
                  <ArrowRight className="w-7 h-7" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="border-3 border-primary/40 px-12 py-6 text-2xl font-bold hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/5 transition-all duration-500 rounded-2xl backdrop-blur-sm"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-3"
                >
                  <Play className="w-7 h-7" />
                </motion.div>
                Демо
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-3"
                >
                  <ArrowRight className="w-7 h-7" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Quick Switch */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 1, type: "spring", stiffness: 100 }} 
            className="bg-gradient-to-r from-background/90 to-background/70 backdrop-blur-xl rounded-3xl p-10 border border-border/60 shadow-2xl shadow-primary/20"
          >
            <p className="text-2xl text-muted-foreground mb-8 font-bold">
              Швидкий перехід:
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="secondary" 
                  onClick={() => handleQuickSwitch('client')}
                  className="px-8 py-4 text-lg font-bold"
                >
                  👤 Клієнт
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="secondary" 
                  onClick={() => handleQuickSwitch('master')}
                  className="px-8 py-4 text-lg font-bold"
                >
                  🔧 Майстер
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="secondary" 
                  onClick={() => handleQuickSwitch('admin')}
                  className="px-8 py-4 text-lg font-bold"
                >
                  👨‍💼 Адміністратор
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          <StatCard 
            value="500+" 
            label="Майстрів онлайн" 
            icon={<Users className="w-10 h-10" />} 
            trend="+12% за місяць"
          />
          <StatCard 
            value="10K+" 
            label="Задоволених клієнтів" 
            icon={<Heart className="w-10 h-10" />} 
            trend="+25% за місяць"
          />
          <StatCard 
            value="25K+" 
            label="Успішних ремонтів" 
            icon={<Award className="w-10 h-10" />} 
            trend="+18% за місяць"
          />
          <StatCard 
            value="4.9★" 
            label="Середній рейтинг" 
            icon={<Star className="w-10 h-10" />} 
            trend="+0.2 за місяць"
          />
        </div>
      </div>
    </div>
  );
};

// Секция уникальных возможностей
const UniqueFeaturesSection: React.FC = () => {
  const uniqueFeatures = [
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: "Розширений чат з файлами",
      description: "Обмінюйтесь фото, документами, пропозиціями та реакціями прямо в чаті",
      highlight: "ТОП ФУНКЦІЯ 2026"
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "AI Аналітика доходів",
      description: "Штучний інтелект аналізує ваші заробітки та дає рекомендації",
      highlight: "AI 2026"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Правова захист",
      description: "Повна система захисту від шахрайства з юридичними угодами",
      highlight: "БЕЗПЕКА"
    },
    {
      icon: <Crown className="w-12 h-12" />,
      title: "Адмін-панель 2026",
      description: "Найсучасніша адміністративна панель з AI та реальним часом",
      highlight: "ПРЕМІУМ"
    }
  ];

  return (
    <div className="py-32 bg-gradient-to-br from-primary/10 via-background to-accent/5 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.12) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.18) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.12) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.h2
            className="text-6xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            Унікальні можливості 2026
          </motion.h2>
          <p className="text-3xl text-muted-foreground max-w-4xl mx-auto font-medium">
            Технології майбутнього вже сьогодні
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {uniqueFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: index * 0.3, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="relative group"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="h-full border-border/50 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl hover:border-primary/60 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/30 overflow-hidden ring-2 ring-primary/20">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <motion.div 
                      className="p-6 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/20 w-fit group-hover:from-primary/40 group-hover:to-accent/30 transition-all duration-700" 
                      whileHover={{ scale: 1.2, rotate: 360 }} 
                      transition={{ duration: 0.8 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                        {feature.title}
                      </h3>
                      <Badge className="mt-2 bg-gradient-to-r from-primary/25 to-accent/15 text-primary border-primary/40">
                        {feature.highlight}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <p className="text-muted-foreground text-xl leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// CTA секция
const CTASection: React.FC = () => {
  return (
    <div className="py-32 bg-gradient-to-br from-primary/15 via-background to-accent/10 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.20) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            className="text-6xl font-bold mb-10 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            Готові розпочати?
          </motion.h2>
          <motion.p
            className="text-3xl text-muted-foreground mb-16 font-medium"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Приєднуйтеся до тисяч задоволених користувачів
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary via-primary/90 to-accent hover:from-primary/90 hover:via-primary/80 hover:to-accent/90 text-white px-16 py-8 text-2xl font-bold shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all duration-500 rounded-2xl"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="mr-4"
                >
                  <Smartphone className="w-8 h-8" />
                </motion.div>
                Замовити ремонт
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-4"
                >
                  <ArrowRight className="w-8 h-8" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-3 border-primary/50 hover:bg-gradient-to-r hover:from-primary/15 hover:to-accent/10 px-16 py-8 text-2xl font-bold hover:border-primary/70 transition-all duration-500 rounded-2xl backdrop-blur-sm"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mr-4"
                >
                  <Wrench className="w-8 h-8" />
                </motion.div>
                Стати майстром
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-4"
                >
                  <ArrowRight className="w-8 h-8" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="bg-gradient-to-r from-background/90 to-background/70 backdrop-blur-xl rounded-3xl p-12 border border-border/60 shadow-2xl shadow-primary/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-foreground">Ремонтуємо всі бренди</h3>
            <motion.p
              className="text-muted-foreground text-xl"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Apple, Samsung, Xiaomi, Huawei та багато інших
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Футер
const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-background/95 to-background/85 backdrop-blur-xl border-t border-border/60 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 10% 10%, rgba(120, 119, 198, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 90% 90%, rgba(120, 119, 198, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 10% 10%, rgba(120, 119, 198, 0.05) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-6">
            <AnimatedLogo />
            <div>
              <motion.p
                className="font-bold text-foreground text-2xl"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                RepairHub Pro
              </motion.p>
              <p className="text-lg text-muted-foreground font-medium">
                Професійна платформа ремонту
              </p>
            </div>
          </div>
          <div className="flex items-center gap-12 text-lg text-muted-foreground">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-6 h-6" />
              <span className="font-medium">+380 (44) 123-45-67</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-6 h-6" />
              <span className="font-medium">info@repairhub.pro</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-6 h-6" />
              <span className="font-medium">Київ, Україна</span>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="mt-16 pt-8 border-t border-border/60 text-center text-lg text-muted-foreground"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <p className="font-medium">© 2024 RepairHub Pro. Всі права захищені.</p>
        </motion.div>
      </div>
    </footer>
  );
};

// Главный компонент
const TopLandingPage: React.FC = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <UniqueFeaturesSection />
    <CTASection />
    <Footer />
  </div>
);

export default TopLandingPage;