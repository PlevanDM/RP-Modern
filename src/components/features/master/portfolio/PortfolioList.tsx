import React from 'react';
import { PortfolioItem } from '../../../../types/models';
import PortfolioItemComponent from './PortfolioItem';

interface PortfolioListProps {
  portfolio: PortfolioItem[];
  isOwner: boolean;
  onEdit: (item: PortfolioItem) => void;
  onDelete: (itemId: string) => void;
}

const PortfolioList: React.FC<PortfolioListProps> = ({ portfolio, isOwner, onEdit, onDelete }) => {
  if (!portfolio || portfolio.length === 0) {
    return <p>This master has not added any portfolio items yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {portfolio.map(item => (
        <PortfolioItemComponent
          key={item.id}
          item={item}
          isOwner={isOwner}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PortfolioList;
