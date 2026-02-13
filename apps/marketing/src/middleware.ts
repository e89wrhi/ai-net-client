import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\..*$/;
const defaultLocale = 'en';
const supportedLocales = ['en'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next.js internals and assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 3. Locale detection
  const response = NextResponse.next();
  if (!req.cookies.get('NEXT_LOCALE')) {
    const acceptLanguage = req.headers.get('accept-language');
    const detected =
      supportedLocales.find((l) => acceptLanguage?.startsWith(l)) ??
      defaultLocale;
    response.cookies.set('NEXT_LOCALE', detected, {
      path: '/',
      sameSite: 'lax',
    });
  }
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
