import { Test, TestingModule } from '@nestjs/testing';
import { LabourProfileService } from './labour-profile.service';

describe('LabourProfileService', () => {
  let service: LabourProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabourProfileService],
    }).compile();

    service = module.get<LabourProfileService>(LabourProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
