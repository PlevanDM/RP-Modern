import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { useTranslation } from 'react-i18next';
import { Wrench, Shield, TrendingUp, Clock, CheckCircle, Users, Zap, Target, MessageSquare, Star } from "lucide-react";
import LanguageSwitcher from '../LanguageSwitcher';

// Lazy load heavy components
const LoginModal = lazy(() => import('../auth/LoginModal').then(module => ({ default: module.LoginModal })));
const RegisterModal = lazy(() => import('../auth/RegisterModal').then(module => ({ default: module.RegisterModal })));
const SplineRobotDemo = lazy(() => import('../ui/spline-robot-demo').then(module => ({ default: module.SplineRobotDemo })));

export default function ModernLandingPage() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerRole, setRegisterRole] = useState<'client' | 'master' | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle URL anchors (memoized)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        });
      }
    }
  }, []);

  const handleRegisterClick = useCallback((role: 'client' | 'master') => {
    setRegisterRole(role);
    setIsRegisterModalOpen(true);
  }, []);

  // Memoize icon arrays to prevent recreation on every render
  const masterBenefitIcons = useMemo(() => [
    { icon: TrendingUp, key: 'fee' },
    { icon: Target, key: 'direct' },
    { icon: Star, key: 'reputation' },
    { icon: Clock, key: 'flexible' },
    { icon: MessageSquare, key: 'contact' },
    { icon: Shield, key: 'protection' }
  ], []);

  return (
    <>
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen">
        {/* Header */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/80 backdrop-blur-sm"}`}>
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {t('common.platformName') || 'RepairHub'}
              </h1>
            </div>
            <nav className="hidden md:flex gap-4 items-center">
              <button onClick={() => { document.getElementById('formasters')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-700 hover:text-blue-600 transition font-medium">
                {t('landing.nav.forMasters') || 'Майстрам'}
              </button>
              <button onClick={() => { document.getElementById('forclients')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-700 hover:text-blue-600 transition font-medium">
                {t('landing.nav.forClients') || 'Клієнтам'}
              </button>
              <button onClick={() => { document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-700 hover:text-blue-600 transition font-medium">
                {t('landing.nav.howItWorks') || 'Як працює'}
              </button>
              <LanguageSwitcher />
              <button onClick={() => setIsLoginModalOpen(true)} className="text-gray-700 hover:text-blue-600 transition font-medium" data-testid="login-nav-button">
                {t('common.login') || 'Увійти'}
              </button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button onClick={() => handleRegisterClick('client')} className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300" data-testid="find-master-button">
                {t('landing.hero.cta.findMaster') || 'Знайти майстра'}
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button onClick={() => handleRegisterClick('master')} className="bg-white text-blue-600 px-8 py-4 rounded-xl border-2 border-blue-600 font-bold text-lg hover:bg-blue-50 hover:shadow-xl hover:scale-105 transition-all duration-300" data-testid="start-earning-button">
                {t('landing.hero.cta.startEarning') || 'Почати заробляти'}
              </button>
            </div>

            {/* 3D Robot Demo */}
            <div className="mb-12 max-w-6xl mx-auto">
              <Suspense fallback={<div className="w-full h-[500px] bg-white flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
                <SplineRobotDemo />
              </Suspense>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-gray-100">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">{t('landing.hero.value.safe') || 'Безпечні угоди'}</span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-gray-100">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">{t('landing.hero.value.fast') || 'Швидкий старт'}</span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-gray-100">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">{t('landing.hero.value.lowFee') || 'Мінімальна комісія'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem-Solution */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {t('landing.problems.title') || 'Вирішуємо реальні проблеми'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('landing.problems.subtitle') || 'Ми знаємо, з чим стикаються і майстри, і клієнти на ринку ремонту'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Для клиентов */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-8 rounded-2xl border border-blue-200">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('landing.problems.clients.title') || 'Для клієнтів'}</h3>
                <div className="space-y-3 mb-6">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">
                        <span className="font-semibold">{t('landing.problems.label') || 'Проблема:'}</span>{' '}
                        {t(`landing.problems.clients.problem${num}`) || `Проблема ${num} для клієнтів`}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-blue-300">
                  <p className="text-blue-900 font-semibold mb-3">✓ {t('landing.problems.clients.solutionTitle') || 'Наше рішення:'}</p>
                  <p className="text-gray-700">{t('landing.problems.clients.solution') || 'Перевірені спеціалісти, прозоре ціноутворення та система відгуків — ви завжди знаєте, з ким працюєте'}</p>
                </div>
              </div>

              {/* Для мастеров */}
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-8 rounded-2xl border border-green-200">
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <Wrench className="w-8 h-8 text-white" />
                  </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('landing.problems.masters.title') || 'Для майстрів'}</h3>
                <div className="space-y-3 mb-6">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-gray-700">
                        <span className="font-semibold">{t('landing.problems.label') || 'Проблема:'}</span>{' '}
                        {t(`landing.problems.masters.problem${num}`) || `Проблема ${num} для майстрів`}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-green-300">
                  <p className="text-green-900 font-semibold mb-3">✓ {t('landing.problems.masters.solutionTitle') || 'Наше рішення:'}</p>
                  <p className="text-gray-700">{t('landing.problems.masters.solution') || 'Постійний потік замовлень, комісія всього 5%, система рейтингів для росту вашого бізнесу'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {t('landing.how.title') || 'Як це працює'}
              </h2>
              <p className="text-lg text-gray-600">
                {t('landing.how.subtitle') || 'Простий процес від заявки до виконаної роботи'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Для клиентов */}
              <div>
                <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-6 text-sm font-semibold text-blue-700">
                  {t('landing.how.clientPath') || 'Шлях клієнта'}
                </div>
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                        {num}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 text-gray-900">
                          {t(`landing.how.client.step${num}.title`) || `Крок ${num}`}
                        </h4>
                        <p className="text-gray-600">
                          {t(`landing.how.client.step${num}.desc`) || `Опис кроку ${num}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Для мастеров */}
              <div>
                <div className="inline-block px-4 py-2 bg-green-100 rounded-full mb-6 text-sm font-semibold text-green-700">
                  {t('landing.how.masterPath') || 'Шлях майстра'}
                </div>
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                        {num}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 text-gray-900">
                          {t(`landing.how.master.step${num}.title`) || `Крок ${num}`}
                        </h4>
                        <p className="text-gray-600">
                          {t(`landing.how.master.step${num}.desc`) || `Опис кроку ${num}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits for Masters */}
        <section id="formasters" className="py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {t('landing.masters.title') || 'Майстрам: більше замовлень, більше доходу'}
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                {t('landing.masters.subtitle') || 'Станьте частиною нової платформи на старті та отримайте переваги піонерів'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {masterBenefitIcons.map((item, i) => (
                <div key={item.key} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all hover:scale-105 duration-300">
                  <item.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t(`landing.masters.benefit${i+1}.title`) || `Перевага ${i+1}`}</h3>
                  <p className="text-blue-100">{t(`landing.masters.benefit${i+1}.desc`) || `Опис переваги ${i+1}`}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">🎁 {t('landing.masters.bonus.title') || 'Бонус для перших майстрів'}</h3>
              <p className="text-lg text-blue-100 mb-4">
                {t('landing.masters.bonus.subtitle') || 'Зареєструйтеся в перший місяць запуску та отримайте:'}
              </p>
              <ul className="space-y-2 text-blue-100">
                {[1, 2, 3].map((num) => (
                  <li key={num} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    {t(`landing.masters.bonus.item${num}`) || `Бонус ${num}`}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <button onClick={() => handleRegisterClick('master')} className="inline-block bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                {t('landing.masters.cta') || 'Почати заробляти зараз'}
              </button>
              <p className="mt-4 text-blue-100">{t('landing.masters.ctaSubtext') || 'Реєстрація займе 5 хвилин'}</p>
            </div>
          </div>
        </section>

        {/* Benefits for Clients */}
        <section id="forclients" className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                {t('landing.clients.title') || 'Клієнтам: надійний ремонт без голівного болю'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('landing.clients.subtitle') || 'Забудьте про пошук майстра через знайомих та сумнівні оголошення'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[1, 2, 3, 4].map((num, i) => (
                <div key={num} className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    {i === 0 && <Shield className="w-6 h-6 text-white" />}
                    {i === 1 && <TrendingUp className="w-6 h-6 text-white" />}
                    {i === 2 && <Star className="w-6 h-6 text-white" />}
                    {i === 3 && <MessageSquare className="w-6 h-6 text-white" />}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">
                    {t(`landing.clients.benefit${num}.title`) || `Перевага ${num}`}
                  </h3>
                  <p className="text-gray-600">
                    {t(`landing.clients.benefit${num}.desc`) || `Опис переваги ${num}`}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                  {t('landing.clients.ctaTitle') || 'Готові вирішити проблему з технікою?'}
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  {t('landing.clients.ctaDescription') || 'Створіть заявку прямо зараз — це безкоштовно та займе 2 хвилини. Отримайте пропозиції від професіоналів та оберіть найкраще'}
                </p>
                <button onClick={() => handleRegisterClick('client')} className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 mb-3">
                  {t('landing.clients.cta') || 'Створити заявку безкоштовно'}
                </button>
                <p className="text-sm text-gray-600">
                  {t('landing.clients.ctaFooter') || 'Платите тільки після виконання роботи'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('landing.trust.title') || 'Чому нам можна довіряти'}
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              {t('landing.trust.subtitle') || 'Ми будуємо платформу, якою самі хотіли б користуватися'}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {t(`landing.trust.item${num}.title`) || `Елемент ${num}`}
                  </h3>
                  <p className="text-gray-600">
                    {t(`landing.trust.item${num}.desc`) || `Опис елемента ${num}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('landing.finalCta.title') || 'Приєднуйтесь до RepairHub'}
            </h2>
            <p className="text-xl mb-10 text-blue-100">
              {t('landing.finalCta.subtitle') || 'Будьте серед перших, хто створює новий стандарт ремонту техніки в Україні'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => handleRegisterClick('master')} className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                {t('landing.finalCta.master') || 'Я майстер'}
              </button>
              <button onClick={() => handleRegisterClick('client')} className="bg-blue-500 text-white px-10 py-5 rounded-xl font-bold text-lg border-2 border-white hover:bg-blue-400 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                {t('landing.finalCta.client') || 'Мені потрібен ремонт'}
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-xl">{t('common.platformName') || 'RepairHub'}</span>
                </div>
                <p className="text-gray-400 mb-4">
                  {t('landing.footer.description') || 'Сучасна платформа для пошуку майстрів та замовлень на ремонт техніки в Україні'}
                </p>
                <p className="text-sm text-gray-500">
                  {t('landing.footer.tagline') || 'Створюємо новий стандарт сервісу'}
                </p>
      </div>

              <div>
                <h3 className="font-bold mb-3 text-lg">{t('landing.footer.links') || 'Швидкі посилання'}</h3>
                <div className="space-y-2">
                  <button onClick={() => { document.getElementById('formasters')?.scrollIntoView({ behavior: 'smooth' }); }} className="block text-gray-400 hover:text-white transition text-left">
                    {t('landing.footer.linkMasters') || 'Для майстрів'}
                  </button>
                  <button onClick={() => { document.getElementById('forclients')?.scrollIntoView({ behavior: 'smooth' }); }} className="block text-gray-400 hover:text-white transition text-left">
                    {t('landing.footer.linkClients') || 'Для клієнтів'}
                  </button>
                  <button onClick={() => { document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }); }} className="block text-gray-400 hover:text-white transition text-left">
                    {t('landing.footer.linkHow') || 'Як працює'}
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-3 text-lg">{t('landing.footer.contacts') || 'Контакти'}</h3>
                <p className="text-gray-400 mb-2">
                  <a href="mailto:support@repairhub.pro" className="hover:text-white transition">
                    support@repairhub.pro
                  </a>
                </p>
                <p className="text-gray-400 text-sm">
                  {t('landing.footer.responseTime') || 'Відповімо протягом 24 годин'}
                </p>
          </div>
        </div>
            
            <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                {t('landing.footer.copyright') || '© 2025 RepairHub. Всі права захищені'}
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="/privacy" className="hover:text-white transition">{t('landing.footer.privacy') || 'Політика конфіденційності'}</a>
                <a href="/terms" className="hover:text-white transition">{t('landing.footer.terms') || 'Умови використання'}</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
        {isLoginModalOpen && (
          <Suspense fallback={null}>
            <LoginModal 
              onClose={() => setIsLoginModalOpen(false)} 
              onSwitchToRegister={() => {
                setIsLoginModalOpen(false);
                setTimeout(() => setIsRegisterModalOpen(true), 100);
              }}
            />
          </Suspense>
        )}
        {isRegisterModalOpen && (
          <Suspense fallback={null}>
            <RegisterModal 
              onClose={() => {
                setIsRegisterModalOpen(false);
                setRegisterRole(null);
              }} 
              onSwitchToLogin={() => {
                setIsRegisterModalOpen(false);
                setTimeout(() => setIsLoginModalOpen(true), 100);
              }}
              initialRole={registerRole || undefined}
            />
          </Suspense>
        )}
    </>
  );
}
