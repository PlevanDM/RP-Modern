import React from 'react';
import { Order, User } from '../../../../types';

interface OrdersTabProps {
  orders: Order[];
  users: User[];
  orderStatusFilter: string;
  orderSortBy: string;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  users,
  orderStatusFilter,
  orderSortBy,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Управління Замовленнями</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Creation Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Master</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders
              .filter(
                (order) =>
                  orderStatusFilter === 'all' || order.status === orderStatusFilter
              )
              .sort((a, b) => {
                switch (orderSortBy) {
                  case 'createdAt_asc':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                  case 'amount_desc':
                    return (b.agreedPrice || 0) - (a.agreedPrice || 0);
                  case 'amount_asc':
                    return (a.agreedPrice || 0) - (b.agreedPrice || 0);
                  case 'createdAt_desc':
                  default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                }
              })
              .map((order) => (
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
                    {order.agreedPrice ? `₴${order.agreedPrice}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.clientName || 'Unknown'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.masterId ? users.find(u => u.id === order.masterId)?.name || 'Unknown' : 'Not assigned'}
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
  );
};
