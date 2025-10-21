import React, { useState } from 'react';
import { X, Send, Clock, DollarSign, FileText } from 'lucide-react';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  orderTitle: string;
  clientName: string;
  budget: number;
  onSubmit: (price: number, description: string) => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  orderTitle,
  clientName,
  budget,
  onSubmit,
}) => {
  const [price, setPrice] = useState(budget || 0);
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('2-3 години');
  const [warranty, setWarranty] = useState('6 місяців');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(price, description);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Відправити пропозицію</h2>
            <p className="text-sm text-gray-600 mt-1">
              Замовлення: {orderTitle} • {clientName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Ваша ціна (грн)
            </label>
            <div className="relative">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Введіть вашу ціну"
                min="0"
                step="100"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                грн
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Бюджет клієнта: {(budget || 0).toLocaleString('uk-UA')} грн
            </p>
          </div>

          {/* Estimated Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Час виконання
            </label>
            <select
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="1-2 години">1-2 години</option>
              <option value="2-3 години">2-3 години</option>
              <option value="3-5 годин">3-5 годин</option>
              <option value="1 день">1 день</option>
              <option value="2-3 дні">2-3 дні</option>
              <option value="1 тиждень">1 тиждень</option>
            </select>
          </div>

          {/* Warranty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Гарантія
            </label>
            <select
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="1 місяць">1 місяць</option>
              <option value="3 місяці">3 місяці</option>
              <option value="6 місяців">6 місяців</option>
              <option value="1 рік">1 рік</option>
              <option value="2 роки">2 роки</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Опис робіт
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
              placeholder="Опишіть детально, що буде зроблено, які запчастини використовуються, особливості ремонту..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Детальний опис допоможе клієнту зрозуміти якість ваших послуг
            </p>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Підсумок пропозиції</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Ціна:</span>
                <span className="font-medium">{price.toLocaleString('uk-UA')} грн</span>
              </div>
              <div className="flex justify-between">
                <span>Час виконання:</span>
                <span className="font-medium">{estimatedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Гарантія:</span>
                <span className="font-medium">{warranty}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Відправити пропозицію
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
