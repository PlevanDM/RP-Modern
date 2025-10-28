import React from 'react';
import { PortfolioItem } from '../../../../types/models';
import { Button } from '../../../ui/button';

interface PortfolioItemProps {
  item: PortfolioItem;
  isOwner: boolean;
  onEdit: (item: PortfolioItem) => void;
  onDelete: (itemId: string) => void;
}

const PortfolioItemComponent: React.FC<PortfolioItemProps> = ({ item, isOwner, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold">{item.title}</h3>
      <p className="text-sm text-gray-400">{item.description}</p>
      {item.photos && item.photos.length > 0 && (
        <div className="mt-4">
          <img src={item.photos[0]} alt={item.title} className="w-full h-48 object-cover rounded-lg" />
        </div>
      )}
      {isOwner && (
        <div className="mt-4 flex justify-end space-x-2">
          <Button onClick={() => onEdit(item)} variant="outline">Edit</Button>
          <Button onClick={() => onDelete(item.id)} variant="destructive">Delete</Button>
        </div>
      )}
    </div>
  );
};

export default PortfolioItemComponent;
