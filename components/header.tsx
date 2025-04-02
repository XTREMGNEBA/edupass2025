"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MoonIcon, SunIcon, Menu } from "lucide-react";
import { AvatarMenu } from "@/components/ui/AvatarMenu";
import { useUserProfile } from "@/hooks/useUserProfile";
import { PublicHeader } from "./PublicHeader";
import { PrivateHeader } from "./PrivateHeader";

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
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <PrivateHeader /> : <PublicHeader />;
}
