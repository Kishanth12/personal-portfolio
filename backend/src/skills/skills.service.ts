import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from './schemas/skill.schema';
import * as streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.config';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
  ) {}

  // Create skill with optional image upload
  async create(
    createSkillDto: { name: string; category: string; image?: string },
    file?: Express.Multer.File,
  ): Promise<Skill> {
    if (file) {
      const result = await this.uploadToCloudinary(file, 'portfolio/skills');
      createSkillDto.image = result.secure_url;
    }
    // Don't set a default image, let it be undefined/null

    const newSkill = new this.skillModel(createSkillDto);
    return newSkill.save();
  }

  // Update skill with optional image upload
  async update(
    id: string,
    updateSkillDto: Partial<{ name: string; category: string; image: string }>,
    file?: Express.Multer.File,
  ): Promise<Skill> {
    if (file) {
      const result = await this.uploadToCloudinary(file, 'portfolio/skills');
      updateSkillDto.image = result.secure_url;
    }

    const updatedSkill = await this.skillModel
      .findByIdAndUpdate(id, updateSkillDto, { new: true })
      .exec();

    if (!updatedSkill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    return updatedSkill;
  }

  // Get all skills
  async findAll(): Promise<Skill[]> {
    return await this.skillModel.find().exec();
  }

  // Get one skill by ID
  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillModel.findById(id).exec();
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  // Delete a skill
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.skillModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return { message: 'Skill deleted successfully' };
  }

  // Cloudinary helper
  private async uploadToCloudinary(
    file: Express.Multer.File,
    folder: string,
  ): Promise<any> {
    // Validate file type
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('Image size should not exceed 5MB');
    }

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
