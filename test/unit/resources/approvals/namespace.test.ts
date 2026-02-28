import { describe, it, expect } from 'vitest';
import { ApprovalsNamespace } from '../../../../src/resources/approvals/index.js';
import { WorkflowsResource } from '../../../../src/resources/approvals/workflows.js';
import { WorkflowStepsResource } from '../../../../src/resources/approvals/workflow-steps.js';
import { WorkflowItemsResource } from '../../../../src/resources/approvals/workflow-items.js';
import { WorkflowItemNotesResource } from '../../../../src/resources/approvals/workflow-item-notes.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('ApprovalsNamespace', () => {
  it('exposes all approvals resources', () => {
    const http = createMockHttpClient();
    const approvals = new ApprovalsNamespace(http);

    expect(approvals.workflows).toBeInstanceOf(WorkflowsResource);
    expect(approvals.workflowSteps).toBeInstanceOf(WorkflowStepsResource);
    expect(approvals.workflowItems).toBeInstanceOf(WorkflowItemsResource);
    expect(approvals.workflowItemNotes).toBeInstanceOf(WorkflowItemNotesResource);
  });
});
