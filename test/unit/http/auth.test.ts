import { createAuthHeader } from '../../../src/http/auth.js';

describe('createAuthHeader', () => {
  it('encodes accountId and apiKey as Base64 Basic auth', () => {
    const header = createAuthHeader('myAccount', 'myKey');
    const expected = 'Basic ' + Buffer.from('myAccount:myKey', 'utf-8').toString('base64');
    expect(header).toBe(expected);
  });

  it('starts with "Basic " prefix', () => {
    const header = createAuthHeader('id', 'key');
    expect(header.startsWith('Basic ')).toBe(true);
  });

  it('handles special characters', () => {
    const header = createAuthHeader('acc:ount', 'k€y!@#');
    const decoded = Buffer.from(header.replace('Basic ', ''), 'base64').toString('utf-8');
    expect(decoded).toBe('acc:ount:k€y!@#');
  });

  it('handles empty strings', () => {
    const header = createAuthHeader('', '');
    const decoded = Buffer.from(header.replace('Basic ', ''), 'base64').toString('utf-8');
    expect(decoded).toBe(':');
  });
});
