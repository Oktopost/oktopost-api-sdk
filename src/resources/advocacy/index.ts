import type { BaseHttpClient } from '../../http/base-client.js';
import { AdvocatesResource } from './advocates.js';
import { BoardsResource } from './boards.js';
import { StoriesResource } from './stories.js';
import { BoardMessagesResource } from './board-messages.js';
import { TopicsResource } from './topics.js';

export class AdvocacyNamespace {
  readonly advocates: AdvocatesResource;
  readonly boards: BoardsResource;
  readonly stories: StoriesResource;
  readonly boardMessages: BoardMessagesResource;
  readonly topics: TopicsResource;

  constructor(httpClient: BaseHttpClient) {
    this.advocates = new AdvocatesResource(httpClient);
    this.boards = new BoardsResource(httpClient);
    this.stories = new StoriesResource(httpClient);
    this.boardMessages = new BoardMessagesResource(httpClient);
    this.topics = new TopicsResource(httpClient);
  }
}

export { AdvocatesResource } from './advocates.js';
export { BoardsResource } from './boards.js';
export { StoriesResource } from './stories.js';
export { BoardMessagesResource } from './board-messages.js';
export { TopicsResource } from './topics.js';
