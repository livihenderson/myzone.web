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

const ICE = "#6BD8FF";
const ICE_DEEP = "#2B9BD1";
const INK = "#0E1116";
const INK_DIM = "#5A6470";
const PAGE_BG = "#F4F6F9";
const CARD_BG = "#FFFFFF";
const HAIRLINE = "#E5EAF0";
const FONT_BODY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Helvetica, Arial, sans-serif';
const FONT_DISPLAY =
  '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';

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
  bodyInner: string;
  footerHtml: string;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title>MyZone</title>
</head>
<body style="margin:0;padding:0;background:${PAGE_BG};color:${INK};font-family:${FONT_BODY};">
<div style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">
${escapeHtml(opts.preheader)}
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAGE_BG};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${CARD_BG};border:1px solid ${HAIRLINE};border-radius:16px;overflow:hidden;">
        <tr>
          <td style="background:${ICE};padding:18px 28px;" bgcolor="${ICE}">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:${FONT_DISPLAY};font-weight:700;letter-spacing:0.22em;color:${INK};font-size:16px;">
                  MYZONE
                </td>
                <td align="right" style="font-family:${FONT_BODY};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${INK};opacity:0.75;">
                  Soukromé fitness · Kladno
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 28px 8px 28px;">
            ${opts.bodyInner}
          </td>
        </tr>
        <tr>
          <td style="padding:24px 28px 28px 28px;border-top:1px solid ${HAIRLINE};color:${INK_DIM};font-family:${FONT_BODY};font-size:12px;line-height:1.6;">
            ${opts.footerHtml}
          </td>
        </tr>
      </table>
      <div style="max-width:560px;margin:14px auto 0;color:${INK_DIM};font-family:${FONT_BODY};font-size:11px;line-height:1.5;text-align:center;">
        MyZone · Leoše Janáčka 237, 272 01 Kladno 1 · Po–Ne 6:00–22:00
      </div>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function summaryRowHtml(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${HAIRLINE};font-family:${FONT_BODY};font-size:12px;color:${INK_DIM};text-transform:uppercase;letter-spacing:0.12em;width:36%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${HAIRLINE};font-family:${FONT_BODY};font-size:14px;color:${INK};vertical-align:top;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
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
          message: "Zpráva",
          cta: "Zpět na web",
        }
      : {
          name: "Name",
          email: "Email",
          phone: "Phone",
          source: "How you heard about us",
          message: "Message",
          cta: "Back to the site",
        };

  const rows = [
    summaryRowHtml(labels.name, lead.name),
    summaryRowHtml(labels.email, lead.email),
    lead.phone ? summaryRowHtml(labels.phone, lead.phone) : "",
    summaryRowHtml(labels.source, lead.source),
    lead.message ? summaryRowHtml(labels.message, lead.message) : "",
  ].join("");

  const bodyInner = `
    <h1 style="margin:0 0 16px 0;font-family:${FONT_DISPLAY};font-size:26px;line-height:1.2;color:${INK};font-weight:600;">
      ${escapeHtml(t.title)}
    </h1>
    <p style="margin:0 0 14px 0;font-family:${FONT_BODY};font-size:15px;line-height:1.6;color:${INK};">
      ${escapeHtml(greeting)}
    </p>
    <p style="margin:0 0 22px 0;font-family:${FONT_BODY};font-size:15px;line-height:1.6;color:${INK};">
      ${escapeHtml(e.intro)}
    </p>
    <h2 style="margin:24px 0 6px 0;font-family:${FONT_DISPLAY};font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:${ICE_DEEP};font-weight:600;">
      ${escapeHtml(e.summaryTitle)}
    </h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 26px 0;">
      ${rows}
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td bgcolor="${INK}" style="background:${INK};border-radius:999px;">
          <a href="${escapeHtml(siteUrl())}" style="display:inline-block;padding:12px 22px;font-family:${FONT_DISPLAY};font-size:13px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${ICE};text-decoration:none;">
            ${escapeHtml(labels.cta)}
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 0 0;font-family:${FONT_BODY};font-size:14px;line-height:1.7;color:${INK};white-space:pre-line;">
${escapeHtml(e.signoff)}
    </p>
  `;

  const html = renderShell({
    preheader: e.preheader,
    bodyInner,
    footerHtml: `${escapeHtml(e.footerNote)}<br /><br />MyZone · <a href="${escapeHtml(siteUrl())}" style="color:${ICE_DEEP};text-decoration:none;">${escapeHtml(siteUrl().replace(/^https?:\/\//, ""))}</a>`,
  });

  const lines: string[] = [
    t.title,
    "",
    greeting,
    "",
    e.intro,
    "",
    e.summaryTitle,
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
    <h1 style="margin:0 0 16px 0;font-family:${FONT_DISPLAY};font-size:22px;line-height:1.25;color:${INK};font-weight:600;">
      Nový lead — sleva 15 %
    </h1>
    <p style="margin:0 0 18px 0;font-family:${FONT_BODY};font-size:14px;line-height:1.6;color:${INK};">
      Někdo se přihlásil o předotevírací slevu. Odpověz přímo na tento e-mail — Reply-To míří přímo na zájemce.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;">
      ${rows}
    </table>
  `;

  const footerHtml = `Confirmation e-mail submitterovi: <strong style="color:${INK};">__CONFIRMATION_STATUS__</strong>`;

  const html = renderShell({
    preheader: `Nový lead: ${lead.name}`,
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
