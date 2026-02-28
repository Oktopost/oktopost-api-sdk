import { describe, it, expect } from 'vitest';
import { PostAnalyticsResource } from '../../../../src/resources/analytics/post-analytics.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('PostAnalyticsResource', () => {
  it('get calls GET /analytics/{postId} and returns Stats', async () => {
    const http = createMockHttpClient();
    const analytics = new PostAnalyticsResource(http);
    const mockStats = { LinkClicks: 10, Conversions: 2, Comments: 5, Likes: 20, Shares: 3, ImpressionsAdded: 100 };
    (http.get as any).mockResolvedValue({ Result: true, Stats: mockStats });

    const result = await analytics.get('004001');

    expect(http.get).toHaveBeenCalledWith('/analytics/004001');
    expect(result).toEqual(mockStats);
  });
});
