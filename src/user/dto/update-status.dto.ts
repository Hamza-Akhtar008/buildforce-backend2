import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';
import {
  IsEmail,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { VerificationStatus } from 'src/labour-profile/enums/enum';

export class UpdateStatusDto {
  @ApiProperty({
    enum: VerificationStatus,
    example: VerificationStatus.interview,
  })
  @IsNotEmpty()
  status: VerificationStatus;

  // @IsOptional()
  // @IsEnum(VerificationStatus)
  // verificationStatus: VerificationStatus;
}
