import { describe, it, expect } from 'vitest';
import { LeadLinksResource } from '../../../../src/resources/leads/lead-links.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('LeadLinksResource', () => {
  it('replace calls POST /lead-link-replace', async () => {
    const http = createMockHttpClient();
    const links = new LeadLinksResource(http);
    (http.post as any).mockResolvedValue({ Result: true });

    const params = { integrationId: 'i1', linkedRecordId: 'r1', newLinkedRecordId: 'r2' };
    const result = await links.replace(params);

    expect(http.post).toHaveBeenCalledWith('/lead-link-replace', params);
    expect(result.Result).toBe(true);
  });
});
