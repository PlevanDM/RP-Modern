// src/components/features/master/MasterDashboard/MasterChart.tsx

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Placeholder data
const data = [
  { name: 'Янв', earnings: 4000, orders: 24 },
  { name: 'Фев', earnings: 3000, orders: 13 },
  { name: 'Мар', earnings: 5000, orders: 48 },
  { name: 'Апр', earnings: 4780, orders: 39 },
  { name: 'Май', earnings: 5890, orders: 48 },
  { name: 'Июн', earnings: 4390, orders: 38 },
  { name: 'Июл', earnings: 6490, orders: 43 },
];

export const MasterChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis yAxisId="left" stroke="#6b7280" />
          <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(5px)',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          />
          <Legend />
          <Area yAxisId="left" type="monotone" dataKey="earnings" name="Заработано (UAH)" stroke="#8884d8" fillOpacity={1} fill="url(#colorEarnings)" />
          <Area yAxisId="right" type="monotone" dataKey="orders" name="Заказы" stroke="#82ca9d" fillOpacity={1} fill="url(#colorOrders)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
