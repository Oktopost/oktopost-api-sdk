import { vi } from 'vitest';
import type { BaseHttpClient } from '../../src/http/base-client.js';

export function createMockHttpClient(): BaseHttpClient {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  } as unknown as BaseHttpClient;
}
