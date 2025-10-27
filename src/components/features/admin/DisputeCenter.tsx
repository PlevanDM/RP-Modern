import React, { useState, useEffect } from 'react';
import { Dispute } from '../../../types';

// Mock data for disputes
const mockDisputes: Dispute[] = [
  { id: '1', orderId: 'order2', clientId: 'client2', masterId: 'master2', reason: 'Погана якість роботи', description: 'Ремонт виконано неякісно.', status: 'open', createdAt: new Date() },
  { id: '2', orderId: 'order4', clientId: 'client1', masterId: 'master4', reason: 'Товар не відповідає опису', description: 'Використано неправильну деталь.', status: 'investigating', createdAt: new Date() },
  { id: '3', orderId: 'order5', clientId: 'client2', masterId: 'master1', reason: 'Ніколи не отримав', description: 'Майстер так і не прийшов.', status: 'resolved', createdAt: new Date(), resolution: 'Повне відшкодування', resolvedAt: new Date() },
];

export function DisputeCenter() {
  const [disputes, setDisputes] = useState<Dispute[]>(mockDisputes);

  useEffect(() => {
    // Fetch disputes from localStorage
    const storedDisputes = JSON.parse(localStorage.getItem('disputes') || '[]');
    if (storedDisputes.length > 0) {
      setDisputes(storedDisputes);
    }
  }, []);

  const updateDisputeStatus = (disputeId: string, status: 'investigating' | 'resolved' | 'escalated') => {
    const updated = disputes.map(dispute =>
      dispute.id === disputeId ? { ...dispute, status, updatedAt: new Date() } : dispute
    );
    setDisputes(updated);
    localStorage.setItem('disputes', JSON.stringify(updated));
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
                {dispute.status === 'open' && (
                  <button onClick={() => updateDisputeStatus(dispute.id, 'investigating')} className="text-indigo-600 hover:text-indigo-900">Розслідувати</button>
                )}
                {dispute.status === 'investigating' && (
                  <>
                    <button onClick={() => updateDisputeStatus(dispute.id, 'resolved')} className="text-green-600 hover:text-green-900">Вирішити</button>
                    <button onClick={() => updateDisputeStatus(dispute.id, 'escalated')} className="text-red-600 hover:text-red-900 ml-4">Ескалація</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
