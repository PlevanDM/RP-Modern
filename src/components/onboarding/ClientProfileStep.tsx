import { useState } from 'react';
import { Smartphone, Monitor, Tablet, Laptop, Watch } from 'lucide-react';

interface ClientProfileStepProps {
  onComplete?: (data: any) => void;
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

  const handlePreferencesSubmit = () => {
    if (skillLevel && budgetRange && preferredPriority.length > 0) {
      onComplete?.({
        name,
        city,
        phone,
        clientMobileOS,
        clientComputerOS,
        skillLevel,
        preferredPriority,
        budgetRange,
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
              <label className="block text-sm font-medium text-gray-700">Номер телефону</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+380 50 123 4567"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleInfoSubmit}
              disabled={!name || !city || !phone}
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Далі
            </button>
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
              <button
                onClick={() => setClientMobileOS('android')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  clientMobileOS === 'android'
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`mb-2 rounded-lg p-3 ${
                    clientMobileOS === 'android' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Smartphone className="w-8 h-8 text-gray-700" />
                  </div>
                  <div className="font-medium text-sm text-gray-900">Android</div>
                </div>
              </button>
              <button
                onClick={() => setClientMobileOS('ios')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  clientMobileOS === 'ios'
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`mb-2 rounded-lg p-3 ${
                    clientMobileOS === 'ios' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Smartphone className="w-8 h-8 text-gray-700" />
                  </div>
                  <div className="font-medium text-sm text-gray-900">iPhone/iOS</div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-gray-600" />
              Ваш комп'ютер
            </h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <button
                onClick={() => setClientComputerOS('windows')}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  clientComputerOS === 'windows'
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`mb-1 rounded-lg p-2 ${
                    clientComputerOS === 'windows' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Monitor className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="font-medium text-xs text-gray-900">Windows</div>
                </div>
              </button>
              <button
                onClick={() => setClientComputerOS('mac')}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  clientComputerOS === 'mac'
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`mb-1 rounded-lg p-2 ${
                    clientComputerOS === 'mac' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Laptop className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="font-medium text-xs text-gray-900">Mac</div>
                </div>
              </button>
              <button
                onClick={() => setClientComputerOS('linux')}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  clientComputerOS === 'linux'
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`mb-1 rounded-lg p-2 ${
                    clientComputerOS === 'linux' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Laptop className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="font-medium text-xs text-gray-900">Linux</div>
                </div>
              </button>
            </div>
          </div>

          <button
            onClick={handleDeviceSubmit}
            disabled={!clientMobileOS || !clientComputerOS}
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Далі
          </button>
        </>
      )}

      {step === 'preferences' && (
        <>
          <h2 className="text-2xl font-bold text-center">Ваші уподобання</h2>
          <p className="text-gray-600 text-center">Щоб краще підібрати майстра для вас</p>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Рівень навичок роботи з технікою</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'beginner', label: 'Новачок', icon: '🌱' },
                { id: 'intermediate', label: 'Середній', icon: '⚙️' },
                { id: 'advanced', label: 'Досвідчений', icon: '💻' },
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => setSkillLevel(option.id as any)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    skillLevel === option.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="font-medium text-xs text-gray-900">{option.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Що для вас найважливіше? (виберіть 1-3)</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'speed', label: 'Швидкість', icon: '⚡' },
                { id: 'quality', label: 'Якість', icon: '⭐' },
                { id: 'price', label: 'Вигідна ціна', icon: '💰' },
                { id: 'warranty', label: 'Гарантія', icon: '🛡️' },
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
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{option.icon}</span>
                    <span className="font-medium text-xs text-gray-900">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Бюджет на ремонт</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'low', label: 'Економ', icon: '💵', range: 'до 1000₴' },
                { id: 'medium', label: 'Середній', icon: '💳', range: '1000-3000₴' },
                { id: 'high', label: 'Преміум', icon: '💎', range: 'від 3000₴' },
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => setBudgetRange(option.id as any)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    budgetRange === option.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-xl mb-1">{option.icon}</div>
                    <div className="font-medium text-xs text-gray-900">{option.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{option.range}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePreferencesSubmit}
            disabled={!skillLevel || !budgetRange || preferredPriority.length === 0}
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Завершити
          </button>
        </>
      )}
    </div>
  );
};
