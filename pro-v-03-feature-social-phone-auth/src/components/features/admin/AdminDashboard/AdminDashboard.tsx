// src/components/features/admin/AdminDashboard/AdminDashboard.tsx

import React from 'react';
import { Users, ClipboardList, CreditCard, ShieldCheck } from 'lucide-react';
import { User, Order, EscrowTransaction } from '../../../../types';

interface AdminDashboardProps {
  users: User[];
  orders: Order[];
  transactions: EscrowTransaction[];
}

const MetricCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; change?: string }> = ({ icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
    <div className="flex items-center space-x-4">
      <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
    {change && <p className="text-xs text-green-500 mt-2">{change}</p>}
  </div>
);

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ users, orders, transactions }) => {
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const totalTurnover = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Административная Панель</h1>
        <p className="text-lg text-gray-600">Обзор системы RepairHub</p>
      </header>

      {/* Ключевые метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard icon={<Users />} title="Всего Пользователей" value={totalUsers} change="+12% за месяц" />
        <MetricCard icon={<ClipboardList />} title="Всего Заказов" value={totalOrders} change="+8% за месяц" />
        <MetricCard icon={<CreditCard />} title="Общий Оборот (UAH)" value={`${totalTurnover.toLocaleString()}`} change="+20% за месяц" />
        <MetricCard icon={<ShieldCheck />} title="Активные Споры" value={5} change="-3% за месяц" />
      </div>

      {/* Таблицы управления */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Управление Пользователями</h2>
          {/* Placeholder for UsersTable component */}
          <div className="text-center py-12"><p className="text-gray-500">Таблица пользователей (в разработке)</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Последние Транзакции</h2>
          {/* Placeholder for TransactionsTable component */}
          <div className="text-center py-12"><p className="text-gray-500">Таблица транзакций (в разработке)</p></div>
        </div>
      </div>
    </div>
  );
};
