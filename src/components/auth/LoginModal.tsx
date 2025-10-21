import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { authService } from '../../services/authService';

interface LoginModalProps {
  onClose: () => void;
}

export function LoginModal({ onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState<'client' | 'master' | 'admin' | null>(null);
  const [error, setError] = useState('');

  const testUsers = {
    client: {
      email: 'anna@example.com',
      password: 'client123',
      name: 'Анна Коваленко'
    },
    master: {
      email: 'master@example.com',
      password: 'master123',
      name: 'Олександр Петренко'
    },
    admin: {
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Адміністратор'
    }
  };

  const handleQuickLogin = (userType: 'client' | 'master' | 'admin') => {
    const user = testUsers[userType];
    setEmail(user.email);
    setPassword(user.password);
    setSelectedUser(userType);
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate credentials
    if (!email || !password) {
      setError('Заповніть усі поля');
      return;
    }

    const isValidClient = email === testUsers.client.email && password === testUsers.client.password;
    const isValidMaster = email === testUsers.master.email && password === testUsers.master.password;
    const isValidAdmin = email === testUsers.admin.email && password === testUsers.admin.password;

    if (isValidClient || isValidMaster || isValidAdmin) {
      let userData;
      if (isValidAdmin) {
        userData = {
          id: 'admin-1',
          name: testUsers.admin.name,
          email: testUsers.admin.email,
          role: 'admin',
          city: 'Київ',
          avatar: `https://i.pravatar.cc/96?img=10`
        };
      } else {
        const user = isValidClient ? testUsers.client : testUsers.master;
        userData = {
          id: isValidClient ? 'client-1' : 'master-1',
          name: user.name,
          email: user.email,
          role: isValidClient ? 'client' : 'master',
          city: 'Київ',
          avatar: `https://i.pravatar.cc/96?img=${isValidClient ? 1 : 4}`
        };
      }

      localStorage.setItem('currentUser', JSON.stringify(userData));
      window.location.href = '/';
    } else {
      setError('Невірна пошта або пароль');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-lg transition"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Вхід</h2>
          <p className="text-gray-600 mb-3 text-xs">Увійдіть до вашого акаунту</p>

          {/* Quick Login Buttons */}
          <div className="space-y-1.5 mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-1.5">🧪 Тестові логіни:</p>
              <button
                onClick={() => handleQuickLogin('client')}
                className={`w-full p-2 rounded-lg border-2 transition text-left text-xs ${
                  selectedUser === 'client'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">👤 Клієнт</p>
                <p className="text-gray-600">anna@example.com</p>
              </button>
            </div>
            <button
              onClick={() => handleQuickLogin('master')}
              className={`w-full p-2 rounded-lg border-2 transition text-left text-xs ${
                selectedUser === 'master'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="font-semibold text-gray-900">🔧 Майстер</p>
              <p className="text-gray-600">master@example.com</p>
            </button>
            <button
              onClick={() => handleQuickLogin('admin')}
              className={`w-full p-2 rounded-lg border-2 transition text-left text-xs ${
                selectedUser === 'admin'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="font-semibold text-gray-900">⚙️ Адміністратор</p>
              <p className="text-gray-600">admin@example.com</p>
            </button>
          </div>

          <div className="relative mb-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">або введіть вручну</span>
            </div>
          </div>

          {error && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-xs">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Пошта
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="ви@приклад.com"
                className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition"
            >
              Увійти
            </button>
          </form>

            <div className="flex items-center gap-2 my-3">
              <div className="h-px bg-gray-200 flex-1"></div>
              <p className="text-xs text-gray-500">АБО</p>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="space-y-1.5">
              <button
                onClick={async () => {
                  await authService.signInWithGoogle();
                  window.location.reload();
                }}
                className="w-full py-2 border-2 border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition text-xs font-semibold text-gray-700 group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button>
              <button
                onClick={async () => {
                  await authService.signInWithTelegram();
                  window.location.reload();
                }}
                className="w-full py-2 border-2 border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-400 transition text-xs font-semibold text-gray-700 group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="#0088cc"/>
                  <path d="M9.5 12L16 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9.5 12L16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9.5 12H16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Telegram</span>
              </button>
            </div>

          <p className="text-center text-gray-600 text-xs mt-3">
            Немаєте акаунту?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-semibold">
              Зареєструйтеся
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
