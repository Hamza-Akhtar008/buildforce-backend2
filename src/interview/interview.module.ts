import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from './entities/interview.entity';

@Module({
  controllers: [InterviewController],
  providers: [InterviewService],
  imports: [TypeOrmModule.forFeature([Interview])],
})
export class InterviewModule {}
