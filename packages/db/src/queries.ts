import { eq } from "drizzle-orm";
import { createDb } from "./client";
import { users, userCredentials } from "./schema/auth";

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

  return result[0]; // Devuelve el usuario o undefined
}

export async function updateLastLogin(userId: string) {
  const db = await createDb();
  await db
    .update(users)
    .set({ lastLoginAt: new Date().toISOString() })
    .where(eq(users.id, userId));
}
