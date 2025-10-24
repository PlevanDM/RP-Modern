import React from 'react';

interface OnboardingCompletionStepProps {
  name: string;
}

export const OnboardingCompletionStep: React.FC<OnboardingCompletionStepProps> = ({ name }) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-green-500">Поздравляем, {name}!</h2>
      <p className="text-lg text-gray-700">Ваша регистрация успешно завершена.</p>
      <p className="text-gray-600">Теперь вы можете создавать заказы, находить лучших мастеров и безопасно оплачивать ремонт.</p>
    </div>
  );
};
