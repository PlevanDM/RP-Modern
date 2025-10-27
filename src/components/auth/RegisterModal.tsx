import React, { useState } from 'react';
import { X, User, Wrench, AlertCircle } from 'lucide-react';
import { apiAuthService } from '../../services/apiAuthService';
import { useAuthStore } from '../../store/authStore';
import { ClientRegistrationQuestions } from './ClientRegistrationQuestions';
import { MasterRegistrationQuestions } from './MasterRegistrationQuestions';

interface RegisterModalProps {
  onClose: () => void;
}

export function RegisterModal({ onClose }: RegisterModalProps) {
  const [error, setError] = useState('');
  const [step, setStep] = useState<'initial' | 'role' | 'form'>('initial');
  const [selectedRole, setSelectedRole] = useState<'client' | 'master' | null>(null);
  const [userData, setUserData] = useState<any>({});
  const register = useAuthStore((state) => state.register);

  const handleSocialRegister = async (provider: 'google' | 'telegram') => {
    try {
      const tempUser = {
        id: `${provider}-${Date.now()}`,
        name: '',
        email: `${provider}.user@example.com`,
        role: 'client',
        city: '',
        avatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`,
        balance: 0,
        skills: [],
        specialization: 'Client',
        verified: false,
        blocked: false,
      };
      setUserData(tempUser);
      setStep('role');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleRoleSelected = (role: 'client' | 'master') => {
    setSelectedRole(role);
    setStep('form');
  };

  const handleComplete = (data: any) => {
    setUserData(data);
    handleFinishRegistration();
  };

  const handleFinishRegistration = async () => {
    try {
      const registrationData = { 
        ...userData, 
        role: selectedRole,
        id: `user-${Date.now()}`,
        email: userData.email || `${selectedRole}-${Date.now()}@example.com`,
        avatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 70)}`,
        balance: 0,
        skills: [],
        rating: 0,
        verified: false,
        blocked: false,
        completedOrders: 0,
      };
      
      const registeredUser = await register(registrationData);
      console.log('User registered:', registeredUser);
      window.location.reload();
    } catch (err) {
      setError('Помилка реєстрації. Спробуйте ще раз.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 w-full max-w-lg relative animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {step === 'initial' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Реєстрація</h2>
                <p className="text-gray-600 text-base">Створіть акаунт, щоб почати</p>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-3" title="Social registration is not yet implemented.">
                <button
                  disabled
                  className="w-full py-4 border-2 border-gray-200 rounded-2xl flex items-center justify-center gap-4 font-semibold text-gray-400 min-h-[56px] group cursor-not-allowed"
                >
                  <img src="/icons/google.svg" alt="Google" className="w-6 h-6 opacity-50" />
                  <span className="text-base">Продовжити з Google</span>
                </button>
                <button
                  disabled
                  className="w-full py-4 border-2 border-gray-200 rounded-2xl flex items-center justify-center gap-4 font-semibold text-gray-400 min-h-[56px] group cursor-not-allowed"
                >
                  <img src="/icons/telegram.svg" alt="Telegram" className="w-6 h-6 opacity-50" />
                  <span className="text-base">Продовжити з Telegram</span>
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-center text-gray-600 text-sm">
                  Вже маєте акаунт?{' '}
                  <button className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                    Увійти
                  </button>
                </p>
              </div>
            </>
          )}

          {step === 'role' && (
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
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </button>
                <button
                  onClick={() => handleRoleSelected('master')}
                  className="w-full py-5 px-6 border-2 border-gray-200 rounded-2xl flex items-center gap-5 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 active:scale-[0.97] group"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <Wrench className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-gray-900 mb-1">Майстер</div>
                    <div className="text-sm text-gray-600">Надаю послуги ремонту</div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </button>
              </div>
            </>
          )}

          {step === 'form' && (
            <>
              {selectedRole === 'client' ? (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Про ваші пристрої</h2>
                    <p className="text-gray-600 text-base">
                      Це допоможе знайти відповідного майстра
                    </p>
                  </div>
                  <ClientRegistrationQuestions onComplete={handleComplete} />
                </>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Про вашу роботу</h2>
                    <p className="text-gray-600 text-base">
                      Це допоможе клієнтам знайти вас
                    </p>
                  </div>
                  <MasterRegistrationQuestions onComplete={handleComplete} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
