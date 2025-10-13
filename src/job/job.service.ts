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
    const { projectId, ...jobData } = createJobDto;

    const jobToSave: Partial<Job> = {
      ...jobData,
      projectId: BigInt(projectId),
    };

    return await this.jobRepository.save(jobToSave as Job);
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

    const { projectId, ...updateData } = updateJobDto as any;
    const patch: Partial<Job> = { ...updateData } as Partial<Job>;
    if (projectId !== undefined) {
      patch.projectId = BigInt(projectId);
    }

    Object.assign(existing, patch);
    return await this.jobRepository.save(existing);
  }

  async remove(id: number) {
    return await this.jobRepository.delete({ id });
  }
}
