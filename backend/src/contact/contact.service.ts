import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactService implements OnModuleInit {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    private configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async onModuleInit() {
    const user = this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('EMAIL_PASS');

    if (!user || !pass) {
      console.warn('WARNING: EMAIL_USER or EMAIL_PASS environment variables are not defined!');
      return;
    }

    // Masked logging for debugging
    const maskedUser = user.replace(/(.{2})(.*)(.{2})@/, '$1***$3@');
    const maskedPass = pass.substring(0, 2) + '*'.repeat(pass.length - 4) + pass.substring(pass.length - 2);
    console.log(`Nodemailer: Attempting login with User: ${maskedUser}, Pass: ${maskedPass} (Length: ${pass.length})`);

    try {
      await this.transporter.verify();
      console.log('Nodemailer: Ready to send emails');
    } catch (error) {
      console.error('Nodemailer verification failed:', error.message);
    }
  }

  // Save a new contact message
  async create(createContactDto: any): Promise<Contact> {
    const newMessage = new this.contactModel(createContactDto);
    const savedMessage = await newMessage.save();

    // Send email notification
    try {
      await this.transporter.sendMail({
        from: `"${createContactDto.name}" <${createContactDto.email}>`,
        to: this.configService.get<string>('NOTIFICATION_EMAIL') || 'kishanthshanth12@gmail.com',
        subject: `New Contact Form Submission from ${createContactDto.name}`,
        text: `You have a new message:
        Name: ${createContactDto.name}
        Email: ${createContactDto.email}
        Message: ${createContactDto.message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${createContactDto.name}</p>
          <p><strong>Email:</strong> ${createContactDto.email}</p>
          <p><strong>Message:</strong></p>
          <p>${createContactDto.message}</p>
        `,
      });
      console.log(`Email notification sent to ${this.configService.get<string>('NOTIFICATION_EMAIL') || 'kishanthshanth12@gmail.com'}`);
    } catch (error) {
      console.error('Failed to send email:', error.message);
    }

    return savedMessage;
  }

  // Get all messages (useful for an admin dashboard)
  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }
}
