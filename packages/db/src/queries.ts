import { eq } from "drizzle-orm";
import { createDb } from "./client";
import { users, userCredentials } from "./schema/auth";
import { randomUUID } from "crypto";

export async function getUserWithCredentialsByEmail(email: string) {
  const db = await createDb();

  const result = await db
    .select({
      id: users.id,
      passwordHash: userCredentials.passwordHash,
      status: users.status,
    })
    .from(users)
    .innerJoin(userCredentials, eq(users.id, userCredentials.userId))
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);

  return result[0];
}

export async function updateLastLogin(userId: string) {
  const db = await createDb();
  await db
    .update(users)
    .set({ lastLoginAt: new Date().toISOString() })
    .where(eq(users.id, userId));
}

export async function createUser(
  email: string,
  passwordHash: string,
  name: string,
) {
  const db = await createDb();
  const userId = randomUUID();
  const now = new Date().toISOString();

  // Comprobar si el usuario ya existe
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);
  if (existing.length > 0) {
    throw new Error("El usuario ya existe");
  }

  // Insertar usuario
  await db.insert(users).values({
    id: userId,
    email: email.toLowerCase(),
    name: name,
    role: "user",
    status: "active",
    createdAt: now,
    updatedAt: now,
  });

  // Insertar credenciales
  await db.insert(userCredentials).values({
    userId: userId,
    passwordHash: passwordHash,
    passwordUpdatedAt: now,
  });

  return userId;
}

export async function getUserById(userId: string) {
  const db = await createDb();
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return result[0]; // Devuelve el usuario o undefined
}
