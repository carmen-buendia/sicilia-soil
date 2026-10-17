import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, COOKIE_NAME } from "./lib/auth/session";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  const { pathname, searchParams } = request.nextUrl;

  // 1. Rutas de auth (login y register)
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // 2. Rutas públicas (home, about, manifesto...)
  const isPublicRoute =
    pathname === "/" || pathname === "/about" || pathname === "/manifesto";

  const hasError = searchParams.has("error");

  // Regla A: Si NO hay sesión y la ruta NO es pública NI de auth -> al login
  if (!session && !isAuthRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Regla B: Si HAY sesión y está en login/register (sin error) -> al dashboard
  if (session && isAuthRoute && !hasError) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Cualquier otro caso, dejamos pasar
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|wasm)$).*)",
  ],
};
