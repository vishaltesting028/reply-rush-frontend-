import { useState, useEffect } from 'react';
import axios from 'axios';

interface InstagramProfile {
  id: string;
  username: string;
  account_type: string;
  media_count: number;
}

interface UseInstagramAuthReturn {
  accessToken: string | null;
  profile: InstagramProfile | null;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

export const useInstagramAuth = (): UseInstagramAuthReturn => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Check localStorage for stored access token
    const storedToken = localStorage.getItem('instagram_access_token');
    if (storedToken) {
      setAccessToken(storedToken);
      fetchProfile(storedToken);
    }

    // Check URL parameters for access token (OAuth callback)
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('access_token');
    
    if (urlToken) {
      setAccessToken(urlToken);
      localStorage.setItem('instagram_access_token', urlToken);
      fetchProfile(urlToken);
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const fetchProfile = async (token?: string) => {
    const tokenToUse = token || accessToken;
    if (!tokenToUse) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/auth/instagram/profile`, {
        params: { access_token: tokenToUse }
      });

      if (response.data.success) {
        setProfile(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch profile');
      }
    } catch (err: any) {
      console.error('Error fetching Instagram profile:', err);
      setError(err.response?.data?.message || 'Failed to fetch profile');
      
      // If token is invalid, clear it
      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    window.location.href = `${API_BASE_URL}/auth/instagram`;
  };

  const logout = () => {
    setAccessToken(null);
    setProfile(null);
    setError(null);
    localStorage.removeItem('instagram_access_token');
  };

  return {
    accessToken,
    profile,
    isLoading,
    error,
    login,
    logout,
    fetchProfile: () => fetchProfile()
  };
};
