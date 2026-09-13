import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
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
  const rewritePath = request.nextUrl.pathname === '/' ? '/admin' : `/admin${request.nextUrl.pathname}`
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

  // 4. Setup Supabase Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          // Re-instantiate the response with updated cookies, ensuring requestHeaders are still passed
          const cookieRewritePath = request.nextUrl.pathname === '/' ? '/admin' : `/admin${request.nextUrl.pathname}`
          supabaseResponse = request.headers.get('host') === 'admin.flowtaris.com'
            ? NextResponse.rewrite(new URL(cookieRewritePath, request.url), {
                request: {
                  headers: requestHeaders,
                },
              })
            : NextResponse.next({
                request: {
                  headers: requestHeaders,
                },
              })
          // Re-apply CSP to the new response
          supabaseResponse.headers.set('Content-Security-Policy', strictCspHeader)
          supabaseResponse.headers.set('x-nonce', nonce)
          
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 5. Refresh session if expired
  const { data: { user } } = await supabase.auth.getUser()

  // 6. Protect admin routes
  const isAdminHost = request.headers.get('host') === 'admin.flowtaris.com'
  const isTargetingAdmin = isAdminHost || request.nextUrl.pathname.startsWith('/admin')
  
  // If this is an admin route, enforce authentication
  if (isTargetingAdmin) {
    // The actual path the user is seeing in their browser
    const currentPath = request.nextUrl.pathname
    
    // Allow access to login pages without auth
    const isLoginPage = currentPath === '/login' || currentPath === '/admin/login' || currentPath === '/admin-login'
    
    if (!user && !isLoginPage) {
      // If on the admin domain, redirect to /login. If on the main domain, redirect to /admin/login
      const loginPath = isAdminHost ? '/login' : '/admin/login'
      const loginUrl = new URL(loginPath, request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
