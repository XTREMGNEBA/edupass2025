'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const supabase = createClientComponentClient();
const SupabaseContext = createContext(supabase);

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/auth/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <SupabaseContext.Provider value={supabase}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  return useContext(SupabaseContext);
}
