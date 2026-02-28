import { SpecValidator } from './SpecValidator.js';
import type { ValidationResult, ValidationWarning } from '../core/types.js';

export class OpenApiValidator extends SpecValidator {
  constructor() {
    super();
    this.setupOpenApiKeywords();
  }

  private setupOpenApiKeywords(): void {
    this.ajv.addKeyword('example', {
      validate: () => true,
    });
  }

  validateOpenApi(data: unknown, version: '2.0' | '3.0' | '3.1' = '3.0'): ValidationResult {
    const warnings: ValidationWarning[] = [];
    const errors: ValidationResult['errors'] = [];

    if (typeof data !== 'object' || data === null) {
      return {
        valid: false,
        errors: [{ path: '/', message: 'OpenAPI document must be an object' }],
        warnings,
      };
    }

    const doc = data as Record<string, unknown>;

    if (!doc.openapi && !doc.swagger) {
      errors.push({
        path: '/',
        message: 'Missing "openapi" or "swagger" field',
      });
      return { valid: false, errors, warnings };
    }

    const openapiVersion = doc.openapi as string || doc.swagger as string;
    if (!this.isValidVersion(openapiVersion, version)) {
      errors.push({
        path: '/openapi',
        message: `Invalid OpenAPI version: ${openapiVersion}`,
      });
    }

    if (!doc.info) {
      errors.push({
        path: '/',
        message: 'Missing "info" object',
      });
    } else if (typeof doc.info === 'object') {
      const info = doc.info as Record<string, unknown>;
      if (!info.title) {
        errors.push({ path: '/info/title', message: 'Missing required field "title"' });
      }
      if (!info.version) {
        errors.push({ path: '/info/version', message: 'Missing required field "version"' });
      }
    }

    if (!doc.paths && !doc.path) {
      warnings.push({
        path: '/',
        message: 'No paths defined in the OpenAPI document',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  private isValidVersion(version: string, targetVersion: '2.0' | '3.0' | '3.1'): boolean {
    if (targetVersion === '2.0') {
      return version.startsWith('2.');
    }
    if (targetVersion === '3.0') {
      return version.startsWith('3.0');
    }
    if (targetVersion === '3.1') {
      return version.startsWith('3.1');
    }
    return version.startsWith('3.') || version.startsWith('2.');
  }

  validatePath(data: unknown, path: string): ValidationResult {
    const doc = data as Record<string, unknown>;
    const paths = doc.paths as Record<string, unknown> | undefined;

    if (!paths) {
      return {
        valid: false,
        errors: [{ path: '/paths', message: 'No paths defined' }],
        warnings: [],
      };
    }

    if (!paths[path]) {
      return {
        valid: false,
        errors: [{ path: `/paths/${path}`, message: `Path "${path}" not found` }],
        warnings: [],
      };
    }

    return { valid: true, errors: [], warnings: [] };
  }

  validateOperation(data: unknown, path: string, method: string): ValidationResult {
    const pathValidation = this.validatePath(data, path);
    if (!pathValidation.valid) {
      return pathValidation;
    }

    const doc = data as Record<string, unknown>;
    const paths = doc.paths as Record<string, Record<string, unknown>>;
    const operation = paths[path]?.[method.toLowerCase()];

    if (!operation) {
      return {
        valid: false,
        errors: [{
          path: `/paths/${path}/${method.toLowerCase()}`,
          message: `Operation "${method}" not found for path "${path}"`,
        }],
        warnings: [],
      };
    }

    return { valid: true, errors: [], warnings: [] };
  }

  extractSchemas(data: unknown): Record<string, object> {
    const doc = data as Record<string, unknown>;
    const schemas: Record<string, object> = {};

    if (doc.components?.schemas) {
      Object.assign(schemas, doc.components.schemas as Record<string, object>);
    }

    if (doc.definitions) {
      Object.assign(schemas, doc.definitions as Record<string, object>);
    }

    return schemas;
  }
}
