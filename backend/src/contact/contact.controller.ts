import { Controller, Post, Get, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact-dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async submitContact(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  // Optional: Endpoint to see all messages
  @Get()
  async getAllMessages() {
    return this.contactService.findAll();
  }
}
