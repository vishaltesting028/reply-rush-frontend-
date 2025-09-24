import React, { useState, useEffect, useCallback } from 'react';
import InstagramMediaDisplay from '../components/InstagramMediaDisplay';

const InstagramTestPage: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchUserProfile = useCallback(async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/instagram/profile?access_token=${token}`);
      const data = await response.json();
      
      if (data.success) {
        setUserProfile(data.data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    // Check URL parameters for access token (if redirected from OAuth)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    
    if (token) {
      setAccessToken(token);
      fetchUserProfile(token);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [fetchUserProfile]);

  const handleLogin = () => {
    // Redirect to Instagram OAuth
    window.location.href = `${API_BASE_URL}/auth/instagram`;
  };

  const handleLogout = () => {
    setAccessToken(null);
    setUserProfile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Instagram Integration Test</h1>
              <p className="text-gray-600 mt-2">Test your Instagram OAuth and media fetching</p>
            </div>
            
            {accessToken && (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {userProfile && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Connected Account</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-700">Username:</span>
                  <p className="text-green-600">@{userProfile.username}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Account Type:</span>
                  <p className="text-green-600">{userProfile.account_type}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Media Count:</span>
                  <p className="text-green-600">{userProfile.media_count}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">User ID:</span>
                  <p className="text-green-600">{userProfile.id}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <InstagramMediaDisplay accessToken={accessToken || undefined} />
        </div>

        {/* Debug Information */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Debug Information</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">API Base URL:</span>
              <span className="ml-2 text-gray-600">{API_BASE_URL}</span>
            </div>
            <div>
              <span className="font-medium">Access Token:</span>
              <span className="ml-2 text-gray-600">
                {accessToken ? `${accessToken.substring(0, 20)}...` : 'Not set'}
              </span>
            </div>
            <div>
              <span className="font-medium">OAuth URL:</span>
              <span className="ml-2 text-gray-600">{API_BASE_URL}/auth/instagram</span>
            </div>
            <div>
              <span className="font-medium">Callback URL:</span>
              <span className="ml-2 text-gray-600">{API_BASE_URL}/auth/instagram/callback</span>
            </div>
          </div>
        </div>

        {/* API Endpoints Documentation */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Available API Endpoints</h3>
          <div className="space-y-3 text-sm">
            <div className="flex">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-3">GET</span>
              <div>
                <span className="font-medium">/auth/instagram</span>
                <p className="text-gray-600">Initiate Instagram OAuth flow</p>
              </div>
            </div>
            <div className="flex">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-3">GET</span>
              <div>
                <span className="font-medium">/auth/instagram/callback</span>
                <p className="text-gray-600">Handle Instagram OAuth callback</p>
              </div>
            </div>
            <div className="flex">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-3">GET</span>
              <div>
                <span className="font-medium">/auth/instagram/user-media?access_token=TOKEN</span>
                <p className="text-gray-600">Fetch user&apos;s Instagram media</p>
              </div>
            </div>
            <div className="flex">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-3">GET</span>
              <div>
                <span className="font-medium">/auth/instagram/profile?access_token=TOKEN</span>
                <p className="text-gray-600">Fetch user&apos;s Instagram profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramTestPage;
