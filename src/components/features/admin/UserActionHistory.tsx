import { useState, useEffect } from 'react';
import { UserAction, Order } from '../../../types';

export function UserActionHistory() {
  const [actions, setActions] = useState<UserAction[]>([]);

  useEffect(() => {
    // Fetch from localStorage or generate from other data
    const storedActions = JSON.parse(localStorage.getItem('userActions') || '[]');
    
    if (storedActions.length === 0) {
      // Generate actions from orders and other events
      const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
      const generatedActions = orders.map((order: Order) => ({
        id: `action-${order.id}`,
        userId: order.clientId,
        action: `Створено замовлення: ${order.title}`,
        timestamp: new Date(order.createdAt)
      }));
      
      setActions(generatedActions);
      localStorage.setItem('userActions', JSON.stringify(generatedActions));
    } else {
      setActions(storedActions);
    }
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Історія Дій Користувачів</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Користувача</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дія</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Час</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {actions.map((action) => (
            <tr key={action.id}>
              <td className="px-6 py-4 whitespace-nowrap">{action.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{action.action}</td>
              <td className="px-6 py-4 whitespace-nowrap">{action.timestamp.toLocaleString('uk-UA')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
