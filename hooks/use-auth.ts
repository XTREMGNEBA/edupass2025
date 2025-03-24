import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { nhost, getCurrentUser } from '@/lib/nhost';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { user, error } = await getCurrentUser();
      setIsAuthenticated(!!user);
      setUser(user);
      setIsLoading(false);
    };

    checkAuth();

    // Subscribe to auth state changes
    const unsubscribe = nhost.auth.onAuthStateChanged((event, session) => {
      setIsAuthenticated(!!session);
      setUser(session?.user || null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const requireAuth = (callback: () => void) => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    if (!isLoading && isAuthenticated && callback) {
      callback();
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    requireAuth,
  };
}