// API functions for handling user profile operations
import { UserProfile } from '@/types/user';

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const response = await fetch(`/api/profile/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch user profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function uploadAvatar(file: File): Promise<{ url: string }> {
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
    return data;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
}
