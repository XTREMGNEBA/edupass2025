"use client";

import { usePathname } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Settings, User, UtensilsCrossed, Wallet, Box, Bus, FileText, Users2, GraduationCap } from 'lucide-react';

export interface MenuItem {
  href: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const ROLE_MENUS = {
  ADMIN: [
    { href: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
    { href: "/users", title: "Users", icon: Users },
    { href: "/settings", title: "Settings", icon: Settings },
  ],
  USER: [
    { href: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
    { href: "/profile", title: "Profile", icon: User },
  ],
  RESPONSABLE_CANTINE: [
    { href: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
    { href: "/cantine", title: "Cantine", icon: UtensilsCrossed },
    { href: "/profile", title: "Profile", icon: User },
  ],
  RESPONSABLE_FINANCE: [
    { href: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
    { href: "/finance", title: "Finance", icon: Wallet },
    { href: "/profile", title: "Profile", icon: User },
  ],
  RESPONSABLE_LOGISTIQUE: [
    { href: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
    { href: "/logistique", title: "Logistique", icon: Box },
    { href: "/profile", title: "Profile", icon: User },
  ],
  RESPONSABLE_TRANSPORT: [
    { href: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
    { href: "/transport", title: "Transport", icon: Bus },
    { href: "/profile", title: "Profile", icon: User },
  ],
  RESPONSABLE_ADMINISTRATIF: [
    { href: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
    { href: "/administratif", title: "Administratif", icon: FileText },
    { href: "/profile", title: "Profile", icon: User },
  ],
  PARENT: [
    { href: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
    { href: "/enfants", title: "Mes Enfants", icon: Users2 },
    { href: "/profile", title: "Profile", icon: User },
  ],
  STUDENT: [
    { href: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
    { href: "/cours", title: "Mes Cours", icon: GraduationCap },
    { href: "/profile", title: "Profile", icon: User },
  ],
} as const;

type Role = keyof typeof ROLE_MENUS;
type RoleMenuItem = (typeof ROLE_MENUS)[Role][number];

export function Sidebar() {
  const { profile } = useUserProfile();
  const pathname = usePathname() ?? "";

  const sidebarItems: Array<RoleMenuItem> = profile?.role && (profile.role in ROLE_MENUS) 
    ? [...ROLE_MENUS[profile.role as Role]] 
    : [];

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.icon && <item.icon className="mr-2" size={20} />}
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
