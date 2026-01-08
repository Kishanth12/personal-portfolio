import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SkillsService } from './skills.service';
import { SkillCategory } from './schemas/skill.schema';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillService: SkillsService) {}

  // Create skill with optional image upload
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createSkillDto: { name: string; category: SkillCategory },
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.skillService.create(createSkillDto, image);
  }

  // Update skill with optional image upload
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateSkillDto: Partial<{ name: string; category: SkillCategory }>,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.skillService.update(id, updateSkillDto, image);
  }

  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillService.remove(id);
  }
}
