import express from 'express';
import { verifyWebhookSignature, constructEvent } from 'oktopost/webhooks';

const app = express();
const WEBHOOK_SECRET = process.env.OKTOPOST_WEBHOOK_SECRET!;

app.post('/webhooks/oktopost', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-oktopost-signature'] as string;

  try {
    const event = constructEvent(req.body, signature, WEBHOOK_SECRET);

    console.log(`Received event: ${event.event}`);
    console.log('Data:', JSON.stringify(event.data, null, 2));

    switch (event.event) {
      case 'postSent':
        console.log('Post was sent successfully');
        break;
      case 'newLead':
        console.log('New lead captured');
        break;
      case 'newApprovalItem':
        console.log('New item needs approval');
        break;
      default:
        console.log('Unhandled event type:', event.event);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook verification failed:', err);
    res.status(400).json({ error: 'Invalid signature' });
  }
});

app.listen(3000, () => console.log('Webhook server running on port 3000'));
