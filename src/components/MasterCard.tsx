import React, { useState } from 'react';
import { MessageCircle, Star, MapPin, Zap, Mail, CheckCircle, Briefcase } from 'lucide-react';
import { User } from '../types/models';

interface MasterCardProps {
  master: User;
  onContact?: () => void;
  onPortfolio?: () => void;
  onToggleFavorite?: (masterId: string) => void;
  isFavorite?: boolean;
  className?: string;
}

export const MasterCard: React.FC<MasterCardProps> = ({
  master,
  onContact,
  onPortfolio,
  onToggleFavorite,
  isFavorite = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!master.skills) return null;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Фоновий градієнт */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6">
        {/* Аватар и базова інформація */}
        <div className="flex items-start gap-4 mb-4">
          {/* Аватар */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100 shadow-md bg-gray-100 flex items-center justify-center">
              {master.avatar ? (
                <img
                  src={master.avatar}
                  alt={master.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = 'none';
                    const parent = img.parentElement;
                    if (parent) {
                      const icon = document.createElement('div');
                      icon.className = 'w-full h-full flex items-center justify-center bg-gray-100';
                      icon.innerHTML = `
                        <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      `;
                      parent.appendChild(icon);
                    }
                  }}
                />
              ) : (
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
            {master.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center border-2 border-white">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
                  {/* Кнопка избранного */}
                  {onToggleFavorite && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(master.id);
                      }}
                      className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white transition-all duration-200 ${
                        isFavorite
                          ? 'bg-yellow-400 hover:bg-yellow-500'
                          : 'bg-white hover:bg-yellow-50'
                      }`}
                      title={isFavorite ? 'Видалити з обраних' : 'Додати до обраних'}
                    >
                      <Star
                        className={`w-3 h-3 ${isFavorite ? 'text-white fill-current' : 'text-gray-400'}`}
                      />
                    </button>
                  )}
          </div>

          {/* Ім'я та спеціальність */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {master.name}
            </h3>
            <p className="text-sm text-gray-600 mb-1 line-clamp-2">
              {master.specialization || 'Спеціаліст'}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{master.city}</span>
            </div>
          </div>
        </div>

        {/* Рейтинг */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(master.rating || 0) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="font-semibold text-gray-900">{master.rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Верифіковано
          </span>
        </div>

        {/* Навички */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-gray-900">Навички</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {master.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

          {/* Кнопки дій */}
          <div className="flex gap-2 pt-4 border-t border-gray-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onContact?.();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
              title="Написати майстру повідомлення в чаті"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Написати</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPortfolio?.();
              }}
              className="flex items-center justify-center px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
              title="Переглянути портфоліо робіт майстра"
            >
              <Briefcase className="w-4 h-4" />
            </button>
            <button
              className="flex items-center justify-center px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
              title="Надіслати майстру email"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
      </div>

      {/* Нижня лінія при hover */}
      {isHovered && (
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 transition-all duration-300" />
      )}
    </div>
  );
};
