"use server";
export const runtime = "nodejs";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPassword } from "@/lib/auth/hash";
import { createSession, COOKIE_NAME } from "@/lib/auth/session";
import {
  getUserWithCredentialsByEmail,
  updateLastLogin,
  saveDb,
} from "@sicilia-soil/db";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect("/login?error=missing_fields");
  }

  // 1. Buscar usuario
  const user = await getUserWithCredentialsByEmail(email);

  // 2. Verificar credenciales (¡ESTO DEBE IR ANTES DE HACER NADA CON EL USER!)
  if (!user || user.status !== "active") {
    redirect("/login?error=invalid_credentials");
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    redirect("/login?error=invalid_credentials");
  }

  // 3. Actualizar lastLoginAt
  await updateLastLogin(user.id);

  // 4. Guardar en disco SOLO en local (Vercel es de solo lectura)
  try {
    if (process.env.NODE_ENV !== "production") {
      saveDb();
    }
  } catch (error) {
    console.warn("⚠️ No se pudo guardar la BD en disco (entorno Serverless)");
  }

  // 5. Crear sesión JWT y cookie
  const token = await createSession(user.id);

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/dashboard");
}

export async function logout() {
  // 1. Borramos la cookie de sesión
  (await cookies()).delete(COOKIE_NAME);

  // 2. Redirigimos al login
  redirect("/login");
}
