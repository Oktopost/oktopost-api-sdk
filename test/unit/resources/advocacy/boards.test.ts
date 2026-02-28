import { describe, it, expect } from 'vitest';
import { BoardsResource } from '../../../../src/resources/advocacy/boards.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('BoardsResource', () => {
  it('get calls GET /board/{id}', async () => {
    const http = createMockHttpClient();
    const boards = new BoardsResource(http);
    const mockBoard = { Id: 'b1', Name: 'Test Board' };
    (http.get as any).mockResolvedValue({ Result: true, Board: mockBoard });

    const result = await boards.get('b1');

    expect(http.get).toHaveBeenCalledWith('/board/b1');
    expect(result).toEqual(mockBoard);
  });

  it('list calls GET /board', async () => {
    const http = createMockHttpClient();
    const boards = new BoardsResource(http);
    const mockResponse = { Result: true, Items: [{ Id: 'b1' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await boards.list();

    expect(http.get).toHaveBeenCalledWith('/board');
    expect(result).toEqual(mockResponse);
  });

  it('listAll yields all items', async () => {
    const http = createMockHttpClient();
    const boards = new BoardsResource(http);
    (http.get as any).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: 'b1' }, { Id: 'b2' }],
      Total: 2,
    });

    const items = [];
    for await (const item of boards.listAll()) {
      items.push(item);
    }

    expect(items).toHaveLength(2);
  });
});
