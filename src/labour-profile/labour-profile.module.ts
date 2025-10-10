import { Module } from '@nestjs/common';
import { LabourProfileService } from './labour-profile.service';
import { LabourProfileController } from './labour-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabourProfile } from './entities/labour-profile.entity';
import { S3Service } from '../common/services/s3.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([LabourProfile]), UserModule],
  controllers: [LabourProfileController],
  providers: [LabourProfileService, S3Service],
  exports: [TypeOrmModule],
})
export class LabourProfileModule {}
