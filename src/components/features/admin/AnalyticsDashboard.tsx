import { useState, useEffect } from 'react';
import { TrendingUp, Users, UserCheck, Clock } from 'lucide-react';
import apiAdminService from '../../../services/apiAdminService';

interface AnalyticsStats {
  totalUsers: number;
  activeUsers: number;
  totalMasters: number;
  totalOrders: number;
  completedOrders: number;
  avgRating: number;
}

export function AnalyticsDashboard() {
  const [stats, setStats] = useState<AnalyticsStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalMasters: 0,
    totalOrders: 0,
    completedOrders: 0,
    avgRating: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const adminStats = await apiAdminService.getAdminStats();
        setStats({
          totalUsers: adminStats.totalUsers,
          activeUsers: adminStats.totalUsers,
          totalMasters: adminStats.totalMasters,
          totalOrders: adminStats.totalOrders,
          completedOrders: adminStats.completedRepairs,
          avgRating: adminStats.avgRating
        });
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const kpis = [
    { name: 'Всього користувачів', value: stats.totalUsers.toString(), change: '+15%', icon: Users },
    { name: 'Активні користувачі', value: stats.activeUsers.toString(), change: '+8%', icon: UserCheck },
    { name: 'Майстрів', value: stats.totalMasters.toString(), change: '+12%', icon: Users },
    { name: 'Всього замовлень', value: stats.totalOrders.toString(), change: '+20%', icon: Clock }
  ];

  if (loading) {
    return <div className="text-center py-8">Завантаження аналітики...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.name} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{kpi.name}</h3>
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{kpi.value}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {kpi.change}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Показники ефективності</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Завершені замовлення</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{stats.completedOrders}/{stats.totalOrders}</p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${stats.totalOrders > 0 ? (stats.completedOrders / stats.totalOrders) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
