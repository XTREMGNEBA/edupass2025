"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { nhost } from "@/lib/nhost";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await nhost.auth.isAuthenticatedAsync();
      if (!isAuthenticated) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}