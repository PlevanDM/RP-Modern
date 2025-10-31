import React from 'react';
import { Award, Star, MapPin, X } from 'lucide-react';

import { User } from '../types/models';
import { safeLocaleCurrency, safeLocaleDate } from '../utils/localeUtils';
import { Button } from './ui/button';
import { portfolioItems } from '../utils/mock';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  master: User | null;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  onClose,
  master,
}) => {
  if (!isOpen || !master) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
      <div data-testid="portfolio-modal" className="bg-white rounded-lg w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-lg z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={master.avatar}
                alt={master.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary-focus"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {master.name}
                  {master.verified && <Award size={24} className="text-primary" />}
                </h2>
                <p className="text-lg text-gray-600">{master.specialization}</p>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Star size={18} className="text-yellow-400" />
                    <span className="font-semibold text-gray-900">{master.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">(Верифіковано ✓)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin size={16} />
                    <span>{master.city}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={28} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Портфоліо робіт</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Images */}
                <div className="grid grid-cols-2 gap-1">
                  <div className="relative">
                    <img
                      src={item.beforeImage}
                      alt="До ремонту"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      До
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={item.afterImage}
                      alt="Після ремонту"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Після
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-primary-foreground text-primary rounded text-xs font-medium">
                        {item.deviceType}
                      </span>
                      <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs">
                        {item.issue}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      {safeLocaleDate(item.completedAt)}
                    </div>
                    <div className="font-semibold text-primary">
                      ₴{safeLocaleCurrency(item.price)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state if no portfolio items */}
          {portfolioItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Портфоліо порожнє
              </h3>
              <p className="text-gray-600">
                У цього майстра поки немає опублікованих робіт
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 rounded-b-lg">
          <div className="flex justify-end gap-3">
            <Button
              onClick={onClose}
              variant="outline"
            >
              Закрити
            </Button>
            <Button
              onClick={() => {
                // Logic for navigating to the chat with the master can be added here
                onClose();
              }}
            >
              Написати майстру
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
