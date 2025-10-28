import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from '../../../types';
import { adminService } from '../../../services/adminService';
import { Financials } from './Financials';
import { ReviewModeration } from './ReviewModeration';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { DisputeCenter } from './DisputeCenter';
import { UserActionHistory } from './UserActionHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { useOrdersStore } from '../../../store/ordersStore';
import { useAuthStore } from '../../../store/authStore';
import { UsersTab } from './tabs/UsersTab';
import { OrdersTab } from './tabs/OrdersTab';
import { StatCards } from './StatCards';
import SuperadminDashboard from '../superadmin/SuperadminDashboard';
import { Order, Transaction } from '../../../types';

interface AdminDashboardProps {
  users?: User[];
  orders?: Order[];
  transactions?: Transaction[];
}

export function AdminDashboard({ users: propUsers = [], orders: propOrders = [], transactions: propTransactions = [] }: AdminDashboardProps) {
  const { orders: storeOrders } = useOrdersStore();
  const { currentUser } = useAuthStore();
  const [users, setUsers] = useState<User[]>(propUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSortBy, setOrderSortBy] = useState('createdAt_desc');

  useEffect(() => {
    if (propUsers.length === 0) {
      adminService.getUsers().then(setUsers);
    }
  }, [propUsers]);

  const orders = storeOrders.length > 0 ? storeOrders : propOrders;

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => !u.blocked).length,
    totalOrders: orders.length,
    activeOrders: orders.filter((o) => ['open', 'in_progress'].includes(o.status)).length,
    totalRevenue: orders
      .filter((o) => o.status === 'completed' && o.agreedPrice)
      .reduce((sum, o) => sum + (o.agreedPrice || 0), 0),
    disputes: orders.filter((o) => o.status === 'dispute' || o.status === 'disputed').length,
  };

  const toggleUserBlock = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const updatedUser = user.blocked
      ? await adminService.unblockUser(userId)
      : await adminService.blockUser(userId);

    setUsers(users.map((u) => (u.id === userId ? updatedUser : u)));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Управление платформой</p>
        </div>
        {currentUser && (
          <div className="text-sm text-gray-500">
            Welcome, <span className="font-semibold text-blue-600">{currentUser.name}</span>
          </div>
        )}
      </motion.div>

      <StatCards stats={stats} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search by name or email"
              className="p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-2 border border-gray-300 rounded-md ml-4"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="client">Client</option>
              <option value="master">Master</option>
              <option value="admin">Admin</option>
            </select>
            <select
              className="p-2 border border-gray-300 rounded-md ml-4"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <UsersTab
            users={users}
            searchTerm={searchTerm}
            roleFilter={roleFilter}
            statusFilter={statusFilter}
            toggleUserBlock={toggleUserBlock}
            orders={orders}
          />
        </TabsContent>
        <TabsContent value="orders">
        <div className="flex items-center mb-4">
              <select
                className="p-2 border border-gray-300 rounded-md"
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="disputed">Disputed</option>
              </select>
              <select
                className="p-2 border border-gray-300 rounded-md ml-4"
                value={orderSortBy}
                onChange={(e) => setOrderSortBy(e.target.value)}
              >
                <option value="createdAt_desc">Newest First</option>
                <option value="createdAt_asc">Oldest First</option>
                <option value="amount_desc">Price: High to Low</option>
                <option value="amount_asc">Price: Low to High</option>
              </select>
            </div>
          <OrdersTab
            orders={orders}
            users={users}
            orderStatusFilter={orderStatusFilter}
            orderSortBy={orderSortBy}
          />
        </TabsContent>
        <TabsContent value="financials">
          <Financials />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewModeration />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
        <TabsContent value="disputes">
          <DisputeCenter />
        </TabsContent>
        <TabsContent value="history">
          <UserActionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
