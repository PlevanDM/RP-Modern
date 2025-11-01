import { useState, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, CreditCard,
  Banknote, PieChart, BarChart3,
  Download, RefreshCw, ArrowUpRight,
  ArrowDownRight, Wallet, Receipt, Target, Zap
} from 'lucide-react';
import {
  AdminCard,
  SectionHeader,
  AdminButton,
  AdminSelect,
  Badge,
  ProgressBar
} from './AdminDesignSystem';
import apiAdminService, { FinancialData, TransactionData } from '../../../services/apiAdminService';

export const ModernFinancialPanel = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCurrency, setSelectedCurrency] = useState('UAH');
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [finData, txData] = await Promise.all([
          apiAdminService.getFinancialData(selectedPeriod as 'week' | 'month' | 'year'),
          apiAdminService.getTransactions(10)
        ]);
        setFinancialData(finData);
        setTransactions(txData);
      } catch (error) {
        console.error('Failed to load financial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedPeriod]);

  const formatAmount = (amount: number) => {
    return `₴${amount.toLocaleString()}`;
  };

  const getTransactionIcon = (type: string) => {
    return type === 'income' ? ArrowUpRight : ArrowDownRight;
  };

  const getTransactionColor = (type: string) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'neutral';
    }
  };

  const totalIncome = financialData.reduce((sum, d) => sum + d.income, 0);
  const totalExpenses = financialData.reduce((sum, d) => sum + d.expenses, 0);
  const totalProfit = financialData.reduce((sum, d) => sum + d.profit, 0);

  const financialStats = [
    {
      title: 'Загальний дохід',
      value: formatAmount(totalIncome),
      change: '+23.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Комісія платформи',
      value: formatAmount(Math.round(totalIncome * 0.1)),
      change: '+18.2%',
      changeType: 'positive' as const,
      icon: PieChart,
      color: 'text-blue-600'
    },
    {
      title: 'Виплати майстрам',
      value: formatAmount(totalExpenses),
      change: '+15.8%',
      changeType: 'positive' as const,
      icon: Banknote,
      color: 'text-purple-600'
    },
    {
      title: 'Чистий прибуток',
      value: formatAmount(totalProfit),
      change: '+12.3%',
      changeType: 'positive' as const,
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            💰 Фінансова панель
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Аналіз доходів, витрат та фінансових показників
          </p>
        </div>

        {/* Controls */}
        <AdminCard className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex gap-4">
              <AdminSelect
                value={selectedPeriod}
                onChange={setSelectedPeriod}
                options={[
                  { value: 'week', label: 'Тиждень' },
                  { value: 'month', label: 'Місяць' },
                  { value: 'year', label: 'Рік' }
                ]}
                className="w-40"
              />
              
              <AdminSelect
                value={selectedCurrency}
                onChange={setSelectedCurrency}
                options={[
                  { value: 'UAH', label: 'UAH' },
                  { value: 'USD', label: 'USD' },
                  { value: 'EUR', label: 'EUR' }
                ]}
                className="w-32"
              />
            </div>
            
            <div className="flex gap-2 ml-auto">
              <AdminButton variant="secondary" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Оновити
              </AdminButton>
              <AdminButton variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Експорт
              </AdminButton>
            </div>
          </div>
        </AdminCard>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Завантаження даних...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {financialStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <AdminCard key={stat.title} className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {stat.value}
                        </p>
                        <span className={`text-sm font-medium flex items-center gap-1 ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendingUp className="w-4 h-4" />
                          {stat.change}
                        </span>
                      </div>
                      <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </AdminCard>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Monthly Chart */}
              <AdminCard className="lg:col-span-2 p-6">
                <SectionHeader title="Дохід та видатки" />
                <div className="mt-6 h-80 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Діаграма фінансових показників</p>
                </div>
              </AdminCard>

              {/* Payment Methods */}
              <AdminCard className="p-6">
                <SectionHeader title="Способи оплати" />
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Банківські карти</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">36.4%</span>
                    </div>
                    <ProgressBar value={36.4} max={100} color="bg-blue-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Криптовалюта</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">25.6%</span>
                    </div>
                    <ProgressBar value={25.6} max={100} color="bg-purple-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Банківські перекази</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">23.0%</span>
                    </div>
                    <ProgressBar value={23.0} max={100} color="bg-green-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Монобанк</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">14.9%</span>
                    </div>
                    <ProgressBar value={14.9} max={100} color="bg-yellow-500" />
                  </div>
                </div>
              </AdminCard>
            </div>

            {/* Recent Transactions */}
            <AdminCard className="p-6">
              <SectionHeader title="Останні транзакції" />
              <div className="overflow-x-auto mt-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Опис</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Сума</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Дата</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => {
                      const Icon = getTransactionIcon(tx.type);
                      return (
                        <tr key={tx.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${getTransactionColor(tx.type)}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{tx.description}</span>
                            </div>
                          </td>
                          <td className={`py-3 px-4 text-sm font-semibold ${getTransactionColor(tx.type)}`}>
                            {tx.type === 'income' ? '+' : '-'}₴{tx.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {new Date(tx.date).toLocaleDateString('uk-UA')}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={getStatusColor(tx.status)}>
                              {tx.status === 'completed' ? '✓ Завершено' : tx.status === 'pending' ? '⏱ Очікування' : '✕ Помилка'}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </AdminCard>
          </>
        )}
      </div>
    </div>
  );
};
