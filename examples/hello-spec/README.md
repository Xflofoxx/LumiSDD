# Hello Spec Example

This example demonstrates how to use LumiSDD to define specifications and generate code from them.

## Overview

The **HelloSpec** is a simple greeting specification that demonstrates:
- JSON Schema definition
- Requirements tracking
- Constraints specification
- TypeScript code generation

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Run the Generator

```bash
cd examples/hello-spec
chmod +x generate.sh
./generate.sh
```

This will:
1. Load the specification from `spec.yaml`
2. Generate TypeScript types in `generated/types.ts`
3. Generate validator functions in `generated/validator.ts`
4. Generate documentation in `generated/README.md`

## Specification Structure

### Schema

```yaml
schema:
  type: object
  properties:
    message:
      type: string
      minLength: 1
      maxLength: 100
    language:
      type: string
      enum: [en, it, es, fr, de]
  required:
    - message
```

### Requirements

| ID | Description | Priority | Status |
|----|-------------|----------|--------|
| REQ-HELLO-001 | Display greeting in selected language | high | completed |
| REQ-HELLO-002 | Support multiple languages | medium | completed |
| REQ-HELLO-003 | Add timestamp to greeting | low | pending |

### Constraints

| ID | Type | Description | Severity |
|----|------|-------------|----------|
| CON-HELLO-001 | performance | Generation within 100ms | warning |
| CON-HELLO-002 | technical | Max 100 chars | critical |

## Using Generated Code

```typescript
import { validateHelloSpec, createGreeting } from './generated/validator';
import type { HelloSpec } from './generated/types';

// Create a greeting
const greeting = createGreeting({
  message: 'Hello, World!',
  language: 'en'
});

// Validate
if (validateHelloSpec(greeting)) {
  console.log(greeting.message); // "Hello, World!"
  console.log(greeting.language); // "en"
  console.log(greeting.timestamp); // "2026-02-28T..."
}
```

## PM² Mapping

This example follows PM² methodology:

- **Initiating**: Specification defined in `spec.yaml`
- **Planning**: Requirements and acceptance criteria documented
- **Executing**: Code generated from specification
- **Closing**: Verified against requirements

## Files

```
examples/hello-spec/
├── spec.yaml          # Specification definition
├── generate.sh       # Generation script
├── README.md         # This file
└── generated/        # Generated output
    ├── types.ts
    ├── validator.ts
    └── README.md
```

## Learn More

- [LumiSDD Documentation](../docs/getting-started.md)
- [PM² Resources](../docs/pm2/)
- [Full Specification Guide](../SPEC.md)
