import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // Create Supabase client with middleware
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  await supabase.auth.getSession();

  // Routes protégées qui nécessitent une authentification
  const protectedRoutes = ['/dashboard', '/wallet', '/scanner'];

  // Routes d'authentification
  const authRoutes = ['/auth/login', '/auth/register', '/auth/reset-password'];

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check auth status for protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!session) {
      const redirectUrl = new URL('/auth/login', req.url);
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Redirect to dashboard if logged in user tries to access auth routes
  if (authRoutes.includes(pathname) && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/wallet/:path*',
    '/scanner/:path*',
    '/auth/:path*',
  ],
};