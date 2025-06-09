import { useEffect } from 'react';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timeout: number;
}

interface BookingNotificationsProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const BookingNotifications = ({ notifications, onDismiss }: BookingNotificationsProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-xs">
      {notifications.map((notification) => (
        <NotificationItem 
          key={notification.id} 
          notification={notification} 
          onDismiss={onDismiss} 
        />
      ))}
    </div>
  );
};

const NotificationItem = ({ 
  notification, 
  onDismiss 
}: { 
  notification: Notification, 
  onDismiss: (id: string) => void 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, notification.timeout);
    
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);
  
  const bgColor = () => {
    switch (notification.type) {
      case 'info': return 'bg-blue-500';
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-800';
    }
  };
  
  return (
    <div className={`${bgColor()} text-white p-3 rounded-lg shadow-lg flex items-start justify-between animate-slideIn`}>
      <div>{notification.message}</div>
      <button 
        onClick={() => onDismiss(notification.id)} 
        className="ml-2 text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
};

export default BookingNotifications;