import "server-only";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

declare global {
  // eslint-disable-next-line no-var
  var __myzoneSmtp: Transporter | undefined;
}

function buildTransporter(): Transporter {
  const host = process.env.SMTP_HOST;
  const port = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const securityMode = (process.env.SMTP_SECURE ?? "starttls").toLowerCase();

  if (!host) throw new Error("SMTP_HOST is not configured");
  if (!user || !pass) throw new Error("SMTP_USER / SMTP_PASSWORD are not configured");

  const secure = securityMode === "tls";
  const requireTLS = securityMode === "starttls";

  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS,
    auth: { user, pass },
  });
}

export function getTransporter(): Transporter {
  if (!globalThis.__myzoneSmtp) {
    globalThis.__myzoneSmtp = buildTransporter();
  }
  return globalThis.__myzoneSmtp;
}

export function getFromAddress(): { name: string; address: string } {
  const address = process.env.EMAIL_FROM;
  const name = process.env.EMAIL_FROM_NAME ?? "MyZone";
  if (!address) throw new Error("EMAIL_FROM is not configured");
  return { name, address };
}

export function getOwnerRecipients(): string[] {
  const raw = process.env.CONTACT_EMAIL_TO;
  if (!raw) throw new Error("CONTACT_EMAIL_TO is not configured");
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
