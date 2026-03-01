# User CRUD Service Example

**Project:** LUMISD-001  
**Version:** 1.0.0  
**Date:** 2026-03-01

---

## Overview

This example demonstrates a complete **User management REST API** specification with CRUD operations. It's designed for developers who want to see how to spec a real-world service.

**What you'll learn:**
- How to define a complete REST API specification
- How to document security and validation requirements
- How to use constraints for performance and security

---

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- LumiSDD built (`npm run build`)

---

## Structure

```
examples/user-crud/
├── spec.yaml    # User CRUD specification (REQ-UC-001 to REQ-UC-007)
└── README.md   # This file
```

---

## Specification

This example defines a complete User service with:

### Data Model

```typescript
interface User {
  id: string;           // UUID
  email: string;         // RFC 5322 format
  username: string;     // 3-50 chars, alphanumeric
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'user' | 'guest';
  isActive: boolean;
  createdAt: string;   // ISO 8601
  updatedAt: string;
}
```

### API Endpoints

| ID | Operation | HTTP Method | Endpoint |
|----|-----------|-------------|----------|
| REQ-UC-001 | Create user | POST | /users |
| REQ-UC-002 | Get user by ID | GET | /users/:id |
| REQ-UC-003 | List users | GET | /users |
| REQ-UC-004 | Update user | PUT | /users/:id |
| REQ-UC-005 | Soft delete | DELETE | /users/:id |
| REQ-UC-006 | Permanent delete | DELETE | /users/:id?permanent=true |
| REQ-UC-007 | Search users | GET | /users?search=... |

---

## Requirements

| ID | Description | Priority | Status |
|----|-------------|----------|--------|
| REQ-UC-001 | Create user with unique email/username | high | pending |
| REQ-UC-002 | Retrieve user by UUID | high | pending |
| REQ-UC-003 | List with pagination and sorting | high | pending |
| REQ-UC-004 | Update existing user fields | high | pending |
| REQ-UC-005 | Soft delete (set isActive=false) | high | pending |
| REQ-UC-006 | Permanent delete from database | medium | pending |
| REQ-UC-007 | Search by username, email, or role | medium | pending |

---

## Constraints

| ID | Type | Description | Severity |
|----|------|-------------|----------|
| CON-UC-001 | performance | API response <200ms | warning |
| CON-UC-002 | security | Email uniqueness | critical |
| CON-UC-003 | security | Username uniqueness | critical |
| CON-UC-004 | validation | RFC 5322 email format | critical |
| CON-UC-005 | validation | Alphanumeric + underscore only | critical |
| CON-UC-006 | security | Password must be hashed | critical |

---

## Usage

This is a specification-only example. To see the full workflow with code generation, see the [E2E Example](../e2e-hello/).

---

## Principles Demonstrated

1. **Define First** - The API is fully specified before any code
2. **Validate Automatically** - Constraints become runtime checks
3. **Track Compliance** - Each requirement has a status

---

## Learn More

- [Examples Hub](../README.md)
- [LumiSDD Documentation](../docs/getting-started.md)
- [PM² Resources](../docs/pm2/)
