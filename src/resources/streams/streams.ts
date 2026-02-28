import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, SingleApiResponse } from '../../types/common.js';
import type {
  Stream,
  StreamListParams,
  CreateStreamParams,
  UpdateStreamPositionParams,
} from '../../types/streams.js';

export class StreamsResource extends BaseResource {
  async list(params?: StreamListParams): Promise<Stream[]> {
    const response = await this.httpClient.get<BaseApiResponse & { Items: Stream[] }>(
      '/stream',
      params,
    );
    return response.Items;
  }

  async create(params: CreateStreamParams): Promise<Stream> {
    const response = await this.httpClient.post<SingleApiResponse<'Stream', Stream>>(
      '/stream',
      params,
    );
    return response.Stream;
  }

  async updatePosition(id: string, params: UpdateStreamPositionParams): Promise<Stream> {
    const response = await this.httpClient.post<SingleApiResponse<'Stream', Stream>>(
      `/stream/${id}`,
      params,
    );
    return response.Stream;
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/stream/${id}`);
  }
}
