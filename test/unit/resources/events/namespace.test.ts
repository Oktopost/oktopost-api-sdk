import { describe, it, expect } from 'vitest';
import { EventsNamespace } from '../../../../src/resources/events/index.js';
import { WebhookConfigsResource } from '../../../../src/resources/events/webhooks.js';
import { WebhookLogResource } from '../../../../src/resources/events/webhook-log.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('EventsNamespace', () => {
  it('exposes webhooks and webhookLog resources', () => {
    const http = createMockHttpClient();
    const events = new EventsNamespace(http);

    expect(events.webhooks).toBeInstanceOf(WebhookConfigsResource);
    expect(events.webhookLog).toBeInstanceOf(WebhookLogResource);
  });
});
