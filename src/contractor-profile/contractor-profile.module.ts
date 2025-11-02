import { Module } from '@nestjs/common';
import { ContractorProfileService } from './contractor-profile.service';
import { ContractorProfileController } from './contractor-profile.controller';
import { ContractorProfile } from './entities/contractor-profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from 'src/common/services/s3.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContractorProfile]),UserModule],
  controllers: [ContractorProfileController],
  providers: [ContractorProfileService,S3Service]
})
export class ContractorProfileModule {}
