'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    title: "Sent automated response",
    time: "2 minutes ago",
    status: "success",
    description: "Auto-reply sent to new contact"
  },
  {
    id: 2,
    title: "New contact added",
    time: "15 minutes ago",
    status: "info",
    description: "Contact from Instagram DM"
  },
  {
    id: 3,
    title: "Campaign completed",
    time: "1 hour ago",
    status: "success",
    description: "Weekly engagement campaign finished"
  },
  {
    id: 4,
    title: "Template updated",
    time: "3 hours ago",
    status: "warning",
    description: "Welcome message template modified"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'info':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <p className="text-sm text-muted-foreground">Your latest engagement activities</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Badge className={`${getStatusColor(activity.status)} text-xs`}>
                {activity.status}
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
