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
  BookOpen,
  Calendar,
  Clock,
  UtensilsCrossed,
  Bus,
  Wallet,
  Bell,
  Trophy,
} from "lucide-react";

const schedule = [
  {
    time: "08:00 - 09:00",
    subject: "Mathématiques",
    room: "Salle 102",
    teacher: "Mme Bernard",
  },
  {
    time: "09:00 - 10:00",
    subject: "Français",
    room: "Salle 205",
    teacher: "M. Dubois",
  },
  {
    time: "10:15 - 11:15",
    subject: "Histoire-Géo",
    room: "Salle 304",
    teacher: "Mme Martin",
  },
];

const notifications = [
  {
    id: 1,
    type: "info",
    message: "Devoir de maths pour demain",
    time: "Il y a 2h",
  },
  {
    id: 2,
    type: "success",
    message: "Note de français : 16/20",
    time: "Il y a 3h",
  },
  {
    id: 3,
    type: "warning",
    message: "Solde cantine faible",
    time: "Il y a 5h",
  },
];

export default function StudentDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Espace Élève</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle className="text-sm font-medium">Cours aujourd'hui</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-sm text-muted-foreground">Prochains cours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <CardTitle className="text-sm font-medium">Solde Cantine</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42,50 €</div>
            <p className="text-sm text-muted-foreground">Repas réservés : 5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Bus className="h-6 w-6 text-primary" />
              <CardTitle className="text-sm font-medium">Transport</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Ligne 2</div>
            <p className="text-sm text-muted-foreground">Prochain départ : 16:30</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Trophy className="h-6 w-6 text-primary" />
              <CardTitle className="text-sm font-medium">Points Bonus</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">750</div>
            <p className="text-sm text-muted-foreground">Niveau : Or</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Calendar className="h-6 w-6 text-primary" />
                <CardTitle>Emploi du Temps</CardTitle>
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
                  <TableHead>Horaire</TableHead>
                  <TableHead>Matière</TableHead>
                  <TableHead>Salle</TableHead>
                  <TableHead>Professeur</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((class_, index) => (
                  <TableRow key={index}>
                    <TableCell>{class_.time}</TableCell>
                    <TableCell className="font-medium">{class_.subject}</TableCell>
                    <TableCell>{class_.room}</TableCell>
                    <TableCell>{class_.teacher}</TableCell>
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
                <Wallet className="h-6 w-6 text-primary" />
                <CardTitle>Transactions Récentes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Cantine - Repas</span>
                  <span className="text-red-500">-3,80 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Recharge</span>
                  <span className="text-green-500">+50,00 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Transport - Mars</span>
                  <span className="text-red-500">-30,00 €</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}