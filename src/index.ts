import { Spec } from './core/Spec.js';
import { SpecValidator } from './validators/SpecValidator.js';
import { JsonSchemaValidator } from './validators/JsonSchemaValidator.js';
import { OpenApiValidator } from './validators/OpenApiValidator.js';
import { CodeGenerator } from './generators/CodeGenerator.js';
import { TypeScriptGenerator } from './generators/TypeScriptGenerator.js';
import { MarkdownGenerator } from './generators/MarkdownGenerator.js';
import { ComplianceTracker } from './trackers/ComplianceTracker.js';
import { SpecRegistry } from './core/SpecRegistry.js';

export {
  Spec,
  SpecValidator,
  JsonSchemaValidator,
  OpenApiValidator,
  CodeGenerator,
  TypeScriptGenerator,
  MarkdownGenerator,
  ComplianceTracker,
  SpecRegistry,
};

export type { SpecOptions, SpecDefinition, ValidationResult, ComplianceReport } from './core/types.js';
