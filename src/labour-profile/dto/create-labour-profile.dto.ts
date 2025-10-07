import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ArrayNotEmpty,
} from 'class-validator';
import { SkillLevel, VerificationStatus, ExperienceRange } from '../enums/enum';

export class CreateLabourProfileDto {
  @ApiProperty({ description: 'User ID to attach the profile to', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'URL to the uploaded resume document',
    example: 'https://storage.example.com/resumes/john-doe-resume.pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  resumeUrl?: string;

  @ApiProperty({
    description: 'URL to the uploaded ID proof document',
    example: 'https://storage.example.com/id-proofs/john-doe-id.pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  idProofUrl?: string;

  @ApiProperty({
    description: 'URL to the uploaded certificate document',
    example: 'https://storage.example.com/certificates/john-doe-cert.pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  certificateUrl?: string;

  @ApiProperty({
    description: 'URL to the portfolio or work samples',
    example: 'https://portfolio.example.com/john-doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  portfolioUrl?: string;

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
    type: [Number],
    example: [1, 2, 5, 8],
    required: false,
  })
  @IsOptional()
  @IsArray()
  skillIds?: number[];
}
