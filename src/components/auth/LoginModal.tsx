import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { apiAuthService } from '../../services/apiAuthService';
import { registerTestUsers } from '../../utils/testUsers';
import { initializeTestData } from '../../utils/testData';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginModal({ onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'admin' | 'social'>('social');
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);

  // Register test users and data on mount
  useEffect(() => {
    registerTestUsers();
    // Initialize test orders if they don't exist
    initializeTestData();
  }, []);

  // Quick login for test users
  const handleQuickLogin = async (role: 'client' | 'master' | 'admin' | 'superadmin') => {
    try {
      // Determine test credentials based on role (these users exist in db.json)
      const credentials = 
        role === 'client' ? { email: 'client@test.com', password: 'password123' } :
        role === 'master' ? { email: 'master@test.com', password: 'password123' } :
        role === 'admin' ? { email: 'admin@test.com', password: 'password123' } :
        { email: 'superadmin@test.com', password: 'password123' };
      
      // Call backend API to login
      await login(credentials.email, credentials.password);
      onClose();
    } catch (err) {
      console.error('Quick login error:', err);
      setError('Помилка входу');
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Заповніть усі поля');
      return;
    }

    try {
      await login(email, password);
      window.location.reload();
    } catch (err) {
      setError('Невірна пошта або пароль');
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'telegram') => {
    try {
      const tempUser = {
        id: `user-${Date.now()}`,
        name: provider === 'google' ? 'Google User' : 'Telegram User',
        email: `${provider}${Date.now()}@example.com`,
        role: 'client' as const,
        city: 'Київ',
        phone: '',
        avatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`,
        balance: 0,
        skills: [],
        specialization: 'Client',
        verified: false,
        blocked: false,
        completedOrders: 0,
      };
      
      // Безпосередньо встановлюємо користувача в store
      const { login: setLogin } = useAuthStore.getState();
      await setLogin(tempUser.email, '');
      
      // Зберігаємо в localStorage
      const { currentUser } = useAuthStore.getState();
      if (!currentUser) {
        // Якщо login не спрацював, встановлюємо напряму
        useAuthStore.setState({ currentUser: tempUser, isOnboardingCompleted: false });
      }
      
      window.location.reload();
    } catch (err) {
      console.error('Social login error:', err);
      // Спробуємо встановити безпосередньо
      try {
        const tempUser = {
          id: `user-${Date.now()}`,
          name: provider === 'google' ? 'Google User' : 'Telegram User',
          email: `${provider}${Date.now()}@example.com`,
          role: 'client' as const,
          city: 'Київ',
          phone: '',
          avatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`,
          balance: 0,
          skills: [],
          specialization: 'Client',
          verified: false,
          blocked: false,
          completedOrders: 0,
        };
        useAuthStore.setState({ currentUser: tempUser, isOnboardingCompleted: false });
        window.location.reload();
      } catch (e) {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 w-full max-w-md relative animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl mb-8">
            <button
              onClick={() => setActiveTab('social')}
              className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-200 ${activeTab === 'social' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Client / Master
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-200 ${activeTab === 'admin' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Admin
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {activeTab === 'admin' && (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Пошта</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="admin@repairhub.pro"
                  className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 min-h-[52px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 min-h-[52px]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-base hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 active:scale-[0.97] min-h-[56px]"
              >
                Увійти
              </button>
            </form>
          )}

          {activeTab === 'social' && (
            <div className="space-y-3">
              {/* Quick login buttons for test users */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => handleQuickLogin('client')}
                  className="py-3 px-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-all text-xs border border-gray-300"
                >
                  Клієнт
                </button>
                <button
                  onClick={() => handleQuickLogin('master')}
                  className="py-3 px-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-all text-xs border border-gray-300"
                >
                  Майстер
                </button>
                <button
                  onClick={() => handleQuickLogin('admin')}
                  className="py-3 px-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-all text-xs border border-gray-300"
                >
                  Admin
                </button>
                <button
                  onClick={() => handleQuickLogin('superadmin')}
                  className="py-3 px-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-all text-xs border border-gray-300"
                >
                  SuperAdmin
                </button>
              </div>

              <div className="text-center text-xs text-gray-500 mb-3">або</div>

              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full py-4 border-2 border-gray-200 rounded-2xl flex items-center justify-center gap-3 font-semibold text-gray-700 min-h-[56px] group hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg transition-all duration-200 active:scale-[0.97]"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-base">Продовжити з Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('telegram')}
                className="w-full py-4 border-2 border-gray-200 rounded-2xl flex items-center justify-center gap-3 font-semibold text-gray-700 min-h-[56px] group hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg transition-all duration-200 active:scale-[0.97]"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="#0088CC"/>
                  <path d="M9.5 12l6-4m-6 4l6 4m-6-4H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-base">Продовжити з Telegram</span>
              </button>
            </div>
          )}
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              Немає акаунту?{' '}
              <button 
                onClick={() => {
                  if (onSwitchToRegister) onSwitchToRegister();
                  else onClose();
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                Зареєструватися
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
