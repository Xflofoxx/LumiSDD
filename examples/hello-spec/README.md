# Hello Spec Example

**Project:** LUMISD-001  
**Version:** 1.0.0  
**Date:** 2026-03-01

---

## Overview

This example demonstrates how to use LumiSDD to define specifications and generate code from them.

The **HelloSpec** is a simple greeting specification that demonstrates:
- JSON Schema definition
- Requirements tracking
- Constraints specification
- TypeScript code generation

---

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

---

## Structure

```
examples/hello-spec/
├── spec.yaml          # Specification definition (REQ-HELLO-*)
├── README.md          # This file
├── generate.sh        # Generation script
└── generated/         # Generated output (to be created)
    ├── types.ts       # TypeScript interfaces
    ├── validator.ts   # Validation functions
    └── README.md      # Generated documentation
```

---

## Specification

### Schema

See `spec.yaml` for the complete JSON Schema definition.

### Requirements

| ID | Description | Priority | Status |
|----|-------------|----------|--------|
| REQ-HELLO-001 | Display greeting in selected language | high | completed |
| REQ-HELLO-002 | Support multiple languages (en, it, es, fr, de) | medium | completed |
| REQ-HELLO-003 | Add timestamp to greeting | low | pending |

### Constraints

| ID | Type | Description | Severity |
|----|------|-------------|----------|
| CON-HELLO-001 | performance | Generation within 100ms | warning |
| CON-HELLO-002 | technical | Max 100 characters | critical |

---

## Usage

### Generate Code

```bash
cd examples/hello-spec
chmod +x generate.sh
./generate.sh
```

This will create the `generated/` directory with:
- `types.ts` - TypeScript interfaces
- `validator.ts` - Validation functions

---

## PM² Mapping

This example follows PM² methodology:

- **Initiating**: Specification defined in `spec.yaml`
- **Planning**: Requirements and acceptance criteria documented
- **Executing**: Code generated from specification
- **Closing**: Verified against requirements

---

## Learn More

- [LumiSDD Documentation](../docs/getting-started.md)
- [PM² Resources](../docs/pm2/)
