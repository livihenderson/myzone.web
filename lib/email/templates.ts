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

// Dark all the way through — the only reliable way to keep a dark
// brand template intact in Gmail mobile (the outer wrap is dark, so
// Gmail's force-light bg has nothing to flip). Mirrors app/globals.css.
const BG = "#05070A"; //  --color-bg-black
const CARD = "#0B1017"; // --color-bg-panel
const INSET = "#11171F"; // slight elevation above CARD
const HAIRLINE = "#1A2632"; // visible border on CARD
const ICE = "#6BD8FF"; // --color-ice
const TEXT = "#E8F4FB"; // --color-text-primary
const TEXT_DIM = "#7E8B98"; // --color-text-dim
const TEXT_DEEP_DIM = "#5A6470"; // for the address mini-line

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

function renderShell(opts: {
  preheader: string;
  subtitle: string;
  bodyInner: string;
  footerInner: string;
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
  :root { color-scheme: dark only; supported-color-schemes: dark only; }
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table { border-collapse: collapse !important; }
  body { margin: 0 !important; padding: 0 !important; background: ${BG} !important; }
  a { color: ${ICE}; text-decoration: none; }
  /* Outlook.com / iOS dark-mode hooks: keep brand contrast where they
     try to invert. */
  [data-ogsc] .mz-text { color: ${TEXT} !important; }
  [data-ogsc] .mz-dim  { color: ${TEXT_DIM} !important; }
  [data-ogsc] .mz-ice  { color: ${ICE} !important; }
  [data-ogsb] .mz-bg    { background: ${BG} !important; }
  [data-ogsb] .mz-card  { background: ${CARD} !important; }
  [data-ogsb] .mz-inset { background: ${INSET} !important; }
</style>
</head>
<body class="mz-bg" bgcolor="${BG}" style="margin:0;padding:0;background:${BG};">
<div style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">
${escapeHtml(opts.preheader)}
</div>
<table role="presentation" class="mz-bg" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BG}" style="background:${BG};">
  <tr>
    <td align="center" style="padding:36px 14px 44px 14px;">
      <table role="presentation" class="mz-card" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${CARD}" style="max-width:560px;background:${CARD};border:1px solid ${HAIRLINE};border-radius:16px;overflow:hidden;">
        <tr>
          <td class="mz-card" bgcolor="${CARD}" align="center" style="background:${CARD};padding:52px 32px 26px 32px;">
            <div class="mz-ice" style="font-family:${FONT_DISPLAY};font-size:30px;font-weight:600;letter-spacing:0.08em;color:${ICE};line-height:1;">
              MYZONE
            </div>
            <div class="mz-dim" style="margin-top:12px;font-family:${FONT_BODY};font-size:11px;font-weight:500;letter-spacing:0.34em;text-transform:uppercase;color:${TEXT_DIM};">
              ${escapeHtml(opts.subtitle)}
            </div>
          </td>
        </tr>
        <tr>
          <td class="mz-card" bgcolor="${CARD}" style="background:${CARD};padding:0 32px;">
            <div style="height:1px;background:${ICE};line-height:0;font-size:0;">&nbsp;</div>
          </td>
        </tr>
        <tr>
          <td class="mz-card" bgcolor="${CARD}" style="background:${CARD};padding:36px 32px 28px 32px;">
            ${opts.bodyInner}
          </td>
        </tr>
        <tr>
          <td class="mz-card" bgcolor="${CARD}" style="background:${CARD};padding:0 32px;">
            <div style="height:1px;background:${HAIRLINE};line-height:0;font-size:0;">&nbsp;</div>
          </td>
        </tr>
        <tr>
          <td class="mz-card" bgcolor="${CARD}" align="center" style="background:${CARD};padding:22px 32px 30px 32px;">
            ${opts.footerInner}
          </td>
        </tr>
      </table>
      <div class="mz-dim" style="max-width:560px;margin:18px auto 0;color:${TEXT_DEEP_DIM};font-family:${FONT_BODY};font-size:10px;font-weight:500;letter-spacing:0.26em;text-transform:uppercase;line-height:1.6;text-align:center;">
        Leoše Janáčka 237 · Kladno · Po–Ne 6:00–22:00
      </div>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// Editorial "quote block" — ice strip + slight-elevation inset.
// Two-column TD trick is more reliable than border-left in Outlook.
function quoteBlock(headingHtml: string, innerHtml: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px 0;">
    <tr>
      <td bgcolor="${ICE}" width="3" style="background:${ICE};width:3px;line-height:0;font-size:0;">&nbsp;</td>
      <td class="mz-inset" bgcolor="${INSET}" style="background:${INSET};padding:20px 24px;">
        ${headingHtml ? `<div class="mz-ice" style="font-family:${FONT_BODY};font-size:11px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:${ICE};margin:0 0 14px 0;">${headingHtml}</div>` : ""}
        ${innerHtml}
      </td>
    </tr>
  </table>`;
}

function fieldStack(label: string, value: string, isLast = false): string {
  return `<tr>
    <td style="padding:0 0 ${isLast ? "0" : "16px"} 0;">
      <div class="mz-dim" style="font-family:${FONT_BODY};font-size:10px;font-weight:600;letter-spacing:0.24em;text-transform:uppercase;color:${TEXT_DIM};margin:0 0 5px 0;">${escapeHtml(label)}</div>
      <div class="mz-text" style="font-family:${FONT_BODY};font-size:15px;line-height:1.55;color:${TEXT};font-weight:400;">${escapeHtml(value).replace(/\n/g, "<br />")}</div>
    </td>
  </tr>`;
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
          message: "Tvoje zpráva",
          summary: "Tvoje údaje",
          team: "MyZone tým",
          subtitle: "Sleva 15 %",
          autoReply: "Toto je automatický e-mail, neodpovídejte na něj.",
        }
      : {
          name: "Name",
          email: "Email",
          phone: "Phone",
          source: "How you heard about us",
          message: "Your message",
          summary: "Your details",
          team: "The MyZone team",
          subtitle: "15% Discount",
          autoReply: "This is an automated email, please don't reply.",
        };

  const allRows = [
    { label: labels.name, value: lead.name },
    { label: labels.email, value: lead.email },
    ...(lead.phone ? [{ label: labels.phone, value: lead.phone }] : []),
    { label: labels.source, value: lead.source },
    ...(lead.message ? [{ label: labels.message, value: lead.message }] : []),
  ];
  const fieldsHtml = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${allRows.map((r, i) => fieldStack(r.label, r.value, i === allRows.length - 1)).join("")}
  </table>`;

  const signoffParts = e.signoff.split("\n");
  const signoffLine1 = escapeHtml(signoffParts[0] ?? "");
  const signoffLine2 = escapeHtml(signoffParts[1] ?? labels.team);

  const bodyInner = `
    <p class="mz-text" style="margin:0 0 18px 0;font-family:${FONT_BODY};font-size:16px;line-height:1.6;color:${TEXT};font-weight:500;">
      ${escapeHtml(greeting)}
    </p>
    <p class="mz-text" style="margin:0 0 30px 0;font-family:${FONT_BODY};font-size:15px;line-height:1.75;color:${TEXT};">
      ${escapeHtml(e.intro)}
    </p>
    ${quoteBlock(escapeHtml(labels.summary), fieldsHtml)}
    <p class="mz-text" style="margin:30px 0 0 0;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${TEXT};">
      ${signoffLine1}<br />
      <strong class="mz-ice" style="color:${ICE};font-weight:600;">${signoffLine2}</strong>
    </p>
  `;

  const footerInner = `<div class="mz-dim" style="font-family:${FONT_BODY};font-size:12px;line-height:1.6;color:${TEXT_DIM};font-style:italic;">
      ${escapeHtml(labels.autoReply)}
    </div>
    <div style="margin-top:10px;">
      <a href="${escapeHtml(siteUrl())}" class="mz-ice" style="font-family:${FONT_BODY};font-size:11px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:${ICE};text-decoration:none;">
        ${escapeHtml(siteUrl().replace(/^https?:\/\//, ""))}
      </a>
    </div>`;

  const html = renderShell({
    preheader: e.preheader,
    subtitle: labels.subtitle,
    bodyInner,
    footerInner,
  });

  const lines: string[] = [
    `MYZONE — ${labels.subtitle}`,
    "",
    greeting,
    "",
    e.intro,
    "",
    labels.summary.toUpperCase(),
  ];
  for (const row of allRows) lines.push(`${row.label}: ${row.value}`);
  lines.push("", e.signoff, "", siteUrl(), "", labels.autoReply);

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

  const leadRows = [
    { label: "Jméno", value: lead.name },
    { label: "E-mail", value: lead.email },
    ...(lead.phone ? [{ label: "Telefon", value: lead.phone }] : []),
    { label: "Zdroj", value: lead.source },
    ...(lead.message ? [{ label: "Zpráva", value: lead.message }] : []),
  ];
  const leadFieldsHtml = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${leadRows.map((r, i) => fieldStack(r.label, r.value, i === leadRows.length - 1)).join("")}
  </table>`;

  const techRows = [
    { label: "Locale", value: meta.locale },
    { label: "IP", value: meta.ip },
    { label: "User-Agent", value: meta.userAgent ?? "—" },
    { label: "Čas (UTC)", value: ts },
    { label: "Correlation ID", value: meta.correlationId },
  ];
  const techFieldsHtml = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${techRows.map((r, i) => fieldStack(r.label, r.value, i === techRows.length - 1)).join("")}
  </table>`;

  const bodyInner = `
    <p class="mz-text" style="margin:0 0 18px 0;font-family:${FONT_BODY};font-size:16px;line-height:1.6;color:${TEXT};font-weight:500;">
      Nový zájemce o předotevírací slevu.
    </p>
    <p class="mz-text" style="margin:0 0 30px 0;font-family:${FONT_BODY};font-size:15px;line-height:1.75;color:${TEXT};">
      Stačí odpovědět na tento e-mail&nbsp;— Reply-To míří přímo na zájemce.
    </p>
    ${quoteBlock("Zájemce", leadFieldsHtml)}
    ${quoteBlock("Technická data", techFieldsHtml)}
  `;

  const footerInner = `<div class="mz-dim" style="font-family:${FONT_BODY};font-size:12px;line-height:1.6;color:${TEXT_DIM};">
      Confirmation e-mail submitterovi: <strong class="mz-ice" style="color:${ICE};font-weight:600;">__CONFIRMATION_STATUS__</strong>
    </div>`;

  const html = renderShell({
    preheader: `Nový lead: ${lead.name}`,
    subtitle: "Nový lead",
    bodyInner,
    footerInner,
  });

  const lines: string[] = [
    `MYZONE — Nový lead`,
    `Correlation ID: ${meta.correlationId}`,
    ``,
    `Stačí odpovědět na tento e-mail — Reply-To míří přímo na zájemce.`,
    ``,
    `ZÁJEMCE`,
  ];
  for (const row of leadRows) lines.push(`${row.label}: ${row.value}`);
  lines.push(``, `TECHNICKÁ DATA`);
  for (const row of techRows) lines.push(`${row.label}: ${row.value}`);
  lines.push(``, `Confirmation e-mail submitterovi: __CONFIRMATION_STATUS__`);

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
