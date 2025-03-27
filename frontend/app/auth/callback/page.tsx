'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/services/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Handle the OAuth or email verification callback
    const handleAuthCallback = async () => {
      // Get the query parameters from the URL
      const params = new URLSearchParams(window.location.search);

      // Exchange the temporary code with a session
      await supabase.auth.getSession();

      // Redirect to dashboard regardless of success or failure
      // This is a simple approach; in a real app you might want to show error messages
      router.push('/dashboard');
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication, please wait...</p>
      </div>
    </div>
  );
}