import {
  OktopostError,
  OktopostRateLimitError,
  OktopostAuthError,
  OktopostPermissionError,
  OktopostNotFoundError,
} from './errors.js';

export interface RetryConfig {
  maxRetries: number;
  baseDelayMs?: number;
}

const RATE_LIMIT_WAIT_MS = 15 * 60 * 1_000;
const MAX_BACKOFF_MS = 60_000;

export async function retryWithBackoff<T>(fn: () => Promise<T>, config: RetryConfig): Promise<T> {
  const { maxRetries, baseDelayMs = 1_000 } = config;
  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (
        error instanceof OktopostAuthError ||
        error instanceof OktopostPermissionError ||
        error instanceof OktopostNotFoundError
      ) {
        throw error;
      }

      if (error instanceof OktopostError && error.statusCode !== undefined) {
        if (error.statusCode >= 400 && error.statusCode < 500 && error.statusCode !== 429) {
          throw error;
        }
      }

      if (attempt >= maxRetries) {
        throw error;
      }

      if (error instanceof OktopostRateLimitError) {
        attempt++;
        await sleep(RATE_LIMIT_WAIT_MS);
        continue;
      }

      attempt++;
      const delay = Math.min(
        baseDelayMs * Math.pow(2, attempt - 1) + Math.random() * 1_000,
        MAX_BACKOFF_MS,
      );
      await sleep(delay);
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
