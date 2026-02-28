import { BaseResource } from '../base-resource.js';
import type { PaginatedApiResponse } from '../../types/common.js';
import type { ConversionTag } from '../../types/account.js';

export class ConversionTagsResource extends BaseResource {
  async list(): Promise<PaginatedApiResponse<ConversionTag>> {
    return this.httpClient.get<PaginatedApiResponse<ConversionTag>>('/conversion-tag');
  }
}
