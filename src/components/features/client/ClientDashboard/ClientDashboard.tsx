// src/components/features/client/ClientDashboard/ClientDashboard.tsx

import React from 'react';
import { ClipboardList, Star, MessageSquare, CreditCard } from 'lucide-react';
import { User, Order } from '../../../../types';

interface ClientDashboardProps {
  currentUser: User;
  orders: Order[];
}

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; color: string }> = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-all duration-200">
    <div className={`bg-gray-100 text-gray-600 p-4 rounded-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const RecentOrder: React.FC<{ order: Order }> = ({ order }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
    <div>
      <p className="font-semibold text-gray-900">{order.title}</p>
      <p className="text-sm text-gray-500">Статус: <span className="font-medium text-blue-600">{order.status}</span></p>
    </div>
    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
      Детали
    </button>
  </div>
);

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ currentUser, orders }) => {
  const openOrders = orders.filter(o => o.status === 'open' || o.status === 'in_progress').length;
  const completedOrders = orders.filter(o => o.status === 'completed' || o.status === 'paid').length;
  const totalSpent = orders.reduce((acc, o) => acc + (o.paymentAmount || 0), 0);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Ласкаво просимо, {currentUser.name}!</h1>
        <p className="text-lg text-gray-600">Ваш особистий кабінет</p>
      </header>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <InfoCard icon={<ClipboardList />} title="Відкриті Замовлення" value={openOrders} color="blue" />
        <InfoCard icon={<Star />} title="Завершені Замовлення" value={completedOrders} color="green" />
        <InfoCard icon={<CreditCard />} title="Всього Витрачено (₴)" value={`${totalSpent.toLocaleString()}`} color="purple" />
        <InfoCard icon={<MessageSquare />} title="Нові Повідомлення" value={3} color="yellow" />
      </div>

      {/* Основной контент */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Останні Замовлення</h2>
        <div className="space-y-4">
          {orders.slice(0, 5).map(order => (
            <RecentOrder key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};
