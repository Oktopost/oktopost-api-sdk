import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type {
  MediaItem,
  MediaListItem,
  MediaListParams,
  CreateMediaParams,
} from '../../types/publishing.js';

export class MediaResource extends BaseResource {
  async get(id: string): Promise<MediaItem> {
    const response = await this.httpClient.get<SingleApiResponse<'Media', MediaItem>>(
      `/media/${id}`,
    );
    return response.Media;
  }

  async list(params?: MediaListParams): Promise<PaginatedApiResponse<MediaListItem>> {
    return this.httpClient.get<PaginatedApiResponse<MediaListItem>>(
      '/media',
      params,
    );
  }

  async *listAll(
    params?: Omit<MediaListParams, '_page' | '_count'>,
  ): AsyncGenerator<MediaListItem, void, undefined> {
    yield* this.autoPaginate<MediaListItem>(
      '/media',
      params,
    );
  }

  async create(params: CreateMediaParams): Promise<MediaItem> {
    const response = await this.httpClient.post<SingleApiResponse<'Media', MediaItem>>(
      '/media',
      params,
    );
    return response.Media;
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/media/${id}`);
  }
}
