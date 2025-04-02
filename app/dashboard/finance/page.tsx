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
  Wallet,
  TrendingUp,
  CreditCard,
  Users,
  AlertTriangle,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
} from "lucide-react";

const transactions = [
  {
    id: 1,
    user: "Martin Sophie",
    type: "Recharge",
    amount: 50.00,
    date: "2024-03-20",
    status: "completed"
  },
  {
    id: 2,
    user: "Dubois Lucas",
    type: "Cantine",
    amount: -38.50,
    date: "2024-03-20",
    status: "completed"
  },
  {
    id: 3,
    user: "Bernard Emma",
    type: "Transport",
    amount: -30.00,
    date: "2024-03-19",
    status: "pending"
  }
];

const stats = [
  {
    title: "Transactions du jour",
    value: "157",
    trend: "+12%",
    icon: TrendingUp,
  },
  {
    title: "Montant total",
    value: "4 280 €",
    trend: "+8%",
    icon: Wallet,
  },
  {
    title: "Comptes actifs",
    value: "1,247",
    trend: "+3%",
    icon: Users,
  },
  {
    title: "Solde moyen",
    value: "42 €",
    trend: "+5%",
    icon: CreditCard,
  },
];

export default function FinanceDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Gestion Financière</h1>

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
              <p className="text-sm text-green-500">{stat.trend} vs. hier</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Receipt className="h-6 w-6 text-primary" />
                <CardTitle>Dernières Transactions</CardTitle>
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
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.user}</TableCell>
                    <TableCell className="flex items-center">
                      {transaction.amount > 0 ? (
                        <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="mr-2 h-4 w-4 text-red-500" />
                      )}
                      {transaction.type}
                    </TableCell>
                    <TableCell className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}>
                      {transaction.amount > 0 ? "+" : ""}{transaction.amount.toFixed(2)} €
                    </TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {transaction.status}
                      </span>
                    </TableCell>
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
                <PieChart className="h-6 w-6 text-primary" />
                <CardTitle>Répartition des Dépenses</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                    <span>Cantine</span>
                  </div>
                  <span>45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                    <span>Transport</span>
                  </div>
                  <span>35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                    <span>Activités</span>
                  </div>
                  <span>20%</span>
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
                  <span>3 comptes avec solde faible</span>
                </div>
                <div className="flex items-center text-red-500">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>1 paiement en attente   7 jours</span>
                </div>
                <Button className="w-full mt-2">Gérer les alertes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
