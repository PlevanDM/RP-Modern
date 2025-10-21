import { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle, Info, MessageSquare } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  actionUrl?: string;
  actionText?: string;
  read: boolean;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Имитируем получение уведомлений
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: '✅ Замовлення прийнято',
        message: 'Ваше замовлення #1234 прийнято 2 майстрами',
        timestamp: new Date(Date.now() - 5 * 60000),
        actionText: 'Переглянути',
        read: false
      },
      {
        id: '2',
        type: 'warning',
        title: '⏰ Швидка дія потрібна',
        message: 'У вас 1 новая пропозиция на замовлення #1230',
        timestamp: new Date(Date.now() - 15 * 60000),
        actionText: 'Переглянути',
        read: false
      },
      {
        id: '3',
        type: 'info',
        title: 'ℹ️ Нова функція',
        message: 'Тепер ви можете завантажувати фото в чат',
        timestamp: new Date(Date.now() - 30 * 60000),
        read: true
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBackgroundColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
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
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="font-semibold text-gray-900">{notif.title}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notif.id);
                          }}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{formatTime(notif.timestamp)}</span>
                        {notif.actionText && (
                          <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
                            {notif.actionText} →
                          </button>
                        )}
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
