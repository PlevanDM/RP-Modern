import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import { safeLocaleCurrency } from '../../../utils/localeUtils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Financials() {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
        const orders = await adminService.getOrders();
        const transactions = await adminService.getTransactions();

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
    };

    fetchData();
  }, []);

  const stats = [
    { name: 'Загальний Доход', stat: `₴${safeLocaleCurrency(totalRevenue)}` },
    { name: 'Середня Вартість Замовлення', stat: `₴${safeLocaleCurrency(avgOrderValue)}` },
    { name: 'Всього Транзакцій', stat: totalTransactions.toString() },
  ];

  const data = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
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
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
