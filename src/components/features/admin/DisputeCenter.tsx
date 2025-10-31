import React, { useState, useEffect } from 'react';
import { Dispute } from '../../../types';
import { useOrdersStore } from '../../../store/ordersStore';
import { useUIStore } from '../../../store/uiStore';

// Mock data for disputes
const mockDisputes: Dispute[] = [
  { id: '1', orderId: 'order2', clientId: 'client2', masterId: 'master2', reason: 'Погана якість роботи', description: 'Ремонт виконано неякісно.', status: 'open', createdAt: new Date() },
  { id: '2', orderId: 'order4', clientId: 'client1', masterId: 'master4', reason: 'Товар не відповідає опису', description: 'Використано неправильну деталь.', status: 'investigating', createdAt: new Date() },
  { id: '3', orderId: 'order5', clientId: 'client2', masterId: 'master1', reason: 'Ніколи не отримав', description: 'Майстер так і не прийшов.', status: 'resolved', createdAt: new Date(), resolution: 'Повне відшкодування', resolvedAt: new Date() },
];

export function DisputeCenter() {
  const [disputes, setDisputes] = useState<Dispute[]>(mockDisputes);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [decision, setDecision] = useState<'client_wins' | 'master_wins' | 'compromise'>('client_wins');
  const [explanation, setExplanation] = useState('');
  const { resolveDispute } = useOrdersStore();
  const { showNotification } = useUIStore();

  useEffect(() => {
    // Fetch disputes from localStorage
    const storedDisputes = JSON.parse(localStorage.getItem('disputes') || '[]');
    if (storedDisputes.length > 0) {
      setDisputes(storedDisputes);
    }
    
    // Listen for dispute updates
    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem('disputes') || '[]');
      setDisputes(updated);
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000); // Poll for updates
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleResolveClick = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setShowResolveModal(true);
    setDecision('client_wins');
    setExplanation('');
  };

  const handleConfirmResolve = () => {
    if (!selectedDispute || !explanation.trim()) {
      showNotification('Будь ласка, введіть пояснення рішення', 'error');
      return;
    }
    
    resolveDispute(selectedDispute.id, decision, explanation);
    setShowResolveModal(false);
    setSelectedDispute(null);
    setExplanation('');
    
    // Refresh disputes
    const updated = JSON.parse(localStorage.getItem('disputes') || '[]');
    setDisputes(updated);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Центр Вирішення Спорів</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Замовлення</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Причина</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Дії</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {disputes.map((dispute) => (
            <tr key={dispute.id}>
              <td className="px-6 py-4 whitespace-nowrap">{dispute.orderId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{dispute.reason}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  dispute.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  dispute.status === 'open' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {dispute.status === 'open' ? 'відкрито' :
                   dispute.status === 'investigating' ? 'розслідується' :
                   dispute.status === 'resolved' ? 'вирішено' :
                   dispute.status === 'escalated' ? 'ескальовано' : dispute.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {(dispute.status === 'open' || dispute.status === 'investigating') && (
                  <button onClick={() => handleResolveClick(dispute)} className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                    Вирішити
                  </button>
                )}
                {dispute.status === 'resolved' && dispute.decision && (
                  <span className="text-sm text-gray-600">
                    {dispute.decision === 'client_wins' ? 'На користь клієнта' :
                     dispute.decision === 'master_wins' ? 'На користь майстра' :
                     'Компроміс'}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Resolve Modal */}
      {showResolveModal && selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">Вирішити спір</h3>
            <p className="text-sm text-gray-600 mb-4">
              Замовлення: {selectedDispute.orderId}<br/>
              Причина: {selectedDispute.reason}
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Рішення:</label>
              <select
                value={decision}
                onChange={(e) => setDecision(e.target.value as 'client_wins' | 'master_wins' | 'compromise')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="client_wins">На користь клієнта (повернення коштів)</option>
                <option value="master_wins">На користь майстра (виплата)</option>
                <option value="compromise">Компроміс (ручне розподілення)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Пояснення:</label>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Введіть детальне пояснення рішення..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={4}
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleConfirmResolve}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Підтвердити
              </button>
              <button
                onClick={() => {
                  setShowResolveModal(false);
                  setSelectedDispute(null);
                  setExplanation('');
                }}
                className="flex-1 bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
