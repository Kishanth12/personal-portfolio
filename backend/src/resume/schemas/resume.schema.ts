import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResumeDocument = Resume & Document;

@Schema({ timestamps: true })
export class Resume {
  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ default: 'application/pdf' })
  mimeType: string;

  @Prop()
  size: number;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
