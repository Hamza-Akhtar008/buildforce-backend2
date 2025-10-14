import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const job = this.jobRepository.create(createJobDto);
    return await this.jobRepository.save(job);
  }

  findAll() {
    return this.jobRepository.find();
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    const existing = await this.jobRepository.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Job not found');
    }
    return await this.jobRepository.update({ id }, updateJobDto);
  }

  async remove(id: number) {
    return await this.jobRepository.delete({ id });
  }
}
