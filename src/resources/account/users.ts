import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type { User, UserListItem, CreateUserParams, UpdateUserParams } from '../../types/account.js';

export class UsersResource extends BaseResource {
  async get(id: string): Promise<User> {
    const response = await this.httpClient.get<SingleApiResponse<'User', User>>(`/user/${id}`);
    return response.User;
  }

  async list(): Promise<PaginatedApiResponse<UserListItem>> {
    return this.httpClient.get<PaginatedApiResponse<UserListItem>>('/user');
  }

  async *listAll(): AsyncGenerator<UserListItem, void, undefined> {
    yield* this.autoPaginate<UserListItem>('/user');
  }

  async create(params: CreateUserParams): Promise<User> {
    const response = await this.httpClient.post<SingleApiResponse<'User', User>>(
      '/user',
      params,
    );
    return response.User;
  }

  async update(id: string, params: UpdateUserParams): Promise<User> {
    const response = await this.httpClient.post<SingleApiResponse<'User', User>>(
      `/user/${id}`,
      params,
    );
    return response.User;
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/user/${id}`);
  }
}
