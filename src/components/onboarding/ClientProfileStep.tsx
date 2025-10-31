import { useState } from 'react';
import { Smartphone, Laptop } from 'lucide-react';
import { AndroidIcon, IOSIcon, WindowsIcon, MacIcon, LinuxIcon } from '../common/PlatformIcons';
import { motion } from 'framer-motion';

interface ClientProfileStepProps {
  onComplete?: (data: Record<string, unknown>) => void;
  hasInternalNavigation?: boolean;
}

export const ClientProfileStep = ({ onComplete }: ClientProfileStepProps) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [clientMobileOS, setClientMobileOS] = useState<'android' | 'ios' | null>(null);
  const [clientComputerOS, setClientComputerOS] = useState<'windows' | 'mac' | 'linux' | null>(null);
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);
  const [preferredPriority, setPreferredPriority] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<'low' | 'medium' | 'high' | null>(null);
  const [workLocation, setWorkLocation] = useState<'service' | 'home' | 'both' | null>(null);
  const [step, setStep] = useState<'info' | 'devices' | 'preferences'>('info');

  const handleInfoSubmit = () => {
    if (name && city && phone) {
      setStep('devices');
    }
  };

  const handleDeviceSubmit = () => {
    if (clientMobileOS && clientComputerOS) {
      setStep('preferences');
    }
  };

  const handleBack = () => {
    if (step === 'devices') {
      setStep('info');
    } else if (step === 'preferences') {
      setStep('devices');
    }
  };

  const handlePreferencesSubmit = () => {
    if (skillLevel && budgetRange && preferredPriority.length > 0 && workLocation) {
      onComplete?.({
        name,
        city,
        phone,
        clientMobileOS,
        clientComputerOS,
        skillLevel,
        preferredPriority,
        budgetRange,
        workLocation,
      });
    }
  };

  return (
    <div className="space-y-6">
      {step === 'info' && (
        <>
          <h2 className="text-2xl font-bold text-center">Розкажіть про себе</h2>
          <p className="text-gray-600 text-center">Ця інформація допоможе майстрам краще зрозуміти, з ким вони працюють.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ваше ім'я</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Наприклад, Іван Петров"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Місто</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Наприклад, Київ"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Номер телефону <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+380 50 123 4567"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleBack}
                disabled={step === 'info'}
                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Назад
              </button>
              <button
                onClick={handleInfoSubmit}
                disabled={!name || !city || !phone}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Далі
              </button>
            </div>
          </div>
        </>
      )}

      {step === 'devices' && (
        <>
          <h2 className="text-2xl font-bold text-center">Ваші пристрої</h2>
          <p className="text-gray-600 text-center">Це допоможе знайти відповідного майстра</p>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-gray-600" />
              Ваш мобільний пристрій
            </h3>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <motion.button
                onClick={() => setClientMobileOS('android')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  clientMobileOS === 'android'
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center">
                  <motion.div 
                    className={`mb-2 rounded-lg p-3 ${
                      clientMobileOS === 'android' ? 'bg-green-100' : 'bg-gray-100'
                    }`}
                    animate={clientMobileOS === 'android' ? {
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <AndroidIcon isSelected={clientMobileOS === 'android'} />
                  </motion.div>
                  <div className="font-medium text-sm text-gray-900">Android</div>
                </div>
              </motion.button>
              <motion.button
                onClick={() => setClientMobileOS('ios')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  clientMobileOS === 'ios'
                    ? 'border-gray-800 bg-gray-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-400 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center">
                  <motion.div 
                    className={`mb-2 rounded-lg p-3 ${
                      clientMobileOS === 'ios' ? 'bg-gray-100' : 'bg-gray-50'
                    }`}
                    animate={clientMobileOS === 'ios' ? {
                      rotate: [0, -5, 5, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <IOSIcon isSelected={clientMobileOS === 'ios'} />
                  </motion.div>
                  <div className="font-medium text-sm text-gray-900">iPhone/iOS</div>
                </div>
              </motion.button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-gray-600" />
              Ваш комп'ютер
            </h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <motion.button
                onClick={() => setClientComputerOS('windows')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  clientComputerOS === 'windows'
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center">
                  <motion.div 
                    className={`mb-1 rounded-lg p-2 ${
                      clientComputerOS === 'windows' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}
                    animate={clientComputerOS === 'windows' ? {
                      scale: [1, 1.15, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <WindowsIcon isSelected={clientComputerOS === 'windows'} />
                  </motion.div>
                  <div className="font-medium text-xs text-gray-900">Windows</div>
                </div>
              </motion.button>
              <motion.button
                onClick={() => setClientComputerOS('mac')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  clientComputerOS === 'mac'
                    ? 'border-gray-800 bg-gray-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-400 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center">
                  <motion.div 
                    className={`mb-1 rounded-lg p-2 ${
                      clientComputerOS === 'mac' ? 'bg-gray-100' : 'bg-gray-50'
                    }`}
                    animate={clientComputerOS === 'mac' ? {
                      rotate: [0, -2, 2, 0],
                      scale: [1, 1.15, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <MacIcon isSelected={clientComputerOS === 'mac'} />
                  </motion.div>
                  <div className="font-medium text-xs text-gray-900">Mac</div>
                </div>
              </motion.button>
              <motion.button
                onClick={() => setClientComputerOS('linux')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  clientComputerOS === 'linux'
                    ? 'border-yellow-500 bg-yellow-50 shadow-md'
                    : 'border-gray-200 hover:border-yellow-300 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center">
                  <motion.div 
                    className={`mb-1 rounded-lg p-2 ${
                      clientComputerOS === 'linux' ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}
                    animate={clientComputerOS === 'linux' ? {
                      rotate: [0, 360],
                      scale: [1, 1.15, 1]
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <LinuxIcon isSelected={clientComputerOS === 'linux'} />
                  </motion.div>
                  <div className="font-medium text-xs text-gray-900">Linux</div>
                </div>
              </motion.button>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleBack}
              className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
            >
              Назад
            </button>
            <button
              onClick={handleDeviceSubmit}
              disabled={!clientMobileOS || !clientComputerOS}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Далі
            </button>
          </div>
        </>
      )}

      {step === 'preferences' && (
        <>
          <h2 className="text-2xl font-bold text-center">Ваші уподобання</h2>
          <p className="text-gray-600 text-center">Щоб краще підібрати майстра для вас</p>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Навички майстра</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'beginner', label: 'Новачок', desc: 'Базові навички' },
                { id: 'intermediate', label: 'Середній', desc: 'Досвід роботи' },
                { id: 'advanced', label: 'Досвідчений', desc: 'Професійний рівень' },
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => setSkillLevel(option.id as 'beginner' | 'intermediate' | 'advanced' | null)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    skillLevel === option.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold text-sm text-gray-900 mb-1">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Що для вас найважливіше? (виберіть 1-3)</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'speed', label: 'Швидкість виконання' },
                { id: 'quality', label: 'Якість ремонту' },
                { id: 'price', label: 'Вигідна ціна' },
                { id: 'warranty', label: 'Гарантія на роботу' },
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    if (preferredPriority.includes(option.id)) {
                      setPreferredPriority(preferredPriority.filter(p => p !== option.id));
                    } else if (preferredPriority.length < 3) {
                      setPreferredPriority([...preferredPriority, option.id]);
                    }
                  }}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    preferredPriority.includes(option.id)
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <span className="font-medium text-sm text-gray-900">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Бюджет на ремонт</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'low', label: 'Економ', range: 'до 1000₴' },
                { id: 'medium', label: 'Середній', range: '1000-3000₴' },
                { id: 'high', label: 'Преміум', range: 'від 3000₴' },
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => setBudgetRange(option.id as 'low' | 'medium' | 'high' | null)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    budgetRange === option.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium text-sm text-gray-900">{option.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{option.range}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Місце роботи майстра</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'service', label: 'Сервіс', desc: 'Сервісний центр' },
                { id: 'home', label: 'Додому', desc: 'Виїздний майстер' },
                { id: 'both', label: 'Не важливо', desc: 'Будь-яке місце' },
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => setWorkLocation(option.id as 'service' | 'home' | 'both' | null)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    workLocation === option.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold text-sm text-gray-900 mb-1">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleBack}
              className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
            >
              Назад
            </button>
            <button
              onClick={handlePreferencesSubmit}
              disabled={!skillLevel || !budgetRange || preferredPriority.length === 0 || !workLocation}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Завершити
            </button>
          </div>
        </>
      )}
    </div>
  );
};
