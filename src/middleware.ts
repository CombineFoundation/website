import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect old /dashboard to protected /admin/dashboard
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    const adminUrl = new URL('/admin/dashboard', request.url);
    return NextResponse.redirect(adminUrl);
  }

  // Protect all /admin routes
  // if (pathname.startsWith('/admin')) {
  //   const session = request.cookies.get('session');

  //   if (!session) {
  //     const loginUrl = new URL('/login', request.url);
  //     return NextResponse.redirect(loginUrl);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
