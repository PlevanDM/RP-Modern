// Enhanced Admin Dashboard with Modern UI from 21st.dev inspiration
import React, { useState } from 'react';
import {
  Users, ClipboardList, CreditCard, ShieldCheck,
  Activity, AlertCircle, CheckCircle, Settings, TrendingUp,
  DollarSign, Package, Bell
} from 'lucide-react';

export const AdminDashboardImproved = () => {
  const statsData = [
    {
      title: 'Замовлення',
      value: '1,245',
      icon: <ClipboardList className="w-5 h-5 text-blue-600" />,
      trend: '+12%'
    },
    {
      title: 'Дохід',
      value: '?42.5K',
      icon: <DollarSign className="w-5 h-5 text-green-600" />,
      trend: '+8%'
    },
    {
      title: 'Користувачі',
      value: '842',
      icon: <Users className="w-5 h-5 text-purple-600" />,
      trend: '+24'
    },
    {
      title: 'Рейтинг',
      value: '4.8/5',
      icon: <Activity className="w-5 h-5 text-orange-600" />,
      trend: '?'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">? Admin Control Center</h1>
      <p className="text-gray-600 mb-8">Управління платформою RepairHub Pro</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, idx) => (
          <div key={idx} className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-6 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">{stat.icon}</div>
              <span className="text-xs font-semibold text-green-600">{stat.trend}</span>
            </div>
            <h3 className="text-sm text-gray-600 mb-2">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardImproved;
