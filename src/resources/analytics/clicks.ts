import { BaseResource } from '../base-resource.js';
import type { PaginatedApiResponse } from '../../types/common.js';
import type { Click, ClickListParams } from '../../types/analytics.js';

export class ClicksResource extends BaseResource {
  async list(params?: ClickListParams): Promise<PaginatedApiResponse<Click>> {
    return this.httpClient.get<PaginatedApiResponse<Click>>(
      '/click',
      params,
    );
  }

  async *listAll(
    params?: Omit<ClickListParams, '_page' | '_count'>,
  ): AsyncGenerator<Click, void, undefined> {
    yield* this.autoPaginate<Click>('/click', params, 200);
  }
}
