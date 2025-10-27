import React, { useState, useEffect } from 'react';

export function Financials() {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(0);

  useEffect(() => {
    // Fetch real data
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
    const revenue = transactions
      .filter((t: any) => t.type === 'income' && t.status === 'completed')
      .reduce((sum: number, t: any) => sum + (t.amount || 0), 0);
    
    const completedTransactions = transactions.filter((t: any) => t.status === 'completed');
    
    const totalOrderValue = orders
      .filter((o: any) => o.status === 'completed')
      .reduce((sum: number, o: any) => sum + (o.agreedPrice || o.proposedPrice || 0), 0);
    
    const completedOrders = orders.filter((o: any) => o.status === 'completed').length;
    
    setTotalRevenue(revenue || 0);
    setTotalTransactions(completedTransactions.length);
    setAvgOrderValue(completedOrders > 0 ? Math.round(totalOrderValue / completedOrders) : 0);
  }, []);

  const stats = [
    { name: 'Загальний Доход', stat: `₴${totalRevenue.toLocaleString('uk-UA')}` },
    { name: 'Середня Вартість Замовлення', stat: `₴${avgOrderValue.toLocaleString('uk-UA')}` },
    { name: 'Всього Транзакцій', stat: totalTransactions.toString() },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Фінанси</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 hover:shadow-md transition-shadow">
            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Графік доходів</h3>
        <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
          Графік доходів за періодами
        </div>
      </div>
    </div>
  );
}
