import React from 'react';

interface ClientProfileStepProps {
  // Props to handle form data will be added later
}

export const ClientProfileStep: React.FC<ClientProfileStepProps> = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Расскажите о себе</h2>
      <p className="text-gray-600 text-center">Эта информация поможет мастерам лучше понять, с кем они работают.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ваше имя</label>
          <input
            type="text"
            placeholder="Например, Иван Петров"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Город</label>
          <input
            type="text"
            placeholder="Например, Киев"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Номер телефона</label>
          <input
            type="tel"
            placeholder="+380 50 123 4567"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
