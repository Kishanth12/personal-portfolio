import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export interface CreateContactDto {
  name: string;
  email: string;
  message: string;
}

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
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;
  private emailConfigured = false;

  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    private configService: ConfigService,
  ) { }

  async onModuleInit() {
    const user = this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('EMAIL_PASS');

    if (!user || !pass) {
      this.logger.warn('EMAIL_USER or EMAIL_PASS not set — email notifications disabled.');
      return;
    }

    const host = this.configService.get<string>('SMTP_HOST') ?? 'smtp.gmail.com';
    const port = parseInt(this.configService.get<string>('SMTP_PORT') ?? '587', 10);
    const secure = this.configService.get<string>('SMTP_SECURE') === 'true' || port === 465;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    this.transporter.verify()
      .then(() => {
        this.emailConfigured = true;
        const maskedUser = user.replace(/(.{2})(.*)(?=@)/, '$1***');
        this.logger.log(`SMTP Ready [${host}:${port}] — User: ${maskedUser}`);
      })
      .catch(err => {
        this.logger.error(`SMTP Verification Failed: ${err.message}`);
      });
  }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const saved = await new this.contactModel(createContactDto).save();

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

  private async sendNotification(dto: CreateContactDto): Promise<void> {
    const from = this.configService.get<string>('EMAIL_USER');
    const to =
      this.configService.get<string>('NOTIFICATION_EMAIL') ??
      'kishanthshanth12@gmail.com';

    const safeName = escapeHtml(dto.name);
    const safeEmail = escapeHtml(dto.email);
    const safeMessage = escapeHtml(dto.message);

    try {
      await this.transporter.sendMail({
        from: `"Portfolio Contact Form" <${from}>`,
        to,
        replyTo: dto.email,
        subject: `New Message from ${dto.name}`,
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
      if (err.code === 'EAUTH') {
        this.logger.error(
          'SMTP auth failed — if using Gmail, generate an App Password at myaccount.google.com/apppasswords',
        );
      } else {
        this.logger.error(`Failed to send email: ${err.message}`);
      }
    }
  }
}