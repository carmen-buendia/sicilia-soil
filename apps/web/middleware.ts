import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, COOKIE_NAME } from "./lib/auth/session";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;
  const { pathname, searchParams } = request.nextUrl;

  // 1. Rutas que requieren autenticación obligatoria
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // 2. Rutas públicas a las que cualquiera puede acceder SIN sesión
  const isPublicRoute =
    pathname === "/" || pathname === "/manifesto" || pathname === "/about";

  const hasError = searchParams.has("error");

  // Regla A: Si NO hay sesión, y quiere ir a una ruta privada (ni login, ni register, ni pública)
  if (!session && !isAuthRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Regla B: Si HAY sesión, y está intentando ir a login o register (sin errores)
  if (session && isAuthRoute && !hasError) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Regla C: Si es una ruta pública, o tiene sesión, o está en login con error -> Dejar pasar
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Protege todas las rutas EXCEPTO:
     * - api (las APIs de Next)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico
     * - archivos con extensiones de imagen/wasm
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|wasm)$).*)",
  ],
};
