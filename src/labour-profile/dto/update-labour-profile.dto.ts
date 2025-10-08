import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateLabourProfileDto } from './create-labour-profile.dto';

export class UpdateLabourProfileDto extends PartialType(
  CreateLabourProfileDto,
) {
  // All fields from CreateLabourProfileDto are now optional due to PartialType
  // File fields (resume, idProof, certificate, portfolio) are inherited
  // Non-file fields (userId, skillLevel, experienceRange, verificationStatus, skillIds) are inherited
}
