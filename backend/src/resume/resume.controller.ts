import { Controller, Get, Post, Body } from '@nestjs/common';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  async addResumeMetadata(
    @Body()
    createResumeDto: {
      fileName: string;
      fileUrl: string;
      mimeType?: string;
      size?: number;
    },
  ) {
    return this.resumeService.create(createResumeDto);
  }

  @Get('latest')
  async getLatestResume() {
    return this.resumeService.getLatest();
  }
}
