import { describe, it, expect } from 'vitest';
import { InboxNamespace } from '../../../../src/resources/inbox/index.js';
import { CommentsResource } from '../../../../src/resources/inbox/comments.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('InboxNamespace', () => {
  it('exposes comments resource', () => {
    const http = createMockHttpClient();
    const inbox = new InboxNamespace(http);

    expect(inbox.comments).toBeInstanceOf(CommentsResource);
  });
});
