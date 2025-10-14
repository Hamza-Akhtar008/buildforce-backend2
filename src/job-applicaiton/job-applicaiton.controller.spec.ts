import { Test, TestingModule } from '@nestjs/testing';
import { JobApplicaitonController } from './job-applicaiton.controller';
import { JobApplicaitonService } from './job-applicaiton.service';

describe('JobApplicaitonController', () => {
  let controller: JobApplicaitonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobApplicaitonController],
      providers: [JobApplicaitonService],
    }).compile();

    controller = module.get<JobApplicaitonController>(JobApplicaitonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
