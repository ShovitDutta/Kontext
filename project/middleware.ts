import { auth } from './auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
	const session = await auth();
	const { pathname } = request.nextUrl;
	if (session && pathname === '/auth/signin') return NextResponse.redirect(new URL('/', request.url));
	if (!session && (pathname.startsWith('/profile') || pathname.startsWith('/article'))) return NextResponse.redirect(new URL('/auth/signin', request.url));
	return NextResponse.next();
}
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };
