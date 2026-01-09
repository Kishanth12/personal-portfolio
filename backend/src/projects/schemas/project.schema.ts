import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  techStack: string[];

  @Prop()
  githubUrl: string;

  @Prop()
  liveUrl?: string;

  @Prop({ type: String })
  image: string;

  @Prop({ default: false })
  featured: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
