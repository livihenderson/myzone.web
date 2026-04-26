import "server-only";

type Bucket = number[];

declare global {
  // eslint-disable-next-line no-var
  var __myzoneRate: Map<string, Bucket> | undefined;
}

const buckets: Map<string, Bucket> = (globalThis.__myzoneRate ??= new Map());

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSec: number };

export type RateLimitOptions = {
  max: number;
  windowMs: number;
};

export function checkRateLimit(
  key: string,
  { max, windowMs }: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;

  // Bound memory under attack: prune any bucket whose newest entry is stale.
  for (const [k, ts] of buckets) {
    if (ts.length === 0 || ts[ts.length - 1] < cutoff) buckets.delete(k);
  }

  const current = buckets.get(key) ?? [];
  const fresh = current.filter((t) => t >= cutoff);

  if (fresh.length >= max) {
    const oldest = fresh[0];
    const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    buckets.set(key, fresh);
    return { allowed: false, retryAfterSec };
  }

  fresh.push(now);
  buckets.set(key, fresh);
  return { allowed: true };
}

export function getClientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real;
  return "unknown";
}
