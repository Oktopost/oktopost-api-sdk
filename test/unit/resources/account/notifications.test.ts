import { describe, it, expect } from 'vitest';
import { NotificationsResource } from '../../../../src/resources/account/notifications.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('NotificationsResource', () => {
  it('get calls GET /notification and returns Items object', async () => {
    const http = createMockHttpClient();
    const notifications = new NotificationsResource(http);
    const mockSettings = {
      EmailDaily: true,
      EmailWeekly: false,
      EmailCampaignComplete: true,
      EmailOnNewAssignment: true,
      EmailOnNoteAdded: false,
      EmailOnNoteMention: false,
      EmailOnStatusChange: true,
      SendDailyEmailReport: false,
    };
    (http.get as any).mockResolvedValue({ Result: true, Items: mockSettings });

    const result = await notifications.get();

    expect(http.get).toHaveBeenCalledWith('/notification');
    expect(result).toEqual(mockSettings);
  });

  it('update calls POST /notification with params', async () => {
    const http = createMockHttpClient();
    const notifications = new NotificationsResource(http);
    const mockSettings = {
      EmailDaily: false,
      EmailWeekly: true,
      EmailCampaignComplete: true,
      EmailOnNewAssignment: true,
      EmailOnNoteAdded: false,
      EmailOnNoteMention: false,
      EmailOnStatusChange: true,
      SendDailyEmailReport: false,
    };
    (http.post as any).mockResolvedValue({ Result: true, Items: mockSettings });

    const params = { EmailDaily: 0 as const, EmailWeekly: 1 as const };
    const result = await notifications.update(params);

    expect(http.post).toHaveBeenCalledWith('/notification', params);
    expect(result).toEqual(mockSettings);
  });
});
