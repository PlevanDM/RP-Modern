import React from 'react';

interface DeviceStepProps {
  onSkip?: () => void;
}

export const DeviceStep: React.FC<DeviceStepProps> = ({ onSkip }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Добавьте ваше устройство</h2>
        <p className="text-gray-600">Это поможет мастерам сразу понять, с чем предстоит работать. Этот шаг можно пропустить.</p>
      </div>

      <div className="space-y-4 p-4 border rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">Бренд</label>
          <input
            type="text"
            placeholder="Например, Apple"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Модель</label>
          <input
            type="text"
            placeholder="Например, iPhone 15 Pro"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Что случилось?</label>
          <textarea
            placeholder="Например, разбит экран"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            rows={3}
          />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onSkip}
          className="text-blue-500 hover:underline"
        >
          Пропустить этот шаг
        </button>
      </div>
    </div>
  );
};
