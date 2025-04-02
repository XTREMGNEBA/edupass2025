"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/types/user';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (!session?.user) {
        router.push('/auth/login');
        return;
      }

      // Vérifier si l'email est confirmé
      if (!session.user.email_confirmed_at) {
        // L'email n'est pas confirmé
        console.error('Email non confirmé');
        router.push('/auth/confirm-email');
        return;
      }

      try {
        // Vérifier si le profil existe
        let { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profileError || !profile) {
          // Créer le profil s'il n'existe pas
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .upsert([
              {
                id: session.user.id,
                email: session.user.email,
                role: session.user.user_metadata?.role || 'PARENT',
                first_name: session.user.user_metadata?.firstName,
                last_name: session.user.user_metadata?.lastName,
                phone: session.user.user_metadata?.phone,
                phoneNumber: session.user.user_metadata?.phone,
                created_at: new Date().toISOString()
              }
            ])
            .select('*')
            .single();

          if (insertError) {
            console.error('Erreur lors de la création du profil:', insertError);
            router.push('/auth/login');
            return;
          }

          profile = newProfile;
        }

        // Redirection basée sur le rôle
        const redirectPath = getRedirectPathForRole(profile.role as UserRole);
        router.push(redirectPath);
      } catch (error) {
        console.error('Erreur de redirection:', error);
        router.push('/auth/login');
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin" />
      <p className="ml-4 text-lg">Redirection en cours...</p>
    </div>
  );
}

function getRedirectPathForRole(role: UserRole): string {
  const roleRedirects: Record<string, string> = {
    'ADMIN': '/dashboard/admin',
    'RESPONSABLE_CANTINE': '/dashboard/cantine',
    'RESPONSABLE_FINANCE': '/dashboard/finance',
    'RESPONSABLE_LOGISTIQUE': '/dashboard/logistique',
    'RESPONSABLE_TRANSPORT': '/dashboard/transport',
    'RESPONSABLE_ADMINISTRATIF': '/dashboard/administratif',
    'PARENT': '/dashboard/parent',
    'STUDENT': '/dashboard/student'
  };

  return roleRedirects[role] || '/dashboard';
}