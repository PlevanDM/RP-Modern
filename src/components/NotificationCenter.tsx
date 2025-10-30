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
        <Button variant="outline" size="icon" className="relative min-h-[40px] min-w-[40px] sm:min-h-[36px] sm:min-w-[36px] shrink-0">
          <Bell className="h-5 w-5 sm:h-4 sm:w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[90vw] sm:w-80 max-w-sm">
        <div className="p-3 sm:p-2 font-bold border-b text-sm sm:text-base">Notifications</div>
        {notifications.length === 0 ? (
          <div className="p-4 text-sm text-center text-gray-500">No new notifications</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} onSelect={(e) => e.preventDefault()}>
              <div className="flex items-start p-2.5 sm:p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg gap-2">
                <div className="flex-1 min-w-0">
                  <p className={`text-sm sm:text-sm leading-relaxed ${!notification.read ? 'font-bold' : 'font-medium'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(() => {
                      try {
                        return new Date(notification.createdAt).toLocaleString('uk-UA');
                      } catch (e) {
                        return new Date(notification.createdAt).toISOString();
                      }
                    })()}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => readNotification(notification.id)}
                      title="Mark as read"
                      className="min-h-[36px] min-w-[36px] p-1.5"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeNotification(notification.id)}
                    title="Remove notification"
                    className="text-red-500 min-h-[36px] min-w-[36px] p-1.5"
                  >
                    &times;
                  </Button>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
