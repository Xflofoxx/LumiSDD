import Ajv, { type KeywordDefinition } from 'ajv';
import addFormats from 'ajv-formats';
import type { ValidationResult, ValidationError, ValidationWarning } from '../core/types.js';

export class SpecValidator {
  protected ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({ allErrors: true, verbose: true });
    addFormats(this.ajv);
  }

  validate(data: unknown, schema: object): ValidationResult {
    const validate = this.ajv.compile(schema);
    const valid = validate(data);

    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    if (!valid && validate.errors) {
      for (const error of validate.errors) {
        errors.push({
          path: error.instancePath || '/',
          message: error.message || 'Validation error',
          keyword: error.keyword,
          params: error.params as Record<string, unknown>,
        });
      }
    }

    return { valid, errors, warnings };
  }

  addKeyword(keyword: string, definition: KeywordDefinition): void {
    this.ajv.addKeyword(keyword, definition);
  }

  addSchema(schema: object, id?: string): void {
    this.ajv.addSchema(schema, id);
  }

  getSchema(id: string): object | undefined {
    return this.ajv.getSchema(id);
  }
}
