import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // Routes protégées qui nécessitent une authentification
  const protectedRoutes = [
    "/dashboard",
    "/wallet",
    "/scanner",
  ];

  // Routes d'authentification
  const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/reset-password",
  ];

  // Rediriger vers la connexion si l'utilisateur n'est pas authentifié
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const redirectUrl = new URL("/auth/login", req.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// Configuration des chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/wallet/:path*",
    "/scanner/:path*",
    "/auth/:path*",
  ],
};