import { describe, it, expect } from 'vitest';
import { AdvocacyNamespace } from '../../../../src/resources/advocacy/index.js';
import { AdvocatesResource } from '../../../../src/resources/advocacy/advocates.js';
import { BoardsResource } from '../../../../src/resources/advocacy/boards.js';
import { StoriesResource } from '../../../../src/resources/advocacy/stories.js';
import { BoardMessagesResource } from '../../../../src/resources/advocacy/board-messages.js';
import { TopicsResource } from '../../../../src/resources/advocacy/topics.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('AdvocacyNamespace', () => {
  it('exposes all advocacy resources', () => {
    const http = createMockHttpClient();
    const advocacy = new AdvocacyNamespace(http);

    expect(advocacy.advocates).toBeInstanceOf(AdvocatesResource);
    expect(advocacy.boards).toBeInstanceOf(BoardsResource);
    expect(advocacy.stories).toBeInstanceOf(StoriesResource);
    expect(advocacy.boardMessages).toBeInstanceOf(BoardMessagesResource);
    expect(advocacy.topics).toBeInstanceOf(TopicsResource);
  });
});
