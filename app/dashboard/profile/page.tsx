'use client';

import { useUserProfile } from '@/hooks/useUserProfile';
import { ProfileForm } from './profile-form';
import { AvatarUpload } from './avatar-upload';
import { Loader } from '@/components/ui/loader';

export default function ProfilePage() {
  const { profile, isLoading } = useUserProfile();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!profile) {
    return <p className="text-center text-red-500">Utilisateur non connecté.</p>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center space-y-6">
          <AvatarUpload />
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
