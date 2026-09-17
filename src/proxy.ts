import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // 0. Intercept legacy URLs and tracking query parameters with a 410 Gone
  const { pathname, searchParams } = request.nextUrl
  if (
    pathname.startsWith('/f/') ||
    pathname.startsWith('/blogs/f/') ||
    searchParams.has('rwg_token') ||
    searchParams.has('gsas') ||
    searchParams.has('blogcategory')
  ) {
    return new NextResponse('410 Gone - This page has been permanently removed.', {
      status: 410,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
  // 1. Generate Nonce and CSP first
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isProd = process.env.NODE_ENV === 'production'
  const strictCspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${!isProd ? "'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.supabase.co;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()

  // 2. Clone headers and inject them
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', strictCspHeader)

  // 3. Initialize response with the new headers
  const p = request.nextUrl.pathname
  // Don't rewrite API routes — they must resolve to /api/*, not /admin/api/*
  const rewritePath = p.startsWith('/admin') || p.startsWith('/api/') ? p : (p === '/' ? '/admin' : `/admin${p}`)
  
  let supabaseResponse = request.headers.get('host') === 'admin.flowtaris.com'
    ? NextResponse.rewrite(new URL(rewritePath, request.url), {
        request: {
          headers: requestHeaders,
        },
      })
    : NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
  
  // Set the CSP on the response as well
  supabaseResponse.headers.set('Content-Security-Policy', strictCspHeader)
  supabaseResponse.headers.set('x-nonce', nonce)

  // Authentication removed — all routes are accessible without login

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
