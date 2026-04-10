import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

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
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private resend: Resend;

  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    private configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY not set — email notifications disabled.');
    } else {
      this.resend = new Resend(apiKey);
      this.logger.log('Resend email client initialized.');
    }
  }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const saved = await new this.contactModel(createContactDto).save();

    if (this.resend) {
      await this.sendNotification(createContactDto).catch(err => {
        this.logger.error(`Notification failed: ${err.message}`);
      });
    } else {
      this.logger.warn('Email skipped — RESEND_API_KEY not set.');
    }

    return saved;
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  private async sendNotification(dto: CreateContactDto): Promise<void> {
    const to = this.configService.get<string>('NOTIFICATION_EMAIL') ?? 'kishanthshanth12@gmail.com';
    const from = this.configService.get<string>('RESEND_FROM_EMAIL') ?? 'Portfolio <onboarding@resend.dev>';

    const safeName = escapeHtml(dto.name);
    const safeEmail = escapeHtml(dto.email);
    const safeMessage = escapeHtml(dto.message);

    try {
      const { error } = await this.resend.emails.send({
        from,
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

      if (error) {
        this.logger.error(`Resend error: ${error.message}`);
      } else {
        this.logger.log(`Notification sent to ${to}`);
      }
    } catch (err) {
      this.logger.error(`Failed to send email: ${err.message}`);
    }
  }
}