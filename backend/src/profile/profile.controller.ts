import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile-dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile() {
    return this.profileService.getProfile();
  }

  @Put()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePic', maxCount: 1 },
      { name: 'resume', maxCount: 1 },
    ]),
  )
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFiles()
    files: {
      profilePic?: Express.Multer.File[];
      resume?: Express.Multer.File[];
    },
  ) {
    return this.profileService.updateProfile(updateProfileDto, files);
  }

  @Delete()
  async deleteProfile() {
    return this.profileService.deleteProfile();
  }
}
