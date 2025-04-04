"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePublicNavigation } from "@/hooks/usePublicNavigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

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
    image: "/images/activity/sport04.png",
  },
];

export function PublicHeader() {
  const { menuItems, isScrolled } = usePublicNavigation();
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b
        ${isScrolled 
          ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm" 
          : "bg-white/80 dark:bg-gray-900/80"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="rounded-lg flex items-center space-x-2">
            <Image
              src="/images/logo/Logo.png"
              alt="EduPass+ Logo"
              width={32}
              height={32}
              className="rounded-lg h-8 w-auto"
              priority
            />
            <span className="hidden font-bold sm:inline-block">EduPass+</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-4">
              <NavigationMenuItem className="mx-2">
                <NavigationMenuTrigger className="data-[state=open]:bg-accent/50">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover shadow-lg rounded-lg p-2 border">
                  <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {features.map((feature) => (
                      <li key={feature.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={feature.href}
                            className="block space-y-1 rounded-md p-3 hover:bg-accent"
                          >
                            <div className="flex items-center space-x-3">
                              <Image
                                src={feature.image}
                                alt={feature.title}
                                width={36}
                                height={36}
                                className="h-12 w-12 rounded-lg"
                              />
                              <div>
                                <div className="text-sm font-medium">{feature.title}</div>
                                <p className="text-sm text-muted-foreground mt-1">
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
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <div className="hidden md:flex md:items-center md:space-x-2">
              {!isAuthenticated && (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/auth/login">Se connecter</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/register">S'inscrire</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <hr className="my-4" />
                  {!isAuthenticated && (
                    <>
                      <Button variant="ghost" asChild className="w-full">
                        <Link href="/auth/login">Se connecter</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/auth/register">S'inscrire</Link>
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}