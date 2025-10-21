import { useState } from 'react';
import { Lock, CheckCircle, AlertCircle, ArrowRight, CreditCard, Shield } from 'lucide-react';

interface EscrowPaymentFlowProps {
  orderId: string;
  amount: number;
  masterName: string;
  onPaymentComplete: () => void;
}

export function EscrowPaymentFlow({ orderId, amount, masterName, onPaymentComplete }: EscrowPaymentFlowProps) {
  const [currentStep, setCurrentStep] = useState<'info' | 'payment' | 'confirmation' | 'completed'>('info');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  const paymentMethods = [
    { id: 'card', name: '💳 Банківська карта', fee: 1.5 },
    { id: 'mono', name: '📱 Mono Bank', fee: 0 },
    { id: 'crypto', name: '₿ Крипто', fee: 2 }
  ];

  const steps = [
    { id: 'info', label: 'Інформація', icon: '📋' },
    { id: 'payment', label: 'Оплата', icon: '💰' },
    { id: 'confirmation', label: 'Підтвердження', icon: '✓' },
    { id: 'completed', label: 'Завершено', icon: '🎉' }
  ];

  const getCurrentFee = () => {
    const method = paymentMethods.find(m => m.id === selectedPaymentMethod);
    return amount * (method?.fee || 0) / 100;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🛡️ Escrow Платіж</h1>
        <p className="text-gray-600">Безпечна оплата через систему трьох сторін</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex-1 flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition ${
                  currentStep === step.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : ['info', 'payment', 'confirmation', 'completed'].indexOf(currentStep) > steps.indexOf(step)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                }`}
              >
                {['info', 'payment', 'confirmation', 'completed'].indexOf(currentStep) > steps.indexOf(step) ? '✓' : step.icon}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition ${
                    ['info', 'payment', 'confirmation', 'completed'].indexOf(currentStep) > steps.indexOf(step)
                      ? 'bg-green-600'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          {steps.map(step => (
            <span key={step.id} className="text-center flex-1">{step.label}</span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mb-10 min-h-64">
        {currentStep === 'info' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Як працює Escrow?
              </h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>Ви надсилаєте кошти на Escrow рахунок (безпечно, ми не використовуємо їх)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>Майстер починає роботу над замовленням</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>Після завершення ви підтверджуєте якість роботи</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">4.</span>
                  <span>Кошти переводяться майстру</span>
                </li>
              </ol>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Замовлення деталі
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>ID замовлення:</strong> {orderId}</p>
                <p><strong>Майстер:</strong> {masterName}</p>
                <p><strong>Сума:</strong> <span className="font-bold text-lg text-gray-900">{amount} ₴</span></p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'payment' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Виберіть спосіб оплати</h3>
              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <label key={method.id} className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition hover:bg-gray-50" style={{ borderColor: selectedPaymentMethod === method.id ? '#2563eb' : '#e5e7eb' }}>
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedPaymentMethod === method.id}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 flex-1">
                      <span className="font-medium text-gray-900">{method.name}</span>
                      <span className="text-sm text-gray-600 ml-2">Комісія: {method.fee}%</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <p className="text-sm font-medium text-amber-900 mb-2">📊 Розрахунок:</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Сума замовлення:</span>
                  <span className="font-semibold">{amount} ₴</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Комісія ({paymentMethods.find(m => m.id === selectedPaymentMethod)?.fee}%):</span>
                  <span className="font-semibold">{getCurrentFee().toFixed(2)} ₴</span>
                </div>
                <div className="border-t border-amber-300 pt-1 flex justify-between font-bold text-gray-900 text-base">
                  <span>Всього до сплати:</span>
                  <span className="text-lg text-amber-700">{(amount + getCurrentFee()).toFixed(2)} ₴</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'confirmation' && (
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Підтвердження платежу
              </h3>
              <p className="text-gray-700 mb-4">Ви готові відправити платіж на суму:</p>
              <p className="text-4xl font-bold text-gray-900 mb-6">{(amount + getCurrentFee()).toFixed(2)} ₴</p>
              <p className="text-sm text-gray-600">
                Нажимаючи "Підтвердити", ви погоджуєтеся з умовами Escrow та умовами обслуговування.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <p className="text-sm text-blue-900">
                Ваш платіж захищено та буде утримуватися до завершення роботи.
              </p>
            </div>
          </div>
        )}

        {currentStep === 'completed' && (
          <div className="text-center space-y-6">
            <div className="text-6xl">🎉</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Платіж успішно обробленoї!</h3>
              <p className="text-gray-600">Ваш платіж на суму {(amount + getCurrentFee()).toFixed(2)} ₴ отримано</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">📧 Протокол платежу отримано на вашу пошту</p>
              <p className="text-sm text-gray-600">ID транзакції: ESC-{Date.now()}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {currentStep !== 'info' && (
          <button
            onClick={() => {
              const order = ['info', 'payment', 'confirmation', 'completed'];
              const currentIdx = order.indexOf(currentStep);
              if (currentIdx > 0) {
                setCurrentStep(order[currentIdx - 1] as any);
              }
            }}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            ← Назад
          </button>
        )}

        {currentStep !== 'completed' && (
          <button
            onClick={() => {
              const order: any[] = ['info', 'payment', 'confirmation', 'completed'];
              const currentIdx = order.indexOf(currentStep);
              if (currentIdx < order.length - 1) {
                setCurrentStep(order[currentIdx + 1]);
              } else {
                onPaymentComplete();
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition ml-auto"
          >
            {currentStep === 'confirmation' ? 'Підтвердити платіж' : 'Далі'}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {currentStep === 'completed' && (
          <button
            onClick={onPaymentComplete}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition ml-auto"
          >
            ✓ Готово
          </button>
        )}
      </div>
    </div>
  );
}
