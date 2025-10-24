import React from 'react';

// Mock data for KPIs
const kpis = [
  { name: 'User Retention', value: '85.7%', change: '+2.5%', changeType: 'positive' },
  { name: 'Churn Rate', value: '3.2%', change: '-0.5%', changeType: 'positive' },
  { name: 'New Users', value: '1,204', change: '+15%', changeType: 'positive' },
  { name: 'Active Users', value: '8,923', change: '+5%', changeType: 'positive' },
];

export function AnalyticsDashboard() {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Advanced Analytics</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.name} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <dt>
              <p className="text-sm font-medium text-gray-500 truncate">{kpi.name}</p>
            </dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {kpi.value}
                <span className={`ml-2 text-sm font-medium ${kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change}
                </span>
              </div>
            </dd>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">Activity Heatmap</h3>
        <div className="mt-2 text-sm text-gray-600">
          {/* Placeholder for heatmap */}
          <div className="bg-gray-200 h-64 w-full rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Heatmap will be here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
