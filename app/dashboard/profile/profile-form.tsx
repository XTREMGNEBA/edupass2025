'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserProfile } from '@/types/user';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export function ProfileForm() {
  const { profile, isLoading, updateProfile } = useUserProfile();
  const { signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    role: profile?.role || undefined,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProfile(formData);
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      try {
        if (profile?.id) {
          await updateProfile({ status: 'DELETED' });
          await signOut();
          router.push('/auth/login');
          toast({
            title: "Compte supprimé",
            description: "Votre compte a été supprimé avec succès.",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression du compte.",
        });
      }
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="first_name">Prénom</Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Votre prénom"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Nom</Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Votre nom"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Adresse e-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="votre@email.com"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+33 6 12 34 56 78"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Rôle</Label>
        <Input
          id="role"
          name="role"
          value={formData.role}
          disabled={true}
          className="bg-muted"
        />
        <p className="text-sm text-muted-foreground">
          Le rôle ne peut pas être modifié. Contactez l'administrateur pour tout changement.
        </p>
      </div>

      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="w-full sm:w-auto"
          >
            Annuler
          </Button>
        </div>
        
        <Button
          type="button"
          variant="destructive"
          onClick={handleDeleteAccount}
          className="w-full sm:w-auto"
        >
          Supprimer le compte
        </Button>
      </div>
    </form>
  );
}