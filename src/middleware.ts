import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('session');

    if (!session) {
      // Redirect unauthenticated users to /login (which now lives in (auth) group)
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Matching Paths
export const config = {
  matcher: ['/admin/:path*'],
};
