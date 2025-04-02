"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Users,
  Bus,
  UtensilsCrossed,
  Wallet,
  School,
  Code,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/types/user";

interface DashboardLink {
  title: string;
  description: string;
  icon: any;
  href: string;
  roles: UserRole[];
}

const dashboardLinks: DashboardLink[] = [
  {
    title: "Gestion Technique",
    description: "Administration système et développement",
    icon: Code,
    href: "/dashboard/admin",
    roles: ["ADMIN"],
  },
  {
    title: "Gestion Logistique",
    description: "Supervision générale et logistique",
    icon: ShieldCheck,
    href: "/dashboard/logistique",
    roles: ["RESPONSABLE_LOGISTIQUE"],
  },
  {
    title: "Administration Scolaire",
    description: "Gestion des élèves et du personnel",
    icon: School,
    href: "/dashboard/administratif",
    roles: ["RESPONSABLE_ADMINISTRATIF"],
  },
  {
    title: "Gestion Cantine",
    description: "Menus et réservations repas",
    icon: UtensilsCrossed,
    href: "/dashboard/cantine",
    roles: ["RESPONSABLE_CANTINE"],
  },
  {
    title: "Gestion Transport",
    description: "Lignes et horaires de bus",
    icon: Bus,
    href: "/dashboard/transport",
    roles: ["RESPONSABLE_TRANSPORT"],
  },
  {
    title: "Espace Élève",
    description: "Accès aux services scolaires",
    icon: Users,
    href: "/dashboard/student",
    roles: ["STUDENT"],
  },
  {
    title: "Espace Parents",
    description: "Suivi et gestion du compte",
    icon: Users,
    href: "/dashboard/parent",
    roles: ["PARENT"],
  },
  {
    title: "Gestion Financière",
    description: "Rechargements et transactions",
    icon: Wallet,
    href: "/dashboard/finance",
    roles: ["RESPONSABLE_FINANCE"],
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [filteredLinks, setFilteredLinks] = useState<DashboardLink[]>([]);

  useEffect(() => {
    if (user?.profile?.role) {
      const links = dashboardLinks.filter((link) => 
        link.roles.includes(user.profile.role as UserRole)
      );
      setFilteredLinks(links);
    }
  }, [user]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Tableau de Bord</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLinks.map((link) => (
          <Card key={link.href} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <link.icon className="h-6 w-6 text-primary" />
                <CardTitle>{link.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {link.description}
              </p>
              <Button
                className="w-full"
                onClick={() => router.push(link.href)}
              >
                Accéder
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}