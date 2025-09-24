'use client';

import { CheckCircle, Clock, MessageSquare } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'dm' | 'story' | 'setting';
  title: string;
  description: string;
  time: string;
  status: 'completed' | 'pending';
}

export default function ActivitySidebar() {
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: 'dm',
      title: 'Response instantly to Instagram comments with automated DMs!',
      description: 'Click the Link button to set up Auto DM.',
      time: '2h ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'story',
      title: 'Story Auto DM',
      description: 'Respond instantly to stories comments with automated DMs! Click the Link button to set up Auto DM.',
      time: '4h ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'setting',
      title: 'Default Settings',
      description: 'The default settings make it easy to set up Auto DM for new posts and streamline your workflow.',
      time: '6h ago',
      status: 'pending'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'dm':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'story':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'setting':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <div className="flex-shrink-0 mt-1">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                {activity.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{activity.time}</span>
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-400' : 'bg-orange-400'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
