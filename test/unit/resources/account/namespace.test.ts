import { describe, it, expect } from 'vitest';
import { AccountNamespace } from '../../../../src/resources/account/index.js';
import { UsersResource } from '../../../../src/resources/account/users.js';
import { TeamsResource } from '../../../../src/resources/account/teams.js';
import { TeamEntitiesResource } from '../../../../src/resources/account/team-entities.js';
import { SocialProfilesResource } from '../../../../src/resources/account/social-profiles.js';
import { CnamesResource } from '../../../../src/resources/account/cnames.js';
import { ConversionTagsResource } from '../../../../src/resources/account/conversion-tags.js';
import { NotificationsResource } from '../../../../src/resources/account/notifications.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('AccountNamespace', () => {
  it('creates all resource instances', () => {
    const http = createMockHttpClient();
    const account = new AccountNamespace(http);

    expect(account.users).toBeInstanceOf(UsersResource);
    expect(account.teams).toBeInstanceOf(TeamsResource);
    expect(account.teamEntities).toBeInstanceOf(TeamEntitiesResource);
    expect(account.socialProfiles).toBeInstanceOf(SocialProfilesResource);
    expect(account.cnames).toBeInstanceOf(CnamesResource);
    expect(account.conversionTags).toBeInstanceOf(ConversionTagsResource);
    expect(account.notifications).toBeInstanceOf(NotificationsResource);
  });
});
