import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { config } from 'dotenv';
import { LabourProfileModule } from './labour-profile/labour-profile.module';
import { SkillModule } from './skill/skill.module';
import { AdminProfileModule } from './admin-profile/admin-profile.module';
import { InterviewModule } from './interview/interview.module';
import { ProjectModule } from './project/project.module';
import { CompanyProfileModule } from './company-profile/company-profile.module';
import { JobModule } from './job/job.module';
import { JobApplicaitonModule } from './job-applicaiton/job-applicaiton.module';
import { ContractorProfileModule } from './contractor-profile/contractor-profile.module';


config();
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      autoLoadEntities: true,
       synchronize: true,  // 👈 temporarily enable

      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
    LabourProfileModule,
    SkillModule,
    AdminProfileModule,
    InterviewModule,
    CompanyProfileModule,
    ProjectModule,
    JobModule,
    JobApplicaitonModule,
    ContractorProfileModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
