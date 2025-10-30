import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, AlertCircle, HelpCircle, Copy, Check } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { initializeTestUsers } from '../../utils/testLoginUsers';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

// Тестові користувачі
const TEST_USERS = [
  { email: 'admin@test.com', password: 'admin123', role: 'Адмін', name: 'Адмін Тест' },
  { email: 'master1@test.com', password: 'master123', role: 'Майстер 1', name: 'Майстер Сервісний' },
  { email: 'master2@test.com', password: 'master123', role: 'Майстер 2', name: 'Майстер Виїздний' },
  { email: 'master3@test.com', password: 'master123', role: 'Майстер 3', name: 'Майстер Домашній' },
  { email: 'client1@test.com', password: 'client123', role: 'Клієнт 1', name: 'Клієнт iOS' },
  { email: 'client2@test.com', password: 'client123', role: 'Клієнт 2', name: 'Клієнт Android' },
  { email: 'client3@test.com', password: 'client123', role: 'Клієнт 3', name: 'Клієнт Windows' },
  { email: 'client4@test.com', password: 'client123', role: 'Клієнт 4', name: 'Клієнт Mac' },
  { email: 'superadmin@test.com', password: 'admin123', role: 'Суперадмін', name: 'Суперадмін Тест' },
  { email: 'test@test.com', password: 'test123', role: 'Тестовий', name: 'Тестовий Користувач' },
];

export function LoginModal({ onClose, onSwitchToRegister }: LoginModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTestUsers, setShowTestUsers] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // Ініціалізуємо тестових користувачів при відкритті модального вікна
  useEffect(() => {
    initializeTestUsers();
  }, []);

  // Clear error when typing
  useEffect(() => {
    if (error) {
      setError('');
    }
  }, [email, password]);
  
  const login = useAuthStore((state) => state.login);

  // Real login with email and password
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      setError(t('common.fillAllFields') || 'Заповніть всі поля');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Login with email and password (password is required)
      await login(email, password);
      onClose(); // Close modal on success - App.tsx will handle navigation
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.response?.data?.message || t('auth.invalidCredentials') || 'Невірний email або пароль');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseTestUser = (testEmail: string, testPassword: string) => {
    setEmail(testEmail);
    setPassword(testPassword);
    setShowTestUsers(false);
  };

  const handleCopyCredentials = async (testEmail: string, testPassword: string, index: number) => {
    const text = `${testEmail}:${testPassword}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/20 w-full max-w-md relative animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="relative px-5 sm:px-6 md:px-8 pt-5 sm:pt-6 md:pt-8 pb-4">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <div className="flex items-start justify-between gap-4 pr-12">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('auth.login') || 'Вхід'}</h2>
                <button
                  type="button"
                  onClick={() => setShowTestUsers(!showTestUsers)}
                  className="p-1.5 hover:bg-blue-100 rounded-lg transition text-gray-500 hover:text-blue-600"
                  title={t('auth.testUsers') || 'Тестові користувачі'}
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">{t('auth.loginDescription') || t('auth.login')}</p>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 overflow-y-auto flex-1">

          {/* Тестові користувачі */}
          {showTestUsers && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                {t('auth.testUsers') || 'Тестові користувачі'}
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {TEST_USERS.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                      <p className="text-xs text-gray-500">{t('auth.password')}: {user.password}</p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <button
                        type="button"
                        onClick={() => handleCopyCredentials(user.email, user.password, index)}
                        className="p-1.5 hover:bg-blue-100 rounded text-blue-600 transition"
                        title={t('common.copy') || 'Копіювати'}
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUseTestUser(user.email, user.password)}
                        className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        {t('common.use') || 'Використати'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                {t('auth.email') || 'Email'} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="your.email@example.com"
                required
                disabled={isLoading}
                className="w-full px-4 py-3.5 sm:py-3 text-base sm:text-lg bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 min-h-[56px] sm:min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                {t('auth.password') || 'Пароль'} <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="w-full px-4 py-3.5 sm:py-3 text-base sm:text-lg bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 min-h-[56px] sm:min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 active:scale-[0.97] min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {isLoading ? (t('auth.loggingIn') || 'Вхід...') : (t('auth.login') || 'Увійти')}
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              {t('auth.noAccount') || 'Немає аккаунта?'}{' '}
              <button 
                onClick={() => {
                  if (onSwitchToRegister) onSwitchToRegister();
                  else onClose();
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                {t('auth.register') || 'Зареєструватися'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
