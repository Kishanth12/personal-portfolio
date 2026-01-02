import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  bio: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  profilePic: string;

  @Prop()
  phone: string;

  @Prop()
  location: string;

  @Prop()
  github: string;

  @Prop()
  linkedin: string;

  @Prop()
  resumeUrl: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);