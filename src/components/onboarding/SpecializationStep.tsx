import React from 'react';

interface SpecializationStepProps {
  // Props to handle form data will be added later
}

export const SpecializationStep: React.FC<SpecializationStepProps> = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Ваша специализация</h2>
      <p className="text-gray-600 text-center">Расскажите клиентам, в чем вы лучший.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Основная специализация</label>
          <input
            type="text"
            placeholder="Например, Ремонт экранов iPhone"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ключевые навыки (через запятую)</label>
          <input
            type="text"
            placeholder="Например, iPhone, iPad, MacBook, замена батарей"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};
