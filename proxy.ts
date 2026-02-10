import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth'; // Import decrypt which is middleware-safe

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/login', '/register'];

export async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isAuthRoute = authRoutes.includes(path);

    // Use req.cookies directly in middleware for speed and reliability
    const cookie = req.cookies.get('session')?.value;
    const session = await decrypt(cookie);

    // Redirect to login if accessing protected route without session
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // Redirect to dashboard if accessing auth routes while logged in
    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
