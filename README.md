# LumiSDD

[![CI](https://github.com/Xflofoxx/LumiSDD/actions/workflows/ci.yml/badge.svg)](https://github.com/Xflofoxx/LumiSDD/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/lumisdk)](https://www.npmjs.com/package/lumisdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178c6.svg)](https://www.typescriptlang.org/)

Lightweight Spec Driven Development framework for modern software engineering. Inspired by OpenSpec and designed for type-safe specification management.

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
npm install lumisdk
```

## Quick Start

```typescript
import { Spec, SpecRegistry, TypeScriptGenerator, MarkdownGenerator, JsonSchemaValidator, ComplianceTracker } from 'lumisdk';

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

const registry = new SpecRegistry();
registry.register(spec);

const tsGenerator = new TypeScriptGenerator();
console.log(tsGenerator.generate(spec).code);

const mdGenerator = new MarkdownGenerator();
console.log(mdGenerator.generate(spec).code);

const validator = new JsonSchemaValidator();
const result = validator.validateJsonSchema(
  { id: '1', name: 'John', email: 'john@example.com' },
  spec.schema!
);

const tracker = new ComplianceTracker(registry);
tracker.trackChange(spec.id, 'req-001', 'verified');
console.log(tracker.generateReport(spec.id).compliancePercentage);
```

## Detailed Examples

### Creating Specifications

```typescript
import { Spec } from 'lumisdk';

const apiSpec = Spec.create({
  name: 'PaymentAPI',
  version: '2.0.0',
  description: 'Payment processing API specification',
  schema: {
    type: 'object',
    properties: {
      transactionId: { type: 'string' },
      amount: { type: 'number', minimum: 0 },
      currency: { type: 'string', enum: ['USD', 'EUR', 'GBP'] },
      status: { type: 'string', enum: ['pending', 'completed', 'failed'] }
    },
    required: ['transactionId', 'amount', 'currency', 'status']
  },
  requirements: [
    {
      id: 'REQ-PAY-001',
      description: 'Process payment with valid amount',
      priority: 'critical',
      status: 'completed',
      testable: true,
      acceptanceCriteria: [
        'Amount is validated as positive number',
        'Transaction ID is generated',
        'Payment is recorded in database'
      ]
    },
    {
      id: 'REQ-PAY-002',
      description: 'Handle payment failures gracefully',
      priority: 'high',
      status: 'in_progress',
      testable: true,
      acceptanceCriteria: [
        'Error message is returned to user',
        'Failure is logged for audit'
      ]
    }
  ],
  constraints: [
    {
      id: 'CON-001',
      type: 'performance',
      description: 'Payment processing must complete within 3 seconds',
      expression: 'processingTime <= 3000',
      severity: 'critical'
    },
    {
      id: 'CON-002',
      type: 'security',
      description: 'All transactions must be encrypted',
      expression: 'encryption === true',
      severity: 'critical'
    }
  ]
});
```

### Managing Requirements

```typescript
spec.addRequirement({
  description: 'Refund can be requested for completed payments',
  priority: 'medium',
  status: 'pending',
  testable: true,
  acceptanceCriteria: [
    'User can request refund within 30 days',
    'Refund is processed within 5 business days'
  ]
});

spec.updateRequirement('REQ-PAY-001', { status: 'verified' });

const criticalReqs = spec.getRequirementsByPriority('critical');
const completedReqs = spec.getCompletedRequirements();
const pendingReqs = spec.getPendingRequirements();
```

### Validating Data

```typescript
import { JsonSchemaValidator, OpenApiValidator } from 'lumisdk';

const jsonValidator = new JsonSchemaValidator();

const userSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 100 },
    email: { type: 'string', format: 'email' },
    age: { type: 'number', minimum: 18, maximum: 150 }
  },
  required: ['name', 'email']
};

const validUser = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
};

const result = jsonValidator.validateJsonSchema(validUser, userSchema);
console.log(result.valid); // true

if (!result.valid) {
  console.log(result.errors);
}
```

### Validating OpenAPI Documents

```typescript
const openApiValidator = new OpenApiValidator();

const openApiDoc = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
    description: 'API for managing resources'
  },
  paths: {
    '/users': {
      get: {
        summary: 'List all users',
        responses: {
          '200': {
            description: 'Successful response'
          }
        }
      },
      post: {
        summary: 'Create a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object' }
            }
          }
        },
        responses: {
          '201': { description: 'User created' }
        }
      }
    }
  }
};

const validationResult = openApiValidator.validateOpenApi(openApiDoc);
console.log(validationResult.valid);
```

### Generating TypeScript Code

```typescript
import { TypeScriptGenerator } from 'lumisdk';

const generator = new TypeScriptGenerator();
const generated = generator.generate(spec);

console.log(generated.code);
// Output includes:
// - Interface definitions
// - Type definitions  
// - Enums for Priority and Status
// - Validator functions
```

### Generating Documentation

```typescript
import { MarkdownGenerator } from 'lumisdk';

const docGenerator = new MarkdownGenerator();
const documentation = docGenerator.generate(spec);

console.log(documentation.code);
// Output includes:
// - Header with version, ID
// - Overview with compliance metrics
// - Schema in JSON format
// - Requirements grouped by priority
// - Constraints grouped by type
// - Metadata
```

### Tracking Compliance

```typescript
import { SpecRegistry, ComplianceTracker } from 'lumisdk';

const registry = new SpecRegistry();
registry.register(apiSpec);

const tracker = new ComplianceTracker(registry);

tracker.trackChange(apiSpec.id, 'REQ-PAY-001', 'completed', 'All tests passed');
tracker.trackChange(apiSpec.id, 'REQ-PAY-001', 'verified', 'QA approved');

const report = tracker.generateReport(apiSpec.id);
console.log({
  total: report.totalRequirements,
  completed: report.compliancePercentage,
  pending: report.pendingItems.length,
  failed: report.failedItems.length
});

const isFullyCompliant = tracker.isFullyCompliant(apiSpec.id);
const criticalPending = tracker.getCriticalPendingItems(apiSpec.id);

const summary = tracker.getSummary();
console.log(summary.statusTransitions);
```

### Using the Registry

```typescript
const registry = new SpecRegistry();

const spec1 = Spec.create({ name: 'ServiceA', version: '1.0.0' });
const spec2 = Spec.create({ name: 'ServiceA', version: '2.0.0' });
const spec3 = Spec.create({ name: 'ServiceB', version: '1.0.0' });

registry.register(spec1);
registry.register(spec2);
registry.register(spec3);

const allSpecs = registry.getAll();
const latestSpecA = registry.getLatestVersion('ServiceA');
const serviceBSpecs = registry.getByName('ServiceB');

const report = registry.generateComplianceReport(spec1.id);
const allReports = registry.getAllComplianceReports();
```

## Configuration

### Strict Mode

Enable strict validation to enforce best practices:

```typescript
const spec = Spec.create({ name: 'Test' }, { strictMode: true });

const result = spec.validate();
if (!result.valid) {
  console.log(result.errors);
  // Requires at least one requirement
  // All requirements must be testable
  // All requirements must have acceptance criteria
}
```

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

# Typecheck
npm run typecheck
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
└── trackers/      # Compliance tracking
    └── ComplianceTracker.ts
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Xflofoxx
