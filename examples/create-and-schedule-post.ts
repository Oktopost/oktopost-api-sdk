import { Oktopost } from 'oktopost';

const client = new Oktopost({
  accountId: process.env.OKTOPOST_ACCOUNT_ID!,
  apiKey: process.env.OKTOPOST_API_KEY!,
});

async function main() {
  const message = await client.publishing.messages.create({
    campaignId: '002abc',
    networks: 'Twitter',
    text: 'Check out our latest blog post! #oktopost',
    credentialIds: 'cred123',
  });
  console.log('Created message:', message.Id);

  const post = await client.publishing.posts.create({
    messageId: message.Id,
    credentialId: 'cred123',
    network: 'Twitter',
    scheduledTime: Math.floor(Date.now() / 1000) + 3600,
  });
  console.log('Scheduled post:', post.Id, 'for 1 hour from now');
}

main().catch(console.error);
