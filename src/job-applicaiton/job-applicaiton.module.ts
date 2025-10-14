import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicaitonService } from './job-applicaiton.service';
import { JobApplicaitonController } from './job-applicaiton.controller';
import { JobApplicaiton } from './entities/job-applicaiton.entity';
import { LabourProfile } from 'src/labour-profile/entities/labour-profile.entity';
import { Job } from 'src/job/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplicaiton, LabourProfile, Job])],
  controllers: [JobApplicaitonController],
  providers: [JobApplicaitonService],
})
export class JobApplicaitonModule {}
