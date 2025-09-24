'use client';

import { useState, useEffect } from 'react';
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
}

const API = process.env.NEXT_PUBLIC_API_URL; // loaded from .env.local

export default function ConnectAccountPage() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Removed showInstagramModal state - using direct redirect instead
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Handle OAuth callback responses
  useEffect(() => {
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
            status: 'active'
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

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <span>Home</span>
                <span>›</span>
                <span>Connect Account</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Connect Account</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Connected Accounts */}
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                {accounts.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Instagram className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts connected</h3>
                    <p className="text-gray-500">Connect your social media accounts to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {accounts.map((account) => {
                      const Icon = platformIcons[account.platform as keyof typeof platformIcons];
                      return (
                        <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium">@{account.username}</h4>
                                {account.status === 'active' && (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                                {account.status === 'error' && (
                                  <AlertCircle className="w-4 h-4 text-red-500" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {account.platform} • {account.followers.toLocaleString()} followers
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Last synced: {account.lastSync.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Label htmlFor={`toggle-${account.id}`} className="text-sm">
                                Active
                              </Label>
                              <Switch
                                id={`toggle-${account.id}`}
                                checked={account.isConnected}
                                onCheckedChange={(checked) => handleToggleAccount(account.id, checked)}
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDisconnectAccount(account.id)}
                            >
                              Disconnect
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Available Platforms */}
            <Card>
              <CardHeader>
                <CardTitle>Available Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {availablePlatforms.map((platform) => {
                    const Icon = platformIcons[platform.name as keyof typeof platformIcons];
                    const isConnected = accounts.some(acc => acc.platform === platform.name);
                    
                    return (
                      <div key={platform.name} className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-3 ${platform.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-medium mb-2">{platform.name}</h4>
                        <Button
                          variant={isConnected ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleConnectAccount(platform.name)}
                          disabled={isConnected}
                          className="w-full"
                        >
                          {isConnected ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Connected
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Connect
                            </>
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Auto-sync</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync your account data every hour
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified when there are issues with your accounts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Data Backup</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically backup your account data
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Having trouble connecting your accounts? Here are some common solutions:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Make sure you have admin access to the account</li>
                    <li>• Check that your account is not restricted</li>
                    <li>• Try disconnecting and reconnecting the account</li>
                    <li>• Contact support if issues persist</li>
                  </ul>
                  <Button variant="outline" className="mt-4">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Instagram OAuth now handled by direct redirect to backend */}
    </div>
  );
}
