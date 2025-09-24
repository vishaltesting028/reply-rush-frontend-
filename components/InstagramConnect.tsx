'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API = process.env.NEXT_PUBLIC_API_URL; // loaded from .env.local

interface InstagramData {
  username: string;
  isConnected: boolean;
  connectedAt: string;
  accountType: string;
  followersCount: number;
  mediaCount: number;
  profilePicture?: string;
}

export default function InstagramConnect() {
  const [instagramData, setInstagramData] = useState<InstagramData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    checkInstagramStatus();
    
    // Listen for OAuth callback messages
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'INSTAGRAM_AUTH_SUCCESS') {
        setStatus('success');
        setInstagramData(event.data.data);
        checkInstagramStatus(); // Refresh data from backend
      } else if (event.data.type === 'INSTAGRAM_AUTH_ERROR') {
        setStatus('error');
        setErrorMessage(getErrorMessage(event.data.error));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const checkInstagramStatus = async () => {
    try {
      const response = await fetch(`${API}/api/instagram/status`, {
        credentials: "include" // if you use cookies/session
      });
      const data = await response.json();
      
      if (data.success && data.data.isConnected) {
        setInstagramData(data.data);
        setStatus('success');
      } else {
        setInstagramData(null);
        setStatus('idle');
      }
    } catch (error) {
      console.error('Error checking Instagram status:', error);
    }
  };

  const connectInstagram = () => {
    setIsLoading(true);
    setStatus('connecting');
    setErrorMessage('');
    
    // Instagram OAuth configuration
    const INSTAGRAM_CLIENT_ID = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID || "";
    const REDIRECT_URI = `${API}/auth/instagram/callback`;
    const SCOPE = "user_profile,user_media";

    // Build Instagram OAuth URL
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPE}&response_type=code`;

    // Redirect user to Instagram login
    window.location.href = authUrl;
  };

  const disconnectInstagram = async () => {
    try {
      const response = await fetch(`${API}/api/instagram/disconnect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setInstagramData(null);
        setStatus('idle');
      }
    } catch (error) {
      console.error('Error disconnecting Instagram:', error);
    }
  };

  const openInstagramDirectly = () => {
    window.open('https://instagram.com', '_blank');
  };

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'no_business_account':
        return 'No Instagram Business Account found. Please connect an Instagram Business Account to your Facebook Page first.';
      case 'connection_failed':
        return 'Failed to connect Instagram account. Please try again.';
      case 'access_denied':
        return 'Access denied. Please grant the required permissions.';
      case 'invalid_request':
        return 'Invalid app configuration. Please check your Facebook app settings.';
      default:
        return 'An error occurred during Instagram connection.';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Instagram className="w-5 h-5" />
          Instagram Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === 'success' && instagramData ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Connected</span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-3">
                {instagramData.profilePicture && (
                  <img 
                    src={instagramData.profilePicture} 
                    alt={instagramData.username}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium">@{instagramData.username}</p>
                  <p className="text-xs text-gray-500">{instagramData.accountType} Account</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>
                  <span className="font-medium">{instagramData.followersCount.toLocaleString()}</span>
                  <span className="ml-1">followers</span>
                </div>
                <div>
                  <span className="font-medium">{instagramData.mediaCount}</span>
                  <span className="ml-1">posts</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                Connected {new Date(instagramData.connectedAt).toLocaleDateString()}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={disconnectInstagram}
              className="w-full"
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {status === 'error' && (
              <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Connection Failed</p>
                  <p className="text-xs">{errorMessage}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Button 
                onClick={connectInstagram}
                disabled={isLoading || status === 'connecting'}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isLoading || status === 'connecting' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Instagram className="w-4 h-4 mr-2" />
                    Connect Instagram
                  </>
                )}
              </Button>
              
              <Button 
                onClick={openInstagramDirectly}
                variant="outline"
                className="w-full"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Open Instagram Directly
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>Connect your Instagram Business Account to manage posts and view insights</p>
              <p className="text-orange-600 font-medium">
                ⚠️ Requires: Instagram Business Account connected to Facebook Page
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
