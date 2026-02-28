# LumiSDD

[![CI](https://github.com/Xflofoxx/LumiSDD/actions/workflows/ci.yml/badge.svg)](https://github.com/Xflofoxx/LumiSDD/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@xflofoxx/lumisdk)](https://www.npmjs.com/package/@xflofoxx/lumisdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178c6.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Coverage](https://img.shields.io/badge/Coverment-75%25-yellow.svg)](#)
[![PM2](https://img.shields.io/badge/PM2-Compliant-purple.svg)](#)

Lightweight Spec Driven Development framework for modern software engineering with integrated PM² methodology support.

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
- **PM² Integration** - Full PM² methodology workflow support
- **Type-safe** - Full TypeScript support with strict typing

## Quick Start

### Installation

```bash
npm install @xflofoxx/lumisdk
```

### Basic Usage

```typescript
import { Spec, SpecRegistry, TypeScriptGenerator, MarkdownGenerator, JsonSchemaValidator, ComplianceTracker } from '@xflofoxx/lumisdk';

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
  requirements: [{
    id: 'req-001',
    description: 'User can be created with valid email',
    priority: 'high',
    status: 'completed',
    testable: true,
    acceptanceCriteria: ['Email format is validated', 'User is persisted']
  }]
});

// Register spec
const registry = new SpecRegistry();
registry.register(spec);

// Generate TypeScript code
const tsGenerator = new TypeScriptGenerator();
console.log(tsGenerator.generate(spec).code);

// Validate data
const validator = new JsonSchemaValidator();
const result = validator.validateJsonSchema(
  { id: '1', name: 'John', email: 'john@example.com' },
  spec.schema!
);

// Track compliance
const tracker = new ComplianceTracker(registry);
tracker.trackChange(spec.id, 'req-001', 'verified');
console.log(tracker.generateReport(spec.id).compliancePercentage);
```

## PM² Methodology

This project follows the **PM² Project Management Methodology** developed by the European Commission. See [docs/pm2/](docs/pm2/) for templates and documentation.

### PM² Resources

- [Project Initiation Canvas](docs/pm2/Project-Initiation-Canvas.md)
- [RAID Log](docs/pm2/RAID.md)
- [Traceability Matrix](tools/traceability/traceability-matrix.md)
- [PM² Guide PDF](docs/pm2/PM2-Project-Management-Guide-v3.1.pdf)

## Documentation

- [Getting Started](docs/getting-started.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

## Examples

See the [examples/](examples/) directory for working examples:

- [Hello Spec](examples/hello-spec/) - Basic spec usage

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run typecheck
npm run typecheck

# Run lint
npm run lint

# Build
npm run build

# Run examples
cd examples/hello-spec && ./generate.sh
```

## Architecture

```
src/
├── core/           # Core specification classes
│   ├── Spec.ts    # Specification class
│   ├── SpecRegistry.ts
│   └── types.ts   # TypeScript interfaces
├── validators/     # Schema validators
│   ├── SpecValidator.ts
│   ├── JsonSchemaValidator.ts
│   └── OpenApiValidator.ts
├── generators/     # Code generators
│   ├── CodeGenerator.ts
│   ├── TypeScriptGenerator.ts
│   └── MarkdownGenerator.ts
├── trackers/      # Compliance tracking
│   └── ComplianceTracker.ts
└── pm2/          # PM² methodology
    ├── PM2Workflow.ts
    └── types.ts
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Xflofoxx
