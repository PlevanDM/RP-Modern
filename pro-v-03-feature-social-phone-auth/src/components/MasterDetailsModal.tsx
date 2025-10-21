import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MessageIcon from '@mui/icons-material/Message';
import VerifiedIcon from '@mui/icons-material/Verified';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { User } from '../types/models';

interface MasterDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  master: User | null;
  onContact?: (master: User) => void;
  onPortfolio?: (master: User) => void;
  onToggleFavorite?: (masterId: string) => void;
  isFavorite?: boolean;
}

export const MasterDetailsModal: React.FC<MasterDetailsModalProps> = ({
  isOpen,
  onClose,
  master,
  onContact,
  onPortfolio,
  onToggleFavorite,
  isFavorite = false,
}) => {
  if (!isOpen || !master) return null;

  // Mock data для демонстрації
  const mockDetails = {
    experience: '5+ років',
    completedJobs: 247,
    responseTime: '2-4 години',
    workingHours: '9:00 - 18:00',
    phone: '+380 50 123 4567',
    email: `${master.name.toLowerCase().replace(' ', '.')}@repairhub.com`,
    description: 'Професійний майстер з досвідом ремонту пристроїв Apple. Спеціалізуюся на швидкому та якісному ремонті з використанням оригінальних запчастин.',
    services: [
      'Заміна екранів iPhone',
      'Ремонт батарей',
      'Відновлення після води',
      'Ремонт логічних плат',
      'Заміна камер',
      'Ремонт кнопок',
      'Програмне відновлення'
    ],
    reviews: [
      {
        id: 1,
        clientName: 'Олексій К.',
        rating: 5,
        comment: 'Відмінний майстер! Швидко та якісно відремонтував iPhone. Рекомендую!',
        date: '15.10.2024'
      },
      {
        id: 2,
        clientName: 'Марія П.',
        rating: 5,
        comment: 'Дуже професійний підхід. Все зроблено вчасно та з гарантією.',
        date: '12.10.2024'
      },
      {
        id: 3,
        clientName: 'Андрій С.',
        rating: 4,
        comment: 'Хороший майстер, але трохи довго робив. В результаті все працює.',
        date: '08.10.2024'
      }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={master.avatar}
                alt={master.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
              />
              {master.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center border-2 border-white">
                  <VerifiedIcon sx={{ fontSize: 16 }} className="text-white" />
                </div>
              )}
              {onToggleFavorite && (
                <button
                  onClick={() => onToggleFavorite(master.id)}
                  className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white transition-all duration-200 ${
                    isFavorite
                      ? 'bg-yellow-400 hover:bg-yellow-500'
                      : 'bg-white hover:bg-yellow-50'
                  }`}
                  title={isFavorite ? '⭐ Видалити з обраних' : '⭐ Додати до обраних'}
                >
                  <StarIcon
                    sx={{ fontSize: 14 }}
                    className={isFavorite ? 'text-white' : 'text-gray-400'}
                  />
                </button>
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                {master.name}
                {master.verified && <VerifiedIcon sx={{ fontSize: 24 }} className="text-indigo-600" />}
              </h2>
              <p className="text-lg text-gray-600 mb-2">{master.specialization}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <LocationOnIcon sx={{ fontSize: 16 }} />
                  <span>{master.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon sx={{ fontSize: 16 }} className="text-yellow-400" />
                  <span>{master.rating?.toFixed(1)}</span>
                  <span>({mockDetails.completedJobs} робіт)</span>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Закрити"
          >
            <CloseIcon sx={{ fontSize: 28 }} />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Про майстра</h3>
              <p className="text-gray-600 leading-relaxed">{mockDetails.description}</p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Навички та спеціалізація</h3>
              <div className="flex flex-wrap gap-2">
                {master.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Послуги</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {mockDetails.services.map((service, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Відгуки клієнтів</h3>
              <div className="space-y-4">
                {mockDetails.reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{review.clientName}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              sx={{ fontSize: 16 }}
                              className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Stats */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Контактна інформація</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <PhoneIcon sx={{ fontSize: 20 }} className="text-gray-500" />
                  <span className="text-gray-700">{mockDetails.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <EmailIcon sx={{ fontSize: 20 }} className="text-gray-500" />
                  <span className="text-gray-700">{mockDetails.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ScheduleIcon sx={{ fontSize: 20 }} className="text-gray-500" />
                  <span className="text-gray-700">{mockDetails.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-indigo-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Статистика</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Досвід роботи:</span>
                  <span className="font-medium text-gray-900">{mockDetails.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Виконано робіт:</span>
                  <span className="font-medium text-gray-900">{mockDetails.completedJobs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Час відгуку:</span>
                  <span className="font-medium text-gray-900">{mockDetails.responseTime}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => onContact?.(master)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                title="💬 Написати майстру повідомлення в чаті"
              >
                <MessageIcon sx={{ fontSize: 20 }} />
                Написати майстру
              </button>
              
              <button
                onClick={() => onPortfolio?.(master)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                title="🖼️ Переглянути портфоліо робіт майстра"
              >
                <WorkIcon sx={{ fontSize: 20 }} />
                Портфоліо робіт
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
