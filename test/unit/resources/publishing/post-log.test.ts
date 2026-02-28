import { describe, it, expect } from 'vitest';
import { PostLogResource } from '../../../../src/resources/publishing/post-log.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('PostLogResource', () => {
  it('listByPost calls GET /postlog with postId and returns Postlogs', async () => {
    const http = createMockHttpClient();
    const postLog = new PostLogResource(http);
    const mockPostlogs = [{ Id: 'pl1', PostId: '004001', Status: 'success' }];
    (http.get as any).mockResolvedValue({ Result: true, Postlogs: mockPostlogs });

    const result = await postLog.listByPost('004001');

    expect(http.get).toHaveBeenCalledWith('/postlog', { postId: '004001' });
    expect(result).toEqual(mockPostlogs);
  });

  it('get calls GET /postlog/{id} and returns Postlog', async () => {
    const http = createMockHttpClient();
    const postLog = new PostLogResource(http);
    const mockPostlog = { Id: 'pl1', Status: 'success' };
    (http.get as any).mockResolvedValue({ Result: true, Postlog: mockPostlog });

    const result = await postLog.get('pl1');

    expect(http.get).toHaveBeenCalledWith('/postlog/pl1', undefined);
    expect(result).toEqual(mockPostlog);
  });

  it('get merges Stats into Postlog when stats=1', async () => {
    const http = createMockHttpClient();
    const postLog = new PostLogResource(http);
    const mockPostlog = { Id: 'pl1', Status: 'success' };
    const mockStats = { LinkClicks: 5, Conversions: 1, Comments: 2, Likes: 10, Shares: 3, ImpressionsAdded: 50, MediaClicksAdded: 1, DetailExpandsAdded: 0, UserFollowsAdded: 2 };
    (http.get as any).mockResolvedValue({ Result: true, Postlog: mockPostlog, Stats: mockStats });

    const result = await postLog.get('pl1', { stats: 1 });

    expect(http.get).toHaveBeenCalledWith('/postlog/pl1', { stats: 1 });
    expect(result.Stats).toEqual(mockStats);
    expect(result.Id).toBe('pl1');
  });
});
