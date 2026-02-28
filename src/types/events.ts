export interface WebhookConfig {
  Id: string;
  Name: string;
  Description: string;
  Event: string;
  Url: string;
  LastExecutionDate: string;
  IsEnabled: number;
  Created: string;
  Modified: string;
  Secret?: string;
}

export interface WebhookConfigListParams {
  event?: string;
  name?: string;
  _order?: string;
  _page?: number;
  _count?: 20 | 25 | 50 | 100;
}

export interface CreateWebhookConfigParams {
  event: string;
  name: string;
  url: string;
  description?: string;
  isEnabled?: 0 | 1;
}

export interface UpdateWebhookConfigParams {
  event?: string;
  name?: string;
  url?: string;
  description?: string;
  isEnabled?: 0 | 1;
}

export interface WebhookLogEntry {
  Id: string;
  WebhookPayloadId: string;
  Created: string;
  ResponseCode: number;
  ExecutionTime: number;
  Payload: {
    event: string;
    data: Record<string, unknown>;
  };
}
