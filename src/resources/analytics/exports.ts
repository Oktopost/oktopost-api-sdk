import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type { ExportItem, ExportDetail, ExportListParams } from '../../types/analytics.js';

export class ExportsResource extends BaseResource {
  async get(id: string): Promise<ExportDetail> {
    const response = await this.httpClient.get<BaseApiResponse & { Export: ExportDetail }>(
      `/bi-export/${id}`,
    );
    return response.Export;
  }

  async list(
    params?: ExportListParams,
  ): Promise<{ Exports: ExportItem[]; Total: number }> {
    const response = await this.httpClient.get<
      BaseApiResponse & { Exports: ExportItem[]; Total: number }
    >('/bi-export', params);
    return { Exports: response.Exports, Total: response.Total };
  }
}
