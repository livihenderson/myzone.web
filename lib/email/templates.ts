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

// Mirror the site's CSS variables (app/globals.css).
const BG = "#05070A"; //  --color-bg-black
const PANEL = "#0B1017"; // --color-bg-panel
const ICE = "#6BD8FF"; // --color-ice
const ICE_DEEP = "#2B9BD1"; // --color-ice-deep
const TEXT = "#E8F4FB"; // --color-text-primary
const TEXT_DIM = "#7E8B98"; // --color-text-dim
// hairline borders on the site are rgba(107,216,255,0.12); flattened
// over #05070A and #0B1017 they read approximately as the values below.
const HAIRLINE_BG = "#142028";
const HAIRLINE_PANEL = "#1A2632";

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
<meta name="color-scheme" content="dark only" />
<meta name="supported-color-schemes" content="dark only" />
<title>MyZone</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="${GOOGLE_FONTS_LINK}" rel="stylesheet" />
<style>
  /* Stop iOS / Outlook.com / Yahoo from auto-tinting brand colors. */
  :root { color-scheme: dark only; supported-color-schemes: dark only; }
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table { border-collapse: collapse !important; }
  body { margin: 0; padding: 0; background: ${BG}; }
  a { color: ${ICE}; text-decoration: none; }
  /* Outlook.com dark-mode hooks: keep brand contrast. */
  [data-ogsc] .mz-text { color: ${TEXT} !important; }
  [data-ogsc] .mz-dim  { color: ${TEXT_DIM} !important; }
  [data-ogsc] .mz-ice  { color: ${ICE} !important; }
  [data-ogsb] .mz-bg   { background: ${BG} !important; }
  [data-ogsb] .mz-panel { background: ${PANEL} !important; }
</style>
</head>
<body class="mz-bg" style="margin:0;padding:0;background:${BG};color:${TEXT};font-family:${FONT_BODY};">
<div style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">
${escapeHtml(opts.preheader)}
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="mz-bg" bgcolor="${BG}" style="background:${BG};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="mz-panel" bgcolor="${PANEL}" style="max-width:560px;background:${PANEL};border:1px solid ${HAIRLINE_PANEL};border-radius:18px;overflow:hidden;">
        <tr>
          <td bgcolor="${PANEL}" style="background:${PANEL};padding:22px 28px;border-bottom:1px solid ${HAIRLINE_PANEL};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle" style="vertical-align:middle;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="vertical-align:middle;padding-right:10px;">
                        <img src="${escapeHtml(logoUrl())}" alt="" width="22" height="27" style="display:block;border:0;outline:none;text-decoration:none;width:22px;height:27px;" />
                      </td>
                      <td valign="middle" class="mz-ice" style="vertical-align:middle;font-family:${FONT_DISPLAY};font-weight:600;letter-spacing:0.22em;color:${ICE};font-size:14px;">
                        MYZONE
                      </td>
                    </tr>
                  </table>
                </td>
                <td align="right" valign="middle" class="mz-dim" style="vertical-align:middle;font-family:${FONT_BODY};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${TEXT_DIM};">
                  ${escapeHtml(opts.eyebrow)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="${PANEL}" class="mz-panel" style="background:${PANEL};padding:34px 28px 8px 28px;">
            ${opts.bodyInner}
          </td>
        </tr>
        <tr>
          <td bgcolor="${PANEL}" class="mz-panel mz-dim" style="background:${PANEL};padding:22px 28px 26px 28px;border-top:1px solid ${HAIRLINE_PANEL};color:${TEXT_DIM};font-family:${FONT_BODY};font-size:11px;line-height:1.7;">
            ${opts.footerHtml}
          </td>
        </tr>
      </table>
      <div class="mz-dim" style="max-width:560px;margin:14px auto 0;color:${TEXT_DIM};font-family:${FONT_BODY};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;line-height:1.6;text-align:center;">
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
    <td style="padding:12px 16px;border-bottom:1px solid ${HAIRLINE_PANEL};font-family:${FONT_BODY};font-size:10px;color:${TEXT_DIM};text-transform:uppercase;letter-spacing:0.18em;width:38%;vertical-align:top;" class="mz-dim">${escapeHtml(label)}</td>
    <td style="padding:12px 16px;border-bottom:1px solid ${HAIRLINE_PANEL};font-family:${FONT_BODY};font-size:14px;color:${TEXT};vertical-align:top;line-height:1.55;" class="mz-text">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
  </tr>`;
}

function summaryCard(rowsHtml: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BG}" class="mz-bg" style="background:${BG};border:1px solid ${HAIRLINE_BG};border-radius:14px;overflow:hidden;margin:0 0 28px 0;">
    ${rowsHtml}
  </table>`;
}

