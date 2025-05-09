'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AvatarMenu } from '@/components/ui/AvatarMenu';
import { useUserProfile } from '@/hooks/useUserProfile';
import { ROLE_MENUS } from '@/config/role-menus';
import { useAuth } from '@/hooks/use-auth';

export function PrivateHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { profile, isLoading } = useUserProfile();
  const { signOut, isAuthenticated } = useAuth();
  const menuItems = profile?.role ? ROLE_MENUS[profile.role] : [];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const [isScrolled, setIsScrolled] = useState(false);

  if (isLoading) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b
        ${isScrolled 
          ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm" 
          : "bg-white/80 dark:bg-gray-900/80"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Image
              src="/images/logo/Logo.png"
              alt="EduPass+ Logo"
              width={30}
              height={30}
              className="rounded-lg h-8 w-auto"
              priority
            />
            <span className="hidden font-bold sm:inline-block">EduPass+</span>
          </Link>

          {isAuthenticated && (
            <nav className="hidden md:flex space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme === 'light' ? 'light' : 'dark'}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                  <hr className="my-4" />
                  <Button
                    variant="destructive"
                    onClick={signOut}
                    className="w-full"
                  >
                    Se déconnecter
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

            {profile && <AvatarMenu profile={profile} />}
          </div>
        </div>
      </div>
    </header>
  );
}