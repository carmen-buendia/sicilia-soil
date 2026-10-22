"use server";

import { redirect } from "next/navigation";
import { hashPassword } from "@/lib/auth/hash";
import { createUser, saveDb } from "../../../../../packages/db/src";

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  console.log("🟢 1. Iniciando registro para:", email);

  if (!email || !password || !name) {
    console.log("🔴 Error: Faltan campos");
    redirect("/register?error=missing_fields");
  }

  try {
    console.log("🟡 2. Hasheando contraseña...");
    const hash = await hashPassword(password);

    console.log("🟡 3. Creando usuario en la base de datos...");
    await createUser(email, hash, name);

    if (process.env.NODE_ENV !== "production") {
      saveDb();
    }
    console.log("🟢 4. Usuario creado con éxito.");
  } catch (error: any) {
    // ESTO ES LO QUE NECESITAMOS VER
    console.error("🔥 ERROR CRÍTICO EN EL REGISTRO:", error);

    if (error.message === "El usuario ya existe") {
      redirect("/register?error=user_exists");
    }
    redirect("/register?error=unknown");
  }

  // Si todo va bien, redirigimos fuera del try/catch
  console.log("🟢 5. Redirigiendo al login...");
  redirect("/login?registered=true");
}
