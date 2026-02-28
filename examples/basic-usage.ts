import { Oktopost } from 'oktopost';

const client = new Oktopost({
  accountId: process.env.OKTOPOST_ACCOUNT_ID!,
  apiKey: process.env.OKTOPOST_API_KEY!,
  region: 'us',
});

async function main() {
  const me = await client.me();
  console.log('Account:', me.AccountId, '- User:', me.Name);

  const campaigns = await client.publishing.campaigns.list({ status: 'active' });
  console.log(`Found ${campaigns.Total} active campaigns`);

  for (const campaign of campaigns.Items) {
    console.log(`  - ${campaign.Id}: ${campaign.Name}`);
  }

  const users = await client.account.users.list();
  console.log(`\n${users.Total} users in account`);
}

main().catch(console.error);
