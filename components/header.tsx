// components\header.tsx
'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useAuth } from '@/hooks/use-auth';

const features = [
  {
    title: "Scanner QR Code",
    href: "/scanner",
    description: "Scannez votre QR Code pour accéder aux services",
    image: "/images/QRCode/QRCode.png"
  },
  {
    title: "Cantine",
    href: "/cantine",
    description: "Gérez vos repas et consultez les menus",
    image: "/images/cantine/cantine01.png"
  },
  {
    title: "Transport",
    href: "/transport",
    description: "Suivez les bus scolaires en temps réel",
    image: "/images/transport/bus01.png"
  },
  {
    title: "Activités",
    href: "/activities",
    description: "Participez aux activités parascolaires",
    image: "/images/activity/activity.png"
  },
];

export function Header() {
  const { setTheme, theme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo/Logo.png"
            alt="SchoolConnect Logo"
            width={40}
            height={40}
            className="h-8 w-auto"
          />
          <span className="font-bold text-xl">SchoolConnect</span>
        </Link>

        {!isLoading && (
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {features.map((feature) => (
                      <li key={feature.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={feature.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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

              {/* Liens vers les sections de la page d'accueil */}
              <NavigationMenuItem>
                <Link href="#features" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Fonctionnalités
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="#contact" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Autres liens */}
              <NavigationMenuItem>
                <Link href="/chatbot" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Assistant IA
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hover:bg-accent"
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Changer le thème</span>
          </Button>

          {!isLoading && (
            <Button variant="default" asChild>
              <Link href={isAuthenticated ? "/dashboard" : "/auth/login"}>
                {isAuthenticated ? "Tableau de bord" : "Connexion"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
