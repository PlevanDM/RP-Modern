import { useState, useEffect } from 'react';
import { User } from '../../../types';
import { adminService } from '../../../services/adminService';
import { Financials } from './Financials';
import { ReviewModeration } from './ReviewModeration';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { DisputeCenter } from './DisputeCenter';
import { UserActionHistory } from './UserActionHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

export function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    adminService.getUsers().then(setUsers);
  }, []);

  const toggleUserBlock = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const updatedUser = user.blocked
      ? await adminService.unblockUser(userId)
      : await adminService.blockUser(userId);

    setUsers(users.map((u) => (u.id === userId ? updatedUser : u)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Панель Адміністратора</h1>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
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
