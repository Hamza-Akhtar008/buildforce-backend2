import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLabourProfileDto } from './dto/create-labour-profile.dto';
import { UpdateLabourProfileDto } from './dto/update-labour-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LabourProfile } from './entities/labour-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LabourProfileService {
  @InjectRepository(LabourProfile)
  private readonly labourProfileRepository: Repository<LabourProfile>;
  create(createLabourProfileDto: CreateLabourProfileDto) {
    return 'This action adds a new labourProfile';
  }

  findAll() {
    return this.labourProfileRepository.find();
  }

  async findOne(id: number) {
    const obj = await this.labourProfileRepository.findOne({
      where: { id: BigInt(id) },
    });
    if (!obj) {
      throw new NotFoundException('Labour profile not found');
    }
    return obj;
  }

  async update(id: number, updateLabourProfileDto: UpdateLabourProfileDto) {
    const obj = await this.labourProfileRepository.findOne({
      where: { id: BigInt(id) },
    });
    if (!obj) {
      throw new NotFoundException('Labour profile not found');
    }
    Object.assign(obj, updateLabourProfileDto);
    return obj;
  }

  remove(id: number) {
    return `This action removes a #${id} labourProfile`;
  }
}
