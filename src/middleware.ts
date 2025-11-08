import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware Next.js
 * Gère la redirection de la locale par défaut et la protection des routes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirection de la racine vers /fr
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url))
  }

  // Vérifier si la locale est présente dans le pathname
  const pathnameHasLocale = ['fr', 'en'].some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Si pas de locale, rediriger vers /fr
  if (!pathnameHasLocale && pathname !== '/') {
    return NextResponse.redirect(new URL(`/fr${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)',
  ],
}
