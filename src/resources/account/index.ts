import type { BaseHttpClient } from '../../http/base-client.js';
import { UsersResource } from './users.js';
import { TeamsResource } from './teams.js';
import { TeamEntitiesResource } from './team-entities.js';
import { SocialProfilesResource } from './social-profiles.js';
import { CnamesResource } from './cnames.js';
import { ConversionTagsResource } from './conversion-tags.js';
import { NotificationsResource } from './notifications.js';

export class AccountNamespace {
  readonly users: UsersResource;
  readonly teams: TeamsResource;
  readonly teamEntities: TeamEntitiesResource;
  readonly socialProfiles: SocialProfilesResource;
  readonly cnames: CnamesResource;
  readonly conversionTags: ConversionTagsResource;
  readonly notifications: NotificationsResource;

  constructor(httpClient: BaseHttpClient) {
    this.users = new UsersResource(httpClient);
    this.teams = new TeamsResource(httpClient);
    this.teamEntities = new TeamEntitiesResource(httpClient);
    this.socialProfiles = new SocialProfilesResource(httpClient);
    this.cnames = new CnamesResource(httpClient);
    this.conversionTags = new ConversionTagsResource(httpClient);
    this.notifications = new NotificationsResource(httpClient);
  }
}

export { UsersResource } from './users.js';
export { TeamsResource } from './teams.js';
export { TeamEntitiesResource } from './team-entities.js';
export { SocialProfilesResource } from './social-profiles.js';
export { CnamesResource } from './cnames.js';
export { ConversionTagsResource } from './conversion-tags.js';
export { NotificationsResource } from './notifications.js';
