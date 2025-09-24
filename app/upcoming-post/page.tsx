'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from 'next/image';

export default function UpcomingPostPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const router = useRouter();

  // Redirect to configure page when toggle is enabled
  useEffect(() => {
    if (isToggleEnabled) {
      router.push('/upcoming-post/configure');
    }
  }, [isToggleEnabled, router]);

  const handleSave = () => {
    console.log('Saving upcoming post...');
    // Add save logic here
  };

  const handleCancel = () => {
    console.log('Cancelling upcoming post...');
    // Add cancel logic here
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
                <span className="text-sm text-muted-foreground">Upcoming Post</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-foreground">Upcoming Post</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Enable Upcoming Post"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-200 rounded-lg"
                />
              </div>
            </div>

            {/* Post Preview Section */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-sm p-6 max-w-6xl w-full">
                {/* Instagram-style Post Preview */}
                <div className="space-y-4">
                  {/* Main Post */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    {/* Post Header */}
                    <div className="flex items-center p-3 border-b border-gray-100">
                      {/* <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center"> */}
                        {/* <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-800">J</span>
                        </div> */}
                      {/* </div> */}
                      <div className="ml-3">
                        <p className="font-semibold text-sm">Enable Upcoming Post</p>
                      </div>
                      <div className="ml-auto">
                        <div className="flex items-center">
                          <div className="relative inline-flex items-center">
                            <input 
                              type="checkbox" 
                              checked={isToggleEnabled}
                              onChange={(e) => setIsToggleEnabled(e.target.checked)}
                              className="sr-only"
                            />
                            <div 
                              onClick={() => setIsToggleEnabled(!isToggleEnabled)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                                isToggleEnabled ? 'bg-blue-500' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  isToggleEnabled ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Image */}
                    <div className="flex justify-center">
                      <img
                        className=''
                        src='/images/upcoming_post.png'
                      />
                      <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Your Story
                      </div>
                    </div>

                    {/* Post Actions */}
                    <div className="p-3">
                      {/* <div className="flex items-center space-x-4 mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div> */}
                      {/* <p className="text-sm text-gray-600 mb-1">Liked by <span className="font-semibold">alex_smith</span> and others</p>
                      <p className="text-sm">
                        <span className="font-semibold">jenny_jk</span> The most beautiful and comfortable dress you can find
                      </p> */}
                    </div>
                  </div>

                  {/* Side Story Preview */}
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                    <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm w-20">
                      <div className="aspect-square bg-gradient-to-br from-pink-100 to-orange-100 rounded-lg mb-2 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-xs text-center text-gray-600">View My Post</p>
                    </div>
                  </div>
                </div>


                {/* Notice Text */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Notice:</span> This feature applies to the new post that has been added to Instagram recently.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    ✕ Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    💾 Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
