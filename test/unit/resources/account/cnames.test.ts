import { describe, it, expect } from 'vitest';
import { CnamesResource } from '../../../../src/resources/account/cnames.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('CnamesResource', () => {
  it('list calls GET /cname', async () => {
    const http = createMockHttpClient();
    const cnames = new CnamesResource(http);
    const mockResponse = { Result: true, Items: [{ Id: 'cn1', Name: 'go.test.com' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await cnames.list();

    expect(http.get).toHaveBeenCalledWith('/cname');
    expect(result).toEqual(mockResponse);
  });

  it('create calls POST /cname', async () => {
    const http = createMockHttpClient();
    const cnames = new CnamesResource(http);
    const mockCname = { Id: 'cn2', Name: 'go.new.com' };
    (http.post as any).mockResolvedValue({ Result: true, Cname: mockCname });

    const result = await cnames.create({ cname: 'go.new.com' });

    expect(http.post).toHaveBeenCalledWith('/cname', { cname: 'go.new.com' });
    expect(result).toEqual(mockCname);
  });

  it('update calls POST /cname/{id}', async () => {
    const http = createMockHttpClient();
    const cnames = new CnamesResource(http);
    const mockCname = { Id: 'cn1', Name: 'go.updated.com' };
    (http.post as any).mockResolvedValue({ Result: true, Cname: mockCname });

    const result = await cnames.update('cn1', { cname: 'go.updated.com' });

    expect(http.post).toHaveBeenCalledWith('/cname/cn1', { cname: 'go.updated.com' });
    expect(result).toEqual(mockCname);
  });

  it('delete calls DELETE /cname/{id}', async () => {
    const http = createMockHttpClient();
    const cnames = new CnamesResource(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await cnames.delete('cn1');

    expect(http.delete).toHaveBeenCalledWith('/cname/cn1');
    expect(result.Result).toBe(true);
  });
});
