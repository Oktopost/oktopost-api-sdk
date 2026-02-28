import { describe, it, expect } from 'vitest';
import { ClicksResource } from '../../../../src/resources/analytics/clicks.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('ClicksResource', () => {
  it('list calls GET /click with params', async () => {
    const http = createMockHttpClient();
    const clicks = new ClicksResource(http);
    const mockResponse = { Result: true, Items: [{ Id: 'click1' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await clicks.list({ campaignId: '002abc', _count: 200 });

    expect(http.get).toHaveBeenCalledWith('/click', { campaignId: '002abc', _count: 200 });
    expect(result).toEqual(mockResponse);
  });

  it('listAll yields all items with pageSize 200', async () => {
    const http = createMockHttpClient();
    const clicks = new ClicksResource(http);
    (http.get as any).mockResolvedValueOnce({
      Result: true,
      Items: Array.from({ length: 200 }, (_, i) => ({ Id: `click${i}` })),
      Total: 250,
    }).mockResolvedValueOnce({
      Result: true,
      Items: Array.from({ length: 50 }, (_, i) => ({ Id: `click${200 + i}` })),
      Total: 250,
    });

    const items = [];
    for await (const item of clicks.listAll({ campaignId: '002abc' })) {
      items.push(item);
    }

    expect(items).toHaveLength(250);
    expect(http.get).toHaveBeenCalledTimes(2);
    expect((http.get as any).mock.calls[0][1]).toEqual(
      expect.objectContaining({ _count: 200 }),
    );
  });
});
