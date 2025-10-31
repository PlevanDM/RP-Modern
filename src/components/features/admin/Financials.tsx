import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import { safeLocaleCurrency } from '../../../utils/localeUtils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Order, EscrowTransaction } from '../../../../types';

export function Financials() {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders: Order[] = await adminService.getOrders();
        const transactions = await adminService.getTransactions();

        // Convert payments to transactions format
        // EscrowTransaction has fields: id, orderId, clientId, masterId, amount, status, createdAt, releasedAt, refundedAt
        const escrowTransactions: EscrowTransaction[] = transactions.map((payment) => ({
          id: payment.id,
          orderId: payment.orderId || '',
          clientId: payment.clientId || '',
          masterId: payment.masterId || '',
          amount: payment.amount || 0,
          status: payment.status || 'pending',
          createdAt: payment.createdAt || new Date(),
          releasedAt: payment.releasedAt,
          refundedAt: payment.refundedAt,
        }));

        const revenue = escrowTransactions
            .filter((t) => t.status === 'released')
            .reduce((sum, t) => sum + (t.amount || 0), 0);

        const completedTransactions = escrowTransactions.filter((t) => t.status === 'released');

        // Виправляємо розрахунок - використовуємо реальні ціни з замовлень
        const totalOrderValue = orders
            .filter((o: Order) => o.status === 'completed' || o.status === 'paid')
            .reduce((sum: number, o: Order) => {
              // Спробуємо різні поля для ціни
              const price = o.agreedPrice || o.proposedPrice || o.price || o.budget || 0;
              return sum + (typeof price === 'number' ? price : parseFloat(String(price)) || 0);
            }, 0);

        const completedOrders = orders.filter((o: Order) => 
          o.status === 'completed' || o.status === 'paid'
        ).length;

        setTotalRevenue(revenue || 0);
        setTotalTransactions(completedTransactions.length);
        setAvgOrderValue(completedOrders > 0 ? Math.round(totalOrderValue / completedOrders) : 0);
      } catch (error) {
        console.error('Error fetching financial data:', error);
        // Set defaults on error
        setTotalRevenue(0);
        setTotalTransactions(0);
        setAvgOrderValue(0);
      }
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
