import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse, PaginatedApiResponse, SingleApiResponse } from '../../types/common.js';
import type {
  Campaign,
  CampaignListItem,
  CampaignListParams,
  CampaignGetParams,
  CreateCampaignParams,
  UpdateCampaignParams,
} from '../../types/publishing.js';

export class CampaignsResource extends BaseResource {
  async get(id: string, params?: CampaignGetParams): Promise<Campaign> {
    const response = await this.httpClient.get<SingleApiResponse<'Campaign', Campaign>>(
      `/campaign/${id}`,
      params,
    );
    return response.Campaign;
  }

  async list(params?: CampaignListParams): Promise<PaginatedApiResponse<CampaignListItem>> {
    return this.httpClient.get<PaginatedApiResponse<CampaignListItem>>(
      '/campaign',
      params,
    );
  }

  async *listAll(
    params?: Omit<CampaignListParams, '_page' | '_count'>,
  ): AsyncGenerator<CampaignListItem, void, undefined> {
    yield* this.autoPaginate<CampaignListItem>(
      '/campaign',
      params,
    );
  }

  async create(params: CreateCampaignParams): Promise<Campaign> {
    const response = await this.httpClient.post<SingleApiResponse<'Campaign', Campaign>>(
      '/campaign',
      params,
    );
    return response.Campaign;
  }

  async update(id: string, params: UpdateCampaignParams): Promise<Campaign> {
    const response = await this.httpClient.post<SingleApiResponse<'Campaign', Campaign>>(
      `/campaign/${id}`,
      params,
    );
    return response.Campaign;
  }

  async delete(id: string): Promise<BaseApiResponse> {
    return this.httpClient.delete<BaseApiResponse>(`/campaign/${id}`);
  }
}
