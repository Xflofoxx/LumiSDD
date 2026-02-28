import { SpecRegistry } from '../core/SpecRegistry.js';
import type { ComplianceReport, Requirement } from '../core/types.js';

export interface TrackingEntry {
  specId: string;
  requirementId: string;
  timestamp: string;
  previousStatus: Requirement['status'];
  newStatus: Requirement['status'];
  note?: string;
}

export interface TrackingSummary {
  totalChanges: number;
  entriesBySpec: Record<string, number>;
  statusTransitions: Record<string, number>;
}

export class ComplianceTracker {
  private registry: SpecRegistry;
  private history: TrackingEntry[] = [];

  constructor(registry: SpecRegistry) {
    this.registry = registry;
  }

  trackChange(specId: string, requirementId: string, newStatus: Requirement['status'], note?: string): void {
    const spec = this.registry.get(specId);
    if (!spec) {
      throw new Error(`Spec with id "${specId}" not found`);
    }

    const requirement = spec.getRequirementById(requirementId);
    if (!requirement) {
      throw new Error(`Requirement "${requirementId}" not found in spec "${specId}"`);
    }

    const entry: TrackingEntry = {
      specId,
      requirementId,
      timestamp: new Date().toISOString(),
      previousStatus: requirement.status,
      newStatus,
      note,
    };

    this.history.push(entry);
    spec.updateRequirement(requirementId, { status: newStatus });
  }

  getHistory(specId?: string): TrackingEntry[] {
    if (specId) {
      return this.history.filter(e => e.specId === specId);
    }
    return [...this.history];
  }

  getChangesForRequirement(specId: string, requirementId: string): TrackingEntry[] {
    return this.history.filter(
      e => e.specId === specId && e.requirementId === requirementId
    );
  }

  getSummary(): TrackingSummary {
    const summary: TrackingSummary = {
      totalChanges: this.history.length,
      entriesBySpec: {},
      statusTransitions: {},
    };

    for (const entry of this.history) {
      summary.entriesBySpec[entry.specId] = (summary.entriesBySpec[entry.specId] || 0) + 1;

      const transitionKey = `${entry.previousStatus}→${entry.newStatus}`;
      summary.statusTransitions[transitionKey] = (summary.statusTransitions[transitionKey] || 0) + 1;
    }

    return summary;
  }

  generateReport(specId: string): ComplianceReport {
    return this.registry.generateComplianceReport(specId);
  }

  getAllReports(): ComplianceReport[] {
    return this.registry.getAllComplianceReports();
  }

  getPendingItems(specId: string): Requirement[] {
    const spec = this.registry.get(specId);
    if (!spec) return [];
    return spec.getPendingRequirements();
  }

  getCompletedItems(specId: string): Requirement[] {
    const spec = this.registry.get(specId);
    if (!spec) return [];
    return spec.getCompletedRequirements();
  }

  isFullyCompliant(specId: string): boolean {
    const report = this.generateReport(specId);
    return report.compliancePercentage === 100;
  }

  getCriticalPendingItems(specId: string): Requirement[] {
    const spec = this.registry.get(specId);
    if (!spec) return [];

    return spec.requirements.filter(
      r => r.priority === 'critical' && (r.status === 'pending' || r.status === 'in_progress')
    );
  }

  clearHistory(): void {
    this.history = [];
  }

  exportHistory(): string {
    return JSON.stringify(this.history, null, 2);
  }

  importHistory(json: string): void {
    const entries = JSON.parse(json) as TrackingEntry[];
    this.history = entries;
  }
}
