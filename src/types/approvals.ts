export interface WorkflowApprover {
  Id: string;
  Created: string;
  Name: string;
  Email: string;
}

export interface WorkflowStep {
  Id: string;
  Created: string;
  WorkflowId: string;
  Name: string;
  MustBeApprovedByEveryone: boolean;
  Approvers: WorkflowApprover[];
}

export interface Workflow {
  Id: string;
  Created: string;
  Name: string;
  Status: 'active' | 'inactive';
  Steps?: WorkflowStep[];
}

export interface WorkflowListParams {
  withSteps?: 0 | 1;
}

export interface WorkflowGetParams {
  withSteps?: 0 | 1;
}

export interface WorkflowStepListParams {
  workflowId?: string;
}

export interface WorkflowItem {
  Id: string;
  CreatedBy: string;
  Status: string;
  StepId: string;
  WorkflowId: string;
  MessageId: string;
}

export interface WorkflowItemAuthor {
  Id: string;
  Created: string;
  Name: string;
  Email: string;
}

export interface WorkflowItemListParams {
  page?: number;
  count?: number;
  stepId?: string;
  workflowId?: string;
  withHistory?: 0 | 1;
  withAuthors?: 0 | 1;
  withSteps?: 0 | 1;
}

export interface WorkflowItemListResponse {
  Items: WorkflowItem[];
  Total: number;
  Authors?: Record<string, WorkflowItemAuthor>;
  Steps?: Record<string, WorkflowStep>;
}

export interface CreateWorkflowItemParams {
  entityId: string;
  workflowId: string;
}

export interface ApproveRejectParams {
  note?: string;
  stepId?: string;
}

export interface WorkflowNoteAuthor {
  Id: string;
  Name: string;
  Email: string;
  LastLogin: string;
}

export interface WorkflowItemNote {
  Id: string;
  Created: string;
  Modified: string;
  AccountId: string;
  UserId: string;
  Status: string;
  EntityId: string;
  Text: string;
  AdditionalData: unknown | null;
}

export interface WorkflowItemNoteListResponse {
  Authors: Record<string, WorkflowNoteAuthor>;
  Notes: WorkflowItemNote[];
}
