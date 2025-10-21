// src/components/features/finance/FinancialDashboard.tsx

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { EscrowTransaction } from '../../../../types';

interface FinancialDashboardProps {
  transactions: EscrowTransaction[];
}

const FinancialMetric: React.FC<{ icon: React.ReactNode; title: string; value: string; trend: string }> = ({ icon, title, value, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
    <div className="flex items-center space-x-4">
      <div className="bg-green-100 text-green-600 p-4 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{trend}</p>
      </div>
    </div>
  </div>
);

// Placeholder data for the chart
const cashFlowData = [
  { name: 'Янв', income: 40000, outcome: 24000 },
  { name: 'Фев', income: 30000, outcome: 13980 },
  { name: 'Мар', income: 50000, outcome: 38000 },
  { name: 'Апр', income: 47800, outcome: 29080 },
  { name: 'Май', income: 58900, outcome: 48000 },
  { name: 'Июн', income: 43900, outcome: 28000 },
  { name: 'Июл', income: 64900, outcome: 43000 },
];

export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ transactions }) => {
  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const platformCommission = totalRevenue * 0.05; // Assuming 5% commission
  const payouts = totalRevenue - platformCommission;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Финансовая Панель</h1>
        <p className="text-lg text-gray-600">Анализ доходов, расходов и комиссий</p>
      </header>

      {/* Ключевые финансовые метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <FinancialMetric icon={<DollarSign />} title="Общий Доход (UAH)" value={`${totalRevenue.toLocaleString()}`} trend="+15% vs. прошлый месяц" />
        <FinancialMetric icon={<TrendingUp />} title="Комиссия Платформы (UAH)" value={`${platformCommission.toLocaleString()}`} trend="+15% vs. прошлый месяц" />
        <FinancialMetric icon={<TrendingDown />} title="Выплаты Мастерам (UAH)" value={`${payouts.toLocaleString()}`} trend="+14% vs. прошлый месяц" />
        <FinancialMetric icon={<FileText />} title="Средний Чек (UAH)" value="1,850" trend="+5% vs. прошлый месяц" />
      </div>

      {/* График денежного потока и таблица транзакций */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Денежный Поток (UAH)</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <AreaChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="income" name="Доходы" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                <Area type="monotone" dataKey="outcome" name="Расходы" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Последние Операции</h2>
          {/* Placeholder for RecentTransactions component */}
          <div className="text-center py-12"><p className="text-gray-500">Таблица операций (в разработке)</p></div>
        </div>
      </div>
    </div>
  );
};
