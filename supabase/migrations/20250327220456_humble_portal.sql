/*
  # Authentication System Setup

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - References auth.users
      - `email` (text, unique)
      - `first_name` (text)
      - `last_name` (text)
      - `role` (text)
      - `phone` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users
    - Add trigger for automatic profile creation

  3. Functions
    - Create function to handle user profile creation
    - Add trigger to automatically create profiles
*/

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  role text DEFAULT 'PARENT',
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_role CHECK (role IN ('ADMIN', 'RESPONSABLE_CANTINE', 'RESPONSABLE_FINANCE', 'RESPONSABLE_LOGISTIQUE', 'RESPONSABLE_TRANSPORT', 'RESPONSABLE_ADMINISTRATIF', 'PARENT', 'STUDENT'))
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  default_role text := 'PARENT';
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    role,
    phone
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'firstName', 'Unknown'),
    COALESCE(NEW.raw_user_meta_data->>'lastName', 'Unknown'),
    COALESCE(NEW.raw_user_meta_data->>'role', default_role),
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL)
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log error details
    INSERT INTO public.error_logs (
      error_time,
      error_type,
      error_detail,
      user_id
    )
    VALUES (
      now(),
      'PROFILE_CREATION_ERROR',
      SQLERRM,
      NEW.id
    );
    RETURN NEW;
END;
$$;

-- Create error_logs table for tracking issues
CREATE TABLE IF NOT EXISTS public.error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  error_time timestamptz DEFAULT now(),
  error_type text,
  error_detail text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  resolved boolean DEFAULT false
);

-- Create trigger for profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();