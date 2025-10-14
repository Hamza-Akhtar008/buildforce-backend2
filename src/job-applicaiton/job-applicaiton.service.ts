import { Injectable } from '@nestjs/common';
import { CreateJobApplicaitonDto } from './dto/create-job-applicaiton.dto';
import { UpdateJobApplicaitonDto } from './dto/update-job-applicaiton.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplicaiton } from './entities/job-applicaiton.entity';

@Injectable()
export class JobApplicaitonService {
  constructor(
    @InjectRepository(JobApplicaiton)
    private readonly jobApplicaitonRepository: Repository<JobApplicaiton>,
  ) {}
  create(createJobApplicaitonDto: CreateJobApplicaitonDto) {
    return this.jobApplicaitonRepository.save(createJobApplicaitonDto);
  }
  findByOwnerId(ownerId: bigint) {
    return this.jobApplicaitonRepository.find({
      where: { job: { project: { ownerId } } },
    });
  }
  findByJobId(jobId: bigint) {
    return this.jobApplicaitonRepository.find({ where: { jobId } });
  }
  findByApplicantId(applicantId: bigint) {
    return this.jobApplicaitonRepository.find({ where: { applicantId } });
  }

  findAll() {
    return this.jobApplicaitonRepository.find();
  }

  findOne(id: number) {
    return this.jobApplicaitonRepository.findOne({ where: { id } });
  }

  update(id: number, updateJobApplicaitonDto: UpdateJobApplicaitonDto) {
    return this.jobApplicaitonRepository.update(id, updateJobApplicaitonDto);
  }

  remove(id: number) {
    return this.jobApplicaitonRepository.delete(id);
  }
}
