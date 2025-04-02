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
import { Euro, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "Cantine",
    amount: -7.50,
    date: "2024-03-20",
    status: "completed"
  },
  {
    id: 2,
    type: "Recharge",
    amount: 50.00,
    date: "2024-03-19",
    status: "completed"
  },
  {
    id: 3,
    type: "Transport",
    amount: -30.00,
    date: "2024-03-18",
    status: "completed"
  }
];

export default function WalletPage() {
  const balance = 157.50;

  return (
    <div className="container mx-auto space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Solde actuel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Euro className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{balance.toFixed(2)} €</span>
            </div>
            <Button className="mt-4 w-full">Recharger</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Moyens de paiement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <span>••••  ••••  ••••  4242</span>
            </div>
            <Button variant="outline" className="mt-4 w-full">
              Gérer
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
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
                  <TableCell className="capitalize">{transaction.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}