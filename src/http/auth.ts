export function createAuthHeader(accountId: string, apiKey: string): string {
  const credentials = `${accountId}:${apiKey}`;
  const encoded = Buffer.from(credentials, 'utf-8').toString('base64');
  return `Basic ${encoded}`;
}
