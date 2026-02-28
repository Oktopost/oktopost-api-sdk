import type { BaseHttpClient } from '../../http/base-client.js';
import { StreamTabsResource } from './stream-tabs.js';
import { StreamsResource } from './streams.js';

export class StreamsNamespace {
  readonly tabs: StreamTabsResource;
  readonly streams: StreamsResource;

  constructor(httpClient: BaseHttpClient) {
    this.tabs = new StreamTabsResource(httpClient);
    this.streams = new StreamsResource(httpClient);
  }
}

export { StreamTabsResource } from './stream-tabs.js';
export { StreamsResource } from './streams.js';
