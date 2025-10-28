import React, { useState } from 'react';
import { X, User, Wrench, AlertCircle, ChevronRight, Smartphone, Monitor, Laptop, ArrowLeft } from 'lucide-react';
import { apiAuthService } from '../../services/apiAuthService';
import { useAuthStore } from '../../store/authStore';

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

export function RegisterModal({ onClose, onSwitchToLogin }: RegisterModalProps) {
  const [error, setError] = useState('');
  const [step, setStep] = useState<'role' | 'info' | 'devices'>('role');
  const [selectedRole, setSelectedRole] = useState<'client' | 'master' | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
    email: '',
  });

  // Client specific
  const [clientMobileOS, setClientMobileOS] = useState<'android' | 'ios' | null>(null);
  const [clientComputerOS, setClientComputerOS] = useState<'windows' | 'mac' | 'linux' | null>(null);

  // Master specific
  const [workLocation, setWorkLocation] = useState<'service' | 'home' | null>(null);
  const [masterSkills, setMasterSkills] = useState<string[]>([]);

  const register = useAuthStore((state) => state.register);

  const handleRoleSelected = (role: 'client' | 'master') => {
    setSelectedRole(role);
    setStep('info');
  };

  const handleInfoSubmit = () => {
    if (formData.name && formData.city && formData.phone) {
      setStep('devices');
    }
  };

  const handleBack = () => {
    if (step === 'devices') {
      setStep('info');
    } else if (step === 'info') {
      setStep('role');
    }
  };

  const handleFinishRegistration = async () => {
    try {
      const registrationData = { 
        name: formData.name,
        email: formData.email || `${selectedRole}${Date.now()}@example.com`,
        phone: formData.phone,
        city: formData.city,
        role: selectedRole || 'client',
        id: `user-${Date.now()}`,
        avatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`,
        balance: 0,
        skills: selectedRole === 'master' ? masterSkills : [],
        rating: 0,
        verified: false,
        blocked: false,
        completedOrders: 0,
        specialization: selectedRole === 'master' ? 'Masters' : 'Client',
        clientMobileOS: selectedRole === 'client' ? clientMobileOS : undefined,
        clientComputerOS: selectedRole === 'client' ? clientComputerOS : undefined,
        workLocation: selectedRole === 'master' ? workLocation : undefined,
      };
      
      try {
        const registeredUser = await register(registrationData);
        console.log('User registered:', registeredUser);
      } catch (registerErr) {
        console.warn('Register failed, setting directly:', registerErr);
        // Якщо register не спрацював, встановлюємо напряму
        useAuthStore.setState({ 
          currentUser: registrationData as any, 
          isOnboardingCompleted: false 
        });
      }
      
      onClose();
      window.location.reload();
    } catch (err) {
      console.error('Registration error:', err);
      setError('Помилка реєстрації. Спробуйте ще раз.');
    }
  };

  const renderStepContent = () => {
    if (step === 'role') {
      return (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Оберіть роль</h2>
            <p className="text-gray-600 text-base">Хто ви?</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelected('client')}
              className="w-full py-5 px-6 border-2 border-gray-200 rounded-2xl flex items-center gap-5 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 active:scale-[0.97] group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left flex-1">
                <div className="font-bold text-gray-900 mb-1">Клієнт</div>
                <div className="text-sm text-gray-600">Шукаю майстра для ремонту</div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
            <button
              onClick={() => handleRoleSelected('master')}
              className="w-full py-5 px-6 border-2 border-gray-200 rounded-2xl flex items-center gap-5 hover:border-orange-500 hover:bg-orange-50 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 active:scale-[0.97] group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Wrench className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-left flex-1">
                <div className="font-bold text-gray-900 mb-1">Майстер</div>
                <div className="text-sm text-gray-600">Надаю послуги ремонту</div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </>
      );
    }

    if (step === 'info') {
      return (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ваші дані</h2>
            <p className="text-gray-600 text-sm">Введіть базову інформацію</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ваше ім'я</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Іван Петров"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Місто</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Київ"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+380 50 123 4567"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={handleInfoSubmit}
              disabled={!formData.name || !formData.city || !formData.phone}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              Продовжити
            </button>
          </div>
        </>
      );
    }

    if (step === 'devices') {
      if (selectedRole === 'client') {
        return (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ваші пристрої</h2>
              <p className="text-gray-600 text-sm">Це допоможе знайти відповідного майстра</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  Мобільний пристрій
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {(['android', 'ios'] as const).map(os => (
                    <button
                      key={os}
                      onClick={() => setClientMobileOS(os)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        clientMobileOS === os
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                          clientMobileOS === os ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Smartphone className={`w-6 h-6 ${os === 'ios' ? 'text-gray-900' : 'text-green-600'}`} />
                        </div>
                        <div className="font-medium text-sm">{os === 'ios' ? 'iOS' : 'Android'}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-gray-600" />
                  Комп'ютер
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {(['windows', 'mac', 'linux'] as const).map(os => (
                    <button
                      key={os}
                      onClick={() => setClientComputerOS(os)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        clientComputerOS === os
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-10 h-10 rounded-lg mx-auto mb-1 flex items-center justify-center ${
                          clientComputerOS === os ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Monitor className="w-5 h-5 text-gray-700" />
                        </div>
                        <div className="font-medium text-xs">{os}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleFinishRegistration}
                disabled={!clientMobileOS || !clientComputerOS}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                Завершити реєстрацію
              </button>
            </div>
          </>
        );
      } else {
        // Master devices
        return (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Місце роботи</h2>
              <p className="text-gray-600 text-sm">Де ви працюєте?</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setWorkLocation('service')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    workLocation === 'service'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                      workLocation === 'service' ? 'bg-orange-100' : 'bg-gray-100'
                    }`}>
                      <User className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="font-medium text-sm">Сервіс</div>
                    <div className="text-xs text-gray-600 mt-1">Сервісний центр</div>
                  </div>
                </button>
                <button
                  onClick={() => setWorkLocation('home')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    workLocation === 'home'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                      workLocation === 'home' ? 'bg-orange-100' : 'bg-gray-100'
                    }`}>
                      <Laptop className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="font-medium text-sm">Додому</div>
                    <div className="text-xs text-gray-600 mt-1">Виїзний майстер</div>
                  </div>
                </button>
              </div>

              <button
                onClick={handleFinishRegistration}
                disabled={!workLocation}
                className="w-full py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-all disabled:opacity-50"
              >
                Завершити реєстрацію
              </button>
            </div>
          </>
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 w-full max-w-lg relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-1">Реєстрація</h2>
          <p className="text-white/80 text-sm">
            {step === 'role' && 'Оберіть роль'}
            {step === 'info' && 'Введіть дані'}
            {step === 'devices' && selectedRole === 'client' && 'Ваші пристрої'}
            {step === 'devices' && selectedRole === 'master' && 'Місце роботи'}
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {renderStepContent()}

          {/* Back button */}
          {step !== 'role' && (
            <button
              onClick={handleBack}
              className="mt-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад
            </button>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Вже маєте акаунт?{' '}
              <button 
                onClick={() => {
                  if (onSwitchToLogin) onSwitchToLogin();
                  else onClose();
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Увійти
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
