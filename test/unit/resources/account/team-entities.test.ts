import { describe, it, expect } from 'vitest';
import { TeamEntitiesResource } from '../../../../src/resources/account/team-entities.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('TeamEntitiesResource', () => {
  it('list calls GET /team-entity/{entityId} and returns items', async () => {
    const http = createMockHttpClient();
    const teamEntities = new TeamEntitiesResource(http);
    const mockTeams = [{ Id: 'team1', Name: 'Eng' }];
    (http.get as any).mockResolvedValue({ Result: true, Items: mockTeams });

    const result = await teamEntities.list('00A001');

    expect(http.get).toHaveBeenCalledWith('/team-entity/00A001');
    expect(result).toEqual(mockTeams);
  });

  it('add calls POST /team-entity/{entityId}', async () => {
    const http = createMockHttpClient();
    const teamEntities = new TeamEntitiesResource(http);
    (http.post as any).mockResolvedValue({ Result: true });

    const result = await teamEntities.add('00A001', { teamIds: 'team1,team2' });

    expect(http.post).toHaveBeenCalledWith('/team-entity/00A001', { teamIds: 'team1,team2' });
    expect(result.Result).toBe(true);
  });

  it('remove calls DELETE /team-entity/{entityId}', async () => {
    const http = createMockHttpClient();
    const teamEntities = new TeamEntitiesResource(http);
    (http.delete as any).mockResolvedValue({ Result: true });

    const result = await teamEntities.remove('00A001', { teamIds: 'team1' });

    expect(http.delete).toHaveBeenCalledWith('/team-entity/00A001', { teamIds: 'team1' });
    expect(result.Result).toBe(true);
  });
});
