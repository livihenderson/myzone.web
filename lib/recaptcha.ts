import "server-only";

type SiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type VerifyResult =
  | { ok: true; score: number }
  | { ok: false; reason: string };

const SITEVERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const FRESHNESS_MAX_MS = 2 * 60 * 1000;
const CLOCK_SKEW_MS = 30 * 1000;

function allowedHosts(): string[] {
  const fromEnv = process.env.RECAPTCHA_ALLOWED_HOSTS;
  if (fromEnv) {
    return fromEnv
      .split(",")
      .map((h) => h.trim().toLowerCase())
      .filter(Boolean);
  }
  const hosts: string[] = ["localhost"];
  const siteUrl = process.env.SITE_URL;
  if (siteUrl) {
    try {
      hosts.push(new URL(siteUrl).hostname.toLowerCase());
    } catch {
      // ignore malformed SITE_URL; rely on RECAPTCHA_ALLOWED_HOSTS in prod
    }
  }
  return hosts;
}

function scoreThreshold(): number {
  const raw = process.env.RECAPTCHA_SCORE_THRESHOLD;
  const parsed = raw ? Number.parseFloat(raw) : 0.5;
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 1) return 0.5;
  return parsed;
}

export async function verifyRecaptcha(
  token: string,
  expectedAction: string,
  remoteIp?: string,
): Promise<VerifyResult> {
  if (!token || typeof token !== "string") {
    return { ok: false, reason: "missing_token" };
  }
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("[recaptcha] RECAPTCHA_SECRET_KEY is not configured");
    return { ok: false, reason: "server_misconfigured" };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  let data: SiteVerifyResponse;
  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error("[recaptcha] siteverify HTTP", res.status);
      return { ok: false, reason: "siteverify_http_error" };
    }
    data = (await res.json()) as SiteVerifyResponse;
  } catch (err) {
    console.error("[recaptcha] siteverify fetch failed", err);
    return { ok: false, reason: "siteverify_unreachable" };
  }

  if (!data.success) {
    console.warn("[recaptcha] failed", { errorCodes: data["error-codes"] });
    return { ok: false, reason: "verification_failed" };
  }

  if (data.action !== expectedAction) {
    console.warn("[recaptcha] action mismatch", {
      got: data.action,
      expected: expectedAction,
    });
    return { ok: false, reason: "action_mismatch" };
  }

  const hostname = data.hostname?.toLowerCase();
  const allowed = allowedHosts();
  if (!hostname || !allowed.includes(hostname)) {
    console.warn("[recaptcha] hostname not allowed", { hostname, allowed });
    return { ok: false, reason: "hostname_not_allowed" };
  }

  if (data.challenge_ts) {
    const ts = Date.parse(data.challenge_ts);
    const now = Date.now();
    if (Number.isFinite(ts)) {
      const age = now - ts;
      if (age > FRESHNESS_MAX_MS || age < -CLOCK_SKEW_MS) {
        console.warn("[recaptcha] token stale", { ageMs: age });
        return { ok: false, reason: "token_stale" };
      }
    }
  }

  const score = data.score ?? 0;
  const threshold = scoreThreshold();
  if (score < threshold) {
    console.warn("[recaptcha] low score", { score, threshold });
    return { ok: false, reason: "low_score" };
  }

  return { ok: true, score };
}
