import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type {
  Story,
  StoryListParams,
  CreateStoryParams,
  UpdateStoryParams,
} from '../../types/advocacy.js';

export class StoriesResource extends BaseResource {
  async get(id: string): Promise<Story> {
    const response = await this.httpClient.get<SingleApiResponse<'Item', Story>>(
      `/story/${id}`,
    );
    return response.Item;
  }

  async list(params?: StoryListParams): Promise<PaginatedApiResponse<Story>> {
    return this.httpClient.get<PaginatedApiResponse<Story>>(
      '/story',
      params,
    );
  }

  async *listAll(
    params?: Omit<StoryListParams, '_page' | '_count'>,
  ): AsyncGenerator<Story, void, undefined> {
    yield* this.autoPaginate<Story>('/story', params);
  }

  async create(params: CreateStoryParams): Promise<BaseApiResponse> {
    return this.httpClient.post<BaseApiResponse>(
      '/story',
      params,
    );
  }

  async update(id: string, params: UpdateStoryParams): Promise<BaseApiResponse> {
    return this.httpClient.post<BaseApiResponse>(
      `/story/${id}`,
      params,
    );
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/story/${id}`);
  }
}
