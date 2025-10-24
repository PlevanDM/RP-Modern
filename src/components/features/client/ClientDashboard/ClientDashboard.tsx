// src/components/features/client/ClientDashboard/ClientDashboard.tsx

import React from 'react';
import { ClipboardList, Star, MessageSquare, CreditCard } from 'lucide-react';
import { User, Order } from '../../../../types';

interface ClientDashboardProps {
  currentUser: User;
  orders: Order[];
}

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; color: string }> = ({ icon, title, value, color }) => (
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

const RecentOrder: React.FC<{ order: Order }> = ({ order }) => (
  <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800/70 transition-all duration-200">
    <div>
      <p className="font-semibold text-slate-100">{order.title}</p>
      <p className="text-sm text-slate-400">Статус: <span className="font-medium text-blue-400">{order.status}</span></p>
    </div>
    <button className="text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors">
      Детали
    </button>
  </div>
);

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ currentUser, orders }) => {
  const openOrders = orders.filter(o => o.status === 'open' || o.status === 'in_progress').length;
  const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'paid').length;
  const totalSpent = orders.reduce((acc, o) => acc + (o.paymentAmount || 0), 0);

  return (
    <div className="p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-slate-100 mb-2">Ласкаво просимо, {currentUser.name}!</h1>
        <p className="text-lg text-slate-400">Ваш особистий кабінет</p>
      </header>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <InfoCard icon={<ClipboardList />} title="Відкриті Замовлення" value={openOrders} color="blue" />
        <InfoCard icon={<Star />} title="Завершені Замовлення" value={completedOrders} color="green" />
        <InfoCard icon={<CreditCard />} title="Всього Витрачено (₴)" value={`${totalSpent.toLocaleString()}`} color="purple" />
        <InfoCard icon={<MessageSquare />} title="Нові Повідомлення" value={3} color="yellow" />
      </div>

      {/* Основной контент */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-700">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">Останні Замовлення</h2>
        <div className="space-y-4">
          {orders.slice(0, 5).map(order => (
            <RecentOrder key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};
