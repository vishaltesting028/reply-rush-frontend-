'use client';

import { useState, useEffect } from 'react';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

interface Story {
  _id: string;
  title: string;
  content: string;
  mediaUrls: string[];
  platform: string;
  status: string;
  isLinked: boolean;
  engagement: {
    sent: number;
    open: number;
    clicks: number;
    views: number;
  };
  publishedAt?: string;
  createdAt: string;
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const mockStories: Story[] = [
    {
      _id: '1',
      title: 'Summer Collection Launch',
      content: 'Check out our amazing summer collection!',
      mediaUrls: ['/images/second.jpg'],
      platform: 'instagram',
      status: 'published',
      isLinked: true,
      engagement: { sent: 0, open: 0, clicks: 0, views: 1250 },
      publishedAt: '28 Aug 2025 at 10:41 AM',
      createdAt: '2025-08-28T10:41:00Z'
    },
    {
      _id: '2',
      title: 'Behind the Scenes',
      content: 'Take a look behind the scenes of our latest photoshoot',
      mediaUrls: ['/images/second.jpg'],
      platform: 'instagram',
      status: 'published',
      isLinked: true,
      engagement: { sent: 0, open: 0, clicks: 0, views: 890 },
      publishedAt: '28 Aug 2025 at 10:30 AM',
      createdAt: '2025-08-28T10:30:00Z'
    }
  ];

  useEffect(() => {
    // Set mock data
    setStories(mockStories);
  }, []);

  const handleFetchStories = async () => {
    setIsLoading(true);
    try {
      // Add your API call here
      toast({
        title: "Stories Updated",
        description: "Latest stories have been fetched successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch stories. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-sm text-muted-foreground">Home</span>
                <span className="text-sm text-muted-foreground mx-2">&gt;</span>
                <span className="text-sm text-muted-foreground">Stories</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-foreground">Stories</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {/* Header with sync info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                Quickly sync your latest Instagram stories if they're not updated!
              </p>
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium mt-2"
                onClick={handleFetchStories}
                disabled={isLoading}
              >
                {isLoading ? '🔄 Fetching...' : '🔄 Fetch Latest'}
              </Button>
            </div>

            {/* Stories Grid */}
            {stories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stories.map((story) => (
                  <div key={story._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Story Image */}
                    <div className="relative">
                      <Image 
                        src={story.mediaUrls[0] || '/images/second.jpg'}
                        alt={story.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                      {/* Platform badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          📷 Instagram
                        </span>
                      </div>
                    </div>

                    {/* Story Content */}
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{story.title}</h3>
                      
                      {/* Engagement Metrics */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-blue-500">📤</span>
                            <span className="text-gray-600">Sent</span>
                          </div>
                          <span className="font-medium">{story.engagement.sent}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-green-500">👁️</span>
                            <span className="text-gray-600">Open</span>
                          </div>
                          <span className="font-medium">{story.engagement.open}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-orange-500">👆</span>
                            <span className="text-gray-600">Clicks</span>
                          </div>
                          <span className="font-medium">{story.engagement.clicks}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-purple-500">👀</span>
                            <span className="text-gray-600">Views</span>
                          </div>
                          <span className="font-medium">{story.engagement.views}</span>
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>📅 {story.publishedAt}</span>
                        <span>6 hours ago</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          🔗 Link
                        </Button>
                        {/* <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          🔗 Link
                        </Button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-lg font-medium text-gray-600 mb-6">No Stories Found</h3>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
                  onClick={handleFetchStories}
                  disabled={isLoading}
                >
                  {isLoading ? '🔄 Fetching...' : '🔄 Fetch Latest Story'}
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
