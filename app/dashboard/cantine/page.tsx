"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  UtensilsCrossed,
  Clock,
  Users,
  ShoppingCart,
  Leaf,
  AlertTriangle,
  ChefHat,
  CalendarDays,
} from "lucide-react";

const weeklyMenu = [
  {
    day: "Lundi",
    starter: "Salade César",
    main: "Poulet rôti aux herbes",
    side: "Pommes de terre",
    dessert: "Yaourt aux fruits",
  },
  {
    day: "Mardi",
    starter: "Carottes râpées",
    main: "Poisson pané",
    side: "Riz aux légumes",
    dessert: "Fruit de saison",
  },
  {
    day: "Mercredi",
    starter: "Tomates mozzarella",
    main: "Lasagnes végétariennes",
    side: "Salade verte",
    dessert: "Crème dessert",
  },
];

const stats = [
  {
    title: "Repas servis aujourd'hui",
    value: "342",
    icon: UtensilsCrossed,
  },
  {
    title: "Temps d'attente moyen",
    value: "8 min",
    icon: Clock,
  },
  {
    title: "Réservations",
    value: "89%",
    icon: Users,
  },
  {
    title: "Stock disponible",
    value: "95%",
    icon: ShoppingCart,
  },
];

export default function CanteenDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Gestion de la Cantine</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <stat.icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <CalendarDays className="h-6 w-6 text-primary" />
                <CardTitle>Menu de la Semaine</CardTitle>
              </div>
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jour</TableHead>
                  <TableHead>Entrée</TableHead>
                  <TableHead>Plat</TableHead>
                  <TableHead>Accompagnement</TableHead>
                  <TableHead>Dessert</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weeklyMenu.map((menu) => (
                  <TableRow key={menu.day}>
                    <TableCell className="font-medium">{menu.day}</TableCell>
                    <TableCell>{menu.starter}</TableCell>
                    <TableCell>{menu.main}</TableCell>
                    <TableCell>{menu.side}</TableCell>
                    <TableCell>{menu.dessert}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Leaf className="h-6 w-6 text-primary" />
                <CardTitle>Options Alimentaires</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Menu végétarien</span>
                  <span className="text-green-500">45 réservations</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sans gluten</span>
                  <span className="text-green-500">12 réservations</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sans lactose</span>
                  <span className="text-green-500">8 réservations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <CardTitle>Alertes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-yellow-500">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>Stock bas : Yaourts nature</span>
                </div>
                <div className="flex items-center text-green-500">
                  <ChefHat className="h-4 w-4 mr-2" />
                  <span>Équipement : Tout opérationnel</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}