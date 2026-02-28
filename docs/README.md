# LumiSDD

[![CI](https://github.com/Xflofoxx/LumiSDD/actions/workflows/ci.yml/badge.svg)](https://github.com/Xflofoxx/LumiSDD/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@xflofoxx/LumiSDD)](https://www.npmjs.com/package/@xflofoxx/LumiSDD)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178c6.svg)](https://www.typescriptlang.org/)

Lightweight Spec Driven Development framework for modern software engineering.

## Philosophy

```
→ lightweight not complex
→ iterative not waterfall  
→ type-safe not loose
→ standards-compliant not proprietary
→ extensible not rigid
```

## Features

- **Spec Management** - Define specifications with requirements and constraints
- **Schema Validation** - Built-in support for JSON Schema and OpenAPI
- **Code Generation** - Generate TypeScript types and documentation from specs
- **Compliance Tracking** - Track requirement compliance over time
- **Type-safe** - Full TypeScript support with strict typing

## Installation

```bash
npm install @xflofoxx/LumiSDD
```

## Quick Start

```typescript
import { Spec, SpecRegistry, TypeScriptGenerator, MarkdownGenerator, JsonSchemaValidator, ComplianceTracker } from 'LumiSDD';

// Create a spec
const spec = Spec.create({
  name: 'UserService',
  version: '1.0.0',
  description: 'User management service specification',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' }
    },
    required: ['id', 'name', 'email']
  },
  requirements: [
    {
      id: 'req-001',
      description: 'User can be created with valid email',
      priority: 'high',
      status: 'completed',
      testable: true,
      acceptanceCriteria: ['Email format is validated', 'User is persisted']
    }
  ]
});

// Register spec
const registry = new SpecRegistry();
registry.register(spec);

// Generate TypeScript code
const tsGenerator = new TypeScriptGenerator();
const tsCode = tsGenerator.generate(spec);
console.log(tsCode.code);

// Generate Markdown documentation
const mdGenerator = new MarkdownGenerator();
const mdDoc = mdGenerator.generate(spec);
console.log(mdDoc.code);

// Validate data against schema
const validator = new JsonSchemaValidator();
const result = validator.validateJsonSchema(
  { id: '1', name: 'John', email: 'john@example.com' },
  spec.schema!
);
console.log(result.valid);

// Track compliance
const tracker = new ComplianceTracker(registry);
tracker.trackChange(spec.id, 'req-001', 'verified', 'All tests passed');
const report = tracker.generateReport(spec.id);
console.log(report.compliancePercentage);
```

## Documentation

- [Getting Started](docs/getting-started.md)
- [API Reference](docs/api.md)
- [Examples](docs/examples.md)

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Watch mode
npm run test:watch

# Lint
npm run lint
```

## Architecture

```
src/
├── core/           # Core specification classes
│   ├── Spec.ts    # Specification class
│   └── SpecRegistry.ts
├── validators/     # Schema validators
│   ├── SpecValidator.ts
│   ├── JsonSchemaValidator.ts
│   └── OpenApiValidator.ts
├── generators/     # Code generators
│   ├── CodeGenerator.ts
│   ├── TypeScriptGenerator.ts
│   └── MarkdownGenerator.ts
└── trackers/      # Compliance tracking
    └── ComplianceTracker.ts
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Xflofoxx
