import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { User, Wrench, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onLogin?: (userId: string) => void;
}

const ModernLandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const login = useAuthStore((state) => state.login);

  const handleRoleSelect = (role: 'client' | 'master') => {
    // Map role to user ID
    const userId = role === 'client' ? 'client1' : 'master1';

    if (onLogin) {
      onLogin(userId);
    } else if (login) {
      // Use Zustand store if no onLogin callback
      login(userId);
    }
  };

  const roles = [
    {
      id: 'client',
      title: 'Клиент',
      description: 'Найдите мастера для ремонта',
      icon: <User className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      benefits: ['Быстрый поиск мастеров', 'Конкурентные цены', 'Гарантия качества']
    },
    {
      id: 'master',
      title: 'Мастер',
      description: 'Начните зарабатывать на ремонтах',
      icon: <Wrench className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      benefits: ['Новые заказы', 'Стабильный доход', 'Рост репутации']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Wrench className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Repair HUB</h1>
              <p className="text-blue-300 text-lg">Pro</p>
            </div>
          </div>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Современная платформа для ремонта мобильной электроники
          </p>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 cursor-pointer hover:bg-white/15 transition-all">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center mb-4 mx-auto`}>
                  {role.icon}
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-2">
                  {role.title}
                </h3>
                <p className="text-gray-300 text-center mb-4">
                  {role.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {role.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleRoleSelect(role.id as 'client' | 'master')}
                  className={`w-full bg-gradient-to-r ${role.color} hover:opacity-90 text-white border-0`}
                >
                  Войти как {role.title}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Shield className="w-4 h-4" />
            <span>Безопасная платформа • Гарантия качества</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModernLandingPage;