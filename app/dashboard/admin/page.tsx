"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  AlertCircle,
  Database,
  Settings,
  Users,
  Server,
} from "lucide-react";

export default function AdminDevDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Administration Technique</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Activity className="h-6 w-6 text-primary" />
              <CardTitle>Monitoring Système</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>CPU</span>
                <span className="text-green-500">24%</span>
              </div>
              <div className="flex justify-between">
                <span>Mémoire</span>
                <span className="text-yellow-500">67%</span>
              </div>
              <div className="flex justify-between">
                <span>Stockage</span>
                <span className="text-green-500">42%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <AlertCircle className="h-6 w-6 text-primary" />
              <CardTitle>Alertes Système</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-green-500">Tous les systèmes opérationnels</p>
              <p className="text-xs text-muted-foreground">Dernière vérification: il y a 5 min</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Database className="h-6 w-6 text-primary" />
              <CardTitle>Base de Données</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Connexions actives</span>
                <span>42</span>
              </div>
              <div className="flex justify-between">
                <span>Taille</span>
                <span>2.4 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle>Utilisateurs Actifs</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-sm text-muted-foreground">
              +12% par rapport à la semaine dernière
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Server className="h-6 w-6 text-primary" />
              <CardTitle>Services</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                <span>API Gateway</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                <span>Authentication</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                <span>Payment Service</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Settings className="h-6 w-6 text-primary" />
              <CardTitle>Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">Environnement: Production</p>
              <p className="text-sm">Version: 1.2.4</p>
              <p className="text-sm">Dernière mise à jour: 2024-03-20</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}