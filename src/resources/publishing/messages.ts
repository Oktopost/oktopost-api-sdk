import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type {
  Message,
  MessageListParams,
  CreateMessageParams,
  UpdateMessageParams,
} from '../../types/publishing.js';

export class MessagesResource extends BaseResource {
  async get(id: string, params?: { withTags?: 0 | 1 }): Promise<Message> {
    const response = await this.httpClient.get<SingleApiResponse<'Message', Message>>(
      `/message/${id}`,
      params,
    );
    return response.Message;
  }

  async list(params?: MessageListParams): Promise<PaginatedApiResponse<Message>> {
    return this.httpClient.get<PaginatedApiResponse<Message>>(
      '/message',
      params,
    );
  }

  async *listAll(
    params?: Omit<MessageListParams, '_page' | '_count'>,
  ): AsyncGenerator<Message, void, undefined> {
    yield* this.autoPaginate<Message>('/message', params);
  }

  async create(params: CreateMessageParams): Promise<Message> {
    const response = await this.httpClient.post<SingleApiResponse<'Message', Message>>(
      '/message',
      params,
    );
    return response.Message;
  }

  async update(id: string, params: UpdateMessageParams): Promise<Message> {
    const response = await this.httpClient.post<SingleApiResponse<'Message', Message>>(
      `/message/${id}`,
      params,
    );
    return response.Message;
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/message/${id}`);
  }
}
