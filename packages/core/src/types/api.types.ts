// packages/core/src/types/api.types.ts

// ============================================================================
// SikeliaSoil — API contracts
// ----------------------------------------------------------------------------
// Generic DTOs used across every CRUD endpoint.
// Keeps apps/backend + apps/web aligned without duplicating shapes.
//
// Design principles:
//   - Generic over entity type: Paginated<User>, ApiResult<Farm>, ...
//   - Envelope pattern: { data, meta } or { error }
//   - Cursor + offset pagination both supported
//   - Filter/sort DSL kept simple (no query language)
//   - Bulk operations first-class (bulk create/update/delete)
//   - Errors carry machine-readable codes + i18n keys
// ============================================================================

// ----------------------------------------------------------------------------
// Pagination
// ----------------------------------------------------------------------------

export type SortDirection = "asc" | "desc";

export interface SortSpec {
  field: string;
  direction: SortDirection;
}

export type PaginationMode = "offset" | "cursor";

export interface OffsetPagination {
  mode: "offset";
  limit: number;
  offset: number;
}

export interface CursorPagination {
  mode: "cursor";
  limit: number;
  cursor?: string; // opaque, usually encoded id+timestamp
}

export type Pagination = OffsetPagination | CursorPagination;

export interface Paginated<T> {
  items: T[];
  pagination: {
    mode: PaginationMode;
    limit: number;
    total?: number; // only reliable in offset mode
    offset?: number;
    cursor?: string; // current cursor
    nextCursor?: string;
    hasMore: boolean;
  };
}

// ----------------------------------------------------------------------------
// Filters
// ----------------------------------------------------------------------------

export type FilterOperator =
  | "eq"
  | "neq"
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "in"
  | "nin"
  | "like"
  | "ilike"
  | "is_null"
  | "is_not_null"
  | "between";

export interface FilterClause {
  field: string;
  operator: FilterOperator;
  value?: unknown;
}

export interface ListQuery {
  pagination?: Pagination;
  sort?: SortSpec[];
  filters?: FilterClause[];
  /** Free-text search across a set of default fields */
  search?: string;
  /** Soft-delete handling */
  includeDeleted?: boolean;
  /** Field projection — only return these fields */
  fields?: string[];
}

// ----------------------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------------------

/** Strip server-managed fields from client input. */
export type CreatePayload<T> = Omit<
  T,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;

/** Everything optional except the id. */
export type UpdatePayload<T> = Partial<CreatePayload<T>>;

export interface BulkCreateRequest<T> {
  items: CreatePayload<T>[];
}

export interface BulkUpdateRequest<T> {
  items: Array<{ id: string; patch: UpdatePayload<T> }>;
}

export interface BulkDeleteRequest {
  ids: string[];
}

export interface BulkOperationResult {
  requested: number;
  succeeded: number;
  failed: number;
  errors?: Array<{
    index: number;
    id?: string;
    message: string;
    code?: string;
  }>;
}

// ----------------------------------------------------------------------------
// Response envelopes
// ----------------------------------------------------------------------------

export interface ResponseMeta {
  /** ISO 8601 */
  timestamp: string;
  /** Correlation id for tracing */
  requestId?: string;
  /** Duration in milliseconds */
  durationMs?: number;
  /** API version */
  version?: string;
}

export interface ApiSuccess<T> {
  ok: true;
  data: T;
  meta: ResponseMeta;
}

export interface ApiFailure {
  ok: false;
  error: ApiError;
  meta: ResponseMeta;
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

/**
 * Machine-readable error.
 * `code` is stable; `message` is human; `i18nKey` is for the frontend.
 */
export interface ApiError {
  code: ApiErrorCode;
  message: string;
  i18nKey?: string;
  /** Field-level validation errors */
  fields?: Array<{ field: string; message: string; code?: string }>;
  /** Optional details (never leak secrets here) */
  details?: Record<string, unknown>;
  /** Stack trace, only in dev */
  stack?: string;
}

export type ApiErrorCode =
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "validation_error"
  | "rate_limited"
  | "payload_too_large"
  | "unprocessable_entity"
  | "internal_error"
  | "service_unavailable"
  | "gateway_timeout"
  | "unknown";

/** HTTP status per error code — helper for the backend. */
export type ApiErrorStatusMap = Record<ApiErrorCode, number>;

// ----------------------------------------------------------------------------
// Auth-context payloads (used by middleware)
// ----------------------------------------------------------------------------

export interface RequestContext {
  requestId: string;
  userId?: string;
  farmId?: string; // resolved from the URL or header
  roles?: string[]; // MembershipRole[] resolved from the farm
  ipAddress?: string;
  userAgent?: string;
  locale?: string;
  timezone?: string;
}

// ----------------------------------------------------------------------------
// Common auxiliary DTOs
// ----------------------------------------------------------------------------

export interface IdParam {
  id: string;
}

export interface SlugParam {
  slug: string;
}

export interface DateRangeQuery {
  from?: string; // ISO 8601
  to?: string;
}

export interface GeoQuery {
  /** "lat,lng,radiusKm" */
  near?: string;
  /** GeoJSON bbox: [west, south, east, north] */
  bbox?: [number, number, number, number];
}

/** Generic "if-match" for optimistic concurrency. */
export interface VersionedRequest {
  /** Expected `updatedAt` value; server returns 409 if it changed. */
  ifUnmodifiedSince?: string;
}

// ----------------------------------------------------------------------------
// Health & diagnostics
// ----------------------------------------------------------------------------

export interface HealthCheck {
  status: "ok" | "degraded" | "down";
  uptimeSeconds: number;
  version: string;
  checks: Array<{
    name: string; // "db", "cache", "cdse_api", "mqtt"
    status: "ok" | "degraded" | "down";
    latencyMs?: number;
    message?: string;
  }>;
  timestamp: string;
}

export interface CapabilitiesResponse {
  apiVersion: string;
  features: {
    multiFarm: boolean;
    sso: boolean;
    auditLog: boolean;
    eoIndices: boolean;
    iotIngest: boolean;
    gnssPrecision: boolean;
    kpiCompute: boolean;
    alerts: boolean;
  };
  limits: {
    maxFarmsPerUser?: number;
    maxSensorsPerFarm?: number;
    maxReadingsPerRequest?: number;
    maxBodySizeBytes?: number;
  };
}
