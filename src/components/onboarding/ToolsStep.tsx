import React from 'react';

interface ToolsStepProps {
  // Props to handle form data will be added later
}

export const ToolsStep: React.FC<ToolsStepProps> = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Ваш инструмент</h2>
      <p className="text-gray-600 text-center">Укажите, какое оборудование вы используете. Это повышает доверие.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Инструменты (через запятую)</label>
          <input
            type="text"
            placeholder="Например, Паяльная станция, микроскоп, осциллограф"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};
