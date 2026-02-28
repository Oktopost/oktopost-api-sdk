import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type { Lead, LeadListParams } from '../../types/leads.js';

export class LeadsResource extends BaseResource {
  async get(id: string): Promise<Lead> {
    const response = await this.httpClient.get<SingleApiResponse<'Lead', Lead>>(
      `/lead/${id}`,
    );
    return response.Lead;
  }

  async list(params?: LeadListParams): Promise<PaginatedApiResponse<Lead>> {
    return this.httpClient.get<PaginatedApiResponse<Lead>>(
      '/lead',
      params,
    );
  }

  async *listAll(
    params?: Omit<LeadListParams, '_page' | '_count'>,
  ): AsyncGenerator<Lead, void, undefined> {
    yield* this.autoPaginate<Lead>('/lead', params);
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/lead/${id}`);
  }
}
