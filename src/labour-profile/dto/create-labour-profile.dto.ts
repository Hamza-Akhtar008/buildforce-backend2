import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ArrayNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { SkillLevel, VerificationStatus, ExperienceRange } from '../enums/enum';

export class CreateLabourProfileDto {
  @ApiProperty({ description: 'User ID to attach the profile to', example: 1 })
  @IsNotEmpty()
  // @Transform(({ value }) => BigInt(value))
  id: bigint;

  @ApiProperty({
    description: 'Resume document file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  resume?: Express.Multer.File;

  @ApiProperty({
    description: 'ID proof document file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  idProof?: Express.Multer.File;

  @ApiProperty({
    description: 'Certificate document file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  certificate?: Express.Multer.File;

  @ApiProperty({
    description: 'Portfolio document file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  portfolio?: Express.Multer.File;

  @ApiProperty({
    description: 'Skill level of the labour worker',
    enum: SkillLevel,
    example: SkillLevel.Intermediate,
    required: false,
  })
  @IsOptional()
  @IsEnum(SkillLevel)
  skillLevel?: SkillLevel;

  @ApiProperty({
    description: 'Years of experience range',
    enum: ExperienceRange,
    example: ExperienceRange.ThreeToFive,
    required: false,
  })
  @IsOptional()
  @IsEnum(ExperienceRange)
  experienceRange?: ExperienceRange;

  @ApiProperty({
    description: 'Current verification status of the labour profile',
    enum: VerificationStatus,
    example: VerificationStatus.pending,
    required: false,
  })
  @IsOptional()
  @IsEnum(VerificationStatus)
  verificationStatus?: VerificationStatus;

  @ApiProperty({
    description: 'Array of skill IDs to associate with this labour profile',
    type: String,
    example: '1,2',
    required: false,
  })
  @IsOptional()
  skills?: string;
}
