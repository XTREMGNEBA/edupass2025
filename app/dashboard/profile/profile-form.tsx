'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserProfile } from '@/types/user';
import { useAuth } from '@/hooks/use-auth'; // Hook pour la gestion de l'authentification
import { useRouter } from 'next/navigation';

export function ProfileForm() {
  const { profile, isLoading, updateProfile, deleteProfile } = useUserProfile(); // Accès aux données du profil
  const { signOut } = useAuth(); // Authentification utilisateur
  const router = useRouter();

  // Gestion de l'état du formulaire
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    email: profile?.email || '',
    role: profile?.role || undefined,
  });

  // Met à jour les valeurs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envoi des données du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateProfile) {
      updateProfile(formData);
    }
  };

  // Fonction pour supprimer le profil si l'utilisateur est admin
  const handleDeleteProfile = () => {
    if (profile?.role === 'ADMIN') {
      if (deleteProfile) {
        deleteProfile(profile?.id);
        signOut();
        router.push('/login'); // Redirection après suppression
      }
    }
  };

  if (isLoading) {
    return <div>Chargement des données...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="first_name">Prénom</Label>
        <Input
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Entrez votre prénom"
        />
      </div>

      <div>
        <Label htmlFor="last_name">Nom</Label>
        <Input
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Entrez votre nom"
        />
      </div>

      <div>
        <Label htmlFor="email">Adresse e-mail</Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Entrez votre e-mail"
        />
      </div>

      <div>
        <Label htmlFor="role">Rôle</Label>
        <Input
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Votre rôle (administrateur, utilisateur, etc.)"
        />
      </div>

      <div className="flex justify-between">
        <Button type="submit" variant="default">
          Mettre à jour
        </Button>

        {/* Conditionner l'affichage du bouton de suppression selon le rôle */}
        {profile?.role === 'ADMIN' && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeleteProfile}
          >
            Supprimer le profil
          </Button>
        )}

        <Button
          type="button"
          variant="destructive"
          onClick={() => signOut()} // Pour se déconnecter si nécessaire
        >
          Déconnexion
        </Button>
      </div>
    </form>
  );
}
