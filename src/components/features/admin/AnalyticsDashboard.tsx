import { useState, useEffect } from 'react';

export function AnalyticsDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    retentionRate: '0%'
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    const totalUsers = users.length;
    const activeUsers = users.filter((u: any) => !u.blocked).length;
    
    // Users created in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsers = users.filter((u: any) => {
      const created = new Date(u.createdAt || Date.now());
      return created >= thirtyDaysAgo;
    }).length;
    
    // Calculate retention: users who made at least 1 order
    const usersWithOrders = new Set(orders.map((o: any) => o.clientId));
    const retentionRate = totalUsers > 0 ? Math.round((usersWithOrders.size / totalUsers) * 100) : 0;
    
    setStats({
      totalUsers,
      activeUsers,
      newUsers,
      retentionRate: `${retentionRate}%`
    });
  }, []);

  const kpis = [
    { name: 'Утримання Користувачів', value: stats.retentionRate, change: '+2.5%', changeType: 'positive' },
    { name: 'Всього Користувачів', value: stats.totalUsers.toString(), change: '+15%', changeType: 'positive' },
    { name: 'Нові Користувачі', value: stats.newUsers.toString(), change: '+15%', changeType: 'positive' },
    { name: 'Активні Користувачі', value: stats.activeUsers.toString(), change: '+5%', changeType: 'positive' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Аналітика</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.name} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
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
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Карта Активності</h3>
        <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500 h-64 flex items-center justify-center">
          <div>
            <p className="text-gray-400 text-lg">Карта активності користувачів</p>
            <p className="text-gray-300 text-sm mt-2">Візуалізація активності за періодами</p>
          </div>
        </div>
      </div>
    </div>
  );
}
