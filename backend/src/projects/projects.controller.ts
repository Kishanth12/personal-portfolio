import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/project.schema';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Create project
  @Post()
  create(@Body() body: Partial<Project>) {
    return this.projectsService.create(body);
  }

  // Get all projects
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  // Get featured projects
  @Get('featured')
  findFeatured() {
    return this.projectsService.findFeatured();
  }

  // Update project
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Project>) {
    return this.projectsService.update(id, body);
  }

  // Delete project
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
