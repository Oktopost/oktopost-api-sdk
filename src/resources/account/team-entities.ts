import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type { Team, AddTeamEntitiesParams, RemoveTeamEntitiesParams } from '../../types/account.js';

export class TeamEntitiesResource extends BaseResource {
  async list(entityId: string): Promise<Team[]> {
    const response = await this.httpClient.get<BaseApiResponse & { Items: Team[] }>(
      `/team-entity/${entityId}`,
    );
    return response.Items;
  }

  async add(entityId: string, params: AddTeamEntitiesParams): Promise<BaseApiResponse> {
    return this.httpClient.post<BaseApiResponse>(
      `/team-entity/${entityId}`,
      params,
    );
  }

  async remove(entityId: string, params: RemoveTeamEntitiesParams): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(
      `/team-entity/${entityId}`,
      params,
    );
  }
}
