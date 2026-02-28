import type { BaseHttpClient } from '../../http/base-client.js';
import { CommentsResource } from './comments.js';

export class InboxNamespace {
  readonly comments: CommentsResource;

  constructor(httpClient: BaseHttpClient) {
    this.comments = new CommentsResource(httpClient);
  }
}

export { CommentsResource } from './comments.js';
