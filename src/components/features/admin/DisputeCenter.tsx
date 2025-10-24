import React, { useState } from 'react';
import { Dispute } from '../../../types';

// Mock data for disputes
const mockDisputes: Dispute[] = [
  { id: '1', orderId: 'order2', clientId: 'client2', masterId: 'master2', reason: 'Poor quality work', description: 'The repair was not done properly.', status: 'open', createdAt: new Date() },
  { id: '2', orderId: 'order4', clientId: 'client1', masterId: 'master4', reason: 'Item not as described', description: 'The wrong part was used.', status: 'investigating', createdAt: new Date() },
  { id: '3', orderId: 'order5', clientId: 'client2', masterId: 'master1', reason: 'Never received', description: 'The master never showed up.', status: 'resolved', createdAt: new Date(), resolution: 'Full refund', resolvedAt: new Date() },
];

export function DisputeCenter() {
  const [disputes, setDisputes] = useState<Dispute[]>(mockDisputes);

  const updateDisputeStatus = (disputeId: string, status: 'investigating' | 'resolved' | 'escalated') => {
    setDisputes(disputes.map(dispute =>
      dispute.id === disputeId ? { ...dispute, status } : dispute
    ));
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Dispute Center</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
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
                  {dispute.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {dispute.status === 'open' && (
                  <button onClick={() => updateDisputeStatus(dispute.id, 'investigating')} className="text-indigo-600 hover:text-indigo-900">Investigate</button>
                )}
                {dispute.status === 'investigating' && (
                  <>
                    <button onClick={() => updateDisputeStatus(dispute.id, 'resolved')} className="text-green-600 hover:text-green-900">Resolve</button>
                    <button onClick={() => updateDisputeStatus(dispute.id, 'escalated')} className="text-red-600 hover:text-red-900 ml-4">Escalate</button>
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
