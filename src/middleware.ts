import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { decrypt } from './app/_lib/session';

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ['/dashboard'];
  const blockedRoutes = ['/login', '/signup'];
  const currentRoute = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentRoute);
  const isBlockedRoute = blockedRoutes.includes(currentRoute);
  if (isProtectedRoute) {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
  }

  if (isBlockedRoute) {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (session?.userId) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
