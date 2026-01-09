import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import * as streamifier from 'streamifier';
import { UpdateProfileDto } from './dto/update-profile-dto';
import cloudinary from '../config/cloudinary.config';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  // Get the profile (returns the first one found)
  async getProfile(): Promise<ProfileDocument> {
    const profile = await this.profileModel.findOne().exec();
    if (!profile) {
      throw new NotFoundException('Profile has not been initialized yet.');
    }
    return profile;
  }

  // Upsert Profile: Creates if doesn't exist, updates if it does
  async updateProfile(
    updateProfileDto: UpdateProfileDto,
    files: {
      profilePic?: Express.Multer.File[];
      resume?: Express.Multer.File[];
    },
  ): Promise<ProfileDocument> {
    // 1. Upload Files to Cloudinary if they exist
    if (files?.profilePic?.[0]) {
      const result = await this.uploadToCloudinary(
        files.profilePic[0],
        'portfolio/profiles',
      );
      updateProfileDto.profilePic = result.secure_url;
    }

    if (files?.resume?.[0]) {
      const result = await this.uploadToCloudinary(
        files.resume[0],
        'portfolio/docs',
      );
      updateProfileDto.resumeUrl = result.secure_url;
    }

    // 2. Use findOneAndUpdate with upsert: true
    // {} matches the first document found. If none, it creates one.
    return this.profileModel
      .findOneAndUpdate({}, updateProfileDto, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      })
      .exec();
  }

  async deleteProfile(): Promise<{ message: string }> {
    const result = await this.profileModel.deleteMany({}).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('No profile found to delete');
    }
    return { message: 'Profile deleted successfully' };
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
