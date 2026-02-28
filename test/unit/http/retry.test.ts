import { retryWithBackoff } from '../../../src/http/retry.js';
import {
  OktopostApiError,
  OktopostAuthError,
  OktopostPermissionError,
  OktopostNotFoundError,
  OktopostRateLimitError,
} from '../../../src/http/errors.js';

describe('retryWithBackoff', () => {
  it('returns on first successful attempt', async () => {
    const fn = vi.fn().mockResolvedValue('success');
    const result = await retryWithBackoff(fn, { maxRetries: 3, baseDelayMs: 1 });
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries on 5xx errors up to maxRetries', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new OktopostApiError('Server error', 500))
      .mockRejectedValueOnce(new OktopostApiError('Server error', 502))
      .mockResolvedValue('recovered');

    const result = await retryWithBackoff(fn, { maxRetries: 3, baseDelayMs: 1 });
    expect(result).toBe('recovered');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('throws after maxRetries exhausted', async () => {
    const fn = vi.fn().mockRejectedValue(new OktopostApiError('Server error', 500));
    await expect(retryWithBackoff(fn, { maxRetries: 2, baseDelayMs: 1 })).rejects.toThrow(
      'Server error',
    );
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('does not retry OktopostAuthError', async () => {
    const fn = vi.fn().mockRejectedValue(new OktopostAuthError());
    await expect(retryWithBackoff(fn, { maxRetries: 3 })).rejects.toThrow(OktopostAuthError);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not retry OktopostPermissionError', async () => {
    const fn = vi.fn().mockRejectedValue(new OktopostPermissionError());
    await expect(retryWithBackoff(fn, { maxRetries: 3 })).rejects.toThrow(
      OktopostPermissionError,
    );
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not retry OktopostNotFoundError', async () => {
    const fn = vi.fn().mockRejectedValue(new OktopostNotFoundError());
    await expect(retryWithBackoff(fn, { maxRetries: 3 })).rejects.toThrow(OktopostNotFoundError);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not retry 400 errors', async () => {
    const fn = vi.fn().mockRejectedValue(new OktopostApiError('Bad request', 400));
    await expect(retryWithBackoff(fn, { maxRetries: 3 })).rejects.toThrow('Bad request');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries OktopostRateLimitError', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new OktopostRateLimitError())
      .mockResolvedValue('ok');

    vi.useFakeTimers();
    const promise = retryWithBackoff(fn, { maxRetries: 1, baseDelayMs: 1 });
    await vi.advanceTimersByTimeAsync(15 * 60 * 1_000 + 100);
    const result = await promise;
    vi.useRealTimers();

    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('retries generic errors', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('network failure'))
      .mockResolvedValue('ok');

    const result = await retryWithBackoff(fn, { maxRetries: 1, baseDelayMs: 1 });
    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('uses default baseDelayMs when not specified', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new OktopostApiError('err', 500))
      .mockResolvedValue('ok');

    vi.useFakeTimers();
    const promise = retryWithBackoff(fn, { maxRetries: 1 });
    await vi.advanceTimersByTimeAsync(2_500);
    const result = await promise;
    vi.useRealTimers();

    expect(result).toBe('ok');
  });
});
