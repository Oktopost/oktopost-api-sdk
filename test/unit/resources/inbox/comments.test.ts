import { describe, it, expect } from 'vitest';
import { CommentsResource } from '../../../../src/resources/inbox/comments.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('CommentsResource', () => {
  it('list calls GET /comments and returns Data', async () => {
    const http = createMockHttpClient();
    const comments = new CommentsResource(http);
    const mockComments = [{ CommentId: 'c1', CommentText: 'hello' }];
    (http.get as any).mockResolvedValue({ Result: true, Data: mockComments });

    const result = await comments.list({ postlogId: 'pl1' });

    expect(http.get).toHaveBeenCalledWith('/comments', { postlogId: 'pl1' });
    expect(result).toEqual(mockComments);
  });

  it('list calls GET /comments without params', async () => {
    const http = createMockHttpClient();
    const comments = new CommentsResource(http);
    (http.get as any).mockResolvedValue({ Result: true, Data: [] });

    const result = await comments.list();

    expect(http.get).toHaveBeenCalledWith('/comments', undefined);
    expect(result).toEqual([]);
  });
});
