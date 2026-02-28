import { BaseResource } from '../base-resource.js';
import type { PaginatedApiResponse } from '../../types/common.js';
import type { WebhookLogEntry } from '../../types/events.js';

export class WebhookLogResource extends BaseResource {
  async list(webhookId: string): Promise<PaginatedApiResponse<WebhookLogEntry>> {
    return this.httpClient.get<PaginatedApiResponse<WebhookLogEntry>>(
      `/webhook-log/${webhookId}`,
    );
  }
}
