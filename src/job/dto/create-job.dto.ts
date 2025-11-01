import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsArray, IsNumber } from 'class-validator'
import { WorkDuration, Shift } from '../enums/job.enums'
import { SkillLevel } from 'src/labour-profile/enums/enum'

export class CreateJobDto {
  @ApiProperty({ example: 'Electrician', description: 'Job title' })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    example: 'Install electrical systems for a new commercial building. Must understand conduit bending and wiring safety standards.',
    description: 'Full job description including duties, responsibilities, and requirements.',
  })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiPropertyOptional({ example: 'Hiring 10 workers', description: 'Optional hiring info' })
  @IsOptional()
  @IsString()
  hiringInfo?: string

  @ApiPropertyOptional({ example: '2025-11-10', description: 'Job posting date' })
  @IsOptional()
  @IsString()
  postedOn?: string

  @ApiPropertyOptional({ example: '2025-11-20', description: 'Start date for the job' })
  @IsOptional()
  @IsString()
  startDate?: string

  @ApiProperty({ enum: WorkDuration, description: 'Type of job duration' })
  @IsEnum(WorkDuration)
  workDuration: WorkDuration

  @ApiProperty({ enum: Shift, description: 'Shift type' })
  @IsEnum(Shift)
  shift: Shift

  @ApiProperty({ enum: SkillLevel, description: 'Skill level required for this job' })
  @IsEnum(SkillLevel)
  skillLevel: SkillLevel

  @ApiProperty({ example: '$25/hr', description: 'Salary or hourly rate' })
  @IsString()
  @IsNotEmpty()
  salary: string

  @ApiProperty({ example: 'Houston, TX 77070', description: 'Job location (short form)' })
  @IsString()
  @IsNotEmpty()
  location: string

  @ApiPropertyOptional({ example: '123 Industrial Rd, Houston, TX 77070', description: 'Full address (optional)' })
  @IsOptional()
  @IsString()
  fullAddress?: string

  @ApiPropertyOptional({ type: [String], example: ['M', 'T', 'W', 'Th', 'F'], description: 'Work schedule days' })
  @IsOptional()
  @IsArray()
  scheduleDays?: string[]

  @ApiPropertyOptional({ example: '6am - 4pm', description: 'Shift hours' })
  @IsOptional()
  @IsString()
  shiftHours?: string

  @ApiPropertyOptional({ example: 'Times are subject to change', description: 'Shift notes' })
  @IsOptional()
  @IsString()
  shiftNote?: string

  @ApiPropertyOptional({ type: [String], example: ['Commercial'], description: 'Experience types' })
  @IsOptional()
  @IsArray()
  experience?: string[]

  @ApiPropertyOptional({ type: [String], example: ['TDLR - Apprentice Electrician'], description: 'Licenses required' })
  @IsOptional()
  @IsArray()
  licenses?: string[]

  @ApiPropertyOptional({ type: [String], example: ['Bending Conduit', 'Rough In'], description: 'Skills required' })
  @IsOptional()
  @IsArray()
  skills?: string[]

  @ApiPropertyOptional({ type: [String], example: ['Health Insurance', 'Flexible Schedule'], description: 'Benefits offered' })
  @IsOptional()
  @IsArray()
  benefits?: string[]

  @ApiProperty({ example: 1, description: 'ID of associated project' })
  @IsNumber()
  @IsNotEmpty()
  projectId: number
}
