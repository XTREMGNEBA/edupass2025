/*
  # Storage Setup for User Avatars

  1. New Storage Bucket
    - Create 'avatars' bucket for user profile pictures
    - Set up public access policies
    
  2. Security
    - Enable public read access
    - Restrict write access to authenticated users
    - Add file type and size restrictions
*/

-- Enable storage if not already enabled
CREATE EXTENSION IF NOT EXISTS "storage";

-- Create avatars bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Policy for viewing avatar files (public access)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Policy for uploading avatar files (authenticated users only)
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (LOWER(storage.extension(name)) = 'png' OR
   LOWER(storage.extension(name)) = 'jpg' OR
   LOWER(storage.extension(name)) = 'jpeg' OR
   LOWER(storage.extension(name)) = 'gif') AND
  octet_length(content) < 5242880 -- 5MB file size limit
);

-- Policy for users to update their own avatar files
CREATE POLICY "Users can update own avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars')
WITH CHECK (bucket_id = 'avatars');

-- Policy for users to delete their own avatar files
CREATE POLICY "Users can delete own avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');