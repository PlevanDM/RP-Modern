import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import { earningsService } from '../services/earningsService';
import { MasterEarning } from '../types';

interface MasterEarningsAnalyticsProps {
  masterId: string;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const MasterEarningsAnalytics: React.FC<MasterEarningsAnalyticsProps> = ({ masterId }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'earnings' | 'analytics'>('overview');
  const [earnings, setEarnings] = useState<MasterEarning[]>([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    setDateRange({
      start: thirtyDaysAgo.toISOString().split('T')[0],
      end: today.toISOString().split('T')[0],
    });

    const allEarnings = earningsService.getMasterEarnings(masterId);
    setEarnings(allEarnings);
  }, [masterId]);

  const balance = earningsService.getMasterBalance(masterId);
  const report = earningsService.getDetailedEarningsReport(masterId);
  const stats = earningsService.getEarningsStatistics(
    masterId,
    new Date(dateRange.start),
    new Date(dateRange.end)
  );

  // Подготовка данных для графиков
  const dailyStats = earnings.reduce((acc: any, earning) => {
    const date = new Date(earning.createdAt).toLocaleDateString('uk-UA');
    const existing = acc.find((item: any) => item.date === date);
    if (existing) {
      existing.income += earning.grossAmount;
      existing.commission += earning.commissionAmount;
      existing.net += earning.netAmount;
    } else {
      acc.push({
        date,
        income: earning.grossAmount,
        commission: earning.commissionAmount,
        net: earning.netAmount,
      });
    }
    return acc;
  }, []);

  const earningsByType = [
    {
      name: 'Трудовой доход',
      value: earnings
        .filter((e) => e.type === 'labor_income')
        .reduce((sum, e) => sum + e.netAmount, 0),
    },
    {
      name: 'Разметка деталей',
      value: earnings
        .filter((e) => e.type === 'parts_markup')
        .reduce((sum, e) => sum + e.netAmount, 0),
    },
    {
      name: 'Бонусы',
      value: earnings
        .filter((e) => e.type === 'bonus_earned')
        .reduce((sum, e) => sum + e.netAmount, 0),
    },
    {
      name: 'Комиссии партнеров',
      value: earnings
        .filter((e) => e.type === 'commission_earned')
        .reduce((sum, e) => sum + e.netAmount, 0),
    },
  ];

  const earningsByStatus = [
    {
      name: 'Ожидание',
      value: earnings
        .filter((e) => e.status === 'pending')
        .reduce((sum, e) => sum + e.netAmount, 0),
    },
    {
      name: 'Подтверждено',
      value: earnings
        .filter((e) => e.status === 'confirmed')
        .reduce((sum, e) => sum + e.netAmount, 0),
    },
    {
      name: 'Выведено',
      value: earnings
        .filter((e) => e.status === 'withdrawn')
        .reduce((sum, e) => sum + e.netAmount, 0),
    },
  ];

  const handleConfirmEarnings = (earningIds: string[]) => {
    earningIds.forEach((id) => earningsService.confirmEarning(id));
    const updated = earningsService.getMasterEarnings(masterId);
    setEarnings(updated);
  };

  const handleWithdraw = (earningIds: string[]) => {
    earningIds.forEach((id) => earningsService.withdrawEarning(id));
    const updated = earningsService.getMasterEarnings(masterId);
    setEarnings(updated);
  };

  return (
    <div className="w-full h-full bg-gray-50 rounded-xl p-6 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">💰 Мой заработок</h1>
        <p className="text-gray-600">Управление доходом и аналитика</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Всего заработано</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ₴{report.totalGrossIncome.toLocaleString('uk-UA')}
              </p>
            </div>
            <AttachMoneyIcon className="text-blue-600" sx={{ fontSize: 40 }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Комиссия платформы</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                -₴{report.totalCommissionsPaid.toLocaleString('uk-UA')}
              </p>
            </div>
            <TrendingUpIcon className="text-red-600" sx={{ fontSize: 40 }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Чистый доход</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                ₴{report.totalNetIncome.toLocaleString('uk-UA')}
              </p>
            </div>
            <AccountBalanceWalletIcon className="text-green-600" sx={{ fontSize: 40 }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Доступный баланс</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                ₴{report.availableBalance.toLocaleString('uk-UA')}
              </p>
            </div>
            <HistoryIcon className="text-blue-600" sx={{ fontSize: 40 }} />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {(['overview', 'earnings', 'analytics'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab === 'overview' && 'Обзор'}
            {tab === 'earnings' && 'Заработки'}
            {tab === 'analytics' && 'Аналитика'}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Summary */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold text-gray-900 mb-4">Статус заработков</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">В ожидании</span>
                  <span className="font-semibold text-orange-600">
                    ₴{report.pendingEarnings.toLocaleString('uk-UA')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{
                      width: `${
                        report.totalNetIncome > 0
                          ? (report.pendingEarnings / report.totalNetIncome) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Подтверждено</span>
                  <span className="font-semibold text-green-600">
                    ₴{report.confirmedEarnings.toLocaleString('uk-UA')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${
                        report.totalNetIncome > 0
                          ? (report.confirmedEarnings / report.totalNetIncome) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Выведено</span>
                  <span className="font-semibold text-blue-600">
                    ₴{report.withdrawnTotal.toLocaleString('uk-UA')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${
                        report.totalNetIncome > 0
                          ? (report.withdrawnTotal / report.totalNetIncome) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Earnings by Type */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold text-gray-900 mb-4">Доход по типам</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={earningsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ₴${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {earningsByType.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₴${value.toLocaleString('uk-UA')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold text-gray-900 mb-4">Быстрые действия</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                ✓ Подтвердить заработки ({report.earnings.filter((e) => e.status === 'pending').length})
              </button>
              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                💸 Вывести ₴{report.availableBalance.toLocaleString('uk-UA')}
              </button>
              <button className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium">
                📊 Скачать отчет
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Earnings Tab */}
      {activeTab === 'earnings' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Дата</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Тип</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Сумма</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Комиссия</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Чистый</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {earnings.map((earning) => (
                  <tr key={earning.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(earning.createdAt).toLocaleDateString('uk-UA')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{earning.type}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold">
                      ₴{earning.grossAmount.toLocaleString('uk-UA')}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-red-600 font-semibold">
                      -{earning.commissionPercent}%
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-green-600">
                      ₴{earning.netAmount.toLocaleString('uk-UA')}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          earning.status === 'pending'
                            ? 'bg-orange-100 text-orange-800'
                            : earning.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {earning.status === 'pending' && '⏳ Ожидание'}
                        {earning.status === 'confirmed' && '✓ Подтвержд'}
                        {earning.status === 'withdrawn' && '💸 Выведено'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold text-gray-900 mb-4">Доход за период</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `₴${(value as number).toLocaleString('uk-UA')}`}
                />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#3B82F6" name="Доход" />
                <Line type="monotone" dataKey="net" stroke="#10B981" name="Чистый" />
                <Line type="monotone" dataKey="commission" stroke="#EF4444" name="Комиссия" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold text-gray-900 mb-4">Статистика</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Всего заказов</p>
                <p className="text-2xl font-bold text-gray-900">{stats.ordersCount}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Средняя сумма</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₴{stats.averageOrderValue.toLocaleString('uk-UA')}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Процент комиссии</p>
                <p className="text-2xl font-bold text-gray-900">
                  {((stats.totalCommissions / stats.totalEarnings) * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Прибыль</p>
                <p className="text-2xl font-bold text-green-600">
                  ₴{stats.netIncome.toLocaleString('uk-UA')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
