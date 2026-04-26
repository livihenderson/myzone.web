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

// Editorial light surface. The brand reads through restraint:
// generous space, big light heading, ice as accent only.
const PAGE_BG = "#FAFBFC";
const CARD_BG = "#FFFFFF";
const INK = "#0B0F14"; // near the site's #05070A
const INK_BODY = "#2A323D";
const INK_DIM = "#6B7684";
const HAIRLINE = "#E8ECF1";
const HAIRLINE_STRONG = "#D6DDE5";

// Brand accents from app/globals.css.
const ICE = "#6BD8FF";
// ICE_DEEP from globals (#2B9BD1) doesn't meet contrast on white for small
// type, so the link variant goes one notch deeper.
const ICE_TEXT = "#197FAC";

const FONT_BODY =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const FONT_DISPLAY =
  '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';

const GOOGLE_FONTS_LINK =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap";

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
  topRightTag: string;
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
  a { color: ${ICE_TEXT}; text-decoration: none; }
  a:hover { text-decoration: underline; }
</style>
</head>
<body bgcolor="${PAGE_BG}" style="margin:0;padding:0;background:${PAGE_BG};color:${INK_BODY};font-family:${FONT_BODY};">
<div style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">
${escapeHtml(opts.preheader)}
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${PAGE_BG}" style="background:${PAGE_BG};">
  <tr>
    <td align="center" style="padding:48px 16px 56px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${CARD_BG}" style="max-width:600px;background:${CARD_BG};">
        <!-- Brand bar: hairline + tiny wordmark + city tag, no fill. -->
        <tr>
          <td style="padding:0 48px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="border-top:3px solid ${ICE};line-height:0;font-size:0;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 48px 0 48px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle" style="vertical-align:middle;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td valign="middle" style="vertical-align:middle;padding-right:9px;">
                        <img src="${escapeHtml(logoUrl())}" alt="" width="18" height="22" style="display:block;border:0;outline:none;text-decoration:none;width:18px;height:22px;" />
                      </td>
                      <td valign="middle" style="vertical-align:middle;font-family:${FONT_DISPLAY};font-weight:600;letter-spacing:0.24em;color:${INK};font-size:12px;">
                        MYZONE
                      </td>
                    </tr>
                  </table>
                </td>
                <td align="right" valign="middle" style="vertical-align:middle;font-family:${FONT_BODY};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${INK_DIM};">
                  ${escapeHtml(opts.topRightTag)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:48px 48px 16px 48px;">
            ${opts.bodyInner}
          </td>
        </tr>
        <tr>
          <td style="padding:0 48px;">
            <div style="height:1px;background:${HAIRLINE};line-height:0;font-size:0;">&nbsp;</div>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 48px 44px 48px;color:${INK_DIM};font-family:${FONT_BODY};font-size:12px;line-height:1.7;">
            ${opts.footerHtml}
          </td>
        </tr>
      </table>
      <div style="max-width:600px;margin:18px auto 0;color:${INK_DIM};font-family:${FONT_BODY};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;line-height:1.6;text-align:center;">
        Leoše Janáčka 237 · 272 01 Kladno · Po–Ne 6:00–22:00
      </div>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function leadFieldHtml(label: string, value: string): string {
  return `<tr>
    <td style="padding:0 0 22px 0;">
      <div style="font-family:${FONT_BODY};font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:${INK_DIM};margin:0 0 6px 0;">${escapeHtml(label)}</div>
      <div style="font-family:${FONT_BODY};font-size:16px;line-height:1.55;color:${INK};font-weight:400;">${escapeHtml(value).replace(/\n/g, "<br />")}</div>
    </td>
  </tr>`;
}

function divider(): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 32px 0;">
    <tr>
      <td style="height:1px;background:${HAIRLINE};line-height:0;font-size:0;">&nbsp;</td>
    </tr>
  </table>`;
}

function ctaButton(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td bgcolor="${INK}" style="background:${INK};border-radius:4px;">
          <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 24px;font-family:${FONT_DISPLAY};font-size:11px;font-weight:600;letter-spacing:0.26em;text-transform:uppercase;color:#FFFFFF;text-decoration:none;border-radius:4px;">
            ${escapeHtml(label)} &nbsp;→
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
          cta: "Zpět na MyZone",
          tag: "KLADNO",
          summarySection: "Tvoje údaje",
        }
      : {
          name: "Name",
          email: "Email",
          phone: "Phone",
          source: "How you heard about us",
          message: "Message",
          cta: "Back to MyZone",
          tag: "KLADNO",
          summarySection: "Your details",
        };

  const fields = [
    leadFieldHtml(labels.name, lead.name),
    leadFieldHtml(labels.email, lead.email),
    lead.phone ? leadFieldHtml(labels.phone, lead.phone) : "",
    leadFieldHtml(labels.source, lead.source),
    lead.message ? leadFieldHtml(labels.message, lead.message) : "",
  ].join("");

  const bodyInner = `
    <div style="font-family:${FONT_BODY};font-size:10px;font-weight:600;letter-spacing:0.26em;text-transform:uppercase;color:${ICE_TEXT};margin:0 0 18px 0;">
      ${escapeHtml(t.eyebrow)}
    </div>
    <h1 style="margin:0 0 32px 0;font-family:${FONT_DISPLAY};font-size:38px;line-height:1.1;color:${INK};font-weight:500;letter-spacing:-0.02em;">
      ${escapeHtml(t.title)}
    </h1>
    <p style="margin:0 0 16px 0;font-family:${FONT_BODY};font-size:16px;line-height:1.65;color:${INK};font-weight:500;">
      ${escapeHtml(greeting)}
    </p>
    <p style="margin:0 0 36px 0;font-family:${FONT_BODY};font-size:16px;line-height:1.7;color:${INK_BODY};max-width:480px;">
      ${escapeHtml(e.intro)}
    </p>
    ${divider()}
    <div style="font-family:${FONT_BODY};font-size:10px;font-weight:600;letter-spacing:0.26em;text-transform:uppercase;color:${INK_DIM};margin:0 0 22px 0;">
      ${escapeHtml(labels.summarySection)}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
      ${fields}
    </table>
    <div style="margin:8px 0 32px 0;">
      ${ctaButton(siteUrl(), labels.cta)}
    </div>
    <p style="margin:36px 0 8px 0;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${INK};white-space:pre-line;">
${escapeHtml(e.signoff)}
    </p>
  `;

  const html = renderShell({
    preheader: e.preheader,
    topRightTag: labels.tag,
    bodyInner,
    footerHtml: `<div style="max-width:480px;font-style:italic;color:${INK_DIM};">${escapeHtml(e.footerNote)}</div>
      <div style="margin-top:16px;font-size:11px;letter-spacing:0.04em;">
        <a href="${escapeHtml(siteUrl())}" style="color:${ICE_TEXT};text-decoration:none;">${escapeHtml(siteUrl().replace(/^https?:\/\//, ""))}</a>
      </div>`,
  });

  const lines: string[] = [
    t.title,
    "",
    greeting,
    "",
    e.intro,
    "",
    labels.summarySection.toUpperCase(),
    "",
    `${labels.name}: ${lead.name}`,
    `${labels.email}: ${lead.email}`,
  ];
  if (lead.phone) lines.push(`${labels.phone}: ${lead.phone}`);
  lines.push(`${labels.source}: ${lead.source}`);
  if (lead.message) lines.push(`${labels.message}: ${lead.message}`);
  lines.push("", `${labels.cta} → ${siteUrl()}`, "", e.signoff, "", e.footerNote);

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

  const fields = [
    leadFieldHtml("Jméno", lead.name),
    leadFieldHtml("E-mail", lead.email),
    lead.phone ? leadFieldHtml("Telefon", lead.phone) : "",
    leadFieldHtml("Zdroj", lead.source),
    lead.message ? leadFieldHtml("Zpráva", lead.message) : "",
  ].join("");

  const techRows = [
    leadFieldHtml("Locale", meta.locale),
    leadFieldHtml("IP", meta.ip),
    leadFieldHtml("UA", meta.userAgent ?? "—"),
    leadFieldHtml("Čas (UTC)", ts),
    leadFieldHtml("Correlation ID", meta.correlationId),
  ].join("");

  const bodyInner = `
    <div style="font-family:${FONT_BODY};font-size:10px;font-weight:600;letter-spacing:0.26em;text-transform:uppercase;color:${ICE_TEXT};margin:0 0 18px 0;">
      Nový lead
    </div>
    <h1 style="margin:0 0 24px 0;font-family:${FONT_DISPLAY};font-size:32px;line-height:1.1;color:${INK};font-weight:500;letter-spacing:-0.02em;">
      Sleva 15&nbsp;%
    </h1>
    <p style="margin:0 0 36px 0;font-family:${FONT_BODY};font-size:15px;line-height:1.7;color:${INK_BODY};max-width:480px;">
      Někdo se přihlásil o předotevírací slevu. Stačí odpovědět na tento e-mail&nbsp;— Reply-To míří přímo na zájemce.
    </p>
    ${divider()}
    <div style="font-family:${FONT_BODY};font-size:10px;font-weight:600;letter-spacing:0.26em;text-transform:uppercase;color:${INK_DIM};margin:0 0 22px 0;">
      Zájemce
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px 0;">
      ${fields}
    </table>
    ${divider()}
    <div style="font-family:${FONT_BODY};font-size:10px;font-weight:600;letter-spacing:0.26em;text-transform:uppercase;color:${INK_DIM};margin:0 0 22px 0;">
      Technická data
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${techRows}
    </table>
  `;

  const footerHtml = `<div>Confirmation e-mail submitterovi: <strong style="color:${INK};font-weight:600;">__CONFIRMATION_STATUS__</strong></div>`;

  const html = renderShell({
    preheader: `Nový lead: ${lead.name}`,
    topRightTag: "INTERNAL",
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
