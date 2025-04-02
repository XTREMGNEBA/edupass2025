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
  Users,
  Wallet,
  Calendar,
  Bell,
  FileText,
  UtensilsCrossed,
  Bus,
  MessageSquare,
} from "lucide-react";

const children = [
  {
    name: "Emma Martin",
    class: "3ème A",
    canteenBalance: "42,50 €",
    transportLine: "Ligne 2",
  },
  {
    name: "Lucas Martin",
    class: "6ème B",
    canteenBalance: "35,20 €",
    transportLine: "Ligne 2",
  },
];

const notifications = [
  {
    id: 1,
    type: "info",
    message: "Réunion parents-profs le 15/04",
    time: "Il y a 1h",
  },
  {
    id: 2,
    type: "warning",
    message: "Solde cantine faible - Emma",
    time: "Il y a 3h",
  },
  {
    id: 3,
    type: "success",
    message: "Paiement transport effectué",
    time: "Il y a 5h",
  },
];

export default function ParentDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Espace Parents</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle className="text-sm font-medium">Mes Enfants</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Inscrits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Wallet className="h-6 w-6 text-primary" />
              <CardTitle className="text-sm font-medium">Solde Total</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">77,70 €</div>
            <p className="text-sm text-muted-foreground">Tous services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Calendar className="h-6 w-6 text-primary" />
              <CardTitle className="text-sm font-medium">Événements</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <MessageSquare className="h-6 w-6 text-primary" />
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Non lus</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>Suivi des Enfants</CardTitle>
              </div>
              <Button variant="outline" size="sm">
                Gérer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Solde Cantine</TableHead>
                  <TableHead>Transport</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {children.map((child, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{child.name}</TableCell>
                    <TableCell>{child.class}</TableCell>
                    <TableCell>{child.canteenBalance}</TableCell>
                    <TableCell>{child.transportLine}</TableCell>
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
                <Bell className="h-6 w-6 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${
                        notif.type === "info" ? "bg-blue-500" :
                        notif.type === "success" ? "bg-green-500" :
                        "bg-yellow-500"
                      }`} />
                      <span>{notif.message}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{notif.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle>Services</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full flex justify-start">
                  <UtensilsCrossed className="mr-2 h-4 w-4" />
                  Réserver repas
                </Button>
                <Button variant="outline" className="w-full flex justify-start">
                  <Bus className="mr-2 h-4 w-4" />
                  Transport scolaire
                </Button>
                <Button variant="outline" className="w-full flex justify-start">
                  <Wallet className="mr-2 h-4 w-4" />
                  Recharger compte
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}