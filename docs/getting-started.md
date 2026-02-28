# Getting Started with LumiSDD

## Installation

```bash
npm install lumisdk
```

## Basic Usage

### Creating a Specification

```typescript
import { Spec } from 'lumisdk';

const spec = Spec.create({
  name: 'MyAPI',
  version: '1.0.0',
  description: 'My API specification',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' }
    },
    required: ['id', 'name']
  }
});
```

### Adding Requirements

```typescript
spec.addRequirement({
  description: 'User can create an account',
  priority: 'high',
  status: 'pending',
  testable: true,
  acceptanceCriteria: [
    'Email is validated',
    'Password meets security requirements'
  ]
});
```

### Validating Data

```typescript
import { JsonSchemaValidator } from 'lumisdk';

const validator = new JsonSchemaValidator();
const result = validator.validateJsonSchema(data, spec.schema!);

if (!result.valid) {
  console.log(result.errors);
}
```

### Generating Code

```typescript
import { TypeScriptGenerator } from 'lumisdk';

const generator = new TypeScriptGenerator();
const code = generator.generate(spec);
console.log(code.code);
```

### Tracking Compliance

```typescript
import { SpecRegistry, ComplianceTracker } from 'lumisdk';

const registry = new SpecRegistry();
registry.register(spec);

const tracker = new ComplianceTracker(registry);
tracker.trackChange(spec.id, 'req-001', 'completed', 'All tests passed');

const report = tracker.generateReport(spec.id);
console.log(`Compliance: ${report.compliancePercentage}%`);
```

## Next Steps

- See [API Reference](api.md) for detailed documentation
- Check [Examples](examples.md) for more use cases
