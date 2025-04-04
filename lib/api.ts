import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { UserProfile } from '@/types/user';

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function uploadAvatar(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetch('/api/upload-avatar', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload avatar');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
}