'use client';

import { useState, useEffect } from 'react';
import DashboardSidebar from "@/components/DashboardSidebar";
import AnalyticsChart from "@/components/AnalyticsChart";
import PostsTable from "@/components/PostsTable";
import ActivitySidebar from "@/components/ActivitySidebar";
import { CheckCircle, AlertCircle, Instagram } from "lucide-react";

export default function DashboardPage() {
  const [linkedPosts, setLinkedPosts] = useState<any[]>([]);
  const [unlinkedPosts, setUnlinkedPosts] = useState<any[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  
  const [instagramStatus, setInstagramStatus] = useState({
    isConnected: false,
    username: null,
    loading: true
  });

  // Load Instagram posts
  const loadInstagramPosts = async () => {
    if (!instagramStatus.isConnected) return;
    
    setPostsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instagram/posts`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Transform data to match PostsTable interface
          const transformedLinked = data.data.linkedPosts.map((post: any) => ({
            id: post.id,
            image: post.image,
            dmSent: post.automation?.dmSent || 0,
            open: post.automation?.open || 0,
            click: post.automation?.click || 0,
            ctr: post.automation?.ctr || "0%",
            linkedDate: new Date(post.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            action: "edit"
          }));

          const transformedUnlinked = data.data.unlinkedPosts.map((post: any) => ({
            id: post.id,
            image: post.image,
            dmSent: 0,
            open: 0,
            click: 0,
            ctr: "0%",
            linkedDate: new Date(post.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            action: "link"
          }));

          setLinkedPosts(transformedLinked);
          setUnlinkedPosts(transformedUnlinked);
        }
      }
    } catch (error) {
      console.error('Failed to load Instagram posts:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  // Load Instagram connection status
  useEffect(() => {
    const loadInstagramStatus = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instagram/status`);
        if (response.ok) {
          const data = await response.json();
          setInstagramStatus({
            isConnected: data.data.isConnected,
            username: data.data.username,
            loading: false
          });
        }
      } catch (error) {
        console.error('Failed to load Instagram status:', error);
        setInstagramStatus(prev => ({ ...prev, loading: false }));
      }
    };

    loadInstagramStatus();
  }, []);

  // Load posts when Instagram is connected
  useEffect(() => {
    if (instagramStatus.isConnected && !instagramStatus.loading) {
      loadInstagramPosts();
    }
  }, [instagramStatus.isConnected, instagramStatus.loading]);

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">
                  Welcome back! Here's what's happening with your account.
                </p>
              </div>
              
              {/* Instagram Status Indicator */}
              <div className="flex items-center space-x-3">
                {!instagramStatus.loading && (
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg border">
                    {instagramStatus.isConnected ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Instagram className="h-4 w-4 text-pink-500" />
                        <span className="text-sm font-medium text-gray-700">
                          @{instagramStatus.username}
                        </span>
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          Connected
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <Instagram className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Instagram not connected
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Analytics Chart */}
              <AnalyticsChart />

              {/* Posts Tables */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <PostsTable 
                  title="Latest Linked Posts/Reels" 
                  posts={linkedPosts}
                  isLinked={true}
                />
                <PostsTable 
                  title="Latest Unlinked Posts/Reels" 
                  posts={unlinkedPosts}
                  isLinked={false}
                />
              </div>
            </div>
          </main>
        </div>

        {/* Activity Sidebar */}
        <ActivitySidebar />
      </div>
    </div>
  );
}
