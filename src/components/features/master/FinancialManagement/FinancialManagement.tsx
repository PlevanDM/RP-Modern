import { useState } from 'react';
import { DollarSign, TrendingUp, Receipt, Calculator, Download } from 'lucide-react';
import { safeLocaleCurrency } from '../../../../utils/localeUtils';

export function FinancialManagement() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock financial data
  const financialData = {
    totalIncome: 45000,
    totalExpenses: 12000,
    netIncome: 33000,
    profitMargin: 73.3,
    taxDeductible: 8500
  };

  const incomeByCategory = [
    { category: 'iPhone ремонт', amount: 18000, percentage: 40 },
    { category: 'MacBook ремонт', amount: 15000, percentage: 33.3 },
    { category: 'iPad ремонт', amount: 8000, percentage: 17.8 },
    { category: 'Apple Watch ремонт', amount: 4000, percentage: 8.9 }
  ];

  const expenses = [
    { category: 'Запчастини', amount: 6000, taxDeductible: true },
    { category: 'Інструменти', amount: 2000, taxDeductible: true },
    { category: 'Оренда', amount: 3000, taxDeductible: true },
    { category: 'Реклама', amount: 1000, taxDeductible: true }
  ];

  const financialGoals = [
    { name: 'Місячний дохід', target: 50000, current: 45000, progress: 90 },
    { name: 'Прибуток', target: 40000, current: 33000, progress: 82.5 },
    { name: 'Кількість транзакцій', target: 50, current: 28, progress: 56 }
  ];

  const taxAnalysis = {
    totalDeductible: 8500,
    effectiveRate: 18.9,
    estimatedTax: 8500
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Фінансове управління</h1>
          <div className="flex space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Тиждень</option>
              <option value="month">Місяць</option>
              <option value="quarter">Квартал</option>
              <option value="year">Рік</option>
            </select>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Експорт</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          {[
            { key: 'overview', label: 'Огляд' },
            { key: 'income', label: 'Доходи' },
            { key: 'expenses', label: 'Витрати' },
            { key: 'goals', label: 'Цілі' },
            { key: 'tax', label: 'Податки' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">Загальний дохід</h3>
                    <p className="text-3xl font-bold text-green-600">₴{safeLocaleCurrency(financialData.totalIncome)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-red-900">Витрати</h3>
                    <p className="text-3xl font-bold text-red-600">₴{safeLocaleCurrency(financialData.totalExpenses)}</p>
                  </div>
                  <Receipt className="w-8 h-8 text-red-500" />
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Чистий прибуток</h3>
                    <p className="text-3xl font-bold text-blue-600">₴{safeLocaleCurrency(financialData.netIncome)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900">Маржа прибутку</h3>
                    <p className="text-3xl font-bold text-purple-600">{financialData.profitMargin}%</p>
                  </div>
                  <Calculator className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Доходи за категоріями</h3>
                <div className="space-y-3">
                  {incomeByCategory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.category}</span>
                      <div className="flex items-center space-x-4">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">₴{safeLocaleCurrency(item.amount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Витрати за категоріями</h3>
                <div className="space-y-3">
                  {expenses.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{expense.category}</span>
                      <div className="flex items-center space-x-2">
                        {expense.taxDeductible && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Податкове
                          </span>
                        )}
                        <span className="text-sm font-medium text-gray-900">₴{safeLocaleCurrency(expense.amount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Income Tab */}
        {activeTab === 'income' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Детальний аналіз доходів</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Категорія</th>
                      <th className="text-left py-2">Сума</th>
                      <th className="text-left py-2">Відсоток</th>
                      <th className="text-left py-2">Транзакції</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeByCategory.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{item.category}</td>
                        <td className="py-2 font-medium">₴{safeLocaleCurrency(item.amount)}</td>
                        <td className="py-2">{item.percentage}%</td>
                        <td className="py-2">{Math.floor(item.amount / 1000)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Детальний аналіз витрат</h3>
              <div className="space-y-4">
                {expenses.map((expense, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div>
                      <h4 className="font-medium text-gray-900">{expense.category}</h4>
                      <p className="text-sm text-gray-600">₴{safeLocaleCurrency(expense.amount)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {expense.taxDeductible && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Податкове відрахування
                        </span>
                      )}
                      <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                        Додати чек
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Фінансові цілі</h3>
              <div className="space-y-4">
                {financialGoals.map((goal, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{goal.name}</h4>
                      <span className="text-sm text-gray-500">{goal.current} / {goal.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">{goal.progress}% виконано</span>
                      <span className="text-sm font-medium text-gray-900">
                        Залишилось: {goal.target - goal.current}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tax Tab */}
        {activeTab === 'tax' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900">Податкові відрахування</h3>
                <p className="text-3xl font-bold text-green-600">₴{safeLocaleCurrency(taxAnalysis.totalDeductible)}</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900">Ефективна ставка</h3>
                <p className="text-3xl font-bold text-blue-600">{taxAnalysis.effectiveRate}%</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-red-900">Очікуваний податок</h3>
                <p className="text-3xl font-bold text-red-600">₴{safeLocaleCurrency(taxAnalysis.estimatedTax)}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Податкові документи</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="text-sm text-gray-600">Звіт за січень 2024</span>
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                    Експорт
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <span className="text-sm text-gray-600">Звіт за лютий 2024</span>
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                    Експорт
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
