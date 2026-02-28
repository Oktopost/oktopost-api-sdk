import { describe, it, expect } from 'vitest';
import { WorkflowsResource } from '../../../../src/resources/approvals/workflows.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('WorkflowsResource', () => {
  it('get calls GET /workflow/{id}', async () => {
    const http = createMockHttpClient();
    const workflows = new WorkflowsResource(http);
    const mockWorkflow = { Id: 'w1', Name: 'Review', Status: 'active' };
    (http.get as any).mockResolvedValue({ Result: true, ...mockWorkflow });

    const result = await workflows.get('w1');

    expect(http.get).toHaveBeenCalledWith('/workflow/w1', undefined);
    expect(result.Id).toBe('w1');
  });

  it('get passes withSteps param', async () => {
    const http = createMockHttpClient();
    const workflows = new WorkflowsResource(http);
    (http.get as any).mockResolvedValue({ Result: true, Id: 'w1', Steps: [] });

    await workflows.get('w1', { withSteps: 1 });

    expect(http.get).toHaveBeenCalledWith('/workflow/w1', { withSteps: 1 });
  });

  it('list calls GET /workflow and returns Items', async () => {
    const http = createMockHttpClient();
    const workflows = new WorkflowsResource(http);
    const mockItems = [{ Id: 'w1' }, { Id: 'w2' }];
    (http.get as any).mockResolvedValue({ Result: true, Items: mockItems });

    const result = await workflows.list({ withSteps: 1 });

    expect(http.get).toHaveBeenCalledWith('/workflow', { withSteps: 1 });
    expect(result).toEqual(mockItems);
  });
});
