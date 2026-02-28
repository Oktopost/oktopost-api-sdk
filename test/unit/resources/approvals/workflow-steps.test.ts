import { describe, it, expect } from 'vitest';
import { WorkflowStepsResource } from '../../../../src/resources/approvals/workflow-steps.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('WorkflowStepsResource', () => {
  it('get calls GET /workflow-step/{id}', async () => {
    const http = createMockHttpClient();
    const steps = new WorkflowStepsResource(http);
    const mockStep = { Id: 'ws1', Name: 'Step 1', WorkflowId: 'w1' };
    (http.get as any).mockResolvedValue({ Result: true, ...mockStep });

    const result = await steps.get('ws1');

    expect(http.get).toHaveBeenCalledWith('/workflow-step/ws1');
    expect(result.Id).toBe('ws1');
  });

  it('list calls GET /workflow-step and returns Items', async () => {
    const http = createMockHttpClient();
    const steps = new WorkflowStepsResource(http);
    const mockItems = [{ Id: 'ws1' }];
    (http.get as any).mockResolvedValue({ Result: true, Items: mockItems });

    const result = await steps.list({ workflowId: 'w1' });

    expect(http.get).toHaveBeenCalledWith('/workflow-step', { workflowId: 'w1' });
    expect(result).toEqual(mockItems);
  });
});
