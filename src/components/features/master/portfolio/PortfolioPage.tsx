import React, { useState, useEffect, useCallback } from 'react';
import { PortfolioItem } from '../../../../types/models';
import PortfolioList from './PortfolioList';
import PortfolioForm from './PortfolioForm';
import { Button } from '../../../ui/button';
import { useAuth } from '../../../../hooks/useAuth'; // Assuming you have a custom hook for auth

const PortfolioPage: React.FC = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/portfolio/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio');
      }
      const data = await response.json();
      setPortfolio(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const handleFormSubmit = async (item: Partial<PortfolioItem>) => {
    const method = item.id ? 'PUT' : 'POST';
    const url = item.id ? `/api/portfolio/${item.id}` : '/api/portfolio';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          // Assuming token-based auth
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${item.id ? 'update' : 'create'} portfolio item`);
      }

      await fetchPortfolio(); // Re-fetch to get the latest data
      setIsFormOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/portfolio/${itemId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete portfolio item');
        }

        await fetchPortfolio(); // Re-fetch
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (isLoading) return <p>Loading portfolio...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        <Button onClick={() => { setEditingItem(null); setIsFormOpen(true); }}>
          Add New Item
        </Button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <PortfolioForm
              item={editingItem}
              onSubmit={handleFormSubmit}
              onCancel={() => { setIsFormOpen(false); setEditingItem(null); }}
            />
          </div>
        </div>
      )}

      <PortfolioList
        portfolio={portfolio}
        isOwner={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PortfolioPage;
