import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectSchema } from './schemas/project.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    ],
  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
