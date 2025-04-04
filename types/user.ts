import type { User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole =
  | 'ADMIN'
  | 'RESPONSABLE_CANTINE'
  | 'RESPONSABLE_FINANCE'
  | 'RESPONSABLE_LOGISTIQUE'
  | 'RESPONSABLE_TRANSPORT'
  | 'RESPONSABLE_ADMINISTRATIF'
  | 'PARENT'
  | 'STUDENT';

export type User = SupabaseUser;

export const ROLE_ROUTES: Record<UserRole, string> = {
  ADMIN: '/dashboard/admin',
  RESPONSABLE_CANTINE: '/dashboard/cantine',
  RESPONSABLE_FINANCE: '/dashboard/finance',
  RESPONSABLE_LOGISTIQUE: '/dashboard/logistique',
  RESPONSABLE_TRANSPORT: '/dashboard/transport',
  RESPONSABLE_ADMINISTRATIF: '/dashboard/administratif',
  PARENT: '/dashboard/parent',
  STUDENT: '/dashboard/student'
};

export const getRouteForRole = (role: UserRole): string => {
  return ROLE_ROUTES[role] || '/dashboard';
};

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  phone?: string;
  created_at: string;
  updated_at?: string;
  avatar_url?: string;
}
