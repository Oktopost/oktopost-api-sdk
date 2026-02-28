import { describe, it, expect } from 'vitest';
import { IntegrationsNamespace } from '../../../../src/resources/integrations/index.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('IntegrationsNamespace', () => {
  it('get calls GET /integration/{id}', async () => {
    const http = createMockHttpClient();
    const integrations = new IntegrationsNamespace(http);
    const mockIntegration = { Id: 'i1', Type: 'salesforce' };
    (http.get as any).mockResolvedValue({ Result: true, Integration: mockIntegration });

    const result = await integrations.get('i1');

    expect(http.get).toHaveBeenCalledWith('/integration/i1', undefined);
    expect(result).toEqual(mockIntegration);
  });

  it('get passes withAssets param', async () => {
    const http = createMockHttpClient();
    const integrations = new IntegrationsNamespace(http);
    (http.get as any).mockResolvedValue({ Result: true, Integration: { Id: 'i1', Assets: {} } });

    await integrations.get('i1', { withAssets: 1 });

    expect(http.get).toHaveBeenCalledWith('/integration/i1', { withAssets: 1 });
  });

  it('list calls GET /integration', async () => {
    const http = createMockHttpClient();
    const integrations = new IntegrationsNamespace(http);
    const mockResponse = { Result: true, Items: [{ Id: 'i1' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await integrations.list({ type: 'salesforce' });

    expect(http.get).toHaveBeenCalledWith('/integration', { type: 'salesforce' });
    expect(result).toEqual(mockResponse);
  });

  it('listAll yields all items', async () => {
    const http = createMockHttpClient();
    const integrations = new IntegrationsNamespace(http);
    (http.get as any).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: 'i1' }, { Id: 'i2' }],
      Total: 2,
    });

    const items = [];
    for await (const item of integrations.listAll()) {
      items.push(item);
    }

    expect(items).toHaveLength(2);
  });

  it('create calls POST /integration', async () => {
    const http = createMockHttpClient();
    const integrations = new IntegrationsNamespace(http);
    const mockIntegration = { Id: 'i1', Type: 'salesforce' };
    (http.post as any).mockResolvedValue({ Result: true, Integration: mockIntegration });

    const result = await integrations.create({ type: 'salesforce', cnameId: 'cn1' });

    expect(http.post).toHaveBeenCalledWith('/integration', { type: 'salesforce', cnameId: 'cn1' });
    expect(result).toEqual(mockIntegration);
  });

  it('update calls POST /integration/{id}', async () => {
    const http = createMockHttpClient();
    const integrations = new IntegrationsNamespace(http);
    const mockIntegration = { Id: 'i1', Type: 'salesforce', State: 'disabled' };
    (http.post as any).mockResolvedValue({ Result: true, Integration: mockIntegration });

    const result = await integrations.update('i1', { state: 'disabled' });

    expect(http.post).toHaveBeenCalledWith('/integration/i1', { state: 'disabled' });
    expect(result).toEqual(mockIntegration);
  });

  it('delete calls DELETE /integration/{id}', async () => {
    const http = createMockHttpClient();
    const integrations = new IntegrationsNamespace(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await integrations.delete('i1');

    expect(http.delete).toHaveBeenCalledWith('/integration/i1');
    expect(result.Result).toBe(true);
  });
});
