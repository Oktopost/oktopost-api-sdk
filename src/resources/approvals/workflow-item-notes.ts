import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type { WorkflowItemNoteListResponse } from '../../types/approvals.js';

export class WorkflowItemNotesResource extends BaseResource {
  async list(itemId: string): Promise<WorkflowItemNoteListResponse> {
    return this.httpClient.get<WorkflowItemNoteListResponse>(
      '/workflow-item-note',
      { id: itemId },
    );
  }

  async create(itemId: string, note: string): Promise<BaseApiResponse> {
    const query = new URLSearchParams({ id: itemId, note }).toString();
    return this.httpClient.put<BaseApiResponse>(`/workflow-item-note?${query}`);
  }
}
