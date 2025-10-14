import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ApplicationStatus } from '../enums/enum';

export class CreateJobApplicaitonDto {
  @ApiProperty({
    description: 'Job ID to attach the application to',
    example: 1,
  })
  @IsNotEmpty()
  jobId: bigint;

  @ApiProperty({
    description: 'Applicant ID to attach the application to',
    example: 1,
  })
  @IsNotEmpty()
  applicantId: bigint;

  @ApiProperty({
    description: 'Cover letter to attach the application to',
    example: 'I am a good candidate for this job',
  })
  @IsNotEmpty()
  coverLetter: string;

  @ApiProperty({
    description: 'Start date to attach the application to',
    example: '2025-01-01',
  })
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'Status to attach the application to',
    example: ApplicationStatus.pending,
  })
  @IsNotEmpty()
  status: ApplicationStatus;
}
