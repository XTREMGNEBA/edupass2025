'use client';

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
    global: {
      headers: {
        'x-my-custom-header': 'my-app-name',
      },
    },
  },
  cookieOptions: {
    name: 'sb-auth-token',
    path: '/',
    sameSite: 'lax',
    secure: true,
    domain: ''
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
  
  // Gestion spécifique des erreurs de stockage
  if (error.message?.includes('storage')) {
    if (error.message.includes('File size exceeds')) return AUTH_ERROR_MESSAGES['File too large'];
    if (error.message.includes('invalid file type')) return AUTH_ERROR_MESSAGES['Invalid file type'];
    return AUTH_ERROR_MESSAGES['Storage error'];
  }

  return AUTH_ERROR_MESSAGES[error.message] || error.message || defaultMessage;
};

// Fonction pour uploader un avatar
const uploadAvatar = async (userId: string, file: File) => {
  console.log('Tentative d\'upload d\'avatar pour l\'utilisateur:', userId);
  const validTypes = ['image/png', 'image/jpeg', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    console.error('Type de fichier invalide:', file.type);
    throw new Error(AUTH_ERROR_MESSAGES['Invalid file type']);
  }

  if (file.size > maxSize) {
    console.error('Fichier trop volumineux:', file.size);
    throw new Error(AUTH_ERROR_MESSAGES['File too large']);
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/avatar.${fileExt}`;

  console.log('Upload du fichier:', fileName);
  await supabase.storage
    .from('avatars')
    .remove([fileName]);
   const { error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, {
      cacheControl: '3600',
      contentType: file.type
    });

  if (error) {
    console.error('Erreur lors de l\'upload:', error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);

  console.log('Upload réussi, URL publique:', publicUrl);
  return publicUrl;
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
  console.log('Tentative d\'inscription avec les données:', { email, userData });
  try {
    // Validation des données
    if (!email || !password || !userData.firstName || !userData.lastName) {
      throw new Error('Tous les champs obligatoires doivent être remplis');
    }

    // Upload de l'avatar si fourni
    let avatarUrl = null;
    if (userData.avatar) {
      console.log('Upload de l\'avatar...');
      avatarUrl = await uploadAvatar(email, userData.avatar);
    }

    // Création du compte
    console.log('Création du compte dans Supabase Auth...');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          ...userData,
          avatar_url: avatarUrl,
          full_name: `${userData.firstName} ${userData.lastName}`
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) throw error;

    console.log('Compte créé, données utilisateur:', data.user);

    // Création du profil dans la table profiles
    if (data.user) {
      console.log('Création du profil dans la table profiles...');
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role,
          phone: userData.phone,
          avatar_url: avatarUrl
        });

      if (profileError) throw profileError;
    }

    console.log('Inscription complétée avec succès');
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
    if (error) {
      console.error('Erreur lors de la déconnexion:', error);
      return { error: getErrorMessage(error) };
    }
    return { error: null };
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return { error: getErrorMessage(error) };
  }
};

// Fonction pour récupérer le rôle de l'utilisateur
export const getUserRole = async (): Promise<UserRole | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    return profile?.role || user.user_metadata?.role || null;
  } catch (error) {
    console.error('Erreur lors de la récupération du rôle:', error);
    return null;
  }
};