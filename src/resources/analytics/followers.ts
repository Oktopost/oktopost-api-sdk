import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type { FollowerDataPoint, FollowersParams } from '../../types/analytics.js';

export class FollowersResource extends BaseResource {
  async get(credentialId: string, params?: FollowersParams): Promise<FollowerDataPoint[]> {
    const response = await this.httpClient.get<BaseApiResponse & { Data: FollowerDataPoint[] }>(
      `/followers/${credentialId}`,
      params,
    );
    return response.Data;
  }
}
