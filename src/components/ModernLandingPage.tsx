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
      <Card className="border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
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
      <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-6">
          <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 w-fit group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
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
      transition={{ duration: 6 + Math.random() * 4, delay, repeat: Infinity }}
      className="fixed pointer-events-none"
      style={{ left: `${Math.random() * 100}%` }}
    >
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/80 to-blue-600/80 backdrop-blur-sm border border-blue-400/50 shadow-lg">
        <Package className="w-4 h-4 text-white" />
        <span className="text-sm font-medium text-white whitespace-nowrap">{order}</span>
      </div>
    </motion.div>
  );
};

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  company,
  content,
  avatar,
  rating,
  delay = 0,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <p className="text-foreground mb-6 italic">"{content}"</p>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-foreground">{name}</div>
              <div className="text-sm text-muted-foreground">
                {role} at {company}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface ModernLandingPageProps {
  onLogin: (user: any) => void;
}

const ModernLandingPage: React.FC<ModernLandingPageProps> = ({ onLogin }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const orders = [
    'iPhone заміна екрану',
    'Samsung батарея',
    'MacBook діагностика',
    'iPad ремонт',
    'Google Pixel екран',
    'OnePlus батарея',
    'Xiaomi дисплей',
    'Samsung заміна',
  ];

  const features = [
    {
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      title: 'Спеціалізація на мобільній електроніці',
      description: 'iPhone, Samsung, Xiaomi, ASUS, Google Pixel, DJI, GoPro - весь спектр пристроїв у одному місці.',
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: 'Безпосередній контакт з майстром',
      description: 'Прямий чат, обговорення ціни, термін ремонту без посередників та прихованих комісій.',
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: 'Перевірені спеціалісти',
      description: 'Кожен майстер з сертифікатом і портфоліо. Клієнти бачать рейтинги, відгуки та ціни.',
    },
    {
      icon: <Wrench className="w-6 h-6 text-primary" />,
      title: 'Швидкий ремонт на місці',
      description: 'Більшість ремонтів за 30-60 хвилин. Екран, батарея, вода, розборка - все тут.',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-primary" />,
      title: 'Справедливі ціни',
      description: 'Без накруток. Плата йде майстру, платформа бере 5-10%. Найкраще на ринку.',
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: 'Гарантія якості',
      description: 'Гарантія на роботи, захист платежів і захист від шахраїв. Безпечно для всіх.',
    },
  ];

  const stats = [
    {
      value: '500+',
      label: 'Майстрів в мережі',
      icon: <Wrench className="w-6 h-6" />,
    },
    {
      value: '10K+',
      label: 'Задоволених клієнтів',
      icon: <Star className="w-6 h-6" />,
    },
    {
      value: '25K+',
      label: 'Успішних ремонтів',
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      value: '4.9★',
      label: 'Середня оцінка',
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  const testimonials = [
    {
      name: 'Алексей Иванов',
      role: 'Владелец',
      company: 'TechRepair',
      content: 'RepairHub Pro полностью изменил наш подход. Теперь мы обрабатываем в 2 раза больше заказов и зарабатываем больше!',
      avatar: '/avatars/01.png',
      rating: 5,
    },
    {
      name: 'Мария Петрова',
      role: 'Клієнтка',
      company: 'Київ',
      content: 'Нашла хорошего мастера за 10 минут. Быстро, честно и без переплат. Рекомендую всем!',
      avatar: '/avatars/02.png',
      rating: 5,
    },
    {
      name: 'Дмитрий Сидоров',
      role: 'Майстер',
      company: 'Льків',
      content: 'Замечательная платформа! Постоянно поступают новые заказы. Заработки выросли на 60% в первый месяц!',
      avatar: '/avatars/03.png',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Falling Orders Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {orders.map((order, idx) => (
            <FallingOrder key={`${order}-${idx}`} order={order} delay={idx * 0.8} />
          ))}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
          
          <div className="container mx-auto px-4 py-20 md:py-32 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge className="px-4 py-2 text-base bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
                🔧 Ремонт мобильной електроніки
              </Badge>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                RepairHub Pro
              </h1>
              
              <p className="text-2xl md:text-3xl text-muted-foreground mb-4 max-w-3xl mx-auto font-semibold">
                Ремонт iPhone, Samsung, Xiaomi, DJI та інших смартфонів.<br />
                Знайдіть кращого майстра у вашому місті.
              </p>

              <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                Спеціалізуємось на ремонті мобільної електроніки: Apple, Samsung, Xiaomi, ASUS, Google Pixel, OnePlus, DJI, GoPro та інших. Прямий контакт між клієнтом та майстром - без посередників, справедливі ціни, професійний сервіс.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="text-lg px-8 group"
                  onClick={() => {
                    const demoClient = {
                      id: 'client-1',
                      name: 'Володимир Петров',
                      email: 'client@example.com',
                      role: 'client',
                      rating: 4.5
                    };
                    if (onLogin) {
                      onLogin(demoClient);
                    }
                  }}
                >
                  Я шукаю майстра
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  onClick={() => {
                    const demoMaster = {
                      id: 'master-1',
                      name: 'Олександр Петренко',
                      email: 'master@example.com',
                      role: 'master',
                      rating: 4.9
                    };
                    if (onLogin) {
                      onLogin(demoMaster);
                    }
                  }}
                >
                  Я майстер ремонту
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Platform Explanation Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Як це працює?
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* For Clients */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-8 border border-blue-200/20"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-600 text-white rounded-lg">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Для клієнтів</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Опишіть проблему - розбитий екран, батарея, вода, ремонт камери або розборка</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Оберіть бренд пристрою: iPhone, Samsung, Xiaomi, ASUS, Google Pixel, DJI, GoPro та інші</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Тут же бачите спеціалістів у вашому місті з рейтингом, прайсами та відгуками</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Вибираєте найкращого - домовляєтесь про ціну і час, ремонт на місці</span>
                  </li>
                </ul>
              </motion.div>

              {/* For Masters */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-8 border border-green-200/20"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-600 text-white rounded-lg">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Для майстрів</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Зареєструйтесь і вкажіть спеціалізацію: екран, батарея, розборка, логіка тощо</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Отримуйте замовлення від реальних клієнтів у вашому місті щодня</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Самі вибираєте які заказы брати - без обов'язків і штрафів</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Будуєте репутацію, збільшуєте доходи, розвиваєте свій бізнес</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Переваги платформи</h2>
            <p className="text-lg text-muted-foreground">
              Все що потрібно для успішного ремонту мобільної електроніки в одному місці
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Цифри говорять самі</h2>
            <p className="text-lg text-muted-foreground">
              Реальні результати від реальних користувачів
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 md:p-20 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Готові починати?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Приєднайтесь до сотень майстрів і клієнтів, які вже заробляють та економлять за допомогою RepairHub Pro
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => {
                  const demoClient = {
                    id: 'client-1',
                    name: 'Володимир Петров',
                    email: 'client@example.com',
                    role: 'client',
                    rating: 4.5
                  };
                  if (onLogin) {
                    onLogin(demoClient);
                  }
                }}
              >
                Я шукаю майстра
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white/10"
                onClick={() => {
                  const demoMaster = {
                    id: 'master-1',
                    name: 'Олександр Петренко',
                    email: 'master@example.com',
                    role: 'master',
                    rating: 4.9
                  };
                  if (onLogin) {
                    onLogin(demoMaster);
                  }
                }}
              >
                Я майстер ремонту
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Footer Note */}
        <section className="container mx-auto px-4 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 RepairHub Pro. Все права защищены. | Для реальных мастеров и клиентов
          </p>
        </section>
      </div>
    </div>
  );
};

export default ModernLandingPage;
