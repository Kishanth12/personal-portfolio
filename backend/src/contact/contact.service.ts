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
    console.log(`Nodemailer: Configuration available for User: ${maskedUser}, Pass: ${maskedPass} (Length: ${pass.length})`);
    
    // Note: We avoid this.transporter.verify() here because it's a blocking call 
    // that can cause timeouts in serverless functions during cold starts.
  }

  // Save a new contact message
  async create(createContactDto: any): Promise<Contact> {
    const newMessage = new this.contactModel(createContactDto);
    const savedMessage = await newMessage.save();

    const emailUser = this.configService.get<string>('EMAIL_USER');
    const emailPass = this.configService.get<string>('EMAIL_PASS');
    const notificationEmail = this.configService.get<string>('NOTIFICATION_EMAIL') || 'kishanthshanth12@gmail.com';

    if (!emailUser || !emailPass) {
      console.error('Email sending failed: EMAIL_USER or EMAIL_PASS not configured in environment.');
      return savedMessage;
    }

    // Send email notification
    try {
      await this.transporter.sendMail({
        from: `"${createContactDto.name}" <${createContactDto.email}>`,
        to: notificationEmail,
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
      console.log(`Email notification sent to ${notificationEmail}`);
    } catch (error) {
      console.error('Failed to send email:', error.message);
      if (error.code === 'EAUTH') {
        console.error('Authentication Error: Check EMAIL_USER and EMAIL_PASS (App Password).');
      } else if (error.code === 'ESOCKET') {
        console.error('Socket Error: Connection to SMTP host failed. Check port/firewall.');
      }
    }

    return savedMessage;
  }

  // Get all messages (useful for an admin dashboard)
  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }
}
