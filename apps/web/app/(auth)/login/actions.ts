"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPassword } from "@/lib/auth/hash";
import { createSession, COOKIE_NAME } from "@/lib/auth/session";
import {
  getUserWithCredentialsByEmail,
  updateLastLogin,
} from "@sicilia-soil/db";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect("/login?error=missing_fields");
  }

  // 1. Search user.
  const user = await getUserWithCredentialsByEmail(email);

  // 2. Verify credentials.
  if (!user || user.status !== "active") {
    redirect("/login?error=invalid_credentials");
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    redirect("/login?error=invalid_credentials");
  }

  // 3. Update lastLoginAt.
  await updateLastLogin(user.id);

  // 5. Create session JWT and cookie.
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
  // 1. Delete session cookie.
  (await cookies()).delete(COOKIE_NAME);

  // 2. Redirect to login.
  redirect("/login");
}
