"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  Truck,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart,
} from "lucide-react";

export default function LogisticsDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Gestion Logistique</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Package className="h-6 w-6 text-primary" />
              <CardTitle>État des Équipements</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Badges actifs</span>
                <span className="text-green-500">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Terminaux de paiement</span>
                <span className="text-green-500">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Scanners QR</span>
                <span className="text-green-500">18</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Truck className="h-6 w-6 text-primary" />
              <CardTitle>Transport</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Bus en service</span>
                <span>12/15</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Lignes actives</span>
                <span>8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Clock className="h-6 w-6 text-primary" />
              <CardTitle>Planification</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">Prochaine maintenance: 25/03/2024</p>
              <p className="text-sm">Mise à jour logicielle: 28/03/2024</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <AlertTriangle className="h-6 w-6 text-primary" />
              <CardTitle>Incidents</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-yellow-500">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span>2 incidents mineurs en cours</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Temps moyen de résolution: 45min
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-6 w-6 text-primary" />
              <CardTitle>Maintenance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                <span>Dernière maintenance: 15/03/2024</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2" />
                <span>Prochain contrôle: 5 jours</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <BarChart className="h-6 w-6 text-primary" />
              <CardTitle>Statistiques</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Taux de disponibilité</span>
                <span className="text-green-500">99.8%</span>
              </div>
              <div className="flex justify-between">
                <span>Satisfaction utilisateurs</span>
                <span className="text-green-500">4.7/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}