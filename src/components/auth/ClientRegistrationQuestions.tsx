import React, { useState } from 'react';
import { Smartphone, Monitor, Laptop } from 'lucide-react';

interface ClientRegistrationQuestionsProps {
  onComplete: (data: {
    name: string;
    city: string;
    phone: string;
    clientMobileOS: 'android' | 'ios';
    clientComputerOS: 'windows' | 'mac' | 'linux';
  }) => void;
}

export function ClientRegistrationQuestions({ onComplete }: ClientRegistrationQuestionsProps) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [clientMobileOS, setClientMobileOS] = useState<'android' | 'ios' | null>(null);
  const [clientComputerOS, setClientComputerOS] = useState<'windows' | 'mac' | 'linux' | null>(null);
  const [step, setStep] = useState<'info' | 'devices'>('info');

  const handleInfoSubmit = () => {
    if (name && city && phone) {
      setStep('devices');
    }
  };

  const handleDeviceSubmit = () => {
    if (clientMobileOS && clientComputerOS) {
      onComplete({
        name,
        city,
        phone,
        clientMobileOS,
        clientComputerOS,
      });
    }
  };

  return (
    <div className="space-y-6">
      {step === 'info' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ваше ім'я</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Наприклад, Іван Петров"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Місто</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Наприклад, Київ"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Номер телефону</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380 50 123 4567"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>

          <button
            onClick={handleInfoSubmit}
            disabled={!name || !city || !phone}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Далі
          </button>
        </>
      )}

      {step === 'devices' && (
        <>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-gray-600" />
              Ваш мобільний пристрій
            </h3>
            <div className="grid grid-cols-2 gap-3">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-gray-600" />
              Ваш комп'ютер
            </h3>
            <div className="grid grid-cols-3 gap-2">
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
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Завершити реєстрацію
          </button>
        </>
      )}
    </div>
  );
}

