import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, description: string) => void;
  orderTitle?: string;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  orderTitle,
}) => {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const disputeReasons = [
    { value: 'poor_quality', label: 'Погана якість роботи' },
    { value: 'not_done', label: 'Робота не виконана' },
    { value: 'wrong_parts', label: 'Використано неправильні запчастини' },
    { value: 'delay', label: 'Затримка виконання' },
    { value: 'damage', label: 'Завдано додаткових пошкоджень' },
    { value: 'other', label: 'Інше' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason && description.trim()) {
      onSubmit(reason, description);
      setReason('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              Відкрити спір
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {orderTitle && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Замовлення:</span> {orderTitle}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Причина спору <span className="text-red-500">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Оберіть причину</option>
              {disputeReasons.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Детальний опис проблеми <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Опишіть детально, що сталося, що пішло не так, які проблеми виникли..."
              required
              minLength={20}
            />
            <p className="mt-1 text-xs text-gray-500">
              Мінімум 20 символів. Будь ласка, опишіть проблему максимально детально.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Увага!</p>
                <p>
                  Після відкриття спору платіж буде заморожено. Адміністратор розгляне ваш спір
                  протягом 24 годин та прийме рішення.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={!reason || !description.trim() || description.trim().length < 20}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Відкрити спір
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

