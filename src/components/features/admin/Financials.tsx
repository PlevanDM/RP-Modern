import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import apiAdminService from '../../../services/apiAdminService';

interface FinancialData {
  period: string;
  income: number;
  expenses: number;
  profit: number;
}

export const Financials = () => {
  const [data, setData] = useState<FinancialData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const finData = await apiAdminService.getFinancialData('month');
        setData(finData);
      } catch (error) {
        console.error('Failed to load financial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Завантаження...</div>;
  }

  const totalIncome = data.reduce((sum, d) => sum + d.income, 0);
  const totalExpenses = data.reduce((sum, d) => sum + d.expenses, 0);
  const totalProfit = data.reduce((sum, d) => sum + d.profit, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Загальний дохід</p>
              <p className="text-3xl font-bold text-green-600">₴{totalIncome.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Видатки</p>
              <p className="text-3xl font-bold text-red-600">₴{totalExpenses.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Чистий прибуток</p>
              <p className="text-3xl font-bold text-blue-600">₴{totalProfit.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Період</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Дохід</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Видатки</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Прибуток</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{row.period}</td>
                <td className="px-6 py-4 text-sm text-green-600 font-semibold">₴{row.income.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-red-600 font-semibold">₴{row.expenses.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-blue-600 font-semibold">₴{row.profit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Financials;
