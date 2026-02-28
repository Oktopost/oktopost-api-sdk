import { BaseResource } from '../base-resource.js';
import type { BaseApiResponse } from '../../types/common.js';
import type { NotificationSettings, UpdateNotificationParams } from '../../types/account.js';

export class NotificationsResource extends BaseResource {
  async get(): Promise<NotificationSettings> {
    const response = await this.httpClient.get<BaseApiResponse & { Items: NotificationSettings }>(
      '/notification',
    );
    return response.Items;
  }

  async update(params: UpdateNotificationParams): Promise<NotificationSettings> {
    const response = await this.httpClient.post<BaseApiResponse & { Items: NotificationSettings }>(
      '/notification',
      params,
    );
    return response.Items;
  }
}
