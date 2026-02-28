import { Spec } from './Spec.js';
import type { SpecDefinition, ComplianceReport } from './types.js';

export class SpecRegistry {
  private specs: Map<string, Spec> = new Map();
  private versions: Map<string, string[]> = new Map();

  register(spec: Spec): void {
    if (this.specs.has(spec.id)) {
      throw new Error(`Spec with id "${spec.id}" is already registered`);
    }
    this.specs.set(spec.id, spec);

    if (!this.versions.has(spec.name)) {
      this.versions.set(spec.name, []);
    }
    const versionList = this.versions.get(spec.name)!;
    if (!versionList.includes(spec.version)) {
      versionList.push(spec.version);
      versionList.sort((a, b) => this.compareVersions(b, a));
    }
  }

  unregister(id: string): boolean {
    const spec = this.specs.get(id);
    if (!spec) return false;
    this.specs.delete(id);
    return true;
  }

  get(id: string): Spec | undefined {
    return this.specs.get(id);
  }

  getByName(name: string): Spec[] {
    return Array.from(this.specs.values()).filter(s => s.name === name);
  }

  getLatestVersion(name: string): Spec | undefined {
    const versions = this.versions.get(name);
    if (!versions || versions.length === 0) return undefined;
    const latestVersion = versions[0];
    return this.getByName(name).find(s => s.version === latestVersion);
  }

  getAll(): Spec[] {
    return Array.from(this.specs.values());
  }

  getAllIds(): string[] {
    return Array.from(this.specs.keys());
  }

  has(id: string): boolean {
    return this.specs.has(id);
  }

  size(): number {
    return this.specs.size;
  }

  clear(): void {
    this.specs.clear();
    this.versions.clear();
  }

  generateComplianceReport(specId: string): ComplianceReport {
    const spec = this.get(specId);
    if (!spec) {
      throw new Error(`Spec with id "${specId}" not found`);
    }

    const requirements = spec.requirements;
    const completedRequirements = requirements.filter(
      r => r.status === 'completed' || r.status === 'verified'
    );
    const verifiedRequirements = requirements.filter(r => r.status === 'verified');
    const pendingItems = requirements.filter(
      r => r.status === 'pending' || r.status === 'in_progress'
    );
    const failedItems = requirements.filter(r => r.status === 'rejected');

    const compliancePercentage = requirements.length > 0
      ? Math.round((completedRequirements.length / requirements.length) * 100)
      : 0;

    return {
      specId,
      timestamp: new Date().toISOString(),
      totalRequirements: requirements.length,
      completedRequirements: completedRequirements.length,
      verifiedRequirements: verifiedRequirements.length,
      compliancePercentage,
      pendingItems,
      failedItems,
    };
  }

  getAllComplianceReports(): ComplianceReport[] {
    return Array.from(this.specs.keys()).map(id => this.generateComplianceReport(id));
  }

  private compareVersions(a: string, b: string): number {
    const partsA = a.split('.').map(Number);
    const partsB = b.split('.').map(Number);
    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
      const partA = partsA[i] || 0;
      const partB = partsB[i] || 0;
      if (partA !== partB) return partA - partB;
    }
    return 0;
  }

  toJSON(): SpecDefinition[] {
    return this.getAll().map(s => s.toJSON());
  }

  static fromJSON(definitions: SpecDefinition[]): SpecRegistry {
    const registry = new SpecRegistry();
    for (const def of definitions) {
      const spec = new Spec(def);
      registry.register(spec);
    }
    return registry;
  }
}
