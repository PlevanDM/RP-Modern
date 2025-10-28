import React from 'react';
import { User, Order } from '../../../../types';
import { safeLocaleDate } from '../../../../utils/localeUtils';

interface UsersTabProps {
  users: User[];
  searchTerm: string;
  roleFilter: string;
  statusFilter: string;
  toggleUserBlock: (userId: string) => void;
  orders: Order[];
}

export const UsersTab: React.FC<UsersTabProps> = ({
  users,
  searchTerm,
  roleFilter,
  statusFilter,
  toggleUserBlock,
  orders,
}) => {
  return (
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
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Дата реєстрації
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Останній вхід
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              К-сть замовлень
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Дії</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users
            .filter((user) => {
              const searchTermLower = searchTerm.toLowerCase();
              return (
                (user.name.toLowerCase().includes(searchTermLower) ||
                  user.email?.toLowerCase().includes(searchTermLower)) &&
                (roleFilter === 'all' || user.role === roleFilter) &&
                (statusFilter === 'all' ||
                  (statusFilter === 'active' && !user.blocked) ||
                  (statusFilter === 'blocked' && user.blocked))
              );
            })
            .map((user) => (
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
                      user.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {user.blocked ? 'Заблоковано' : 'Активний'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.registrationDate ? safeLocaleDate(user.registrationDate) : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastLogin ? safeLocaleDate(user.lastLogin) : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {orders.filter((o) => o.clientId === user.id).length}
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
  );
};
