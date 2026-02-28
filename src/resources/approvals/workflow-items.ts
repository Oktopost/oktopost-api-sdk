import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type {
  WorkflowItem,
  WorkflowItemListParams,
  WorkflowItemListResponse,
  CreateWorkflowItemParams,
  ApproveRejectParams,
} from '../../types/approvals.js';

export class WorkflowItemsResource extends BaseResource {
  async list(params?: WorkflowItemListParams): Promise<WorkflowItemListResponse> {
    return this.httpClient.get<WorkflowItemListResponse>(
      '/workflow-item',
      params,
    );
  }

  async create(params: CreateWorkflowItemParams): Promise<WorkflowItem> {
    const response = await this.httpClient.post<BaseApiResponse & { Data: WorkflowItem }>(
      '/workflow-item',
      params,
    );
    return response.Data;
  }

  async approve(id: string, params?: ApproveRejectParams): Promise<WorkflowItem> {
    const response = await this.httpClient.post<BaseApiResponse & { Data: WorkflowItem }>(
      `/workflow-item/${id}`,
      { ...params, isApprove: 1 },
    );
    return response.Data;
  }

  async reject(id: string, params?: ApproveRejectParams): Promise<WorkflowItem> {
    const response = await this.httpClient.post<BaseApiResponse & { Data: WorkflowItem }>(
      `/workflow-item/${id}`,
      { ...params, isApprove: 0 },
    );
    return response.Data;
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/workflow-item/${id}`);
  }
}
