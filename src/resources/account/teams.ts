import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type { Team, CreateTeamParams, UpdateTeamParams } from '../../types/account.js';

export class TeamsResource extends BaseResource {
  async get(id: string): Promise<Team> {
    const response = await this.httpClient.get<SingleApiResponse<'Team', Team>>(`/team/${id}`);
    return response.Team;
  }

  async list(): Promise<PaginatedApiResponse<Team>> {
    return this.httpClient.get<PaginatedApiResponse<Team>>('/team');
  }

  async *listAll(): AsyncGenerator<Team, void, undefined> {
    yield* this.autoPaginate<Team>('/team');
  }

  async create(params: CreateTeamParams): Promise<Team> {
    const response = await this.httpClient.post<SingleApiResponse<'Team', Team>>(
      '/team',
      params,
    );
    return response.Team;
  }

  async update(id: string, params: UpdateTeamParams): Promise<Team> {
    const response = await this.httpClient.post<SingleApiResponse<'Team', Team>>(
      `/team/${id}`,
      params,
    );
    return response.Team;
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/team/${id}`);
  }
}
