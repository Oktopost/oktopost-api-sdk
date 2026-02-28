import { BaseResource } from '../../../src/resources/base-resource.js';
import { createMockHttpClient } from '../../helpers/mock-http-client.js';
import { collectAll } from '../../../src/pagination/paginator.js';

class TestResource extends BaseResource {
  listAll(params?: Record<string, unknown>) {
    return this.autoPaginate<{ Id: string }>('/test', params);
  }

  listAllCustomSize(params?: Record<string, unknown>) {
    return this.autoPaginate<{ Id: string }>('/test', params, 2);
  }
}

describe('BaseResource autoPaginate', () => {
  it('fetches multiple pages and yields all items', async () => {
    const httpClient = createMockHttpClient();
    const resource = new TestResource(httpClient);

    vi.mocked(httpClient.get)
      .mockResolvedValueOnce({
        Result: true,
        Items: [{ Id: '1' }, { Id: '2' }],
        Total: 4,
      })
      .mockResolvedValueOnce({
        Result: true,
        Items: [{ Id: '3' }, { Id: '4' }],
        Total: 4,
      });

    const items = await collectAll(resource.listAllCustomSize());
    expect(items).toEqual([{ Id: '1' }, { Id: '2' }, { Id: '3' }, { Id: '4' }]);
    expect(httpClient.get).toHaveBeenCalledTimes(2);
    expect(httpClient.get).toHaveBeenCalledWith('/test', { _page: 0, _count: 2 });
    expect(httpClient.get).toHaveBeenCalledWith('/test', { _page: 1, _count: 2 });
  });

  it('handles single page', async () => {
    const httpClient = createMockHttpClient();
    const resource = new TestResource(httpClient);

    vi.mocked(httpClient.get).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: '1' }],
      Total: 1,
    });

    const items = await collectAll(resource.listAll());
    expect(items).toEqual([{ Id: '1' }]);
    expect(httpClient.get).toHaveBeenCalledTimes(1);
  });

  it('handles empty response', async () => {
    const httpClient = createMockHttpClient();
    const resource = new TestResource(httpClient);

    vi.mocked(httpClient.get).mockResolvedValueOnce({
      Result: true,
      Items: [],
      Total: 0,
    });

    const items = await collectAll(resource.listAll());
    expect(items).toEqual([]);
    expect(httpClient.get).toHaveBeenCalledTimes(1);
  });

  it('passes additional params alongside pagination params', async () => {
    const httpClient = createMockHttpClient();
    const resource = new TestResource(httpClient);

    vi.mocked(httpClient.get).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: '1' }],
      Total: 1,
    });

    await collectAll(resource.listAll({ status: 'active' }));
    expect(httpClient.get).toHaveBeenCalledWith('/test', {
      status: 'active',
      _page: 0,
      _count: 100,
    });
  });

  it('stops when Total is undefined', async () => {
    const httpClient = createMockHttpClient();
    const resource = new TestResource(httpClient);

    vi.mocked(httpClient.get).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: '1' }],
    });

    const items = await collectAll(resource.listAll());
    expect(items).toEqual([{ Id: '1' }]);
    expect(httpClient.get).toHaveBeenCalledTimes(1);
  });
});
