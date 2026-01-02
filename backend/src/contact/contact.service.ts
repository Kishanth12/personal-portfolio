import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  // Save a new contact message
  async create(createContactDto: any): Promise<Contact> {
    const newMessage = new this.contactModel(createContactDto);
    return newMessage.save();
  }

  // Get all messages (useful for an admin dashboard)
  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }
}
