/** Token bucket. `capacity` actions burst, refilled at `perSecond`. Clock is injected for tests. */
export class RateLimiter {
  private tokens: number;
  private last: number;

  constructor(
    private readonly capacity: number,
    private readonly perSecond: number,
    private readonly now: () => number = Date.now,
  ) {
    this.tokens = capacity;
    this.last = now();
  }

  take(): boolean {
    this.refill();
    if (this.tokens < 1) return false;
    this.tokens -= 1;
    return true;
  }

  /** True when the bucket has refilled completely, so forgetting it changes nothing. */
  isFull(): boolean {
    this.refill();
    return this.tokens >= this.capacity;
  }

  private refill() {
    const t = this.now();
    this.tokens = Math.min(this.capacity, this.tokens + ((t - this.last) / 1000) * this.perSecond);
    this.last = t;
  }
}

/** One bucket per key (resident or IP). Full buckets are dropped by `prune()` so memory stays bounded. */
export class RateLimiters {
  private readonly buckets = new Map<string, RateLimiter>();

  constructor(
    private readonly capacity: number,
    private readonly perSecond: number,
    private readonly now: () => number = Date.now,
  ) {}

  take(key: string): boolean {
    let bucket = this.buckets.get(key);
    if (!bucket) {
      bucket = new RateLimiter(this.capacity, this.perSecond, this.now);
      this.buckets.set(key, bucket);
    }
    return bucket.take();
  }

  prune() {
    for (const [key, bucket] of this.buckets) if (bucket.isFull()) this.buckets.delete(key);
  }

  get size(): number {
    return this.buckets.size;
  }
}
