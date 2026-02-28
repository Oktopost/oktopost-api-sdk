import { describe, it, expect } from 'vitest';
import { LeadActivitiesResource } from '../../../../src/resources/leads/lead-activities.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('LeadActivitiesResource', () => {
  it('list calls GET /lead-activity with params', async () => {
    const http = createMockHttpClient();
    const activities = new LeadActivitiesResource(http);
    const mockResponse = { Result: true, Items: [{ Id: 'la1' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await activities.list({ leadId: 'l1' });

    expect(http.get).toHaveBeenCalledWith('/lead-activity', { leadId: 'l1' });
    expect(result).toEqual(mockResponse);
  });

  it('listAll yields all items', async () => {
    const http = createMockHttpClient();
    const activities = new LeadActivitiesResource(http);
    (http.get as any).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: 'la1' }, { Id: 'la2' }],
      Total: 2,
    });

    const items = [];
    for await (const item of activities.listAll()) {
      items.push(item);
    }

    expect(items).toHaveLength(2);
  });

  it('delete calls DELETE /lead-activity/{id} with leadId query', async () => {
    const http = createMockHttpClient();
    const activities = new LeadActivitiesResource(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await activities.delete('la1', 'l1');

    expect(http.delete).toHaveBeenCalledWith('/lead-activity/la1?leadId=l1');
    expect(result.Result).toBe(true);
  });
});
