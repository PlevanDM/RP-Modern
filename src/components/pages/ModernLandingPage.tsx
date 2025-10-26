import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
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
} from 'lucide-react';

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

const AnimatedOrders: React.FC = () => {
  const orders = [
    "iPhone 15 Pro - screen replacement",
    "Samsung Galaxy - battery repair",
    "MacBook Pro - diagnostics",
    "iPad Air - display replacement",
    "Xiaomi - camera repair",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orders.map((order, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ y: -100, opacity: 0, x: Math.random() * 100 - 50, rotate: Math.random() * 20 - 10 }}
          animate={{ y: window.innerHeight + 100, opacity: [0, 1, 1, 0], x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50], rotate: [0, Math.random() * 20 - 10, Math.random() * 20 - 10] }}
          transition={{ duration: 12 + Math.random() * 8, delay: index * 1.5, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
          style={{ left: `${Math.random() * 100}%` }}
        >
          <motion.div className="bg-gradient-to-r from-primary/30 to-primary/10 backdrop-blur-sm rounded-2xl p-4 text-sm text-muted-foreground border border-primary/20 shadow-lg" whileHover={{ scale: 1.05 }}>
            <div className="flex items-center gap-2">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
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

const AnimatedLogo: React.FC = () => (
  <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="relative inline-block" whileHover={{ scale: 1.1 }}>
    <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center shadow-2xl shadow-primary/30">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/50 to-transparent" />
      <motion.div animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}>
        <Wrench className="w-10 h-10 text-white relative z-10" />
      </motion.div>
    </div>
  </motion.div>
);

const StatCard: React.FC<StatCardProps> = ({ value, label, icon, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50, scale: 0.8 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }} whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3 } }} className="relative group">
      <Card className="h-full border-border/50 bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-md hover:bg-background/95 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center gap-4">
            <motion.div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              {icon}
            </motion.div>
            <div>
              <div className="text-4xl font-bold text-foreground">{value}</div>
              <div className="text-sm text-muted-foreground font-medium">{label}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50, rotateX: -15 }} animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}} transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }} whileHover={{ y: -15, rotateY: 5, transition: { duration: 0.4 } }} className="relative group perspective-1000">
      <Card className="h-full border-border/50 bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-md hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
        <CardContent className="p-6 relative z-10">
          <motion.div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 w-fit group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500" whileHover={{ scale: 1.1, rotate: 360, transition: { duration: 0.6 } }}>
            {icon}
          </motion.div>
          <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

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
    title: t('hero.find_master'),
    subtitle: t('hero.subtitle'),
    description: t('hero.description'),
    cta: t('hero.cta_client'),
    icon: <Smartphone className="w-5 h-5" />
  };

  const masterContent = {
    title: t('hero.earn_on_repairs'),
    subtitle: t('hero.subtitle'),
    description: t('hero.description'),
    cta: t('hero.cta_master'),
    icon: <Wrench className="w-5 h-5" />
  };

  const currentContent = activeRole === 'client' ? clientContent : masterContent;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <FloatingParticles />
        <AnimatedOrders />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring", stiffness: 100 }} className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <AnimatedLogo />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">RepairHub Pro</h1>
              <p className="text-sm text-muted-foreground font-medium">{t('hero.platform_subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Badge variant="secondary" className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/30 px-4 py-2 text-sm font-semibold">{t('hero.header_badge')}</Badge>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }} className="flex justify-center mb-16">
          <div className="bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-md rounded-3xl p-3 border border-border/50 shadow-2xl shadow-primary/10">
            <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as 'client' | 'master')}>
              <TabsList className="grid w-full grid-cols-2 bg-transparent">
                <TabsTrigger value="client" className="flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold"><User className="w-5 h-5" />{t('hero.role_client')}</TabsTrigger>
                <TabsTrigger value="master" className="flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold"><Wrench className="w-5 h-5" />{t('hero.role_master')}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>
        <div className="text-center max-w-5xl mx-auto mb-20">
          <AnimatePresence mode="wait">
            <motion.div key={activeRole} initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -50, scale: 0.9 }} transition={{ duration: 0.8, type: "spring", stiffness: 100 }} className="mb-12">
              <h1 className="text-6xl md:text-7xl font-bold mb-8">
                <span className="bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent">{currentContent.title}</span>
                <br />
                <span className="bg-gradient-to-r from-primary/90 to-primary/50 bg-clip-text text-transparent">{activeRole === 'client' ? t('hero.in_5_minutes') : t('hero.of_equipment')}</span>
              </h1>
              <p className="text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto font-medium">{currentContent.subtitle}</p>
              <p className="text-xl text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed">{currentContent.description}</p>
            </motion.div>
          </AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 100 }} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 text-white px-10 py-5 text-xl font-bold shadow-2xl">{currentContent.icon}<span className="ml-2">{currentContent.cta}</span><ArrowRight className="w-6 h-6 ml-2" /></Button>
            <Button size="lg" variant="outline" className="border-2 border-primary/30 px-10 py-5 text-xl font-bold"><Play className="w-6 h-6 mr-2" />{t('hero.demo_button')}<ArrowRight className="w-6 h-6 ml-2" /></Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 100 }} className="bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-md rounded-3xl p-8 border border-border/50 shadow-2xl shadow-primary/10">
            <p className="text-lg text-muted-foreground mb-6 font-semibold">{t('hero.quick_switch_title')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => handleQuickSwitch('client')}>👤 {t('hero.role_client')}</Button>
              <Button size="lg" variant="secondary" onClick={() => handleQuickSwitch('master')}>🔧 {t('hero.role_master')}</Button>
              <Button size="lg" variant="secondary" onClick={() => handleQuickSwitch('admin')}>👨‍💼 {t('hero.role_admin')}</Button>
            </div>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <StatCard value="500+" label={t('stats.masters_online')} icon={<Users className="w-8 h-8" />} />
          <StatCard value="10K+" label={t('stats.satisfied_clients')} icon={<Heart className="w-8 h-8" />} />
          <StatCard value="25K+" label={t('stats.successful_repairs')} icon={<Award className="w-8 h-8" />} />
          <StatCard value="4.9★" label={t('stats.average_rating')} icon={<Star className="w-8 h-8" />} />
        </div>
      </div>
    </div>
  );
};

