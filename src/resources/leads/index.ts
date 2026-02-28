import type { BaseHttpClient } from '../../http/base-client.js';
import { LeadsResource } from './leads.js';
import { LeadActivitiesResource } from './lead-activities.js';
import { LeadLinksResource } from './lead-links.js';

export class LeadsNamespace {
  readonly leads: LeadsResource;
  readonly activities: LeadActivitiesResource;
  readonly links: LeadLinksResource;

  constructor(httpClient: BaseHttpClient) {
    this.leads = new LeadsResource(httpClient);
    this.activities = new LeadActivitiesResource(httpClient);
    this.links = new LeadLinksResource(httpClient);
  }
}

export { LeadsResource } from './leads.js';
export { LeadActivitiesResource } from './lead-activities.js';
export { LeadLinksResource } from './lead-links.js';
