"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPassword } from "@/lib/auth/hash";
import { createSession, COOKIE_NAME } from "@/lib/auth/session";
// Importamos nuestras funciones personalizadas del paquete DB
import {
  getUserWithCredentialsByEmail,
  updateLastLogin,
  saveDb,
} from "../../../../../packages/db/src";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect("/login?error=missing_fields");
  }

  // 1. Buscar usuario usando la función del paquete db
  const user = await getUserWithCredentialsByEmail(email);

  // 2. Verificar credenciales
  if (!user || user.status !== "active") {
    redirect("/login?error=invalid_credentials");
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    redirect("/login?error=invalid_credentials");
  }

  // 3. Actualizar lastLoginAt y guardar en disco
  await updateLastLogin(user.id);
  saveDb(); // Importante para sql.js

  // 4. Crear sesión JWT y cookie
  const token = await createSession(user.id);

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  redirect("/dashboard");
}
