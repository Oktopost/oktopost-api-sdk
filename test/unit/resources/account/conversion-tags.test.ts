import { describe, it, expect } from 'vitest';
import { ConversionTagsResource } from '../../../../src/resources/account/conversion-tags.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('ConversionTagsResource', () => {
  it('list calls GET /conversion-tag', async () => {
    const http = createMockHttpClient();
    const tags = new ConversionTagsResource(http);
    const mockResponse = {
      Result: true,
      Items: [{ Id: 'ct1', Tag: 'signup', Value: '10.00', Status: 'active', Conversions: 5 }],
      Total: 1,
    };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await tags.list();

    expect(http.get).toHaveBeenCalledWith('/conversion-tag');
    expect(result).toEqual(mockResponse);
  });
});
