import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type { Cname, CreateCnameParams, UpdateCnameParams } from '../../types/account.js';

export class CnamesResource extends BaseResource {
  async list(): Promise<PaginatedApiResponse<Cname>> {
    return this.httpClient.get<PaginatedApiResponse<Cname>>('/cname');
  }

  async create(params: CreateCnameParams): Promise<Cname> {
    const response = await this.httpClient.post<SingleApiResponse<'Cname', Cname>>(
      '/cname',
      params,
    );
    return response.Cname;
  }

  async update(id: string, params: UpdateCnameParams): Promise<Cname> {
    const response = await this.httpClient.post<SingleApiResponse<'Cname', Cname>>(
      `/cname/${id}`,
      params,
    );
    return response.Cname;
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/cname/${id}`);
  }
}
