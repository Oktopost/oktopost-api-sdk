import { describe, it, expect } from 'vitest';
import { TagsResource } from '../../../../src/resources/publishing/tags.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('TagsResource', () => {
  it('get calls GET /tag/{id}', async () => {
    const http = createMockHttpClient();
    const tags = new TagsResource(http);
    const mockTag = { Id: 'tag1', Tag: 'marketing', Created: '2024-01-01', LastUsedDate: '2024-06-01' };
    (http.get as any).mockResolvedValue({ Result: true, Tag: mockTag });

    const result = await tags.get('tag1');

    expect(http.get).toHaveBeenCalledWith('/tag/tag1');
    expect(result).toEqual(mockTag);
  });

  it('list calls GET /tag with params', async () => {
    const http = createMockHttpClient();
    const tags = new TagsResource(http);
    const mockResponse = { Result: true, Items: [{ Id: 'tag1' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await tags.list({ _order: 'tag' });

    expect(http.get).toHaveBeenCalledWith('/tag', { _order: 'tag' });
    expect(result).toEqual(mockResponse);
  });

  it('listAll yields all items', async () => {
    const http = createMockHttpClient();
    const tags = new TagsResource(http);
    (http.get as any).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: '1' }],
      Total: 1,
    });

    const items = [];
    for await (const item of tags.listAll()) {
      items.push(item);
    }

    expect(items).toHaveLength(1);
  });

  it('create calls POST /tag', async () => {
    const http = createMockHttpClient();
    const tags = new TagsResource(http);
    const mockTag = { Id: 'tag2', Tag: 'sales' };
    (http.post as any).mockResolvedValue({ Result: true, Tag: mockTag });

    const result = await tags.create({ tag: 'sales' });

    expect(http.post).toHaveBeenCalledWith('/tag', { tag: 'sales' });
    expect(result).toEqual(mockTag);
  });

  it('update calls POST /tag/{id}', async () => {
    const http = createMockHttpClient();
    const tags = new TagsResource(http);
    const mockTag = { Id: 'tag1', Tag: 'mktg' };
    (http.post as any).mockResolvedValue({ Result: true, Tag: mockTag });

    const result = await tags.update('tag1', { tag: 'mktg' });

    expect(http.post).toHaveBeenCalledWith('/tag/tag1', { tag: 'mktg' });
    expect(result).toEqual(mockTag);
  });

  it('delete calls DELETE /tag/{id}', async () => {
    const http = createMockHttpClient();
    const tags = new TagsResource(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await tags.delete('tag1');

    expect(http.delete).toHaveBeenCalledWith('/tag/tag1');
    expect(result.Result).toBe(true);
  });
});
