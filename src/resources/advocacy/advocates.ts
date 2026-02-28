import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type {
  Advocate,
  AdvocateListItem,
  AdvocateListParams,
  AdvocateGetParams,
  InviteAdvocateParams,
} from '../../types/advocacy.js';

export class AdvocatesResource extends BaseResource {
  async get(id: string, params?: AdvocateGetParams): Promise<Advocate> {
    const response = await this.httpClient.get<SingleApiResponse<'Advocate', Advocate>>(
      `/advocate/${id}`,
      params,
    );
    return response.Advocate;
  }

  async list(params?: AdvocateListParams): Promise<PaginatedApiResponse<AdvocateListItem>> {
    return this.httpClient.get<PaginatedApiResponse<AdvocateListItem>>(
      '/advocate',
      params,
    );
  }

  async *listAll(
    params?: Omit<AdvocateListParams, '_page' | '_count'>,
  ): AsyncGenerator<AdvocateListItem, void, undefined> {
    yield* this.autoPaginate<AdvocateListItem>(
      '/advocate',
      params,
    );
  }

  async invite(params: InviteAdvocateParams): Promise<BaseApiResponse> {
    return this.httpClient.post<BaseApiResponse>(
      '/advocate',
      params,
    );
  }

  async delete(id: string, boardId: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/advocate/${id}`, { boardId });
  }
}
