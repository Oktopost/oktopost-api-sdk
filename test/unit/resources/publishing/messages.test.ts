import { describe, it, expect } from 'vitest';
import { MessagesResource } from '../../../../src/resources/publishing/messages.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('MessagesResource', () => {
  it('get calls GET /message/{id}', async () => {
    const http = createMockHttpClient();
    const messages = new MessagesResource(http);
    const mockMessage = { Id: 'msg1', Message: 'Hello' };
    (http.get as any).mockResolvedValue({ Result: true, Message: mockMessage });

    const result = await messages.get('msg1');

    expect(http.get).toHaveBeenCalledWith('/message/msg1', undefined);
    expect(result).toEqual(mockMessage);
  });

  it('get passes withTags param', async () => {
    const http = createMockHttpClient();
    const messages = new MessagesResource(http);
    (http.get as any).mockResolvedValue({ Result: true, Message: { Id: 'msg1' } });

    await messages.get('msg1', { withTags: 1 });

    expect(http.get).toHaveBeenCalledWith('/message/msg1', { withTags: 1 });
  });

  it('list calls GET /message with params', async () => {
    const http = createMockHttpClient();
    const messages = new MessagesResource(http);
    const mockResponse = { Result: true, Items: [{ Id: 'msg1' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await messages.list({ campaignId: '002abc' });

    expect(http.get).toHaveBeenCalledWith('/message', { campaignId: '002abc' });
    expect(result).toEqual(mockResponse);
  });

  it('listAll yields all items', async () => {
    const http = createMockHttpClient();
    const messages = new MessagesResource(http);
    (http.get as any).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: '1' }],
      Total: 1,
    });

    const items = [];
    for await (const item of messages.listAll({ campaignId: '002abc' })) {
      items.push(item);
    }

    expect(items).toHaveLength(1);
  });

  it('create calls POST /message', async () => {
    const http = createMockHttpClient();
    const messages = new MessagesResource(http);
    const mockMessage = { Id: 'msg2', Message: 'New' };
    (http.post as any).mockResolvedValue({ Result: true, Message: mockMessage });

    const params = { network: 'Twitter' as const, campaignId: '002abc', message: 'New' };
    const result = await messages.create(params);

    expect(http.post).toHaveBeenCalledWith('/message', params);
    expect(result).toEqual(mockMessage);
  });

  it('update calls POST /message/{id}', async () => {
    const http = createMockHttpClient();
    const messages = new MessagesResource(http);
    const mockMessage = { Id: 'msg1', Message: 'Updated' };
    (http.post as any).mockResolvedValue({ Result: true, Message: mockMessage });

    const result = await messages.update('msg1', { message: 'Updated' });

    expect(http.post).toHaveBeenCalledWith('/message/msg1', { message: 'Updated' });
    expect(result).toEqual(mockMessage);
  });

  it('delete calls DELETE /message/{id}', async () => {
    const http = createMockHttpClient();
    const messages = new MessagesResource(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await messages.delete('msg1');

    expect(http.delete).toHaveBeenCalledWith('/message/msg1');
    expect(result.Result).toBe(true);
  });
});
