import React, { useState } from 'react';
import { PortfolioItem } from '../../../../types/models';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';

interface PortfolioFormProps {
  item?: PortfolioItem | null;
  onSubmit: (item: Partial<PortfolioItem>) => void;
  onCancel: () => void;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({ item, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(item?.title || '');
  const [description, setDescription] = useState(item?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: item?.id, title, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">{item ? 'Edit' : 'Add'} Portfolio Item</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} variant="outline">Cancel</Button>
        <Button type="submit">{item ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};

export default PortfolioForm;
