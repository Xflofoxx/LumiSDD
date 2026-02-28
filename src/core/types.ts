export interface SpecDefinition {
  id: string;
  name: string;
  version: string;
  description?: string;
  schema?: object;
  requirements?: Requirement[];
  constraints?: Constraint[];
  metadata?: Record<string, unknown>;
}

export interface Requirement {
  id: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'verified' | 'rejected';
  testable: boolean;
  acceptanceCriteria?: string[];
  relatedRequirements?: string[];
}

export interface Constraint {
  id: string;
  type: 'performance' | 'security' | 'compliance' | 'technical' | 'business';
  description: string;
  expression: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface SpecOptions {
  validateOnChange?: boolean;
  strictMode?: boolean;
  autoGenerateId?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  path: string;
  message: string;
  keyword?: string;
  params?: Record<string, unknown>;
}

export interface ValidationWarning {
  path: string;
  message: string;
}

export interface ComplianceReport {
  specId: string;
  timestamp: string;
  totalRequirements: number;
  completedRequirements: number;
  verifiedRequirements: number;
  compliancePercentage: number;
  pendingItems: Requirement[];
  failedItems: Requirement[];
}

export interface GeneratorOptions {
  outputPath?: string;
  template?: string;
  options?: Record<string, unknown>;
}

export interface GeneratedCode {
  language: string;
  code: string;
  mappings?: CodeMapping[];
}

export interface CodeMapping {
  specElement: string;
  generatedCode: string;
  lineStart: number;
  lineEnd: number;
}
