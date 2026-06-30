import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Check for legacy paths
  if (pathname.startsWith('/f/') || pathname.startsWith('/blogs/f/')) {
    return new NextResponse('410 Gone - This page has been permanently removed.', {
      status: 410,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // 2. Check for obsolete tracking/category query parameters
  if (
    searchParams.has('rwg_token') ||
    searchParams.has('gsas') ||
    searchParams.has('blogcategory')
  ) {
    return new NextResponse('410 Gone - This page has been permanently removed.', {
      status: 410,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
