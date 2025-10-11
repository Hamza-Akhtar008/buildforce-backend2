import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from './entities/interview.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [InterviewController],
  providers: [InterviewService],
  imports: [TypeOrmModule.forFeature([Interview]), UserModule],
})
export class InterviewModule {}
