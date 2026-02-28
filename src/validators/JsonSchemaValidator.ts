import { SpecValidator } from './SpecValidator.js';
import type { ValidationResult } from '../core/types.js';

export class JsonSchemaValidator extends SpecValidator {
  constructor() {
    super();
  }

  validateJsonSchema(data: unknown, schema: object): ValidationResult {
    return this.validate(data, schema);
  }

  validateAgainstDraft07(data: unknown, schema: object): ValidationResult {
    const draft07Schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      ...schema,
    };
    return this.validate(data, draft07Schema);
  }

  validateAgainstDraft202012(data: unknown, schema: object): ValidationResult {
    const draft202012Schema = {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      ...schema,
    };
    return this.validate(data, draft202012Schema);
  }

  isValidJsonSchema(schema: object): ValidationResult {
    try {
      this.ajv.compile(schema);
      return { valid: true, errors: [], warnings: [] };
    } catch (error) {
      return {
        valid: false,
        errors: [{
          path: '/',
          message: error instanceof Error ? error.message : 'Invalid JSON Schema',
        }],
        warnings: [],
      };
    }
  }

  getSchemaDefinitions(schema: object): string[] {
    const definitions: string[] = [];
    if ('$defs' in schema) {
      definitions.push(...Object.keys((schema as { $defs?: Record<string, unknown> }).$defs || {}));
    }
    if ('definitions' in schema) {
      definitions.push(...Object.keys((schema as { definitions?: Record<string, unknown> }).definitions || {}));
    }
    return definitions;
  }
}
