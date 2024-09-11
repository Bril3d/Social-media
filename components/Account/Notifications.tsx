import { Bell, Heart, MessageCircle, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'friendRequest';
  content: string;
  time: string;
}

const notificationsList: Notification[] = [
  { id: 1, type: 'like', content: 'Alice liked your post', time: '2 minutes ago' },
  { id: 2, type: 'comment', content: 'Bob commented on your photo', time: '1 hour ago' },
  { id: 3, type: 'friendRequest', content: 'Charlie sent you a friend request', time: '3 hours ago' },
  { id: 4, type: 'like', content: 'Diana liked your comment', time: '1 day ago' },
]

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'like': return <Heart className="h-5 w-5 text-red-500" />;
    case 'comment': return <MessageCircle className="h-5 w-5 text-blue-500" />;
    case 'friendRequest': return <UserPlus className="h-5 w-5 text-green-500" />;
    default: return <Bell className="h-5 w-5 text-gray-500" />;
  }
}

export default function Notifications() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notificationsList.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-4 p-3 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <p className="font-medium">{notification.content}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}