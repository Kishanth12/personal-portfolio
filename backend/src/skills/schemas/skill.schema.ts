import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

export enum SkillCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  TOOLS = 'tools',
  DATABASE='database'
}

@Schema({ timestamps: true })
export class Skill {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: SkillCategory })
  category: SkillCategory;

  @Prop() // optional now
  image?: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
