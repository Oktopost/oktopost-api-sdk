import { BaseResource } from '../base-resource.js';
import type { CalendarParams, CalendarResponse } from '../../types/publishing.js';

export class CalendarResource extends BaseResource {
  async get(params: CalendarParams): Promise<CalendarResponse> {
    return this.httpClient.post<CalendarResponse>(
      '/calendar',
      params,
    );
  }
}
