 import { useUser } from '@/contexts/user-context';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';
import { useState, useEffect } from 'react';
import { fetchUserProfile } from '@/lib/api';

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const userProfile = await fetchUserProfile(user.id);
        setProfile(userProfile);
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const updateProfile = async (formData: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const deleteProfile = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProfile(null);
        return true;
      }

      throw new Error('Failed to delete profile');
    } catch (error) {
      console.error('Error deleting profile:', error);
      return false;
    }
  };

  return { profile, isLoading, updateProfile, deleteProfile };
}
