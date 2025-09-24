'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function InstagramCallback() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (window.opener) {
      if (error) {
        window.opener.postMessage({
          type: 'INSTAGRAM_AUTH_ERROR',
          error: errorDescription || error
        }, window.location.origin);
      } else if (code) {
        window.opener.postMessage({
          type: 'INSTAGRAM_AUTH_SUCCESS',
          code: code
        }, window.location.origin);
      }
      window.close();
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing Instagram authorization...</p>
      </div>
    </div>
  );
}
