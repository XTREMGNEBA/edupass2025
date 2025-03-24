import { NhostClient } from '@nhost/nhost-js';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || '',
});

// Helper functions for authentication
export const signIn = async (email: string, password: string) => {
  try {
    const { session, error } = await nhost.auth.signIn({
      email,
      password,
    });

    if (error) throw error;
    return { session, error: null };
  } catch (error: any) {
    return { session: null, error };
  }
};

export const signUp = async (email: string, password: string, metadata?: any) => {
  try {
    const { session, error } = await nhost.auth.signUp({
      email,
      password,
      options: {
        metadata,
      },
    });

    if (error) throw error;
    return { session, error: null };
  } catch (error: any) {
    return { session: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await nhost.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await nhost.auth.getUser();
    return { user, error: null };
  } catch (error: any) {
    return { user: null, error };
  }
};

export { nhost };