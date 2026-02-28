import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse } from '../../types/common.js';
import type { LeadActivity, LeadActivityListParams } from '../../types/leads.js';

export class LeadActivitiesResource extends BaseResource {
  async list(params?: LeadActivityListParams): Promise<PaginatedApiResponse<LeadActivity>> {
    return this.httpClient.get<PaginatedApiResponse<LeadActivity>>(
      '/lead-activity',
      params,
    );
  }

  async *listAll(
    params?: Omit<LeadActivityListParams, '_page' | '_count'>,
  ): AsyncGenerator<LeadActivity, void, undefined> {
    yield* this.autoPaginate<LeadActivity>(
      '/lead-activity',
      params,
    );
  }

  async delete(id: string, leadId: string): Promise<BaseApiResponse> {
    const query = new URLSearchParams({ leadId }).toString();
    return this.httpClient.delete<BaseApiResponse>(`/lead-activity/${id}?${query}`);
  }
}
