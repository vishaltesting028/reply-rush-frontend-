import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface InstagramMedia {
  id: string;
  caption?: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  thumbnail_url?: string;
  timestamp: string;
  permalink: string;
}

interface InstagramMediaDisplayProps {
  accessToken?: string;
}

const InstagramMediaDisplay: React.FC<InstagramMediaDisplayProps> = ({ accessToken }) => {
  const [media, setMedia] = useState<InstagramMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (accessToken) {
      fetchInstagramMedia();
    }
  }, [accessToken]);

  const fetchInstagramMedia = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/instagram/user-media`, {
        params: { access_token: accessToken }
      });

      if (response.data.success) {
        setMedia(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch media');
      }
    } catch (err: any) {
      console.error('Error fetching Instagram media:', err);
      setError(err.response?.data?.message || 'Failed to fetch Instagram media');
    } finally {
      setLoading(false);
    }
  };

  const loginToInstagram = () => {
    window.location.href = `${API_BASE_URL}/auth/instagram`;
  };

  if (!accessToken) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Connect Your Instagram Account
          </h3>
          <p className="text-gray-600">
            Connect your Instagram account to view and manage your posts
          </p>
        </div>
        
        <button
          onClick={loginToInstagram}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Connect Instagram Account
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        <span className="ml-3 text-gray-600">Loading Instagram media...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
        <button
          onClick={fetchInstagramMedia}
          className="mt-3 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-4 rounded transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (media.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">No Media Found</h3>
        <p className="text-gray-600">No Instagram posts found in your account.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Instagram Media</h2>
        <button
          onClick={fetchInstagramMedia}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square relative">
              {item.media_type === 'IMAGE' ? (
                <img
                  src={item.media_url}
                  alt={item.caption || 'Instagram post'}
                  className="w-full h-full object-cover"
                />
              ) : item.media_type === 'VIDEO' ? (
                <video
                  src={item.media_url}
                  poster={item.thumbnail_url}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={item.thumbnail_url || item.media_url}
                  alt={item.caption || 'Instagram carousel'}
                  className="w-full h-full object-cover"
                />
              )}
              
              <div className="absolute top-2 right-2">
                <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {item.media_type}
                </span>
              </div>
            </div>

            <div className="p-4">
              {item.caption && (
                <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                  {item.caption}
                </p>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                <a
                  href={item.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  View on Instagram
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramMediaDisplay;
