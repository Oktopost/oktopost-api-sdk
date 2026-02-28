import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type { ReplaceLeadLinkParams } from '../../types/leads.js';

export class LeadLinksResource extends BaseResource {
  async replace(params: ReplaceLeadLinkParams): Promise<BaseApiResponse> {
    return this.httpClient.post<BaseApiResponse>(
      '/lead-link-replace',
      params,
    );
  }
}
