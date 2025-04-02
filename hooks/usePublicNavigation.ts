import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PUBLIC_MENU_ITEMS } from '@/config/public-menu';

export function usePublicNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return false;
    }
    return pathname === href;
  };

  return {
    menuItems: PUBLIC_MENU_ITEMS,
    isScrolled,
    isActive,
  };
}