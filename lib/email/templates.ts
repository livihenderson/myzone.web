import "server-only";
import { dictionary, type Locale } from "@/lib/i18n/dictionary";

export type Lead = {
  name: string;
  email: string;
  phone?: string;
  source: string;
  message?: string;
};

export type EmailParts = {
  subject: string;
  html: string;
  text: string;
};

// Light-card surface chosen because Gmail mobile force-overrides dark
// container backgrounds. The site brand still reads via the ice
// stripe + ice eyebrows + Space Grotesk wordmark + ice CTA glow.
const PAGE_BG = "#F4F6F9";
const CARD_BG = "#FFFFFF";
const INK = "#0E1116"; // dark navy ≈ site bg, used for text on white
const INK_SOFT = "#1F2630";
const INK_DIM = "#5A6470";
const HAIRLINE = "#E5EAF0";
const ICE_TINT = "#E8F8FF"; // ice with most of the saturation drained

// Brand accents (verbatim from app/globals.css).
const ICE = "#6BD8FF";
const ICE_DEEP = "#2B9BD1";

const FONT_BODY =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const FONT_DISPLAY =
  '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';

const GOOGLE_FONTS_LINK =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function siteUrl(): string {
  return process.env.SITE_URL ?? "https://myzonegym.cz";
}

function logoUrl(): string {
  return `${siteUrl().replace(/\/$/, "")}/brand/logo.png`;
}

