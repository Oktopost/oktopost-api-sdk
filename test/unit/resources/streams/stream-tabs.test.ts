import { describe, it, expect } from 'vitest';
import { StreamTabsResource } from '../../../../src/resources/streams/stream-tabs.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('StreamTabsResource', () => {
  it('get calls GET /stream-tab/{id}', async () => {
    const http = createMockHttpClient();
    const tabs = new StreamTabsResource(http);
    const mockTab = { Id: 'st1', Name: 'My Tab' };
    (http.get as any).mockResolvedValue({ Result: true, StreamTab: mockTab });

    const result = await tabs.get('st1');

    expect(http.get).toHaveBeenCalledWith('/stream-tab/st1');
    expect(result).toEqual(mockTab);
  });

  it('list calls GET /stream-tab', async () => {
    const http = createMockHttpClient();
    const tabs = new StreamTabsResource(http);
    const mockResponse = { Result: true, Items: [{ Id: 'st1' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await tabs.list();

    expect(http.get).toHaveBeenCalledWith('/stream-tab');
    expect(result).toEqual(mockResponse);
  });

  it('create calls POST /stream-tab', async () => {
    const http = createMockHttpClient();
    const tabs = new StreamTabsResource(http);
    const mockTab = { Id: 'st1', Name: 'New Tab' };
    (http.post as any).mockResolvedValue({ Result: true, StreamTab: mockTab });

    const result = await tabs.create({ name: 'New Tab' });

    expect(http.post).toHaveBeenCalledWith('/stream-tab', { name: 'New Tab' });
    expect(result).toEqual(mockTab);
  });

  it('update calls POST /stream-tab/{id}', async () => {
    const http = createMockHttpClient();
    const tabs = new StreamTabsResource(http);
    const mockTab = { Id: 'st1', Name: 'Updated' };
    (http.post as any).mockResolvedValue({ Result: true, StreamTab: mockTab });

    const result = await tabs.update('st1', { name: 'Updated' });

    expect(http.post).toHaveBeenCalledWith('/stream-tab/st1', { name: 'Updated' });
    expect(result).toEqual(mockTab);
  });

  it('delete calls DELETE /stream-tab/{id}', async () => {
    const http = createMockHttpClient();
    const tabs = new StreamTabsResource(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await tabs.delete('st1');

    expect(http.delete).toHaveBeenCalledWith('/stream-tab/st1');
    expect(result.Result).toBe(true);
  });
});
