import type { BaseHttpClient } from '../../http/base-client.js';
import { WorkflowsResource } from './workflows.js';
import { WorkflowStepsResource } from './workflow-steps.js';
import { WorkflowItemsResource } from './workflow-items.js';
import { WorkflowItemNotesResource } from './workflow-item-notes.js';

export class ApprovalsNamespace {
  readonly workflows: WorkflowsResource;
  readonly workflowSteps: WorkflowStepsResource;
  readonly workflowItems: WorkflowItemsResource;
  readonly workflowItemNotes: WorkflowItemNotesResource;

  constructor(httpClient: BaseHttpClient) {
    this.workflows = new WorkflowsResource(httpClient);
    this.workflowSteps = new WorkflowStepsResource(httpClient);
    this.workflowItems = new WorkflowItemsResource(httpClient);
    this.workflowItemNotes = new WorkflowItemNotesResource(httpClient);
  }
}

export { WorkflowsResource } from './workflows.js';
export { WorkflowStepsResource } from './workflow-steps.js';
export { WorkflowItemsResource } from './workflow-items.js';
export { WorkflowItemNotesResource } from './workflow-item-notes.js';
