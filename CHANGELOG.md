# Changelog

## 1.0.0

Initial release of the Oktopost Node.js SDK.

### Features

- Full coverage of the Oktopost API v2 across 10 namespaces (37 resource classes)
- Namespace-based API design: `client.publishing.campaigns.list()`
- Auto-pagination with AsyncIterator (`listAll()`) and `collectAll()` utility
- Built-in retry with exponential backoff for 429 and 5xx errors
- Proactive rate limiting to prevent 15-minute lockouts
- Webhook signature verification via separate `oktopost/webhooks` entry point
- Full TypeScript support with exported types for all resources
- Zero runtime dependencies (uses Node.js built-in `fetch` and `node:crypto`)
- Dual ESM/CJS package output
- Debug hooks (`onRequest`/`onResponse`) for logging and monitoring
- US and EU region support
