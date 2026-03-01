/**
 * User CRUD Service Implementation
 * Generated from: examples/user-crud/spec.yaml
 * Version: 1.0.0
 * 
 * This service implements the complete CRUD operations for user management.
 * Each function includes reqId comments for traceability.
 */

import type { 
  User, 
  UserRole, 
  CreateUserInput, 
  UpdateUserInput, 
  UserResponse,
  UserListParams,
  UserListResponse,
  PaginationInfo,
  ApiError,
  ErrorCode
} from './types.js';

// In-memory storage (replace with actual database in production)
// req: REQ-UC-001, REQ-UC-002, REQ-UC-003, REQ-UC-004, REQ-UC-005, REQ-UC-006, REQ-UC-007
const users: Map<string, User> = new Map();

// Validation helpers
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

// req: REQ-UC-001
export function createUser(input: CreateUserInput): UserResponse {
  // Validate email format - req: CON-UC-004
  if (!isValidEmail(input.email)) {
    throw createError('VALIDATION_ERROR', 'Invalid email format');
  }

  // Validate username format - req: CON-UC-005
  if (!isValidUsername(input.username)) {
    throw createError('VALIDATION_ERROR', 'Username must be 3-50 alphanumeric characters');
  }

  // Check email uniqueness - req: CON-UC-002
  for (const user of users.values()) {
    if (user.email === input.email) {
      throw createError('DUPLICATE_EMAIL', 'Email already exists');
    }
  }

  // Check username uniqueness - req: CON-UC-003
  for (const user of users.values()) {
    if (user.username === input.username) {
      throw createError('DUPLICATE_USERNAME', 'Username already exists');
    }
  }

  const now = new Date().toISOString();
  
  // Create user with default role - req: REQ-UC-001
  const user: User = {
    id: crypto.randomUUID(),
    email: input.email,
    username: input.username,
    firstName: input.firstName,
    lastName: input.lastName,
    role: input.role || 'user',
    isActive: true,
    createdAt: now,
    updatedAt: now
  };

  users.set(user.id, user);

  return toUserResponse(user);
}

// req: REQ-UC-002
export function getUserById(id: string): UserResponse | null {
  // Validate UUID format - req: CON-UC-001
  if (!isValidUserId(id)) {
    throw createError('VALIDATION_ERROR', 'Invalid user ID format');
  }

  const user = users.get(id);
  
  if (!user) {
    return null;
  }

  // Mask sensitive fields - req: REQ-UC-002
  return toUserResponse(user);
}

// req: REQ-UC-003
export function listUsers(params: UserListParams = {}): UserListResponse {
  let result = Array.from(users.values());

  // Filter by active status (show only active by default)
  if (params.includeInactive !== true) {
    result = result.filter(u => u.isActive);
  }

  // Search functionality - req: REQ-UC-007
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    result = result.filter(u => 
      u.username.toLowerCase().includes(searchLower) ||
      u.email.toLowerCase().includes(searchLower)
    );
  }

  // Filter by role - req: REQ-UC-007
  if (params.role) {
    result = result.filter(u => u.role === params.role);
  }

  // Sorting - req: REQ-UC-003
  const sortBy = params.sortBy || 'createdAt';
  const order = params.order || 'desc';
  
  result.sort((a, b) => {
    const aVal = (a as any)[sortBy] || '';
    const bVal = (b as any)[sortBy] || '';
    const comparison = String(aVal).localeCompare(String(bVal));
    return order === 'asc' ? comparison : -comparison;
  });

  // Pagination - req: REQ-UC-003
  const page = params.page || 1;
  const limit = Math.min(params.limit || 20, 100);
  const total = result.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  
  const paginatedData = result.slice(startIndex, startIndex + limit);

  const pagination: PaginationInfo = {
    page,
    limit,
    total,
    totalPages
  };

  return {
    data: paginatedData.map(toUserResponse),
    pagination
  };
}

// req: REQ-UC-004
export function updateUser(id: string, input: UpdateUserInput): UserResponse | null {
  // Validate UUID format - req: CON-UC-001
  if (!isValidUserId(id)) {
    throw createError('VALIDATION_ERROR', 'Invalid user ID format');
  }

  const user = users.get(id);
  
  if (!user) {
    return null;
  }

  // Check email uniqueness if changing - req: CON-UC-002
  if (input.email && input.email !== user.email) {
    if (!isValidEmail(input.email)) {
      throw createError('VALIDATION_ERROR', 'Invalid email format');
    }
    for (const u of users.values()) {
      if (u.email === input.email && u.id !== id) {
        throw createError('DUPLICATE_EMAIL', 'Email already exists');
      }
    }
  }

  // Check username uniqueness if changing - req: CON-UC-003
  if (input.username && input.username !== user.username) {
    if (!isValidUsername(input.username)) {
      throw createError('VALIDATION_ERROR', 'Username must be 3-50 alphanumeric characters');
    }
    for (const u of users.values()) {
      if (u.username === input.username && u.id !== id) {
        throw createError('DUPLICATE_USERNAME', 'Username already exists');
      }
    }
  }

  // Update only provided fields - req: REQ-UC-004
  const updatedUser: User = {
    ...user,
    ...(input.email !== undefined && { email: input.email }),
    ...(input.username !== undefined && { username: input.username }),
    ...(input.firstName !== undefined && { firstName: input.firstName }),
    ...(input.lastName !== undefined && { lastName: input.lastName }),
    ...(input.role !== undefined && { role: input.role }),
    ...(input.isActive !== undefined && { isActive: input.isActive }),
    updatedAt: new Date().toISOString()
  };

  users.set(id, updatedUser);

  return toUserResponse(updatedUser);
}

// req: REQ-UC-005
export function deleteUser(id: string, permanent: boolean = false): boolean {
  // Validate UUID format - req: CON-UC-001
  if (!isValidUserId(id)) {
    throw createError('VALIDATION_ERROR', 'Invalid user ID format');
  }

  const user = users.get(id);
  
  if (!user) {
    throw createError('NOT_FOUND', 'User not found');
  }

  if (permanent) {
    // req: REQ-UC-006
    return users.delete(id);
  } else {
    // req: REQ-UC-005 - Soft delete
    const updatedUser: User = {
      ...user,
      isActive: false,
      updatedAt: new Date().toISOString()
    };
    users.set(id, updatedUser);
    return true;
  }
}

// req: REQ-UC-007
export function searchUsers(query: string, filters?: {
  role?: UserRole;
  isActive?: boolean;
}): UserResponse[] {
  const searchLower = query.toLowerCase();
  
  let result = Array.from(users.values()).filter(u => 
    u.username.toLowerCase().includes(searchLower) ||
    u.email.toLowerCase().includes(searchLower)
  );

  if (filters?.role) {
    result = result.filter(u => u.role === filters.role);
  }

  if (filters?.isActive !== undefined) {
    result = result.filter(u => u.isActive === filters.isActive);
  }

  return result.map(toUserResponse);
}

// Helper functions

function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

function createError(code: ErrorCode, message: string): ApiError & Error {
  const error = new Error(message) as Error & ApiError;
  error.code = code;
  error.message = message;
  return error;
}

// Export for testing
export function clearUsers(): void {
  users.clear();
}

export function getUserCount(): number {
  return users.size;
}
