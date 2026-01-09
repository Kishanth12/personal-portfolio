import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import * as streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.config';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>,
  ) {}

  // Create project with image upload
  async create(
    data: Partial<Project>,
    file?: Express.Multer.File,
  ): Promise<ProjectDocument> {
    // Upload image to Cloudinary if provided
    if (file) {
      const result = await this.uploadToCloudinary(file, 'portfolio/projects');
      data.image = result.secure_url;
    }

    const project = new this.projectModel(data);
    return project.save();
  }

  // Get all projects
  async findAll(): Promise<ProjectDocument[]> {
    return this.projectModel.find().sort({ createdAt: -1 });
  }

  // Get featured projects
  async findFeatured(): Promise<ProjectDocument[]> {
    return this.projectModel.find({ featured: true });
  }

  // Get single project by ID
  async findOne(id: string): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  // Update project with optional image upload
  async update(
    id: string,
    data: Partial<Project>,
    file?: Express.Multer.File,
  ): Promise<ProjectDocument> {
    // Upload new image to Cloudinary if provided
    if (file) {
      const result = await this.uploadToCloudinary(file, 'portfolio/projects');
      data.image = result.secure_url;
    }

    const project = await this.projectModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  // Delete project
  async remove(id: string): Promise<{ message: string }> {
    const project = await this.projectModel.findByIdAndDelete(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return { message: 'Project deleted successfully' };
  }

  // Cloudinary Helper
  private async uploadToCloudinary(
    file: Express.Multer.File,
    folder: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (result) resolve(result);
          else
            reject(
              new InternalServerErrorException('Cloudinary upload failed'),
            );
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
