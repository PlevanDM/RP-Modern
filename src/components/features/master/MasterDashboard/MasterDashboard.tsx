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
  <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-4 hover:shadow-slate-500/25 transition-all duration-300">
    <div className={`bg-gradient-to-r from-${color}-500 to-${color}-600 text-white p-4 rounded-xl shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <p className="text-2xl font-bold text-slate-100">{value}</p>
    </div>
  </div>
);

export const MasterDashboard: React.FC<MasterDashboardProps> = ({ currentUser, stats }) => {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-slate-100 mb-2">Ласкаво просимо, {currentUser.name}!</h1>
        <p className="text-lg text-slate-400">Ваша панель управління RepairHub</p>
      </header>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<Briefcase />} title="Активні Замовлення" value={stats.activeOrders} color="blue" />
        <StatCard icon={<ClipboardList />} title="Виконані Замовлення" value={stats.completedOrders} color="green" />
        <StatCard icon={<CreditCard />} title="Зароблено (₴)" value={`${stats.totalEarned.toLocaleString()}`} color="purple" />
        <StatCard icon={<Star />} title="Рейтинг" value={stats.rating.toFixed(1)} color="yellow" />
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Статистика по Замовленням</h2>
          <MasterChart />
        </div>
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Стрічка Активності</h2>
          <OrderFeed />
        </div>
      </div>
    </div>
  );
};
