// packages/db/src/schema/auth.ts

import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    emailVerifiedAt: text("email_verified_at"),
    name: text("name").notNull(),
    locale: text("locale"),
    timezone: text("timezone"),
    avatarUrl: text("avatar_url"),
    role: text("role").notNull().default("user"),
    status: text("status").notNull().default("active"),
    lastLoginAt: text("last_login_at"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
    deletedAt: text("deleted_at"),
  },
  (t) => ({
    emailIdx: index("users_email_idx").on(t.email),
  }),
);

// ---------------------------------------------------------------------------
// User credentials
// ---------------------------------------------------------------------------

export const userCredentials = sqliteTable("user_credentials", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  passwordHash: text("password_hash").notNull(),
  passwordUpdatedAt: text("password_updated_at").notNull(),
  mfaEnabled: integer("mfa_enabled", { mode: "boolean" })
    .notNull()
    .default(false),
  mfaSecret: text("mfa_secret"),
  failedLoginAttempts: integer("failed_login_attempts").notNull().default(0),
  lockedUntil: text("locked_until"),
});

// ---------------------------------------------------------------------------
// User identities (OAuth links)
// ---------------------------------------------------------------------------

export const userIdentities = sqliteTable(
  "user_identities",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerUserId: text("provider_user_id").notNull(),
    createdAt: text("created_at").notNull(),
  },
  (t) => ({
    userIdx: index("user_identities_user_idx").on(t.userId),
    providerIdx: index("user_identities_provider_idx").on(
      t.provider,
      t.providerUserId,
    ),
  }),
);

// ---------------------------------------------------------------------------
// Memberships (RBAC)
// ---------------------------------------------------------------------------

export const memberships = sqliteTable(
  "memberships",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    farmId: text("farm_id").notNull(),
    role: text("role").notNull(),
    status: text("status").notNull().default("active"),
    invitedBy: text("invited_by"),
    invitedAt: text("invited_at"),
    acceptedAt: text("accepted_at"),
    revokedAt: text("revoked_at"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => ({
    userIdx: index("memberships_user_idx").on(t.userId),
    farmIdx: index("memberships_farm_idx").on(t.farmId),
  }),
);

// ---------------------------------------------------------------------------
// Invitations
// ---------------------------------------------------------------------------

export const invitations = sqliteTable(
  "invitations",
  {
    id: text("id").primaryKey(),
    farmId: text("farm_id").notNull(),
    email: text("email").notNull(),
    role: text("role").notNull(),
    token: text("token").notNull(),
    invitedBy: text("invited_by").notNull(),
    expiresAt: text("expires_at").notNull(),
    acceptedAt: text("accepted_at"),
    revokedAt: text("revoked_at"),
    createdAt: text("created_at").notNull(),
  },
  (t) => ({
    emailIdx: index("invitations_email_idx").on(t.email),
    tokenIdx: index("invitations_token_idx").on(t.token),
  }),
);

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    refreshTokenHash: text("refresh_token_hash").notNull(),
    userAgent: text("user_agent"),
    ipAddress: text("ip_address"),
    expiresAt: text("expires_at").notNull(),
    revokedAt: text("revoked_at"),
    createdAt: text("created_at").notNull(),
  },
  (t) => ({
    userIdx: index("sessions_user_idx").on(t.userId),
  }),
);

// ---------------------------------------------------------------------------
// Audit log
// ---------------------------------------------------------------------------

export const auditLog = sqliteTable(
  "audit_log",
  {
    id: text("id").primaryKey(),
    actorId: text("actor_id").notNull(),
    action: text("action").notNull(),
    targetType: text("target_type"),
    targetId: text("target_id"),
    metadata: text("metadata", { mode: "json" }),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: text("created_at").notNull(),
  },
  (t) => ({
    actorIdx: index("audit_log_actor_idx").on(t.actorId),
    actionIdx: index("audit_log_action_idx").on(t.action),
  }),
);
