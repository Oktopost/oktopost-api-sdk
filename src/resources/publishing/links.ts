import { BaseResource } from '../base-resource.js';
import type { PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type { Link, LinkListItem, LinkListParams, UpdateLinkParams } from '../../types/publishing.js';

export class LinksResource extends BaseResource {
  async getByHash(hash: string): Promise<Link> {
    const response = await this.httpClient.get<SingleApiResponse<'Link', Link>>(`/link/${hash}`);
    return response.Link;
  }

  async list(params?: LinkListParams): Promise<PaginatedApiResponse<LinkListItem>> {
    return this.httpClient.get<PaginatedApiResponse<LinkListItem>>(
      '/link',
      params,
    );
  }

  async *listAll(
    params?: Omit<LinkListParams, '_page' | '_count'>,
  ): AsyncGenerator<LinkListItem, void, undefined> {
    yield* this.autoPaginate<LinkListItem>('/link', params);
  }

  async update(id: string, params: UpdateLinkParams): Promise<LinkListItem> {
    const response = await this.httpClient.post<PaginatedApiResponse<LinkListItem>>(
      `/link/${id}`,
      params,
    );
    if (!response.Items || response.Items.length === 0) {
      throw new Error(`Link update for '${id}' returned no items`);
    }
    return response.Items[0];
  }
}
