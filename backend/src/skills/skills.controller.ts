import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillCategory } from './schemas/skill.schema';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillService: SkillsService) {}

  @Post()
  create(
    @Body()
    createSkillDto: {
      name: string;
      category: SkillCategory;
    },
  ) {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateSkillDto: {
      name?: string;
      category?: SkillCategory;
    },
  ) {
    return this.skillService.update(id, updateSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillService.remove(id);
  }
}
