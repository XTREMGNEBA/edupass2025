"use client";

import { ThemeProvider } from '@/components/theme-provider';
import { UserProvider } from '@/contexts/user-context';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <UserProvider>
        {children}
        <Toaster />
      </UserProvider>
    </ThemeProvider>
  );
}