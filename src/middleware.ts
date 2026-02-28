import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // ── SUBDOMAIN ROUTING ────────────────────────────────────────
  // tokobudi.katalio.id → /[slug]/...
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'katalio.id'
  const isSubdomain =
    hostname.endsWith(`.${appDomain}`) &&
    !hostname.startsWith('www.') &&
    !hostname.startsWith('app.')

  if (isSubdomain) {
    const slug = hostname.replace(`.${appDomain}`, '')
    const url = request.nextUrl.clone()
    url.pathname = `/${slug}${pathname}`
    return NextResponse.rewrite(url)
  }

  // ── SESSION REFRESH ──────────────────────────────────────────
  const { supabaseResponse, user } = await updateSession(request)

  // ── ROUTE PROTECTION ─────────────────────────────────────────
  const isDashboardRoute = pathname.startsWith('/dashboard')
  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password')

  // Redirect ke login kalau belum auth dan akses dashboard
  if (isDashboardRoute && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect ke dashboard kalau sudah auth dan akses halaman auth
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|images|fonts).*)',
  ],
}
