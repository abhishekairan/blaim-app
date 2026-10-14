// SMTP support (nodemailer). One pooled transport per process, created lazily from env.
// Mail is never sent when SMTP_HOST is unset: messages are logged instead, so dev works without SMTP.
import nodemailer, { type Transporter } from "nodemailer";

const env = process.env;

export const smtpConfig = {
  host: env.SMTP_HOST ?? "",
  port: Number(env.SMTP_PORT || 587),
  // true = implicit TLS (port 465). false = STARTTLS upgrade (587), required unless SMTP_REQUIRE_TLS=false.
  secure: env.SMTP_SECURE ? env.SMTP_SECURE === "true" : Number(env.SMTP_PORT) === 465,
  requireTLS: env.SMTP_REQUIRE_TLS !== "false",
  user: env.SMTP_USER ?? "",
  pass: env.SMTP_PASS ?? "",
  from: env.SMTP_FROM ?? "",
};

export const smtpEnabled = !!smtpConfig.host;

let transporter: Transporter | undefined;

function getTransport() {
  transporter ??= nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    requireTLS: !smtpConfig.secure && smtpConfig.requireTLS,
    auth: smtpConfig.user ? { user: smtpConfig.user, pass: smtpConfig.pass } : undefined,
    // Keep connections open between messages instead of a TLS + AUTH handshake per mail.
    pool: true,
    maxConnections: 3,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return transporter;
}

export type Mail = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

/**
 * Sends one message. Never throws: failures are logged and reported as `false`,
 * so callers can fire this after the response without an unhandled rejection.
 */
export async function sendMail(mail: Mail): Promise<boolean> {
  if (!smtpEnabled) {
    console.info(`[mailer] SMTP_HOST not set, not sending "${mail.subject}" to ${mail.to}`);
    return false;
  }
  try {
    await getTransport().sendMail({ from: smtpConfig.from || smtpConfig.user, ...mail });
    return true;
  } catch (err) {
    console.error(`[mailer] failed to send "${mail.subject}" to ${mail.to}:`, err);
    return false;
  }
}

/** Checks connection + credentials. Used by `npm run smtp:check`. */
export async function verifySmtp() {
  if (!smtpEnabled) throw new Error("SMTP_HOST is not set");
  await getTransport().verify();
}
