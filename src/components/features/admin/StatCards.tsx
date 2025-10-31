import React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, DollarSign, AlertTriangle } from 'lucide-react';

interface StatCardsProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalOrders: number;
    activeOrders: number;
    totalRevenue: number;
    disputes: number;
  };
}

export const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between mb-2">
          <Users className="w-8 h-8" />
          <span className="text-blue-200 text-sm">Total</span>
        </div>
        <div className="text-3xl font-bold">{stats.totalUsers}</div>
        <div className="text-blue-200 text-sm">{stats.activeUsers} active</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between mb-2">
          <Package className="w-8 h-8" />
          <span className="text-green-200 text-sm">Orders</span>
        </div>
        <div className="text-3xl font-bold">{stats.totalOrders}</div>
        <div className="text-green-200 text-sm">{stats.activeOrders} active</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between mb-2">
          <DollarSign className="w-8 h-8" />
          <span className="text-purple-200 text-sm">Revenue</span>
        </div>
        <div className="text-3xl font-bold">₴{stats.totalRevenue.toLocaleString()}</div>
        <div className="text-purple-200 text-sm">10% commission</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between mb-2">
          <AlertTriangle className="w-8 h-8" />
          <span className="text-red-200 text-sm">Disputes</span>
        </div>
        <div className="text-3xl font-bold">{stats.disputes}</div>
        <div className="text-red-200 text-sm">Requires attention</div>
      </motion.div>
    </div>
  );
};
