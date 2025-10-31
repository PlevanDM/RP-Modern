import { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { User, PaymentMethod } from '../types';

interface PaymentMethodsProps {
  currentUser: User;
}

export function PaymentMethods({ currentUser }: PaymentMethodsProps) {
  const [methods, setMethods] = useState<PaymentMethod[]>(
    currentUser.paymentMethods || []
  );

  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleAddMethod = () => {
    if (formData.cardNumber.trim()) {
      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: 'card',
        name: formData.cardName || 'Карта',
        last4: formData.cardNumber.slice(-4),
        expiryDate: formData.expiryDate,
        isDefault: false,
        isActive: true,
      };
      setMethods([...methods, newMethod]);
      setFormData({ cardNumber: '', cardName: '', expiryDate: '', cvv: '' });
      setShowAdd(false);
    }
  };

  const handleDelete = (id: string) => {
    setMethods(methods.filter(m => m.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setMethods(methods.map(m => ({
      ...m,
      isDefault: m.id === id
    })));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Способи оплати</h1>
          <p className="text-gray-600 mt-2">Керуйте своїми картками і способами оплати</p>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
            >
              <Plus className="w-5 h-5" />
              Додати картку
            </button>
          </div>

          {/* Add New Method Form */}
          {showAdd && (
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Додати нову картку</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-2">Номер картки</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    maxLength={19}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-2">Ім'я на картці</label>
                    <input
                      type="text"
                      placeholder="JOHN DOE"
                      value={formData.cardName}
                      onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-2">Термін</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      maxLength={5}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddMethod}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                  >
                    Додати
                  </button>
                  <button
                    onClick={() => setShowAdd(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg transition font-medium"
                  >
                    Скасувати
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Methods List */}
          <div className="p-6 space-y-3">
            {methods.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Немає доданих способів оплати</p>
            ) : (
              methods.map(method => (
                <div
                  key={method.id}
                  className={`p-4 rounded-xl border-2 transition ${
                    method.isDefault
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">💳</span>
                      <div>
                        <p className="font-semibold text-gray-900">{method.name} •••• {method.last4}</p>
                        {method.expiryDate && (
                          <p className="text-sm text-gray-600">Termination: {method.expiryDate}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                          <span className="text-2xl">✅</span>
                          За замовчуванням
                        </span>
                      )}
                      {!method.isDefault && (
                        <button
                          onClick={() => handleSetDefault(method.id)}
                          className="px-3 py-1 text-blue-600 border border-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition"
                        >
                          Встановити як за замовчуванням
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(method.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
