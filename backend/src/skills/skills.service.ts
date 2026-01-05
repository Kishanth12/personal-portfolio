import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from './schemas/skill.schema';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
  ) {}

  async create(createSkillDto: any): Promise<Skill> {
    const newSkill = new this.skillModel(createSkillDto);
    return newSkill.save();
  }

  async findAll(): Promise<Skill[]> {
    return this.skillModel.find().exec();
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillModel.findById(id).exec();
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  async update(id: string, updateSkillDto: any): Promise<Skill> {
    const updatedSkill = await this.skillModel
      .findByIdAndUpdate(id, updateSkillDto, { new: true })
      .exec();
    if (!updatedSkill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return updatedSkill;
  }

  async remove(id: string): Promise<any> {
    const result = await this.skillModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return result;
  }
}
