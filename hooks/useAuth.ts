'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL; // loaded from .env.local

interface User {
  id: string;
  name: string;
  email: string;
  facebook?: {
    name: string;
    picture: string;
    connectedAt: string;
  };
  instagram?: {
    username: string;
    accountType: string;
    followersCount: number;
    mediaCount: number;
    profilePicture: string;
    connectedAt: string;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API}/api/auth/me`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.isAuthenticated) {
          setAuthState({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await fetch(`${API}/api/auth/me`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setAuthState(prev => ({
            ...prev,
            user: {
              ...data.user,
              name: data.user.name || data.user.facebook?.name || 'User',
            },
          }));
        }
      }
    } catch (error) {
      console.error('Error getting user details:', error);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    checkAuthStatus().then(() => {
      if (authState.isAuthenticated) {
        getUserDetails();
      }
    });
  }, []);

  return {
    ...authState,
    checkAuthStatus,
    getUserDetails,
    logout,
  };
};
