import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsNumberString,
  IsNumber,
} from 'class-validator';
import { WorkDuration, Shift } from '../enums/job.enums';
import { SkillLevel } from 'src/labour-profile/enums/enum';

export class CreateJobDto {
  @ApiProperty({ description: 'Job title', example: 'Job title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Job description',
    example: 'This is a job description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Skills required (comma-separated string)',
    example: '1,2,3',
  })
  @IsString()
  @IsNotEmpty()
  skillsRequired: string;

  @ApiProperty({ description: 'Salary (string)', example: '50$' })
  @IsString()
  @IsNotEmpty()
  salary: string;

  @ApiProperty({ description: 'Job location' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Work duration', enum: WorkDuration })
  @IsEnum(WorkDuration)
  workDuration: WorkDuration;

  @ApiProperty({ description: 'Shift', enum: Shift })
  @IsEnum(Shift)
  shift: Shift;

  @ApiProperty({ description: 'Skill level', enum: SkillLevel })
  @IsEnum(SkillLevel)
  skillLevel: SkillLevel;

  @ApiProperty({ description: 'Project ID to attach this job to', example: 1 })
  @IsNumber()
  @IsNumberString()
  projectId: bigint;
}
