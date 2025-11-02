import { Test, TestingModule } from '@nestjs/testing';
import { ContractorProfileService } from './contractor-profile.service';

describe('ContractorProfileService', () => {
  let service: ContractorProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractorProfileService],
    }).compile();

    service = module.get<ContractorProfileService>(ContractorProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
