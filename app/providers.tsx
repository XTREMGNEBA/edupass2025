import { ThemeProvider } from '@/components/theme-provider';
import { UserProvider } from '@/contexts/user-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <UserProvider>
        {children}
      </UserProvider>
    </ThemeProvider>
  );
}