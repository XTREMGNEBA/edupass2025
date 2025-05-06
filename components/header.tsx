"use client";

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { MoonIcon, SunIcon, MenuIcon, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Profile {
  name: string;
  email: string;
  avatar?: string;
}

interface AvatarMenuProps {
  profile: Profile;
}

function AvatarMenu({ profile }: AvatarMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/logout" className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Se déconnecter</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const features = [
  {
    title: "Scanner QR Code",
    href: "/scanner",
    description: "Scannez votre QR Code pour accéder aux services",
    image: "/images/QRCode/QRCode.png",
  },
  {
    title: "Cantine",
    href: "/cantine",
    description: "Gérez vos repas et consultez les menus",
    image: "/images/cantine/cantine01.png",
  },
  {
    title: "Transport",
    href: "/transport",
    description: "Suivez les bus scolaires en temps réel",
    image: "/images/transport/bus01.png",
  },
  {
    title: "Activités",
    href: "/activities",
    description: "Participez aux activités parascolaires",
    image: "/images/activity/activity.png",
  },
];

export function Header() {
  const { setTheme, theme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const { data: profile } = useProfile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoading) {
    return null;
  }

  const menuItems = [
    { href: "#features", label: "Fonctionnalités" },
    { href: "#pricing", label: "Tarifs" },
    { href: "#faq", label: "FAQ" },
    { href: "#testimonials", label: "Avis" },
    { href: "#contact", label: "Contact" },
  ];

  const renderMenuItems = () => (
    <>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Services</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-white shadow-md rounded-md p-2">
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {features.map((feature) => (
              <li key={feature.title}>
                <NavigationMenuLink asChild>
                  <Link
                    href={feature.href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="flex items-center space-x-2">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded"
                      />
                      <div>
                        <div className="text-sm font-medium leading-none">{feature.title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      {menuItems.map((item) => (
        <NavigationMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <NavigationMenuLink className="px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              {item.label}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo/Logo.png"
            alt="EduPass+ Logo"
            width={40}
            height={40}
            className="h-8 w-auto"
            priority
          />
          <span className="font-bold text-xl">EduPass+</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {renderMenuItems()}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-4">
              {features.map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={24}
                    height={24}
                    className="rounded"
                  />
                  <span>{feature.title}</span>
                </Link>
              ))}
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-2 hover:bg-accent rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hover:bg-accent"
            aria-label="Toggle theme"
          >
            <SunIcon className="h-5 w-5 transition-all dark:hidden" />
            <MoonIcon className="h-5 w-5 transition-all hidden dark:block" />
          </Button>

          {!isLoading && (
            isAuthenticated && profile ? (
              <AvatarMenu profile={profile} />
            ) : (
              <Button variant="default" asChild>
                <Link href="/auth/login">
                  Connexion
                </Link>
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
}