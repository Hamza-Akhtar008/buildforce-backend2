import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { Interview } from './entities/interview.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { urlToHttpOptions } from 'url';
import { VerificationStatus } from 'src/labour-profile/enums/enum';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
  ) {}
  create(createInterviewDto: CreateInterviewDto) {
    return this.interviewRepository.save(createInterviewDto);
  }

  findAll() {
    return this.interviewRepository.find();
  }

  findOne(id: number) {
    return this.interviewRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateInterviewDto: UpdateInterviewDto) {
    return this.interviewRepository.update(id, updateInterviewDto);
  }

  remove(id: number) {
    return this.interviewRepository.delete(id);
  }

  async findByLabourId(id: number) {
    return this.interviewRepository.find({
      where: {
        candidateId: id,
      },
    });
  }
}
