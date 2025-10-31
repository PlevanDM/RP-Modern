import React, { useState, useEffect, useCallback } from 'react';
import { PortfolioItem } from '../../../../types/models';
import PortfolioList from './PortfolioList';
import PortfolioForm from './PortfolioForm';
import { Button } from '../../../ui/button';
import { useAuthStore } from '../../../../store/authStore';
import { apiPortfolioService } from '../../../../services/apiPortfolioService';

const PortfolioPage: React.FC = () => {
  const { currentUser } = useAuthStore();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    if (!currentUser) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiPortfolioService.getPortfolioItems(currentUser.id);
      setPortfolio(data);
    } catch (err: unknown) {
      const errorMessage = (err as { message?: string })?.message;
      setError(errorMessage || 'Failed to fetch portfolio');
      console.error('Portfolio fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const handleFormSubmit = async (item: Partial<PortfolioItem>) => {
    if (!currentUser) return;
    
    try {
      if (item.id) {
        await apiPortfolioService.updatePortfolioItem(currentUser.id, item.id, item);
      } else {
        await apiPortfolioService.addPortfolioItem(currentUser.id, item as Omit<PortfolioItem, 'id'>);
      }

      await fetchPortfolio(); // Re-fetch to get the latest data
      setIsFormOpen(false);
      setEditingItem(null);
    } catch (err: unknown) {
      const errorMessage = (err as { message?: string })?.message;
      setError(errorMessage || `Failed to ${item.id ? 'update' : 'create'} portfolio item`);
      console.error('Portfolio submit error:', err);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (itemId: string) => {
    if (!currentUser) return;
    
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await apiPortfolioService.deletePortfolioItem(currentUser.id, itemId);
        await fetchPortfolio(); // Re-fetch
      } catch (err: unknown) {
        const errorMessage = (err as { message?: string })?.message;
        setError(errorMessage || 'Failed to delete portfolio item');
        console.error('Portfolio delete error:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">Завантаження портфоліо...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Помилка: {error}</p>
          <button 
            onClick={fetchPortfolio}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Спробувати ще раз
          </button>
        </div>
      </div>
    );
  }

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
