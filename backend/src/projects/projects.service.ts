import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>,
  ) {}

  // Create project
  async create(data: Partial<Project>) {
    const project = new this.projectModel(data);
    return project.save();
  }

  // Get all projects
  async findAll() {
    return this.projectModel.find().sort({ createdAt: -1 });
  }

  // Get featured projects
  async findFeatured() {
    return this.projectModel.find({ featured: true });
  }

  // Update project
  async update(id: string, data: Partial<Project>) {
    const project = await this.projectModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  // Delete project
  async remove(id: string) {
    const project = await this.projectModel.findByIdAndDelete(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return { message: 'Project deleted successfully' };
  }
}
