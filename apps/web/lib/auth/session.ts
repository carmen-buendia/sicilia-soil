import { SignJWT, jwtVerify } from "jose";

// process.env.AUTH_SECRET debe estar en .env.local
const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
export const COOKIE_NAME = "session";

export async function createSession(userId: string): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // La sesión dura 7 días
    .sign(secret);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string };
  } catch {
    return null; // Token inválido o expirado
  }
}
