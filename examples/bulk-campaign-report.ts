import { Oktopost, collectAll } from 'oktopost';

const client = new Oktopost({
  accountId: process.env.OKTOPOST_ACCOUNT_ID!,
  apiKey: process.env.OKTOPOST_API_KEY!,
});

async function main() {
  const allCampaigns = await collectAll(client.publishing.campaigns.listAll({ status: 'active' }));
  console.log(`Generating report for ${allCampaigns.length} active campaigns\n`);

  for (const campaign of allCampaigns) {
    const posts = await collectAll(
      client.publishing.posts.listAll({ campaignId: campaign.Id }),
    );

    let totalClicks = 0;
    let totalShares = 0;

    for (const post of posts) {
      if (post.Stats) {
        totalClicks += Number(post.Stats.Clicks || 0);
        totalShares += Number(post.Stats.Shares || 0);
      }
    }

    console.log(`Campaign: ${campaign.Name}`);
    console.log(`  Posts: ${posts.length}`);
    console.log(`  Clicks: ${totalClicks}`);
    console.log(`  Shares: ${totalShares}`);
    console.log();
  }
}

main().catch(console.error);
