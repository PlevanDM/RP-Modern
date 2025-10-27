import { cn } from "../../lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Badge } from "./badge";
import {
  User,
  Wrench,
  Shield,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

interface UserRole {
  id: string;
  name: string;
  role: 'client' | 'master' | 'admin';
  icon: React.ReactNode;
  description: string;
  color: string;
  benefits: string[];
}

const roles: UserRole[] = [
  {
    id: 'client',
    name: 'Клиент',
    role: 'client',
    icon: <User className="w-5 h-5" />,
    description: 'Найдите мастера для ремонта',
    color: 'from-blue-500 to-blue-600',
    benefits: [
      'Быстрый поиск мастеров',
      'Конкурентные цены',
      'Гарантия качества',
      'Безопасные платежи'
    ]
  },
  {
    id: 'master',
    name: 'Мастер',
    role: 'master',
    icon: <Wrench className="w-5 h-5" />,
    description: 'Начните зарабатывать на ремонтах',
    color: 'from-orange-500 to-red-500',
    benefits: [
      'Стабильный поток заказов',
      'Готовые клиенты',
      'Конкурентная оплата',
      'Поддержка платформы'
    ]
  },
  {
    id: 'admin',
    name: 'Администратор',
    role: 'admin',
    icon: <Shield className="w-5 h-5" />,
    description: 'Управление платформой',
    color: 'from-purple-500 to-purple-600',
    benefits: [
      'Полный контроль системы',
      'Аналитика и отчеты',
      'Управление пользователями',
      'Системные настройки'
    ]
  }
];

interface AuthSwitchProps {
  onRoleSelect?: (role: string) => void;
  className?: string;
}

export const AuthSwitch = ({ onRoleSelect, className }: AuthSwitchProps) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    if (onRoleSelect) {
      onRoleSelect(roleId);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      setSelectedRole(null);
    }, 2000);
  };

  return (
    <div className={cn("max-w-4xl mx-auto p-8 space-y-8", className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Выберите роль</h1>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Присоединяйтесь к RepairHub Pro в качестве клиента, мастера или администратора
        </p>
      </motion.div>

      {/* Role Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer",
              selectedRole === role.id
                ? "border-blue-500 shadow-lg shadow-blue-500/20"
                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
            )}
            onClick={() => handleRoleSelect(role.id)}
          >
            {/* Background gradient */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-5",
              role.color
            )} />

            <div className="relative p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-12 h-12 bg-gradient-to-r rounded-xl flex items-center justify-center text-white",
                  role.color
                )}>
                  {role.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{role.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {role.description}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                {role.benefits.map((benefit, benefitIndex) => (
                  <motion.div
                    key={benefitIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.1) + (benefitIndex * 0.05) }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Selection indicator */}
              <AnimatePresence>
                {selectedRole === role.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center justify-center mt-4"
                  >
                    <Badge className="bg-blue-500/20 text-blue-700 border-blue-400/30">
                      Выбрано
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Login Form */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Пароль</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleLogin}
                  disabled={isAuthenticated}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  {isAuthenticated ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Lock className="w-4 h-4 mr-2" />
                  )}
                  {isAuthenticated ? "Вход..." : "Войти"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
                Успешный вход!
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Добро пожаловать в RepairHub Pro
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-sm text-slate-500 dark:text-slate-400"
      >
        <p>💡 Это демо-компонент. Выберите роль и протестируйте функциональность.</p>
      </motion.div>
    </div>
  );
};
