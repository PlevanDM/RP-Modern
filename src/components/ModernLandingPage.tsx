import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Wrench,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  Clock,
  DollarSign,
  BarChart3,
  Smartphone,
  Sparkles,
  Package,
  ArrowRightLeft,
  Play,
  Award,
  Heart,
  Target,
  Rocket,
  Globe,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, icon, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="relative"
    >
      <Card className="border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
              {icon}
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <Card className="h-full border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-6">
          <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 w-fit group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Компонент падающего заказа
const FallingOrder: React.FC<{ delay: number; order: string }> = ({ delay, order }) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0, x: Math.random() * 100 - 50 }}
      animate={{ y: window.innerHeight + 100, opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "linear"
      }}
      className="absolute pointer-events-none z-0"
      style={{ left: `${Math.random() * 100}%` }}
    >
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 backdrop-blur-sm rounded-lg p-3 text-sm text-muted-foreground border border-primary/10">
        {order}
      </div>
    </motion.div>
  );
};

// Компонент анимированного логотипа
const AnimatedLogo: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative inline-block"
    >
      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <Wrench className="w-8 h-8 text-white relative z-10" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/50 to-transparent"
        />
      </div>
    </motion.div>
  );
};

// Компонент героя
const HeroSection: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        setCurrentUser(parsed.state?.currentUser);
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    }
  }, []);

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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Падающие заказы */}
        <FallingOrder delay={0} order="iPhone 15 Pro - заміна екрану" />
        <FallingOrder delay={2} order="Samsung Galaxy - ремонт батареї" />
        <FallingOrder delay={4} order="MacBook Pro - діагностика" />
        <FallingOrder delay={6} order="iPad Air - заміна дисплею" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-16"
        >
          <div className="flex items-center gap-3">
            <AnimatedLogo />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                RepairHub Pro
              </h1>
              <p className="text-sm text-muted-foreground">Платформа для ремонту пристроїв</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              🔧 Ремонт мобильной електроніки
            </Badge>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent">
                Знайдіть майстра
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary/80 to-primary/50 bg-clip-text text-transparent">
                за 5 хвилин
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              Прямий контакт з перевіреними спеціалістами. Без посередників та переплат.
            </p>
            
            <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto">
              Apple, Samsung, Xiaomi, DJI та інших смартфонів. Знайдіть кращого майстра у вашому місті.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Я шукаю майстра
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/20 hover:bg-primary/5 px-8 py-4 text-lg font-semibold hover:border-primary/40 transition-all duration-300"
            >
              <Wrench className="w-5 h-5 mr-2" />
              Я майстер ремонту
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          {/* Quick Switch Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
          >
            <p className="text-sm text-muted-foreground mb-4">🧪 Швидке перемикання облікових записів (для тестування):</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                size="sm"
                variant="secondary"
                className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
                onClick={() => handleQuickSwitch('client')}
              >
                👤 Клієнт
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
                onClick={() => handleQuickSwitch('master')}
              >
                🔧 Майстер
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200"
                onClick={() => handleQuickSwitch('admin')}
              >
                👨‍💼 Адміністратор
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <StatCard
            value="500+"
            label="Майстрів в мережі"
            icon={<Users className="w-6 h-6" />}
            delay={0}
          />
          <StatCard
            value="10K+"
            label="Задоволених клієнтів"
            icon={<Heart className="w-6 h-6" />}
            delay={0.1}
          />
          <StatCard
            value="25K+"
            label="Успішних ремонтів"
            icon={<Award className="w-6 h-6" />}
            delay={0.2}
          />
          <StatCard
            value="4.9★"
            label="Середня оцінка"
            icon={<Star className="w-6 h-6" />}
            delay={0.3}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Компонент "Как это работает"
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Опишіть проблему",
      description: "Розкажіть, що зламалося та завантажте фото"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Отримайте відгуки",
      description: "Майстри запропонують рішення та ціну"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Оберіть спеціаліста",
      description: "Дивіться досвід, обладнання та відгуки"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Безпечна оплата",
      description: "Гроші захищені ескроу до завершення роботи"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Як це працює?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Простий процес для клієнтів та майстрів
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-4">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Компонент преимуществ
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Прямий контакт",
      description: "Спілкуйтеся напряму з майстром, без посередників та менеджерів."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Прозорість",
      description: "Бачите досвід, обладнання (мікроскопи, паяльні станції) та реальні відгуки."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Безпека",
      description: "Ескроу-платежі захищають вашу угоду, як на найкращих P2P-майданчиках."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Чесні ціни",
      description: "Жодних накруток та прихованих комісій сервісних центрів."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Вирішення спорів",
      description: "Вбудована система арбітражу для справедливого вирішення будь-яких питань."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Будь-які бренди",
      description: "Від Apple та Samsung до Asus та Dell — знайдемо майстра для будь-якої техніки."
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Переваги платформи
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Все, що потрібно для безпечного та вигідного ремонту
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Компонент CTA
const CTASection: React.FC = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Готові почати?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Приєднуйтеся до сотень майстрів та клієнтів, які вже заробляють та економлять за допомогою RepairHub Pro
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Я шукаю майстра
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/20 hover:bg-primary/5 px-8 py-4 text-lg font-semibold hover:border-primary/40 transition-all duration-300"
            >
              <Wrench className="w-5 h-5 mr-2" />
              Я майстер ремонту
            </Button>
          </div>

          <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Працюємо з будь-якими брендами</h3>
            <p className="text-muted-foreground">
              iPhone, iPad, MacBook | Samsung, Xiaomi, Huawei | Asus, Dell, Lenovo, HP | І інші
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Footer
const Footer: React.FC = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <AnimatedLogo />
            <div>
              <p className="font-semibold text-foreground">RepairHub Pro</p>
              <p className="text-sm text-muted-foreground">Платформа для ремонту пристроїв</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+380 50 123 45 67</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>support@repairhub.pro</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Київ, Україна</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© 2024 RepairHub Pro. Всі права захищені. | Для реальних майстрів та клієнтів</p>
        </div>
      </div>
    </footer>
  );
};

// Основной компонент
const ModernLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default ModernLandingPage;