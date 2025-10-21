import { BarChart3, Package, CheckCircle, TrendingUp } from 'lucide-react';

interface User {
  fullName?: string;
}

interface Order {
  id: string | number;
  status: string;
  title?: string;
  device?: string;
  deviceType?: string;
  issue?: string;
  createdAt: string | number | Date;
}

interface DashboardProps {
  currentUser: User;
  orders: Order[];
  onSelectOrder?: (order: Order) => void;
}

export function Dashboard({ currentUser, orders = [], onSelectOrder }: DashboardProps) {
  const activeOrders = orders.filter(o => o.status === 'in_progress').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const totalOrders = orders.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">👋 Привіт, {currentUser?.fullName}!</h2>
        <p className="text-indigo-100">Ласкаво просимо до RepairHub</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Активні замовлення</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{activeOrders}</p>
            </div>
            <Package className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Завершено</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{completedOrders}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Усього замовлень</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{totalOrders}</p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Рейтинг</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">⭐ 4.8</p>
            </div>
            <TrendingUp className="w-12 h-12 text-yellow-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Останні замовлення</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Немає замовлень</p>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map(order => (
              <div
                key={order.id}
                onClick={() => onSelectOrder?.(order)}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray-900">{order.title || order.device}</p>
                  <p className="text-sm text-gray-600">{order.deviceType} • {order.issue}</p>
                  <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('uk-UA')}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                  order.status === 'awaiting_payment_confirmation' ? 'bg-amber-100 text-amber-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status === 'in_progress' ? 'В роботі' :
                   order.status === 'completed' || order.status === 'paid' ? 'Завершено' :
                   order.status === 'awaiting_payment_confirmation' ? 'Очікує оплати' :
                   'Очікує'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
