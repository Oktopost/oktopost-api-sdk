import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type {
  StreamTab,
  CreateStreamTabParams,
  UpdateStreamTabParams,
} from '../../types/streams.js';

export class StreamTabsResource extends BaseResource {
  async get(id: string): Promise<StreamTab> {
    const response = await this.httpClient.get<SingleApiResponse<'StreamTab', StreamTab>>(
      `/stream-tab/${id}`,
    );
    return response.StreamTab;
  }

  async list(): Promise<PaginatedApiResponse<StreamTab>> {
    return this.httpClient.get<PaginatedApiResponse<StreamTab>>('/stream-tab');
  }

  async create(params: CreateStreamTabParams): Promise<StreamTab> {
    const response = await this.httpClient.post<SingleApiResponse<'StreamTab', StreamTab>>(
      '/stream-tab',
      params,
    );
    return response.StreamTab;
  }

  async update(id: string, params: UpdateStreamTabParams): Promise<StreamTab> {
    const response = await this.httpClient.post<SingleApiResponse<'StreamTab', StreamTab>>(
      `/stream-tab/${id}`,
      params,
    );
    return response.StreamTab;
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/stream-tab/${id}`);
  }
}
