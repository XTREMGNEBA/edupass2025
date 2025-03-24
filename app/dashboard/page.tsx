"use client";

import { useEffect, useState } from "react";
import { nhost } from "@/lib/nhost";
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

type UserRole =
  | "admin_dev"
  | "logistics_manager"
  | "school_admin"
  | "canteen_manager"
  | "transport_manager"
  | "student"
  | "parent"
  | "finance_manager";

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
    href: "/dashboard/admin-dev",
    roles: ["admin_dev"],
  },
  {
    title: "Gestion Logistique",
    description: "Supervision générale et logistique",
    icon: ShieldCheck,
    href: "/dashboard/logistics",
    roles: ["logistics_manager"],
  },
  {
    title: "Administration Scolaire",
    description: "Gestion des élèves et du personnel",
    icon: School,
    href: "/dashboard/school-admin",
    roles: ["school_admin"],
  },
  {
    title: "Gestion Cantine",
    description: "Menus et réservations repas",
    icon: UtensilsCrossed,
    href: "/dashboard/canteen",
    roles: ["canteen_manager"],
  },
  {
    title: "Gestion Transport",
    description: "Lignes et horaires de bus",
    icon: Bus,
    href: "/dashboard/transport",
    roles: ["transport_manager"],
  },
  {
    title: "Espace Élève",
    description: "Accès aux services scolaires",
    icon: Users,
    href: "/dashboard/student",
    roles: ["student"],
  },
  {
    title: "Espace Parents",
    description: "Suivi et gestion du compte",
    icon: Users,
    href: "/dashboard/parent",
    roles: ["parent"],
  },
  {
    title: "Gestion Financière",
    description: "Rechargements et transactions",
    icon: Wallet,
    href: "/dashboard/finance",
    roles: ["finance_manager"],
  },
];

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = await nhost.auth.getUser();
      if (user?.metadata?.role) {
        setUserRole(user.metadata.role as UserRole);
      }
    };
    fetchUserRole();
  }, []);

  const filteredLinks = dashboardLinks.filter(
    (link) => userRole && link.roles.includes(userRole)
  );

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