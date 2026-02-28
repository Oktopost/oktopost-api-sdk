import { describe, it, expect } from 'vitest';
import { TopicsResource } from '../../../../src/resources/advocacy/topics.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('TopicsResource', () => {
  it('list calls GET /board-topic', async () => {
    const http = createMockHttpClient();
    const topics = new TopicsResource(http);
    const mockResponse = { Result: true, Items: [{ Id: 't1' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await topics.list({ boardId: 'b1' });

    expect(http.get).toHaveBeenCalledWith('/board-topic', { boardId: 'b1' });
    expect(result).toEqual(mockResponse);
  });

  it('listAll yields all items', async () => {
    const http = createMockHttpClient();
    const topics = new TopicsResource(http);
    (http.get as any).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: 't1' }, { Id: 't2' }],
      Total: 2,
    });

    const items = [];
    for await (const item of topics.listAll()) {
      items.push(item);
    }

    expect(items).toHaveLength(2);
  });

  it('create calls POST /board-topic and returns Topic', async () => {
    const http = createMockHttpClient();
    const topics = new TopicsResource(http);
    const mockTopic = { Id: 't1', Name: 'New Topic' };
    (http.post as any).mockResolvedValue({ Result: true, Topic: mockTopic });

    const result = await topics.create({ boardId: 'b1', name: 'New Topic' });

    expect(http.post).toHaveBeenCalledWith('/board-topic', { boardId: 'b1', name: 'New Topic' });
    expect(result).toEqual(mockTopic);
  });

  it('update calls POST /board-topic/{id}', async () => {
    const http = createMockHttpClient();
    const topics = new TopicsResource(http);
    const mockTopic = { Id: 't1', Name: 'Updated' };
    (http.post as any).mockResolvedValue({ Result: true, Topic: mockTopic });

    const result = await topics.update('t1', { name: 'Updated' });

    expect(http.post).toHaveBeenCalledWith('/board-topic/t1', { name: 'Updated' });
    expect(result).toEqual(mockTopic);
  });

  it('delete calls DELETE /board-topic/{id}', async () => {
    const http = createMockHttpClient();
    const topics = new TopicsResource(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await topics.delete('t1');

    expect(http.delete).toHaveBeenCalledWith('/board-topic/t1');
    expect(result.Result).toBe(true);
  });
});
