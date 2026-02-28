export type PM2Phase = 'initiating' | 'planning' | 'executing' | 'closing';

export type PM2Role = 
  | 'project_owner'
  | 'business_manager'
  | 'business_implementation_group'
  | 'solution_provider'
  | 'project_manager'
  | 'project_core_team'
  | 'stakeholder'
  | 'end_user';

export type PM2DeliverableStatus = 
  | 'draft'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'completed';

export interface PM2Stakeholder {
  id: string;
  name: string;
  role: PM2Role;
  organization: string;
  email?: string;
  interests?: string;
  influence?: 'high' | 'medium' | 'low';
  impact?: 'positive' | 'negative' | 'neutral';
}

export interface PM2Deliverable {
  id: string;
  name: string;
  description: string;
  phase: PM2Phase;
  owner: string;
  dueDate?: string;
  status: PM2DeliverableStatus;
  criteria?: string[];
  dependencies?: string[];
  resources?: string[];
}

export interface PM2Risk {
  id: string;
  description: string;
  probability: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  impact: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  mitigation: string;
  owner?: string;
  status: 'identified' | 'mitigated' | 'closed';
}

export interface PM2ChangeRequest {
  id: string;
  title: string;
  description: string;
  requestedBy: string;
  requestedDate: string;
  impact: string;
  decision?: 'approved' | 'rejected' | 'pending';
  decisionDate?: string;
  decisionBy?: string;
}

export interface PM2PhaseGate {
  phase: PM2Phase;
  criteria: string[];
  approvalRequired: PM2Role[];
  approvedBy?: string[];
  approvedDate?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PM2ProjectCharter {
  projectTitle: string;
  projectId: string;
  startDate: string;
  endDate: string;
  budget?: string;
  description: string;
  objectives: string[];
  stakeholders: PM2Stakeholder[];
  deliverables: PM2Deliverable[];
  risks: PM2Risk[];
  phaseGates: PM2PhaseGate[];
}

export interface PM2ProjectHandbook {
  projectId: string;
  version: string;
  lastUpdated: string;
  governance: {
    roles: PM2Role[];
    escalationPath: string[];
    decisionMaking: string;
  };
  processes: {
    changeManagement: string;
    riskManagement: string;
    qualityManagement: string;
    communication: string;
  };
  standards: string[];
  templates: string[];
}

export interface PM2WorkPlan {
  projectId: string;
  version: string;
  workPackages: WorkPackage[];
  schedule: Schedule;
  resources: ResourceAllocation[];
  budget?: BudgetBreakdown;
}

export interface WorkPackage {
  id: string;
  name: string;
  description: string;
  phase: PM2Phase;
  owner: string;
  startDate?: string;
  endDate?: string;
  dependencies: string[];
  tasks: Task[];
  status: 'planned' | 'in_progress' | 'completed' | 'blocked';
}

export interface Task {
  id: string;
  name: string;
  description: string;
  assignee?: string;
  estimatedHours?: number;
  actualHours?: number;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  blockers?: string[];
}

export interface Schedule {
  milestones: Milestone[];
  phases: PhaseSchedule[];
}

export interface Milestone {
  id: string;
  name: string;
  date: string;
  deliverables: string[];
  status: 'pending' | 'achieved' | 'delayed';
}

export interface PhaseSchedule {
  phase: PM2Phase;
  startDate: string;
  endDate: string;
  activities: string[];
}

export interface ResourceAllocation {
  resource: string;
  role: PM2Role;
  allocation: number;
  period: { start: string; end: string };
}

export interface BudgetBreakdown {
  total: number;
  categories: { name: string; amount: number }[];
}

export interface PM2Configuration {
  projectName: string;
  projectId: string;
  organization?: string;
  defaultPhase: PM2Phase;
  autoCreateIssues: boolean;
  autoCreateMilestones: boolean;
  semverBump: 'major' | 'minor' | 'patch';
  phases: {
    initiating: PhaseConfig;
    planning: PhaseConfig;
    executing: PhaseConfig;
    closing: PhaseConfig;
  };
}

export interface PhaseConfig {
  enabled: boolean;
  deliverables: string[];
  requiredApprovals: PM2Role[];
}

export const DEFAULT_PM2_CONFIG: PM2Configuration = {
  projectName: 'LumiSDD',
  projectId: '',
  defaultPhase: 'initiating',
  autoCreateIssues: true,
  autoCreateMilestones: true,
  semverBump: 'minor',
  phases: {
    initiating: {
      enabled: true,
      deliverables: ['Project Charter', 'Stakeholder Register', 'Risk Register'],
      requiredApprovals: ['project_owner'],
    },
    planning: {
      enabled: true,
      deliverables: ['Project Handbook', 'Work Plan', 'Schedule', 'Budget'],
      requiredApprovals: ['project_owner', 'business_manager'],
    },
    executing: {
      enabled: true,
      deliverables: ['Deliverables', 'Status Reports', 'Change Requests'],
      requiredApprovals: ['project_manager'],
    },
    closing: {
      enabled: true,
      deliverables: ['Project End Report', 'Lessons Learned', 'Final Deliverables'],
      requiredApprovals: ['project_owner', 'stakeholder'],
    },
  },
};
