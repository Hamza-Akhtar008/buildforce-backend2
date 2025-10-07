import { Module } from '@nestjs/common';
import { LabourProfileService } from './labour-profile.service';
import { LabourProfileController } from './labour-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabourProfile } from './entities/labour-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabourProfile])],
  controllers: [LabourProfileController],
  providers: [LabourProfileService],
  exports: [TypeOrmModule],
})
export class LabourProfileModule {}
