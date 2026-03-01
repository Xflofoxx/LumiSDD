# User CRUD Service Example

**Project:** LUMISD-001  
**Version:** 1.0.0  
**Date:** 2026-03-01

---

## Overview

This example demonstrates a complete User management service specification with CRUD operations.

---

## Structure

```
examples/user-crud/
├── spec.yaml    # User CRUD specification
└── README.md    # This file
```

---

## Requirements

| ID | Operation | Priority | Status |
|----|-----------|----------|--------|
| REQ-UC-001 | Create user | high | pending |
| REQ-UC-002 | Get user by ID | high | pending |
| REQ-UC-003 | List users (paginated) | high | pending |
| REQ-UC-004 | Update user | high | pending |
| REQ-UC-005 | Soft delete user | high | pending |
| REQ-UC-006 | Permanent delete | medium | pending |
| REQ-UC-007 | Search users | medium | pending |

---

## Constraints

| ID | Type | Description | Severity |
|----|------|-------------|----------|
| CON-UC-001 | performance | Response time <200ms | warning |
| CON-UC-002 | security | Unique email | critical |
| CON-UC-003 | security | Unique username | critical |
| CON-UC-004 | validation | Valid email format | critical |
| CON-UC-005 | validation | Valid username format | critical |
| CON-UC-006 | security | Password hashing required | critical |

---

## Learn More

- [LumiSDD Documentation](../docs/getting-started.md)
- [PM² Resources](../docs/pm2/)
