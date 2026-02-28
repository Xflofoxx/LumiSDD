import { describe, it, expect, beforeEach } from 'vitest';
import { Spec } from '../src/core/Spec.js';
import { SpecRegistry } from '../src/core/SpecRegistry.js';
import { JsonSchemaValidator } from '../src/validators/JsonSchemaValidator.js';
import { OpenApiValidator } from '../src/validators/OpenApiValidator.js';
import { TypeScriptGenerator } from '../src/generators/TypeScriptGenerator.js';
import { MarkdownGenerator } from '../src/generators/MarkdownGenerator.js';
import { ComplianceTracker } from '../src/trackers/ComplianceTracker.js';

describe('Spec', () => {
  let spec: Spec;

  beforeEach(() => {
    spec = Spec.create({
      name: 'TestSpec',
      version: '1.0.0',
      description: 'A test specification',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' }
        },
        required: ['id', 'name']
      },
      requirements: [
        {
          id: 'req-001',
          description: 'Test requirement',
          priority: 'high',
          status: 'pending',
          testable: true,
          acceptanceCriteria: ['Criterion 1', 'Criterion 2']
        }
      ],
      constraints: [
        {
          id: 'constraint-001',
          type: 'performance',
          description: 'Response time must be under 100ms',
          expression: 'responseTime < 100',
          severity: 'critical'
        }
      ]
    });
  });

  it('should create a spec with auto-generated ID', () => {
    expect(spec.id).toBeDefined();
    expect(spec.name).toBe('TestSpec');
    expect(spec.version).toBe('1.0.0');
  });

  it('should add a requirement', () => {
    const req = spec.addRequirement({
      description: 'New requirement',
      priority: 'medium',
      status: 'pending',
      testable: true
    });
    expect(req.id).toContain('req-');
    expect(spec.requirements.length).toBe(2);
  });

  it('should update a requirement', () => {
    const updated = spec.updateRequirement('req-001', { status: 'completed' });
    expect(updated?.status).toBe('completed');
  });

  it('should remove a requirement', () => {
    const removed = spec.removeRequirement('req-001');
    expect(removed).toBe(true);
    expect(spec.requirements.length).toBe(0);
  });

  it('should validate spec', () => {
    const result = spec.validate();
    expect(result.valid).toBe(true);
  });

  it('should serialize to JSON', () => {
    const json = spec.toJSON();
    expect(json.name).toBe('TestSpec');
    expect(json.requirements.length).toBe(1);
  });
});

describe('SpecRegistry', () => {
  let registry: SpecRegistry;

  beforeEach(() => {
    registry = new SpecRegistry();
  });

  it('should register and retrieve specs', () => {
    const spec = Spec.create({ name: 'TestSpec', version: '1.0.0' });
    registry.register(spec);
    expect(registry.get(spec.id)).toBeDefined();
  });

  it('should generate compliance report', () => {
    const spec = Spec.create({
      name: 'TestSpec',
      version: '1.0.0',
      requirements: [
        {
          id: 'req-001',
          description: 'Test',
          priority: 'high',
          status: 'completed',
          testable: true
        }
      ]
    });
    registry.register(spec);
    
    const report = registry.generateComplianceReport(spec.id);
    expect(report.totalRequirements).toBe(1);
    expect(report.completedRequirements).toBe(1);
  });
});

describe('JsonSchemaValidator', () => {
  it('should validate data against schema', () => {
    const validator = new JsonSchemaValidator();
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' }
      },
      required: ['name']
    };

    const validData = { name: 'John', age: 30 };
    const result = validator.validateJsonSchema(validData, schema);
    expect(result.valid).toBe(true);
  });

  it('should reject invalid data', () => {
    const validator = new JsonSchemaValidator();
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' }
      },
      required: ['name']
    };

    const invalidData = { age: 30 };
    const result = validator.validateJsonSchema(invalidData, schema);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

describe('OpenApiValidator', () => {
  it('should validate OpenAPI document', () => {
    const validator = new OpenApiValidator();
    const openApiDoc = {
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0'
      },
      paths: {}
    };

    const result = validator.validateOpenApi(openApiDoc);
    expect(result.valid).toBe(true);
  });

  it('should reject invalid OpenAPI document', () => {
    const validator = new OpenApiValidator();
    const invalidDoc = {
      info: {
        title: 'Test API'
      }
    };

    const result = validator.validateOpenApi(invalidDoc);
    expect(result.valid).toBe(false);
  });
});

describe('TypeScriptGenerator', () => {
  it('should generate TypeScript code', () => {
    const spec = Spec.create({
      name: 'User',
      version: '1.0.0',
      description: 'User model',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' }
        },
        required: ['id', 'name', 'email']
      }
    });

    const generator = new TypeScriptGenerator();
    const result = generator.generate(spec);
    
    expect(result.language).toBe('typescript');
    expect(result.code).toContain('User');
    expect(result.code).toContain('interface');
  });
});

describe('MarkdownGenerator', () => {
  it('should generate Markdown documentation', () => {
    const spec = Spec.create({
      name: 'TestSpec',
      version: '1.0.0',
      description: 'Test specification',
      requirements: [
        {
          id: 'req-001',
          description: 'First requirement',
          priority: 'high',
          status: 'completed',
          testable: true
        }
      ]
    });

    const generator = new MarkdownGenerator();
    const result = generator.generate(spec);
    
    expect(result.language).toBe('markdown');
    expect(result.code).toContain('# TestSpec');
    expect(result.code).toContain('Requirements');
  });
});

describe('ComplianceTracker', () => {
  let registry: SpecRegistry;
  let tracker: ComplianceTracker;
  let spec: Spec;

  beforeEach(() => {
    registry = new SpecRegistry();
    tracker = new ComplianceTracker(registry);
    
    spec = Spec.create({
      name: 'TestSpec',
      version: '1.0.0',
      requirements: [
        {
          id: 'req-001',
          description: 'Test requirement',
          priority: 'high',
          status: 'pending',
          testable: true
        }
      ]
    });
    registry.register(spec);
  });

  it('should track requirement status changes', () => {
    tracker.trackChange(spec.id, 'req-001', 'completed', 'All tests passed');
    
    const history = tracker.getHistory(spec.id);
    expect(history.length).toBe(1);
    expect(history[0].newStatus).toBe('completed');
  });

  it('should generate compliance report', () => {
    tracker.trackChange(spec.id, 'req-001', 'verified', 'Verified by QA');
    
    const report = tracker.generateReport(spec.id);
    expect(report.compliancePercentage).toBe(100);
  });

  it('should detect fully compliant specs', () => {
    tracker.trackChange(spec.id, 'req-001', 'verified');
    
    expect(tracker.isFullyCompliant(spec.id)).toBe(true);
  });
});
