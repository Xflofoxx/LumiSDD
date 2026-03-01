/**
 * Auto-generated TypeScript types from User CRUD Service Specification
 * Source: examples/user-crud/spec.yaml
 * Generated: 2026-03-01
 */

// req: REQ-UC-001, REQ-UC-002, REQ-UC-003, REQ-UC-004, REQ-UC-005, REQ-UC-006
export interface User {
  id: string; // UUID format
  email: string; // RFC 5322 email format
  username: string; // Alphanumeric with underscores, 3-50 chars
  firstName?: string; // Max 100 chars
  lastName?: string; // Max 100 chars
  role: UserRole; // admin, user, guest
  isActive: boolean; // Default: true
  createdAt: string; // ISO 8601 datetime
  updatedAt: string; // ISO 8601 datetime
}

// req: REQ-UC-001
export type UserRole = 'admin' | 'user' | 'guest';

// req: REQ-UC-001
export interface CreateUserInput {
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  password?: string; // Will be hashed before storage
}

// req: REQ-UC-004
export interface UpdateUserInput {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isActive?: boolean;
}

// req: REQ-UC-002
export interface UserResponse {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// req: REQ-UC-003, REQ-UC-007
export interface UserListParams {
  page?: number; // Default: 1
  limit?: number; // Default: 20, Max: 100
  sortBy?: keyof User;
  order?: 'asc' | 'desc';
  search?: string; // Partial match on username or email
  role?: UserRole;
  includeInactive?: boolean; // Include inactive users in results
}

// req: REQ-UC-003
export interface UserListResponse {
  data: UserResponse[];
  pagination: PaginationInfo;
}

// req: REQ-UC-003
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// req: REQ-UC-001, REQ-UC-002, REQ-UC-003, REQ-UC-004, REQ-UC-005, REQ-UC-006
export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

// req: REQ-UC-001, REQ-UC-002, REQ-UC-003, REQ-UC-004, REQ-UC-005, REQ-UC-006
export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'DUPLICATE_EMAIL'
  | 'DUPLICATE_USERNAME'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INTERNAL_ERROR';

// Validation type guards
// req: CON-UC-004
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// req: CON-UC-005
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  return usernameRegex.test(username) && username.length >= 3 && username.length <= 50;
}

// req: CON-UC-001
export function isValidUserId(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}
