import { describe, it, expect } from 'vitest';
import { WorkflowItemNotesResource } from '../../../../src/resources/approvals/workflow-item-notes.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('WorkflowItemNotesResource', () => {
  it('list calls GET /workflow-item-note with id param', async () => {
    const http = createMockHttpClient();
    const notes = new WorkflowItemNotesResource(http);
    const mockResponse = { Authors: {}, Notes: [{ Id: 'n1', Text: 'hello' }] };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await notes.list('wi1');

    expect(http.get).toHaveBeenCalledWith('/workflow-item-note', { id: 'wi1' });
    expect(result).toEqual(mockResponse);
  });

  it('create calls PUT /workflow-item-note with query params', async () => {
    const http = createMockHttpClient();
    const notes = new WorkflowItemNotesResource(http);
    (http.put as any).mockResolvedValue({ Result: true });

    const result = await notes.create('wi1', 'My note');

    expect(http.put).toHaveBeenCalledWith('/workflow-item-note?id=wi1&note=My+note');
    expect(result.Result).toBe(true);
  });
});
