import { describe, it, expect } from 'vitest';
import { StreamsNamespace } from '../../../../src/resources/streams/index.js';
import { StreamTabsResource } from '../../../../src/resources/streams/stream-tabs.js';
import { StreamsResource } from '../../../../src/resources/streams/streams.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('StreamsNamespace', () => {
  it('exposes tabs and streams resources', () => {
    const http = createMockHttpClient();
    const ns = new StreamsNamespace(http);

    expect(ns.tabs).toBeInstanceOf(StreamTabsResource);
    expect(ns.streams).toBeInstanceOf(StreamsResource);
  });
});
