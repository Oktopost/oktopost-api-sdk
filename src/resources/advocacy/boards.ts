import { BaseResource } from '../base-resource.js';
import type { PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type { Board } from '../../types/advocacy.js';

export class BoardsResource extends BaseResource {
  async get(id: string): Promise<Board> {
    const response = await this.httpClient.get<SingleApiResponse<'Board', Board>>(
      `/board/${id}`,
    );
    return response.Board;
  }

  async list(): Promise<PaginatedApiResponse<Board>> {
    return this.httpClient.get<PaginatedApiResponse<Board>>('/board');
  }

  async *listAll(): AsyncGenerator<Board, void, undefined> {
    yield* this.autoPaginate<Board>('/board');
  }
}
