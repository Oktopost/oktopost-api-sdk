import { describe, it, expect } from 'vitest';
import { FollowersResource } from '../../../../src/resources/analytics/followers.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('FollowersResource', () => {
  it('get calls GET /followers/{credentialId} and returns Data', async () => {
    const http = createMockHttpClient();
    const followers = new FollowersResource(http);
    const mockData = [
      { Followers: 1000, FollowersAdded: 10, HistoryDate: '2024-01-01 00:00:00' },
      { Followers: 1010, FollowersAdded: 10, HistoryDate: '2024-01-02 00:00:00' },
    ];
    (http.get as any).mockResolvedValue({ Result: true, Data: mockData });

    const result = await followers.get('cred1');

    expect(http.get).toHaveBeenCalledWith('/followers/cred1', undefined);
    expect(result).toEqual(mockData);
  });

  it('get passes date range params', async () => {
    const http = createMockHttpClient();
    const followers = new FollowersResource(http);
    (http.get as any).mockResolvedValue({ Result: true, Data: [] });

    await followers.get('cred1', { fromDate: '2024-01-01', toDate: '2024-01-31' });

    expect(http.get).toHaveBeenCalledWith('/followers/cred1', { fromDate: '2024-01-01', toDate: '2024-01-31' });
  });
});
