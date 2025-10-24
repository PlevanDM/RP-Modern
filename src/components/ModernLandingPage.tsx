import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  Settings,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  RefreshCw,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  ExternalLink,
  User,
  UserCheck,
  Briefcase,
  Laptop,
  Headphones,
  Camera,
  Gamepad2,
  Watch,
  Tablet,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  Move,
  Layers,
  Hexagon,
  Circle,
  Square,
  Triangle,
  Diamond,
} from 'lucide-react';

// Интерфейсы
interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

// Компонент плавающих частиц
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

// Компонент анимированных заказов
const AnimatedOrders: React.FC = () => {
  const orders = [
    "iPhone 15 Pro - заміна екрану",
    "Samsung Galaxy - ремонт батареї", 
    "MacBook Pro - діагностика",
    "iPad Air - заміна дисплею",
    "Xiaomi - ремонт камери",
    "DJI Drone - заміна пропелера",
    "GoPro - ремонт корпусу",
    "ASUS ROG - заміна клавіатури"
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
            rotate: Math.random() * 20 - 10
          }}
          animate={{ 
            y: window.innerHeight + 100, 
            opacity: [0, 1, 1, 0],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [0, Math.random() * 20 - 10, Math.random() * 20 - 10]
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            delay: index * 1.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear"
          }}
          style={{ left: `${Math.random() * 100}%` }}
        >
          <motion.div
            className="bg-gradient-to-r from-primary/30 to-primary/10 backdrop-blur-sm rounded-2xl p-4 text-sm text-muted-foreground border border-primary/20 shadow-lg"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(120, 119, 198, 0.1)",
                "0 0 40px rgba(120, 119, 198, 0.2)",
                "0 0 20px rgba(120, 119, 198, 0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Wrench className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="font-medium">{order}</span>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Компонент анимированного логотипа
