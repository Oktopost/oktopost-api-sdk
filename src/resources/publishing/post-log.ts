import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type { Postlog, PostlogStats, PostlogGetParams } from '../../types/publishing.js';

export class PostLogResource extends BaseResource {
  async listByPost(postId: string): Promise<Postlog[]> {
    const response = await this.httpClient.get<BaseApiResponse & { Postlogs: Postlog[] }>(
      '/postlog',
      { postId },
    );
    return response.Postlogs ?? [];
  }

  async get(id: string, params?: PostlogGetParams): Promise<Postlog> {
    const response = await this.httpClient.get<
      BaseApiResponse & { Postlog: Postlog; Stats?: PostlogStats }
    >(`/postlog/${id}`, params);
    if (response.Stats) {
      return { ...response.Postlog, Stats: response.Stats };
    }
    return response.Postlog;
  }
}
