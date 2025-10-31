// Modern Financial Dashboard Panel
import { useState } from 'react';
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

export const ModernFinancialPanel = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCurrency, setSelectedCurrency] = useState('UAH');

  const financialStats = [
    {
      title: 'Загальний дохід',
      value: '₴125,430',
      change: '+23.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'text-green-600',
      trend: [30, 25, 45, 38, 52, 48, 65]
    },
    {
      title: 'Комісія платформи',
      value: '₴8,765',
      change: '+18.2%',
      changeType: 'positive',
      icon: PieChart,
      color: 'text-blue-600',
      trend: [20, 28, 35, 32, 42, 38, 48]
    },
    {
      title: 'Виплати майстрам',
      value: '₴98,450',
      change: '+15.8%',
      changeType: 'positive',
      icon: Banknote,
      color: 'text-purple-600',
      trend: [15, 22, 28, 25, 35, 40, 45]
    },
    {
      title: 'Чистий прибуток',
      value: '₴18,215',
      change: '+12.3%',
      changeType: 'positive',
      icon: Target,
      color: 'text-orange-600',
      trend: [85, 87, 90, 88, 92, 94, 95]
    }
  ];

  const transactions = [
    {
      id: 1,
      type: 'income',
      description: 'Комісія з замовлення #RH-2024-001',
      amount: 315,
      currency: 'UAH',
      date: '2024-01-15',
      status: 'completed',
      client: 'Анна Коваленко',
      method: 'card'
    },
    {
      id: 2,
      type: 'expense',
      description: 'Виплата майстру Олександр Петренко',
      amount: 4500,
      currency: 'UAH',
      date: '2024-01-15',
      status: 'completed',
      client: 'Анна Коваленко',
      method: 'bank_transfer'
    },
    {
      id: 3,
      type: 'income',
      description: 'Комісія з замовлення #RH-2024-002',
      amount: 595,
      currency: 'UAH',
      date: '2024-01-14',
      status: 'completed',
      client: 'Марія Сидоренко',
      method: 'card'
    },
    {
      id: 4,
      type: 'expense',
      description: 'Виплата майстру Максим Іванов',
      amount: 8500,
      currency: 'UAH',
      date: '2024-01-14',
      status: 'pending',
      client: 'Марія Сидоренко',
      method: 'crypto'
    },
    {
      id: 5,
      type: 'income',
      description: 'Комісія з замовлення #RH-2024-003',
      amount: 154,
      currency: 'UAH',
      date: '2024-01-13',
      status: 'completed',
      client: 'Ігор Мельник',
      method: 'card'
    }
  ];

  const monthlyData = [
    { month: 'Січень', income: 125430, expenses: 107215, profit: 18215 },
    { month: 'Грудень', income: 108920, expenses: 92340, profit: 16580 },
    { month: 'Листопад', income: 95680, expenses: 81200, profit: 14480 },
    { month: 'Жовтень', income: 89240, expenses: 75600, profit: 13640 },
    { month: 'Вересень', income: 78450, expenses: 67200, profit: 11250 },
    { month: 'Серпень', income: 72300, expenses: 61800, profit: 10500 }
  ];

  const paymentMethods = [
    { method: 'Банківські карти', amount: 45680, percentage: 36.4, color: 'bg-blue-500' },
    { method: 'Криптовалюта', amount: 32150, percentage: 25.6, color: 'bg-purple-500' },
    { method: 'Банківські перекази', amount: 28900, percentage: 23.0, color: 'bg-green-500' },
    { method: 'Монобанк', amount: 18700, percentage: 14.9, color: 'bg-yellow-500' }
  ];

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
                  { value: 'quarter', label: 'Квартал' },
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
              <AdminButton variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Експорт
              </AdminButton>
              <AdminButton variant="secondary">
                <RefreshCw className="w-4 h-4 mr-2" />
                Оновити
              </AdminButton>
            </div>
          </div>
        </AdminCard>

        {/* Financial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {financialStats.map((stat, index) => (
            <AdminCard key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-semibold text-green-500">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{stat.value}</p>
              
              {/* Mini Chart */}
              <div className="flex gap-1 h-8">
                {stat.trend.map((val, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm ${
                      val > 40 ? 'bg-green-500' :
                      val > 25 ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    style={{ opacity: 0.3 + (val / 100) * 0.7 }}
                  />
                ))}
              </div>
            </AdminCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <AdminCard className="p-6">
              <SectionHeader 
                title="Останні транзакції" 
                subtitle="Історія фінансових операцій"
                icon={Receipt}
              />
              
              <div className="space-y-3">
                {transactions.map((transaction) => {
                  const Icon = getTransactionIcon(transaction.type);
                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                        }`}>
                          <Icon className={`w-5 h-5 ${getTransactionColor(transaction.type)}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {transaction.client} • {new Date(transaction.date).toLocaleDateString('uk-UA')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getTransactionColor(transaction.type)}`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                        </p>
                        <Badge variant={getStatusColor(transaction.status)} size="sm">
                          {transaction.status === 'completed' ? 'Завершено' :
                           transaction.status === 'pending' ? 'Очікує' : 'Помилка'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AdminCard>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <AdminCard className="p-6">
              <SectionHeader title="Методи оплати" icon={CreditCard} />
              
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{method.method}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{formatAmount(method.amount)}</span>
                    </div>
                    <ProgressBar value={method.percentage} />
                  </div>
                ))}
              </div>
            </AdminCard>

            <AdminCard className="p-6">
              <SectionHeader title="Місячний звіт" icon={BarChart3} />
              
              <div className="space-y-4">
                {monthlyData.slice(0, 4).map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{month.month}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Прибуток: {formatAmount(month.profit)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{formatAmount(month.income)}</p>
                      <p className="text-xs text-red-500">{formatAmount(month.expenses)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AdminCard>

            <AdminCard className="p-6">
              <SectionHeader title="Швидкі дії" icon={Zap} />
              
              <div className="space-y-3">
                <AdminButton className="w-full justify-start">
                  <Wallet className="w-4 h-4 mr-2" />
                  Виплатити майстрам
                </AdminButton>
                <AdminButton variant="secondary" className="w-full justify-start">
                  <Receipt className="w-4 h-4 mr-2" />
                  Створити рахунок
                </AdminButton>
                <AdminButton variant="secondary" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Згенерувати звіт
                </AdminButton>
              </div>
            </AdminCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernFinancialPanel;
