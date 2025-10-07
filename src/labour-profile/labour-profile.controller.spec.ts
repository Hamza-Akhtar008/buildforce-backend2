import { Test, TestingModule } from '@nestjs/testing';
import { LabourProfileController } from './labour-profile.controller';
import { LabourProfileService } from './labour-profile.service';

describe('LabourProfileController', () => {
  let controller: LabourProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabourProfileController],
      providers: [LabourProfileService],
    }).compile();

    controller = module.get<LabourProfileController>(LabourProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
