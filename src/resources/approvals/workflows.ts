import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type { Workflow, WorkflowListParams, WorkflowGetParams } from '../../types/approvals.js';

export class WorkflowsResource extends BaseResource {
  async get(id: string, params?: WorkflowGetParams): Promise<Workflow> {
    return this.httpClient.get<Workflow>(
      `/workflow/${id}`,
      params,
    );
  }

  async list(params?: WorkflowListParams): Promise<Workflow[]> {
    const response = await this.httpClient.get<BaseApiResponse & { Items: Workflow[] }>(
      '/workflow',
      params,
    );
    return response.Items;
  }
}
