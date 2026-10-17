"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPassword } from "@/lib/auth/hash";
import { createSession, COOKIE_NAME } from "@/lib/auth/session";
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

  // 1. Search user used function in package db.
  const user = await getUserWithCredentialsByEmail(email);

  // 2. Credentials verify.
  if (!user || user.status !== "active") {
    redirect("/login?error=invalid_credentials");
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    redirect("/login?error=invalid_credentials");
  }

  // 3. Actualizar lastLoginAt and save in disk.
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

export async function logout() {
  // 1. Borramos la cookie de sesión
  (await cookies()).delete(COOKIE_NAME);

  // 2. Redirigimos al login
  redirect("/login");
}
