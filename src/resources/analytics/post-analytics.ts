import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type { PostAnalyticsStats } from '../../types/analytics.js';

export class PostAnalyticsResource extends BaseResource {
  async get(postId: string): Promise<PostAnalyticsStats> {
    const response = await this.httpClient.get<BaseApiResponse & { Stats: PostAnalyticsStats }>(
      `/analytics/${postId}`,
    );
    return response.Stats;
  }
}
