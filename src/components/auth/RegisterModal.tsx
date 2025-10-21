import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { authService } from '../../services/authService';

interface RegisterModalProps {
  onClose: () => void;
}

export function RegisterModal({ onClose }: RegisterModalProps) {
  const [step, setStep] = useState<'role'| 'form' | 'phone' | 'success'>('role');
  const [userRole, setUserRole] = useState<'client' | 'master' | null>(null);
  const [formData, setFormData] = useState({
    login: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: 'Київ'
  });
  const [error, setError] = useState('');

  const handleRoleSelect = (role: 'client' | 'master') => {
    setUserRole(role);
    setStep('form');
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.login || !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Заповніть усі поля');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль повинен мати мінімум 6 символів');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Паролі не збігаються');
      return;
    }

    // Create user
    const newUser = {
      id: userRole === 'client' ? `client-${Date.now()}` : `master-${Date.now()}`,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: userRole,
      city: formData.city,
      avatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`
    };

    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setStep('success');

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  if (step === 'role') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Реєстрація</h2>
            <p className="text-gray-600 mb-6 text-sm">Виберіть тип акаунту</p>

            <div className="grid grid-cols-2 gap-4">
              {/* Client Option */}
              <button
                onClick={() => handleRoleSelect('client')}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition text-left group"
              >
                <div className="text-3xl mb-2">👤</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600">Клієнт</h3>
                <p className="text-gray-600 text-xs mb-3">
                  Шукаю майстра
                </p>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>✓ Замовлення</li>
                  <li>✓ Пошук</li>
                </ul>
              </button>

              {/* Master Option */}
              <button
                onClick={() => handleRoleSelect('master')}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition text-left group"
              >
                <div className="text-3xl mb-2">🔧</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600">Майстер</h3>
                <p className="text-gray-600 text-xs mb-3">
                  Пропоную услуги
                </p>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>✓ Замовлення</li>
                  <li>✓ Заробіток</li>
                </ul>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'phone') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Реєстрація за телефоном</h2>
            <p className="text-gray-600 mb-6 text-sm">Введіть ваш номер телефону та код</p>

            <form className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Номер телефону
                </label>
                <input
                  type="tel"
                  placeholder="+380 99 123 4567"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Код верифікації
                </label>
                <input
                  type="text"
                  placeholder="123456"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition text-sm"
              >
                Зареєструватися
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Успішно!</h2>
            <p className="text-gray-600 mb-6">Ваш акаунт створено. Переспрямування...</p>
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div className="bg-green-500 h-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'form') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b flex items-center justify-between p-4 gap-2">
            <button
              onClick={() => setStep('role')}
              className="text-gray-400 hover:text-gray-600 transition text-2xl"
            >
              ←
            </button>
            <h2 className="text-xl font-bold text-gray-900 flex-1">
              {userRole === 'client' ? '👤 Клієнт' : '🔧 Майстер'}
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-4">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-xs">{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Логін
                </label>
                <input
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleInputChange}
                  placeholder="Ваш логін"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Ім'я
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Ваше ім'я"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Прізвище
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Ваше прізвище"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Пошта
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ви@приклад.com"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Місто
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                >
                  <option>Київ</option>
                  <option>Харків</option>
                  <option>Львів</option>
                  <option>Одеса</option>
                  <option>Дніпро</option>
                  <option>Інше місто</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Пароль
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Підтвердіть пароль
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div className="flex items-start gap-2 py-2 px-3 bg-blue-50 rounded-lg">
                <input type="checkbox" id="terms" className="w-3 h-3 mt-0.5" />
                <label htmlFor="terms" className="text-xs text-gray-700">
                  Я погоджуюся з <a href="#" className="text-blue-600 hover:underline">Умовами</a> та{' '}
                  <a href="#" className="text-blue-600 hover:underline">Політикою</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition text-sm"
              >
                Зареєструватися
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
                Продовжити з Google
              </button>
              <button
                onClick={async () => {
                  await authService.signInWithTelegram();
                  window.location.reload();
                }}
                className="w-full py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm"
              >
                <img src="/icons/telegram.svg" alt="Telegram" className="w-5 h-5" />
                Продовжити з Telegram
              </button>
              <button
                onClick={() => setStep('phone')}
                className="w-full py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm"
              >
                <img src="/icons/phone.svg" alt="Phone" className="w-5 h-5" />
                Продовжити з телефоном
              </button>
            </div>

            <p className="text-center text-gray-600 text-xs mt-4">
              Вже маєте акаунт?{' '}
              <button className="text-blue-600 hover:text-blue-700 font-semibold">
                Увійти
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
