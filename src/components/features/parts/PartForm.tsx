import React, { useState } from 'react';
import { Part } from '../../../types/models';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';

interface PartFormProps {
  part?: Part | null;
  onSubmit: (part: Partial<Part>) => void;
  onCancel: () => void;
}

const PartForm: React.FC<PartFormProps> = ({ part, onSubmit, onCancel }) => {
  const [name, setName] = useState(part?.name || '');
  const [description, setDescription] = useState(part?.description || '');
  const [price, setPrice] = useState(part?.price || 0);
  const [quantity, setQuantity] = useState(part?.quantity || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: part?.id, name, description, price, quantity });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">{part ? 'Edit' : 'Add'} Part</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <div>
          <label htmlFor="price" className="block text-sm font-medium">Price</label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} variant="outline">Cancel</Button>
        <Button type="submit">{part ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};

export default PartForm;
