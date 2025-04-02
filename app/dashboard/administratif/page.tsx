"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  UserPlus,
  Calendar,
  FileText,
  Bell,
  School,
  ClipboardList,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const recentActivities = [
  {
    id: 1,
    type: "Inscription",
    student: "Sophie Martin",
    class: "Terminale S2",
    date: "2024-03-20",
  },
  {
    id: 2,
    type: "Changement de classe",
    student: "Lucas Bernard",
    class: "1ère ES1",
    date: "2024-03-19",
  },
  {
    id: 3,
    type: "Mise à jour dossier",
    student: "Emma Dubois",
    class: "2nde A",
    date: "2024-03-18",
  },
];

export default function SchoolAdminDashboard() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Administration</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Nouvel élève
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle>Élèves</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-sm text-muted-foreground">Total des élèves inscrits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <GraduationCap className="h-6 w-6 text-primary" />
              <CardTitle>Classes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-sm text-muted-foreground">Nombre de classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <School className="h-6 w-6 text-primary" />
              <CardTitle>Personnel</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-sm text-muted-foreground">Enseignants et personnel</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Demandes en attente</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <ClipboardList className="h-6 w-6 text-primary" />
                <CardTitle>Activités Récentes</CardTitle>
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
                  <TableHead>Type</TableHead>
                  <TableHead>Élève</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.type}</TableCell>
                    <TableCell>{activity.student}</TableCell>
                    <TableCell>{activity.class}</TableCell>
                    <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
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
                <Calendar className="h-6 w-6 text-primary" />
                <CardTitle>Calendrier Scolaire</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Vacances de Pâques</span>
                  <span className="text-muted-foreground">13/04 - 29/04</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Conseils de classe</span>
                  <span className="text-muted-foreground">01/04 - 05/04</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Examens blancs</span>
                  <span className="text-muted-foreground">15/04 - 19/04</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle>Documents Importants</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Règlement intérieur
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Planning des examens
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Guide administratif
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