const HowItWorksClientSection: React.FC = () => {
  const { t } = useTranslation();
  const steps = [
    { icon: <Smartphone className="w-10 h-10" />, title: t('howItWorksClient.step1_title'), description: t('howItWorksClient.step1_description') },
    { icon: <Users className="w-10 h-10" />, title: t('howItWorksClient.step2_title'), description: t('howItWorksClient.step2_description') },
    { icon: <Target className="w-10 h-10" />, title: t('howItWorksClient.step3_title'), description: t('howItWorksClient.step3_description') },
    { icon: <Shield className="w-10 h-10" />, title: t('howItWorksClient.step4_title'), description: t('howItWorksClient.step4_description') }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
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
            {t('howItWorksClient.title')}
          </motion.h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            {t('howItWorksClient.subtitle')}
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

const HowItWorksMasterSection: React.FC = () => {
  const { t } = useTranslation();
  const steps = [
    { icon: <Briefcase className="w-10 h-10" />, title: t('howItWorksMaster.step1_title'), description: t('howItWorksMaster.step1_description') },
    { icon: <Bell className="w-10 h-10" />, title: t('howItWorksMaster.step2_title'), description: t('howItWorksMaster.step2_description') },
    { icon: <DollarSign className="w-10 h-10" />, title: t('howItWorksMaster.step3_title'), description: t('howItWorksMaster.step3_description') },
    { icon: <Star className="w-10 h-10" />, title: t('howItWorksMaster.step4_title'), description: t('howItWorksMaster.step4_description') }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
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
            {t('howItWorksMaster.title')}
          </motion.h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            {t('howItWorksMaster.subtitle')}
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

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();
  const features = [
    { icon: <Users className="w-10 h-10" />, title: t('features.feature1_title'), description: t('features.feature1_description') },
    { icon: <Shield className="w-10 h-10" />, title: t('features.feature2_title'), description: t('features.feature2_description') },
    { icon: <Zap className="w-10 h-10" />, title: t('features.feature3_title'), description: t('features.feature3_description') },
    { icon: <DollarSign className="w-10 h-10" />, title: t('features.feature4_title'), description: t('features.feature4_description') },
    { icon: <Award className="w-10 h-10" />, title: t('features.feature5_title'), description: t('features.feature5_description') },
    { icon: <Globe className="w-10 h-10" />, title: t('features.feature6_title'), description: t('features.feature6_description') }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
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
            {t('features.title')}
          </motion.h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            {t('features.subtitle')}
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

const CTASection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
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
            {t('cta.title')}
          </motion.h2>
          <motion.p
            className="text-2xl text-muted-foreground mb-12 font-medium"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {t('cta.subtitle')}
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
                {t('cta.cta_client')}
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
                {t('cta.cta_master')}
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
            <h3 className="text-2xl font-bold mb-4 text-foreground">{t('cta.brands_title')}</h3>
            <motion.p
              className="text-muted-foreground text-lg"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t('cta.brands_list')}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-background/90 to-background/80 backdrop-blur-md border-t border-border/50 relative overflow-hidden">
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
              <p className="text-sm text-muted-foreground font-medium">{t('footer.platform_subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">{t('footer.phone')}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">{t('footer.email')}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{t('footer.location')}</span>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="font-medium">{t('footer.copyright')}</p>
        </motion.div>
      </div>
    </footer>
  );
};

const ModernLandingPage: React.FC = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <HowItWorksClientSection />
    <HowItWorksMasterSection />
    <FeaturesSection />
    <CTASection />
    <Footer />
  </div>
);

export default ModernLandingPage;



