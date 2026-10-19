"use server";

import { redirect } from "next/navigation";
import { hashPassword } from "@/lib/auth/hash";
import { createUser, saveDb } from "../../../../../packages/db/src";

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) {
    redirect("/register?error=missing_fields");
  }

  try {
    const hash = await hashPassword(password);
    await createUser(email, hash, name);

    // Guardar en disco (sql.js)
    saveDb();

    // Redirigir al login tras registrarse con éxito
    redirect("/login?registered=true");
  } catch (error: any) {
    if (error.message === "El usuario ya existe") {
      redirect("/register?error=user_exists");
    }
    redirect("/register?error=unknown");
  }
}
