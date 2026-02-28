import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type { WorkflowStep, WorkflowStepListParams } from '../../types/approvals.js';

export class WorkflowStepsResource extends BaseResource {
  async get(id: string): Promise<WorkflowStep> {
    return this.httpClient.get<WorkflowStep>(`/workflow-step/${id}`);
  }

  async list(params?: WorkflowStepListParams): Promise<WorkflowStep[]> {
    const response = await this.httpClient.get<BaseApiResponse & { Items: WorkflowStep[] }>(
      '/workflow-step',
      params,
    );
    return response.Items;
  }
}