function renderShell(opts: {
  preheader: string;
  eyebrow: string;
  bodyInner: string;
  footerHtml: string;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>MyZone</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="${GOOGLE_FONTS_LINK}" rel="stylesheet" />
<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table { border-collapse: collapse !important; }
  body { margin: 0; padding: 0; background: ${PAGE_BG}; }
  a { color: ${ICE_DEEP}; text-decoration: none; }
  .mz-glow { box-shadow: 0 0 32px rgba(107, 216, 255, 0.45); }
</style>
</head>
<body bgcolor="${PAGE_BG}" style="margin:0;padding:0;background:${PAGE_BG};color:${INK};font-family:${FONT_BODY};">
<div style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">
${escapeHtml(opts.preheader)}
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PAGE_BG}" style="background:${PAGE_BG};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${CARD_BG}" style="max-width:560px;background:${CARD_BG};border:1px solid ${HAIRLINE};border-radius:18px;overflow:hidden;">
        <tr>
          <td bgcolor="${ICE}" style="background:${ICE};padding:20px 28px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle" style="vertical-align:middle;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="vertical-align:middle;padding-right:10px;">
                        <img src="${escapeHtml(logoUrl())}" alt="" width="22" height="27" style="display:block;border:0;outline:none;text-decoration:none;width:22px;height:27px;" />
                      </td>
                      <td valign="middle" style="vertical-align:middle;font-family:${FONT_DISPLAY};font-weight:700;letter-spacing:0.22em;color:${INK};font-size:14px;">
                        MYZONE
                      </td>
                    </tr>
                  </table>
                </td>
                <td align="right" valign="middle" style="vertical-align:middle;font-family:${FONT_BODY};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${INK};opacity:0.78;">
                  ${escapeHtml(opts.eyebrow)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="${CARD_BG}" style="background:${CARD_BG};padding:36px 28px 8px 28px;">
            ${opts.bodyInner}
          </td>
        </tr>
        <tr>
          <td bgcolor="${CARD_BG}" style="background:${CARD_BG};padding:22px 28px 26px 28px;border-top:1px solid ${HAIRLINE};color:${INK_DIM};font-family:${FONT_BODY};font-size:11px;line-height:1.7;">
            ${opts.footerHtml}
          </td>
        </tr>
      </table>
      <div style="max-width:560px;margin:14px auto 0;color:${INK_DIM};font-family:${FONT_BODY};font-size:10px;letter-spacing:0.18em;text-transform:uppercase;line-height:1.6;text-align:center;">
        MyZone · Leoše Janáčka 237, Kladno · Po–Ne 6:00–22:00
      </div>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function summaryRowHtml(label: string, value: string): string {
  return `<tr>
    <td style="padding:13px 18px;border-bottom:1px solid ${HAIRLINE};font-family:${FONT_BODY};font-size:10px;color:${INK_DIM};text-transform:uppercase;letter-spacing:0.18em;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:13px 18px;border-bottom:1px solid ${HAIRLINE};font-family:${FONT_BODY};font-size:14px;color:${INK};vertical-align:top;line-height:1.55;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
  </tr>`;
}

function summaryCard(rowsHtml: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${CARD_BG}" style="background:${CARD_BG};border:1px solid ${HAIRLINE};border-top:2px solid ${ICE};border-radius:14px;overflow:hidden;margin:0 0 28px 0;">
    ${rowsHtml}
  </table>`;
}

function ctaButton(href: string, label: string): string {
  // Inverse of the on-site Button: dark pill + ice text, with a faint
  // ice glow via box-shadow that survives most clients.
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td bgcolor="${INK}" class="mz-glow" style="background:${INK};border-radius:999px;box-shadow:0 0 32px rgba(107, 216, 255, 0.45);">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 28px;font-family:${FONT_DISPLAY};font-size:12px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${ICE};text-decoration:none;border:1px solid ${INK};border-radius:999px;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>`;
}

export function submitterConfirmation(
  lead: Lead,
  locale: Locale,
): EmailParts {
  const t = dictionary[locale].sleva;
  const e = t.mail;
  const greeting = e.greeting.replace("{name}", lead.name);
  const labels =
    locale === "cs"
      ? {
          name: "Jméno",
          email: "E-mail",
          phone: "Telefon",
          source: "Odkud o nás víš",
          message: "Zpráva",
          cta: "Zpět na web",
          eyebrow: "SOUKROMÉ FITNESS · KLADNO",
        }
      : {
          name: "Name",
          email: "Email",
          phone: "Phone",
          source: "How you heard about us",
          message: "Message",
          cta: "Back to the site",
          eyebrow: "PRIVATE FITNESS · KLADNO",
        };

  const rows = [
    summaryRowHtml(labels.name, lead.name),
    summaryRowHtml(labels.email, lead.email),
    lead.phone ? summaryRowHtml(labels.phone, lead.phone) : "",
    summaryRowHtml(labels.source, lead.source),
    lead.message ? summaryRowHtml(labels.message, lead.message) : "",
  ].join("");

  const bodyInner = `
    <p style="margin:0 0 12px 0;font-family:${FONT_BODY};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${ICE_DEEP};font-weight:600;">
      ${escapeHtml(t.eyebrow)}
    </p>
    <h1 style="margin:0 0 24px 0;font-family:${FONT_DISPLAY};font-size:30px;line-height:1.15;color:${INK};font-weight:600;letter-spacing:-0.01em;">
      ${escapeHtml(t.title)}
    </h1>
    <p style="margin:0 0 14px 0;font-family:${FONT_BODY};font-size:15px;line-height:1.6;color:${INK};">
      ${escapeHtml(greeting)}
    </p>
    <p style="margin:0 0 30px 0;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${INK_SOFT};">
      ${escapeHtml(e.intro)}
    </p>
    <p style="margin:0 0 12px 0;font-family:${FONT_DISPLAY};font-size:11px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${ICE_DEEP};">
      ${escapeHtml(e.summaryTitle)}
    </p>
    ${summaryCard(rows)}
    ${ctaButton(siteUrl(), labels.cta)}
    <p style="margin:34px 0 0 0;font-family:${FONT_BODY};font-size:14px;line-height:1.7;color:${INK};white-space:pre-line;">
${escapeHtml(e.signoff)}
    </p>
  `;

  const html = renderShell({
    preheader: e.preheader,
    eyebrow: labels.eyebrow,
    bodyInner,
    footerHtml: `${escapeHtml(e.footerNote)}<br /><br /><span style="color:${INK_DIM};">MyZone · </span><a href="${escapeHtml(siteUrl())}" style="color:${ICE_DEEP};text-decoration:none;font-weight:500;">${escapeHtml(siteUrl().replace(/^https?:\/\//, ""))}</a>`,
  });

  const lines: string[] = [
    t.title,
    "",
    greeting,
    "",
    e.intro,
    "",
    e.summaryTitle.toUpperCase(),
    `${labels.name}: ${lead.name}`,
    `${labels.email}: ${lead.email}`,
  ];
  if (lead.phone) lines.push(`${labels.phone}: ${lead.phone}`);
  lines.push(`${labels.source}: ${lead.source}`);
  if (lead.message) lines.push(`${labels.message}: ${lead.message}`);
  lines.push("", e.signoff, "", siteUrl(), "", e.footerNote);

  return {
    subject: e.subject,
    html,
    text: lines.join("\n"),
  };
}

export function ownerNotification(
  lead: Lead,
  meta: {
    correlationId: string;
    ip: string;
    locale: Locale;
    userAgent?: string;
  },
): EmailParts {
  const subject = `[MyZone lead · ${meta.correlationId.slice(0, 8)}] ${lead.name}`;
  const ts = new Date().toISOString();

  const rows = [
    summaryRowHtml("Jméno", lead.name),
    summaryRowHtml("E-mail", lead.email),
    lead.phone ? summaryRowHtml("Telefon", lead.phone) : "",
    summaryRowHtml("Zdroj", lead.source),
    lead.message ? summaryRowHtml("Zpráva", lead.message) : "",
    summaryRowHtml("Locale", meta.locale),
    summaryRowHtml("IP", meta.ip),
    summaryRowHtml("UA", meta.userAgent ?? "—"),
    summaryRowHtml("Čas (UTC)", ts),
    summaryRowHtml("Correlation ID", meta.correlationId),
  ].join("");

  const bodyInner = `
    <p style="margin:0 0 12px 0;font-family:${FONT_BODY};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${ICE_DEEP};font-weight:600;">
      05 / NOVÝ LEAD
    </p>
    <h1 style="margin:0 0 18px 0;font-family:${FONT_DISPLAY};font-size:24px;line-height:1.2;color:${INK};font-weight:600;letter-spacing:-0.01em;">
      Sleva 15 % — nový zájemce
    </h1>
    <p style="margin:0 0 26px 0;font-family:${FONT_BODY};font-size:14px;line-height:1.65;color:${INK_SOFT};">
      Někdo se přihlásil o předotevírací slevu. Stačí odpovědět na tento e-mail — Reply-To míří přímo na zájemce.
    </p>
    ${summaryCard(rows)}
  `;

  const footerHtml = `<table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td bgcolor="${ICE_TINT}" style="background:${ICE_TINT};border:1px solid ${ICE};border-radius:8px;padding:8px 12px;font-family:${FONT_BODY};font-size:11px;color:${INK};">
        Confirmation e-mail submitterovi: <strong style="color:${INK};font-weight:700;">__CONFIRMATION_STATUS__</strong>
      </td>
    </tr>
  </table>`;

  const html = renderShell({
    preheader: `Nový lead: ${lead.name}`,
    eyebrow: "INTERNAL · LEAD CAPTURE",
    bodyInner,
    footerHtml,
  });

  const lines = [
    `Nový lead — sleva 15%`,
    `Correlation ID: ${meta.correlationId}`,
    ``,
    `Jméno:   ${lead.name}`,
    `E-mail:  ${lead.email}`,
  ];
  if (lead.phone) lines.push(`Telefon: ${lead.phone}`);
  lines.push(`Zdroj:   ${lead.source}`);
  if (lead.message) lines.push(``, `Zpráva:`, lead.message);
  lines.push(
    ``,
    `Locale:  ${meta.locale}`,
    `IP:      ${meta.ip}`,
    `UA:      ${meta.userAgent ?? "—"}`,
    `Čas UTC: ${ts}`,
    ``,
    `Confirmation e-mail submitterovi: __CONFIRMATION_STATUS__`,
  );

  return {
    subject,
    html,
    text: lines.join("\n"),
  };
}

export function applyConfirmationStatus(
  parts: EmailParts,
  status: "SENT" | "FAILED",
): EmailParts {
  return {
    subject: parts.subject,
    html: parts.html.replace("__CONFIRMATION_STATUS__", status),
    text: parts.text.replace("__CONFIRMATION_STATUS__", status),
  };
}
