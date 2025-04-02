import { useUser } from '@/contexts/user-context';

export function useUserProfile() {
  return useUser();
}