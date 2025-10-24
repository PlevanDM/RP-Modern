// src/components/features/master/MasterDashboard/MasterDashboard.tsx

import React from 'react';
import { Briefcase, CreditCard, Star, ClipboardList } from 'lucide-react';
import { MasterChart } from './MasterChart';
import { OrderFeed } from './OrderFeed';
import { User } from '../../../../types';

interface MasterDashboardProps {
  currentUser: User;
  stats: {
    activeOrders: number;
    completedOrders: number;
    totalEarned: number;
    rating: number;
  };
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; color: string }> = ({ icon, title, value, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-3 hover:shadow-md transition-all duration-200">
    <div className={`bg-gray-100 text-gray-600 p-3 rounded-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-medium text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export const MasterDashboard: React.FC<MasterDashboardProps> = ({ currentUser, stats }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ласкаво просимо, {currentUser.name}!</h1>
        <p className="text-base text-gray-600">Ваша панель управління RepairHub</p>
      </header>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Briefcase />} title="Активні Замовлення" value={stats.activeOrders} color="blue" />
        <StatCard icon={<ClipboardList />} title="Виконані Замовлення" value={stats.completedOrders} color="green" />
        <StatCard icon={<CreditCard />} title="Зароблено (₴)" value={`${stats.totalEarned.toLocaleString()}`} color="purple" />
        <StatCard icon={<Star />} title="Рейтинг" value={stats.rating.toFixed(1)} color="yellow" />
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Статистика по Замовленням</h2>
          <MasterChart />
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Стрічка Активності</h2>
          <OrderFeed />
        </div>
      </div>
    </div>
  );
};
