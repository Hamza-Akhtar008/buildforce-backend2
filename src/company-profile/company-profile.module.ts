import { Module } from '@nestjs/common';
import { CompanyProfileService } from './company-profile.service';
import { CompanyProfileController } from './company-profile.controller';
import { S3Service } from 'src/common/services/s3.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProfile } from './entities/company-profile.entity';

@Module({
  controllers: [CompanyProfileController],
  providers: [CompanyProfileService, S3Service],
  exports: [CompanyProfileService],
  imports: [TypeOrmModule.forFeature([CompanyProfile]), UserModule],
})
export class CompanyProfileModule {}
