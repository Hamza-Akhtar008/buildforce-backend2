import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ProjectStatus } from '../enums/project-status.enum';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Project location' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Project start date', example: '2025-01-01' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;
  @ApiProperty({ description: 'Project end date', example: '2025-09-01' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ description: 'Project description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Project budget', example: 10000.0 })
  @IsNumber()
  @IsNotEmpty()
  budget: number;

  @ApiProperty({
    description: 'Project status',
    enum: ProjectStatus,
    default: ProjectStatus.DRAFT,
  })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @ApiProperty({ description: 'Project owner ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  ownerId: bigint;
}
