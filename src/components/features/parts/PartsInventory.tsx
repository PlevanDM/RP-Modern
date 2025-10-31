import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { Part } from '../../../types/models';
import PartForm from './PartForm';

export const PartsInventory: React.FC = () => {
  const { user } = useAuth();
  const [parts, setParts] = useState<Part[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParts = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/inventory/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch parts inventory');
      }
      const data = await response.json();
      setParts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchParts();
  }, [fetchParts]);

  const handleFormSubmit = async (part: Partial<Part>) => {
    const method = part.id ? 'PUT' : 'POST';
    const url = part.id ? `/api/inventory/${part.id}` : '/api/inventory';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(part),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${part.id ? 'update' : 'create'} part`);
      }

      await fetchParts();
      setShowModal(false);
      setSelectedPart(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditPart = (part: Part) => {
    setSelectedPart(part);
    setShowModal(true);
  };

  const handleDeletePart = async (partId: string) => {
    if (window.confirm('Are you sure you want to delete this part?')) {
      try {
        const response = await fetch(`/api/inventory/${partId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete part');
        }

        await fetchParts();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (isLoading) return <p>Loading inventory...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Parts Inventory</h1>
        <button
          onClick={() => {
            setSelectedPart(null);
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
        >
          <PlusCircle size={20} />
          Add Part
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <PartForm
              part={selectedPart}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowModal(false);
                setSelectedPart(null);
              }}
            />
          </div>
        </div>
      )}

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
            {parts.map((part) => (
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
