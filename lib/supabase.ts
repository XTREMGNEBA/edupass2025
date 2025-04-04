import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { UserRole } from '@/types/user';

// Validation des variables d'environnement
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Configuration du client Supabase
export const supabase = createClientComponentClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  options: {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
});

// Messages d'erreur traduits
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'Invalid login credentials': 'Email ou mot de passe incorrect',
  'Email not confirmed': 'Veuillez vérifier vos emails pour confirmer votre compte',
  'User already registered': 'Un compte existe déjà avec cet email',
  'Password is too short': 'Le mot de passe doit contenir au moins 6 caractères',
  'Email is invalid': "L'adresse email n'est pas valide",
  'Bucket not found': 'Erreur de configuration du serveur',
  'Storage error': 'Erreur lors du traitement du fichier',
  'File too large': 'La taille du fichier ne doit pas dépasser 5MB',
  'Invalid file type': 'Seuls les PNG, JPG et GIF sont acceptés'
};

// Gestion des erreurs
export const getErrorMessage = (error: any): string => {
  const defaultMessage = 'Une erreur est survenue';
  if (!error) return defaultMessage;
  
  return AUTH_ERROR_MESSAGES[error.message] || error.message || defaultMessage;
};

// Fonction d'inscription
export const signUp = async (
  email: string,
  password: string,
  userData: {
    firstName: string;
    lastName: string;
    role: UserRole;
    phone?: string;
    avatar?: File;
  }
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role,
          phone: userData.phone
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;

    return { user: data.user, error: null };
  } catch (error: any) {
    console.error('Erreur lors de l\'inscription:', error);
    return { user: null, error: getErrorMessage(error) };
  }
};

// Fonction de déconnexion
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    console.error('Erreur lors de la déconnexion:', error);
    return { error: getErrorMessage(error) };
  }
};

// Fonction pour récupérer le rôle de l'utilisateur
export const getUserRole = async (): Promise<UserRole | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    return profile?.role || null;
  } catch (error) {
    console.error('Erreur lors de la récupération du rôle:', error);
    return null;
  }
};