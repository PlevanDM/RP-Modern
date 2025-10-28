import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from '../../../types';
import { adminService } from '../../../services/adminService';
import { Financials } from './Financials';
import { ReviewModeration } from './ReviewModeration';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { DisputeCenter } from './DisputeCenter';
import { UserActionHistory } from './UserActionHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Users, Package, DollarSign, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import { useOrdersStore } from '../../../store/ordersStore';
import { useAuthStore } from '../../../store/authStore';

interface AdminDashboardProps {
  users?: User[];
  orders?: any[];
  transactions?: any[];
}

export function AdminDashboard({ users: propUsers = [], orders: propOrders = [], transactions: propTransactions = [] }: AdminDashboardProps) {
  const { orders: storeOrders } = useOrdersStore();
  const { currentUser } = useAuthStore();
  const [users, setUsers] = useState<User[]>(propUsers);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (propUsers.length === 0) {
      adminService.getUsers().then(setUsers);
    }
  }, [propUsers]);

  const orders = storeOrders.length > 0 ? storeOrders : propOrders;

  // Statistics
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => !u.blocked).length,
    totalOrders: orders.length,
    activeOrders: orders.filter(o => ['open', 'in_progress'].includes(o.status)).length,
    totalRevenue: orders.filter(o => o.status === 'completed' && o.amount).reduce((sum, o) => sum + (o.amount || 0), 0),
    disputes: orders.filter(o => o.status === 'dispute' || o.status === 'disputed').length,
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

      {/* Statistics Cards */}
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
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Recent Orders
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{order.title}</p>
                        <p className="text-sm text-gray-500">{order.status}</p>
                      </div>
                      {order.amount && (
                        <p className="font-semibold text-gray-900">₴{order.amount}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Disputes requiring attention */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Disputes ({stats.disputes})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {orders.filter(o => o.status === 'dispute' || o.status === 'disputed').slice(0, 5).map((order) => (
                  <div key={order.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{order.title}</p>
                        <p className="text-sm text-red-600 font-semibold">Requires attention</p>
                      </div>
                      {order.amount && (
                        <p className="font-semibold text-gray-900">₴{order.amount}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Управління Користувачами</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ім'я
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Роль
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Статус
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Дії</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.blocked
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {user.blocked ? 'Заблоковано' : 'Активний'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => toggleUserBlock(user.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {user.blocked ? 'Розблокувати' : 'Заблокувати'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        <TabsContent value="orders">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Управління Замовленнями</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Master</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id.slice(0, 8)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'dispute' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.amount ? `₴${order.amount}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.clientName || 'Unknown'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.assignedMasterId ? 'Assigned' : 'Not assigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => console.log('View order:', order.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
