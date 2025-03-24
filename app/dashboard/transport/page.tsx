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
  Bus,
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  Route,
  CalendarClock,
  Map,
} from "lucide-react";

const busRoutes = [
  {
    id: "L1",
    name: "Ligne 1",
    driver: "Jean Martin",
    status: "En service",
    nextStop: "Collège Victor Hugo",
    time: "15:45",
    occupancy: "24/50",
  },
  {
    id: "L2",
    name: "Ligne 2",
    driver: "Marie Dubois",
    status: "En service",
    nextStop: "Lycée Pasteur",
    time: "15:50",
    occupancy: "32/50",
  },
  {
    id: "L3",
    name: "Ligne 3",
    driver: "Pierre Durand",
    status: "Pause",
    nextStop: "École Primaire Jules Ferry",
    time: "16:15",
    occupancy: "0/50",
  },
];

const stats = [
  {
    title: "Bus en service",
    value: "8/10",
    icon: Bus,
  },
  {
    title: "Arrêts desservis",
    value: "42",
    icon: MapPin,
  },
  {
    title: "Temps moyen",
    value: "18 min",
    icon: Clock,
  },
  {
    title: "Élèves transportés",
    value: "486",
    icon: Users,
  },
];

export default function TransportDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Gestion du Transport Scolaire</h1>

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
                <Route className="h-6 w-6 text-primary" />
                <CardTitle>Lignes en Service</CardTitle>
              </div>
              <Button variant="outline" size="sm">
                Voir la carte
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ligne</TableHead>
                  <TableHead>Chauffeur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Prochain arrêt</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Occupation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {busRoutes.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium">{route.name}</TableCell>
                    <TableCell>{route.driver}</TableCell>
                    <TableCell>
                      <span className={route.status === "En service" ? "text-green-500" : "text-yellow-500"}>
                        {route.status}
                      </span>
                    </TableCell>
                    <TableCell>{route.nextStop}</TableCell>
                    <TableCell>{route.time}</TableCell>
                    <TableCell>{route.occupancy}</TableCell>
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
                <CalendarClock className="h-6 w-6 text-primary" />
                <CardTitle>Horaires Spéciaux</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Sortie anticipée - Mercredi</span>
                  <span className="text-primary">15:30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Activités extra-scolaires</span>
                  <span className="text-primary">17:45</span>
                </div>
                <Button className="w-full mt-4">Modifier les horaires</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <CardTitle>Alertes et Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-yellow-500">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>Retard Ligne 2 : +5 min</span>
                </div>
                <div className="flex items-center text-green-500">
                  <Map className="h-4 w-4 mr-2" />
                  <span>Toutes les lignes en service</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}