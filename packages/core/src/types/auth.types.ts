// packages/core/src/types/auth.types.ts

// ============================================================================
// SikeliaSoil — Auth & tenancy
// ----------------------------------------------------------------------------
// Design principles:
//   - Multi-farm from day 1 (a user can own/manage several farms)
//   - Role-based access control (RBAC) via Membership, not on User directly
//   - Roles are per-farm, not global (a user can be owner of one, worker of another)
//   - Auth provider agnostic: JWT, NextAuth, Clerk — all fit this shape
//   - GDPR-ready: soft-delete + data export fields
// ============================================================================

// ----------------------------------------------------------------------------
// Roles
// ----------------------------------------------------------------------------

/**
 * Role of a user inside a specific farm.
 *
 * - owner:     full control, can delete the farm, manage billing
 * - manager:   full operational control, can invite members, cannot delete farm
 * - worker:    can create/edit operations (observations, inputs, harvests)
 * - viewer:    read-only access (advisors, auditors, cooperative staff)
 */
export type MembershipRole = "owner" | "manager" | "worker" | "viewer";

/**
 * Account-level role. Reserved for platform admin (you).
 * Most users will be "user"; only platform staff are "admin".
 */
export type UserRole = "user" | "admin";

// ----------------------------------------------------------------------------
// User
// ----------------------------------------------------------------------------

export type UserStatus =
  | "pending" // registered but email not verified
  | "active" // normal
  | "suspended" // temporarily blocked
  | "deleted"; // soft-deleted, retention window active

export interface User {
  id: string;
  email: string;
  emailVerifiedAt?: string; // ISO 8601
  name: string;
  locale?: string; // e.g. "es-IT", "it-IT"
  timezone?: string; // e.g. "Europe/Rome"
  avatarUrl?: string;
  role: UserRole; // platform-level role
  status: UserStatus;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null; // soft-delete
}

/**
 * Private data — NEVER expose this in API responses or the frontend bundle.
 * Lives in a separate table so public User queries stay cheap and safe.
 */
export interface UserCredentials {
  userId: string;
  passwordHash: string; // bcrypt / argon2
  passwordUpdatedAt: string;
  mfaEnabled: boolean;
  mfaSecret?: string; // encrypted at rest
  recoveryCodes?: string[]; // hashed
  failedLoginAttempts: number;
  lockedUntil?: string;
}

/**
 * Optional OAuth / SSO provider link.
 * A user can have multiple (Google + GitHub, etc.).
 */
export interface UserIdentity {
  id: string;
  userId: string;
  provider: "email" | "google" | "github" | "apple";
  providerUserId: string; // the id on the provider's side
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Farm ownership (defined here as the tenancy anchor)
// ----------------------------------------------------------------------------

/**
 * Minimal shape needed for membership. The full Farm entity lives in
 * spatial.types.ts; this is a forward declaration to avoid circular imports.
 */
export type FarmRef = {
  id: string;
  ownerId: string;
  name: string;
};

// ----------------------------------------------------------------------------
// Membership — the RBAC pivot
// ----------------------------------------------------------------------------

export type MembershipStatus =
  | "invited" // invitation sent, not accepted yet
  | "active" // accepted and valid
  | "revoked"; // access removed

export interface Membership {
  id: string;
  userId: string;
  farmId: string;
  role: MembershipRole;
  status: MembershipStatus;
  invitedBy?: string; // userId who sent the invitation
  invitedAt?: string;
  acceptedAt?: string;
  revokedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Invitations (separate from Membership for security)
// ----------------------------------------------------------------------------

/**
 * Invitation to join a farm. Converted into a Membership once accepted.
 * Stored separately so a stolen invitation cannot be replayed after use.
 */
export interface Invitation {
  id: string;
  farmId: string;
  email: string; // invitee email
  role: MembershipRole;
  token: string; // single-use, hashed
  invitedBy: string; // userId
  expiresAt: string; // ISO 8601
  acceptedAt?: string;
  revokedAt?: string;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Sessions (only if using JWT with refresh tokens)
// ----------------------------------------------------------------------------

/**
 * A refresh session. Access tokens are short-lived and stateless;
 * refresh tokens are tracked here so they can be revoked.
 */
export interface Session {
  id: string;
  userId: string;
  refreshTokenHash: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: string;
  revokedAt?: string;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Audit log (lightweight, for compliance and debugging)
// ----------------------------------------------------------------------------

export type AuditAction =
  | "user.registered"
  | "user.logged_in"
  | "user.logged_out"
  | "user.password_changed"
  | "user.deleted"
  | "farm.created"
  | "farm.deleted"
  | "membership.invited"
  | "membership.accepted"
  | "membership.revoked"
  | "membership.role_changed";

export interface AuditLogEntry {
  id: string;
  actorId: string; // userId who performed the action
  action: AuditAction;
  targetType?: "user" | "farm" | "membership" | "invitation";
  targetId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Auth payloads (for API)
// ----------------------------------------------------------------------------

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  locale?: string;
  timezone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  mfaCode?: string;
}

export interface AuthTokens {
  accessToken: string; // short-lived (15 min)
  refreshToken: string; // long-lived (30 days)
  expiresIn: number; // seconds
}

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
  memberships: Membership[];
}

// ----------------------------------------------------------------------------
// Permission helpers (types only; runtime lives in packages/utils)
// ----------------------------------------------------------------------------

/**
 * Actions that can be gated by role.
 * Kept as a union so the permission matrix is type-safe.
 */
export type PermissionAction =
  | "farm.read"
  | "farm.update"
  | "farm.delete"
  | "membership.read"
  | "membership.invite"
  | "membership.revoke"
  | "membership.update_role"
  | "zone.create"
  | "zone.update"
  | "zone.delete"
  | "plant.create"
  | "plant.update"
  | "plant.delete"
  | "observation.create"
  | "observation.update"
  | "observation.delete"
  | "input.create"
  | "irrigation.create"
  | "harvest.create"
  | "report.export";

/**
 * Role → allowed actions. This is the source of truth for RBAC.
 * Runtime enforcement lives in packages/utils (hasPermission()).
 */
export type PermissionMatrix = Record<MembershipRole, PermissionAction[]>;

// ----------------------------------------------------------------------------
// Lookups
// ----------------------------------------------------------------------------

export type UserId = User["id"];
export type MembershipId = Membership["id"];
export type InvitationId = Invitation["id"];
export type SessionId = Session["id"];
