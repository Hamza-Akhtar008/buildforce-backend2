import { Test, TestingModule } from '@nestjs/testing';
import { JobApplicaitonService } from './job-applicaiton.service';

describe('JobApplicaitonService', () => {
  let service: JobApplicaitonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobApplicaitonService],
    }).compile();

    service = module.get<JobApplicaitonService>(JobApplicaitonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
