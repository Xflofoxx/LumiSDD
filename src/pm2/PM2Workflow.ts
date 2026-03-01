import { Spec } from '../core/Spec.js';
import { SpecRegistry } from '../core/SpecRegistry.js';
import type {
  PM2Phase,
  PM2Configuration,
  PM2ProjectCharter,
  PM2ProjectHandbook,
  PM2WorkPlan,
  PM2Deliverable,
  PM2Risk,
  PM2Stakeholder,
  PM2PhaseGate,
} from './types.js';
import { DEFAULT_PM2_CONFIG } from './types.js';

export class PM2Workflow {
  private registry: SpecRegistry;
  private config: PM2Configuration;
  private currentPhase: PM2Phase;
  private charter?: PM2ProjectCharter;
  private handbook?: PM2ProjectHandbook;
  private workPlan?: PM2WorkPlan;

  constructor(registry: SpecRegistry, config?: Partial<PM2Configuration>) {
    this.registry = registry;
    this.config = { ...DEFAULT_PM2_CONFIG, ...config };
    this.currentPhase = this.config.defaultPhase;
  }

  static create(projectId: string, projectName: string): PM2Workflow {
    const config: PM2Configuration = {
      ...DEFAULT_PM2_CONFIG,
      projectId,
      projectName,
    };
    const registry = new SpecRegistry();
    return new PM2Workflow(registry, config);
  }

  getCurrentPhase(): PM2Phase {
    return this.currentPhase;
  }

  setPhase(phase: PM2Phase): void {
    const validTransitions: Record<PM2Phase, PM2Phase[]> = {
      initiating: ['planning'],
      planning: ['executing'],
      executing: ['closing', 'planning'],
      closing: [],
    };

    if (!validTransitions[this.currentPhase].includes(phase)) {
      throw new Error(`Invalid phase transition from ${this.currentPhase} to ${phase}`);
    }
    this.currentPhase = phase;
  }

  canTransitionTo(phase: PM2Phase): boolean {
    const validTransitions: Record<PM2Phase, PM2Phase[]> = {
      initiating: ['planning'],
      planning: ['executing'],
      executing: ['closing', 'planning'],
      closing: [],
    };
    return validTransitions[this.currentPhase].includes(phase);
  }

  getNextPhase(): PM2Phase | null {
    const transitions: Record<PM2Phase, PM2Phase | null> = {
      initiating: 'planning',
      planning: 'executing',
      executing: 'closing',
      closing: null,
    };
    return transitions[this.currentPhase];
  }

  createCharter(data: {
    title: string;
    description: string;
    objectives: string[];
    stakeholders: PM2Stakeholder[];
    startDate: string;
    endDate: string;
    budget?: string;
  }): PM2ProjectCharter {
    const phaseGates: PM2PhaseGate[] = [
      { phase: 'initiating', criteria: ['Charter approved'], approvalRequired: ['project_owner'], status: 'pending' },
      { phase: 'planning', criteria: ['Plan approved'], approvalRequired: ['project_owner', 'business_manager'], status: 'pending' },
      { phase: 'executing', criteria: ['Execution authorized'], approvalRequired: ['project_manager'], status: 'pending' },
      { phase: 'closing', criteria: ['Deliverables accepted'], approvalRequired: ['project_owner', 'stakeholder'], status: 'pending' },
    ];

    this.charter = {
      projectTitle: data.title,
      projectId: this.config.projectId,
      startDate: data.startDate,
      endDate: data.endDate,
      budget: data.budget,
      description: data.description,
      objectives: data.objectives,
      stakeholders: data.stakeholders,
      deliverables: [],
      risks: [],
      phaseGates,
    };

    this.createSpecFromCharter();
    return this.charter;
  }

  private createSpecFromCharter(): void {
    if (!this.charter) return;

    const spec = Spec.create({
      name: this.charter.projectTitle,
      version: '0.1.0',
      description: this.charter.description,
      requirements: this.charter.objectives.map((obj, idx) => ({
        id: `REQ-${idx + 1}`,
        description: obj,
        priority: 'high' as const,
        status: 'pending' as const,
        testable: true,
        acceptanceCriteria: [],
      })),
      metadata: {
        phase: this.currentPhase,
        projectId: this.charter.projectId,
        startDate: this.charter.startDate,
        endDate: this.charter.endDate,
        stakeholders: this.charter.stakeholders.map(s => s.name),
      },
    });

    this.registry.register(spec);
  }

  createHandbook(governance: PM2ProjectHandbook['governance'], processes: PM2ProjectHandbook['processes']): PM2ProjectHandbook {
    if (!this.charter) {
      throw new Error('Project Charter must be created first');
    }

    this.handbook = {
      projectId: this.config.projectId,
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      governance,
      processes,
      standards: [],
      templates: [],
    };

    this.updateSpecMetadata({ handbook: true });
    return this.handbook;
  }

  createWorkPlan(workPackages: PM2WorkPlan['workPackages'], schedule: PM2WorkPlan['schedule']): PM2WorkPlan {
    this.workPlan = {
      projectId: this.config.projectId,
      version: '1.0.0',
      workPackages,
      schedule,
      resources: [],
    };

    this.updateSpecMetadata({ workPlan: true });
    return this.workPlan;
  }

  addDeliverable(deliverable: Omit<PM2Deliverable, 'id' | 'phase' | 'status'>): PM2Deliverable {
    const del: PM2Deliverable = {
      ...deliverable,
      id: `DEL-${Date.now()}`,
      phase: this.currentPhase,
      status: 'draft',
    };

    if (this.charter) {
      this.charter.deliverables.push(del);
    }

    return del;
  }

  addRisk(risk: Omit<PM2Risk, 'id' | 'status'>): PM2Risk {
    const r: PM2Risk = {
      ...risk,
      id: `RSK-${Date.now()}`,
      status: 'identified',
    };

    if (this.charter) {
      this.charter.risks.push(r);
    }

    return r;
  }

  approvePhaseGate(phase: PM2Phase, approvedBy: string[]): void {
    if (!this.charter) return;

    const gate = this.charter.phaseGates.find(g => g.phase === phase);
    if (!gate) return;

    gate.status = 'approved';
    gate.approvedBy = approvedBy;
    gate.approvedDate = new Date().toISOString();

    const nextPhase = this.getNextPhase();
    if (nextPhase && gate.status === 'approved') {
      this.setPhase(nextPhase);
    }
  }

  getPhaseGateStatus(phase: PM2Phase): PM2PhaseGate['status'] | null {
    return this.charter?.phaseGates.find(g => g.phase === phase)?.status ?? null;
  }

  private updateSpecMetadata(updates: Record<string, boolean>): void {
    const specs = this.registry.getAll();
    for (const spec of specs) {
      const metadata = { ...spec.metadata, ...updates, phase: this.currentPhase };
      Object.assign(spec, { metadata });
    }
  }

  getSpec(): Spec | undefined {
    return this.registry.getAll()[0];
  }

  getAllSpecs(): Spec[] {
    return this.registry.getAll();
  }

  toJSON(): object {
    return {
      config: this.config,
      currentPhase: this.currentPhase,
      charter: this.charter,
      handbook: this.handbook,
      workPlan: this.workPlan,
    };
  }

  determineSemverBump(): 'major' | 'minor' | 'patch' {
    const gateStatus = this.getPhaseGateStatus('closing');
    if (gateStatus === 'approved') {
      return this.config.semverBump;
    }
    return 'patch';
  }
}
