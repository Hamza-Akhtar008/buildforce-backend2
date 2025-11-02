import { Test, TestingModule } from '@nestjs/testing';
import { ContractorProfileController } from './contractor-profile.controller';
import { ContractorProfileService } from './contractor-profile.service';

describe('ContractorProfileController', () => {
  let controller: ContractorProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractorProfileController],
      providers: [ContractorProfileService],
    }).compile();

    controller = module.get<ContractorProfileController>(ContractorProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
