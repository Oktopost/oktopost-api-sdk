import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type { Tag, TagListParams, CreateTagParams, UpdateTagParams } from '../../types/publishing.js';

export class TagsResource extends BaseResource {
  async get(id: string): Promise<Tag> {
    const response = await this.httpClient.get<SingleApiResponse<'Tag', Tag>>(`/tag/${id}`);
    return response.Tag;
  }

  async list(params?: TagListParams): Promise<PaginatedApiResponse<Tag>> {
    return this.httpClient.get<PaginatedApiResponse<Tag>>(
      '/tag',
      params,
    );
  }

  async *listAll(
    params?: Omit<TagListParams, '_page' | '_count'>,
  ): AsyncGenerator<Tag, void, undefined> {
    yield* this.autoPaginate<Tag>('/tag', params);
  }

  async create(params: CreateTagParams): Promise<Tag> {
    const response = await this.httpClient.post<SingleApiResponse<'Tag', Tag>>(
      '/tag',
      params,
    );
    return response.Tag;
  }

  async update(id: string, params: UpdateTagParams): Promise<Tag> {
    const response = await this.httpClient.post<SingleApiResponse<'Tag', Tag>>(
      `/tag/${id}`,
      params,
    );
    return response.Tag;
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/tag/${id}`);
  }
}
