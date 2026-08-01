import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authMiddleware } from './middleware/auth';

// Security Headers
function securityHeaders(req: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.delete('X-Powered-By');
  return response;
}

export async function middleware(req: NextRequest) {
  // Apply security headers
  const securityResponse = securityHeaders(req);
  if (securityResponse) return securityResponse;

  // Protected routes
  const protectedPaths = ['/api/bookings', '/api/payments', '/dashboard'];
  const isProtected = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

  if (isProtected) {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
};