import { useState, useMemo } from 'react';
import { Download } from 'lucide-react';
import { User, Transaction } from '../types';

type TransactionType = 'income' | 'expense' | 'refund' | 'payout';

interface TransactionHistoryProps {
  currentUser: User;
  transactions: Transaction[];
}

export function TransactionHistory({
  transactions,
}: TransactionHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'all' || t.type === filterType;
      const matchStatus = filterStatus === 'all' || t.status === filterStatus;
      return matchSearch && matchType && matchStatus;
    });
  }, [transactions, searchQuery, filterType, filterStatus]);

  const totalIncome = filteredTransactions
    .filter(t => t.type === ('income' as TransactionType))
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === ('expense' as TransactionType))
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Завершено</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Очікує</span>;
      case 'failed':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">Помилка</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Історія транзакцій</h1>
          <p className="text-gray-600 mt-2">Переглядайте та керуйте всіма своїми операціями</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-600 font-semibold">Загальний дохід</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-3xl font-bold text-green-600">{totalIncome.toLocaleString('uk-UA')} грн</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-600 font-semibold">Загальні витрати</h3>
              <span className="text-2xl">💸</span>
            </div>
            <p className="text-3xl font-bold text-red-600">{totalExpense.toLocaleString('uk-UA')} грн</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-600 font-semibold">Баланс</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{(totalIncome - totalExpense).toLocaleString('uk-UA')} грн</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Пошук за описом..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-2">Тип</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">Всі типи</option>
                  <option value="income">Доходи</option>
                  <option value="expense">Витрати</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-2">Статус</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">Всі статуси</option>
                  <option value="completed">Завершено</option>
                  <option value="pending">Очікує</option>
                  <option value="failed">Помилка</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
                  <Download className="w-5 h-5" />
                  Експортувати
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">Немає транзакцій за цими критеріями</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map(transaction => (
                <div key={transaction.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        transaction.type === ('income' as TransactionType)
                          ? 'bg-green-100' 
                          : 'bg-red-100'
                      }`}>
                        {transaction.type === ('income' as TransactionType) ? (
                          <span className="text-green-600 text-2xl">💰</span>
                        ) : (
                          <span className="text-red-600 text-2xl">💸</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.createdAt).toLocaleDateString('uk-UA')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          transaction.type === ('income' as TransactionType)
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {transaction.type === ('income' as TransactionType) ? '+' : '-'}{transaction.amount.toLocaleString('uk-UA')} грн
                        </p>
                        <p className="text-sm text-gray-600">{transaction.category}</p>
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
