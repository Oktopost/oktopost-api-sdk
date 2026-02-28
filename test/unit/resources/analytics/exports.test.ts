import { describe, it, expect } from 'vitest';
import { ExportsResource } from '../../../../src/resources/analytics/exports.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('ExportsResource', () => {
  it('get calls GET /bi-export/{id} and returns Export', async () => {
    const http = createMockHttpClient();
    const exports = new ExportsResource(http);
    const mockExport = { Id: 'exp1', Type: 'Posts', Status: 'active', LastRunDate: '2024-01-01', LastRunFile: 'https://s3.url' };
    (http.get as any).mockResolvedValue({ Result: true, Export: mockExport });

    const result = await exports.get('exp1');

    expect(http.get).toHaveBeenCalledWith('/bi-export/exp1');
    expect(result).toEqual(mockExport);
  });

  it('list calls GET /bi-export with params and returns Exports/Total', async () => {
    const http = createMockHttpClient();
    const exports = new ExportsResource(http);
    const mockExports = [{ Id: 'exp1', Type: 'Posts', Status: 'active' }];
    (http.get as any).mockResolvedValue({ Result: true, Exports: mockExports, Total: 1 });

    const result = await exports.list({ status: 'active' });

    expect(http.get).toHaveBeenCalledWith('/bi-export', { status: 'active' });
    expect(result.Exports).toEqual(mockExports);
    expect(result.Total).toBe(1);
  });

  it('list calls without params', async () => {
    const http = createMockHttpClient();
    const exports = new ExportsResource(http);
    (http.get as any).mockResolvedValue({ Result: true, Exports: [], Total: 0 });

    const result = await exports.list();

    expect(http.get).toHaveBeenCalledWith('/bi-export', undefined);
    expect(result.Total).toBe(0);
  });
});