const AnimatedLogo: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative inline-block"
      whileHover={{ scale: 1.1 }}
    >
      <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center shadow-2xl shadow-primary/30">
        {/* Вращающийся градиент */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
        
        {/* Пульсирующий эффект */}
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.3, 0.8, 0.3] 
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/50 to-transparent"
        />
        
        {/* Центральная иконка */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
        >
          <Wrench className="w-10 h-10 text-white relative z-10" />
        </motion.div>
        
        {/* Орбитальные частицы */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/60 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: '0 0',
            }}
            animate={{
              rotate: [0, 360],
              x: [0, 30],
              y: [0, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Компонент статистической карточки
const StatCard: React.FC<StatCardProps> = ({ value, label, icon, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      whileHover={{ 
        y: -10, 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="relative group"
    >
      <Card className="h-full border-border/50 bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-md hover:bg-background/95 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
        {/* Анимированный фон */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(120, 119, 198, 0.05) 0%, transparent 100%)",
              "linear-gradient(45deg, rgba(120, 119, 198, 0.1) 0%, transparent 100%)",
              "linear-gradient(45deg, rgba(120, 119, 198, 0.05) 0%, transparent 100%)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center gap-4">
            <motion.div 
              className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {icon}
            </motion.div>
            <div>
              <motion.div 
                className="text-4xl font-bold text-foreground"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(120, 119, 198, 0)",
                    "0 0 20px rgba(120, 119, 198, 0.3)",
                    "0 0 0px rgba(120, 119, 198, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {value}
              </motion.div>
              <div className="text-sm text-muted-foreground font-medium">{label}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Компонент карточки преимуществ
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      whileHover={{ 
        y: -15, 
        rotateY: 5,
        transition: { duration: 0.4 }
      }}
      className="relative group perspective-1000"
    >
      <Card className="h-full border-border/50 bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-md hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
        {/* Анимированный градиент */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(120, 119, 198, 0.1) 0%, transparent 50%, rgba(120, 119, 198, 0.05) 100%)",
              "linear-gradient(45deg, rgba(120, 119, 198, 0.15) 0%, transparent 50%, rgba(120, 119, 198, 0.1) 100%)",
              "linear-gradient(45deg, rgba(120, 119, 198, 0.1) 0%, transparent 50%, rgba(120, 119, 198, 0.05) 100%)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <CardContent className="p-6 relative z-10">
          <motion.div 
            className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 w-fit group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500"
            whileHover={{ 
              scale: 1.1,
              rotate: 360,
              transition: { duration: 0.6 }
            }}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Компонент героя с крутыми анимациями
const HeroSection: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeRole, setActiveRole] = useState<'client' | 'master'>('client');

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

  const clientContent = {
    title: "Знайдіть майстра за 5 хвилин",
    subtitle: "Онлайн платформа прямого з'єднання клієнтів та майстрів. Без посередників та переплат.",
    description: "Apple, Samsung, Xiaomi, DJI та інших пристроїв. Знайдіть кращого майстра у вашому місті.",
    cta: "Я шукаю майстра",
    icon: <Smartphone className="w-5 h-5" />
  };

  const masterContent = {
    title: "Заробляйте на ремонті техніки",
    subtitle: "Онлайн платформа для отримання замовлень від клієнтів напряму. Без комісій та посередників.",
    description: "Ремонтуйте iPhone, Samsung, MacBook та іншу техніку. Розвивайте свій бізнес з нами.",
    cta: "Я майстер ремонту",
    icon: <Wrench className="w-5 h-5" />
  };

  const currentContent = activeRole === 'client' ? clientContent : masterContent;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Плавающие частицы */}
        <FloatingParticles />
        
        {/* Анимированные заказы */}
        <AnimatedOrders />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="flex items-center justify-between mb-16"
        >
          <div className="flex items-center gap-4">
            <AnimatedLogo />
            <div>
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                RepairHub Pro
              </motion.h1>
              <p className="text-sm text-muted-foreground font-medium">Онлайн платформа для ремонту пристроїв</p>
            </div>
          </div>
          
          <motion.div 
            className="flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <Badge variant="secondary" className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/30 px-4 py-2 text-sm font-semibold">
              🔧 Ремонт мобільної електроніки
            </Badge>
          </motion.div>
        </motion.div>

        {/* Role Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          className="flex justify-center mb-16"
        >
          <div className="bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-md rounded-3xl p-3 border border-border/50 shadow-2xl shadow-primary/10">
            <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as 'client' | 'master')}>
              <TabsList className="grid w-full grid-cols-2 bg-transparent">
                <TabsTrigger 
                  value="client" 
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white"
                >
                  <motion.div
                    animate={{ rotate: activeRole === 'client' ? 360 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <User className="w-5 h-5" />
                  </motion.div>
                  Клієнт
                </TabsTrigger>
                <TabsTrigger 
                  value="master" 
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-white"
                >
                  <motion.div
                    animate={{ rotate: activeRole === 'master' ? 360 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Wrench className="w-5 h-5" />
                  </motion.div>
                  Майстер
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="text-center max-w-5xl mx-auto mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="mb-12"
            >
              <motion.h1 
                className="text-6xl md:text-7xl font-bold mb-8"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(120, 119, 198, 0)",
                    "0 0 30px rgba(120, 119, 198, 0.3)",
                    "0 0 0px rgba(120, 119, 198, 0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent">
                  {activeRole === 'client' ? 'Знайдіть майстра' : 'Заробляйте на ремонті'}
                </span>
                <br />
                <motion.span 
                  className="bg-gradient-to-r from-primary/90 to-primary/50 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {activeRole === 'client' ? 'за 5 хвилин' : 'техніки'}
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentContent.subtitle}
              </motion.p>
              
              <motion.p 
                className="text-xl text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {currentContent.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 100 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 text-white px-10 py-5 text-xl font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-500 rounded-2xl"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mr-3"
                >
                  {currentContent.icon}
                </motion.div>
                <span>{currentContent.cta}</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-3"
                >
                  <ArrowRight className="w-6 h-6" />
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
                className="border-2 border-primary/30 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 px-10 py-5 text-xl font-bold hover:border-primary/50 transition-all duration-500 rounded-2xl backdrop-blur-sm"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-3"
                >
                  <Play className="w-6 h-6" />
                </motion.div>
                Дивитися демо
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-3"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Quick Switch Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 100 }}
            className="bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-md rounded-3xl p-8 border border-border/50 shadow-2xl shadow-primary/10"
          >
            <motion.p 
              className="text-lg text-muted-foreground mb-6 font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧪 Швидке перемикання облікових записів (для тестування):
            </motion.p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-gradient-to-r from-green-100 to-green-50 text-green-700 hover:from-green-200 hover:to-green-100 border-green-200 px-6 py-3 font-semibold rounded-xl"
                  onClick={() => handleQuickSwitch('client')}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    👤
                  </motion.div>
                  Клієнт
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 hover:from-blue-200 hover:to-blue-100 border-blue-200 px-6 py-3 font-semibold rounded-xl"
                  onClick={() => handleQuickSwitch('master')}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    🔧
                  </motion.div>
                  Майстер
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 hover:from-purple-200 hover:to-purple-100 border-purple-200 px-6 py-3 font-semibold rounded-xl"
                  onClick={() => handleQuickSwitch('admin')}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    👨‍💼
                  </motion.div>
                  Адміністратор
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, type: "spring", stiffness: 100 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          <StatCard
            value="500+"
            label="Майстрів в мережі"
            icon={<Users className="w-8 h-8" />}
            delay={0}
          />
          <StatCard
            value="10K+"
            label="Задоволених клієнтів"
            icon={<Heart className="w-8 h-8" />}
            delay={0.1}
          />
          <StatCard
            value="25K+"
            label="Успішних ремонтів"
            icon={<Award className="w-8 h-8" />}
            delay={0.2}
          />
          <StatCard
            value="4.9★"
            label="Середня оцінка"
            icon={<Star className="w-8 h-8" />}
            delay={0.3}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Компонент "Как это работает" для клиентов
const HowItWorksClientSection: React.FC = () => {
  const steps = [
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: "Опишіть проблему",
      description: "Розкажіть, що зламалося та завантажте фото пристрою"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Отримайте пропозиції",
      description: "Майстри запропонують рішення та чесну ціну"
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Оберіть спеціаліста",
      description: "Дивіться досвід, обладнання та реальні відгуки"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Безпечна оплата",
      description: "Гроші захищені ескроу до завершення роботи"
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 10% 20%, rgba(120, 119, 198, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 90% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 10% 20%, rgba(120, 119, 198, 0.05) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Як це працює для клієнтів?
          </motion.h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Простий процес для знаходження майстра
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="text-center relative"
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="relative mb-8">
                <motion.div 
                  className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-6 shadow-lg shadow-primary/20"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.6 }
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(120, 119, 198, 0.2)",
                      "0 0 40px rgba(120, 119, 198, 0.3)",
                      "0 0 20px rgba(120, 119, 198, 0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {step.icon}
                </motion.div>
                <motion.div 
                  className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" }
                  }}
                >
                  {index + 1}
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Компонент "Как это работает" для мастеров
const HowItWorksMasterSection: React.FC = () => {
  const steps = [
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "Створіть профіль",
      description: "Опишіть свої навички, обладнання та спеціалізацію"
    },
    {
      icon: <Bell className="w-10 h-10" />,
      title: "Отримайте замовлення",
      description: "Клієнти знаходять вас за спеціалізацією та рейтингом"
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: "Працюйте та заробляйте",
      description: "Виконуйте ремонт та отримуйте оплату без комісій"
    },
    {
      icon: <Star className="w-10 h-10" />,
      title: "Отримуйте відгуки",
      description: "Будуйте репутацію та отримуйте більше замовлень"
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 90% 10%, rgba(120, 119, 198, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 10% 90%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 90% 10%, rgba(120, 119, 198, 0.05) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Як це працює для майстрів?
          </motion.h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Простий процес для розвитку бізнесу
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="text-center relative"
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="relative mb-8">
                <motion.div 
                  className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-6 shadow-lg shadow-primary/20"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.6 }
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(120, 119, 198, 0.2)",
                      "0 0 40px rgba(120, 119, 198, 0.3)",
                      "0 0 20px rgba(120, 119, 198, 0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {step.icon}
                </motion.div>
                <motion.div 
                  className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" }
                  }}
                >
                  {index + 1}
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
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
      icon: <Users className="w-10 h-10" />,
      title: "Прямий контакт",
      description: "Спілкуйтеся напряму з майстром, без посередників та менеджерів."
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Прозорість",
      description: "Бачите досвід, обладнання (мікроскопи, паяльні станції) та реальні відгуки."
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Безпека",
      description: "Ескроу-платежі захищають вашу угоду, як на найкращих P2P-майданчиках."
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: "Чесні ціни",
      description: "Жодних накруток та прихованих комісій сервісних центрів."
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Вирішення спорів",
      description: "Вбудована система арбітражу для справедливого вирішення будь-яких питань."
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Будь-які бренди",
      description: "Від Apple та Samsung до Asus та Dell — знайдемо майстра для будь-якої техніки."
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(120, 119, 198, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 70%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 30%, rgba(120, 119, 198, 0.05) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Переваги платформи
          </motion.h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Все, що потрібно для безпечного та вигідного ремонту
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
    <div className="py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-5xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Готові почати?
          </motion.h2>
          <motion.p 
            className="text-2xl text-muted-foreground mb-12 font-medium"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Приєднуйтеся до сотень майстрів та клієнтів, які вже заробляють та економлять за допомогою RepairHub Pro
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 text-white px-12 py-6 text-xl font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-500 rounded-2xl"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mr-3"
                >
                  <Smartphone className="w-6 h-6" />
                </motion.div>
                Я шукаю майстра
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-3"
                >
                  <ArrowRight className="w-6 h-6" />
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
                className="border-2 border-primary/30 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 px-12 py-6 text-xl font-bold hover:border-primary/50 transition-all duration-500 rounded-2xl backdrop-blur-sm"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-3"
                >
                  <Wrench className="w-6 h-6" />
                </motion.div>
                Я майстер ремонту
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-3"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </Button>
            </motion.div>
          </div>

          <motion.div 
            className="bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-md rounded-3xl p-8 border border-border/50 shadow-2xl shadow-primary/10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-foreground">Працюємо з будь-якими брендами</h3>
            <motion.p 
              className="text-muted-foreground text-lg"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              iPhone, iPad, MacBook | Samsung, Xiaomi, Huawei | Asus, Dell, Lenovo, HP | І інші
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Footer
const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-background/90 to-background/80 backdrop-blur-md border-t border-border/50 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 10% 10%, rgba(120, 119, 198, 0.03) 0%, transparent 50%)",
              "radial-gradient(circle at 90% 90%, rgba(120, 119, 198, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 10% 10%, rgba(120, 119, 198, 0.03) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <AnimatedLogo />
            <div>
              <motion.p 
                className="font-bold text-foreground text-xl"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                RepairHub Pro
              </motion.p>
              <p className="text-sm text-muted-foreground font-medium">Онлайн платформа для ремонту пристроїв</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">+380 50 123 45 67</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">support@repairhub.pro</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Київ, Україна</span>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="font-medium">© 2024 RepairHub Pro. Всі права захищені. | Для реальних майстрів та клієнтів</p>
        </motion.div>
      </div>
    </footer>
  );
};

// Основной компонент
const ModernLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <HowItWorksClientSection />
      <HowItWorksMasterSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default ModernLandingPage;