const PER_MINUTE_LIMIT = 60;
const PER_5_SECOND_LIMIT = 120;
const SAFETY_FACTOR = 0.85;

export class RateLimiter {
  private timestamps: number[] = [];

  recordRequest(): void {
    this.timestamps.push(Date.now());
    this.pruneOldTimestamps();
  }

  async waitIfNeeded(): Promise<void> {
    this.pruneOldTimestamps();
    const now = Date.now();

    const fiveSecAgo = now - 5_000;
    const countIn5Sec = this.timestamps.filter((t) => t > fiveSecAgo).length;
    const safe5SecLimit = Math.floor(PER_5_SECOND_LIMIT * SAFETY_FACTOR);

    if (countIn5Sec >= safe5SecLimit) {
      const oldestInWindow = this.timestamps.find((t) => t > fiveSecAgo);
      if (oldestInWindow !== undefined) {
        const waitMs = 5_000 - (now - oldestInWindow) + 200;
        await this.sleep(waitMs);
      }
      return;
    }

    const oneMinAgo = now - 60_000;
    const countInMin = this.timestamps.filter((t) => t > oneMinAgo).length;
    const safeMinLimit = Math.floor(PER_MINUTE_LIMIT * SAFETY_FACTOR);

    if (countInMin >= safeMinLimit) {
      const oldestInWindow = this.timestamps.find((t) => t > oneMinAgo);
      if (oldestInWindow !== undefined) {
        const waitMs = 60_000 - (now - oldestInWindow) + 200;
        await this.sleep(waitMs);
      }
    }
  }

  private pruneOldTimestamps(): void {
    const cutoff = Date.now() - 60_000;
    this.timestamps = this.timestamps.filter((t) => t > cutoff);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
  }
}
