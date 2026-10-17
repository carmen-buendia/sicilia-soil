import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, COOKIE_NAME } from "./lib/auth/session";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // Verificamos el token (si no hay token, session será null)
  const session = token ? await verifySession(token) : null;
  const { pathname } = request.nextUrl;

  // Rutas que son de autenticación (login, register)
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // 1. Si NO hay sesión y quiere ir a una ruta protegida -> al login
  if (!session && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Si HAY sesión y quiere ir a login/register -> al dashboard
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. En cualquier otro caso, dejamos pasar
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
