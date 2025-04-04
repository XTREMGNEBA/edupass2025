'use client';

import { useUserProfile } from '@/hooks/useUserProfile';
import { ProfileForm } from './profile-form';
import { AvatarUpload } from './avatar-upload';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Key,
  CreditCard
} from 'lucide-react';

export default function ProfilePage() {
  const { profile, isLoading } = useUserProfile();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return <p className="text-center text-red-500">Utilisateur non connecté.</p>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Paiement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Photo de profil</CardTitle>
              </CardHeader>
              <CardContent>
                <AvatarUpload />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité du compte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mot de passe</h3>
                    <p className="text-sm text-muted-foreground">
                      Dernière modification il y a {profile.password_updated_at ? new Date(profile.password_updated_at).toLocaleDateString() : 'jamais'}
                    </p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Changer
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Double authentification</h3>
                    <p className="text-sm text-muted-foreground">
                      {profile.two_factor_enabled ? 'Activée' : 'Désactivée'}
                    </p>
                  </div>
                  <Button variant="outline">
                    {profile.two_factor_enabled ? 'Désactiver' : 'Activer'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications par email</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevez des mises à jour par email
                    </p>
                  </div>
                  <Switch checked={profile.email_notifications_enabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications push</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevez des notifications sur votre appareil
                    </p>
                  </div>
                  <Switch checked={profile.push_notifications_enabled} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Informations de paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Mode de paiement actuel</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <CreditCard className="h-4 w-4" />
                    <span>•••• •••• •••• {profile.last_four_card || '****'}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Historique des paiements</h3>
                  <div className="mt-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Add payment history here */}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}