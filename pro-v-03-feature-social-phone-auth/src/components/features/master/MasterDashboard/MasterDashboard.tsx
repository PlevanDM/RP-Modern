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
  <div className={`bg-gradient-to-br from-${color}-50 to-white p-6 rounded-2xl shadow-lg border border-${color}-100 flex items-center space-x-4`}>
    <div className={`bg-${color}-100 text-${color}-600 p-4 rounded-full`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export const MasterDashboard: React.FC<MasterDashboardProps> = ({ currentUser, stats }) => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Добро пожаловать, {currentUser.name}!</h1>
        <p className="text-lg text-gray-600">Ваша панель управления RepairHub</p>
      </header>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<Briefcase />} title="Активные Заказы" value={stats.activeOrders} color="blue" />
        <StatCard icon={<ClipboardList />} title="Выполненные Заказы" value={stats.completedOrders} color="green" />
        <StatCard icon={<CreditCard />} title="Заработано (UAH)" value={`${stats.totalEarned.toLocaleString()}`} color="purple" />
        <StatCard icon={<Star />} title="Рейтинг" value={stats.rating.toFixed(1)} color="yellow" />
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Статистика по Заказам</h2>
          <MasterChart />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Лента Активности</h2>
          <OrderFeed />
        </div>
      </div>
    </div>
  );
};
