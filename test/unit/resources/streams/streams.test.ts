import { describe, it, expect } from 'vitest';
import { StreamsResource } from '../../../../src/resources/streams/streams.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('StreamsResource', () => {
  it('list calls GET /stream and returns Items', async () => {
    const http = createMockHttpClient();
    const streams = new StreamsResource(http);
    const mockItems = [{ Id: 's1', Name: 'Stream 1' }];
    (http.get as any).mockResolvedValue({ Result: true, Items: mockItems });

    const result = await streams.list({ position: 0 });

    expect(http.get).toHaveBeenCalledWith('/stream', { position: 0 });
    expect(result).toEqual(mockItems);
  });

  it('create calls POST /stream and returns Stream', async () => {
    const http = createMockHttpClient();
    const streams = new StreamsResource(http);
    const mockStream = { Id: 's1', Name: 'New Stream' };
    (http.post as any).mockResolvedValue({ Result: true, Stream: mockStream });

    const params = { streamTabId: 'st1', network: 'Twitter', credentialId: 'cr1', type: 'keyword' };
    const result = await streams.create(params);

    expect(http.post).toHaveBeenCalledWith('/stream', params);
    expect(result).toEqual(mockStream);
  });

  it('updatePosition calls POST /stream/{id}', async () => {
    const http = createMockHttpClient();
    const streams = new StreamsResource(http);
    const mockStream = { Id: 's1', Position: 2 };
    (http.post as any).mockResolvedValue({ Result: true, Stream: mockStream });

    const result = await streams.updatePosition('s1', { position: 2 });

    expect(http.post).toHaveBeenCalledWith('/stream/s1', { position: 2 });
    expect(result).toEqual(mockStream);
  });

  it('delete calls DELETE /stream/{id}', async () => {
    const http = createMockHttpClient();
    const streams = new StreamsResource(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await streams.delete('s1');

    expect(http.delete).toHaveBeenCalledWith('/stream/s1');
    expect(result.Result).toBe(true);
  });
});
