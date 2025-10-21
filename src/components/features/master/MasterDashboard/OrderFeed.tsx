// src/components/features/master/MasterDashboard/OrderFeed.tsx

import React from 'react';
import { ClipboardList, MessageSquare, Star, CreditCard } from 'lucide-react';

// Placeholder data
const feedItems = [
  { id: 1, type: 'new_order', text: 'Новый заказ #1234: Ремонт экрана iPhone 13', time: '15 минут назад', icon: <ClipboardList className="w-5 h-5 text-blue-500" /> },
  { id: 2, type: 'review', text: 'Вы получили новый отзыв (5 звезд) от Anna S.', time: '1 час назад', icon: <Star className="w-5 h-5 text-yellow-500" /> },
  { id: 3, type: 'payment', text: 'Оплата 1500 UAH за заказ #1230 отправлена', time: '3 часа назад', icon: <CreditCard className="w-5 h-5 text-green-500" /> },
  { id: 4, type: 'message', text: 'Новое сообщение от Ivan K. по заказу #1232', time: 'Вчера', icon: <MessageSquare className="w-5 h-5 text-purple-500" /> },
  { id: 5, type: 'new_order', text: 'Новый заказ #1235: Замена батареи MacBook Pro', time: 'Вчера', icon: <ClipboardList className="w-5 h-5 text-blue-500" /> },
];

export const OrderFeed: React.FC = () => {
  return (
    <div className="space-y-6">
      <ul className="divide-y divide-gray-200">
        {feedItems.map(item => (
          <li key={item.id} className="py-4 flex items-start space-x-4">
            <div className="flex-shrink-0 bg-gray-100 p-3 rounded-full">
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{item.text}</p>
              <p className="text-xs text-gray-500 mt-1">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
      <button className="w-full text-center text-sm font-semibold text-blue-600 hover:underline">
        Показать всю активность
      </button>
    </div>
  );
};
