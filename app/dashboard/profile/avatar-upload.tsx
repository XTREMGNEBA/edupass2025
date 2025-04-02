'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useUserProfile } from '@/hooks/useUserProfile';
import { uploadAvatar } from '@/lib/api'; // Fonction API pour gérer l'upload

export function AvatarUpload() {
  const { profile, updateProfile, } = useUserProfile();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(profile?.avatar || null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const newAvatarUrl = await uploadAvatar(image);
      updateProfile({ avatar: newAvatarUrl });
    } catch (error) {
      console.error('Erreur lors de l\'upload', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
        {preview ? (
          <Image src={preview} alt="Avatar" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">+</div>
        )}
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="avatar-input" />
      <label htmlFor="avatar-input" className="cursor-pointer text-blue-500 underline">Changer d’avatar</label>
      <Button onClick={handleUpload} disabled={!image || loading}>
        {loading ? 'Envoi en cours...' : 'Enregistrer'}
      </Button>
    </div>
  );
}
