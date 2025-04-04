"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { PublicHeader } from "./PublicHeader";
import { PrivateHeader } from "./PrivateHeader";
import { Loader2 } from "lucide-react";

export function Header() {
  const { isAuthenticated, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state during initial auth check
  if (!mounted || isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-center bg-background border-b">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // Render appropriate header based on auth state
  return isAuthenticated ? <PrivateHeader /> : <PublicHeader />;
}