import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { apiPortfolioService } from '../../../../services/apiPortfolioService';
import { useAuthStore } from '../../../../store/authStore';
import { PortfolioItem } from '../../../../types';

export const PortfolioManager: React.FC = () => {
  const { currentUser } = useAuthStore();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedItem, setEditedItem] = useState<PortfolioItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    price: 0,
    beforeImage: '',
    afterImage: '',
    deviceType: '',
    issue: '',
    completedAt: new Date(),
  });

  const handleEdit = (item: PortfolioItem) => {
    setIsEditing(item.id);
    setEditedItem({ ...item });
  };

    const handleSave = async (id: string) => {
        if (!currentUser) return;
        try {
            const updatedItem = await apiPortfolioService.updatePortfolioItem(currentUser.id, id, editedItem);
            setItems(items.map((item) => (item.id === id ? updatedItem : item)));
            setIsEditing(null);
        } catch (error) {
            console.error('Failed to save portfolio item:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!currentUser) return;
        try {
            await apiPortfolioService.deletePortfolioItem(currentUser.id, id);
            setItems(items.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Failed to delete portfolio item:', error);
        }
    };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
    };

    useEffect(() => {
        if (currentUser) {
            apiPortfolioService.getPortfolioItems(currentUser.id).then(setItems);
        }
    }, [currentUser]);

  const handleNewItemInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
    };

    const handleAddItem = async () => {
        if (!currentUser) return;
        try {
            const addedItem = await apiPortfolioService.addPortfolioItem(currentUser.id, newItem);
            setItems([...items, addedItem]);
            setIsAdding(false);
            setNewItem({
                title: '',
                description: '',
                price: 0,
                beforeImage: '',
                afterImage: '',
                deviceType: '',
                issue: '',
                completedAt: new Date(),
            });
        } catch (error) {
            console.error('Failed to add portfolio item:', error);
        }
    };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Portfolio Management</h2>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="mr-2" />
          Add New Item
        </Button>
      </div>
      {isAdding && (
        <div className="border p-4 rounded-lg mb-4 space-y-4">
            <Input name="title" placeholder="Title" value={newItem.title} onChange={handleNewItemInputChange} />
            <Textarea name="description" placeholder="Description" value={newItem.description} onChange={handleNewItemInputChange} />
            <Input name="price" placeholder="Price" value={newItem.price} onChange={handleNewItemInputChange} />
            <div className="flex justify-end gap-2">
                <Button onClick={handleAddItem}>Add</Button>
                <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg">
            {isEditing === item.id ? (
              <div className="space-y-4">
                <Input name="title" value={editedItem.title} onChange={handleInputChange} />
                <Textarea name="description" value={editedItem.description} onChange={handleInputChange} />
                <Input name="price" value={editedItem.price} onChange={handleInputChange} />
                <div className="flex justify-end gap-2">
                    <Button onClick={() => handleSave(item.id)}>Save</Button>
                    <Button variant="outline" onClick={() => setIsEditing(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div>
                <img src={item.afterImage} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-lg font-bold mt-2">₴{item.price}</p>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
