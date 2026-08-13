import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport, type Transporter } from "nodemailer";

type Lead = { name: string; email: string; subject: string | null; message: string; locale: string };

/** Copy per language, so the confirmation lands in the language the visitor used. */
const CONFIRMATION: Record<string, { subject: string; body: (name: string) => string }> = {
  en: {
    subject: "We got your message — Memovo",
    body: (name) =>
      `Hi ${name},\n\nThanks for writing to us. Your message reached the Memovo team and we answer within one working day.\n\nMemovo`,
  },
  hu: {
    subject: "Megkaptuk az üzeneted — Memovo",
    body: (name) =>
      `Szia ${name}!\n\nKöszönjük, hogy írtál. Az üzeneted megérkezett a Memovo csapatához, egy munkanapon belül válaszolunk.\n\nMemovo`,
  },
  ro: {
    subject: "Ți-am primit mesajul — Memovo",
    body: (name) =>
      `Salut ${name},\n\nMulțumim că ne-ai scris. Mesajul tău a ajuns la echipa Memovo și îți răspundem într-o zi lucrătoare.\n\nMemovo`,
  },
};

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter | null;
  private readonly from: string;
  private readonly notify: string | undefined;

  constructor(private readonly config: ConfigService) {
    const host = config.get<string>("SMTP_HOST");
    this.from = config.get<string>("MAIL_FROM", "Memovo <hello@memovo.com>");
    this.notify = config.get<string>("LEAD_NOTIFY_TO");

    // Without SMTP settings the API still works; mails are logged instead of sent.
    this.transporter = host
      ? createTransport({
          host,
          port: Number(config.get<string>("SMTP_PORT", "587")),
          secure: config.get<string>("SMTP_SECURE", "false") === "true",
          auth: {
            user: config.get<string>("SMTP_USER"),
            pass: config.get<string>("SMTP_PASS"),
          },
        })
      : null;
  }

  async sendLeadConfirmation(lead: Lead) {
    const copy = CONFIRMATION[lead.locale] ?? CONFIRMATION.en;
    await this.send(lead.email, copy.subject, copy.body(lead.name));
  }

  async sendLeadNotification(lead: Lead) {
    if (!this.notify) return;
    const lines = [
      `From: ${lead.name} <${lead.email}>`,
      `Subject: ${lead.subject ?? "(none)"}`,
      `Language: ${lead.locale}`,
      "",
      lead.message,
    ];
    await this.send(this.notify, `New lead: ${lead.name}`, lines.join("\n"));
  }

  private async send(to: string, subject: string, text: string) {
    if (!this.transporter) {
      this.logger.log(`SMTP is not configured; would have sent "${subject}" to ${to}`);
      return;
    }
    try {
      await this.transporter.sendMail({ from: this.from, to, subject, text });
    } catch (error) {
      // A failed mail must not lose the lead, which is already saved by this point.
      this.logger.error(`sending "${subject}" to ${to} failed: ${(error as Error).message}`);
    }
  }
}
