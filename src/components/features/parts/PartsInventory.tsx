import { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

interface Part {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

const mockParts: Part[] = [
  { id: '1', name: 'iPhone 13 Screen', description: 'Original Apple screen', quantity: 10, price: 2500 },
  { id: '2', name: 'iPhone 13 Battery', description: 'Original Apple battery', quantity: 15, price: 1200 },
  { id: '3', name: 'MacBook Pro 16" Battery', description: 'Original Apple battery', quantity: 5, price: 4500 },
];

export const PartsInventory = () => {
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [showModal, setShowModal] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  const handleAddPart = () => {
    setSelectedPart(null);
    setShowModal(true);
  };

  const handleEditPart = (part: Part) => {
    setSelectedPart(part);
    setShowModal(true);
  };

  const handleDeletePart = (id: string) => {
    setParts(parts.filter(p => p.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Parts Inventory</h1>
        <button
          onClick={handleAddPart}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
        >
          <PlusCircle size={20} />
          Add Part
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parts.map(part => (
              <tr key={part.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{part.name}</td>
                <td className="p-4">{part.description}</td>
                <td className="p-4">{part.quantity}</td>
                <td className="p-4">{part.price} ₴</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEditPart(part)} className="text-blue-500 hover:text-blue-700">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDeletePart(part.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={20} />
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
