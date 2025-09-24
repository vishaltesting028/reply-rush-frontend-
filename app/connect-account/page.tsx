'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Instagram, Facebook, Twitter, Youtube, CheckCircle, AlertCircle, Plus } from "lucide-react";
// Removed InstagramOAuthModal - using direct redirect instead
import { useToast } from "@/hooks/use-toast";

interface ConnectedAccount {
  id: string;
  platform: string;
  username: string;
  isConnected: boolean;
  followers: number;
  lastSync: Date;
  status: 'active' | 'error' | 'pending';
  autoEngage: boolean;
}

const API = process.env.NEXT_PUBLIC_API_URL; // loaded from .env.local

function ConnectAccountPageContent() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Removed showInstagramModal state - using direct redirect instead
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Handle OAuth callback responses
  useEffect(() => {
    if (!searchParams) return;
    
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const username = searchParams.get('username');

    if (success === 'true') {
      toast({
        title: "Instagram Connected!",
        description: `Successfully connected Instagram account: @${username}`,
        variant: "default"
      });
      
      // Refresh the Instagram status multiple times to ensure it updates
      checkInstagramStatus();
      setTimeout(() => checkInstagramStatus(), 1000);
      setTimeout(() => checkInstagramStatus(), 3000);
      
      // Clean up URL parameters
      router.replace('/connect-account');
    } else if (error) {
      let errorMessage = "Failed to connect Instagram account";
      
      switch (error) {
        case 'access_denied':
          errorMessage = "Instagram access was denied";
          break;
        case 'no_code':
          errorMessage = "No authorization code received";
          break;
        case 'oauth_failed':
          errorMessage = "OAuth authentication failed";
          break;
        default:
          errorMessage = `Instagram connection failed: ${error}`;
      }
      
      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive"
      });
      
      // Clean up URL parameters
      router.replace('/connect-account');
    }
  }, [searchParams, router, toast]);

  const platformIcons = {
    Instagram: Instagram,
    Facebook: Facebook,
    Twitter: Twitter,
    Youtube: Youtube,
  };

  const availablePlatforms = [
    { name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { name: 'Facebook', color: 'bg-blue-600' },
    { name: 'Twitter', color: 'bg-blue-400' },
    { name: 'Youtube', color: 'bg-red-600' },
  ];

  const handleConnectAccount = (platform: string) => {
    if (platform === 'Instagram') {
      // Use the unified Instagram Basic Display API OAuth implementation
      // This route provides consistent API handling and proper error management
      window.location.href = `${API}/auth/instagram`;
    } else {
      console.log(`Connecting to ${platform}...`);
      // Implementation for other platforms
    }
  };

  // Removed handleInstagramSuccess - OAuth now handled by direct redirect

  // Check status (profile info) after login
  const checkInstagramStatus = async () => {
    try {
      console.log('🔍 Checking Instagram status...');
      const res = await fetch(`${API}/api/instagram/status`, {
        credentials: "include" // if you use cookies/session
      });
      
      console.log('📡 Status response:', res.status, res.ok);
      
      if (!res.ok) {
        console.log('❌ Status check failed:', res.status);
        return;
      }
      
      const result = await res.json();
      console.log('📊 Status result:', result);
      
      if (result.success && result.data.isConnected) {
        console.log('✅ Instagram is connected! Updating UI...');
        setAccounts(prev => [
          ...prev.filter(acc => acc.platform !== 'Instagram'),
          {
            id: 'instagram-1',
            platform: 'Instagram',
            username: result.data.username || 'Unknown',
            isConnected: true,
            followers: result.data.followersCount || 0,
            lastSync: new Date(result.data.connectedAt || result.data.lastSyncAt),
            status: 'active',
            autoEngage: false
          }
        ]);
      } else {
        console.log('❌ Instagram not connected:', result.data);
      }
    } catch (err) {
      console.error("❌ Status fetch error:", err);
    }
  };

  // Load Instagram connection status on component mount
  useEffect(() => {
    checkInstagramStatus();
  }, []);

  const handleDisconnectAccount = async (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    if (account?.platform === 'Instagram') {
      try {
        await fetch(`${API}/api/instagram/disconnect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include' // Include cookies/session for authentication
        });
      } catch (error) {
        console.error('Failed to disconnect Instagram:', error);
      }
    }
    setAccounts(prev => prev.filter(account => account.id !== accountId));
  };

  const handleToggleAccount = (accountId: string, enabled: boolean) => {
    setAccounts(prev => 
      prev.map(account => 
        account.id === accountId 
          ? { ...account, isConnected: enabled }
          : account
      )
    );
  };

  const handleInstagramConnect = () => {
    setIsLoading(true);
    // Redirect to backend Instagram OAuth endpoint
    const baseUrl = API || 'http://localhost:5000';
    window.location.href = `${baseUrl}/auth/instagram`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Accounts</h1>
            <p className="text-gray-600">Connect your social media accounts to start managing your content</p>
          </div>

          {/* Instagram Connection Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Instagram className="h-6 w-6 text-pink-500" />
                Instagram
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Connect your Instagram account to schedule posts, manage content, and track engagement.
                </p>
                
                {/* Connection Status */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">Not Connected</p>
                      <p className="text-sm text-gray-600">Connect your Instagram account to get started</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleInstagramConnect}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Connect Instagram
                      </>
                    )}
                  </Button>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Schedule Posts</p>
                      <p className="text-sm text-gray-600">Plan and schedule your Instagram content</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Auto Engagement</p>
                      <p className="text-sm text-gray-600">Automatically engage with your audience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Analytics</p>
                      <p className="text-sm text-gray-600">Track performance and engagement metrics</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Content Management</p>
                      <p className="text-sm text-gray-600">Organize and manage your content library</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Social Platforms - Coming Soon */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Facebook */}
            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Facebook className="h-6 w-6 text-blue-600" />
                  Facebook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Connect your Facebook page to manage posts and engagement.</p>
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            {/* Twitter */}
            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Twitter className="h-6 w-6 text-blue-400" />
                  Twitter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Schedule tweets and manage your Twitter presence.</p>
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            {/* YouTube */}
            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Youtube className="h-6 w-6 text-red-600" />
                  YouTube
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Upload and schedule YouTube videos and shorts.</p>
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Connected Accounts List */}
          {accounts.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Instagram className="h-5 w-5 text-pink-500" />
                        <div>
                          <p className="font-medium">{account.username}</p>
                          <p className="text-sm text-gray-600">{account.platform} • {account.followers.toLocaleString()} followers</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`auto-${account.id}`} className="text-sm">Auto-engage</Label>
                          <Switch id={`auto-${account.id}`} checked={account.autoEngage} />
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          account.status === 'active' ? 'bg-green-100 text-green-800' :
                          account.status === 'error' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {account.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ConnectAccountPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <ConnectAccountPageContent />
    </Suspense>
  );
}
