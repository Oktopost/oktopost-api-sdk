import { Oktopost, collectAll } from 'oktopost';

const client = new Oktopost({
  accountId: process.env.OKTOPOST_ACCOUNT_ID!,
  apiKey: process.env.OKTOPOST_API_KEY!,
});

async function main() {
  console.log('Streaming all posts with AsyncIterator:');
  let count = 0;
  for await (const post of client.publishing.posts.listAll({ campaignId: '002abc' })) {
    count++;
    console.log(`  Post ${post.Id}: ${post.Status}`);
  }
  console.log(`Total: ${count} posts\n`);

  console.log('Collecting all tags into an array:');
  const allTags = await collectAll(client.publishing.tags.listAll());
  console.log(`Got ${allTags.length} tags:`, allTags.map(t => t.Name));
}

main().catch(console.error);
