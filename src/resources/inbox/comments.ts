import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type { Comment, CommentListParams } from '../../types/inbox.js';

export class CommentsResource extends BaseResource {
  async list(params?: CommentListParams): Promise<Comment[]> {
    const response = await this.httpClient.get<BaseApiResponse & { Data: Comment[] }>(
      '/comments',
      params,
    );
    return response.Data;
  }
}
