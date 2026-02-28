import { describe, it, expect } from 'vitest';
import { LeadsNamespace } from '../../../../src/resources/leads/index.js';
import { LeadsResource } from '../../../../src/resources/leads/leads.js';
import { LeadActivitiesResource } from '../../../../src/resources/leads/lead-activities.js';
import { LeadLinksResource } from '../../../../src/resources/leads/lead-links.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('LeadsNamespace', () => {
  it('exposes all leads resources', () => {
    const http = createMockHttpClient();
    const ns = new LeadsNamespace(http);

    expect(ns.leads).toBeInstanceOf(LeadsResource);
    expect(ns.activities).toBeInstanceOf(LeadActivitiesResource);
    expect(ns.links).toBeInstanceOf(LeadLinksResource);
  });
});
