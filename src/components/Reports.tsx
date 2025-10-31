import { User, Order } from '../types/models';

interface ReportsProps {
  currentUser: User;
  orders: Order[];
}

export function Reports({ currentUser, orders }: ReportsProps) {
  if (!currentUser) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Звіти для {currentUser.name}</h2>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Статистика замовлень</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm font-medium text-gray-500">Всього замовлень</p>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-sm font-medium text-green-600">Завершені</p>
            <p className="text-2xl font-bold text-green-800">{orders.filter(o => o.status === 'completed' || o.status === 'paid').length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <p className="text-sm font-medium text-yellow-600">В процесі</p>
            <p className="text-2xl font-bold text-yellow-800">{orders.filter(o => o.status === 'in_progress').length}</p>
          </div>
        </div>
      </div>

      <div className="text-center py-12">
        <p className="text-gray-500">Інші звіти (в розробці)</p>
      </div>
    </div>
  );
}
