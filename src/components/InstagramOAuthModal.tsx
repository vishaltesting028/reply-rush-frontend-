'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Instagram, Loader2, ExternalLink } from "lucide-react";

interface InstagramOAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export default function InstagramOAuthModal({ isOpen, onClose, onSuccess }: InstagramOAuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Close modal immediately when OAuth starts
      onClose();
      
      // Open Instagram OAuth directly using our backend endpoint
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const cleanBaseUrl = baseUrl.replace('/api', '');
      const oauthUrl = `${cleanBaseUrl}/auth/instagram`;
      
      const popup = window.open(
        oauthUrl,
        'instagram-oauth',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      // Listen for the authorization code
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          setIsLoading(false);
        }
      }, 1000);

      // Listen for message from popup (when redirect happens)
      const messageListener = (event: MessageEvent) => {
        // Accept messages from the backend domain
        const allowedOrigins = [
          window.location.origin,
          process.env.NEXT_PUBLIC_API_URL?.replace('/api', ''),
          'http://localhost:5000',
          'https://50db5a34664f.ngrok-free.app',
          'https://1e9279d40552.ngrok-free.app',
          '  https://5ece8457d962.ngrok-free.app'
        ].filter(Boolean);

        if (!allowedOrigins.some(origin => event.origin === origin || event.origin.includes('ngrok') || event.origin.includes('localhost'))) {
          return;
        }

        if (event.data.type === 'INSTAGRAM_AUTH_SUCCESS') {
          clearInterval(checkClosed);
          popup?.close();
          window.removeEventListener('message', messageListener);
          
          // Backend already handled the token exchange, just use the data
          onSuccess(event.data.data);
          setIsLoading(false);
        } else if (event.data.type === 'INSTAGRAM_AUTH_ERROR') {
          clearInterval(checkClosed);
          popup?.close();
          window.removeEventListener('message', messageListener);
          setError(event.data.error || 'Authorization failed');
          setIsLoading(false);
        }
      };

      window.addEventListener('message', messageListener);

    } catch (err: any) {
      setError(err.message || 'An error occurred while connecting to Instagram');
      setIsLoading(false);
    }
  };

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instagram/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to connect Instagram account');
      }

      onSuccess(data.data);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to complete Instagram connection');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setError('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Instagram className="h-5 w-5 text-pink-500" />
            Connect Instagram Account
          </DialogTitle>
          <DialogDescription>
            Connect your Instagram account using Instagram&apos;s secure OAuth authentication.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-800">
              <strong>Secure Connection:</strong> You&apos;ll be redirected to Instagram&apos;s official login page. 
              We never see your Instagram password.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConnect}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Connect with Instagram
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
