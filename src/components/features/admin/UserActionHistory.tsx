import React, { useState, useEffect } from 'react';
import { UserAction } from '../../../types';
import { adminService } from '../../../services/adminService';

export function UserActionHistory() {
  const [actions, setActions] = useState<UserAction[]>([]);

  useEffect(() => {
    adminService.getUserActions().then(setActions);
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">User Action History</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {actions.map((action) => (
            <tr key={action.id}>
              <td className="px-6 py-4 whitespace-nowrap">{action.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{action.action}</td>
              <td className="px-6 py-4 whitespace-nowrap">{action.timestamp.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
