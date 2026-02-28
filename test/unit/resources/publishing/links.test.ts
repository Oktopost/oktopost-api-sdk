import { describe, it, expect } from 'vitest';
import { LinksResource } from '../../../../src/resources/publishing/links.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('LinksResource', () => {
  it('getByHash calls GET /link/{hash}', async () => {
    const http = createMockHttpClient();
    const links = new LinksResource(http);
    const mockLink = { Hash: 'abc123', LongUrl: 'https://example.com', ShortUrl: 'https://okt.to/abc123' };
    (http.get as any).mockResolvedValue({ Result: true, Link: mockLink });

    const result = await links.getByHash('abc123');

    expect(http.get).toHaveBeenCalledWith('/link/abc123');
    expect(result).toEqual(mockLink);
  });

  it('list calls GET /link with params', async () => {
    const http = createMockHttpClient();
    const links = new LinksResource(http);
    const mockResponse = { Result: true, Items: [{ Id: 'link1', Hash: 'abc123' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await links.list({ credentialIds: 'cred1' });

    expect(http.get).toHaveBeenCalledWith('/link', { credentialIds: 'cred1' });
    expect(result).toEqual(mockResponse);
  });

  it('listAll yields all items', async () => {
    const http = createMockHttpClient();
    const links = new LinksResource(http);
    (http.get as any).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: '1' }],
      Total: 1,
    });

    const items = [];
    for await (const item of links.listAll()) {
      items.push(item);
    }

    expect(items).toHaveLength(1);
  });

  it('update calls POST /link/{id} and returns first item', async () => {
    const http = createMockHttpClient();
    const links = new LinksResource(http);
    const mockItem = { Id: 'link1', LongUrl: 'https://new-url.com' };
    (http.post as any).mockResolvedValue({ Result: true, Items: [mockItem], Total: 1 });

    const result = await links.update('link1', { longUrl: 'https://new-url.com' });

    expect(http.post).toHaveBeenCalledWith('/link/link1', { longUrl: 'https://new-url.com' });
    expect(result).toEqual(mockItem);
  });
});
