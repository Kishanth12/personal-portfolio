import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name) private resumeModel: Model<ResumeDocument>,
  ) {}

  // Save resume details (e.g., after uploading the file to a cloud)
  async create(createResumeDto: any): Promise<Resume> {
    const newResume = new this.resumeModel(createResumeDto);
    return newResume.save();
  }

  // Get the most recently uploaded resume
  async getLatest(): Promise<Resume> {
    const resume = await this.resumeModel
      .findOne()
      .sort({ createdAt: -1 })
      .exec();
    if (!resume) {
      throw new NotFoundException('No resume found');
    }
    return resume;
  }

  // List all uploaded versions (if you want a history)
  async findAll(): Promise<Resume[]> {
    return this.resumeModel.find().sort({ createdAt: -1 }).exec();
  }
}
