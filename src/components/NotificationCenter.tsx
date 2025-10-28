import React from 'react';
import { Bell, Check } from 'lucide-react';
import { useNotificationsStore } from '../store/notificationsStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const NotificationCenter: React.FC = () => {
  const { notifications, readNotification, removeNotification } = useNotificationsStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2 font-bold border-b">Notifications</div>
        {notifications.length === 0 ? (
          <div className="p-4 text-sm text-center text-gray-500">No new notifications</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} onSelect={(e) => e.preventDefault()}>
              <div className="flex items-start p-2 hover:bg-gray-100 rounded-lg">
                <div className="flex-1">
                  <p className={`text-sm ${!notification.read ? 'font-bold' : ''}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(() => {
                      try {
                        return new Date(notification.createdAt).toLocaleString('uk-UA');
                      } catch (e) {
                        return new Date(notification.createdAt).toISOString();
                      }
                    })()}
                  </p>
                </div>
                {!notification.read && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => readNotification(notification.id)}
                    title="Mark as read"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeNotification(notification.id)}
                  title="Remove notification"
                  className="text-red-500"
                >
                  &times;
                </Button>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
