import { describe, it, expect } from 'vitest';
import { BoardMessagesResource } from '../../../../src/resources/advocacy/board-messages.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('BoardMessagesResource', () => {
  it('add calls POST /board-message', async () => {
    const http = createMockHttpClient();
    const boardMessages = new BoardMessagesResource(http);
    (http.post as any).mockResolvedValue({ Result: true });

    const params = { boardId: 'b1', messageId: 'm1', important: 1 as const };
    const result = await boardMessages.add(params);

    expect(http.post).toHaveBeenCalledWith('/board-message', params);
    expect(result.Result).toBe(true);
  });

  it('remove calls DELETE /board-message with query params', async () => {
    const http = createMockHttpClient();
    const boardMessages = new BoardMessagesResource(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await boardMessages.remove({ boardId: 'b1', messageId: 'm1' });

    expect(http.delete).toHaveBeenCalledWith('/board-message', {
      boardId: 'b1',
      messageId: 'm1',
    });
    expect(result.Result).toBe(true);
  });
});
