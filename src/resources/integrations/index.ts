import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type {
  Integration,
  IntegrationListItem,
  IntegrationListParams,
  IntegrationGetParams,
  CreateIntegrationParams,
  UpdateIntegrationParams,
} from '../../types/integrations.js';

export class IntegrationsNamespace extends BaseResource {
  async get(id: string, params?: IntegrationGetParams): Promise<Integration> {
    const response = await this.httpClient.get<SingleApiResponse<'Integration', Integration>>(
      `/integration/${id}`,
      params,
    );
    return response.Integration;
  }

  async list(params?: IntegrationListParams): Promise<PaginatedApiResponse<IntegrationListItem>> {
    return this.httpClient.get<PaginatedApiResponse<IntegrationListItem>>(
      '/integration',
      params,
    );
  }

  async *listAll(
    params?: Omit<IntegrationListParams, '_page' | '_count'>,
  ): AsyncGenerator<IntegrationListItem, void, undefined> {
    yield* this.autoPaginate<IntegrationListItem>(
      '/integration',
      params,
    );
  }

  async create(params: CreateIntegrationParams): Promise<Integration> {
    const response = await this.httpClient.post<SingleApiResponse<'Integration', Integration>>(
      '/integration',
      params,
    );
    return response.Integration;
  }

  async update(id: string, params: UpdateIntegrationParams): Promise<Integration> {
    const response = await this.httpClient.post<SingleApiResponse<'Integration', Integration>>(
      `/integration/${id}`,
      params,
    );
    return response.Integration;
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/integration/${id}`);
  }
}
