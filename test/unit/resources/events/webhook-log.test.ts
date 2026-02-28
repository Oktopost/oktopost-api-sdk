import { describe, it, expect } from 'vitest';
import { WebhookLogResource } from '../../../../src/resources/events/webhook-log.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('WebhookLogResource', () => {
  it('list calls GET /webhook-log/{webhookId}', async () => {
    const http = createMockHttpClient();
    const log = new WebhookLogResource(http);
    const mockResponse = { Result: true, Items: [{ Id: 'wl1' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await log.list('wh1');

    expect(http.get).toHaveBeenCalledWith('/webhook-log/wh1');
    expect(result).toEqual(mockResponse);
  });
});
