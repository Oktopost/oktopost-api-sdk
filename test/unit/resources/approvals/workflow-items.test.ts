import { describe, it, expect } from 'vitest';
import { WorkflowItemsResource } from '../../../../src/resources/approvals/workflow-items.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('WorkflowItemsResource', () => {
  it('list calls GET /workflow-item', async () => {
    const http = createMockHttpClient();
    const items = new WorkflowItemsResource(http);
    const mockResponse = { Items: [{ Id: 'wi1' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await items.list({ page: 0, count: 100, workflowId: 'w1' });

    expect(http.get).toHaveBeenCalledWith('/workflow-item', { page: 0, count: 100, workflowId: 'w1' });
    expect(result).toEqual(mockResponse);
  });

  it('create calls POST /workflow-item and returns Data', async () => {
    const http = createMockHttpClient();
    const items = new WorkflowItemsResource(http);
    const mockItem = { Id: 'wi1', Status: 'pending' };
    (http.post as any).mockResolvedValue({ Result: true, Data: mockItem });

    const result = await items.create({ entityId: 'e1', workflowId: 'w1' });

    expect(http.post).toHaveBeenCalledWith('/workflow-item', { entityId: 'e1', workflowId: 'w1' });
    expect(result).toEqual(mockItem);
  });

  it('approve calls POST /workflow-item/{id} with isApprove=1', async () => {
    const http = createMockHttpClient();
    const items = new WorkflowItemsResource(http);
    const mockItem = { Id: 'wi1', Status: 'approved' };
    (http.post as any).mockResolvedValue({ Result: true, Data: mockItem });

    const result = await items.approve('wi1', { note: 'Looks good' });

    expect(http.post).toHaveBeenCalledWith('/workflow-item/wi1', { note: 'Looks good', isApprove: 1 });
    expect(result).toEqual(mockItem);
  });

  it('approve works without params', async () => {
    const http = createMockHttpClient();
    const items = new WorkflowItemsResource(http);
    (http.post as any).mockResolvedValue({ Result: true, Data: { Id: 'wi1' } });

    await items.approve('wi1');

    expect(http.post).toHaveBeenCalledWith('/workflow-item/wi1', { isApprove: 1 });
  });

  it('reject calls POST /workflow-item/{id} with isApprove=0', async () => {
    const http = createMockHttpClient();
    const items = new WorkflowItemsResource(http);
    const mockItem = { Id: 'wi1', Status: 'rejected' };
    (http.post as any).mockResolvedValue({ Result: true, Data: mockItem });

    const result = await items.reject('wi1', { note: 'Needs work' });

    expect(http.post).toHaveBeenCalledWith('/workflow-item/wi1', { note: 'Needs work', isApprove: 0 });
    expect(result).toEqual(mockItem);
  });

  it('delete calls DELETE /workflow-item/{id}', async () => {
    const http = createMockHttpClient();
    const items = new WorkflowItemsResource(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await items.delete('wi1');

    expect(http.delete).toHaveBeenCalledWith('/workflow-item/wi1');
    expect(result.Result).toBe(true);
  });
});