function ctaButton(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td bgcolor="${ICE}" class="mz-ice" style="background:${ICE};border-radius:999px;">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:13px 26px;font-family:${FONT_DISPLAY};font-size:12px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${BG};text-decoration:none;border:1px solid ${ICE};border-radius:999px;">
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
    <p class="mz-dim" style="margin:0 0 10px 0;font-family:${FONT_BODY};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${ICE_DEEP};">
      ${escapeHtml(t.eyebrow)}
    </p>
    <h1 class="mz-text" style="margin:0 0 22px 0;font-family:${FONT_DISPLAY};font-size:30px;line-height:1.15;color:${TEXT};font-weight:600;letter-spacing:-0.01em;text-shadow:0 0 18px rgba(107,216,255,0.25);">
      ${escapeHtml(t.title)}
    </h1>
    <p class="mz-text" style="margin:0 0 14px 0;font-family:${FONT_BODY};font-size:15px;line-height:1.6;color:${TEXT};">
      ${escapeHtml(greeting)}
    </p>
    <p class="mz-dim" style="margin:0 0 28px 0;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${TEXT_DIM};">
      ${escapeHtml(e.intro)}
    </p>
    <p class="mz-ice" style="margin:0 0 12px 0;font-family:${FONT_DISPLAY};font-size:11px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${ICE_DEEP};">
      ${escapeHtml(e.summaryTitle)}
    </p>
    ${summaryCard(rows)}
    ${ctaButton(siteUrl(), labels.cta)}
    <p class="mz-text" style="margin:32px 0 0 0;font-family:${FONT_BODY};font-size:14px;line-height:1.7;color:${TEXT};white-space:pre-line;">
${escapeHtml(e.signoff)}
    </p>
  `;

  const html = renderShell({
    preheader: e.preheader,
    eyebrow: labels.eyebrow,
    bodyInner,
    footerHtml: `${escapeHtml(e.footerNote)}<br /><br /><span style="color:${TEXT_DIM};">MyZone · </span><a href="${escapeHtml(siteUrl())}" style="color:${ICE};text-decoration:none;">${escapeHtml(siteUrl().replace(/^https?:\/\//, ""))}</a>`,
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
    <p class="mz-ice" style="margin:0 0 10px 0;font-family:${FONT_BODY};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${ICE_DEEP};">
      05 / NOVÝ LEAD
    </p>
    <h1 class="mz-text" style="margin:0 0 18px 0;font-family:${FONT_DISPLAY};font-size:24px;line-height:1.2;color:${TEXT};font-weight:600;letter-spacing:-0.01em;">
      Sleva 15 % — nový zájemce
    </h1>
    <p class="mz-dim" style="margin:0 0 24px 0;font-family:${FONT_BODY};font-size:14px;line-height:1.65;color:${TEXT_DIM};">
      Někdo se přihlásil o předotevírací slevu. Stačí odpovědět na tento e-mail — Reply-To míří přímo na zájemce.
    </p>
    ${summaryCard(rows)}
  `;

  const footerHtml = `Confirmation e-mail submitterovi: <strong class="mz-ice" style="color:${ICE};font-weight:600;">__CONFIRMATION_STATUS__</strong>`;

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
