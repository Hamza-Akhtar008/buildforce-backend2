import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Job } from './entities/job.entity';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job,Project])],
  controllers: [JobController],
  providers: [JobService],
  
})
export class JobModule {}
