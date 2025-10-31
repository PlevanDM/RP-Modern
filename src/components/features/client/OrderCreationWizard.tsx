import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface WizardStep {
  id: number;
  title: string;
  description: string;
  completed?: boolean;
}

interface OrderData {
  deviceType: string;
  model: string;
  problem: string;
  budget: number;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  images: File[];
}

const getSteps = (t: (key: string) => string): WizardStep[] => [
  { id: 1, title: '📱 Пристрій', description: t('orderCreation.selectDevice') },
  { id: 2, title: '🔧 Проблема', description: t('orderCreation.describeProblem') },
  { id: 3, title: '💰 Бюджет', description: t('orderCreation.enterBudget') },
  { id: 4, title: '📸 Фото', description: t('orderCreation.uploadPhotos') },
  { id: 5, title: '✅ Підтвердження', description: t('orderCreation.reviewData') }
];

export function OrderCreationWizard({ onComplete }: { onComplete: (order: OrderData) => void }) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState<OrderData>({
    deviceType: '',
    model: '',
    problem: '',
    budget: 0,
    location: '',
    urgency: 'medium',
    images: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!orderData.deviceType) newErrors.deviceType = t('orderCreation.selectDevice');
        if (!orderData.model) newErrors.model = t('orderCreation.enterModel');
        break;
      case 2:
        if (!orderData.problem) newErrors.problem = t('orderCreation.describeProblem');
        if (orderData.problem.length < 10) newErrors.problem = t('orderCreation.minLength');
        break;
      case 3:
        if (orderData.budget <= 0) newErrors.budget = t('orderCreation.enterBudget');
        if (!orderData.location) newErrors.location = t('orderCreation.enterLocation');
        break;
      case 4:
        if (orderData.images.length === 0) newErrors.images = t('orderCreation.addPhoto');
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onComplete(orderData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Тип пристрою</label>
              <select
                value={orderData.deviceType}
                onChange={(e) => setOrderData({ ...orderData, deviceType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">{t('orderCreation.selectType')}</option>
                <option value="iPhone">iPhone</option>
                <option value="iPad">iPad</option>
                <option value="MacBook">MacBook</option>
                <option value="Samsung">Samsung</option>
                <option value="Other">Інший</option>
              </select>
              {errors.deviceType && <p className="text-red-500 text-sm mt-1">{errors.deviceType}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Модель</label>
              <input
                type="text"
                value={orderData.model}
                onChange={(e) => setOrderData({ ...orderData, model: e.target.value })}
                placeholder="Напр.: iPhone 15 Pro"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Опис проблеми</label>
              <textarea
                value={orderData.problem}
                onChange={(e) => setOrderData({ ...orderData, problem: e.target.value })}
                placeholder="Опишіть детально, що не працює..."
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-gray-500 text-xs mt-1">{orderData.problem.length}/500</p>
              {errors.problem && <p className="text-red-500 text-sm mt-1">{errors.problem}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Терміновість</label>
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setOrderData({ ...orderData, urgency: level })}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      orderData.urgency === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {level === 'low' ? '⭕ Звичайна' : level === 'medium' ? '🟡 Середня' : '🔴 Терміно'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ваш бюджет (грн)</label>
              <input
                type="number"
                value={orderData.budget}
                onChange={(e) => setOrderData({ ...orderData, budget: Number(e.target.value) })}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Місцеположення</label>
              <input
                type="text"
                value={orderData.location}
                onChange={(e) => setOrderData({ ...orderData, location: e.target.value })}
                placeholder="Місто, вулиця"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Додайте фотографії пристрою</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setOrderData({ ...orderData, images: Array.from(e.target.files) });
                    }
                  }}
                  className="hidden"
                  id="images"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <p className="text-gray-600">📸 Натисніть або перетягніть фотографії</p>
                  <p className="text-gray-500 text-sm">PNG, JPG до 5 МБ</p>
                </label>
              </div>
              {orderData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {orderData.images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={URL.createObjectURL(img)}
                        alt="Preview"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <p className="text-xs text-gray-600 mt-1">{img.name}</p>
                    </div>
                  ))}
                </div>
              )}
              {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">📋 Перевірте ваше замовлення:</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Пристрій:</strong> {orderData.deviceType} {orderData.model}</p>
                <p><strong>Проблема:</strong> {orderData.problem}</p>
                <p><strong>Бюджет:</strong> {orderData.budget} грн</p>
                <p><strong>Терміновість:</strong> {orderData.urgency === 'low' ? 'Звичайна' : orderData.urgency === 'medium' ? 'Середня' : 'Терміно'}</p>
                <p><strong>Місцеположення:</strong> {orderData.location}</p>
                <p><strong>Фото:</strong> {orderData.images.length} файлів</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-700">
                <p className="font-medium">✅ Все готово!</p>
                <p className="text-xs mt-1">Майстри отримають ваше замовлення та почнуть відправляти пропозиції.</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎯 {t('orderCreation.createOrder')}</h1>
        <p className="text-gray-600">{t('orderCreation.stepByStep')}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {getSteps(t).map((step, idx) => (
            <div key={step.id} className="flex-1 flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  currentStep >= step.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          {getSteps(t).map((step) => (
            <span key={step.id} className="text-center flex-1">{step.title}</span>
          ))}
        </div>
      </div>

      {/* Current Step */}
      <div className="mb-8 min-h-96">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{STEPS[currentStep - 1].title}</h2>
        <p className="text-gray-600 mb-6">{STEPS[currentStep - 1].description}</p>
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" /> Назад
        </button>
        
        {currentStep < 5 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition ml-auto"
          >
            Далі <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition ml-auto"
          >
            <Check className="w-5 h-5" /> {t('orderCreation.createOrder')}
          </button>
        )}
      </div>
    </div>
  );
}
