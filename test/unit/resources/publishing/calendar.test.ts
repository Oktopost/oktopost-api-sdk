import { describe, it, expect } from 'vitest';
import { CalendarResource } from '../../../../src/resources/publishing/calendar.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('CalendarResource', () => {
  it('get calls POST /calendar with params', async () => {
    const http = createMockHttpClient();
    const calendar = new CalendarResource(http);
    const mockResponse = {
      Result: true,
      Campaigns: { '002abc': { Color: '#ff0000', Id: '002abc', Name: 'Test', Status: 'active' } },
      Credentials: {},
      Media: [],
      Messages: {},
      Posts: {},
    };
    (http.post as any).mockResolvedValue(mockResponse);

    const params = { fromDate: '2024-01-01', toDate: '2024-01-31' };
    const result = await calendar.get(params);

    expect(http.post).toHaveBeenCalledWith('/calendar', params);
    expect(result).toEqual(mockResponse);
  });

  it('get passes filters', async () => {
    const http = createMockHttpClient();
    const calendar = new CalendarResource(http);
    (http.post as any).mockResolvedValue({ Result: true, Campaigns: {}, Credentials: {}, Media: [], Messages: {}, Posts: {} });

    const params = {
      fromDate: '2024-01-01',
      toDate: '2024-01-31',
      filters: { campaigns: ['002abc'], networks: ['Twitter'] },
    };
    await calendar.get(params);

    expect(http.post).toHaveBeenCalledWith('/calendar', params);
  });
});
