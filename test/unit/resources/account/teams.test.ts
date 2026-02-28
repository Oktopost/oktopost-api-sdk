import { describe, it, expect } from 'vitest';
import { TeamsResource } from '../../../../src/resources/account/teams.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('TeamsResource', () => {
  it('get calls GET /team/{id}', async () => {
    const http = createMockHttpClient();
    const teams = new TeamsResource(http);
    const mockTeam = { Id: 'team1', Name: 'Engineering' };
    (http.get as any).mockResolvedValue({ Result: true, Team: mockTeam });

    const result = await teams.get('team1');

    expect(http.get).toHaveBeenCalledWith('/team/team1');
    expect(result).toEqual(mockTeam);
  });

  it('list calls GET /team', async () => {
    const http = createMockHttpClient();
    const teams = new TeamsResource(http);
    const mockResponse = { Result: true, Items: [{ Id: 'team1' }], Total: 1 };
    (http.get as any).mockResolvedValue(mockResponse);

    const result = await teams.list();

    expect(http.get).toHaveBeenCalledWith('/team');
    expect(result).toEqual(mockResponse);
  });

  it('listAll yields all items', async () => {
    const http = createMockHttpClient();
    const teams = new TeamsResource(http);
    (http.get as any).mockResolvedValueOnce({
      Result: true,
      Items: [{ Id: '1' }],
      Total: 1,
    });

    const items = [];
    for await (const item of teams.listAll()) {
      items.push(item);
    }

    expect(items).toHaveLength(1);
  });

  it('create calls POST /team', async () => {
    const http = createMockHttpClient();
    const teams = new TeamsResource(http);
    const mockTeam = { Id: 'team2', Name: 'Marketing' };
    (http.post as any).mockResolvedValue({ Result: true, Team: mockTeam });

    const result = await teams.create({ name: 'Marketing' });

    expect(http.post).toHaveBeenCalledWith('/team', { name: 'Marketing' });
    expect(result).toEqual(mockTeam);
  });

  it('update calls POST /team/{id}', async () => {
    const http = createMockHttpClient();
    const teams = new TeamsResource(http);
    const mockTeam = { Id: 'team1', Name: 'Eng Updated' };
    (http.post as any).mockResolvedValue({ Result: true, Team: mockTeam });

    const result = await teams.update('team1', { name: 'Eng Updated' });

    expect(http.post).toHaveBeenCalledWith('/team/team1', { name: 'Eng Updated' });
    expect(result).toEqual(mockTeam);
  });

  it('delete calls DELETE /team/{id}', async () => {
    const http = createMockHttpClient();
    const teams = new TeamsResource(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await teams.delete('team1');

    expect(http.delete).toHaveBeenCalledWith('/team/team1');
    expect(result.Result).toBe(true);
  });
});
