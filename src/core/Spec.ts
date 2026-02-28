import type { SpecDefinition, SpecOptions, Requirement, Constraint } from './types.js';

export class Spec {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  description?: string;
  schema?: object;
  requirements: Requirement[];
  constraints: Constraint[];
  metadata: Record<string, unknown>;
  private options: SpecOptions;

  constructor(definition: SpecDefinition, options: SpecOptions = {}) {
    this.options = {
      validateOnChange: true,
      strictMode: false,
      autoGenerateId: true,
      ...options,
    };

    this.id = definition.id;
    this.name = definition.name;
    this.version = definition.version;
    this.description = definition.description;
    this.schema = definition.schema;
    this.requirements = definition.requirements || [];
    this.constraints = definition.constraints || [];
    this.metadata = definition.metadata || {};
  }

  static create(definition: Partial<SpecDefinition> & { name: string }, options?: SpecOptions): Spec {
    const id = definition.id || (options?.autoGenerateId ? crypto.randomUUID() : `spec-${Date.now()}`);
    const specDefinition: SpecDefinition = {
      id,
      name: definition.name,
      version: definition.version || '1.0.0',
      description: definition.description,
      schema: definition.schema,
      requirements: definition.requirements,
      constraints: definition.constraints,
      metadata: definition.metadata,
    };
    return new Spec(specDefinition, options);
  }

  addRequirement(requirement: Omit<Requirement, 'id'>): Requirement {
    const req: Requirement = {
      ...requirement,
      id: `req-${this.requirements.length + 1}`,
    };
    this.requirements.push(req);
    return req;
  }

  updateRequirement(id: string, updates: Partial<Requirement>): Requirement | null {
    const index = this.requirements.findIndex(r => r.id === id);
    if (index === -1) return null;
    this.requirements[index] = { ...this.requirements[index], ...updates };
    return this.requirements[index];
  }

  removeRequirement(id: string): boolean {
    const index = this.requirements.findIndex(r => r.id === id);
    if (index === -1) return false;
    this.requirements.splice(index, 1);
    return true;
  }

  addConstraint(constraint: Omit<Constraint, 'id'>): Constraint {
    const cons: Constraint = {
      ...constraint,
      id: `constraint-${this.constraints.length + 1}`,
    };
    this.constraints.push(cons);
    return cons;
  }

  getRequirementById(id: string): Requirement | undefined {
    return this.requirements.find(r => r.id === id);
  }

  getRequirementsByStatus(status: Requirement['status']): Requirement[] {
    return this.requirements.filter(r => r.status === status);
  }

  getRequirementsByPriority(priority: Requirement['priority']): Requirement[] {
    return this.requirements.filter(r => r.priority === priority);
  }

  getCompletedRequirements(): Requirement[] {
    return this.requirements.filter(r => r.status === 'completed' || r.status === 'verified');
  }

  getPendingRequirements(): Requirement[] {
    return this.requirements.filter(r => r.status === 'pending' || r.status === 'in_progress');
  }

  getConstraintsByType(type: Constraint['type']): Constraint[] {
    return this.constraints.filter(c => c.type === type);
  }

  getCriticalConstraints(): Constraint[] {
    return this.constraints.filter(c => c.severity === 'critical');
  }

  toJSON(): SpecDefinition {
    return {
      id: this.id,
      name: this.name,
      version: this.version,
      description: this.description,
      schema: this.schema,
      requirements: this.requirements,
      constraints: this.constraints,
      metadata: this.metadata,
    };
  }

  toYAML(): string {
    const obj = this.toJSON();
    return YAML.stringify(obj);
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.name || this.name.trim() === '') {
      errors.push('Spec name is required');
    }

    if (!this.version) {
      errors.push('Spec version is required');
    }

    if (this.options.strictMode) {
      if (this.requirements.length === 0) {
        errors.push('Strict mode: at least one requirement is required');
      }

      const untestableRequirements = this.requirements.filter(r => !r.testable && r.status !== 'completed');
      if (untestableRequirements.length > 0) {
        errors.push(`Strict mode: ${untestableRequirements.length} requirement(s) are not testable`);
      }

      const requirementsWithoutCriteria = this.requirements.filter(r => !r.acceptanceCriteria || r.acceptanceCriteria.length === 0);
      if (requirementsWithoutCriteria.length > 0) {
        errors.push(`Strict mode: ${requirementsWithoutCriteria.length} requirement(s) lack acceptance criteria`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

import { YAML } from '../deps.js';
