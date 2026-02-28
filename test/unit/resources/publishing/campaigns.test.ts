import { describe, it, expect } from 'vitest';
import { CampaignsResource } from '../../../../src/resources/publishing/campaigns.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('CampaignsResource', () => {
  it('get calls GET /campaign/{id}', async () => {
    const http = createMockHttpClient();
    const campaigns = new CampaignsResource(http);
    const mockCampaign = { Id: '002abc', Name: 'Test Campaign' };
    (http.get as any).mockResolvedValue({ Result: true, Campaign: mockCampaign });

    const result = await campaigns.get('002abc');

    expect(http.get).toHaveBeenCalledWith('/campaign/002abc', undefined);
    expect(result).toEqual(mockCampaign);
  });

  it('get passes withTags param', async () => {
    const http = createMockHttpClient();
    const campaigns = new CampaignsResource(http);
    (http.get as any).mockResolvedValue({ Result: true, Campaign: { Id: '002abc', Tags: ['tag1'] } });

    await campaigns.get('002abc', { withTags: 1 });

    expect(http.get).toHaveBeenCalledWith('/campaign/002abc', { withTags: 1 });
  });

  it('list calls GET /campaign with params', async () => {
    const http = createMockHttpClient();
    const campaigns = new CampaignsResource(http);
    const mockResponse = { Result: true, Items: [{ Id: '002abc' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await campaigns.list({ status: 'active', q: 'test' });

    expect(http.get).toHaveBeenCalledWith('/campaign', { status: 'active', q: 'test' });
    expect(result).toEqual(mockResponse);
  });

  it('listAll yields all items', async () => {
    const http = createMockHttpClient();
    const campaigns = new CampaignsResource(http);
    (http.get as any).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: '1' }, { Id: '2' }],
      Total: 2,
    });

    const items = [];
    for await (const item of campaigns.listAll({ status: 'active' })) {
      items.push(item);
    }

    expect(items).toHaveLength(2);
  });

  it('create calls POST /campaign', async () => {
    const http = createMockHttpClient();
    const campaigns = new CampaignsResource(http);
    const mockCampaign = { Id: '002new', Name: 'New Campaign' };
    (http.post as any).mockResolvedValue({ Result: true, Campaign: mockCampaign });

    const result = await campaigns.create({ name: 'New Campaign', url: 'https://example.com' });

    expect(http.post).toHaveBeenCalledWith('/campaign', { name: 'New Campaign', url: 'https://example.com' });
    expect(result).toEqual(mockCampaign);
  });

  it('update calls POST /campaign/{id}', async () => {
    const http = createMockHttpClient();
    const campaigns = new CampaignsResource(http);
    const mockCampaign = { Id: '002abc', Status: 'paused' };
    (http.post as any).mockResolvedValue({ Result: true, Campaign: mockCampaign });

    const result = await campaigns.update('002abc', { status: 'paused' });

    expect(http.post).toHaveBeenCalledWith('/campaign/002abc', { status: 'paused' });
    expect(result).toEqual(mockCampaign);
  });

  it('delete calls DELETE /campaign/{id}', async () => {
    const http = createMockHttpClient();
    const campaigns = new CampaignsResource(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await campaigns.delete('002abc');

    expect(http.delete).toHaveBeenCalledWith('/campaign/002abc');
    expect(result.Result).toBe(true);
  });
});
