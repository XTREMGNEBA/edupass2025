"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2 } from "lucide-react";
import { ROLE_ROUTES } from "@/types/user";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuthAndRole = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          router.push("/auth/login");
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (!profile) {
          router.push("/auth/login");
          return;
        }

        const currentPath = window.location.pathname;
        const expectedPath = ROLE_ROUTES[profile.role as keyof typeof ROLE_ROUTES];

        if (!currentPath.startsWith(expectedPath)) {
          router.push(expectedPath);
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/auth/login");
      }
    };

    checkAuthAndRole();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}