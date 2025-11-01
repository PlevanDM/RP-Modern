import React, { useState, useEffect } from 'react';
import { LayoutDashboard } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    activeRepairs: 0
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-white">Панель управління</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-sm text-slate-400 mb-2">Користувачів</h3>
            <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-sm text-slate-400 mb-2">Замовлень</h3>
            <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-sm text-slate-400 mb-2">Активні ремонти</h3>
            <p className="text-3xl font-bold text-white">{stats.activeRepairs}</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <p className="text-slate-300">Аналітика завантажується...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
