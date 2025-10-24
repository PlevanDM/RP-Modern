import React from 'react';

export function Financials() {
  const stats = [
    { name: 'Total Revenue', stat: '₴71,897' },
    { name: 'Avg. Order Value', stat: '₴5,816' },
    { name: 'Total Transactions', stat: '2,453' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Financials</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
          </div>
        ))}
      </div>
    </div>
  );
}
