import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/user-context';
import type { UserRole } from '@/types/user';

export function useRoleAccess(allowedRoles: UserRole[]) {
  const { profile, isLoading } = useUser();
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const hasPermission = profile && allowedRoles.includes(profile.role);
      setHasAccess(!!hasPermission);

      if (!hasPermission) {
        router.push('/dashboard');
      }
    }
  }, [profile, isLoading, allowedRoles, router]);

  return { isLoading, hasAccess };
}