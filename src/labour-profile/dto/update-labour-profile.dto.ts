import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateLabourProfileDto } from './create-labour-profile.dto';
import { SkillLevel, VerificationStatus, ExperienceRange } from '../enums/enum';

export class UpdateLabourProfileDto extends PartialType(
  CreateLabourProfileDto,
) {
  @ApiProperty({
    description: 'URL to the uploaded resume document',
    example: 'https://storage.example.com/resumes/john-doe-resume.pdf',
    required: false,
  })
  resumeUrl?: string;

  @ApiProperty({
    description: 'URL to the uploaded ID proof document',
    example: 'https://storage.example.com/id-proofs/john-doe-id.pdf',
    required: false,
  })
  idProofUrl?: string;

  @ApiProperty({
    description: 'URL to the uploaded certificate document',
    example: 'https://storage.example.com/certificates/john-doe-cert.pdf',
    required: false,
  })
  certificateUrl?: string;

  @ApiProperty({
    description: 'URL to the portfolio or work samples',
    example: 'https://portfolio.example.com/john-doe',
    required: false,
  })
  portfolioUrl?: string;

  @ApiProperty({
    description: 'Skill level of the labour worker',
    enum: SkillLevel,
    example: SkillLevel.Intermediate,
    required: false,
  })
  skillLevel?: SkillLevel;

  @ApiProperty({
    description: 'Years of experience range',
    enum: ExperienceRange,
    example: ExperienceRange.ThreeToFive,
    required: false,
  })
  experienceRange?: ExperienceRange;

  @ApiProperty({
    description: 'Current verification status of the labour profile',
    enum: VerificationStatus,
    example: VerificationStatus.pending,
    required: false,
  })
  verificationStatus?: VerificationStatus;

  @ApiProperty({
    description: 'Array of skill IDs to associate with this labour profile',
    type: [Number],
    example: [1, 2, 5, 8],
    required: false,
  })
  skillIds?: number[];
}
