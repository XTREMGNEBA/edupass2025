"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  QrCode,
  Wallet,
  UtensilsCrossed,
  Bus,
  Map,
  Trophy,
  BookCopy,
  Search,
  Award,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Scanner un QR Code", href: "/scanner", icon: QrCode },
  { name: "Portefeuille digital", href: "/wallet", icon: Wallet },
  { name: "Cantine", href: "/cantine", icon: UtensilsCrossed },
  { name: "Transport scolaire", href: "/transport", icon: Bus },
  { name: "Sorties & Voyages", href: "/sorties", icon: Map },
  { name: "Activités & Sport", href: "/activites", icon: Trophy },
  { name: "Réservation & prêt", href: "/reservations", icon: BookCopy },
  { name: "Objets trouvés", href: "/objets-trouves", icon: Search },
  { name: "Gamification", href: "/gamification", icon: Award },
  { name: "Assistant EduPass+", href: "/chatbot", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}