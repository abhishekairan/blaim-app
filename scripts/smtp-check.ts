// Verifies the SMTP settings in .env and optionally sends a test message.
//   npm run smtp:check                      connect + authenticate only
//   npm run smtp:check -- you@example.org   also send a test email
import { sendMail, smtpConfig, verifySmtp } from "../src/lib/mailer.ts";

const to = process.argv[2];

try {
  await verifySmtp();
  console.log(`SMTP OK: ${smtpConfig.host}:${smtpConfig.port} (secure=${smtpConfig.secure})`);
} catch (err) {
  console.error("SMTP check failed:", err instanceof Error ? err.message : err);
  process.exit(1);
}

if (to) {
  const sent = await sendMail({
    to,
    subject: "BLAIM 2027 SMTP test",
    text: "This is a test message from the BLAIM 2027 website. SMTP is configured correctly.",
  });
  console.log(sent ? `Test email sent to ${to}` : "Test email failed (see error above)");
  process.exitCode = sent ? 0 : 1;
}
process.exit();
