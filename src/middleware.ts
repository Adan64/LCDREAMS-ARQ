import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  let response = intlMiddleware(request);

  // 1. Check if route is protected (/admin)
  const pathname = request.nextUrl.pathname;
  // This regex checks if the path contains /admin (e.g. /es/admin, /en/admin)
  const isAdminRoute = pathname.includes('/admin');

  if (isAdminRoute) {
    // 2. Refresh/Check Supabase Session
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 3. Redirect to Login if not authenticated
    if (!user) {
       const locale = pathname.split('/')[1] || 'es'; 
       const url = request.nextUrl.clone();
       url.pathname = `/${locale}/login`;
       return NextResponse.redirect(url);
    }

    // 4. Check for Admin Role
    const userRole = user.user_metadata?.role;
    if (userRole !== 'admin') {
       // Redirect to home or show error if not admin
       const locale = pathname.split('/')[1] || 'es';
       const url = request.nextUrl.clone();
       url.pathname = `/${locale}/homepage`; // Redirect unauthorized users to homepage
       return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
