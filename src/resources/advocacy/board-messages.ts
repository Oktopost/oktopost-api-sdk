import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type { AddBoardMessageParams, RemoveBoardMessageParams } from '../../types/advocacy.js';

export class BoardMessagesResource extends BaseResource {
  async add(params: AddBoardMessageParams): Promise<BaseApiResponse> {
    return this.httpClient.post<BaseApiResponse>(
      '/board-message',
      params,
    );
  }

  async remove(params: RemoveBoardMessageParams): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>('/board-message', {
      boardId: params.boardId,
      messageId: params.messageId,
    });
  }
}
