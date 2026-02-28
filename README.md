# LumiSDD - Spec Driven Development Framework

[![CI](https://github.com/Xflofoxx/LumiSDD/actions/workflows/ci.yml/badge.svg)](https://github.com/Xflofoxx/LumiSDD/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@xflofoxx/LumiSDD)](https://www.npmjs.com/package/@xflofoxx/LumiSDD)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178c6.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![PM2](https://img.shields.io/badge/PM2-Compliant-purple.svg)](#)

## About LumiSDD

**LumiSDD** (Lightweight Methodology for Spec-Driven Development) is a lightweight, type-safe framework for modern software engineering that brings **Spec-Driven Development (SDD)** to life. Built with TypeScript and designed for developers who want specification-based development with integrated **PM² project management methodology**.

### What is Spec-Driven Development?

Spec-Driven Development (SDD) is an approach where specifications are treated as first-class citizens in the software development lifecycle:

1. **Define First** - Create clear specifications before implementation
2. **Validate Automatically** - Use schemas to validate data automatically  
3. **Generate Code** - Auto-generate types and documentation from specs
4. **Track Compliance** - Monitor requirement fulfillment over time

### Why LumiSDD?

| Traditional Development | LumiSDD Approach |
|----------------------|-------------------|
| Code-centric | Specification-centric |
| Documentation as afterthought | Documentation generated |
| Manual validation | Automated schema validation |
| Unclear requirements | Tracked, verifiable requirements |
| Ad-hoc processes | PM² methodology integration |

## Key Features

### 📋 Spec Management
- Create specifications with requirements, constraints, and metadata
- Support for JSON Schema and OpenAPI specifications
- Version management with semver
- Strict and flexible modes

### ✅ Schema Validation
- Built-in JSON Schema validation (Draft-07, 2020-12)
- OpenAPI 2.0, 3.0, 3.1 specification validation
- Custom validators extensible

### 💻 Code Generation
- **TypeScript** type definitions from specs
- **Markdown** documentation generation
- Customizable generators

### 📊 Compliance Tracking
- Track requirement status (pending, in progress, completed, verified)
- Generate compliance reports
- Identify critical pending items

### 🏛️ PM² Integration
- Full PM² methodology workflow support
- Project Charter, Handbook, Work Plan management
- Phase gates (Initiating → Planning → Executing → Closing)
- Stakeholder and risk management

### 🔒 Type Safety
- Full TypeScript support with strict typing
- Generated type definitions
- Compile-time error detection

## Quick Start

### Installation

```bash
npm install @xflofoxx/LumiSDD
```

### Basic Usage

```typescript
import { Spec, SpecRegistry, TypeScriptGenerator, JsonSchemaValidator, ComplianceTracker } from '@xflofoxx/LumiSDD';

// 1. Create a specification
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
    id: 'REQ-001',
    description: 'User can register with valid email',
    priority: 'high',
    status: 'completed',
    testable: true,
    acceptanceCriteria: ['Email is validated', 'User is persisted']
  }]
});

// 2. Register the spec
const registry = new SpecRegistry();
registry.register(spec);

// 3. Generate TypeScript types
const generator = new TypeScriptGenerator();
console.log(generator.generate(spec).code);

// 4. Validate data against schema
const validator = new JsonSchemaValidator();
const result = validator.validateJsonSchema(
  { id: '1', name: 'John', email: 'john@example.com' },
  spec.schema!
);
console.log('Valid:', result.valid);

// 5. Track compliance
const tracker = new ComplianceTracker(registry);
tracker.trackChange(spec.id, 'REQ-001', 'verified');
const report = tracker.generateReport(spec.id);
console.log(`Compliance: ${report.compliancePercentage}%`);
```

## Use Cases

### API Development
Define your API specification once, generate types and validators automatically.

### Data Validation
Use JSON Schema for runtime validation with automatic type generation.

### Requirements Management
Track requirements from specification to implementation with compliance reports.

### Project Management
Apply PM² methodology with built-in workflow and artifact templates.

## PM² Methodology

This project follows the **PM² Project Management Methodology** developed by the European Commission:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Initiating  │────▶│  Planning   │────▶│ Executing   │────▶│  Closing    │
│             │     │             │     │             │     │             │
│ • Charter   │     │ • Handbook  │     │ • Deliver   │     │ • End Report│
│ • Stakehold │     │ • Work Plan │     │ • Monitor   │     │ • Lessons   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

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

- [Hello Spec](examples/hello-spec/) - Basic specification example

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
│   ├── Spec.ts    # Specification class with requirements/constraints
│   ├── SpecRegistry.ts  # Registry for managing multiple specs
│   └── types.ts   # TypeScript interfaces
├── validators/     # Schema validators
│   ├── SpecValidator.ts    # Base validator using Ajv
│   ├── JsonSchemaValidator.ts  # JSON Schema validation
│   └── OpenApiValidator.ts    # OpenAPI validation
├── generators/     # Code generators
│   ├── CodeGenerator.ts      # Base generator class
│   ├── TypeScriptGenerator.ts  # TypeScript type generation
│   └── MarkdownGenerator.ts   # Markdown documentation
├── trackers/      # Compliance tracking
│   └── ComplianceTracker.ts  # Track requirement compliance
└── pm2/          # PM² methodology integration
    ├── PM2Workflow.ts  # PM² workflow implementation
    └── types.ts       # PM² types (phases, roles, deliverables)
```

## Philosophy

```
→ lightweight not complex
→ iterative not waterfall  
→ type-safe not loose
→ standards-compliant not proprietary
→ extensible not rigid
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

**Xflofoxx** - Creator and maintainer

## Acknowledgments

- Inspired by [OpenSpec](https://github.com/Fission-AI/OpenSpec)
- Built with [Ajv](https://ajv.js.org/) for JSON Schema validation
- Follows [PM² Methodology](https://pm2.europa.eu/) by European Commission
