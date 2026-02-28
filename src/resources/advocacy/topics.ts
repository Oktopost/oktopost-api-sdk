import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type {
  Topic,
  TopicListParams,
  CreateTopicParams,
  UpdateTopicParams,
} from '../../types/advocacy.js';

export class TopicsResource extends BaseResource {
  async list(params?: TopicListParams): Promise<PaginatedApiResponse<Topic>> {
    return this.httpClient.get<PaginatedApiResponse<Topic>>(
      '/board-topic',
      params,
    );
  }

  async *listAll(
    params?: Omit<TopicListParams, '_page' | '_count'>,
  ): AsyncGenerator<Topic, void, undefined> {
    yield* this.autoPaginate<Topic>(
      '/board-topic',
      params,
    );
  }

  async create(params: CreateTopicParams): Promise<Topic> {
    const response = await this.httpClient.post<SingleApiResponse<'Topic', Topic>>(
      '/board-topic',
      params,
    );
    return response.Topic;
  }

  async update(id: string, params: UpdateTopicParams): Promise<Topic> {
    const response = await this.httpClient.post<SingleApiResponse<'Topic', Topic>>(
      `/board-topic/${id}`,
      params,
    );
    return response.Topic;
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/board-topic/${id}`);
  }
}
