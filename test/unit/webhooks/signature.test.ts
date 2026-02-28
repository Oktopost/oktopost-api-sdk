import { createHmac } from 'node:crypto';
import { verifyWebhookSignature, constructEvent } from '../../../src/webhooks/index.js';

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

describe('verifyWebhookSignature', () => {
  const secret = 'test-webhook-secret';

  it('returns true for valid signature', () => {
    const payload = '{"event":"postSent","data":{}}';
    const signature = sign(payload, secret);
    expect(verifyWebhookSignature(payload, signature, secret)).toBe(true);
  });

  it('returns false for tampered payload', () => {
    const payload = '{"event":"postSent","data":{}}';
    const signature = sign(payload, secret);
    expect(verifyWebhookSignature(payload + 'x', signature, secret)).toBe(false);
  });

  it('returns false for wrong secret', () => {
    const payload = '{"event":"postSent","data":{}}';
    const signature = sign(payload, secret);
    expect(verifyWebhookSignature(payload, signature, 'wrong-secret')).toBe(false);
  });

  it('returns false for invalid signature with different length', () => {
    expect(verifyWebhookSignature('{}', 'short', secret)).toBe(false);
  });

  it('works with Buffer input', () => {
    const payload = Buffer.from('{"event":"newLead","data":{}}');
    const signature = sign(payload.toString('utf-8'), secret);
    expect(verifyWebhookSignature(payload, signature, secret)).toBe(true);
  });
});

describe('constructEvent', () => {
  const secret = 'test-webhook-secret';

  it('parses and returns verified event', () => {
    const rawPayload = JSON.stringify({
      event: 'newLead',
      timestamp: 1705315200,
      webhookId: '0WA001',
      data: { leadId: '0ld001' },
    });
    const signature = sign(rawPayload, secret);

    const event = constructEvent(rawPayload, signature, secret);
    expect(event.event).toBe('newLead');
    expect(event.timestamp).toBe(1705315200);
    expect(event.webhookId).toBe('0WA001');
    expect(event.data).toEqual({ leadId: '0ld001' });
  });

  it('throws on invalid signature', () => {
    expect(() => constructEvent('{}', 'bad-signature', secret)).toThrow(
      'Invalid webhook signature',
    );
  });

  it('works with Buffer input', () => {
    const rawPayload = Buffer.from(
      JSON.stringify({
        event: 'postSent',
        timestamp: 1700000000,
        webhookId: 'wh001',
        data: {},
      }),
    );
    const signature = sign(rawPayload.toString('utf-8'), secret);

    const event = constructEvent(rawPayload, signature, secret);
    expect(event.event).toBe('postSent');
  });
});
