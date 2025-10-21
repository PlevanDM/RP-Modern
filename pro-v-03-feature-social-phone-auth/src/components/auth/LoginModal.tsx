import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { authService } from '../../services/authService';

interface LoginModalProps {
  onClose: () => void;
}

export function LoginModal({ onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState<'client' | 'master' | null>(null);
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
    }
  };

  const handleQuickLogin = (userType: 'client' | 'master') => {
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

    if (isValidClient || isValidMaster) {
      const user = isValidClient ? testUsers.client : testUsers.master;
      const userData = {
        id: isValidClient ? 'client-1' : 'master-1',
        name: user.name,
        email: user.email,
        role: isValidClient ? 'client' : 'master',
        city: 'Київ',
        avatar: `https://i.pravatar.cc/96?img=${isValidClient ? 1 : 4}`
      };

      localStorage.setItem('currentUser', JSON.stringify(userData));
      window.location.href = '/';
    } else {
      setError('Невірна пошта або пароль');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-lg transition"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-5">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Вхід</h2>
          <p className="text-gray-600 mb-4 text-sm">Увійдіть до вашого акаунту</p>

          {/* Quick Login Buttons */}
          <div className="space-y-2 mb-5">
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">🧪 Тестові логіни:</p>
              <button
                onClick={() => handleQuickLogin('client')}
                className={`w-full p-3 rounded-lg border-2 transition text-left ${
                  selectedUser === 'client'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900 text-sm">👤 Клієнт</p>
                <p className="text-xs text-gray-600">anna@example.com</p>
                <p className="text-xs text-gray-500">Пароль: client123</p>
              </button>
            </div>
            <button
              onClick={() => handleQuickLogin('master')}
              className={`w-full p-3 rounded-lg border-2 transition text-left ${
                selectedUser === 'master'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="font-semibold text-gray-900 text-sm">🔧 Майстер</p>
              <p className="text-xs text-gray-600">master@example.com</p>
              <p className="text-xs text-gray-500">Пароль: master123</p>
            </button>
          </div>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">або введіть вручну</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-xs">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3">
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
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
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
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition"
            >
              Увійти
            </button>
          </form>

            <div className="flex items-center gap-2 my-4">
              <div className="h-px bg-gray-200 flex-1"></div>
              <p className="text-xs text-gray-500">АБО</p>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="space-y-2">
              <button
                onClick={async () => {
                  await authService.signInWithGoogle();
                  window.location.reload();
                }}
                className="w-full py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm"
              >
                <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
                Увійти через Google
              </button>
              <button
                onClick={async () => {
                  await authService.signInWithTelegram();
                  window.location.reload();
                }}
                className="w-full py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm"
              >
                <img src="/icons/telegram.svg" alt="Telegram" className="w-5 h-5" />
                Увійти через Telegram
              </button>
            </div>

          <p className="text-center text-gray-600 text-xs mt-4">
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
