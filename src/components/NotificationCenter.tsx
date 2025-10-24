import { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle, Info, MessageSquare } from 'lucide-react';
import { Notification } from '../types';

interface NotificationCenterProps {
  notifications: Notification[];
  onRead: (id: string) => void;
  onRemove: (id: string) => void;
}

export function NotificationCenter({ notifications, onRead, onRemove }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'status':
        return <Info className="w-5 h-5 text-yellow-600" />;
      case 'rating':
        return <Check className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'щойно';
    if (minutes < 60) return `${minutes}м назад`;
    if (hours < 24) return `${hours}г назад`;
    if (days < 7) return `${days}д назад`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">🔔 Сповіщення</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Нема сповіщень</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !notif.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => onRead(notif.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="font-semibold text-gray-900">{notif.message}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemove(notif.id);
                          }}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{formatTime(notif.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Переглянути всі сповіщення
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
