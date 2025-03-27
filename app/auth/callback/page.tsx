"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

type UserRole = 'Admin' | 'Responsable cantine' | 'Parent' | 'Student';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Récupérer le rôle de l'utilisateur
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        // Rediriger selon le rôle
        const redirectPaths: Record<UserRole | 'default', string> = {
          'Admin': '/admin/dashboard',
          'Responsable cantine': '/cantine/dashboard',
          'Parent': '/parent/dashboard',
          'Student': '/student/dashboard',
          'default': '/dashboard'
        };

        const path = profile?.role ?
          (redirectPaths[profile.role as UserRole] || redirectPaths.default) :
          redirectPaths.default;
        router.push(path);
      }
    });
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin" />
      <p className="ml-4 text-lg">Connexion en cours...</p>
    </div>
  );
}
