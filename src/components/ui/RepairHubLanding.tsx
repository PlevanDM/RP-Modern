import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Wrench, 
  Users, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Menu, 
  X,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { cn } from '../../lib/utils';

interface RepairHubLandingProps {
  defaultRole?: 'client' | 'master';
  onLogin?: (role: 'client' | 'master') => void;
}

const RepairHubLanding: React.FC<RepairHubLandingProps> = ({ defaultRole = 'client', onLogin }) => {
  const [activeRole, setActiveRole] = useState<'client' | 'master'>(defaultRole);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    { icon: Smartphone, title: 'Смартфони', description: 'Ремонт iPhone, Samsung, Xiaomi та інших' },
    { icon: Laptop, title: 'Ноутбуки', description: 'Діагностика та ремонт будь-якої складності' },
    { icon: Tablet, title: 'Планшети', description: 'Заміна екранів, батарей, компонентів' },
    { icon: Wrench, title: 'Комплектуючі', description: 'Оригінальні запчастини в наявності' }
  ];

  const clientBenefits = [
    { icon: Clock, title: 'Швидкий ремонт', description: 'Більшість ремонтів за 1-2 години' },
    { icon: Shield, title: 'Гарантія якості', description: 'До 12 місяців гарантії на роботи' },
    { icon: Star, title: 'Перевірені майстри', description: 'Тільки сертифіковані спеціалісти' },
    { icon: Zap, title: 'Онлайн запис', description: 'Зручне бронювання через платформу' }
  ];

  const masterBenefits = [
    { icon: Users, title: 'Потік клієнтів', description: 'Постійні замовлення від перевірених клієнтів' },
    { icon: TrendingUp, title: 'Зростання доходу', description: 'Збільште прибуток до 40%' },
    { icon: Zap, title: 'Автоматизація', description: 'CRM система для управління замовленнями' },
    { icon: Shield, title: 'Захист угод', description: 'Безпечні розрахунки через платформу' }
  ];

  const stats = [
    { value: '5000+', label: 'Виконаних ремонтів' },
    { value: '500+', label: 'Перевірених майстрів' },
    { value: '4.9', label: 'Середній рейтинг' },
    { value: '24/7', label: 'Підтримка клієнтів' }
  ];

  const testimonials = [
    {
      name: 'Олександр К.',
      role: 'Власник сервісу',
      text: 'RepairHub Pro допоміг збільшити кількість клієнтів втричі. Тепер не треба витрачати час на пошук замовлень.',
      rating: 5
    },
    {
      name: 'Марія В.',
      role: 'Клієнт',
      text: 'Відремонтували iPhone за годину! Зручно обрати майстра, побачити відгуки та ціни. Рекомендую!',
      rating: 5
    },
    {
      name: 'Дмитро П.',
      role: 'Майстер',
      text: 'Платформа дуже зручна для роботи. Всі інструменти в одному місці, оплата без затримок.',
      rating: 5
    }
  ];

  const handleRoleSelect = (role: 'client' | 'master') => {
    if (onLogin) {
      onLogin(role);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Wrench className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">RepairHub Pro</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Послуги
              </a>
              <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Переваги
              </a>
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Відгуки
              </a>
              <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Контакти
              </a>
            </nav>
            
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost">Увійти</Button>
              <Button onClick={() => handleRoleSelect(activeRole)}>Почати роботу</Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Послуги
                </a>
                <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Переваги
                </a>
                <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Відгуки
                </a>
                <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Контакти
                </a>
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="ghost" className="w-full">Увійти</Button>
                  <Button className="w-full" onClick={() => handleRoleSelect(activeRole)}>Почати роботу</Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4" variant="secondary">
                Професійна B2B платформа
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Ремонт електроніки{' '}
                <span className="text-primary">нового рівня</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Об'єднуємо клієнтів та професійних майстрів для швидкого та якісного ремонту мобільної електроніки
              </p>
              
              {/* Role Switcher */}
              <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as 'client' | 'master')} className="mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="client">Я клієнт</TabsTrigger>
                  <TabsTrigger value="master">Я майстер</TabsTrigger>
                </TabsList>
                
                <TabsContent value="client" className="mt-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Знайдіть перевіреного майстра для ремонту вашого пристрою
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button size="lg" className="gap-2" onClick={() => handleRoleSelect('client')}>
                        Знайти майстра <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button size="lg" variant="outline">
                        Дізнатись більше
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="master" className="mt-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Отримуйте більше замовлень та розвивайте свій бізнес
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button size="lg" className="gap-2" onClick={() => handleRoleSelect('master')}>
                        Приєднатись <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button size="lg" variant="outline">
                        Умови співпраці
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-3xl" />
                <div className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    {services.map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                          className="bg-background border border-border rounded-xl p-6 hover:border-primary transition-colors"
                        >
                          <Icon className="h-8 w-8 text-primary mb-3" />
                          <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                          <p className="text-xs text-muted-foreground">{service.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">Наші послуги</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ремонт будь-якої електроніки
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Професійний ремонт мобільних пристроїв з гарантією якості
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">Переваги</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Чому обирають RepairHub Pro
            </h2>
          </div>
          
          <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as 'client' | 'master')} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="client">Для клієнтів</TabsTrigger>
              <TabsTrigger value="master">Для майстрів</TabsTrigger>
            </TabsList>
            
            <TabsContent value="client">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {clientBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{benefit.title}</CardTitle>
                          <CardDescription>{benefit.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="master">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {masterBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{benefit.title}</CardTitle>
                          <CardDescription>{benefit.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">Відгуки</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Що кажуть наші користувачі
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <CardDescription className="text-base mb-4">
                      "{testimonial.text}"
                    </CardDescription>
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готові почати?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Приєднуйтесь до RepairHub Pro та отримайте доступ до найкращої платформи для ремонту електроніки
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2" onClick={() => handleRoleSelect(activeRole)}>
                Почати зараз <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Зв'язатись з нами
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Зв'яжіться з нами</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Адреса</p>
                    <p className="text-muted-foreground">м. Київ, вул. Хрещатик, 1</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Телефон</p>
                    <p className="text-muted-foreground">+380 (44) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">info@repairhub.pro</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Залишити заявку</CardTitle>
                <CardDescription>Ми зв'яжемось з вами найближчим часом</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ім'я</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Ваше ім'я"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Повідомлення</label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-md bg-background min-h-[100px]"
                    placeholder="Ваше повідомлення"
                  />
                </div>
                <Button className="w-full">Відправити</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Wrench className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">RepairHub Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Професійна платформа для ремонту мобільної електроніки
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Послуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Ремонт смартфонів</a></li>
                <li><a href="#" className="hover:text-foreground">Ремонт ноутбуків</a></li>
                <li><a href="#" className="hover:text-foreground">Ремонт планшетів</a></li>
                <li><a href="#" className="hover:text-foreground">Запчастини</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компанія</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Про нас</a></li>
                <li><a href="#" className="hover:text-foreground">Блог</a></li>
                <li><a href="#" className="hover:text-foreground">Кар'єра</a></li>
                <li><a href="#" className="hover:text-foreground">Контакти</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Підтримка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Допомога</a></li>
                <li><a href="#" className="hover:text-foreground">Умови використання</a></li>
                <li><a href="#" className="hover:text-foreground">Конфіденційність</a></li>
                <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 RepairHub Pro. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RepairHubLanding;


