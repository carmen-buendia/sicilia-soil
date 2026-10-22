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

    // Solo guardamos en disco si estamos en local. En Vercel lo ignoramos.
    if (process.env.NODE_ENV !== "production") {
      saveDb();
    }
  } catch (error: any) {
    if (error.message === "El usuario ya existe") {
      redirect("/register?error=user_exists");
    }
    // Si hay un error real de la base de datos, lo mostramos
    redirect("/register?error=unknown");
  }

  // EL REDIRECT VA FUERA DEL TRY/CATCH
  // Si llegamos aquí, es que el usuario se creó con éxito
  redirect("/login?registered=true");
}
