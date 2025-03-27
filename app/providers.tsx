'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { supabase } from '@/lib/supabase';
import { createContext, useContext } from 'react';

const SupabaseContext = createContext(supabase);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseContext.Provider value={supabase}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </SupabaseContext.Provider>
  );
}

// Hook pour utiliser Supabase dans les composants
export function useSupabase() {
  return useContext(SupabaseContext);
}

