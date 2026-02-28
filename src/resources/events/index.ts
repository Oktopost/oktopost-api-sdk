import type { BaseHttpClient } from '../../http/base-client.js';
import { WebhookConfigsResource } from './webhooks.js';
import { WebhookLogResource } from './webhook-log.js';

export class EventsNamespace {
  readonly webhooks: WebhookConfigsResource;
  readonly webhookLog: WebhookLogResource;

  constructor(httpClient: BaseHttpClient) {
    this.webhooks = new WebhookConfigsResource(httpClient);
    this.webhookLog = new WebhookLogResource(httpClient);
  }
}

export { WebhookConfigsResource } from './webhooks.js';
export { WebhookLogResource } from './webhook-log.js';
