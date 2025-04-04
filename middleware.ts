import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // Create Supabase client with middleware
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  const { data: { session }, error } = await supabase.auth.getSession();

  // Routes protégées qui nécessitent une authentification
  const protectedRoutes = ['/dashboard', '/wallet', '/scanner', '/chatbot'];

  // Routes d'authentification
  const authRoutes = ['/auth/login', '/auth/register', '/auth/reset-password'];

  // Check auth status for protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!session) {
      const redirectUrl = new URL('/auth/login', req.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Vérifier le rôle de l'utilisateur pour les routes spécifiques
    if (pathname.startsWith('/dashboard/')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      const role = profile?.role;
      const rolePrefix = pathname.split('/')[2]; // Ex: /dashboard/admin -> admin

      // Rediriger si l'utilisateur n'a pas le bon rôle
      if (role && rolePrefix && !pathname.includes(`/dashboard/${role.toLowerCase()}`)) {
        return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, req.url));
      }
    }
  }

  // Redirect to dashboard if logged in user tries to access auth routes
  if (authRoutes.includes(pathname) && session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    const redirectPath = profile?.role 
      ? `/dashboard/${profile.role.toLowerCase()}`
      : '/dashboard';

    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/wallet/:path*',
    '/scanner/:path*',
    '/chatbot/:path*',
    '/auth/:path*',
  ],
};