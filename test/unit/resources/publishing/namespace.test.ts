import { describe, it, expect } from 'vitest';
import { PublishingNamespace } from '../../../../src/resources/publishing/index.js';
import { CampaignsResource } from '../../../../src/resources/publishing/campaigns.js';
import { MessagesResource } from '../../../../src/resources/publishing/messages.js';
import { PostsResource } from '../../../../src/resources/publishing/posts.js';
import { PostLogResource } from '../../../../src/resources/publishing/post-log.js';
import { MediaResource } from '../../../../src/resources/publishing/media.js';
import { UploadsResource } from '../../../../src/resources/publishing/uploads.js';
import { CalendarResource } from '../../../../src/resources/publishing/calendar.js';
import { TagsResource } from '../../../../src/resources/publishing/tags.js';
import { LinksResource } from '../../../../src/resources/publishing/links.js';
import { createMockHttpClient } from '../../../helpers/mock-http-client.js';

describe('PublishingNamespace', () => {
  it('creates all resource instances', () => {
    const http = createMockHttpClient();
    const publishing = new PublishingNamespace(http);

    expect(publishing.campaigns).toBeInstanceOf(CampaignsResource);
    expect(publishing.messages).toBeInstanceOf(MessagesResource);
    expect(publishing.posts).toBeInstanceOf(PostsResource);
    expect(publishing.postLog).toBeInstanceOf(PostLogResource);
    expect(publishing.media).toBeInstanceOf(MediaResource);
    expect(publishing.uploads).toBeInstanceOf(UploadsResource);
    expect(publishing.calendar).toBeInstanceOf(CalendarResource);
    expect(publishing.tags).toBeInstanceOf(TagsResource);
    expect(publishing.links).toBeInstanceOf(LinksResource);
  });
});
