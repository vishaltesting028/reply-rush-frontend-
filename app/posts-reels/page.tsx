'use client';

import { useState, useEffect } from 'react';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from 'next/image';

interface Post {
  _id: string;
  title: string;
  content: string;
  type: 'post' | 'reel';
  platform: string;
  status: string;
  isLinked: boolean;
  mediaUrls: string[];
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    sent: number;
    open: number;
    clicks: number;
    pendingDM: number;
  };
  publishedAt?: string;
  createdAt: string;
}

export default function PostsReelsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const tabs = ['All', 'Link', 'Unlink'];

  // Get authentication token
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  // Check if user is authenticated
  const checkAuth = () => {
    const token = getAuthToken();
    if (!token) {
      // For development: create a dummy token to bypass authentication
      const dummyToken = 'dev-token-' + Date.now();
      localStorage.setItem('token', dummyToken);
      localStorage.setItem('user', JSON.stringify({ 
        id: 'dev-user', 
        email: 'dev@example.com', 
        name: 'Development User' 
      }));
      
      toast({
        title: "Development Mode",
        description: "Logged in with development credentials",
        variant: "default"
      });
      return true;
    }
    return true;
  };

  // Fetch posts from backend
  const fetchPosts = async () => {
    if (!checkAuth()) return;

    setIsLoading(true);
    try {
      const token = getAuthToken();
      let url = `${process.env.NEXT_PUBLIC_API_URL}/posts`;
      
      // Add filter based on active tab
      if (activeTab === 'Link') {
        url += '?isLinked=true';
      } else if (activeTab === 'Unlink') {
        url += '?isLinked=false';
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch posts",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Fetch posts error:', error);
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch latest posts from social media
  const fetchLatestPosts = async () => {
    if (!checkAuth()) return;

    setIsFetching(true);
    try {
      const token = getAuthToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/fetch-latest`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success!",
          description: `${data.count} new posts fetched successfully`,
          variant: "default"
        });
        // Refresh the posts list
        fetchPosts();
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch latest posts",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Fetch latest posts error:', error);
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsFetching(false);
    }
  };

  // Load posts on component mount and tab change
  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  // Filter posts based on active tab
  const filteredPosts = posts.filter(post => {
    if (activeTab === 'Link') return post.isLinked;
    if (activeTab === 'Unlink') return !post.isLinked;
    return true; // All
  });

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
                <span className="text-sm text-muted-foreground mx-2"></span>
                <span className="text-sm text-muted-foreground">Posts</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-foreground">Posts</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {/* Filter Tabs */}
            <div className="flex space-x-1 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600">Loading posts...</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              /* Posts Grid */
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {filteredPosts.map((post) => (
                  <div key={post._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Post Image */}
                    {post.mediaUrls && post.mediaUrls.length > 0 && (
                      <div className="relative h-64 bg-gray-100">
                        <img 
                          src={post.mediaUrls[0]} 
                          alt="Post content"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Post Content */}
                    <div className="p-4">
                  
                      {/* Post Description */}
                      {post.mediaUrls.length > 0 ? (
                        <Image 
                          src='/images/second.jpg'
                          alt={post.title}
                          width={200}
                          height={300}
                          className="w-full h-48 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = '/images/second.jpg';
                          }}
                        />
                      ) : (
                        <Image 
                          src="/images/second.jpg" 
                          alt="No media available"
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover rounded-lg bg-gray-100"
                        />
                      )}
                    
                      
                      {/* Caption */}
                      <p className="text-gray-500 text-sm mb-4">No Caption</p>
                      
                      {/* Engagement Metrics */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-blue-500">📤</span>
                            <span className="text-gray-600">Sent</span>
                          </div>
                          <span className="font-medium">{post.engagement.sent}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-blue-500">✅</span>
                            <span className="text-gray-600">Open</span>
                          </div>
                          <span className="font-medium">{post.engagement.open}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-orange-500">👆</span>
                            <span className="text-gray-600">Clicks</span>
                          </div>
                          <span className="font-medium">{post.engagement.clicks}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-red-500">📩</span>
                            <span className="text-gray-600">Pending DM</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">{post.engagement.pendingDM}</span>
                            <span className="text-yellow-500">⭐</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Timestamp */}
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <span className="mr-2">📅</span>
                        <span>
                          {post.publishedAt ? 
                            `${new Date(post.publishedAt).toLocaleDateString('en-US', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric' 
                            })} at ${new Date(post.publishedAt).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit', 
                              hour12: true 
                            })}` :
                            `${new Date(post.createdAt).toLocaleDateString('en-US', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric' 
                            })} at ${new Date(post.createdAt).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit', 
                              hour12: true 
                            })}`
                          }
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-400 mb-3">
                        {Math.floor((Date.now() - new Date(post.publishedAt || post.createdAt).getTime()) / (1000 * 60 * 60))} hours ago
                      </div>
                      
                      {/* Link Button */}
                      <button className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded text-sm hover:bg-blue-50 transition-colors">
                        🔗 Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16">
                {/* Illustration */}
                <div className="mb-8">
                  <svg
                    width="300"
                    height="200"
                    viewBox="0 0 300 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-80 h-52"
                  >
                    {/* Database/Server Stack */}
                    <g transform="translate(40, 60)">
                      {/* Server layers */}
                      <rect x="0" y="0" width="80" height="12" rx="2" fill="#4A5568" />
                      <rect x="0" y="15" width="80" height="12" rx="2" fill="#2D3748" />
                      <rect x="0" y="30" width="80" height="12" rx="2" fill="#4A5568" />
                      <rect x="0" y="45" width="80" height="12" rx="2" fill="#2D3748" />
                      <rect x="0" y="60" width="80" height="12" rx="2" fill="#4A5568" />
                      
                      {/* Server details */}
                      <circle cx="8" cy="6" r="2" fill="#48BB78" />
                      <circle cx="8" cy="21" r="2" fill="#48BB78" />
                      <circle cx="8" cy="36" r="2" fill="#48BB78" />
                      <circle cx="8" cy="51" r="2" fill="#48BB78" />
                      <circle cx="8" cy="66" r="2" fill="#48BB78" />
                    </g>

                    {/* Laptop/Computer */}
                    <g transform="translate(120, 80)">
                      {/* Laptop base */}
                      <rect x="0" y="40" width="120" height="8" rx="4" fill="#E2E8F0" />
                      <rect x="10" y="35" width="100" height="5" rx="2" fill="#CBD5E0" />
                      
                      {/* Laptop screen */}
                      <rect x="15" y="0" width="90" height="60" rx="4" fill="#2D3748" stroke="#4A5568" strokeWidth="2" />
                      <rect x="20" y="5" width="80" height="50" rx="2" fill="#4299E1" />
                      
                      {/* Screen content - "NO DATA" text */}
                      <text x="60" y="25" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">NO DATA</text>
                      
                      {/* Screen reflection */}
                      <rect x="20" y="5" width="25" height="50" rx="2" fill="url(#screenGradient)" opacity="0.3" />
                    </g>

                    {/* Person figure */}
                    <g transform="translate(200, 40)">
                      {/* Head */}
                      <circle cx="25" cy="15" r="12" fill="#F7FAFC" stroke="#4A5568" strokeWidth="2" />
                      
                      {/* Body */}
                      <rect x="15" y="25" width="20" height="40" rx="10" fill="#2D3748" />
                      
                      {/* Arms */}
                      <rect x="5" y="30" width="12" height="6" rx="3" fill="#2D3748" />
                      <rect x="33" y="30" width="12" height="6" rx="3" fill="#2D3748" />
                      
                      {/* Legs */}
                      <rect x="18" y="63" width="6" height="25" rx="3" fill="#2D3748" />
                      <rect x="26" y="63" width="6" height="25" rx="3" fill="#2D3748" />
                      
                      {/* Magnifying glass */}
                      <circle cx="45" cy="25" r="8" fill="none" stroke="#4299E1" strokeWidth="3" />
                      <line x1="51" y1="31" x2="58" y2="38" stroke="#4299E1" strokeWidth="3" strokeLinecap="round" />
                    </g>

                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* No Posts Found Text */}
                <h3 className="text-lg font-medium text-gray-600 mb-6">
                  {activeTab === 'All' ? 'No Posts Found' : `No ${activeTab}ed Posts Found`}
                </h3>

                {/* Fetch Latest Post Button */}
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
                  onClick={fetchLatestPosts}
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Fetching...
                    </>
                  ) : (
                    <>🔄 Fetch Latest Post</>
                  )}
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
