import { Package, Trash2, Edit } from 'lucide-react';
import { User } from '../types/models';

interface MasterPart {
  id: string;
  name: string;
  masterId: string;
  price: number;
  quantity: number;
  category: string;
}

interface MasterInventoryProps {
  currentUser: User;
  masterParts: MasterPart[];
  masters: User[];
  selectedMasterForInventory: string;
  setSelectedMasterForInventory: (id: string) => void;
}

export function MasterInventory({
  currentUser,
  masterParts = [],
  masters = [],
  selectedMasterForInventory,
  setSelectedMasterForInventory
}: MasterInventoryProps) {
  // Mock data for demonstration
  const mockParts: MasterPart[] = [
    { id: '1', name: 'iPhone Екран', masterId: currentUser?.id, price: 200, quantity: 5, category: 'Екрани' },
    { id: '2', name: 'iPhone Батарея', masterId: currentUser?.id, price: 80, quantity: 10, category: 'Батареї' },
    { id: '3', name: 'iPhone Кнопка', masterId: currentUser?.id, price: 15, quantity: 20, category: 'Кнопки' },
    { id: '4', name: 'iPad Екран', masterId: currentUser?.id, price: 300, quantity: 2, category: 'Екрани' },
    { id: '5', name: 'Гнучкий кабель', masterId: currentUser?.id, price: 25, quantity: 8, category: 'Кабелі' },
  ];

  const parts = masterParts.length > 0 ? masterParts : mockParts;
  const filteredParts = selectedMasterForInventory
    ? parts.filter(p => p.masterId === selectedMasterForInventory)
    : parts.filter(p => p.masterId === currentUser?.id);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Склад запчастей</h2>

      {/* Master selector for service role */}
      {currentUser?.role === 'service' && (
        <div className="flex gap-2 flex-wrap">
          {masters.map(master => (
            <button
              key={master.id}
              onClick={() => setSelectedMasterForInventory(master.id)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedMasterForInventory === master.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {master.fullName}
            </button>
          ))}
        </div>
      )}

      {/* Parts list */}
      {filteredParts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Немає запчастей</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredParts.map(part => (
            <div key={part.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-gray-900">{part.name}</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>Категорія: {part.category}</p>
                <p>Ціна: ${part.price}</p>
                <p>Кількість: {part.quantity}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Edit size={16} /> Редагувати
                </button>
                <button className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
