import { createClient } from '@supabase/supabase-js';
import type { UserMetadata, UserRole } from '@/types/user';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined
    },
  }
);

// Fonctions d'authentification
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      return {
        session: data.session,
        profile,
        error: null
      };
    }

    return { session: data.session, profile: null, error: null };
  } catch (error: any) {
    console.error('Sign in error:', error);
    return { session: null, profile: null, error };
  }
};

export const signUp = async (
  email: string,
  password: string,
  metadata: { firstName: string; lastName: string }
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName: metadata.firstName,
          lastName: metadata.lastName,
        },
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
      },
    });

    if (error) throw error;

    return {
      session: data.session,
      user: data.user,
      error: null
    };
  } catch (error: any) {
    console.error('Sign up error:', error);
    return {
      session: null,
      user: null,
      error
    };
  }
};
