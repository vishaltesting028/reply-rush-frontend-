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

export default function InstagramOAuthModalFixed({ isOpen, onClose, onSuccess }: InstagramOAuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Close modal immediately when OAuth starts
      onClose();
      
      // Use the fixed Instagram OAuth endpoint that uses Facebook Graph API
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const cleanBaseUrl = baseUrl.replace('/api', '');
      const oauthUrl = `${cleanBaseUrl}/auth/instagram-fixed`;
      
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
          'https://c43510a0f5c7.ngrok-free.app'
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
            Connect Instagram Business Account
          </DialogTitle>
          <DialogDescription>
            Connect your Instagram Business Account using Facebook's secure OAuth authentication.
            This method works with existing Facebook apps and supports business features.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Instagram Business Account</li>
              <li>• Connected to a Facebook Page</li>
              <li>• Facebook Business Manager access</li>
            </ul>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleConnect} 
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Instagram className="mr-2 h-4 w-4" />
                  Connect Business Account
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>

          <div className="text-xs text-gray-500">
            <p>
              <ExternalLink className="inline h-3 w-3 mr-1" />
              Need help setting up? 
              <a 
                href="https://business.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                Visit Facebook Business Manager
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
