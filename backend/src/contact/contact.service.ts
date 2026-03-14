import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

// ✅ Strongly typed DTO instead of `any`
export interface CreateContactDto {
  name: string;
  email: string;
  message: string;
}

// ✅ Sanitize user input before embedding in HTML
function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

@Injectable()
export class ContactService implements OnModuleInit {
  // ✅ Use NestJS Logger instead of raw console.log/error
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;
  private emailConfigured = false;

  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    private configService: ConfigService,
  ) { }

  // ✅ Initialize transporter — non-blocking for serverless bootstrap
  async onModuleInit() {
    const user = this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('EMAIL_PASS');

    if (!user || !pass) {
      this.logger.warn('EMAIL_USER or EMAIL_PASS not set — email notifications disabled.');
      return;
    }

    const host = this.configService.get<string>('SMTP_HOST') ?? 'smtp.gmail.com';
    const port = parseInt(this.configService.get<string>('SMTP_PORT') ?? '587', 10);
    // ✅ Port 465 should always use secure: true
    const secure = this.configService.get<string>('SMTP_SECURE') === 'true' || port === 465;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      // ✅ Timeout settings to prevent hanging in serverless
      connectionTimeout: 10000, 
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // ✅ Background verification — does not block Vercel bootstrap
    this.transporter.verify()
      .then(() => {
        this.emailConfigured = true;
        const maskedUser = user.replace(/(.{2})(.*)(?=@)/, '$1***');
        this.logger.log(`SMTP Ready [${host}:${port}] — User: ${maskedUser}`);
      })
      .catch(err => {
        this.logger.error(`SMTP Verification Failed: ${err.message}`);
        // Consider checking Gmail security settings or switching to Port 465
      });
  }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const saved = await new this.contactModel(createContactDto).save();

    // ✅ Attempt sending even if background verification hasn't finished yet
    if (this.transporter) {
      this.sendNotification(createContactDto).catch(err => {
        this.logger.error(`Deferred notification failed: ${err.message}`);
      });
    } else {
      this.logger.warn('Email skipped — Transporter not initialized (check environment variables).');
    }

    return saved;
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  // ✅ Extracted into its own method — easier to test and reason about
  private async sendNotification(dto: CreateContactDto): Promise<void> {
    const from = this.configService.get<string>('EMAIL_USER');
    const to =
      this.configService.get<string>('NOTIFICATION_EMAIL') ??
      'kishanthshanth12@gmail.com';

    // ✅ Escape all user-supplied values before putting them in HTML
    const safeName = escapeHtml(dto.name);
    const safeEmail = escapeHtml(dto.email);
    const safeMessage = escapeHtml(dto.message);

    try {
      await this.transporter.sendMail({
        from: `"Portfolio Contact Form" <${from}>`,
        to,
        replyTo: dto.email,
        subject: `New Message from ${dto.name}`,
        // Plain-text version is the safe fallback
        text: `New contact form submission\n\nName: ${dto.name}\nEmail: ${dto.email}\nMessage: ${dto.message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      });
      this.logger.log(`Notification sent to ${to}`);
    } catch (err) {
      // ✅ Specific guidance for the most common failure mode
      if (err.code === 'EAUTH') {
        this.logger.error(
          'SMTP auth failed — if using Gmail, generate an App Password at myaccount.google.com/apppasswords',
        );
      } else {
        this.logger.error(`Failed to send email: ${err.message}`);
      }
      // ✅ Don't re-throw — the contact was saved; email is best-effort
    }
  }
}