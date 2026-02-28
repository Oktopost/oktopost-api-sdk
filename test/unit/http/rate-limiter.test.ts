import { RateLimiter } from '../../../src/http/rate-limiter.js';

describe('RateLimiter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not delay when under all limits', async () => {
    const limiter = new RateLimiter();
    const promise = limiter.waitIfNeeded();
    await vi.advanceTimersByTimeAsync(0);
    await expect(promise).resolves.toBeUndefined();
  });

  it('delays when approaching 5-second burst limit', async () => {
    const limiter = new RateLimiter();

    for (let i = 0; i < 102; i++) {
      limiter.recordRequest();
    }

    let resolved = false;
    limiter.waitIfNeeded().then(() => {
      resolved = true;
    });

    await vi.advanceTimersByTimeAsync(100);
    expect(resolved).toBe(false);

    await vi.advanceTimersByTimeAsync(5_200);
    expect(resolved).toBe(true);
  });

  it('delays when approaching 1-minute limit', async () => {
    const limiter = new RateLimiter();

    for (let i = 0; i < 51; i++) {
      limiter.recordRequest();
    }

    let resolved = false;
    limiter.waitIfNeeded().then(() => {
      resolved = true;
    });

    await vi.advanceTimersByTimeAsync(100);
    expect(resolved).toBe(false);

    await vi.advanceTimersByTimeAsync(60_200);
    expect(resolved).toBe(true);
  });

  it('records requests and prunes old timestamps', async () => {
    const limiter = new RateLimiter();
    limiter.recordRequest();

    vi.advanceTimersByTime(61_000);

    const promise = limiter.waitIfNeeded();
    await vi.advanceTimersByTimeAsync(0);
    await expect(promise).resolves.toBeUndefined();
  });
});
