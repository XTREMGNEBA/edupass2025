import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserRole } from '@/lib/supabase';
import type { UserRole } from '@/types/user';

export function useRoleAccess(allowedRoles: UserRole[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const role = await getUserRole();
      
      if (!role || !allowedRoles.includes(role)) {
        router.push('/dashboard');
        setHasAccess(false);
      } else {
        setHasAccess(true);
      }
      
      setIsLoading(false);
    };

    checkAccess();
  }, [allowedRoles, router]);

  return { isLoading, hasAccess };
}