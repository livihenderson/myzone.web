import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { dictionary, type Locale } from "@/lib/i18n/dictionary";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { verifyRecaptcha } from "@/lib/recaptcha";
import {
  getFromAddress,
  getOwnerRecipients,
  getTransporter,
} from "@/lib/email/transport";
import {
  applyConfirmationStatus,
  ownerNotification,
  submitterConfirmation,
  type Lead,
} from "@/lib/email/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECAPTCHA_ACTION = "sleva_lead";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

type ErrorCode =
  | "invalid_input"
  | "captcha_failed"
  | "rate_limited"
  | "send_failed"
  | "forbidden";

function err(code: ErrorCode, status: number, retryAfterSec?: number) {
  const headers: Record<string, string> = {};
  if (retryAfterSec) headers["retry-after"] = String(retryAfterSec);
  return NextResponse.json({ ok: false, error: code }, { status, headers });
}

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
      /* ignore */
    }
  }
  return hosts;
}

function originAllowed(headers: Headers): boolean {
  const origin = headers.get("origin");
  const referer = headers.get("referer");
  const candidate = origin ?? referer;
  if (!candidate) return true; // no header → server-to-server; let reCAPTCHA gate it
  try {
    const host = new URL(candidate).hostname.toLowerCase();
    return allowedHosts().includes(host);
  } catch {
    return false;
  }
}

function sanitizePhone(input: string): string {
  return input.replace(/[^+\d\s\-()]/g, "").trim();
}

function pickLocale(input: unknown): Locale {
  return input === "en" ? "en" : "cs";
}

type Payload = {
  name: string;
  email: string;
  phone: string;
  source: string;
  message: string;
  locale: Locale;
  recaptchaToken: string;
  company: string;
};

function parsePayload(raw: unknown): Payload | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  return {
    name: str(r.name).trim(),
    email: str(r.email).trim(),
    phone: sanitizePhone(str(r.phone)),
    source: str(r.source).trim(),
    message: str(r.message).trim(),
    locale: pickLocale(r.locale),
    recaptchaToken: str(r.recaptchaToken),
    company: str(r.company),
  };
}

function validate(p: Payload): true | ErrorCode {
  if (p.company.length > 0) return "forbidden"; // honeypot
  if (!p.name || p.name.length > 100) return "invalid_input";
  if (!p.email || p.email.length < 5 || p.email.length > 200) return "invalid_input";
  if (!EMAIL_RE.test(p.email)) return "invalid_input";
  if (p.phone.length > 30) return "invalid_input";
  if (!p.source) return "invalid_input";
  const sources = new Set([
    ...dictionary.cs.sleva.sourceOptions,
    ...dictionary.en.sleva.sourceOptions,
  ]);
  if (!sources.has(p.source)) return "invalid_input";
  if (p.message.length > 2000) return "invalid_input";
  if (!p.recaptchaToken) return "captcha_failed";
  return true;
}

export async function POST(request: NextRequest) {
  const correlationId = randomUUID();
  const headers = request.headers;

  if (!originAllowed(headers)) {
    return err("forbidden", 403);
  }

  const ip = getClientIp(headers);
  const limit = checkRateLimit(`contact:${ip}`, RATE_LIMIT);
  if (!limit.allowed) {
    return err("rate_limited", 429, limit.retryAfterSec);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return err("invalid_input", 400);
  }

  const payload = parsePayload(raw);
  if (!payload) return err("invalid_input", 400);

  const valid = validate(payload);
  if (valid !== true) {
    return err(valid, valid === "forbidden" ? 403 : 400);
  }

  const captcha = await verifyRecaptcha(
    payload.recaptchaToken,
    RECAPTCHA_ACTION,
    ip,
  );
  if (!captcha.ok) {
    console.warn("[contact] captcha rejected", { correlationId, reason: captcha.reason });
    return err("captcha_failed", 400);
  }

  const lead: Lead = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone || undefined,
    source: payload.source,
    message: payload.message || undefined,
  };

  let transporter;
  let from;
  let recipients: string[];
  try {
    transporter = getTransporter();
    from = getFromAddress();
    recipients = getOwnerRecipients();
  } catch (e) {
    console.error("[contact] mail config error", { correlationId, e });
    return err("send_failed", 500);
  }

  const ownerParts = ownerNotification(lead, {
    correlationId,
    ip,
    locale: payload.locale,
    userAgent: headers.get("user-agent") ?? undefined,
  });
  const submitterParts = submitterConfirmation(lead, payload.locale);

  // Send the owner notification first so we know the lead is captured.
  // Status in the owner email is filled in optimistically; the real send
  // happens after, so we patch the displayed status before sending.
  const ownerOptimistic = applyConfirmationStatus(ownerParts, "SENT");

  let confirmationStatus: "SENT" | "FAILED" = "SENT";
  let confirmationError: unknown;

  // Owner first.
  try {
    await transporter.sendMail({
      from: { name: from.name, address: from.address },
      to: recipients,
      replyTo: { name: lead.name, address: lead.email },
      subject: ownerOptimistic.subject,
      html: ownerOptimistic.html,
      text: ownerOptimistic.text,
      headers: { "X-MyZone-Correlation-Id": correlationId },
    });
  } catch (e) {
    console.error("[contact] owner mail failed", { correlationId, e });
    return err("send_failed", 502);
  }

  // Confirmation second (best-effort).
  try {
    await transporter.sendMail({
      from: { name: from.name, address: from.address },
      to: lead.email,
      subject: submitterParts.subject,
      html: submitterParts.html,
      text: submitterParts.text,
      headers: { "X-MyZone-Correlation-Id": correlationId },
    });
  } catch (e) {
    confirmationStatus = "FAILED";
    confirmationError = e;
    console.error("[contact] submitter confirmation failed", {
      correlationId,
      email: lead.email,
      e,
    });
  }

  // If the confirmation failed, send a follow-up to the owners with the
  // FAILED status flag so they can manually follow up.
  if (confirmationStatus === "FAILED") {
    const ownerFailed = applyConfirmationStatus(ownerParts, "FAILED");
    try {
      await transporter.sendMail({
        from: { name: from.name, address: from.address },
        to: recipients,
        replyTo: { name: lead.name, address: lead.email },
        subject: `${ownerFailed.subject} · CONFIRMATION FAILED`,
        html: ownerFailed.html,
        text: ownerFailed.text,
        headers: { "X-MyZone-Correlation-Id": correlationId },
      });
    } catch (e) {
      console.error("[contact] owner follow-up failed", {
        correlationId,
        confirmationError,
        e,
      });
    }
  }

  return NextResponse.json({ ok: true, id: correlationId });
}
