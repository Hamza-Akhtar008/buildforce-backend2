import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>,

  ) {}

 async create(createJobDto: CreateJobDto) {
  const project = await this.projectRepository.findOne({
    where: { id: (createJobDto.projectId) },
  });

  if (!project) {
    throw new NotFoundException(`Project with ID ${createJobDto.projectId} not found`);
  }

  const job = this.jobRepository.create({
    ...createJobDto,
    projectId: BigInt(createJobDto.projectId),
  });

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
     const updatedJob = {
    ...updateJobDto,
    ...(updateJobDto.projectId && {
      projectId: BigInt(updateJobDto.projectId), // 👈 convert here too
    }),
  };
     return await this.jobRepository.update({ id }, updatedJob);
  }

  async remove(id: number) {
    return await this.jobRepository.delete({ id });
  }
}
