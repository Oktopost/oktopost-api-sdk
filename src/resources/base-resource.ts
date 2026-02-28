import type { BaseHttpClient } from '../http/base-client.js';
import type { PaginatedApiResponse } from '../types/common.js';

export abstract class BaseResource {
  constructor(protected readonly httpClient: BaseHttpClient) {}

  protected async *autoPaginate<T>(
    path: string,
    params?: object,
    pageSize: number = 100,
  ): AsyncGenerator<T, void, undefined> {
    let page = 0;
    let hasMore = true;

    while (hasMore) {
      const response = await this.httpClient.get<PaginatedApiResponse<T>>(path, {
        ...params,
        _page: page,
        _count: pageSize,
      });

      if (response.Items && response.Items.length > 0) {
        for (const item of response.Items) {
          yield item;
        }
      }

      const total = response.Total ?? 0;
      page++;
      hasMore = page * pageSize < total;
    }
  }
}
